import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { playMicroClick } from '../../utils/audio';

export const NeuralCore3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL support
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
    if (!gl) {
      setHasWebGL(false);
      return;
    }

    let animationFrameId: number;
    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.cursor = 'grab';
    container.innerHTML = '';
    container.appendChild(canvas);

    let renderer: THREE.WebGLRenderer;
    try {
      const isMobile = window.innerWidth < 768;
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: !isMobile,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.2 : 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      setHasWebGL(true);
    } catch {
      setHasWebGL(false);
      return;
    }

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.8);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0x0f1424, 2.5);
    scene.add(ambientLight);

    const purpleLight = new THREE.PointLight(0x8b5cf6, 4, 15);
    purpleLight.position.set(3, 3, 3);
    scene.add(purpleLight);

    const coralLight = new THREE.PointLight(0xff5a36, 3.5, 15);
    coralLight.position.set(-3, -2, 2);
    scene.add(coralLight);

    const centerGlow = new THREE.PointLight(0xa78bfa, 2, 8);
    centerGlow.position.set(0, 0, 0);
    scene.add(centerGlow);

    // 3. Core Objects Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // A. Outer Wireframe Icosahedron (Neural Grid)
    const icoGeo = new THREE.IcosahedronGeometry(1.9, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const icosahedron = new THREE.Mesh(icoGeo, wireMat);
    coreGroup.add(icosahedron);

    // B. Vertex Points on the Icosahedron
    const pointsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.09,
      transparent: true,
      opacity: 0.9,
    });
    const icoPoints = new THREE.Points(icoGeo, pointsMat);
    coreGroup.add(icoPoints);

    // C. Middle Gyroscope Rings (Torus)
    const ring1Geo = new THREE.TorusGeometry(1.4, 0.022, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xa78bfa,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x6d3df5,
      emissiveIntensity: 0.3,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.15, 0.02, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xff5a36,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0xff5a36,
      emissiveIntensity: 0.4,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 2;
    coreGroup.add(ring2);

    // D. Inner Neural Nucleus (Solid Glowing Core)
    const nucleusGeo = new THREE.SphereGeometry(0.55, 32, 32);
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: 0x1a1236,
      emissive: 0x8b5cf6,
      emissiveIntensity: 0.8,
      metalness: 0.8,
      roughness: 0.3,
    });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    coreGroup.add(nucleus);

    // E. Orbiting Data Packet Particles
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const pColor1 = new THREE.Color('#FF5A36');
    const pColor2 = new THREE.Color('#A78BFA');

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.3 + Math.random() * 0.7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePos[i * 3 + 2] = radius * Math.cos(phi);

      const col = Math.random() > 0.5 ? pColor1 : pColor2;
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    coreGroup.add(particles);

    // 4. Interactive Drag / Momentum Rotation
    let isPointerDown = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let velX = 0;
    let velY = 0;

    const onPointerDown = (e: MouseEvent) => {
      isPointerDown = true;
      setIsDragging(true);
      canvas.style.cursor = 'grabbing';
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
      velX = 0;
      velY = 0;
      playMicroClick();
    };

    const onPointerMove = (e: MouseEvent) => {
      if (!isPointerDown) return;
      const deltaX = e.clientX - prevPointerX;
      const deltaY = e.clientY - prevPointerY;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;

      velX = deltaX * 0.006;
      velY = deltaY * 0.006;

      coreGroup.rotation.y += velX;
      coreGroup.rotation.x += velY;
    };

    const onPointerUp = () => {
      isPointerDown = false;
      setIsDragging(false);
      canvas.style.cursor = 'grab';
    };

    canvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    // 5. Animation Loop with IntersectionObserver pause for mobile performance
    let clock = new THREE.Clock();
    let isCoreVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isCoreVisible = entry.isIntersecting;
      },
      { threshold: 0.02 }
    );
    observer.observe(container);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isCoreVisible) return; // Pause WebGL loop when scrolled away

      const elapsed = clock.getElapsedTime();

      if (!isPointerDown) {
        // Natural idle rotation
        coreGroup.rotation.y += 0.005 + velX;
        coreGroup.rotation.x += 0.003 + velY;

        // Friction damping
        velX *= 0.94;
        velY *= 0.94;
      }

      // Internal dynamic counter-rotation
      ring1.rotation.z = elapsed * 0.7;
      ring1.rotation.x = elapsed * 0.4;
      ring2.rotation.y = -elapsed * 0.6;
      ring2.rotation.z = elapsed * 0.3;

      // Pulse nucleus
      const scale = 1 + Math.sin(elapsed * 3) * 0.05;
      nucleus.scale.set(scale, scale, scale);

      // Rotate data stream
      particles.rotation.y = -elapsed * 0.25;
      particles.rotation.x = elapsed * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || 320;
      const h = container.clientHeight || 320;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      canvas.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      icoGeo.dispose();
      wireMat.dispose();
      pointsMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      nucleusGeo.dispose();
      nucleusMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '320px',
        borderRadius: '20px',
        overflow: 'hidden',
        background: 'radial-gradient(circle at center, rgba(109, 61, 245, 0.18) 0%, rgba(5, 7, 13, 0.95) 75%)',
        border: '1px solid rgba(139, 92, 246, 0.35)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(109,61,245,0.3)',
      }}
    >
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />

      {/* Fallback image if WebGL fails */}
      {hasWebGL === false && (
        <img
          src="/assets/image/ai_neural_core.jpg"
          alt="ExpenseX AI Neural Core"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}

      {/* Interactive Tag */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          padding: '5px 12px',
          borderRadius: '9999px',
          background: 'rgba(5, 7, 13, 0.85)',
          backdropFilter: 'blur(8px)',
          fontSize: '11px',
          fontWeight: 700,
          color: '#A78BFA',
          border: '1px solid rgba(139, 92, 246, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#34D399',
            boxShadow: '0 0 8px #34D399',
            animation: 'pulse 2s infinite',
          }}
        />
        <span>3D NEURAL GYROSCOPE</span>
      </div>

      {/* Drag to rotate hint */}
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          padding: '4px 10px',
          borderRadius: '9999px',
          background: 'rgba(255, 255, 255, 0.06)',
          backdropFilter: 'blur(6px)',
          fontSize: '10px',
          fontWeight: 600,
          color: 'var(--text-muted)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          pointerEvents: 'none',
        }}
      >
        {isDragging ? '⚡ Orbiting...' : '🖱️ Drag to rotate 360°'}
      </div>
    </div>
  );
};
