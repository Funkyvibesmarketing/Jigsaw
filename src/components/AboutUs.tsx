import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useMotionValueEvent } from 'motion/react';
import { useRef, useEffect, useState, memo } from 'react';
import svgPathsOld from '../imports/svg-i4lcoo4sqc';
import svgPaths from '../imports/svg-z5mgt22h4a';
import imgVector from 'figma:asset/4234f71b7d4a1998f6e3282ba90ea09ce5633514.png';
import imgRectangle from "figma:asset/ac4222b2f56bb8c362d5b0a6238628c6fa0aab37.png";
import { Services } from './Services';

// Services only reacts to a few scroll thresholds, so skip re-rendering it on every scroll frame
const MemoServices = memo(Services);

// SERVICES zoom timing (fraction of this section's scroll progress)
const ZOOM_START = 0.55;
const ZOOM_END = 0.693;
// Big enough that the V's solid tip swallows the whole screen
const ZOOM_MAX_SCALE = 70;
// The solid SERVICES text is drawn with translate(40); the cutout starts at the same spot so there's no jump
const SOLID_TEXT_SHIFT = 40;
const SOLID_LETTER_SPACING = 40;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const smoothstep = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

type ZoomFocus = { x: number; y: number };
// Zoom focal point relative to the text anchor: inside the solid bottom tip of the "V"
// (the glyph's bottom edge sits at ~+50 at 200px; x is re-measured from the real font once it renders)
const DEFAULT_ZOOM_FOCUS: ZoomFocus = { x: -73, y: 36 };

// Scales around the focal point while gliding that point to the exact screen centre, so the
// letters grow evenly in every direction. At t = 0 it lines up exactly with the solid text.
const maskTransformFor = (t: number, f: ZoomFocus) => {
  const e = easeInOutQuad(t);
  const scale = Math.pow(ZOOM_MAX_SCALE, e);
  const px = (SOLID_TEXT_SHIFT + f.x) * (1 - e);
  const py = f.y * (1 - e);
  return `translate(${px} ${py}) scale(${scale}) translate(${-f.x} ${-f.y})`;
};

// Values the parent (App, nav, Reviews, cursor…) compares aboutUsScrollProgress against.
// Reporting only when one of these is crossed stops the whole page re-rendering every scroll frame.
const PARENT_THRESHOLDS = [0.01, 0.05, 0.50, 0.55, 0.68, 0.72, 0.76, 0.82, 0.98];
const parentBucket = (p: number) => (p <= 0 ? -1 : PARENT_THRESHOLDS.filter((t) => p >= t).length);
// Reviews fades in continuously across this range, so it needs every value there
const isParentContinuous = (p: number) => p >= 0.72 && p < 0.76;

// Nothing in this component's render changes during the middle of the zoom (the zoom itself runs
// off motion values), so hold React state steady there instead of re-rendering every frame
const renderProgressFor = (p: number) => (p > 0.56 && p < 0.68 ? 0.62 : p);

// Collapse scroll progress to the thresholds Services actually checks (0.40, 0.50, 0.55–0.56, 0.69, 0.9)
const servicesProgressStep = (p: number) =>
  p < 0.40 ? 0 : p < 0.50 ? 0.45 : p < 0.55 ? 0.5 : p < 0.56 ? p : p < 0.69 ? 0.6 : p < 0.9 ? 0.7 : 0.95;
import backgroundGradient from 'figma:asset/42d2cf4a66b5216ee41ff6ee702481dc6863d649.png';
import type { Service } from '../utils/servicesApi';
import type { carouselTexts } from '../utils/aboutApi';

//const carouselTexts: CarouselText[] = ;

//Carousel text items
// interface CarouselText {
//   id: number;
//   header: string;
//   text: string;
//   hasLearnMore?: boolean;
//   boldText?: string;
// }

