/**
 * API Helper Utilities
 * Provides timeout handling, retry logic, and AbortController for all API calls
 * Optimized for iOS network reliability
 */

interface FetchOptions {
  timeout?: number; // milliseconds (default: 5000)
  maxRetries?: number; // number of retries (default: 2)
  retryDelay?: number; // milliseconds between retries (default: 1000)
  backoffMultiplier?: number; // exponential backoff multiplier (default: 2)
}

const DEFAULT_OPTIONS: FetchOptions = {
  timeout: 5000,
  maxRetries: 2,
  retryDelay: 1000,
  backoffMultiplier: 2,
};

/**
 * Fetch with timeout support
 * Rejects if fetch takes longer than timeout
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs: number = DEFAULT_OPTIONS.timeout!
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`API request timeout after ${timeoutMs}ms`);
    }
    throw error;
  }
}

/**
 * Fetch with retry logic
 * Retries on network errors and 5xx server errors
 * Uses exponential backoff between retries
 */
export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  fetchOptions: FetchOptions = {}
): Promise<Response> {
  const config = { ...DEFAULT_OPTIONS, ...fetchOptions };
  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= config.maxRetries!; attempt++) {
    try {
      const response = await fetchWithTimeout(url, options, config.timeout);

      // Retry on 5xx server errors
      if (response.status >= 500) {
        if (attempt < config.maxRetries!) {
          const delay =
            config.retryDelay! *
            Math.pow(config.backoffMultiplier!, attempt);
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }
      }

      return response;
    } catch (error) {
      lastError = error as Error;

      // Only retry on network errors, not on other errors
      if (attempt < config.maxRetries!) {
        const delay =
          config.retryDelay! * Math.pow(config.backoffMultiplier!, attempt);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
    }
  }

  throw lastError;
}

/**
 * Helper to fetch JSON data with retry logic
 * Combines timeout + retry + JSON parsing
 */
export async function fetchJSON<T>(
  url: string,
  options: RequestInit = {},
  fetchOptions: FetchOptions = {}
): Promise<T> {
  const response = await fetchWithRetry(url, options, fetchOptions);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`
    );
  }

  try {
    const data = await response.json();
    return data as T;
  } catch (error) {
    throw new Error(`Failed to parse JSON from ${url}: ${error}`);
  }
}
