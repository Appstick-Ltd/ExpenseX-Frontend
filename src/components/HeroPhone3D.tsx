import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { createIPhone17ProMax3D } from './3d/ThreePhoneModel';
import { playMicroClick } from '../utils/audio';
import { triggerHaptic } from '../utils/haptics';
import { RotateCw } from 'lucide-react';

export const HeroPhone3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hasRotated, setHasRotated] = useState(false);

  // References for smooth animation and drag physics
  const stateRef = useRef({
    rotX: 0.08,
    rotY: -0.28,
    rotZ: 0.03,
    targetRotX: 0.08,
    targetRotY: -0.28,
    targetRotZ: 0.03,
    baseRotY: -0.28,
    baseRotX: 0.08,
    isPointerDown: false,
    pointerType: 'mouse',
    startX: 0,
    startY: 0,
    prevPointerX: 0,
    prevPointerY: 0,
    isDraggingHorizontally: false,
    velX: 0,
    velY: 0,
    mouseNormX: 0,
    mouseNormY: 0,
  });

  const resetRotation = useCallback(() => {
    playMicroClick();
    triggerHaptic('medium');
    const s = stateRef.current;
    s.targetRotX = 0.08;
    s.targetRotY = -0.28;
    s.targetRotZ = 0.03;
    s.velX = 0;
    s.velY = 0;
    setHasRotated(false);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Check WebGL support
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
    if (!gl) {
      setHasWebGL(false);
      return;
    }

    let animationFrameId: number;
    const width = container.clientWidth || 460;
    const height = container.clientHeight || 580;

    // Create dynamic canvas for Three.js
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.cursor = 'grab';
    canvas.style.touchAction = 'pan-y';
    container.innerHTML = '';
    container.appendChild(canvas);

    // 2. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const aspect = width / height;
    const camera = new THREE.PerspectiveCamera(38, aspect, 0.1, 100);

    // Dynamic camera distance so the 3D phone (height 7.65) never gets cut off on any screen size
    const computeCamZ = (asp: number) => {
      if (asp < 0.65) return 14.8;
      if (asp < 0.85) return 14.2;
      if (asp < 1.0) return 13.5;
      return 13.0;
    };
    camera.position.set(0, 0, computeCamZ(aspect));

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
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;
      setHasWebGL(true);
    } catch {
      setHasWebGL(false);
      return;
    }

    // 3. Cinematic Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x181432, 3.5);
    scene.add(ambientLight);

    const purpleLight = new THREE.DirectionalLight(0x9d6eff, 6.0);
    purpleLight.position.set(-6, 7, 7);
    scene.add(purpleLight);

    const coralLight = new THREE.DirectionalLight(0xff5a36, 5.0);
    coralLight.position.set(6, -5, -4);
    scene.add(coralLight);

    const topSpecular = new THREE.DirectionalLight(0xffffff, 3.0);
    topSpecular.position.set(0, 8, 4);
    scene.add(topSpecular);

    // Cursor Follower Point Light for dynamic reflections
    const cursorLight = new THREE.PointLight(0xc4b5fd, 4.5, 14);
    cursorLight.position.set(0, 0, 8);
    scene.add(cursorLight);

    // 4. Create the 3D iPhone 17 Pro Max
    const { group: phoneGroup, update: updatePhone } = createIPhone17ProMax3D();
    scene.add(phoneGroup);

    // Initial pose
    phoneGroup.rotation.x = stateRef.current.rotX;
    phoneGroup.rotation.y = stateRef.current.rotY;
    phoneGroup.rotation.z = stateRef.current.rotZ;

    // 5. Mouse Parallax & Drag Listeners
    let isPhoneVisible = true;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isPhoneVisible) return;
      const s = stateRef.current;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      s.mouseNormX = nx;
      s.mouseNormY = ny;

      // Update cursor light
      cursorLight.position.x = nx * 5;
      cursorLight.position.y = ny * 5;

      if (!s.isPointerDown) {
        // Subtle parallax tilt when not dragging
        s.targetRotY = s.baseRotY + nx * 0.28;
        s.targetRotX = Math.max(-0.25, Math.min(0.35, s.baseRotX - ny * 0.22));
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      const s = stateRef.current;
      s.isPointerDown = true;
      s.pointerType = e.pointerType;
      s.startX = e.clientX;
      s.startY = e.clientY;
      s.prevPointerX = e.clientX;
      s.prevPointerY = e.clientY;
      s.isDraggingHorizontally = false;
      s.velX = 0;
      s.velY = 0;

      if (e.pointerType !== 'touch') {
        canvas.style.cursor = 'grabbing';
        setIsDragging(true);
        playMicroClick();
        triggerHaptic('light');
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const s = stateRef.current;
      if (!s.isPointerDown) return;

      const deltaX = e.clientX - s.prevPointerX;
      const deltaY = e.clientY - s.prevPointerY;
      const totalDx = Math.abs(e.clientX - s.startX);
      const totalDy = Math.abs(e.clientY - s.startY);

      // Mobile Touch Gesture Protection: Never trap vertical webpage scrolling!
      if (s.pointerType === 'touch' && !s.isDraggingHorizontally) {
        if (totalDy > 8 && totalDy >= totalDx) {
          // Vertical swipe = user wants to scroll the webpage!
          s.isPointerDown = false;
          setIsDragging(false);
          return;
        }
        if (totalDx > 14 && totalDx > totalDy) {
          s.isDraggingHorizontally = true;
          setIsDragging(true);
          playMicroClick();
          triggerHaptic('light');
        } else {
          return;
        }
      }

      s.prevPointerX = e.clientX;
      s.prevPointerY = e.clientY;

      s.velX = deltaX * (s.pointerType === 'touch' ? 0.007 : 0.008);
      // Zero out vertical drag on touch so phone never flips or somersaults
      s.velY = s.pointerType === 'touch' ? 0 : deltaY * 0.006;

      s.targetRotY += s.velX;
      s.targetRotX += s.velY;

      // MATHEMATICAL CLAMPING: Phone will NEVER flip upside down or invert!
      s.targetRotX = Math.max(-0.25, Math.min(0.35, s.targetRotX));

      s.baseRotY = s.targetRotY;
      s.baseRotX = s.targetRotX;
      setHasRotated(true);
    };

    const handlePointerUp = () => {
      const s = stateRef.current;
      s.isPointerDown = false;
      s.isDraggingHorizontally = false;
      canvas.style.cursor = 'grab';
      setIsDragging(false);
      if (s.pointerType === 'touch') {
        triggerHaptic('selection');
      }
    };

    // Mobile Device Gyroscope Tilt Integration (only when visible & not touch dragging)
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (!isPhoneVisible) return;
      const s = stateRef.current;
      if (s.isPointerDown) return;
      if (e.gamma === null || e.beta === null) return;
      const clampedGamma = Math.max(-35, Math.min(35, e.gamma));
      const clampedBeta = Math.max(-25, Math.min(25, e.beta - 45));
      s.targetRotY = s.baseRotY + (clampedGamma / 35) * 0.32;
      s.targetRotX = Math.max(-0.25, Math.min(0.35, s.baseRotX + (clampedBeta / 25) * 0.22));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // 6. Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 460;
      const newH = container.clientHeight || 580;
      const newAspect = newW / newH;
      camera.aspect = newAspect;
      camera.position.set(0, 0, computeCamZ(newAspect));
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // 7. Animation Loop with IntersectionObserver pause for mobile performance
    let clock = new THREE.Clock();

    const observer = new IntersectionObserver(
      ([entry]) => {
        isPhoneVisible = entry.isIntersecting;
      },
      { threshold: 0.02 }
    );
    observer.observe(container);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isPhoneVisible) return; // Pause WebGL rendering when scrolled away

      const elapsedTime = clock.getElapsedTime();
      const s = stateRef.current;

      // Inertia damping if released
      if (!s.isPointerDown) {
        s.targetRotY += s.velX;
        s.targetRotX += s.velY;
        s.velX *= 0.90;
        s.velY *= 0.90;

        // Auto-realign spring back to frontal beauty pose on mobile
        if (window.innerWidth < 768) {
          s.targetRotY += (-0.28 - s.targetRotY) * 0.025;
          s.targetRotX += (0.08 - s.targetRotX) * 0.04;
        }
      }

      // Strict clamping on targetRotX at all times
      s.targetRotX = Math.max(-0.25, Math.min(0.35, s.targetRotX));

      // Smooth interpolation (Lerp) towards target rotation
      s.rotX += (s.targetRotX - s.rotX) * 0.08;
      s.rotY += (s.targetRotY - s.rotY) * 0.08;
      s.rotZ += (s.targetRotZ - s.rotZ) * 0.08;

      s.rotX = Math.max(-0.25, Math.min(0.35, s.rotX));

      phoneGroup.rotation.x = s.rotX;
      phoneGroup.rotation.y = s.rotY;
      phoneGroup.rotation.z = s.rotZ;

      // Gentle floating levitation effect
      phoneGroup.position.y = Math.sin(elapsedTime * 1.6) * 0.16;

      updatePhone(elapsedTime);
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleOrientation);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      container.innerHTML = '';
    };
  }, []);

  return (
    <div
      className="hero-3d-phone-container"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '520px',
        height: '100%',
        minHeight: '460px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Three.js Canvas Container with touchAction pan-y to allow natural vertical page scrolling */}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          zIndex: 2,
          touchAction: 'pan-y',
        }}
      />

      {/* Fallback if WebGL fails */}
      {hasWebGL === false && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src="/assets/image/expensex_screen_ui.png"
            alt="ExpenseX AI Screen"
            style={{
              maxHeight: '520px',
              width: 'auto',
              borderRadius: '36px',
              boxShadow: '0 30px 60px rgba(0,0,0,0.8), 0 0 20px rgba(109, 61, 245, 0.4)',
              border: '3px solid #6E7280',
            }}
          />
        </div>
      )}

      {/* Interactive 3D Orbit Badge & Reset Controller */}
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          zIndex: 5,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div
          style={{
            padding: '7px 16px',
            borderRadius: '9999px',
            background: 'rgba(15, 18, 38, 0.85)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid rgba(139, 92, 246, 0.4)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5), 0 0 16px rgba(109, 61, 245, 0.25)',
            fontSize: '11px',
            fontWeight: 700,
            color: '#C4B5FD',
            letterSpacing: '0.04em',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            userSelect: 'none',
          }}
        >
          <span>✨</span>
          <span>{isDragging ? 'Rotating 3D iPhone...' : 'Interactive 3D • Swipe to Inspect'}</span>
        </div>

        {hasRotated && (
          <button
            onClick={resetRotation}
            title="Reset to default angle"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(26, 30, 58, 0.9)',
              border: '1px solid rgba(139, 92, 246, 0.45)',
              color: '#FFFFFF',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              transition: 'transform 0.2s ease, background 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <RotateCw size={13} />
          </button>
        )}
      </div>
    </div>
  );
};
