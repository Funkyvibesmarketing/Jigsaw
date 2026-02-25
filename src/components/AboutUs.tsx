import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import svgPathsOld from '../imports/svg-i4lcoo4sqc';
import svgPaths from '../imports/svg-z5mgt22h4a';
import imgVector from 'figma:asset/4234f71b7d4a1998f6e3282ba90ea09ce5633514.png';
import imgRectangle from "figma:asset/ac4222b2f56bb8c362d5b0a6238628c6fa0aab37.png";
import { Services } from './Services';
import backgroundGradient from 'figma:asset/42d2cf4a66b5216ee41ff6ee702481dc6863d649.png';
import type { Service } from '../utils/servicesApi';

// Carousel text items
interface CarouselText {
  id: number;
  header: string;
  text: string;
  hasLearnMore?: boolean;
  boldText?: string;
}

const carouselTexts: CarouselText[] = [
  {
    id: 1,
    header: "The Origin Story.",
    text: "Founded on the principles Nick picked up on a less-than-traditional career path—calm under pressure, straight-talking, and doing things properly - ",
    hasLearnMore: true
  },
  {
    id: 2,
    header: "Straight Talking.",
    text: "We keep things simple: straight answers, no jargon, no waffle. We’ll chat things through properly, so you know exactly what you’re signing up to-and why.",
  },
  {
    id: 3,
    header: "Pay What’s Fair.",
    text: "We believe no one should pay more than necessary for any financial product — especially their mortgage — and that fees should always be clear, fair and fully explained upfront."
  },
  {
    id: 4,
    header: "Regulated, Reliable, On Your Side.",
    text: "We’re fully authorised and regulated, which means advice you can trust-and a process that’s done properly. Friendly? Yes.Professional? Absolutely."
  },
  {
    id: 5,
    header: "One Fee, Ongoing Support.",
    text: "You pay once for expert advice, and we don’t disappear after completion. We’ll be here for the long run-including free remortgage support when it’s time for your next step."
  }
];

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

