import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Gamepad2, Play, RotateCcw, Trophy, Zap } from 'lucide-react';

interface Obstacle {
  x: number;
  w: number;
  h: number;
  type: 'spike' | 'tall' | 'drone';
  yOffset: number;
}

interface Orb {
  x: number;
  y: number;
  collected: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}

interface MiniGameSectionProps {
  autoStartSignal: number;
}

const HIGH_SCORE_KEY = 'hiran_3d_runner_best';

export const MiniGameSection: React.FC<MiniGameSectionProps> = ({ autoStartSignal }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      return Number(localStorage.getItem(HIGH_SCORE_KEY) || 0);
    } catch {
      return 0;
    }
  });
  const [speedLabel, setSpeedLabel] = useState('1.0x');

  const stateRef = useRef({
    mode: 'idle' as 'idle' | 'playing' | 'gameover',
    score: 0,
    highScore: 0,
    speed: 6.2,
    distance: 0,
    groundY: 162,
    playerX: 92,
    playerY: 162,
    playerVy: 0,
    jumpsLeft: 2,
    playerRot: 0,
    obstacles: [] as Obstacle[],
    orbs: [] as Orb[],
    particles: [] as Particle[],
    nextSpawnIn: 45,
    nextOrbIn: 75,
    gridOffset: 0,
    flashAlpha: 0,
  });

  useEffect(() => {
    stateRef.current.highScore = highScore;
  }, [highScore]);

  const spawnParticles = (x: number, y: number, color: string, count: number) => {
    const arr = stateRef.current.particles;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = 1.5 + Math.random() * 4.5;
      arr.push({
        x,
        y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd - 1.2,
        life: 1,
        color,
        size: 2 + Math.random() * 3,
      });
    }
  };

  const resetAndStart = useCallback(() => {
    const s = stateRef.current;
    s.mode = 'playing';
    s.score = 0;
    s.speed = 6.2;
    s.distance = 0;
    s.playerY = s.groundY;
    s.playerVy = 0;
    s.jumpsLeft = 2;
    s.playerRot = 0;
    s.obstacles = [];
    s.orbs = [];
    s.particles = [];
    s.nextSpawnIn = 48;
    s.nextOrbIn = 65;
    s.flashAlpha = 0;

    setScore(0);
    setSpeedLabel('1.0x');
    setGameState('playing');
  }, []);

  const triggerJump = useCallback(() => {
    const s = stateRef.current;
    if (s.mode === 'idle' || s.mode === 'gameover') {
      resetAndStart();
      return;
    }
    if (s.jumpsLeft > 0) {
      s.playerVy = s.jumpsLeft === 2 ? -11.8 : -10.2;
      s.jumpsLeft -= 1;
      spawnParticles(
        s.playerX,
        s.playerY - 4,
        s.jumpsLeft === 1 ? '#D4FF24' : '#4B8BFF',
        10
      );
    }
  }, [resetAndStart]);

  // If user clicked the top red "PLAY GAME" button, start cleanly once scrolled into view
  useEffect(() => {
    if (autoStartSignal > 0) {
      const t = setTimeout(() => {
        resetAndStart();
      }, 450);
      return () => clearTimeout(t);
    }
  }, [autoStartSignal, resetAndStart]);

  // Keyboard controls (Space / ArrowUp / W) only intercept scroll while playing or focused
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        const activeTag = (document.activeElement?.tagName || '').toLowerCase();
        if (activeTag === 'input' || activeTag === 'textarea') return;

        const isPlaying = stateRef.current.mode === 'playing';
        const rect = containerRef.current?.getBoundingClientRect();
        const isInView = rect ? rect.top < window.innerHeight && rect.bottom > 0 : false;

        if (isPlaying || isInView) {
          e.preventDefault();
          triggerJump();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [triggerJump]);

  // Main 60fps Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 960;
    const height = 210;
    const groundY = 162;
    stateRef.current.groundY = groundY;

    const updateSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = Math.max(320, parent.clientWidth);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stateRef.current.playerX = Math.min(115, Math.max(58, width * 0.12));
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    let rafId = 0;
    let lastTs = performance.now();

    const loop = (now: number) => {
      rafId = requestAnimationFrame(loop);
      const dt = Math.min(2.2, (now - lastTs) / 16.667);
      lastTs = now;

      const s = stateRef.current;

      // Update physics
      if (s.mode === 'playing') {
        s.speed = Math.min(13.5, 6.2 + s.distance * 0.00055);
        s.distance += s.speed * dt;
        s.gridOffset = (s.gridOffset + s.speed * dt) % 44;

        // Smooth continuous distance score increment
        const prevScore = Math.floor(s.score);
        s.score += s.speed * 0.03 * dt;
        const displayScore = Math.floor(s.score);
        if (displayScore !== prevScore) {
          setScore(displayScore);
          setSpeedLabel(`${(s.speed / 6.2).toFixed(1)}x`);
        }

        // Player gravity & jump
        s.playerVy += 0.68 * dt;
        s.playerY += s.playerVy * dt;
        if (s.playerY >= groundY) {
          s.playerY = groundY;
          s.playerVy = 0;
          s.jumpsLeft = 2;
          s.playerRot = 0;
        } else {
          s.playerRot += 0.14 * dt;
        }

        // Trail spark on ground
        if (s.playerY >= groundY - 1 && Math.random() < 0.45) {
          s.particles.push({
            x: s.playerX - 10,
            y: groundY - 2,
            vx: -s.speed * 0.45,
            vy: -Math.random() * 1.1,
            life: 0.7,
            color: '#1558C9',
            size: 2.2,
          });
        }

        // Spawn obstacles continuously along the single line
        s.nextSpawnIn -= dt;
        if (s.nextSpawnIn <= 0) {
          const roll = Math.random();
          let obs: Obstacle;
          if (roll < 0.48) {
            obs = { x: width + 30, w: 22, h: 32, type: 'spike', yOffset: 0 };
          } else if (roll < 0.78) {
            obs = { x: width + 30, w: 28, h: 46, type: 'tall', yOffset: 0 };
          } else {
            obs = { x: width + 30, w: 30, h: 20, type: 'drone', yOffset: 38 };
          }
          s.obstacles.push(obs);
          const minGap = Math.max(36, 74 - s.speed * 2.5);
          s.nextSpawnIn = minGap + Math.random() * 44;
        }

        // Spawn collectible energy orbs
        s.nextOrbIn -= dt;
        if (s.nextOrbIn <= 0) {
          s.orbs.push({
            x: width + 40,
            y: groundY - (Math.random() > 0.5 ? 64 : 26),
            collected: false,
          });
          s.nextOrbIn = 85 + Math.random() * 75;
        }

        // Move & collide obstacles
        const pBox = {
          left: s.playerX - 11,
          right: s.playerX + 11,
          top: s.playerY - 24,
          bottom: s.playerY - 2,
        };

        for (let i = s.obstacles.length - 1; i >= 0; i--) {
          const o = s.obstacles[i];
          o.x -= s.speed * dt;
          if (o.x + o.w < -40) {
            s.obstacles.splice(i, 1);
            continue;
          }

          const oLeft = o.x + 3;
          const oRight = o.x + o.w - 3;
          const oBottom = groundY - o.yOffset;
          const oTop = oBottom - o.h + 4;

          if (
            pBox.right > oLeft &&
            pBox.left < oRight &&
            pBox.bottom > oTop &&
            pBox.top < oBottom
          ) {
            // Game Over!
            s.mode = 'gameover';
            s.flashAlpha = 0.45;
            spawnParticles(s.playerX, s.playerY - 12, '#FF2E4D', 24);
            spawnParticles(s.playerX, s.playerY - 12, '#D4FF24', 12);
            const finalScore = Math.floor(s.score);
            setScore(finalScore);
            if (finalScore > s.highScore) {
              s.highScore = finalScore;
              setHighScore(finalScore);
              try {
                localStorage.setItem(HIGH_SCORE_KEY, String(finalScore));
              } catch {
                // ignore storage quota errors
              }
            }
            setGameState('gameover');
            break;
          }
        }

        // Move & collect orbs
        for (let i = s.orbs.length - 1; i >= 0; i--) {
          const orb = s.orbs[i];
          orb.x -= s.speed * dt;
          if (orb.x < -30 || orb.collected) {
            s.orbs.splice(i, 1);
            continue;
          }
          const dx = orb.x - s.playerX;
          const dy = orb.y - (s.playerY - 14);
          if (dx * dx + dy * dy < 24 * 24) {
            orb.collected = true;
            s.score += 50;
            setScore(Math.floor(s.score));
            spawnParticles(orb.x, orb.y, '#D4FF24', 12);
          }
        }
      } else if (s.mode === 'idle') {
        s.gridOffset = (s.gridOffset + 2.2 * dt) % 44;
        s.playerY = groundY;
      }

      // Update particles in all modes
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const pt = s.particles[i];
        pt.x += pt.vx * dt;
        pt.y += pt.vy * dt;
        pt.vy += 0.14 * dt;
        pt.life -= 0.032 * dt;
        if (pt.life <= 0) s.particles.splice(i, 1);
      }

      if (s.flashAlpha > 0) {
        s.flashAlpha = Math.max(0, s.flashAlpha - 0.03 * dt);
      }

      // === RENDER ===
      ctx.clearRect(0, 0, width, height);

      // Background subtle dark gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#050812');
      bgGrad.addColorStop(1, '#091229');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle moving horizontal speed lines in background
      ctx.strokeStyle = 'rgba(21, 88, 201, 0.16)';
      ctx.lineWidth = 1;
      for (let gx = -s.gridOffset; gx < width; gx += 44) {
        ctx.beginPath();
        ctx.moveTo(gx, groundY);
        ctx.lineTo(gx - 28, height);
        ctx.stroke();
      }

      // Continuous Glowing Neon Track Line
      ctx.save();
      ctx.shadowColor = '#1558C9';
      ctx.shadowBlur = 14;
      const lineGrad = ctx.createLinearGradient(0, 0, width, 0);
      lineGrad.addColorStop(0, '#1558C9');
      lineGrad.addColorStop(0.5, '#4B8BFF');
      lineGrad.addColorStop(1, '#D4FF24');
      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(width, groundY);
      ctx.stroke();
      ctx.restore();

      // Draw Energy Orbs
      s.orbs.forEach((orb) => {
        ctx.save();
        ctx.shadowColor = '#D4FF24';
        ctx.shadowBlur = 12;
        ctx.fillStyle = '#D4FF24';
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      });

      // Draw Obstacles (Neon Red Hazards)
      s.obstacles.forEach((o) => {
        ctx.save();
        ctx.shadowColor = '#FF2E4D';
        ctx.shadowBlur = 14;
        ctx.fillStyle = '#FF2E4D';
        const base = groundY - o.yOffset;
        if (o.type === 'spike') {
          ctx.beginPath();
          ctx.moveTo(o.x, base);
          ctx.lineTo(o.x + o.w / 2, base - o.h);
          ctx.lineTo(o.x + o.w, base);
          ctx.closePath();
          ctx.fill();
        } else if (o.type === 'tall') {
          ctx.fillRect(o.x, base - o.h, o.w, o.h);
          ctx.fillStyle = '#FF8FA3';
          ctx.fillRect(o.x + 5, base - o.h + 5, o.w - 10, 4);
        } else {
          // Floating red drone bar
          ctx.beginPath();
          ctx.roundRect(o.x, base - o.h, o.w, o.h, 6);
          ctx.fill();
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(o.x + 6, base - o.h / 2 - 2, o.w - 12, 4);
        }
        ctx.restore();
      });

      // Draw Player (Acid Lime Cyber Runner Cube/Core)
      ctx.save();
      ctx.translate(s.playerX, s.playerY - 13);
      ctx.rotate(s.playerRot);
      ctx.shadowColor = '#D4FF24';
      ctx.shadowBlur = 18;
      ctx.fillStyle = '#D4FF24';
      ctx.beginPath();
      ctx.roundRect(-12, -12, 24, 24, 5);
      ctx.fill();
      ctx.fillStyle = '#030407';
      ctx.fillRect(2, -5, 6, 4); // Cyber visor eye
      ctx.restore();

      // Draw Particles
      s.particles.forEach((pt) => {
        ctx.save();
        ctx.globalAlpha = Math.max(0, pt.life);
        ctx.fillStyle = pt.color;
        ctx.fillRect(pt.x - pt.size / 2, pt.y - pt.size / 2, pt.size, pt.size);
        ctx.restore();
      });

      // Impact Flash
      if (s.flashAlpha > 0) {
        ctx.fillStyle = `rgba(255, 46, 77, ${s.flashAlpha})`;
        ctx.fillRect(0, 0, width, height);
      }
    };

    rafId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <section id="mini-game" ref={containerRef} className="relative py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="glass-panel rounded-3xl overflow-hidden hud-bracket border border-[#1558C9]/45">
          {/* Compact Top Arcade Header Strip */}
          <div className="px-5 sm:px-7 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-[#060B18]/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FF2E4D]/15 border border-[#FF2E4D]/60 flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-[#FF2E4D]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-base sm:text-lg text-white">
                    LINE DASH // ENDLESS RUNNER
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-[#D4FF24]/15 border border-[#D4FF24]/40 font-mono text-[10px] uppercase tracking-widest text-[#D4FF24]">
                    DOUBLE JUMP ENABLED
                  </span>
                </div>
                <p className="font-mono text-[11px] text-[#8DA4CE]">
                  Tap, Click, or Press <span className="text-white">SPACE / ↑</span> to jump over red
                  hazards &amp; grab lime orbs (+50)
                </p>
              </div>
            </div>

            {/* Live Scoreboard */}
            <div className="flex items-center gap-4 sm:gap-6 font-mono text-xs">
              <div className="flex items-center gap-1.5 text-[#7FAFFF]">
                <Zap className="w-3.5 h-3.5 text-[#D4FF24]" />
                <span>{speedLabel}</span>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-widest text-[#7E94BE]">SCORE</div>
                <div className="text-base font-bold text-[#D4FF24] tabular-nums">
                  {String(score).padStart(5, '0')}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-widest text-[#7E94BE] flex items-center justify-end gap-1">
                  <Trophy className="w-3 h-3 text-[#FF2E4D]" />
                  BEST
                </div>
                <div className="text-base font-bold text-white tabular-nums">
                  {String(highScore).padStart(5, '0')}
                </div>
              </div>
            </div>
          </div>

          {/* Continuous Single-Line Canvas Stage */}
          <div
            onClick={triggerJump}
            role="button"
            tabIndex={0}
            aria-label="Play Line Dash endless runner game"
            className="relative w-full h-[210px] cursor-pointer select-none touch-manipulation overflow-hidden"
          >
            <canvas ref={canvasRef} className="block w-full h-full" />

            {/* Idle Start Overlay */}
            {gameState === 'idle' && (
              <div className="absolute inset-0 bg-[#030407]/45 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 p-4 text-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    resetAndStart();
                  }}
                  className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#FF2E4D] hover:bg-[#FF4763] text-white font-mono text-xs font-bold uppercase tracking-[0.18em] transition-all hover:scale-105 shadow-[0_0_28px_rgba(255,46,77,0.55)]"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Start Continuous Run
                </button>
                <span className="font-mono text-[11px] text-[#C4D3EE]">
                  Click anywhere or press SPACE to jump (tap twice to double-jump)
                </span>
              </div>
            )}

            {/* Game Over Overlay */}
            {gameState === 'gameover' && (
              <div className="absolute inset-0 bg-[#030407]/72 backdrop-blur-sm flex flex-col items-center justify-center gap-3 p-4 text-center">
                <div className="font-mono text-xs uppercase tracking-[0.28em] text-[#FF2E4D] font-bold">
                  SYSTEM CRASHED // SCORE {score}
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    resetAndStart();
                  }}
                  className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#D4FF24] hover:bg-[#E4FF6E] text-[#030407] font-mono text-xs font-bold uppercase tracking-[0.18em] transition-all hover:scale-105 acid-glow"
                >
                  <RotateCcw className="w-4 h-4" />
                  Play Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
