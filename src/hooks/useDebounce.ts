/**
 * Debounce Hook for React
 * Prevents excessive function calls during rapid events (e.g., scroll, resize)
 * Useful for iOS momentum scrolling where scroll events fire rapidly
 */

export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delayMs: number = 150
): T {
  let timeoutId: NodeJS.Timeout | null = null;

  return ((...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callback(...args);
      timeoutId = null;
    }, delayMs);
  }) as T;
}

/**
 * Debounce function for immediate use (non-React)
 */
export function debounce<T extends (...args: any[]) => any>(
  callback: T,
  delayMs: number = 150
): T {
  let timeoutId: NodeJS.Timeout | null = null;

  return ((...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callback(...args);
      timeoutId = null;
    }, delayMs);
  }) as T;
}