export function AboutUs({ onScrollProgress, onServicesScrollProgress, reviewsScrollProgress, services }: {
  onScrollProgress?: (progress: number) => void;
  onServicesScrollProgress?: (progress: number) => void;
  reviewsScrollProgress?: number;
  services: Service[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const viewportHeight = window.innerHeight
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
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      setScrollProgress(value);
      onScrollProgress?.(value);

      // Report services scroll progress when in Services Step 2 range (0.78 to 1.0)
      if (value >= 0.78 && value < 1.0) {
        onServicesScrollProgress?.(1);
      } else {
        onServicesScrollProgress?.(0);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]); // Remove onScrollProgress and onServicesScrollProgress from dependencies

  // Middle text stays centered initially, then moves up and fades out
  const middleTextY = useTransform(scrollYProgress, [0, 0.25, 0.35, 0.45], [0, 0, -150, -500]);
  const middleTextOpacity = useTransform(scrollYProgress, [0, 0.35, 0.45], [1, 1, 0]);

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
  const servicesScale = useTransform(scrollYProgress, [0.55, 0.693], [1, 15]);

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
    <div
      ref={containerRef}
      className="relative w-full bg-white z-[90]"
      style={{
        marginTop: '-120vh',
        minHeight: '400vh',
        touchAction: 'pan-y', // Allow vertical scrolling on touch devices
        WebkitOverflowScrolling: 'touch' // Enable momentum scrolling on iOS
      } as React.CSSProperties}
    >
      {/* About Us Content */}
      <div
        className="relative flex items-center justify-center min-h-screen sticky top-0 overflow-hidden"
        style={{
          touchAction: 'pan-y', // Allow vertical scrolling
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
            className="absolute font-lato-light left-1/2 not-italic text-[#222526] text-center top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(1282px,90vw)] max-w-[1282px] px-4 z-[10000]"
            style={{ y: middleTextY, opacity: middleTextOpacity }}
          >
            {/* "ABOUT US" Title - Large centered text at top, slides with carousel */}
            <p
              className="font-['Lato:Regular',sans-serif] leading-[normal] not-italic text-[160px] text-[rgba(44,70,87,0.2)] text-center uppercase mb-[100px] whitespace-nowrap"
              style={{
                letterSpacing: '0.025em'
              }}
            >
              About Us
            </p>

            {/* Carousel text - slides up/down */}
            <div className="relative w-full max-w-[1113px] h-[200px] mb-[80px] overflow-visible mx-auto">
              <AnimatePresence mode='wait'>
                <motion.div
                  key={carouselIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute w-full leading-[50px] text-[40px]"
                >
                  <p className="font-lato-semibold">{carouselTexts[carouselIndex].header}</p><br />
                  <p className="font-lato-regular text-[40px] leading-[48px] font-[400] text-[#222526] mb-40">
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

              {/* Mask for Services section - only visible through text during zoom */}
              <mask id="servicesTextMask">
                {/* Black background - everything hidden */}
                <rect x="0" y="0" width="100%" height="100%" fill="black" />

                {/* White text - reveals Services section through letters */}
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize={(() => {
                    const baseSize = 200;
                    if (scrollProgress < 0.55) return baseSize;
                    if (scrollProgress >= 0.693) return baseSize * 15; // 10% slower completion time

                    const progress = (scrollProgress - 0.55) / (0.693 - 0.55); // 10% slower zoom duration
                    const scale = 1 + (14 * progress); // 1x to 15x scale
                    return baseSize * scale;
                  })()}
                  fontFamily="Lato, sans-serif"
                  fontWeight="700"
                  letterSpacing={(() => {
                    const baseFontSize = 200;
                    const baseLetterSpacing = 40;
                    const fontSize = (() => {
                      if (scrollProgress < 0.55) return baseFontSize;
                      if (scrollProgress >= 0.693) return baseFontSize * 15;
                      const progress = (scrollProgress - 0.55) / (0.693 - 0.55);
                      const scale = 1 + (14 * progress);
                      return baseFontSize * scale;
                    })();
                    return String((baseLetterSpacing * fontSize) / baseFontSize);
                  })()}
                  transform={(() => {
                    // Center the "V" (5th letter, index 4) in "SERVICES" (8 letters)
                    // Calculate offset to move "V" to screen center
                    const baseFontSize = 200;
                    const baseLetterSpacing = 40;
                    const fontSize = (() => {
                      if (scrollProgress < 0.55) return baseFontSize;
                      if (scrollProgress >= 0.693) return baseFontSize * 15;
                      const progress = (scrollProgress - 0.55) / (0.693 - 0.55);
                      const scale = 1 + (14 * progress);
                      return baseFontSize * scale;
                    })();
                    const letterSpacing = (baseLetterSpacing * fontSize) / baseFontSize;

                    // "V" is at position 4 (0-indexed), center of word is at position 3.5
                    // Need to shift right by (4 - 3.5) = 0.5 character widths
                    const charWidth = fontSize * 0.65; // Approximate character width
                    const offset = (4 - 3.5) * (charWidth + letterSpacing);

                    return `translate(${offset}, 0)`;
                  })()}
                >
                  SERVICES
                </text>
              </mask>
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
        <Services
          scrollProgress={scrollProgress}
          services={services}
          reviewsScrollProgress={reviewsScrollProgress}
        />

        {/* Services Text Mask Overlay - Safari compatible approach */}
        {scrollProgress >= 0.55 && scrollProgress < 0.68 && (
          <div
            className="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-[25]"
            style={{
              opacity: 1
            }}
          >
            {/* SVG with mask to create cutout effect - SAME APPROACH AS TEAM */}
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <mask id="servicesTextMaskOverlay">
                  {/* White background - everything covered */}
                  <rect x="0" y="0" width="100%" height="100%" fill="white" />

                  {/* Black text - creates the cutout (hole) with zoom animation */}
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="black"
                    fontSize={(() => {
                      const baseSize = 200;
                      if (scrollProgress < 0.55) return baseSize;
                      if (scrollProgress >= 0.693) return baseSize * 15;
                      const progress = (scrollProgress - 0.55) / (0.693 - 0.55);
                      const scale = 1 + (14 * progress);
                      return baseSize * scale;
                    })()}
                    fontFamily="Lato, sans-serif"
                    fontWeight="700"
                    letterSpacing={(() => {
                      const baseFontSize = 200;
                      const baseLetterSpacing = 40;
                      const fontSize = (() => {
                        if (scrollProgress < 0.55) return baseFontSize;
                        if (scrollProgress >= 0.693) return baseFontSize * 15;
                        const progress = (scrollProgress - 0.55) / (0.693 - 0.55);
                        const scale = 1 + (14 * progress);
                        return baseFontSize * scale;
                      })();
                      return String((baseLetterSpacing * fontSize) / baseFontSize);
                    })()}
                    transform={(() => {
                      const baseFontSize = 200;
                      const baseLetterSpacing = 40;
                      const fontSize = (() => {
                        if (scrollProgress < 0.55) return baseFontSize;
                        if (scrollProgress >= 0.693) return baseFontSize * 15;
                        const progress = (scrollProgress - 0.55) / (0.693 - 0.55);
                        const scale = 1 + (14 * progress);
                        return baseFontSize * scale;
                      })();
                      const letterSpacing = (baseLetterSpacing * fontSize) / baseFontSize;
                      const charWidth = fontSize * 0.65;
                      const offset = (4 - 3.5) * (charWidth + letterSpacing);
                      return `translate(${offset}, 0)`;
                    })()}
                  >
                    SERVICES
                  </text>
                </mask>
              </defs>

              {/* White rectangle with mask applied - Safari compatible - creates cutout revealing content below */}
              <rect x="0" y="0" width="100%" height="100%" fill="white" mask="url(#servicesTextMaskOverlay)" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}