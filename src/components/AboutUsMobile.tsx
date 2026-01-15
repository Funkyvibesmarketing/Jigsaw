import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import svgPaths from '../imports/svg-4nnubvddnl';
import imgVector from "figma:asset/add4cb2fc6a41d59b6193f6298e99d6b25b9b0e5.png";
import backgroundGradient from 'figma:asset/42d2cf4a66b5216ee41ff6ee702481dc6863d649.png';
import { ServicesMobile } from './ServicesMobile';

// Carousel text items (same as desktop)
// Carousel text items
const carouselTexts = [
  {
    id: 1,
    number: "1.",
    text: "At Jigsaw Financial Ltd, we are dedicated to shaping your financial future through insightful conversations."
  },
  {
    id: 2,
    number: "2.",
    text: "We believe that no one should be paying more than necessary for any financial product - especially their ",
    boldText: "mortgage!"
  },
  {
    id: 3,
    number: "3.",
    text: "Our mission is to deliver clear, practical advice, drawing from Nick's unique journey—from a bobsleigh accident to becoming a mortgage professional."
  },
  {
    id: 4,
    number: "4.",
    text: "With Gemma and Lois ensuring seamless operations, we guarantee that Nick's expertise is always at your service, providing a reliable support system for your financial needs."
  }
];

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

