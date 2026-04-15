/**
 * Central API configuration
 * Uses Vite's import.meta.env to switch between environments
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://jigsaw.funkyvibes.co.uk/api';

/**
 * Helper to build full API URLs
 * @param endpoint The API endpoint path (e.g., '/blogs.php')
 */
export const getApiUrl = (endpoint: string) => {
  // Ensure base URL doesn't end with slash and endpoint starts with one if needed
  const base = API_BASE_URL.replace(/\/$/, '');
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
};
