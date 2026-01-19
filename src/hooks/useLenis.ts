import { useEffect } from 'react';
import Lenis from 'lenis';

export function useLenis() {
  useEffect(() => {
    // Only initialize on desktop (>=768px)
    if (window.innerWidth < 768) {
      //return;
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2, // Duration of the smooth scroll animation
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false, // Disable smooth scrolling on touch devices
      touchMultiplier: 2,
      infinite: false,
    });

    // Integrate Lenis with requestAnimationFrame for smooth rendering
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);
}
