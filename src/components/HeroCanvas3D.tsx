import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroCanvas3DProps {
  pulseTrigger: number;
}

export const HeroCanvas3D: React.FC<HeroCanvas3DProps> = ({ pulseTrigger }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef(0);

  useEffect(() => {
    if (pulseTrigger > 0) {
      pulseRef.current = 1.0;
    }
  }, [pulseTrigger]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 540;
    const height = container.clientHeight || 540;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.15, 7.6);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Dramatic studio lighting matching Midnight Black + Electric Cobalt + Acid Lime
    const ambient = new THREE.AmbientLight(0x1558c9, 1.3);
    scene.add(ambient);

    const cobaltKey = new THREE.PointLight(0x2e7bff, 18, 25);
    cobaltKey.position.set(4, 3, 5);
    scene.add(cobaltKey);

    const limeRim = new THREE.PointLight(0xd4ff24, 14, 22);
    limeRim.position.set(-4.5, 2.5, 3);
    scene.add(limeRim);

    const deepBack = new THREE.PointLight(0x1558c9, 16, 20);
    deepBack.position.set(0, -3.5, -2);
    scene.add(deepBack);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Sculpted Electric Cobalt Torus-Knot Aura (echoing organic-futuristic blue sculpture in reference)
    const knotGeo = new THREE.TorusKnotGeometry(1.95, 0.34, 96, 18, 2, 3);
    const knotMat = new THREE.MeshPhysicalMaterial({
      color: 0x1558c9,
      emissive: 0x0b2e7a,
      emissiveIntensity: 0.75,
      roughness: 0.22,
      metalness: 0.78,
      clearcoat: 1.0,
      clearcoatRoughness: 0.15,
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    knotMesh.position.z = -1.2;
    rootGroup.add(knotMesh);

    // 2. Wireframe Game-Engine Gizmo Halo (Icosahedron Shell)
    const shellGeo = new THREE.IcosahedronGeometry(2.65, 1);
    const shellMat = new THREE.MeshBasicMaterial({
      color: 0x3b82ff,
      wireframe: true,
      transparent: true,
      opacity: 0.24,
    });
    const shellMesh = new THREE.Mesh(shellGeo, shellMat);
    shellMesh.position.z = -0.8;
    rootGroup.add(shellMesh);

    // 3. Precision Gyroscopic Rings (Acid Lime + Cobalt Blue)
    const ring1Geo = new THREE.TorusGeometry(2.95, 0.022, 16, 120);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0xd4ff24,
      transparent: true,
      opacity: 0.85,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI * 0.36;
    ring1.rotation.y = Math.PI * 0.15;
    rootGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(3.3, 0.018, 16, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x2e7bff,
      transparent: true,
      opacity: 0.55,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI * 0.28;
    ring2.rotation.z = Math.PI * 0.22;
    rootGroup.add(ring2);

    // 4. Orbiting Acid Lime Energy Nodes & Cobalt Cubes (game voxel accents)
    const satellitesGroup = new THREE.Group();
    const voxelGeo = new THREE.BoxGeometry(0.18, 0.18, 0.18);
    const limeMat = new THREE.MeshStandardMaterial({
      color: 0xd4ff24,
      emissive: 0xd4ff24,
      emissiveIntensity: 0.9,
      roughness: 0.2,
    });
    const cobaltMat = new THREE.MeshStandardMaterial({
      color: 0x2e7bff,
      emissive: 0x1558c9,
      emissiveIntensity: 0.7,
      metalness: 0.8,
      roughness: 0.2,
    });

    const satData: { mesh: THREE.Mesh; radius: number; angle: number; speed: number; yAmp: number }[] = [];
    for (let i = 0; i < 18; i++) {
      const isLime = i % 3 === 0;
      const m = new THREE.Mesh(voxelGeo, isLime ? limeMat : cobaltMat);
      const radius = 2.45 + (i % 4) * 0.32;
      const angle = (i / 18) * Math.PI * 2;
      satellitesGroup.add(m);
      satData.push({
        mesh: m,
        radius,
        angle,
        speed: (isLime ? 0.45 : -0.32) * (0.7 + (i % 3) * 0.2),
        yAmp: 0.5 + (i % 5) * 0.25,
      });
    }
    rootGroup.add(satellitesGroup);

    // 5. Shockwave Pulse Ring on click
    const shockGeo = new THREE.RingGeometry(1.4, 1.55, 64);
    const shockMat = new THREE.MeshBasicMaterial({
      color: 0xd4ff24,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
    });
    const shockRing = new THREE.Mesh(shockGeo, shockMat);
    scene.add(shockRing);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointerMove = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const w = container.clientWidth || 540;
      const h = container.clientHeight || 540;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);
    window.addEventListener('mousemove', onPointerMove, { passive: true });

    const clock = new THREE.Clock();
    let rafId = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (document.hidden) return;

      const t = clock.getElapsedTime();
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      // Energy pulse decay
      if (pulseRef.current > 0.005) {
        pulseRef.current *= 0.94;
        const p = 1 - pulseRef.current;
        shockRing.scale.setScalar(1 + p * 2.6);
        shockMat.opacity = pulseRef.current * 0.85;
      } else {
        pulseRef.current = 0;
        shockMat.opacity = 0;
      }

      const boost = 1 + pulseRef.current * 2.2;

      knotMesh.rotation.x = t * 0.24 + mouse.y * 0.35;
      knotMesh.rotation.y = t * 0.34 + mouse.x * 0.45;
      knotMesh.scale.setScalar(1 + pulseRef.current * 0.12);

      shellMesh.rotation.x = -t * 0.12;
      shellMesh.rotation.y = t * 0.16;

      ring1.rotation.z = t * 0.38 * boost;
      ring1.rotation.x = Math.PI * 0.36 + mouse.y * 0.22;

      ring2.rotation.z = -t * 0.25 * boost;
      ring2.rotation.y = mouse.x * 0.25;

      satData.forEach((s) => {
        const a = s.angle + t * s.speed;
        s.mesh.position.set(
          Math.cos(a) * s.radius,
          Math.sin(a * 1.4 + t * 0.6) * s.yAmp,
          Math.sin(a) * s.radius * 0.65 - 0.5
        );
        s.mesh.rotation.x = t * 1.4;
        s.mesh.rotation.y = t * 1.1;
      });

      rootGroup.rotation.y = mouse.x * 0.25;
      rootGroup.rotation.x = -mouse.y * 0.18;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', onPointerMove);
      knotGeo.dispose();
      knotMat.dispose();
      shellGeo.dispose();
      shellMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      voxelGeo.dispose();
      limeMat.dispose();
      cobaltMat.dispose();
      shockGeo.dispose();
      shockMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
};
