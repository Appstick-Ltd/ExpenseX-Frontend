import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { createIPhone17ProMax3D } from './3d/ThreePhoneModel';
import { playMicroClick } from '../utils/audio';
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
    prevPointerX: 0,
    prevPointerY: 0,
    velX: 0,
    velY: 0,
    mouseNormX: 0,
    mouseNormY: 0,
  });

  const resetRotation = useCallback(() => {
    playMicroClick();
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
    container.innerHTML = '';
    container.appendChild(canvas);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      setHasWebGL(true);
    } catch {
      setHasWebGL(false);
      return;
    }

    // 2. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 13.0);

    // 3. Cinematic Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x181432, 3.5);
    scene.add(ambientLight);

    // Key Light: Vivid Violet/Purple
    const purpleLight = new THREE.DirectionalLight(0x9d6eff, 6.0);
    purpleLight.position.set(-6, 7, 7);
    scene.add(purpleLight);

    // Rim Light: Neon Coral/Orange for cinematic metallic contour
    const coralLight = new THREE.DirectionalLight(0xff5a36, 5.0);
    coralLight.position.set(6, -5, -4);
    scene.add(coralLight);

    // Specular Highlight Light
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
    const handleMouseMove = (e: MouseEvent) => {
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
        s.targetRotX = s.baseRotX - ny * 0.22;
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      const s = stateRef.current;
      s.isPointerDown = true;
      s.prevPointerX = e.clientX;
      s.prevPointerY = e.clientY;
      s.velX = 0;
      s.velY = 0;
      canvas.style.cursor = 'grabbing';
      setIsDragging(true);
      playMicroClick();
    };

    const handlePointerMove = (e: PointerEvent) => {
      const s = stateRef.current;
      if (!s.isPointerDown) return;

      const deltaX = e.clientX - s.prevPointerX;
      const deltaY = e.clientY - s.prevPointerY;
      s.prevPointerX = e.clientX;
      s.prevPointerY = e.clientY;

      s.velX = deltaX * 0.008;
      s.velY = deltaY * 0.008;

      s.targetRotY += s.velX;
      s.targetRotX += s.velY;
      s.baseRotY = s.targetRotY;
      s.baseRotX = s.targetRotX;
      setHasRotated(true);
    };

    const handlePointerUp = () => {
      const s = stateRef.current;
      s.isPointerDown = false;
      canvas.style.cursor = 'grab';
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // 6. Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 460;
      const newH = container.clientHeight || 580;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // 7. Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const s = stateRef.current;

      // Inertia damping if released
      if (!s.isPointerDown) {
        s.targetRotY += s.velX;
        s.targetRotX += s.velY;
        s.velX *= 0.92;
        s.velY *= 0.92;
      }

      // Smooth interpolation (Lerp) towards target rotation
      s.rotX += (s.targetRotX - s.rotX) * 0.08;
      s.rotY += (s.targetRotY - s.rotY) * 0.08;
      s.rotZ += (s.targetRotZ - s.rotZ) * 0.08;

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
      window.removeEventListener('mousemove', handleMouseMove);
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
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '560px',
        height: '640px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Playful Image 1 Style Floating Annotation: "AI Insights. Better Choices. ⤹" */}
      <div
        style={{
          position: 'absolute',
          top: '28px',
          right: '-6px',
          zIndex: 4,
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            fontFamily: 'Caveat, "Dancing Script", cursive, -apple-system, sans-serif',
            fontSize: '20px',
            color: '#E2E8F0',
            lineHeight: 1.2,
            textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 0 20px rgba(139, 92, 246, 0.6)',
            letterSpacing: '0.02em',
            transform: 'rotate(6deg)',
          }}
        >
          AI Insights.<br />Better Choices.
        </div>
        <svg width="36" height="26" viewBox="0 0 40 30" fill="none" style={{ margin: '2px auto 0 auto', opacity: 0.85 }}>
          <path d="M 28 4 C 18 12, 10 18, 12 26 M 12 26 L 8 20 M 12 26 L 18 22" stroke="#A78BFA" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Playful Image 1 Style Floating Annotation: "Smarter Spending. Happier You." */}
      <div
        style={{
          position: 'absolute',
          bottom: '80px',
          left: '-16px',
          zIndex: 4,
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            fontFamily: 'Caveat, "Dancing Script", cursive, -apple-system, sans-serif',
            fontSize: '19px',
            color: '#E2E8F0',
            lineHeight: 1.2,
            textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 0 20px rgba(255, 90, 54, 0.6)',
            transform: 'rotate(-8deg)',
          }}
        >
          Smarter Spending.<br />Happier You.
        </div>
      </div>
      {/* Three.js Canvas Container */}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          zIndex: 2,
          touchAction: 'none',
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
          <span>{isDragging ? 'Rotating 3D iPhone...' : 'Interactive 3D • Drag to Spin 360°'}</span>
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
