import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import svgPathsHero from '../imports/svg-ypzv7eolo3';
import svgPathsCompliance from '../imports/svg-u4aqnlggjb';
import imgModernHouseAtTwilight4 from '../assets/hero-mobile.webp';
import imgVector from 'figma:asset/98e22ea118a61d8d843204140092d61e8f5f90c4.png';
import imgRectangle14200 from "figma:asset/2b522be0adda68686cd941d2da701840d5a124a6.png";
import complianceShield from '../assets/compliance_shield.webp';

function MobileDownArrow({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="box-border content-stretch flex gap-[6.4px] items-center p-[16px] rounded-[32px] size-[64px] cursor-pointer hover:bg-white/10 transition-all duration-300"
    >
      <div aria-hidden="true" className="absolute border-[1.6px] border-dashed border-white inset-[-1.6px] pointer-events-none rounded-[33.6px]" />
      <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "32", "--transform-inner-height": "32" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg]">
          <div className="overflow-clip relative size-[32px]">
            <div className="absolute flex inset-[28.39%_14.25%_28.21%_14.28%] items-center justify-center">
              <div className="flex-none h-[13.829px] rotate-[359.849deg] w-[22.833px]">
                <div className="relative size-full">
                  <div className="absolute inset-[-2.07%_-1.25%]">
                    <img alt="" className="block max-w-none size-full" height="14.4" src={imgVector} width="23.405" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

export function HeroScrollSectionMobile({ onScrollProgress, splashViewed, onReady }: { onScrollProgress?: (progress: number) => void; splashViewed?: boolean; onReady?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hideDownArrow, setHideDownArrow] = useState(false);
  const [isComplianceActive, setIsComplianceActive] = useState(false);

  // Handle down arrow click - scroll to next section (About Us)
  const handleScrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight * 3.8, // Position as rewered
      behavior: 'smooth'
    });
  };

  // Track scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Report scroll progress to parent
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (onScrollProgress) {
        onScrollProgress(latest);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]); // Remove onScrollProgress from dependencies

  // Signal readiness on mount
  useEffect(() => {
    if (onReady) {
      const timer = setTimeout(onReady, 100);
      return () => clearTimeout(timer);
    }
  }, [onReady]);

  // Step 1: JIGSAW text fades in (0.01 to 0.08) - delayed past splash fade threshold
  // If splash has been viewed, start at full visibility when at top
  const jigsawOpacity = useTransform(
    scrollYProgress,
    [0, 0.01, 0.04, 0.08],
    splashViewed ? [0.7, 0.7, 0.7, 0.7] : [0, 0, 0.5, 0.7]
  );

  // Step 2: House image slides up (0.04 to 0.10) - stays visible during compliance with reduced opacity
  // If splash has been viewed, show house immediately at top
  const bgImageOpacity = useTransform(
    scrollYProgress,
    [0, 0.01, 0.04, 0.06, 0.10, 0.45, 0.47, 0.75, 1],
    splashViewed ? [0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0, 0, 0] : [0, 0, 0, 0, 0.08, 0.08, 0, 0, 0]
  );
  const bgImageY = useTransform(
    scrollYProgress,
    [0, 0.01, 0.04, 0.10, 0.28, 0.70, 0.85],
    splashViewed ? [0, 0, 0, 0, 0, -900, -1200] : [100, 100, 100, 0, 0, -900, -1200]
  );
  const mainImageOpacity = useTransform(
    scrollYProgress,
    [0, 0.01, 0.04, 0.06, 0.10, 0.45, 0.47, 0.75, 1],
    splashViewed ? [1, 1, 1, 1, 1, 1, 0, 0, 0] : [0, 0, 0, 0.5, 1, 1, 0, 0, 0]
  );
  const mainImageY = useTransform(
    scrollYProgress,
    [0, 0.01, 0.04, 0.10, 0.28, 0.70, 0.85],
    splashViewed ? [0, 0, 0, 0, 0, -900, -1200] : [100, 100, 100, 0, 0, -900, -1200]
  );

  // Hero house image (original) - fades out when compliance appears
  const heroHouseOpacity = useTransform(
    scrollYProgress,
    [0, 0.01, 0.04, 0.06, 0.10, 0.45, 0.47],
    splashViewed ? [1, 1, 1, 1, 1, 1, 0] : [0, 0, 0, 0.5, 1, 1, 0]
  );

  // Compliance house image (mobile) - fades in when compliance appears, replaces hero house
  const complianceHouseOpacity = useTransform(scrollYProgress, [0.45, 0.47, 0.75, 0.95, 1], [0, 0.6, 0.6, 0, 0]);

  // Step 3: Sentence appears right after house settles (0.10 to 0.14), stays briefly, then slides up with compliance
  // If splash has been viewed, show sentence immediately at top
  const sentenceOpacity = useTransform(
    scrollYProgress,
    [0, 0.10, 0.14, 0.30, 0.42],
    splashViewed ? [1, 1, 1, 1, 0] : [0, 0, 1, 1, 0]
  );
  // Mobile: start from marking position (centered on house as shown in image)
  // Sentence stays in position until 0.25, then starts sliding up and is gone by 0.42
  const sentenceY = useTransform(
    scrollYProgress,
    [0, 0.10, 0.14, 0.25, 0.30, 0.42],
    splashViewed ? [0, 0, 0, 0, -400, -1000] : [0, 0, 0, 0, -400, -1000]
  );

  // Step 4: Navigation appears (compressed from 0.375-0.5 to 0.18-0.28)
  const navY = useTransform(scrollYProgress, [0.18, 0.28], [-50, 0]);
  const navOpacity = useTransform(scrollYProgress, [0.18, 0.28, 0.45, 0.50], [0, 1, 1, 0]);

  // Step 5: Down arrow appears with sentence (0.12 to 0.16) and fades out when compliance section starts (0.22 to 0.25)
  const arrowY = useTransform(scrollYProgress, [0.12, 0.16], [100, 0]);
  const arrowOpacity = useTransform(scrollYProgress, [0, 0.12, 0.16, 0.22, 0.25], [0, 0, 1, 1, 0]);

  // Step 6: Bottom gradient appears with sentence and stays with arrow
  const step6GradientOpacity = useTransform(scrollYProgress, [0.14, 0.20, 0.75, 0.80], [1, 1, 0, 0]);

  // Step 7: Top JIGSAW text fades out (compressed from 0.77-0.82 to 0.60-0.65)
  const topJigsawOpacity = useTransform(
    scrollYProgress,
    [0, 0.01, 0.1, 0.45, 0.50],
    splashViewed ? [0.7, 0.7, 0.7, 0.7, 0] : [0, 0, 0.7, 0.7, 0]
  );

  // Step 7.5: Bottom gradient appears (compressed)
  const bottomGradientOpacity = useTransform(scrollYProgress, [0.82, 0.85, 0.88], [0, 1, 0]);

  // Step 8: Compliance content appears and slides up — starts at 0.42 to close gap after sentence exits
  const complianceY = useTransform(scrollYProgress, [0.28, 0.45, 0.85], [350, 0, -600]);
  const complianceOpacity = useTransform(scrollYProgress, [0.22, 0.28, 0.80, 0.85], [0, 1, 1, 0]);

  // Text color transition for compliance section - white to dark
  const complianceTextColor = useTransform(
    scrollYProgress,
    [0.65, 0.75],
    ['rgba(255, 255, 255, 1)', 'rgba(13, 20, 25, 1)']
  );

  // Gradient overlay opacity
  const gradientOverlayOpacity = useTransform(scrollYProgress, [0, 0.35, 0.5, 0.75, 0.85], [0, 0, 0.3, 0.3, 0]);

  // White Gradient - Step 9 - Light blue to white gradient at top
  const whiteGradientOpacity = useTransform(scrollYProgress, [0.45, 0.50, 0.99, 1], [0, 1, 1, 1]);

  // Listen for scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const AboutUsNavigation = document.getElementById("AboutUsNavigation");
    if (latest >= 0.85) {
      if (AboutUsNavigation) {
        AboutUsNavigation.style.opacity = '1';
        AboutUsNavigation.style.zIndex = '999';
      }
    } else {
      if (AboutUsNavigation) {
        AboutUsNavigation.style.opacity = '0';
        AboutUsNavigation.style.zIndex = '0';
      }
    }

    if (latest >= 0.25) {
      setHideDownArrow(true);
    } else {
      setHideDownArrow(false);
    }

    if (latest >= 0.22 && latest <= 0.85) {
      setIsComplianceActive(true);
    } else {
      setIsComplianceActive(false);
    }
  });

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-[250vh] w-full m-0 p-0"
      style={{
        height: '250vh',
        backgroundColor: useTransform(scrollYProgress, [0.8, 0.9], ['#2c4657', '#ffffff'])
      }}
    >
      {/* Sticky container that holds the animated content */}
      <div className="sticky top-0 h-screen w-full overflow-hidden m-0 p-0">
        <div className="relative size-full overflow-hidden m-0 p-0">
          {/* Base background */}
          <motion.div
            className="absolute inset-0 z-[0] m-0 p-0"
            style={{
              background: useTransform(
                scrollYProgress,
                [0, 0.04, 0.08, 0.12, 0.25, 0.65, 0.85],
                splashViewed
                  ? ['#2c4657', '#2c4657', '#2c4657', '#2c4657', '#2c4657', '#2c4657', '#ffffff']
                  : ['#ffffff', '#ffffff', '#b8d4e0', '#8eaab8', '#2c4657', '#2c4657', '#ffffff']
              )
            }}
          />

          {/* JIGSAW Text - Fades in Step 1, fades out Step 7 */}
          <motion.div
            className="absolute h-[73.309px] left-1/2 top-[calc(50%-256.56px)] translate-x-[-50%] translate-y-[-50%] w-[95%] max-w-[410px] px-2"
            style={{ opacity: topJigsawOpacity }}
          >
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 410 74">
              <g id="Vector">
                <path d={svgPathsHero.p2af02f00} fill="url(#paint0_linear_436_54)" fillOpacity="0.7" />
                <path d={svgPathsHero.pa6e9600} fill="url(#paint1_linear_436_54)" fillOpacity="0.7" />
                <path d={svgPathsHero.p3257ca00} fill="url(#paint2_linear_436_54)" fillOpacity="0.7" />
                <path d={svgPathsHero.p36b9f170} fill="url(#paint3_linear_436_54)" fillOpacity="0.7" />
                <path d={svgPathsHero.p356fa80} fill="url(#paint4_linear_436_54)" fillOpacity="0.7" />
                <path d={svgPathsHero.p35a41400} fill="url(#paint5_linear_436_54)" fillOpacity="0.7" />
              </g>
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_436_54" x1="204.483" x2="204.865" y1="0.133408" y2="75.412">
                  <stop offset="0.1" stopColor="white" stopOpacity="0.25" />
                  <stop offset="0.836538" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_436_54" x1="204.483" x2="204.865" y1="0.133408" y2="75.412">
                  <stop offset="0.1" stopColor="white" stopOpacity="0.25" />
                  <stop offset="0.836538" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_436_54" x1="204.483" x2="204.865" y1="0.133408" y2="75.412">
                  <stop offset="0.1" stopColor="white" stopOpacity="0.25" />
                  <stop offset="0.836538" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint3_linear_436_54" x1="204.483" x2="204.865" y1="0.133408" y2="75.412">
                  <stop offset="0.1" stopColor="white" stopOpacity="0.25" />
                  <stop offset="0.836538" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint4_linear_436_54" x1="204.483" x2="204.865" y1="0.133408" y2="75.412">
                  <stop offset="0.1" stopColor="white" stopOpacity="0.25" />
                  <stop offset="0.836538" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint5_linear_436_54" x1="204.483" x2="204.865" y1="0.133408" y2="75.412">
                  <stop offset="0.1" stopColor="white" stopOpacity="0.25" />
                  <stop offset="0.836538" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Background House Image - Step 2 */}
          <motion.div
            className="absolute flex h-[875px] items-center justify-center left-[-449px] top-[20px] w-[1306.42px] z-[1]"
            style={{ opacity: bgImageOpacity, y: bgImageY }}
          >
            <div className="flex-none rotate-[180deg] scale-y-[-100%]">
              <div className="h-[875px] relative w-[1306.42px]">
                <img
                  alt=""
                  className="absolute inset-0 max-w-none object-50%-50% object-cover opacity-[0.08] pointer-events-none size-full"
                  src={imgModernHouseAtTwilight4}
                  fetchpriority="high"
                />
              </div>
            </div>
          </motion.div>

          {/* Hero House Image (Original) - visible during hero section, fades out when compliance appears */}
          <motion.div
            className="absolute flex h-[875px] items-center justify-center left-[-449px] top-[40px] w-[1306.42px] z-[2]"
            style={{ opacity: heroHouseOpacity, y: mainImageY }}
          >
            <div className="flex-none rotate-[180deg] scale-y-[-100%]">
              <div className="h-[875px] relative w-[1306.42px]">
                <img
                  alt=""
                  className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
                  src={imgModernHouseAtTwilight4}
                  fetchpriority="high"
                />
              </div>
            </div>
          </motion.div>

          {/* Compliance House Image (Mobile) - fades in when compliance appears, replaces hero house */}
          <motion.div
            className="absolute flex h-[875px] items-center justify-center left-[-449px] top-[47px] w-[1306.42px] z-[2]"
            style={{ opacity: complianceHouseOpacity, y: mainImageY }}
          >
            <div className="flex-none rotate-[180deg] scale-y-[-100%]">
              <div className="h-[875px] relative w-[1306.42px]">
                <img
                  alt=""
                  className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                  style={{ objectPosition: '50% 75%' }}
                  src={imgModernHouseAtTwilight4}
                  fetchpriority="high"
                />
              </div>
            </div>
          </motion.div>

          {/* Gradient overlay at bottom of house */}
          <motion.div
            className="absolute bg-gradient-to-b from-[14.787%] from-[rgba(44,70,87,0)] h-[541px] left-0 to-[#2c4657] to-[85.86%] bottom-0 w-full z-[3]"
            style={{ opacity: gradientOverlayOpacity }}
          />

          {/* Step 6 Bottom Gradient */}
          <motion.div
            className="absolute left-0 bottom-0 w-full h-full z-[5]"
            style={{ opacity: step6GradientOpacity }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(26, 42, 53, 0) 0%, rgba(26, 42, 53, 0.3) 30%, rgba(26, 42, 53, 0.8) 50%, #1a2a35 70%, #0d1419 100%)'
              }}
            />
          </motion.div>

          {/* Bottom Gradient - Step 7.5 */}
          <motion.div
            className="absolute left-0 bottom-0 w-full h-full z-[4]"
            style={{ opacity: bottomGradientOpacity }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.75) 100%)'
              }}
            />
          </motion.div>

          {/* White Gradient - Step 9 - Light blue to white gradient at top */}
          <motion.div
            className="absolute left-0 top-0 w-full h-full z-[9]"
            style={{ opacity: whiteGradientOpacity }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(232, 244, 248, 0.4) 0%, rgba(232, 244, 248, 0.5) 10%, rgba(255, 255, 255, 0.7) 20%, #ffffff 40%, #ffffff 100%)'
              }}
            />
          </motion.div>

          {/* Bottom gradient to hide house image bottom portion during compliance */}
          <motion.div
            className="absolute left-0 bottom-0 w-full h-[300px] z-[8]"
            style={{ opacity: whiteGradientOpacity }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, #2c4657 0%, rgba(44, 70, 87, 0.95) 20%, rgba(44, 70, 87, 0.8) 40%, rgba(44, 70, 87, 0) 100%)'
              }}
            />
          </motion.div>

          {/* Sentence - Step 3 */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-center top-1/2 w-[346px] pt-[24px] z-[15]"
            style={{ opacity: sentenceOpacity, y: sentenceY, borderTop: '1px solid #ffffff' }}
          >
            <div className="font-lato-bold text-[64px] leading-[72px] tracking-[1px] text-white uppercase">
              <p className="m-0">Advice</p>
              <p className="m-0">that fits</p>
            </div>
          </motion.div>

          {/* Down Arrow Button - Step 5 */}
          <motion.div
            className="absolute left-1/2 top-[calc(50%+310px)] translate-x-[-50%] translate-y-[-50%] z-[50]"
            style={{
              y: arrowY,
              opacity: arrowOpacity,
              pointerEvents: hideDownArrow ? 'none' : 'auto'
            }}
          >
            <MobileDownArrow onClick={handleScrollToNext} />
          </motion.div>

          {/* Compliance Content - Step 8 */}
          <motion.div
            className="absolute left-0 top-0 h-full w-full z-[100] pointer-events-none"
            id="WeRewarded"
            style={{ y: complianceY, opacity: complianceOpacity }}
          >
            {/* Dynamic gradient background that transitions to white */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: useTransform(
                  scrollYProgress,
                  [0.65, 0.75, 0.85, 0.90],
                  [
                    'linear-gradient(to bottom, rgba(26, 42, 53, 0) 0%, rgba(26, 42, 53, 0.3) 30%, rgba(26, 42, 53, 0.8) 50%, #1a2a35 70%, #0d1419 100%)',
                    'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 30%, rgba(255, 255, 255, 0.6) 50%, #ffffff 65%, #ffffff 100%)',
                    'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 10%, rgba(255, 255, 255, 0.5) 20%, #ffffff 35%, #ffffff 100%)',
                    '#ffffff'
                  ]
                )
              }}
            />

            {/* White gradient at bottom */}
            <div className="absolute bottom-0 left-0 w-full h-[400px] bg-gradient-to-t from-white to-transparent z-[2]" />

            {/* FCA Compliance Section - Mobile Design */}
            <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[500px] flex flex-col gap-[16px] sm:gap-[20px] items-center justify-center z-[101] px-4 ${isComplianceActive ? 'pointer-events-auto' : 'pointer-events-none'}`}>
              {/* Shield Icon Replacement */}
              <div className="shrink-0 mt-[-5px]">
                <img
                  src={complianceShield}
                  alt="Compliance Shield"
                  className="w-[50px] h-auto object-contain"
                />
              </div>

              {/* FCA Text */}
              <p className="font-lato-light min-h-px min-w-px not-italic relative text-[14px] text-white text-center">
                <span className="leading-[20px]">Jigsaw Financial operates as an Appointed Representative of a mortgage network authorised and regulated by the Financial Conduct Authority. <br />
                  This structure provides additional oversight, with experienced compliance specialists supporting cases and helping ensure advice remains accurate and responsible. <br /> We also stay closely informed of regulatory developments so our clients can feel confident they are being properly looked after.</span>
                <a
                  href="https://register.fca.org.uk/s/firm?id=0010X00004QO8QvQAL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden font-lato-semibold leading-[20px] underline decoration-solid hover:text-[#2ec4b6] transition-colors duration-200 cursor-pointer relative z-[102]"
                >
                  here
                </a>
                <span className="leading-[20px]"></span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}