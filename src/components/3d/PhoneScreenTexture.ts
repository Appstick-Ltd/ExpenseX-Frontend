import * as THREE from 'three';

/**
 * Creates a vibrant, ultra-high-resolution 1024x2048 CanvasTexture representing the
 * ExpenseX AI mobile operating system & dashboard on iPhone 17 Pro Max.
 */
export function createPhoneScreenTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const W = 1024;
  const H = 2048;

  // 1. Deep OLED Background with Rich Atmospheric Glow
  const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
  bgGrad.addColorStop(0, '#0a0d1d');
  bgGrad.addColorStop(0.35, '#0f142e');
  bgGrad.addColorStop(0.7, '#090c1a');
  bgGrad.addColorStop(1, '#05070f');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // Vibrant purple ambient nebula
  const glowPurple = ctx.createRadialGradient(280, 520, 20, 280, 520, 500);
  glowPurple.addColorStop(0, 'rgba(124, 58, 237, 0.45)');
  glowPurple.addColorStop(0.5, 'rgba(109, 61, 245, 0.2)');
  glowPurple.addColorStop(1, 'rgba(109, 61, 245, 0)');
  ctx.fillStyle = glowPurple;
  ctx.fillRect(0, 0, W, H);

  // Warm coral ambient nebula
  const glowCoral = ctx.createRadialGradient(820, 780, 20, 820, 780, 480);
  glowCoral.addColorStop(0, 'rgba(255, 90, 54, 0.35)');
  glowCoral.addColorStop(0.5, 'rgba(255, 90, 54, 0.15)');
  glowCoral.addColorStop(1, 'rgba(255, 90, 54, 0)');
  ctx.fillStyle = glowCoral;
  ctx.fillRect(0, 0, W, H);

  // Helper for drawing rounded rect
  const drawRoundedRect = (
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
    fill?: string | CanvasGradient,
    stroke?: string,
    lineWidth = 1
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill();
    }
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }
  };

  // 2. iOS Status Bar
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 42px -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('9:41', 75, 105);

  // Status Icons: 5G & Battery
  ctx.font = '700 32px -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('5G', 870, 102);

  // Battery icon
  drawRoundedRect(895, 75, 68, 34, 9, undefined, '#FFFFFF', 3);
  drawRoundedRect(900, 80, 50, 24, 6, '#10B981');
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(966, 86, 5, 12);

  // 3. Dynamic Island Pill
  const pillW = 290;
  const pillH = 72;
  const pillX = (W - pillW) / 2;
  const pillY = 60;
  drawRoundedRect(pillX, pillY, pillW, pillH, pillH / 2, '#000000', 'rgba(255,255,255,0.15)', 2);

  // Camera lens reflection in Dynamic Island
  ctx.beginPath();
  ctx.arc(pillX + pillW - 60, pillY + pillH / 2, 14, 0, Math.PI * 2);
  ctx.fillStyle = '#080816';
  ctx.fill();
  ctx.strokeStyle = 'rgba(139, 92, 246, 0.6)';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Green privacy indicator dot
  ctx.beginPath();
  ctx.arc(pillX + pillW - 24, pillY + pillH / 2, 5, 0, Math.PI * 2);
  ctx.fillStyle = '#10B981';
  ctx.fill();

  // 4. Header: Greeting & User Avatar
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = '600 32px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Good morning,', 65, 215);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 58px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillText('Tanvir', 65, 278);

  // Avatar icon circle
  ctx.beginPath();
  ctx.arc(935, 245, 46, 0, Math.PI * 2);
  const avatarGrad = ctx.createLinearGradient(890, 200, 980, 290);
  avatarGrad.addColorStop(0, '#8B5CF6');
  avatarGrad.addColorStop(1, '#6D3DF5');
  ctx.fillStyle = avatarGrad;
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.4)';
  ctx.lineWidth = 3.5;
  ctx.stroke();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 38px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('T', 935, 258);

  // 5. Card 1: Financial Health Ring Gauge (Optimal • Top 12%)
  const card1Y = 325;
  const card1H = 205;
  const cardGrad1 = ctx.createLinearGradient(65, card1Y, 65, card1Y + card1H);
  cardGrad1.addColorStop(0, 'rgba(28, 35, 68, 0.88)');
  cardGrad1.addColorStop(1, 'rgba(16, 22, 45, 0.92)');
  drawRoundedRect(65, card1Y, 894, card1H, 36, cardGrad1, 'rgba(139, 92, 246, 0.45)', 2.5);

  // Ring gauge
  const ringX = 180;
  const ringY = card1Y + 102;
  const ringR = 64;
  ctx.beginPath();
  ctx.arc(ringX, ringY, ringR, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.lineWidth = 14;
  ctx.stroke();

  // Progress track
  ctx.beginPath();
  ctx.arc(ringX, ringY, ringR, -Math.PI / 2, Math.PI * 0.95);
  ctx.strokeStyle = '#10B981';
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.stroke();

  // Score text in center
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 48px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('78', ringX, ringY + 16);

  // Health label and status
  ctx.textAlign = 'left';
  ctx.fillStyle = 'rgba(196, 181, 253, 0.9)';
  ctx.font = '700 24px sans-serif';
  ctx.fillText('FINANCIAL HEALTH SCORE', 280, card1Y + 80);

  ctx.fillStyle = '#10B981';
  ctx.font = '800 38px sans-serif';
  ctx.fillText('Optimal • Top 12%', 280, card1Y + 135);

  // 6. Card 2: Safe to Spend Today
  const card2Y = 560;
  const card2H = 345;
  const cardGrad2 = ctx.createLinearGradient(65, card2Y, 65, card2Y + card2H);
  cardGrad2.addColorStop(0, 'rgba(42, 32, 90, 0.92)');
  cardGrad2.addColorStop(1, 'rgba(22, 18, 54, 0.96)');
  drawRoundedRect(65, card2Y, 894, card2H, 40, cardGrad2, 'rgba(139, 92, 246, 0.7)', 2.5);

  // Header inside card
  ctx.fillStyle = '#C4B5FD';
  ctx.font = '800 26px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('SAFE TO SPEND TODAY', 115, card2Y + 70);

  // Large Safe to Spend Value
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 86px sans-serif';
  ctx.fillText('৳18,500', 115, card2Y + 162);

  // Remaining badge
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.font = '600 28px sans-serif';
  ctx.fillText('৳10,000 remaining this week', 115, card2Y + 215);

  // Progress bar
  drawRoundedRect(115, card2Y + 235, 794, 18, 9, 'rgba(255,255,255,0.12)');
  const barGrad = ctx.createLinearGradient(115, 0, 115 + 580, 0);
  barGrad.addColorStop(0, '#8B5CF6');
  barGrad.addColorStop(1, '#FF5A36');
  drawRoundedRect(115, card2Y + 235, 580, 18, 9, barGrad);

  // AI intelligence note chip
  drawRoundedRect(115, card2Y + 272, 794, 52, 26, 'rgba(109, 61, 245, 0.35)', 'rgba(139, 92, 246, 0.6)', 1.5);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 23px sans-serif';
  ctx.fillText('✨ AI Intelligence: Based on spending, your savings are secure.', 140, card2Y + 306);

  // 7. Recent Transactions Header
  const txHeaderY = 960;
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 38px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Recent Transactions', 65, txHeaderY);

  // 8. Transactions List
  const transactions = [
    { name: 'Chillox Burgers', cat: 'Food & Dining • Yesterday', amt: '-৳450', color: '#FF5A36', icon: '🍔' },
    { name: 'Uber Ride', cat: 'Transportation • Yesterday', amt: '-৳320', color: '#FF5A36', icon: '🚗' },
    { name: 'Salary Deposit', cat: 'Income • Sep 01', amt: '+৳35,000', color: '#10B981', icon: '💼' },
    { name: 'Unimart Groceries', cat: 'Groceries • Aug 30', amt: '-৳2,850', color: '#FF5A36', icon: '🛒' },
  ];

  let currentTxY = 1000;
  transactions.forEach((tx) => {
    drawRoundedRect(65, currentTxY, 894, 126, 28, 'rgba(24, 28, 54, 0.85)', 'rgba(255,255,255,0.12)', 1.5);

    // Icon box
    drawRoundedRect(92, currentTxY + 22, 82, 82, 22, 'rgba(255,255,255,0.08)');
    ctx.font = '42px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(tx.icon, 133, currentTxY + 78);

    // Title & Category
    ctx.textAlign = 'left';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 32px sans-serif';
    ctx.fillText(tx.name, 200, currentTxY + 58);

    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '600 24px sans-serif';
    ctx.fillText(tx.cat, 200, currentTxY + 95);

    // Amount
    ctx.textAlign = 'right';
    ctx.fillStyle = tx.color;
    ctx.font = '800 36px sans-serif';
    ctx.fillText(tx.amt, 920, currentTxY + 74);

    currentTxY += 144;
  });

  // 9. iOS Bottom Navigation Bar
  const navY = 1875;
  const navH = 125;
  drawRoundedRect(65, navY, 894, navH, 40, 'rgba(16, 20, 42, 0.96)', 'rgba(255,255,255,0.18)', 1.5);

  const navTabs = ['🏠 Home', '📊 Insights', '➕ Add', '🎯 Goals', '⚙️ Settings'];
  const tabStep = 894 / 5;
  navTabs.forEach((tab, i) => {
    const tabX = 65 + i * tabStep + tabStep / 2;
    ctx.textAlign = 'center';
    ctx.fillStyle = i === 0 ? '#C4B5FD' : 'rgba(255,255,255,0.55)';
    ctx.font = i === 0 ? '800 26px sans-serif' : '600 24px sans-serif';
    ctx.fillText(tab, tabX, navY + 74);
  });

  // 10. iOS Home Bar
  const homeBarW = 340;
  const homeBarH = 10;
  const homeBarX = (W - homeBarW) / 2;
  const homeBarY = 2020;
  drawRoundedRect(homeBarX, homeBarY, homeBarW, homeBarH, 5, 'rgba(255,255,255,0.85)');

  // Convert canvas to Three.js texture with proper sRGB color space
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}