export function AboutUsMobile({ onScrollProgress }: { 
  onScrollProgress?: (progress: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  
  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselTexts.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      setScrollProgress(value);
      onScrollProgress?.(value);
    });
    return () => unsubscribe();
  }, [scrollYProgress, onScrollProgress]);

  // Middle text stays centered initially, then moves up and fades out
  const middleTextY = useTransform(scrollYProgress, [0, 0.25, 0.35, 0.45], [0, 0, -100, -300]);
  const middleTextOpacity = useTransform(scrollYProgress, [0, 0.35, 0.45], [1, 1, 0]);
  
  // Middle text blur effect - becomes hazy when moving up
  const middleTextBlur = useTransform(scrollYProgress, [0.25, 0.35, 0.45], ['blur(0px)', 'blur(4px)', 'blur(8px)']);
  
  // SERVICES moves continuously from bottom to middle, then stays in place during zoom
  const servicesY = useTransform(scrollYProgress, [0, 0.4, 0.55, 1], [400, 50, 0, 0]);
  
  // Scale up after reaching middle - MUCH MORE zoom to fill screen - FASTER zoom
  const servicesScale = useTransform(scrollYProgress, [0.55, 0.80], [1, 25]);
  
  // Color transitions
  const servicesColor = useTransform(
    scrollYProgress, 
    [0, 0.35, 0.45], 
    ['rgba(41, 65, 80, 0.1)', 'rgba(41, 65, 80, 0.1)', 'rgba(41, 65, 80, 1)']
  );
  
  // Blur effect - blurred at bottom, clear in the middle and during zoom
  const servicesBlur = useTransform(scrollYProgress, [0, 0.4, 0.45], ['blur(8px)', 'blur(4px)', 'blur(0px)']);

  // SERVICES text opacity - fades out as zoom completes - FASTER
  const servicesTextOpacity = useTransform(scrollYProgress, [0, 0.75, 0.80], [1, 1, 0]);

  // Blue gradient at top - appears after some scroll, then fades out
  const topGradientOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25, 0.35, 0.45], [0, 0, 1, 1, 0]);

  // Full blue screen overlay - appears AFTER masking zoom completes - FASTER
  const blueScreenOpacity = useTransform(scrollYProgress, [0.80, 0.84], [0, 1]);

  // Mask mode - false = solid text, true = cutout revealing background
  // Transitions when zoom starts
  const useMaskCutout = scrollProgress >= 0.56;

  // Solid text opacity - visible until mask cutout starts, quick but smooth fade
  const solidTextOpacity = scrollProgress < 0.54 ? 1 : 
                          scrollProgress < 0.56 ? 1 - ((scrollProgress - 0.54) / 0.02) : 0;

  // Services section opacity - fades in AFTER solid text is fully gone
  const servicesSectionOpacity = useTransform(scrollYProgress, [0.56, 0.58], [0, 1]);

  // Services section Y position - stays fixed after masking completes
  // Keep it at 0 throughout, no movement
  const servicesSectionY = 0;

  return (
    <div ref={containerRef} className="relative w-full bg-white" style={{ minHeight: '500vh' }}>
      {/* About Us Content */}
      <div 
        className="relative flex items-center justify-center min-h-screen sticky top-0 overflow-hidden" 
        style={{ 
          backgroundColor: scrollProgress >= 0.80 ? '#2c4657' : 'white' 
        }}
      >
        {/* Blue gradient overlay at top */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-[#294150]/10 to-transparent z-0" 
          style={{ opacity: topGradientOpacity }}
        />
        
        {/* Text Carousel with Pagination - Mobile Version */}
        <motion.div 
          className="absolute font-lato-light not-italic text-[#222526] text-center top-[24px] w-full px-6 z-[10000]"
          style={{ y: middleTextY, opacity: middleTextOpacity, filter: middleTextBlur }}
        >
          {/* Carousel Text */}
          <div className="relative min-h-[180px] flex flex-col items-center justify-start overflow-hidden mb-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={carouselTexts[carouselIndex].id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full flex flex-col gap-0"
              >
                {/* Number at the top */}
                <p className="leading-[36px] text-[24px] mb-0">
                  {carouselTexts[carouselIndex].number}
                </p>
                {/* Text content below */}
                <p className="leading-[36px] text-[24px]">
                  {carouselTexts[carouselIndex].text}
                  {carouselTexts[carouselIndex].boldText && (
                    <span className="font-lato-semibold">{carouselTexts[carouselIndex].boldText}</span>
                  )}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Dots - Mobile Version */}
          <div 
            className="flex items-center justify-center gap-[18px] relative z-[9999] use-default-cursor"
            onTouchStart={() => {
              window.dispatchEvent(new Event('hideCursorOverlay'));
            }}
            onTouchEnd={() => {
              window.dispatchEvent(new Event('showCursorOverlay'));
            }}
          >
            {carouselTexts.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCarouselIndex(index);
                }}
                onTouchEnd={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setCarouselIndex(index);
                }}
                style={{ 
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                  zIndex: 99999,
                  position: 'relative'
                }}
                className={`transition-all duration-300 rounded-full ${
                  index === carouselIndex 
                    ? 'w-[14px] h-[14px] bg-[#2C4657] active:bg-[#1e3340]' 
                    : 'w-[10px] h-[10px] bg-[#D9D9D9] active:bg-[#B0B0B0]'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Full blue screen overlay at the end - appears after zoom completes */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full z-10" 
          style={{ opacity: blueScreenOpacity }}
        >
          <img src={backgroundGradient} alt="" className="w-full h-full object-cover" />
        </motion.div>

        {/* SERVICES Text Mask - reveals Services section through text cutout during zoom */}
        <motion.div 
          className="absolute top-1/2 left-0 w-full h-full z-20 pointer-events-none -translate-y-1/2"
          style={{ y: servicesY }}
        >
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" viewBox="0 0 375 812" preserveAspectRatio="xMidYMid slice">
            <defs>
              {/* Blur filter for solid text phase */}
              <filter id="servicesBlurMobile">
                <feGaussianBlur stdDeviation={(() => {
                  if (scrollProgress < 0.3) return 4;
                  if (scrollProgress < 0.40) {
                    const p = (scrollProgress - 0.3) / 0.1;
                    return 4 - (4 * p);
                  }
                  return 0;
                })()} />
              </filter>

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
                      if (scrollProgress < 0.55) return baseFontSize;
                      if (scrollProgress >= 0.80) return baseFontSize * 25;
                      const progress = (scrollProgress - 0.55) / (0.80 - 0.55);
                      const scale = 1 + (24 * progress); // 1x to 25x scale - FASTER
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
                    const baseSize = 48; // Much smaller for mobile to fit screen
                    if (scrollProgress < 0.55) return baseSize;
                    if (scrollProgress >= 0.80) return baseSize * 25;
                    
                    const progress = (scrollProgress - 0.55) / (0.80 - 0.55);
                    const scale = 1 + (24 * progress); // 1x to 25x scale - FASTER
                    return baseSize * scale;
                  })()}
                  fontFamily="Lato, sans-serif"
                  fontWeight="700"
                  letterSpacing={(() => {
                    const baseFontSize = 48;
                    const baseLetterSpacing = 8; // Adjusted for mobile
                    const fontSize = (() => {
                      if (scrollProgress < 0.55) return baseFontSize;
                      if (scrollProgress >= 0.80) return baseFontSize * 25;
                      const progress = (scrollProgress - 0.55) / (0.80 - 0.55);
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
            {scrollProgress >= 0.55 && scrollProgress < 0.80 && (
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
                filter="url(#servicesBlurMobile)"
                opacity={solidTextOpacity}
              >
                SERVICES
              </text>
            )}
          </svg>
        </motion.div>

        {/* Services Section - revealed through mask during zoom - positioned separately */}
        <motion.div
          className="absolute inset-0 z-10"
          style={{
            opacity: servicesSectionOpacity,
            y: servicesSectionY,
            pointerEvents: scrollProgress >= 0.80 ? 'auto' : 'none'
          }}
        >
          <div className="w-full h-full" style={{ pointerEvents: scrollProgress >= 0.80 ? 'auto' : 'none' }}>
            <ServicesMobile />
          </div>
        </motion.div>


      </div>
    </div>
  );
}