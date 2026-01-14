/**
 * Mobile utility functions for better device detection and viewport handling
 */

/**
 * Detect if the device is mobile based on user agent and screen size
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileKeywords = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'];
  
  const isMobileUserAgent = mobileKeywords.some(keyword => userAgent.includes(keyword));
  const isMobileScreen = window.innerWidth < 768;
  
  return isMobileUserAgent || isMobileScreen;
};

/**
 * Get actual viewport height (fixes iOS Safari viewport issues)
 */
export const getViewportHeight = (): number => {
  if (typeof window === 'undefined') return 0;
  
  // Use visual viewport if available (better for mobile browsers)
  if (window.visualViewport) {
    return window.visualViewport.height;
  }
  
  // Fallback to window.innerHeight
  return window.innerHeight;
};

/**
 * Set CSS custom property for actual viewport height
 * Useful for mobile browsers where 100vh doesn't account for address bar
 */
export const setViewportHeightProperty = (): void => {
  if (typeof window === 'undefined') return;
  
  const vh = getViewportHeight() * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

/**
 * Fix viewport issues on mobile devices
 * Call this on mount and resize
 */
export const fixMobileViewport = (): void => {
  if (typeof window === 'undefined') return;
  
  // Set viewport height property
  setViewportHeightProperty();
  
  // Prevent zoom on iOS
  const metaViewport = document.querySelector('meta[name="viewport"]');
  if (metaViewport) {
    metaViewport.setAttribute('content', 
      'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover'
    );
  } else {
    // Create viewport meta tag if it doesn't exist
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover';
    document.head.appendChild(meta);
  }
  
  // Prevent overscroll/bounce on iOS
  document.body.style.overscrollBehavior = 'none';
  
  // Fix for iOS address bar height change
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', setViewportHeightProperty);
  }
};

/**
 * Get safe area insets for notched devices
 */
export const getSafeAreaInsets = () => {
  if (typeof window === 'undefined') return { top: 0, right: 0, bottom: 0, left: 0 };
  
  const style = getComputedStyle(document.documentElement);
  
  return {
    top: parseInt(style.getPropertyValue('env(safe-area-inset-top)') || '0'),
    right: parseInt(style.getPropertyValue('env(safe-area-inset-right)') || '0'),
    bottom: parseInt(style.getPropertyValue('env(safe-area-inset-bottom)') || '0'),
    left: parseInt(style.getPropertyValue('env(safe-area-inset-left)') || '0'),
  };
};

/**
 * Detect if device is in landscape mode
 */
export const isLandscape = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth > window.innerHeight;
};

/**
 * Get device pixel ratio
 */
export const getDevicePixelRatio = (): number => {
  if (typeof window === 'undefined') return 1;
  return window.devicePixelRatio || 1;
};

/**
 * Detect iOS device
 */
export const isIOS = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
};

/**
 * Detect Android device
 */
export const isAndroid = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent.toLowerCase();
  return /android/.test(userAgent);
};

/**
 * Prevent body scroll (useful for modals)
 */
export const disableBodyScroll = (): void => {
  if (typeof window === 'undefined') return;
  
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
  document.body.style.top = `-${window.scrollY}px`;
};

/**
 * Enable body scroll
 */
export const enableBodyScroll = (): void => {
  if (typeof window === 'undefined') return;
  
  const scrollY = document.body.style.top;
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.width = '';
  document.body.style.top = '';
  
  if (scrollY) {
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }
};
