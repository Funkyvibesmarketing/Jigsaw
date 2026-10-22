import { useEffect } from 'react';
import { frame, cancelFrame, type FrameData } from 'motion/react';
import type Lenis from 'lenis';

// Lenis runs only on desktop-like devices: wide screen + precise pointer (mouse/trackpad).
// Phones, tablets and iPads keep native touch scrolling, which is smoother there.
const DESKTOP_QUERY = '(min-width: 768px) and (pointer: fine)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const isIOS = () =>
  typeof navigator !== 'undefined' &&
  (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
    // iPadOS reports itself as Mac in desktop mode
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

const shouldEnable = () =>
  typeof window !== 'undefined' &&
  !isIOS() &&
  window.matchMedia(DESKTOP_QUERY).matches &&
  !window.matchMedia(REDUCED_MOTION_QUERY).matches;

export function useLenis() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let lenis: Lenis | null = null;
    let loading = false;
    let unmounted = false;
    let inLenisFrame = false;
    let dispatching = false;

    // Lenis runs inside Motion's frame loop (before Motion draws), not in its own requestAnimationFrame.
    // Together with the scroll event below, the page moves and every scroll animation updates in
    // the same frame. With separate loops the animations lagged one frame behind the scroll,
    // which reads as a slight shake on pinned sections.
    const raf = ({ timestamp }: FrameData) => {
      inLenisFrame = true;
      lenis?.raf(timestamp);
      inLenisFrame = false;
    };

    // The sections listen for window 'scroll', which the browser only fires on the next frame.
    // Fire it right away for each smooth-scroll step so they update in this frame.
    const syncScroll = () => {
      if (!inLenisFrame || dispatching || lenis?.isScrolling !== 'smooth') return;
      dispatching = true;
      window.dispatchEvent(new Event('scroll'));
      dispatching = false;
    };

    const handleStop = () => lenis?.stop();
    const handleStart = () => lenis?.start();

    // The menu, up-arrow etc. call window.scrollTo({ behavior: 'smooth' }). The browser's own
    // smooth scroll fights Lenis (two animations moving the page at once = judder), so while
    // Lenis is running those calls are handed to Lenis instead. Every other call (including
    // Lenis's own 'instant' scrolls) goes straight to the browser.
    const nativeScrollTo = window.scrollTo;
    function lenisScrollTo(this: Window, ...args: unknown[]) {
      const opts = args[0] as ScrollToOptions | undefined;
      if (lenis && args.length === 1 && opts && typeof opts === 'object' && opts.behavior === 'smooth') {
        const top = opts.top ?? window.scrollY;
        const distance = Math.abs(top - window.scrollY) / window.innerHeight; // in screens
        lenis.scrollTo(top, {
          force: true, // also works while a section has paused Lenis
          duration: Math.min(2.4, 1 + distance * 0.08),
          easing: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
        });
        return;
      }
      return (nativeScrollTo as (...a: unknown[]) => void).apply(window, args);
    }

    const start = () => {
      if (lenis || loading) return;
      loading = true;
      void import('lenis').then(({ default: LenisClass }) => {
        loading = false;
        if (unmounted || lenis || !shouldEnable()) return;

        lenis = new LenisClass({
          // lerp follows the wheel continuously (lower = softer glide; 0.08 smooths out
          // single mouse-wheel notches without feeling laggy)
          lerp: 0.08,
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true, // smooth mouse wheel / trackpad
          syncTouch: false, // touch screens keep native scrolling
          wheelMultiplier: 1,
          touchMultiplier: 2,
          infinite: false,
        });

        lenis.on('scroll', syncScroll);
        window.scrollTo = lenisScrollTo as typeof window.scrollTo;
        frame.update(raf, true);
      });
    };

    const destroy = () => {
      cancelFrame(raf);
      lenis?.destroy();
      lenis = null;
      if (window.scrollTo === (lenisScrollTo as unknown)) window.scrollTo = nativeScrollTo;
    };

    // Turn Lenis on/off when the window is resized across the breakpoint
    // or the device / motion preference changes.
    const update = () => (shouldEnable() ? start() : destroy());

    const desktopMq = window.matchMedia(DESKTOP_QUERY);
    const motionMq = window.matchMedia(REDUCED_MOTION_QUERY);
    desktopMq.addEventListener('change', update);
    motionMq.addEventListener('change', update);
    window.addEventListener('lenisStop', handleStop);
    window.addEventListener('lenisStart', handleStart);

    update();

    return () => {
      unmounted = true;
      desktopMq.removeEventListener('change', update);
      motionMq.removeEventListener('change', update);
      window.removeEventListener('lenisStop', handleStop);
      window.removeEventListener('lenisStart', handleStart);
      destroy();
    };
  }, []);
}
