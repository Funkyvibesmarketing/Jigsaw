import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useEffect, useState, lazy, Suspense } from 'react';
import svgPaths from '../imports/svg-4nnubvddnl';
import imgVector from 'figma:asset/4234f71b7d4a1998f6e3282ba90ea09ce5633514.png';
import backgroundGradient from 'figma:asset/42d2cf4a66b5216ee41ff6ee702481dc6863d649.png';
import type { carouselTexts } from '../utils/aboutApi';
import type { Service } from '../utils/servicesApi';

const ServicesMobile = lazy(() => import('./ServicesMobile').then((module) => ({ default: module.ServicesMobile })));

// Carousel text items (handled by prop)

function Main() {
  return (
    <div className="[grid-area:1_/_1] h-[27.429px] ml-0 mt-0 relative w-[25.714px]" data-name="Main_1_00000014621826160272210780000006234564362710872498_">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 28">
        <g id="Main_1_00000014621826160272210780000006234564362710872498_">
          <path d={svgPaths.p2545c2c0} fill="var(--fill-0, #2EC4B6)" id="Vector" />
          <path d={svgPaths.p32440100} fill="var(--fill-0, #2C4657)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Favicon() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative" data-name="Favicon">
      <Main />
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-white relative rounded-[48px] size-[48px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[6.857px] items-center justify-center px-[27.429px] py-[20.571px] relative size-[48px]">
          <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center leading-[0] relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "25.703125", "--transform-inner-height": "27.421875" } as React.CSSProperties}>
            <div className="flex-none rotate-[90deg]">
              <Favicon />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[-4.286px_0px_3.429px_0px_inset_rgba(0,0,0,0.06),2.571px_0px_3.429px_0px_inset_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function PhoneOutgoing() {
  return (
    <div className="relative size-[20.571px]" data-name="PhoneOutgoing">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
        <g id="PhoneOutgoing">
          <path d={svgPaths.p3ff1cb00} fill="var(--fill-0, #2C4657)" id="Vector" />
          <path d={svgPaths.p70d3700} fill="var(--fill-0, #2EC4B6)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[6.857px] items-center justify-center p-[20.571px] relative rounded-[48px] size-[48px]">
      <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "20.5625", "--transform-inner-height": "20.5625" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg]">
          <PhoneOutgoing />
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[-4.286px_0px_3.429px_0px_inset_rgba(0,0,0,0.06),2.571px_0px_3.429px_0px_inset_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function IconamoonMenuBurgerVerticalThin() {
  return (
    <div className="relative shrink-0 size-[19.2px]" data-name="iconamoon:menu-burger-vertical-thin">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="iconamoon:menu-burger-vertical-thin">
          <path d={svgPaths.p8bd0840} id="Vector" stroke="var(--stroke-0, #2C4657)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-[#e4ecf1] box-border content-stretch flex flex-col gap-[8px] items-center justify-center px-[17.5px] py-[12px] relative rounded-[100px] shrink-0 size-[48px]">
      <div aria-hidden="true" className="absolute border border-[rgba(44,70,87,0.1)] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <IconamoonMenuBurgerVerticalThin />
      <div className="absolute inset-0 pointer-events-none shadow-[0px_4px_4px_0px_inset_rgba(255,255,255,0.12),0px_-5px_4px_0px_inset_rgba(255,255,255,0.08)]" />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "48", "--transform-inner-height": "48" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <Frame />
        </div>
      </div>
      <Frame2 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-[rgba(228,236,241,0.4)] box-border content-stretch flex h-[72px] items-center justify-between px-[12px] py-[16px] relative rounded-[72px] shrink-0 w-[136px]">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[72px]" />
      <Frame3 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-1/2 top-[24px] translate-x-[-50%] w-[90%] max-w-[382px] px-4 z-50">
      <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "48", "--transform-inner-height": "48" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <Frame1 />
        </div>
      </div>
      <Frame4 />
    </div>
  );
}

function UpArrowFrame() {
  return (
    <div className="overflow-clip relative size-[24px]">
      <div className="absolute flex inset-[28.41%_14.26%_28.19%_14.28%] items-center justify-center">
        <div className="flex-none h-[10.371px] rotate-[359.849deg] w-[17.125px]">
          <div className="relative size-full" data-name="Vector">
            <div className="absolute inset-[-4.82%_-2.92%]">
              <img alt="" className="block max-w-none size-full" height="11.372" src={imgVector} width="18.125" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UpArrowButton() {
  return (
    <div className="bg-[#2ec4b6] relative rounded-[48px] size-[48px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[6.857px] items-center justify-center px-[27.429px] py-[20.571px] relative size-[48px]">
          <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "24", "--transform-inner-height": "24" } as React.CSSProperties}>
            <div className="flex-none rotate-[90deg]">
              <UpArrowFrame />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[-4.286px_0px_3.429px_0px_inset_rgba(255,255,255,0.12),2.571px_0px_3.429px_0px_inset_rgba(255,255,255,0.16)]" />
    </div>
  );
}

export function AboutUsMobile({ onScrollProgress, carouselTexts, services, onReady }: {
  onScrollProgress?: (progress: number) => void;
  carouselTexts: carouselTexts[];
  services: Service[];
  onReady?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [isTutorialActive, setIsTutorialActive] = useState(false);

  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);

  useEffect(() => {
    const handleTutorialChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ active: boolean }>;
      const active = !!customEvent.detail?.active;
      setIsTutorialActive(active);
      if (active) {
        setHasSeenTutorial(true);
      }
    };
    window.addEventListener('mobile-tutorial-state-change', handleTutorialChange);
    return () => {
      window.removeEventListener('mobile-tutorial-state-change', handleTutorialChange);
    };
  }, []);

  useEffect(() => {
    if (scrollProgress < 0.5) {
      setHasSeenTutorial(false);
    }
  }, [scrollProgress]);

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

  const handleLearnMoreMClick = () => {
    if (containerRef.current) {
      window.scrollTo({
        top: (viewportHeightRef.current || window.innerHeight) * 12,
        behavior: 'smooth'
      });
    }
  };

  // Animation variants for carousel
  const variants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'left' ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'left' ? -50 : 50,
      opacity: 0
    })
  };

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false); // Control auto-advance
  const onScrollProgressRef = useRef(onScrollProgress);
  // viewportHeight — read lazily via ref to avoid forced layout during render
  // (window.innerHeight in the render body triggers layout recalculation every re-render on iOS)
  const viewportHeightRef = useRef(0);
  useEffect(() => {
    viewportHeightRef.current = window.innerHeight;
    const onResize = () => { viewportHeightRef.current = window.innerHeight; };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Updated drag handling for carousel
  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      setSwipeDirection('right');
      setCarouselIndex((prev) => (prev - 1 + carouselTexts.length) % carouselTexts.length);
    } else if (info.offset.x < -threshold) {
      setSwipeDirection('left');
      setCarouselIndex((prev) => (prev + 1) % carouselTexts.length);
    }
  };

  // Update ref when callback changes
  useEffect(() => {
    onScrollProgressRef.current = onScrollProgress;
  }, [onScrollProgress]);

  // Auto-advance carousel every 5 seconds - only when isAutoPlay is true
  useEffect(() => {
    if (!isAutoPlay) return; // Don't auto-advance if paused

    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselTexts.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      setScrollProgress(value);
      onScrollProgressRef.current?.(value);
    });
    return () => unsubscribe();
  }, [scrollYProgress]); // Remove onScrollProgress from dependencies

  // About Us content - slides up to center, PAUSES (stays perfectly still), then continues sliding
  // 0-0.08: Slides up from below to center
  // 0.08-0.28: PAUSE - stays perfectly centered (no movement at all)
  // 0.28-0.45: Continues sliding up and fades out
  const middleTextY = useTransform(scrollYProgress, [0, 0.08, 0.28, 0.45], [100, 0, 0, -400]);
  const middleTextOpacity = useTransform(scrollYProgress, [0, 0.35, 0.45], [1, 1, 0]);

  // SERVICES appears below and waits during the pause, then slides up
  // 0-0.28: Stays below (during About Us pause)
  // 0.28-0.45: Slides up to center
  const servicesY = useTransform(scrollYProgress, [0, 0.08, 0.28, 0.45], [500, 500, 500, 0]);

  // Scale up after reaching middle - MUCH MORE zoom to fill screen
  const servicesScale = useTransform(scrollYProgress, [0.45, 0.65], [1, 25]);

  // SERVICES text opacity - fades out as zoom completes
  const servicesTextOpacity = useTransform(scrollYProgress, [0, 0.58, 0.62], [1, 1, 0]);

  // Full blue screen overlay - appears AFTER masking zoom completes
  const blueScreenOpacity = useTransform(scrollYProgress, [0.70, 0.74], [0, 1]);

  // Mask mode - false = solid text, true = cutout revealing background
  // Transitions when zoom starts - adjusted for new timeline
  const useMaskCutout = scrollProgress >= 0.58;

  // Solid text opacity - visible until mask cutout starts, quick but smooth fade
  const solidTextOpacity = scrollProgress < 0.56 ? 1 :
    scrollProgress < 0.58 ? 1 - ((scrollProgress - 0.56) / 0.02) : 0;

  // Services section opacity - fades in ONLY when masking starts
  const servicesSectionOpacity = useTransform(scrollYProgress, [0.58, 0.61], [0, 1]);


  const handleLearnMoreClick = () => {
    if (containerRef.current) {
      window.scrollTo({
        top: (viewportHeightRef.current || window.innerHeight) * 10,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full bg-white" style={{ minHeight: '400vh' }}>
      {/* About Us Content - Sticky container with enhanced mobile sticky behavior */}
      <div
        className="sticky top-0 flex items-center justify-center min-h-screen overflow-hidden will-change-transform"
        style={{
          backgroundColor: scrollProgress >= 0.85 ? '#2c4657' : 'white',
          zIndex: 10,
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)' // Force GPU acceleration for smooth sticky behavior
        }}
      >

        {/* Text Carousel with Pagination - Mobile Version */}
        {carouselTexts && carouselTexts.length > 0 && (
          <motion.div
            className="absolute font-lato-light not-italic text-[#222526] text-center top-[140px] w-full px-6 z-[10000]"
            style={{
              y: middleTextY,
              opacity: middleTextOpacity,
              pointerEvents: scrollProgress < 0.60 ? 'auto' : 'none'
            }}
          >
            {/* "ABOUT US" Title - Large centered text at top, slides with carousel */}
            <p
              className="font-['Lato:Regular',sans-serif] leading-[normal] not-italic text-[50px] text-[rgba(44,70,87,0.2)] text-center uppercase mb-[60px] whitespace-nowrap pointer-events-none select-none"
              style={{
                letterSpacing: '0.025em'
              }}
            >
              About Us
            </p>

            {/* Carousel Text */}
            <div
              className="relative h-[280px] flex flex-col items-center justify-start overflow-visible mb-10 pointer-events-auto select-none"
              style={{ touchAction: 'pan-y' }}
            >
              <AnimatePresence mode="wait" custom={swipeDirection}>
                <motion.div
                  key={carouselTexts[carouselIndex].id}
                  custom={swipeDirection}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  transition={{ duration: 0.15, ease: "easeInOut" }}
                  className="w-full flex flex-col gap-0 cursor-grab active:cursor-grabbing"
                >
                  {/* Text content below */}
                  <p className="font-lato-bold not-italic text-[26px]" dangerouslySetInnerHTML={{ __html: carouselTexts[carouselIndex].header }}></p><br />
                  <p className="leading-[36px] text-[20px] font-lato-regular tracking-[0.6px]">
                    {carouselTexts[carouselIndex].text}
                    {carouselTexts[carouselIndex].hasLearnMore && (
                      <a className="cursor-pointer pointer-events-auto" onClick={handleLearnMoreMClick}>Learn more</a>
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
              className="flex items-center justify-center gap-[24px] relative z-[9999] use-default-cursor"
            >
              {/* Left Arrow Button */}
              <button
                onPointerDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setSwipeDirection('right');
                  setCarouselIndex((prev) => (prev - 1 + carouselTexts.length) % carouselTexts.length);
                }}
                className="content-stretch flex items-center justify-center p-[3px] relative rounded-[24px] shrink-0 size-[48px] transition-all duration-200 ease-out active:bg-[rgba(46,196,182,0.1)] group touch-manipulation"
                style={{
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                  zIndex: 99999,
                  position: 'relative',
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                  userSelect: 'none'
                }}
                aria-label="Previous slide"
              >
                <div aria-hidden="true" className="absolute border-[1px] border-[rgba(44,70,87,0.2)] border-solid inset-0 pointer-events-none rounded-[24px] transition-all duration-200 ease-out group-active:border-[#2ec4b6]" />
                <div className="flex items-center justify-center relative shrink-0">
                  <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                    <div className="overflow-clip relative size-[30px]">
                      <div className="absolute flex inset-[28.38%_14.25%_28.22%_14.29%] items-center justify-center">
                        <div className="flex-none h-[13px] rotate-[359.849deg] w-[21.5px]">
                          <div className="relative size-full">
                            <div className="absolute inset-[-3.86%_-2.34%]">
                              <img alt="" className="block max-w-none size-full" height="14" src={imgVector} width="22.5" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              {/* Pagination Dots */}
              <div className="flex items-center justify-center gap-[18px]">
                {carouselTexts.map((_, index) => (
                  <button
                    key={index}
                    onPointerDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setCarouselIndex(index);
                    }}
                    style={{
                      cursor: 'pointer',
                      pointerEvents: 'auto',
                      zIndex: 99999,
                      position: 'relative',
                      touchAction: 'manipulation',
                      WebkitTapHighlightColor: 'transparent',
                      userSelect: 'none'
                    }}
                    className={`transition-all duration-300 rounded-full touch-manipulation ${index === carouselIndex
                      ? 'w-[14px] h-[14px] bg-[#2C4657] active:bg-[#1e3340]'
                      : 'w-[10px] h-[10px] bg-[#D9D9D9] active:bg-[#B0B0B0]'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Right Arrow Button */}
              <button
                onPointerDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setSwipeDirection('left');
                  setCarouselIndex((prev) => (prev + 1) % carouselTexts.length);
                }}
                className="content-stretch flex items-center justify-center p-[3px] relative rounded-[24px] shrink-0 size-[48px] transition-all duration-200 ease-out active:bg-[rgba(46,196,182,0.1)] group touch-manipulation"
                style={{
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                  zIndex: 99999,
                  position: 'relative',
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                  userSelect: 'none'
                }}
                aria-label="Next slide"
              >
                <div aria-hidden="true" className="absolute border-[1px] border-[rgba(44,70,87,0.2)] border-solid inset-0 pointer-events-none rounded-[24px] transition-all duration-200 ease-out group-active:border-[#2ec4b6]" />
                <div className="flex items-center justify-center relative shrink-0">
                  <div className="flex-none">
                    <div className="overflow-clip relative size-[30px]">
                      <div className="absolute flex inset-[28.38%_14.25%_28.22%_14.29%] items-center justify-center">
                        <div className="flex-none h-[13px] rotate-[359.849deg] w-[21.5px]">
                          <div className="relative size-full">
                            <div className="absolute inset-[-3.86%_-2.34%]">
                              <img alt="" className="block max-w-none size-full" height="14" src={imgVector} width="22.5" />
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

        {/* Full blue screen overlay at the end - appears after zoom completes */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full z-[5]"
          style={{
            opacity: isTutorialActive ? 1 : blueScreenOpacity,
            pointerEvents: scrollProgress >= 0.80 ? 'none' : 'auto'
          }}
        >
          <img src={backgroundGradient} alt="" className="w-full h-full object-cover" />
        </motion.div>

        {/* Services Section - revealed through mask during zoom - positioned separately */}
        <motion.div
          className="absolute top-0 left-0 w-full h-screen z-[15]"
          style={{
            opacity: isTutorialActive ? 1 : servicesSectionOpacity,
            pointerEvents: (scrollProgress >= 0.51 || isTutorialActive) ? 'auto' : 'none',
            touchAction: (scrollProgress >= 0.51 || isTutorialActive) ? 'auto' : 'none'
          }}
        >
          <div
            className="w-full h-full"
            style={{
              pointerEvents: (scrollProgress >= 0.51 || isTutorialActive) ? 'auto' : 'none',
              touchAction: (scrollProgress >= 0.51 || isTutorialActive) ? 'auto' : 'none'
            }}
          >
            {(scrollProgress >= 0.30 || isTutorialActive) && (
              <Suspense fallback={null}>
                <ServicesMobile services={services} scrollProgress={scrollProgress} />
              </Suspense>
            )}
          </div>
        </motion.div>

        {/* SERVICES Text Mask - reveals Services section through text cutout during zoom */}
        {scrollProgress < 0.70 && !isTutorialActive && !hasSeenTutorial && (
          <motion.div
            className="absolute top-1/2 left-0 w-full h-full z-[20] pointer-events-none -translate-y-1/2"
            style={{ y: servicesY }}
          >
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" viewBox="0 0 375 812" preserveAspectRatio="xMidYMid slice">
              <defs>
                {/* Mask for Services section - only visible through text during zoom */}
                <mask id="servicesTextMaskMobile">
                  {/* White background - everything covered */}
                  <rect x="0" y="0" width="100%" height="100%" fill="white" />

                  {/* Black text - creates the cutout (hole) - reveals Services section through letters */}
                  {/* Position calculated to center the "V" (4th letter) instead of the whole word */}
                  <text
                    x={(() => {
                      // Center the "V" instead of the whole word
                      // SERVICES has 8 letters, V is at position 4 (index 3)
                      // Normal center is at 4.5, we want it at 4, so shift RIGHT by 0.5 chars
                      const baseFontSize = 48;
                      const baseLetterSpacing = 8;
                      const fontSize = (() => {
                        // Start at same size as solid text (1x) when masking begins, zoom to 25x
                        if (scrollProgress < 0.58) return baseFontSize; // Same as solid text
                        if (scrollProgress >= 0.70) return baseFontSize * 25;
                        const progress = (scrollProgress - 0.58) / (0.70 - 0.58);
                        const scale = 1 + (24 * progress); // 1x to 25x scale
                        return baseFontSize * scale;
                      })();
                      const letterSpacing = (baseLetterSpacing * fontSize) / baseFontSize;
                      const charWidth = fontSize * 0.55; // Character width for Lato Bold
                      const totalCharWidth = charWidth + letterSpacing;

                      // Shift right by 0.5 character widths to center on V
                      const viewportCenter = 187.5; // 50% of 375px viewport
                      const offset = 0.5 * totalCharWidth;
                      return String(viewportCenter + offset);
                    })()}
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="black"
                    fontSize={(() => {
                      const baseSize = 48;
                      // Start at same size as solid text (1x) when masking begins, zoom to 25x
                      if (scrollProgress < 0.58) return baseSize; // Same as solid text
                      if (scrollProgress >= 0.70) return baseSize * 25;

                      const progress = (scrollProgress - 0.58) / (0.70 - 0.58);
                      const scale = 1 + (24 * progress); // 1x to 25x scale
                      return baseSize * scale;
                    })()}
                    fontFamily="Lato, sans-serif"
                    fontWeight="700"
                    letterSpacing={(() => {
                      const baseFontSize = 48;
                      const baseLetterSpacing = 8;
                      const fontSize = (() => {
                        if (scrollProgress < 0.58) return baseFontSize;
                        if (scrollProgress >= 0.70) return baseFontSize * 25;
                        const progress = (scrollProgress - 0.58) / (0.70 - 0.58);
                        const scale = 1 + (24 * progress);
                        return baseFontSize * scale;
                      })();
                      return String((baseLetterSpacing * fontSize) / baseFontSize);
                    })()}
                  >
                    SERVICES
                  </text>
                </mask>
              </defs>

              {/* White rectangle with mask applied - Safari compatible approach */}
              {scrollProgress >= 0.58 && scrollProgress < 0.70 && (
                <rect x="0" y="0" width="100%" height="100%" fill="white" mask="url(#servicesTextMaskMobile)" />
              )}

              {/* Solid text - visible before mask cutout starts */}
              {!useMaskCutout && (
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={(() => {
                    if (scrollProgress < 0.35) return 'rgba(41, 65, 80, 0.3)';
                    if (scrollProgress < 0.50) {
                      const p = (scrollProgress - 0.35) / 0.15;
                      return `rgba(41, 65, 80, ${0.3 + (0.7 * p)})`;
                    }
                    return 'rgba(41, 65, 80, 1)';
                  })()}
                  fontSize="48"
                  fontFamily="Lato, sans-serif"
                  fontWeight="700"
                  letterSpacing="8"
                  opacity={solidTextOpacity}
                >
                  SERVICES
                </text>
              )}
            </svg>
          </motion.div>
        )}

      </div>
    </div>
  );
}