// const carouselTexts: CarouselText[] = [
//   {
//     id: 1,
//     header: "The Origin Story.",
//     text: "Founded on the principles Nick picked up on a less-than-traditional career path—calm under pressure, straight-talking, and doing things properly - ",
//     hasLearnMore: true
//   },
//   {
//     id: 2,
//     header: "Straight Talking.",
//     text: "We keep things simple: straight answers, no jargon, no waffle. We’ll chat things through properly, so you know exactly what you’re signing up to-and why.",
//   },
//   {
//     id: 3,
//     header: "Pay What’s Fair.",
//     text: "We believe no one should pay more than necessary for any financial product — especially their mortgage — and that fees should always be clear, fair and fully explained upfront."
//   },
//   {
//     id: 4,
//     header: "Regulated, Reliable, On Your Side.",
//     text: "We’re fully authorised and regulated, which means advice you can trust-and a process that’s done properly. Friendly? Yes.Professional? Absolutely."
//   },
//   {
//     id: 5,
//     header: "One Fee, Ongoing Support.",
//     text: "You pay once for expert advice, and we don’t disappear after completion. We’ll be here for the long run-including free remortgage support when it’s time for your next step."
//   }
// ];

// Service data for Step 1 (simplified - just title and nextTitle)
interface ServiceStep1 {
  id: number;
  title: string;
  nextTitle: string;
}

// Generate Step 1 data from full services
function getServicesStep1(services: Service[]): ServiceStep1[] {
  return services.map(service => ({
    id: service.id,
    title: service.title,
    nextTitle: service.nextTitle
  }));
}

