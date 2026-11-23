import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const AmbientSpace3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030407, 0.032);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      120
    );
    camera.position.set(0, 3.2, 14);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x030407, 1);
    container.appendChild(renderer.domElement);

    // 1. Perspective Electric Cobalt Cyber Terrain Grid
    const planeGeo = new THREE.PlaneGeometry(76, 76, 44, 44);
    planeGeo.rotateX(-Math.PI / 2);
    const basePositions = new Float32Array(planeGeo.attributes.position.array);

    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x1558c9,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });
    const terrain = new THREE.Mesh(planeGeo, gridMat);
    terrain.position.set(0, -4.5, -14);
    scene.add(terrain);

    // 2. Dual-color Stardust (Electric Cobalt + Acid Lime sparks)
    const particleCount = 650;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const cobaltColor = new THREE.Color('#1558C9');
    const brightBlue = new THREE.Color('#4B8BFF');
    const acidColor = new THREE.Color('#D4FF24');

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 48;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 28;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 45 - 5;

      const pick = Math.random();
      const c = pick > 0.84 ? acidColor : pick > 0.42 ? brightBlue : cobaltColor;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.11,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 3. Distant Floating Low-Poly Shards
    const shardsGroup = new THREE.Group();
    const shardGeo = new THREE.OctahedronGeometry(0.45, 0);
    const shardMatBlue = new THREE.MeshBasicMaterial({
      color: 0x1558c9,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const shardMatLime = new THREE.MeshBasicMaterial({
      color: 0xd4ff24,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });

    const shards: { mesh: THREE.Mesh; speed: number; offset: number }[] = [];
    for (let i = 0; i < 14; i++) {
      const m = new THREE.Mesh(shardGeo, i % 4 === 0 ? shardMatLime : shardMatBlue);
      const scale = 0.6 + Math.random() * 1.4;
      m.scale.setScalar(scale);
      m.position.set(
        (Math.random() - 0.5) * 32,
        (Math.random() - 0.5) * 14,
        -6 - Math.random() * 20
      );
      shardsGroup.add(m);
      shards.push({ mesh: m, speed: 0.2 + Math.random() * 0.45, offset: Math.random() * Math.PI * 2 });
    }
    scene.add(shardsGroup);

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollProgress = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollProgress = window.scrollY / maxScroll;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let rafId = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (document.hidden) return;

      const t = clock.getElapsedTime();
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Animate terrain wave
      const posAttr = planeGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < posAttr.count; i++) {
        const bx = basePositions[i * 3];
        const bz = basePositions[i * 3 + 2];
        const wave =
          Math.sin(bx * 0.18 + t * 0.7) * 0.65 +
          Math.cos(bz * 0.16 + t * 0.55) * 0.65;
        posAttr.setY(i, wave);
      }
      posAttr.needsUpdate = true;

      particles.rotation.y = t * 0.025 + mouse.x * 0.12;
      particles.rotation.x = mouse.y * 0.08 + scrollProgress * 0.45;

      shards.forEach((s) => {
        s.mesh.rotation.x = t * s.speed;
        s.mesh.rotation.y = t * s.speed * 1.25;
        s.mesh.position.y += Math.sin(t + s.offset) * 0.004;
      });

      camera.position.x = mouse.x * 1.6;
      camera.position.y = 3.2 - mouse.y * 0.9 - scrollProgress * 2.4;
      camera.lookAt(0, -1 - scrollProgress * 2.0, -12);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      planeGeo.dispose();
      gridMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      shardGeo.dispose();
      shardMatBlue.dispose();
      shardMatLime.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
};
