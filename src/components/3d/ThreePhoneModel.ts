import * as THREE from 'three';

/**
 * Creates an exact, CAD-accurate 3D iPhone 17 Pro Max mesh group in Three.js
 * (Dimensions ratio 2.10:1 matching authentic iPhone 17 Pro Max 163mm x 77.6mm),
 * with 1:1 undistorted aspect ratio for the screen UI (phone.png).
 */
export function createIPhone17ProMax3D(): {
  group: THREE.Group;
  screenMaterial: THREE.MeshBasicMaterial;
  update: (time: number) => void;
} {
  const group = new THREE.Group();

  // CAD Blueprint Specs: 163.4mm (H) x 78.0mm (W) x 8.75mm (D)
  // Display: 1320px (W) x 2868px (H), 6.9" diagonal (175mm) @ 460 ppi -> 72.88mm x 158.36mm
  const W = 3.65;
  const H = 3.65 * (163.4 / 78.0); // 7.6465
  const D = 3.65 * (8.75 / 78.0);  // 0.4095
  const R = 3.65 * (14.2 / 78.0);  // 0.664 (Chassis corner radius)

  // Screen CAD Dimensions: 72.88mm x 158.36mm -> exact ratio 2868 / 1320 = 2.1727:1
  const sW = 3.65 * (72.88 / 78.0); // 3.410
  const sH = 3.65 * (158.36 / 78.0); // 7.410 (ratio sH / sW = 2.1727)
  const sR = 3.65 * (11.5 / 78.0); // 0.538 (Screen corner radius)

  const hw = W / 2;
  const hh = H / 2;

  // 1. Titanium Chassis Geometry (Extruded Rounded Rectangle with Bevel)
  const chassisShape = new THREE.Shape();
  chassisShape.moveTo(-hw + R, -hh);
  chassisShape.lineTo(hw - R, -hh);
  chassisShape.absarc(hw - R, -hh + R, R, -Math.PI / 2, 0, false);
  chassisShape.lineTo(hw, hh - R);
  chassisShape.absarc(hw - R, hh - R, R, 0, Math.PI / 2, false);
  chassisShape.lineTo(-hw + R, hh);
  chassisShape.absarc(-hw + R, hh - R, R, Math.PI / 2, Math.PI, false);
  chassisShape.lineTo(-hw, -hh + R);
  chassisShape.absarc(-hw + R, -hh + R, R, Math.PI, Math.PI * 1.5, false);

  const chassisSettings: THREE.ExtrudeGeometryOptions = {
    depth: D,
    bevelEnabled: true,
    bevelSegments: 8,
    steps: 1,
    bevelSize: 0.04,
    bevelThickness: 0.04,
  };

  const chassisGeo = new THREE.ExtrudeGeometry(chassisShape, chassisSettings);
  chassisGeo.center();

  // Premium Natural Titanium PBR Material with bright metallic gleam
  const titaniumMaterial = new THREE.MeshStandardMaterial({
    color: 0x686c78, // Natural Titanium
    metalness: 0.98,
    roughness: 0.18,
  });

  const chassisMesh = new THREE.Mesh(chassisGeo, titaniumMaterial);
  group.add(chassisMesh);

  // 2. Front Screen Face (Rounded geometry matching screen boundary)
  const screenShape = new THREE.Shape();
  const shw = sW / 2;
  const shh = sH / 2;
  screenShape.moveTo(-shw + sR, -shh);
  screenShape.lineTo(shw - sR, -shh);
  screenShape.absarc(shw - sR, -shh + sR, sR, -Math.PI / 2, 0, false);
  screenShape.lineTo(shw, shh - sR);
  screenShape.absarc(shw - sR, shh - sR, sR, 0, Math.PI / 2, false);
  screenShape.lineTo(-shw + sR, shh);
  screenShape.absarc(-shw + sR, shh - sR, sR, Math.PI / 2, Math.PI, false);
  screenShape.lineTo(-shw, -shh + sR);
  screenShape.absarc(-shw + sR, -shh + sR, sR, Math.PI, Math.PI * 1.5, false);

  const screenGeo = new THREE.ShapeGeometry(screenShape, 32);

  // Compute normalized 0..1 UV coordinates for screen geometry
  const pos = screenGeo.attributes.position;
  const uvs = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    uvs[i * 2] = (x + shw) / sW;
    uvs[i * 2 + 1] = (y + shh) / sH;
  }
  screenGeo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

  // High-resolution Canvas Texture composing phone.png at 1320 x 2868 exact blueprint resolution
  const canvas = document.createElement('canvas');
  canvas.width = 1320;
  canvas.height = 2868; // Exact 2.1727:1 ratio matching sH / sW (1320 x 2868)
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#F8F9FD';
    ctx.fillRect(0, 0, 1320, 2868);
  }

  const screenTexture = new THREE.CanvasTexture(canvas);
  screenTexture.colorSpace = THREE.SRGBColorSpace;
  screenTexture.minFilter = THREE.LinearFilter;
  screenTexture.magFilter = THREE.LinearFilter;
  screenTexture.generateMipmaps = false;

  const screenMaterial = new THREE.MeshBasicMaterial({
    map: screenTexture,
  });

  // Load phone.png and draw top overview + bottom nav bar at 1:1 scale
  const img = new Image();
  img.src = '/assets/image/expensex_screen_ui.png';
  img.onload = () => {
    if (!ctx) return;
    ctx.fillStyle = '#F8F9FD';
    ctx.fillRect(0, 0, 1320, 2868);

    // Scale factor to fit 1320 width
    const scale = 1320 / 420; // 3.142857

    // 1. Draw top section (header, Balance Overview, Health circle, Safe to Spend, AI insight, Upcoming payments)
    const topH = 808;
    const drawnTopH = Math.round(topH * scale); // ~2539px
    ctx.drawImage(img, 0, 0, 420, topH, 0, 0, 1320, drawnTopH);

    // 2. Draw bottom navigation bar pinned to bottom
    const navBarH = 105;
    const drawnNavH = Math.round(navBarH * scale); // ~330px
    ctx.drawImage(
      img,
      0, img.height - navBarH, 420, navBarH,
      0, 2868 - drawnNavH, 1320, drawnNavH
    );

    // 3. Dynamic Island Pill (top center) - authentic blueprint dimensions
    // Width: 360px, Height: 108px, Radius: 54px
    const diW = 360;
    const diH = 108;
    const diR = 54;
    const diX = (1320 - diW) / 2;
    const diY = 44;

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(diX, diY, diW, diH, diR);
    ctx.fillStyle = '#050508';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.stroke();

    // Front Camera Lens aperture (right side of Dynamic Island)
    const camX = diX + diW - 84;
    const camY = diY + diH / 2;
    ctx.beginPath();
    ctx.arc(camX, camY, 20, 0, Math.PI * 2);
    ctx.fillStyle = '#070C18';
    ctx.fill();

    // Camera sapphire glare
    ctx.beginPath();
    ctx.arc(camX, camY, 13, 0, Math.PI * 2);
    ctx.fillStyle = '#1E3A8A';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(camX + 4, camY - 4, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fill();

    // TrueDepth / FaceID Sensor (left side of Dynamic Island)
    const sensorX = diX + 78;
    const sensorY = diY + diH / 2;
    ctx.beginPath();
    ctx.arc(sensorX, sensorY, 14, 0, Math.PI * 2);
    ctx.fillStyle = '#0F121C';
    ctx.fill();

    // 4. Apple iOS Home Indicator Bar pinned above bottom bezel
    const barW = 440;
    const barH = 16;
    const barR = 8;
    const barX = (1320 - barW) / 2;
    const barY = 2834;

    ctx.beginPath();
    ctx.roundRect(barX, barY, barW, barH, barR);
    ctx.fillStyle = 'rgba(20, 24, 35, 0.85)';
    ctx.fill();

    ctx.restore();
    screenTexture.needsUpdate = true;
  };

  const screenMesh = new THREE.Mesh(screenGeo, screenMaterial);
  screenMesh.position.z = D / 2 + 0.042; // Sit perfectly flush on front face
  group.add(screenMesh);

  // 3. Back Plate (Frosted Titanium Glass)
  const backMaterial = new THREE.MeshStandardMaterial({
    color: 0x181a24,
    metalness: 0.5,
    roughness: 0.35,
  });
  const backMesh = new THREE.Mesh(screenGeo, backMaterial);
  backMesh.rotation.y = Math.PI; // Face backwards
  backMesh.position.z = -(D / 2 + 0.052);
  group.add(backMesh);

  // Subtle Logo on back plate
  const logoGeo = new THREE.CircleGeometry(0.24, 32);
  const logoMat = new THREE.MeshStandardMaterial({
    color: 0x8b5cf6,
    metalness: 0.9,
    roughness: 0.2,
    emissive: 0x3b1d7d,
    emissiveIntensity: 0.6,
  });
  const logoMesh = new THREE.Mesh(logoGeo, logoMat);
  logoMesh.rotation.y = Math.PI;
  logoMesh.position.set(0, 0, -(D / 2 + 0.055));
  group.add(logoMesh);

  // 4. Rear Camera Plateau (3D Island on back)
  const cameraBumpGroup = new THREE.Group();
  const bumpShape = new THREE.Shape();
  const bS = 1.45; // Bump size
  const bR = 0.35; // Bump corner radius
  const bHalf = bS / 2;
  bumpShape.moveTo(-bHalf + bR, -bHalf);
  bumpShape.lineTo(bHalf - bR, -bHalf);
  bumpShape.absarc(bHalf - bR, -bHalf + bR, bR, -Math.PI / 2, 0, false);
  bumpShape.lineTo(bHalf, bHalf - bR);
  bumpShape.absarc(bHalf - bR, bHalf - bR, bR, 0, Math.PI / 2, false);
  bumpShape.lineTo(-bHalf + bR, bHalf);
  bumpShape.absarc(-bHalf + bR, bHalf - bR, bR, Math.PI / 2, Math.PI, false);
  bumpShape.lineTo(-bHalf, -bHalf + bR);
  bumpShape.absarc(-bHalf + bR, -bHalf + bR, bR, Math.PI, Math.PI * 1.5, false);

  const bumpExtrude: THREE.ExtrudeGeometryOptions = {
    depth: 0.12,
    bevelEnabled: true,
    bevelSegments: 6,
    steps: 1,
    bevelSize: 0.04,
    bevelThickness: 0.04,
  };
  const bumpGeo = new THREE.ExtrudeGeometry(bumpShape, bumpExtrude);
  bumpGeo.center();

  const bumpMat = new THREE.MeshStandardMaterial({
    color: 0x222530,
    metalness: 0.7,
    roughness: 0.28,
  });
  const bumpMesh = new THREE.Mesh(bumpGeo, bumpMat);
  cameraBumpGroup.add(bumpMesh);

  // 3 Large Sapphire Lenses
  const lensPositions = [
    { x: -0.36, y: 0.36 },
    { x: -0.36, y: -0.36 },
    { x: 0.36, y: 0.0 },
  ];

  lensPositions.forEach((lPos) => {
    // Metal lens ring
    const ringGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.14, 32);
    ringGeo.rotateX(Math.PI / 2);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x5a5d6a,
      metalness: 0.98,
      roughness: 0.16,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.set(lPos.x, lPos.y, 0.08);
    cameraBumpGroup.add(ringMesh);

    // Sapphire Glass Lens Element
    const lensGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.04, 32);
    lensGeo.rotateX(Math.PI / 2);
    const lensMat = new THREE.MeshPhysicalMaterial({
      color: 0x070a1a,
      metalness: 0.2,
      roughness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const innerLens = new THREE.Mesh(lensGeo, lensMat);
    innerLens.position.set(lPos.x, lPos.y, 0.14);
    cameraBumpGroup.add(innerLens);

    // Blue-purple anti-reflective reflection ring
    const reflexGeo = new THREE.RingGeometry(0.11, 0.19, 32);
    const reflexMat = new THREE.MeshBasicMaterial({
      color: 0x6d3df5,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    });
    const reflexMesh = new THREE.Mesh(reflexGeo, reflexMat);
    reflexMesh.position.set(lPos.x, lPos.y, 0.165);
    cameraBumpGroup.add(reflexMesh);
  });

  // True Tone Flash
  const flashGeo = new THREE.CircleGeometry(0.12, 24);
  const flashMat = new THREE.MeshStandardMaterial({
    color: 0xfff2e0,
    emissive: 0xffe4be,
    emissiveIntensity: 0.8,
    roughness: 0.2,
  });
  const flashMesh = new THREE.Mesh(flashGeo, flashMat);
  flashMesh.position.set(0.36, 0.44, 0.09);
  cameraBumpGroup.add(flashMesh);

  // LiDAR Sensor
  const lidarGeo = new THREE.CircleGeometry(0.1, 24);
  const lidarMat = new THREE.MeshStandardMaterial({
    color: 0x08080a,
    roughness: 0.9,
    metalness: 0.1,
  });
  const lidarMesh = new THREE.Mesh(lidarGeo, lidarMat);
  lidarMesh.position.set(0.36, -0.44, 0.09);
  cameraBumpGroup.add(lidarMesh);

  // Rear Mic Pinhole
  const micGeo = new THREE.CircleGeometry(0.028, 16);
  const micMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const micMesh = new THREE.Mesh(micGeo, micMat);
  micMesh.position.set(0.0, -0.44, 0.09);
  cameraBumpGroup.add(micMesh);

  // Position camera bump on top-left of back plate
  cameraBumpGroup.rotation.y = Math.PI; // Face backwards
  cameraBumpGroup.position.set(-0.82, 2.55, -(D / 2 + 0.07));
  group.add(cameraBumpGroup);

  // 5. Side Buttons (Titanium)
  const buttonMat = new THREE.MeshStandardMaterial({
    color: 0x4a4d58,
    metalness: 0.96,
    roughness: 0.2,
  });

  // Power Button (Right Side)
  const powerGeo = new THREE.BoxGeometry(0.05, 0.84, 0.08);
  const powerMesh = new THREE.Mesh(powerGeo, buttonMat);
  powerMesh.position.set(hw + 0.05, 0.85, 0);
  group.add(powerMesh);

  // New Camera Control Capacitive Button (Right Side, blueprint .34" / 8.75mm view)
  const camControlGeo = new THREE.BoxGeometry(0.04, 0.70, 0.06);
  const camControlMesh = new THREE.Mesh(camControlGeo, buttonMat);
  camControlMesh.position.set(hw + 0.04, -1.35, 0);
  group.add(camControlMesh);

  // Action Button (Left Side)
  const actionGeo = new THREE.BoxGeometry(0.05, 0.38, 0.08);
  const actionMesh = new THREE.Mesh(actionGeo, buttonMat);
  actionMesh.position.set(-(hw + 0.05), 1.95, 0);
  group.add(actionMesh);

  // Volume Up Button (Left Side)
  const volUpGeo = new THREE.BoxGeometry(0.05, 0.62, 0.08);
  const volUpMesh = new THREE.Mesh(volUpGeo, buttonMat);
  volUpMesh.position.set(-(hw + 0.05), 1.25, 0);
  group.add(volUpMesh);

  // Volume Down Button (Left Side)
  const volDownGeo = new THREE.BoxGeometry(0.05, 0.62, 0.08);
  const volDownMesh = new THREE.Mesh(volDownGeo, buttonMat);
  volDownMesh.position.set(-(hw + 0.05), 0.55, 0);
  group.add(volDownMesh);

  // 6. USB-C Port at Bottom
  const usbcGeo = new THREE.BoxGeometry(0.48, 0.04, 0.12);
  const usbcMat = new THREE.MeshBasicMaterial({ color: 0x050508 });
  const usbcMesh = new THREE.Mesh(usbcGeo, usbcMat);
  usbcMesh.position.set(0, -(hh + 0.04), 0);
  group.add(usbcMesh);

  // Speaker and Mic Grille Holes flanking USB-C
  const speakerMat = new THREE.MeshBasicMaterial({ color: 0x11131a });
  for (let i = 0; i < 5; i++) {
    const sHoleGeo = new THREE.BoxGeometry(0.024, 0.024, 0.08);
    // Right side speaker holes
    const sRight = new THREE.Mesh(sHoleGeo, speakerMat);
    sRight.position.set(0.45 + i * 0.065, -(hh + 0.04), 0);
    group.add(sRight);
    // Left side mic holes
    if (i < 3) {
      const sLeft = new THREE.Mesh(sHoleGeo, speakerMat);
      sLeft.position.set(-(0.45 + i * 0.065), -(hh + 0.04), 0);
      group.add(sLeft);
    }
  }

  // 7. Ground Pedestal (Museum-Grade Metallic Stage under the Phone)
  const pedestalGroup = new THREE.Group();
  const pedDiscGeo = new THREE.CylinderGeometry(2.2, 2.5, 0.16, 48);
  const pedDiscMat = new THREE.MeshStandardMaterial({
    color: 0x0c0f1c,
    metalness: 0.9,
    roughness: 0.28,
  });
  const pedDiscMesh = new THREE.Mesh(pedDiscGeo, pedDiscMat);
  pedestalGroup.add(pedDiscMesh);

  // Glowing neon perimeter ring on the pedestal
  const pedRingGeo = new THREE.TorusGeometry(2.22, 0.024, 16, 64);
  pedRingGeo.rotateX(Math.PI / 2);
  const pedRingMat = new THREE.MeshBasicMaterial({
    color: 0x8b5cf6,
    transparent: true,
    opacity: 0.8,
  });
  pedestalGroup.add(new THREE.Mesh(pedRingGeo, pedRingMat));

  // Outer ambient shadow disc on the ground
  const shadowGeo = new THREE.CircleGeometry(3.0, 32);
  shadowGeo.rotateX(-Math.PI / 2);
  const shadowMat = new THREE.MeshBasicMaterial({
    color: 0x030408,
    transparent: true,
    opacity: 0.6,
  });
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.position.y = -0.09;
  pedestalGroup.add(shadowMesh);

  pedestalGroup.position.set(0, -(hh + 0.1), 0);
  group.add(pedestalGroup);

  // 8. 3D Glowing Orbital Trajectory (Wrapping around the phone)
  const orbitGroup = new THREE.Group();
  // Create 3D elliptical points wrapping diagonally around phone
  const orbitPoints: THREE.Vector3[] = [];
  const numOrbitPts = 100;
  const rx = 2.6;
  const ry = 4.4;
  for (let i = 0; i <= numOrbitPts; i++) {
    const theta = (i / numOrbitPts) * Math.PI * 2;
    const ox = Math.cos(theta) * rx;
    const oy = Math.sin(theta) * ry;
    // Angle in 3D so it passes behind on left/top and in front on right/bottom
    const oz = Math.sin(theta) * 1.8 + Math.cos(theta) * 0.6;
    orbitPoints.push(new THREE.Vector3(ox, oy, oz));
  }
  const orbitCurve = new THREE.CatmullRomCurve3(orbitPoints, true);
  const orbitGeo = new THREE.TubeGeometry(orbitCurve, 100, 0.016, 8, true);
  const orbitMat = new THREE.MeshBasicMaterial({
    color: 0xff7a36, // Glowing amber/orange
    transparent: true,
    opacity: 0.65,
  });
  const orbitMesh = new THREE.Mesh(orbitGeo, orbitMat);
  orbitMesh.rotation.z = -0.22;
  orbitGroup.add(orbitMesh);

  // Animated Glowing Energy Orb traveling along the orbit
  const orbCoreGeo = new THREE.SphereGeometry(0.12, 24, 24);
  const orbCoreMat = new THREE.MeshBasicMaterial({ color: 0xffd54f });
  const orbMesh = new THREE.Mesh(orbCoreGeo, orbCoreMat);

  // Outer glowing aura
  const orbAuraGeo = new THREE.SphereGeometry(0.26, 16, 16);
  const orbAuraMat = new THREE.MeshBasicMaterial({
    color: 0xff7a36,
    transparent: true,
    opacity: 0.5,
  });
  orbMesh.add(new THREE.Mesh(orbAuraGeo, orbAuraMat));

  // Light cast from the orb onto the phone body
  const orbLight = new THREE.PointLight(0xff8a36, 4.0, 5.5);
  orbMesh.add(orbLight);
  orbitGroup.add(orbMesh);

  group.add(orbitGroup);

  // 9. Floating 3D Coin ($ Taka Currency Coin on Left)
  const coinGroup = new THREE.Group();
  const coinGeo = new THREE.CylinderGeometry(0.52, 0.52, 0.08, 48);
  coinGeo.rotateX(Math.PI / 2);
  coinGeo.rotateZ(-Math.PI / 2);

  const coinCanvas = document.createElement('canvas');
  coinCanvas.width = 512;
  coinCanvas.height = 512;
  const cCtx = coinCanvas.getContext('2d');
  if (cCtx) {
    // Rich radial metallic dark obsidian gradient
    const grad = cCtx.createRadialGradient(256, 256, 30, 256, 256, 256);
    grad.addColorStop(0, '#321F64');
    grad.addColorStop(0.6, '#1A1238');
    grad.addColorStop(1, '#0C091A');
    cCtx.fillStyle = grad;
    cCtx.fillRect(0, 0, 512, 512);

    // Glowing golden outer border
    cCtx.shadowColor = '#FFAA33';
    cCtx.shadowBlur = 18;
    cCtx.strokeStyle = '#FFAA33';
    cCtx.lineWidth = 16;
    cCtx.beginPath();
    cCtx.arc(256, 256, 228, 0, Math.PI * 2);
    cCtx.stroke();

    // Inner electric purple border
    cCtx.shadowColor = '#A78BFA';
    cCtx.shadowBlur = 12;
    cCtx.strokeStyle = '#A78BFA';
    cCtx.lineWidth = 6;
    cCtx.beginPath();
    cCtx.arc(256, 256, 202, 0, Math.PI * 2);
    cCtx.stroke();

    // Decorative currency dots around ring
    cCtx.shadowBlur = 0;
    cCtx.fillStyle = '#FFAA33';
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2;
      const x = 256 + Math.cos(angle) * 184;
      const y = 256 + Math.sin(angle) * 184;
      cCtx.beginPath();
      cCtx.arc(x, y, 5, 0, Math.PI * 2);
      cCtx.fill();
    }

    // Huge, brilliant glowing golden/white $ Symbol
    cCtx.shadowColor = '#FFD700';
    cCtx.shadowBlur = 26;
    cCtx.fillStyle = '#FFFFFF';
    cCtx.font = '900 240px -apple-system, system-ui, sans-serif';
    cCtx.textAlign = 'center';
    cCtx.textBaseline = 'middle';
    cCtx.fillText('$', 256, 256);

    // Subtitle label: USD COIN
    cCtx.shadowColor = '#FFAA33';
    cCtx.shadowBlur = 10;
    cCtx.fillStyle = '#FFAA33';
    cCtx.font = '800 28px -apple-system, system-ui, sans-serif';
    cCtx.fillText('USD', 256, 380);
  }
  const coinTex = new THREE.CanvasTexture(coinCanvas);
  coinTex.colorSpace = THREE.SRGBColorSpace;

  const coinMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: coinTex,
    emissive: 0xffffff,
    emissiveMap: coinTex,
    emissiveIntensity: 0.9,
    metalness: 0.25,
    roughness: 0.2,
  });
  const coinMesh = new THREE.Mesh(coinGeo, coinMat);
  coinGroup.add(coinMesh);

  // Outer glowing golden rim
  const coinRimGeo = new THREE.TorusGeometry(0.53, 0.024, 16, 48);
  const coinRimMat = new THREE.MeshBasicMaterial({ color: 0xffaa33 });
  coinGroup.add(new THREE.Mesh(coinRimGeo, coinRimMat));

  coinGroup.position.set(-2.55, 0.5, 0.7);
  group.add(coinGroup);

  // 10. Floating 3D Bar Chart Badge (Top-Left)
  const chartGroup = new THREE.Group();
  const chartPlateGeo = new THREE.BoxGeometry(0.96, 0.96, 0.08);

  const chartCanvas = document.createElement('canvas');
  chartCanvas.width = 512;
  chartCanvas.height = 512;
  const chCtx = chartCanvas.getContext('2d');
  if (chCtx) {
    // Glass card gradient
    const bgGrad = chCtx.createLinearGradient(0, 0, 512, 512);
    bgGrad.addColorStop(0, '#221842');
    bgGrad.addColorStop(0.6, '#140F2A');
    bgGrad.addColorStop(1, '#0A0716');
    chCtx.fillStyle = bgGrad;
    chCtx.fillRect(0, 0, 512, 512);

    // Glowing border
    chCtx.strokeStyle = '#8B5CF6';
    chCtx.lineWidth = 12;
    chCtx.strokeRect(16, 16, 480, 480);

    // Header badge: "+28% SAVINGS"
    chCtx.fillStyle = 'rgba(16, 185, 129, 0.25)';
    chCtx.strokeStyle = '#34D399';
    chCtx.lineWidth = 4;
    chCtx.beginPath();
    chCtx.roundRect(40, 44, 185, 56, 28);
    chCtx.fill();
    chCtx.stroke();

    chCtx.fillStyle = '#34D399';
    chCtx.font = 'bold 30px -apple-system, system-ui, sans-serif';
    chCtx.fillText('▲ +28%', 62, 83);

    chCtx.fillStyle = '#C4B5FD';
    chCtx.font = '700 24px -apple-system, system-ui, sans-serif';
    chCtx.fillText('SAVINGS', 246, 83);

    // Baseline grid
    chCtx.strokeStyle = 'rgba(167, 139, 250, 0.4)';
    chCtx.lineWidth = 4;
    chCtx.beginPath();
    chCtx.moveTo(40, 420);
    chCtx.lineTo(472, 420);
    chCtx.stroke();

    // 4 Glowing Vertical Bars
    const bars = [
      { x: 65, w: 65, h: 140, color1: '#6D3DF5', color2: '#A78BFA' },
      { x: 170, w: 65, h: 220, color1: '#06B6D4', color2: '#38BDF8' },
      { x: 275, w: 65, h: 170, color1: '#FF5A36', color2: '#FFAA33' },
      { x: 380, w: 65, h: 290, color1: '#10B981', color2: '#34D399' },
    ];

    bars.forEach((b) => {
      const bGrad = chCtx.createLinearGradient(0, 420, 0, 420 - b.h);
      bGrad.addColorStop(0, b.color1);
      bGrad.addColorStop(1, b.color2);
      chCtx.fillStyle = bGrad;
      chCtx.shadowColor = b.color2;
      chCtx.shadowBlur = 18;
      chCtx.beginPath();
      chCtx.roundRect(b.x, 420 - b.h, b.w, b.h, [12, 12, 0, 0]);
      chCtx.fill();
    });
    chCtx.shadowBlur = 0;
  }

  const chartTex = new THREE.CanvasTexture(chartCanvas);
  chartTex.colorSpace = THREE.SRGBColorSpace;

  const chartMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: chartTex,
    emissive: 0xffffff,
    emissiveMap: chartTex,
    emissiveIntensity: 0.9,
    metalness: 0.25,
    roughness: 0.2,
  });
  chartGroup.add(new THREE.Mesh(chartPlateGeo, chartMat));

  const chartRimGeo = new THREE.BoxGeometry(0.99, 0.99, 0.02);
  const chartRimMat = new THREE.MeshBasicMaterial({ color: 0xa78bfa });
  chartGroup.add(new THREE.Mesh(chartRimGeo, chartRimMat));

  chartGroup.position.set(-2.25, 2.65, 0.5);
  chartGroup.rotation.y = 0.18;
  chartGroup.rotation.x = 0.08;
  group.add(chartGroup);

  // 11. Floating 3D AI Neural Chip (Bottom-Right)
  const aiChipGroup = new THREE.Group();
  const chipPlateGeo = new THREE.BoxGeometry(0.96, 0.96, 0.08);

  const chipCanvas = document.createElement('canvas');
  chipCanvas.width = 512;
  chipCanvas.height = 512;
  const chipCtx = chipCanvas.getContext('2d');
  if (chipCtx) {
    // Deep obsidian processor core background
    const bgGrad = chipCtx.createRadialGradient(256, 256, 50, 256, 256, 256);
    bgGrad.addColorStop(0, '#1E163C');
    bgGrad.addColorStop(0.7, '#100C24');
    bgGrad.addColorStop(1, '#060410');
    chipCtx.fillStyle = bgGrad;
    chipCtx.fillRect(0, 0, 512, 512);

    // Glowing circuit board lines
    chipCtx.strokeStyle = '#A78BFA';
    chipCtx.lineWidth = 10;
    chipCtx.strokeRect(28, 28, 456, 456);

    // Corner circuit pads
    chipCtx.fillStyle = '#FFAA33';
    chipCtx.shadowColor = '#FFAA33';
    chipCtx.shadowBlur = 14;
    chipCtx.fillRect(18, 18, 36, 36);
    chipCtx.fillRect(458, 18, 36, 36);
    chipCtx.fillRect(18, 458, 36, 36);
    chipCtx.fillRect(458, 458, 36, 36);

    // Circuit traces
    chipCtx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
    chipCtx.lineWidth = 4;
    chipCtx.shadowBlur = 0;
    chipCtx.beginPath();
    chipCtx.moveTo(28, 180); chipCtx.lineTo(130, 180); chipCtx.lineTo(160, 210);
    chipCtx.moveTo(484, 180); chipCtx.lineTo(382, 180); chipCtx.lineTo(352, 210);
    chipCtx.moveTo(28, 330); chipCtx.lineTo(130, 330); chipCtx.lineTo(160, 300);
    chipCtx.moveTo(484, 330); chipCtx.lineTo(382, 330); chipCtx.lineTo(352, 300);
    chipCtx.stroke();

    // Center Neural Frame
    chipCtx.shadowColor = '#8B5CF6';
    chipCtx.shadowBlur = 20;
    chipCtx.strokeStyle = '#8B5CF6';
    chipCtx.lineWidth = 6;
    chipCtx.strokeRect(120, 120, 272, 272);

    // Status dot
    chipCtx.shadowColor = '#34D399';
    chipCtx.shadowBlur = 14;
    chipCtx.fillStyle = '#34D399';
    chipCtx.beginPath();
    chipCtx.arc(150, 150, 9, 0, Math.PI * 2);
    chipCtx.fill();

    // Bold, glowing gradient "AI" letters
    chipCtx.shadowColor = '#38BDF8';
    chipCtx.shadowBlur = 26;
    chipCtx.fillStyle = '#FFFFFF';
    chipCtx.font = '900 170px -apple-system, system-ui, sans-serif';
    chipCtx.textAlign = 'center';
    chipCtx.textBaseline = 'middle';
    chipCtx.fillText('AI', 256, 245);

    // Subtitle
    chipCtx.shadowColor = '#A78BFA';
    chipCtx.shadowBlur = 10;
    chipCtx.fillStyle = '#C4B5FD';
    chipCtx.font = '800 24px -apple-system, system-ui, sans-serif';
    chipCtx.fillText('NEURAL CORE', 256, 342);
  }
  const chipTex = new THREE.CanvasTexture(chipCanvas);
  chipTex.colorSpace = THREE.SRGBColorSpace;

  const chipMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: chipTex,
    emissive: 0xffffff,
    emissiveMap: chipTex,
    emissiveIntensity: 0.9,
    metalness: 0.25,
    roughness: 0.2,
  });
  aiChipGroup.add(new THREE.Mesh(chipPlateGeo, chipMat));

  const chipRimGeo = new THREE.BoxGeometry(0.99, 0.99, 0.02);
  const chipRimMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
  aiChipGroup.add(new THREE.Mesh(chipRimGeo, chipRimMat));

  aiChipGroup.position.set(2.4, -1.75, 0.75);
  aiChipGroup.rotation.y = -0.22;
  aiChipGroup.rotation.x = -0.06;
  group.add(aiChipGroup);

  return {
    group,
    screenMaterial,
    update: (time: number) => {
      // 1. Orbit the glowing energy orb along the 3D trajectory
      const t = (time * 0.18) % 1;
      const pt = orbitCurve.getPoint(t);
      pt.applyEuler(new THREE.Euler(0, 0, -0.22));
      orbMesh.position.copy(pt);

      // 2. Floating bobbing and gentle oscillation for 3D elements (always facing forward!)
      coinGroup.position.y = 0.5 + Math.sin(time * 1.8) * 0.12;
      coinGroup.rotation.y = Math.sin(time * 1.2) * 0.35; // Gentle oscillation - NEVER flips edge-on!
      coinGroup.rotation.z = Math.sin(time * 1.0) * 0.1;

      chartGroup.position.y = 2.65 + Math.sin(time * 1.5 + 1.0) * 0.1;
      chartGroup.rotation.y = 0.18 + Math.sin(time * 0.9) * 0.08;
      chartGroup.rotation.z = Math.sin(time * 0.9) * 0.05;

      aiChipGroup.position.y = -1.75 + Math.sin(time * 1.6 + 2.0) * 0.1;
      aiChipGroup.rotation.y = -0.22 + Math.sin(time * 1.1) * 0.08;
    },
  };
}