export function AboutUs({ onScrollProgress, onServicesScrollProgress, reviewsScrollProgress, services, carouselTexts, onReady }: {
  onScrollProgress?: (progress: number) => void;
  onServicesScrollProgress?: (progress: number) => void;
  reviewsScrollProgress?: number;
  services: Service[];
  carouselTexts: carouselTexts[];
  onReady?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isExtremeZoomedOut, setIsExtremeZoomedOut] = useState(window.innerWidth >= 3000);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const zoomFactor = window.innerWidth > 1920 ? (window.innerWidth / 1920) : 1;
  const viewportHeight = window.innerHeight / zoomFactor;
  const [isAutoPlay, setIsAutoPlay] = useState(false); // Control auto-advance

  // Auto-advance carousel every 5 seconds - only when isAutoPlay is true
  useEffect(() => {
    if (!isAutoPlay) return; // Don't auto-advance if paused

    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselTexts.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  // Detect mobile/desktop
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setIsExtremeZoomedOut(window.innerWidth >= 3000);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const onReadyRef = useRef(onReady);
  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  // Signal readiness on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      onReadyRef.current?.();
    }, 100);
    return () => clearTimeout(timer);
  }, []);


  // Handle down arrow click - scroll to About Us section
  const handleLearnMoreClick = () => {
    if (containerRef.current) {
      // Get the hero container height
      const heroHeight = containerRef.current.offsetHeight;
      // Scroll to the end of the hero section (which is the start of About Us)
      window.scrollTo({
        top: viewportHeight * 10,
        behavior: 'smooth'
      });
    }
  };

  // Generate Step 1 data from full services
  const servicesStep1 = getServicesStep1(services);

  // Track scroll progress through this section using zoom-safe layout metrics
  const scrollYProgress = useMotionValue(0);
  const lastParentBucketRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // start end (rect.top = viewportHeight) to end start (rect.top = -rect.height)
      const total = rect.height + viewportHeight;
      const current = viewportHeight - rect.top;
      const progress = Math.min(1, Math.max(0, current / total));
      
      scrollYProgress.set(progress);
      setScrollProgress(renderProgressFor(progress));

      const bucket = parentBucket(progress);
      if (bucket !== lastParentBucketRef.current || isParentContinuous(progress)) {
        lastParentBucketRef.current = bucket;
        onScrollProgress?.(progress);
      }

      // Report services scroll progress when in Services Step 2 range (0.78 to 1.0)
      if (progress >= 0.78 && progress < 1.0) {
        onServicesScrollProgress?.(1);
      } else {
        onServicesScrollProgress?.(0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [onScrollProgress, onServicesScrollProgress, viewportHeight]);

  // Section entry (0 → 0.20 = sliding over the hero until it locks in place)
  const entryRadius = useTransform(scrollYProgress, [0, 0.16, 0.20], [64, 64, 0]);
  const entryShadow = useTransform(
    scrollYProgress,
    [0, 0.16, 0.20],
    ['0px -24px 80px rgba(0, 0, 0, 0.45)', '0px -24px 80px rgba(0, 0, 0, 0.45)', '0px -24px 80px rgba(0, 0, 0, 0)']
  );

  // Middle text: rises + fades in while About Us slides over the hero (0.06 → 0.20, where the
  // section locks in place), stays centered, then moves up and fades out
  const middleTextY = useTransform(scrollYProgress, [0, 0.06, 0.20, 0.25, 0.35, 0.45], [120, 120, 0, 0, -150, -500]);
  const middleTextOpacity = useTransform(scrollYProgress, [0, 0.06, 0.20, 0.35, 0.45], [0, 0, 1, 1, 0]);

  // SERVICES moves continuously from bottom to middle, then stays in place during zoom
  // Starts at bottom of screen and slides up to center
  // Mobile: Faster slide (0.15 to 0.30) | Desktop: Slower slide (0.15 to 0.50)
  const servicesY = useTransform(
    scrollYProgress,
    isMobile
      ? [0, 0.15, 0.30, 0.55, 1] // Mobile: faster slide animation
      : [0, 0.15, 0.50, 0.55, 1], // Desktop: original timing
    ['100vh', '100vh', '0vh', '0vh', '0vh']
  );

  // Scale up after reaching middle, centered on letter "V" - massive zoom to fill entire screen
  // Slower zoom animation - 10% slower than before
  // 0 → 1 across the zoom
  const zoomT = useTransform(scrollYProgress, (p) => clamp01((p - ZOOM_START) / (ZOOM_END - ZOOM_START)));
  // White around the letters dissolves near the end, so the reveal fills the screen smoothly
  const overlayOpacity = useTransform(zoomT, (t) => 1 - smoothstep(0.7, 1, t));
  // Cards/titles fade in once the letters are big; before that the letters show the plain
  // dark-blue background (white cards inside the letters made them look empty)
  const servicesContentOpacity = useTransform(zoomT, (t) => smoothstep(0.45, 0.85, t));
  // Services content behind the letters settles from slightly zoomed-in to normal (depth effect)
  const servicesRevealScale = useTransform(zoomT, (t) => 1.12 - 0.12 * easeOutCubic(t));

  // Focal point of the zoom, measured from the rendered solid text (the "V")
  const zoomFocusRef = useRef<ZoomFocus>({ ...DEFAULT_ZOOM_FOCUS });
  const measureZoomFocus = (el: SVGTextElement) => {
    try {
      if (el.getNumberOfChars() < 4) return;
      const first = el.getExtentOfChar(0);
      const v = el.getExtentOfChar(3); // S E R [V] I C E S
      const anchorX = first.x + el.getComputedTextLength() / 2;
      // the char's extent includes the trailing letter-spacing, which isn't part of the glyph
      const x = v.x + (v.width - SOLID_LETTER_SPACING) / 2 - anchorX;
      if (Number.isFinite(x) && Math.abs(x) < 400) {
        zoomFocusRef.current = { ...zoomFocusRef.current, x };
      }
    } catch {
      // keep the default focus
    }
  };
  const setSolidTextRef = (el: SVGTextElement | null) => {
    if (!el) return;
    measureZoomFocus(el);
    // Re-measure once the Lato webfont is ready (first paint may use the fallback font)
    void document.fonts?.ready.then(() => el.isConnected && measureZoomFocus(el));
  };

  // Mask text is drawn once at 200px; zoom is applied as a transform straight from the scroll
  // value (no React re-render, no font relayout).
  const maskTextRef = useRef<SVGTextElement | null>(null);
  const maskOverlayRef = useRef<HTMLDivElement | null>(null);
  const setMaskTextRef = (el: SVGTextElement | null) => {
    maskTextRef.current = el;
    el?.setAttribute('transform', maskTransformFor(zoomT.get(), zoomFocusRef.current));
  };
  const setMaskOverlayRef = (el: HTMLDivElement | null) => {
    maskOverlayRef.current = el;
    if (el) el.style.opacity = String(overlayOpacity.get());
  };
  useMotionValueEvent(zoomT, 'change', (t) => {
    maskTextRef.current?.setAttribute('transform', maskTransformFor(t, zoomFocusRef.current));
  });
  useMotionValueEvent(overlayOpacity, 'change', (o) => {
    if (maskOverlayRef.current) maskOverlayRef.current.style.opacity = String(o);
  });

  // Color transitions - stays #294150 during zoom
  const servicesColor = useTransform(
    scrollYProgress,
    [0, 0.35, 0.45],
    ['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.8)', 'rgba(41, 65, 80, 1)']
  );

  // Blur effect - less blurred at bottom to be more visible, clear in the middle and during zoom
  const servicesBlur = useTransform(scrollYProgress, [0, 0.25, 0.4, 0.45], ['blur(8px)', 'blur(8px)', 'blur(4px)', 'blur(0px)']);

  // SERVICES mask opacity - visible throughout, creates cutout during zoom
  const servicesMaskOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  // Mask mode - false = solid text, true = cutout revealing background
  // Transitions when zoom starts
  const useMaskCutout = scrollProgress >= 0.55;

  // Solid text opacity - visible until mask cutout starts, very quick fade
  const solidTextOpacity = scrollProgress < 0.55 ? 1 :
    scrollProgress < 0.56 ? 1 - ((scrollProgress - 0.55) / 0.01) : 0;

  // Blue gradient at top - appears after some scroll (0.15 to 0.25), then fades out when About Us menu activates (before 0.45)
  const topGradientOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25, 0.35, 0.45], [0, 0, 1, 1, 0]);

  // Full blue screen overlay at the end - appears after zoom completes - DESKTOP ONLY
  const blueScreenOpacity = useTransform(scrollYProgress, [0.66, 0.693], [0, 1]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const currentService = services[currentIndex];
  const nextIndex = (currentIndex + 1) % services.length;
  const nextService = services[nextIndex];

  return (
    <motion.div
      ref={containerRef}
      className={`relative w-full bg-white z-[90] ${isExtremeZoomedOut ? 'about-us-extreme-zoom-out' : ''}`}
      style={{
        // Entry: slides in as a sheet with rounded top + shadow, which flatten as it locks in place
        borderTopLeftRadius: entryRadius,
        borderTopRightRadius: entryRadius,
        boxShadow: entryShadow,
        marginTop: `-${viewportHeight * 1.2}px`,
        minHeight: `${viewportHeight * 4}px`,
        touchAction: 'pan-y', // Allow vertical scrolling on touch devices
        WebkitOverflowScrolling: 'touch' // Enable momentum scrolling on iOS
      } as React.CSSProperties}
    >
      {/* About Us Content */}
      <div
        className="relative flex items-center justify-center sticky top-0 overflow-hidden"
        style={{
          height: window.innerWidth > 1920 ? `${window.innerHeight / (window.innerWidth / 1920)}px` : '100vh',
          touchAction: 'pan-y',
          WebkitOverflowScrolling: 'touch'
        } as React.CSSProperties}
      >
        {/* Blue gradient overlay at top - 100px height with 10% opacity blue at top fading to transparent, appears after scroll then fades out */}
        <motion.div
          className="absolute top-0 left-0 w-full h-[0px] bg-gradient-to-b from-[#294150]/10 to-transparent z-0"
          style={{ opacity: topGradientOpacity }}
        />

        {/* Text Carousel with Pagination and Title */}
        {scrollProgress < 0.55 && (
          <motion.div
            className="about-us-desktop-carousel absolute font-lato-light left-1/2 not-italic text-[#222526] text-center top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(1282px,90vw)] max-w-[1282px] px-4 z-[10000]"
            style={{ y: middleTextY, opacity: middleTextOpacity }}
          >
            {/* "ABOUT US" Title - Large centered text at top, slides with carousel */}
            <p
              className="about-us-desktop-eyebrow font-['Lato:Regular',sans-serif] leading-[normal] not-italic text-[160px] text-[rgba(44,70,87,0.2)] text-center uppercase mb-[100px] whitespace-nowrap"
              style={{
                letterSpacing: '0.025em'
              }}
            >
              About Us
            </p>

            {/* Carousel text - slides up/down */}
            {carouselTexts && carouselTexts.length > 0 && (
              <div className="about-us-desktop-copy-wrap relative w-full max-w-[1113px] h-[200px] mb-[100px] overflow-visible mx-auto">
              <AnimatePresence mode='wait'>
                <motion.div
                  key={carouselIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="about-us-desktop-slide absolute w-full leading-[50px] text-[40px]"
                >
                  <p className="about-us-desktop-heading font-lato-semibold">
                    {(() => {
                      const header = carouselTexts[carouselIndex].header;
                      if (!isMobile) {
                        return header.replace(/<br\s*\/?>/gi, ' ').replace(/\s+/g, ' ').replace(/\.$/, '');
                      }
                      return header.split(/<br\s*\/?>/i).reduce((acc: (string | React.ReactNode)[], part, index) => {
                        if (index > 0) acc.push(<br key={index} />);
                        acc.push(part);
                        return acc;
                      }, []);
                    })()}
                  </p><br className="about-us-desktop-heading-break" />
                  <p className="about-us-desktop-copy font-lato-regular text-[40px] leading-[56px] text-[#222526]">
                    <span>{carouselTexts[carouselIndex].text}</span>
                    {carouselTexts[carouselIndex].hasLearnMore && (
                      <a
                        className="cursor-pointer pointer-events-auto underline"
                        onClick={handleLearnMoreClick}
                        onMouseEnter={() => window.dispatchEvent(new Event('hideCursorOverlay'))}
                        onMouseLeave={() => window.dispatchEvent(new Event('showCursorOverlay'))}
                      >
                        Learn more
                      </a>
                    )}
                    {carouselTexts[carouselIndex].boldText && (
                      <span className="font-lato-semibold">{carouselTexts[carouselIndex].boldText}</span>
                    )}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* Navigation: Left Arrow + Pagination Dots + Right Arrow */}
            <div
              className="flex items-center justify-center gap-[40px] relative z-[9999] use-default-cursor"
              onMouseEnter={() => {
                window.dispatchEvent(new Event('hideCursorOverlay'));
              }}
              onMouseLeave={() => {
                window.dispatchEvent(new Event('showCursorOverlay'));
              }}
            >
              {/* Left Arrow Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCarouselIndex((prev) => (prev - 1 + carouselTexts.length) % carouselTexts.length);
                }}
                className="content-stretch flex items-center justify-center p-[4px] relative rounded-[32px] shrink-0 size-[64px] transition-all duration-200 ease-out hover:bg-[rgba(46,196,182,0.1)] group"
                style={{
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                  zIndex: 99999,
                  position: 'relative'
                }}
                aria-label="Previous slide"
              >
                <div aria-hidden="true" className="absolute border-[1.333px] border-[rgba(44,70,87,0.2)] border-solid inset-0 pointer-events-none rounded-[32px] transition-all duration-200 ease-out group-hover:border-[#2ec4b6]" />
                <div className="flex items-center justify-center relative shrink-0">
                  <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                    <div className="overflow-clip relative size-[40px]">
                      <div className="absolute flex inset-[28.38%_14.25%_28.22%_14.29%] items-center justify-center">
                        <div className="flex-none h-[17.286px] rotate-[359.849deg] w-[28.542px]">
                          <div className="relative size-full">
                            <div className="absolute inset-[-3.86%_-2.34%]">
                              <img alt="" className="block max-w-none size-full" height="18.619" src={imgVector} width="29.875" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              {/* Pagination Dots */}
              <div className="flex items-center justify-center gap-[26px]">
                {carouselTexts.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCarouselIndex(index);
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      setCarouselIndex(index);
                    }}
                    style={{
                      cursor: 'pointer',
                      pointerEvents: 'auto',
                      zIndex: 99999,
                      position: 'relative'
                    }}
                    className={`transition-all duration-300 rounded-full ${index === carouselIndex
                      ? 'w-[20px] h-[20px] bg-[#2C4657] hover:bg-[#1e3340]'
                      : 'w-[14px] h-[14px] bg-[#D9D9D9] hover:bg-[#B0B0B0] hover:scale-110'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Right Arrow Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCarouselIndex((prev) => (prev + 1) % carouselTexts.length);
                }}
                className="content-stretch flex items-center justify-center p-[4px] relative rounded-[32px] shrink-0 size-[64px] transition-all duration-200 ease-out hover:bg-[rgba(46,196,182,0.1)] group"
                style={{
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                  zIndex: 99999,
                  position: 'relative'
                }}
                aria-label="Next slide"
              >
                <div aria-hidden="true" className="absolute border-[1.333px] border-[rgba(44,70,87,0.2)] border-solid inset-0 pointer-events-none rounded-[32px] transition-all duration-200 ease-out group-hover:border-[#2ec4b6]" />
                <div className="flex items-center justify-center relative shrink-0">
                  <div className="flex-none">
                    <div className="overflow-clip relative size-[40px]">
                      <div className="absolute flex inset-[28.38%_14.25%_28.22%_14.29%] items-center justify-center">
                        <div className="flex-none h-[17.286px] rotate-[359.849deg] w-[28.542px]">
                          <div className="relative size-full">
                            <div className="absolute inset-[-3.86%_-2.34%]">
                              <img alt="" className="block max-w-none size-full" height="18.619" src={imgVector} width="29.875" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </motion.div>
        )}

        {/* Full blue screen overlay at the end - appears after zoom completes - DESKTOP ONLY */}
        <motion.div
          className="hidden md:block absolute top-0 left-0 w-full h-full z-10"
          style={{ opacity: blueScreenOpacity }}
        >
          <img src={backgroundGradient} alt="" className="w-full h-full object-cover" />
        </motion.div>

        {/* SERVICES Text Mask - reveals Services section through text cutout during zoom */}
        <motion.div
          className="absolute top-1/2 left-0 w-full h-full z-20 pointer-events-none -translate-y-1/2"
          style={{
            y: servicesY,
            touchAction: 'none', // Don't interfere with touch scrolling
            userSelect: 'none', // Prevent text selection on touch
            WebkitUserSelect: 'none',
            WebkitTouchCallout: 'none'
          } as React.CSSProperties}
        >
          {/* Global SVG container for mask definition - Safari compatible */}
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 9999
            }}
          >
            <defs>
              {/* Blur filter for solid text phase */}
              <filter id="servicesBlur">
                <feGaussianBlur stdDeviation={(() => {
                  if (scrollProgress < 0.25) return 8;
                  if (scrollProgress < 0.4) return 8;
                  if (scrollProgress < 0.45) {
                    const p = (scrollProgress - 0.4) / 0.05;
                    return 4 - (4 * p);
                  }
                  return 0;
                })()} />
              </filter>

            </defs>
          </svg>

          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{
              touchAction: 'none',
              pointerEvents: 'none'
            } as React.CSSProperties}
          >
            {/* Solid text - visible before mask cutout starts */}
            {!useMaskCutout && (
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill={(() => {
                  if (scrollProgress < 0.35) return 'rgba(255, 255, 255, 0.8)';
                  if (scrollProgress < 0.45) {
                    const p = (scrollProgress - 0.35) / 0.10;
                    return `rgba(${255 - Math.round(214 * p)}, ${255 - Math.round(190 * p)}, ${255 - Math.round(175 * p)}, 1)`;
                  }
                  return 'rgba(41, 65, 80, 1)';
                })()}
                fontSize="200"
                fontFamily="Lato, sans-serif"
                fontWeight="700"
                letterSpacing="40"
                ref={setSolidTextRef}
                filter="url(#servicesBlur)"
                transform="translate(40, 0)"
                opacity={solidTextOpacity}
              >
                SERVICES
              </text>
            )}
          </svg>
        </motion.div>

        {/* Services Step 2 Section - integrated into scroll flow */}
        <MemoServices
          scrollProgress={servicesProgressStep(scrollProgress)}
          services={services}
          reviewsScrollProgress={reviewsScrollProgress}
          revealScale={servicesRevealScale}
          revealContentOpacity={servicesContentOpacity}
        />

        {/* Services Text Mask Overlay - Safari compatible approach */}
        {/* Stays mounted to the end of the zoom; it has faded to transparent by then, so nothing pops */}
        {scrollProgress >= ZOOM_START && scrollProgress < ZOOM_END && (
          <div
            ref={setMaskOverlayRef}
            className="fixed top-0 left-0 w-full overflow-hidden pointer-events-none z-[25]"
            style={{
              willChange: 'opacity',
              height: window.innerWidth > 1920 ? `${window.innerHeight / (window.innerWidth / 1920)}px` : '100vh'
            }}
          >
            {/* SVG with mask to create cutout effect - SAME APPROACH AS TEAM */}
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <mask id="servicesTextMaskOverlay">
                  {/* White background - everything covered */}
                  <rect x="0" y="0" width="100%" height="100%" fill="white" />

                  {/* Black text - creates the cutout (hole) with zoom animation */}
                  {/* Positioned at the screen centre; zoom is a pure scale set from the scroll value (no re-render / relayout) */}
                  <svg x="50%" y="50%" overflow="visible">
                    <text
                      ref={setMaskTextRef}
                      x="0"
                      y="0"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="black"
                      fontSize="200"
                      fontFamily="Lato, sans-serif"
                      fontWeight="700"
                      letterSpacing="40"
                      transform={maskTransformFor(zoomT.get(), zoomFocusRef.current)}
                    >
                      SERVICES
                    </text>
                  </svg>
                </mask>
              </defs>

              {/* White rectangle with mask applied - Safari compatible - creates cutout revealing content below */}
              <rect x="0" y="0" width="100%" height="100%" fill="white" mask="url(#servicesTextMaskOverlay)" />
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  );
}