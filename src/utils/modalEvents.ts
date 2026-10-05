// Event dispatcher and listener for Early Access Modal
export type PlatformType = 'ios' | 'android' | 'both' | 'all';

export interface EarlyAccessEventDetail {
  platform?: PlatformType;
}

const MODAL_EVENT_NAME = 'expensex:open-early-access';

export const openEarlyAccessModal = (platform: PlatformType = 'both') => {
  if (typeof window === 'undefined') return;
  const event = new CustomEvent<EarlyAccessEventDetail>(MODAL_EVENT_NAME, {
    detail: { platform },
  });
  window.dispatchEvent(event);
};

export const subscribeToEarlyAccessModal = (
  callback: (detail: EarlyAccessEventDetail) => void
) => {
  if (typeof window === 'undefined') return () => {};
  const handler = (e: Event) => {
    const customEvent = e as CustomEvent<EarlyAccessEventDetail>;
    callback(customEvent.detail || {});
  };
  window.addEventListener(MODAL_EVENT_NAME, handler);
  return () => window.removeEventListener(MODAL_EVENT_NAME, handler);
};
