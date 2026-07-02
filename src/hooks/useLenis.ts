import { useEffect } from 'react';

const isIOS = () =>
  typeof navigator !== 'undefined' &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

const isMobileViewport = () =>
  typeof window !== 'undefined' && window.innerWidth < 768;

export function useLenis() {
  useEffect(() => {
    // Native scroll is faster on iOS and mobile viewports.
    if (isIOS() || isMobileViewport()) return;

    let destroyed = false;
    let cleanup: (() => void) | undefined;

    void import('lenis').then(({ default: Lenis }) => {
      if (destroyed) return;

      const wheelInterceptor = (e: WheelEvent) => {
        const target = e.target as Element | null;
        if (target && target.closest('[data-scroll-lock]')) {
          e.preventDefault();
        }
      };
      document.addEventListener('wheel', wheelInterceptor, { passive: false, capture: true });

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

      let rafId = 0;
      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      const handleStop = () => lenis.stop();
      const handleStart = () => lenis.start();
      window.addEventListener('lenisStop', handleStop);
      window.addEventListener('lenisStart', handleStart);

      cleanup = () => {
        cancelAnimationFrame(rafId);
        document.removeEventListener('wheel', wheelInterceptor, { capture: true });
        window.removeEventListener('lenisStop', handleStop);
        window.removeEventListener('lenisStart', handleStart);
        lenis.destroy();
      };
    });

    return () => {
      destroyed = true;
      cleanup?.();
    };
  }, []);
}
