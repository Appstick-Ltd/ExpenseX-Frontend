// Native Haptic Vibration Feedback Engine for Mobile Devices

export type HapticType = 'light' | 'selection' | 'medium' | 'heavy' | 'success' | 'warning';

/**
 * Triggers subtle native haptic vibration if supported by device/browser
 */
export const triggerHaptic = (type: HapticType = 'light') => {
  if (typeof window === 'undefined') return;
  if (!('vibrate' in navigator)) return;

  try {
    switch (type) {
      case 'light':
        navigator.vibrate(8);
        break;
      case 'selection':
        navigator.vibrate(12);
        break;
      case 'medium':
        navigator.vibrate(22);
        break;
      case 'heavy':
        navigator.vibrate([28, 35, 20]);
        break;
      case 'success':
        navigator.vibrate([10, 30, 15]);
        break;
      case 'warning':
        navigator.vibrate([25, 40, 25, 40, 20]);
        break;
      default:
        navigator.vibrate(10);
    }
  } catch {
    // Non-blocking fallback if permissions or battery saver prevents vibration
  }
};
