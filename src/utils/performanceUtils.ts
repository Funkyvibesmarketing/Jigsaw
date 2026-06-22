/**
 * Runs a callback when the browser is idle.
 * Falls back to setTimeout if requestIdleCallback is not available.
 */
export const runWhenIdle = (callback: () => void, timeout = 2000) => {
  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window && !isIOS) {
    (window as any).requestIdleCallback(callback, { timeout });
  } else {
    setTimeout(callback, 16);
  }
};
