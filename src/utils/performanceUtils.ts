/**
 * Runs a callback when the browser is idle.
 * Falls back to setTimeout if requestIdleCallback is not available.
 */
export const runWhenIdle = (callback: () => void, timeout = 2000) => {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    (window as any).requestIdleCallback(callback, { timeout });
  } else {
    setTimeout(callback, 1);
  }
};
