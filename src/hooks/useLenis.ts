import { useEffect } from 'react';
import Lenis from 'lenis';

// Detect iOS device - Lenis MUST NOT run on iOS as it conflicts with
// Safari's native momentum scroll, causing 30-40s main-thread freezes.
const isIOS = () =>
  typeof navigator !== 'undefined' &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

export function useLenis() {
  useEffect(() => {
    // Bail out entirely on iOS — native momentum scroll is superior and
    // Lenis competes with it, locking the main thread for up to 40 seconds.
    if (isIOS()) return;

    // Document-level wheel interceptor - runs BEFORE Lenis captures events.
    // Blocks all scroll when mouse is over any [data-scroll-lock] element.
    const wheelInterceptor = (e: WheelEvent) => {
      const target = e.target as Element | null;
      if (target && target.closest('[data-scroll-lock]')) {
        e.preventDefault();
        // Note: do NOT call stopImmediatePropagation() here - that would block
        // React's onWheel handler on the card stack from firing.
        // preventDefault() alone is sufficient to stop the page from scrolling.
      }
    };
    // Must be added with capture: true so it runs before Lenis's listener
    document.addEventListener('wheel', wheelInterceptor, { passive: false, capture: true });

    // Initialize Lenis (desktop / Android only)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Integrate Lenis with requestAnimationFrame
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Allow other components to pause/resume Lenis via custom events
    const handleStop = () => lenis.stop();
    const handleStart = () => lenis.start();
    window.addEventListener('lenisStop', handleStop);
    window.addEventListener('lenisStart', handleStart);

    return () => {
      document.removeEventListener('wheel', wheelInterceptor, { capture: true });
      window.removeEventListener('lenisStop', handleStop);
      window.removeEventListener('lenisStart', handleStart);
      lenis.destroy();
    };
  }, []);
}
