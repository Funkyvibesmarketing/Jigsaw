import { motion, useScroll, useTransform, AnimatePresence, useMotionValue } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import imgVector from "figma:asset/d9d043aba62229fe40aba8743fc6dbfe62b9cdd3.png";
import imgVectorMobile from "figma:asset/add4cb2fc6a41d59b6193f6298e99d6b25b9b0e5.png";
import svgPathsMobile from "../imports/svg-avyll6yivq";
import svgPathsTeam from "../imports/svg-jpxqepf0ih";
import imgTeamPreview from "figma:asset/8ff86b859ea6e1213d92ee504583e0bce2dc86d5.png";

// Desktop arrow frame
function Frame() {
  return (
    <div className="overflow-clip relative size-[36px]">
      <div className="absolute flex inset-[28.41%_14.26%_28.19%_14.28%] items-center justify-center">
        <div className="flex-none h-[15.557px] rotate-[359.849deg] w-[25.687px]">
          <div className="relative size-full" data-name="Vector">
            <div className="absolute inset-[-4.82%_-2.92%]">
              <img alt="" className="block max-w-none size-full" height="17.057" src={imgVector} width="27.187" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="bg-[#2ec4b6] relative rounded-[72px] size-[72px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[10.286px] items-center justify-center px-[41.143px] py-[30.857px] relative size-[72px]">
          <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "36", "--transform-inner-height": "36" } as React.CSSProperties}>
            <div className="flex-none rotate-[90deg]">
              <Frame />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[-6.429px_0px_5.143px_0px_inset_rgba(255,255,255,0.12),3.857px_0px_5.143px_0px_inset_rgba(255,255,255,0.16)]" />
    </div>
  );
}

// Mobile Components from Figma imports
function MainMobile() {
  return (
    <div className="[grid-area:1_/_1] h-[27.429px] ml-0 mt-0 relative w-[25.714px]" data-name="Main_1_00000014621826160272210780000006234564362710872498_">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 28">
        <g id="Main_1_00000014621826160272210780000006234564362710872498_">
          <path d={svgPathsMobile.p2545c2c0} fill="var(--fill-0, #2EC4B6)" id="Vector" />
          <path d={svgPathsMobile.p32440100} fill="var(--fill-0, #2C4657)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function FaviconMobile() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative" data-name="Favicon">
      <MainMobile />
    </div>
  );
}

function Frame2Mobile() {
  return (
    <div className="bg-white relative rounded-[48px] size-[48px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[6.857px] items-center justify-center px-[27.429px] py-[20.571px] relative size-[48px]">
          <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center leading-[0] relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "25.703125", "--transform-inner-height": "27.421875" } as React.CSSProperties}>
            <div className="flex-none rotate-[90deg]">
              <FaviconMobile />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[-4.286px_0px_3.429px_0px_inset_rgba(0,0,0,0.06),2.571px_0px_3.429px_0px_inset_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function PhoneOutgoingMobile() {
  return (
    <div className="relative size-[20.571px]" data-name="PhoneOutgoing">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
        <g id="PhoneOutgoing">
          <path d={svgPathsMobile.p3ff1cb00} fill="var(--fill-0, #2C4657)" id="Vector" />
          <path d={svgPathsMobile.p70d3700} fill="var(--fill-0, #2EC4B6)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame1Mobile() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[6.857px] items-center justify-center p-[20.571px] relative rounded-[48px] size-[48px]">
      <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "20.5625", "--transform-inner-height": "20.5625" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg]">
          <PhoneOutgoingMobile />
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[-4.286px_0px_3.429px_0px_inset_rgba(0,0,0,0.06),2.571px_0px_3.429px_0px_inset_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function IconamoonMenuBurgerVerticalThinMobile() {
  return (
    <div className="relative shrink-0 size-[19.2px]" data-name="iconamoon:menu-burger-vertical-thin">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="iconamoon:menu-burger-vertical-thin">
          <path d={svgPathsMobile.p8bd0840} id="Vector" stroke="var(--stroke-0, #2C4657)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
        </g>
      </svg>
    </div>
  );
}

function Frame3Mobile() {
  return (
    <div className="bg-[#e4ecf1] box-border content-stretch flex flex-col gap-[8px] items-center justify-center px-[17.5px] py-[12px] relative rounded-[100px] shrink-0 size-[48px]">
      <div aria-hidden="true" className="absolute border border-[rgba(44,70,87,0.1)] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <IconamoonMenuBurgerVerticalThinMobile />
      <div className="absolute inset-0 pointer-events-none shadow-[0px_4px_4px_0px_inset_rgba(255,255,255,0.12),0px_-5px_4px_0px_inset_rgba(255,255,255,0.08)]" />
    </div>
  );
}

function Frame5Mobile() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "48", "--transform-inner-height": "48" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <Frame1Mobile />
        </div>
      </div>
      <Frame3Mobile />
    </div>
  );
}

function Frame6Mobile() {
  return (
    <div className="bg-[rgba(228,236,241,0.4)] box-border content-stretch flex h-[72px] items-center justify-between px-[12px] py-[16px] relative rounded-[72px] shrink-0 w-[136px]">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[72px]" />
      <Frame5Mobile />
    </div>
  );
}

function Frame7Mobile() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-1/2 top-[24px] translate-x-[-50%] w-[90%] max-w-[382px] px-4">
      <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "48", "--transform-inner-height": "48" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <Frame2Mobile />
        </div>
      </div>
      <Frame6Mobile />
    </div>
  );
}

function FrameMobileArrow() {
  return (
    <div className="overflow-clip relative size-[24px]">
      <div className="absolute flex inset-[28.41%_14.26%_28.19%_14.28%] items-center justify-center">
        <div className="flex-none h-[10.371px] rotate-[359.849deg] w-[17.125px]">
          <div className="relative size-full" data-name="Vector">
            <div className="absolute inset-[-4.82%_-2.92%]">
              <img alt="" className="block max-w-none size-full" height="11.372" src={imgVectorMobile} width="18.125" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame4Mobile() {
  return (
    <div className="bg-[#2ec4b6] relative rounded-[48px] size-[48px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[6.857px] items-center justify-center px-[27.429px] py-[20.571px] relative size-[48px]">
          <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "24", "--transform-inner-height": "24" } as React.CSSProperties}>
            <div className="flex-none rotate-[90deg]">
              <FrameMobileArrow />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[-4.286px_0px_3.429px_0px_inset_rgba(255,255,255,0.12),2.571px_0px_3.429px_0px_inset_rgba(255,255,255,0.16)]" />
    </div>
  );
}

// Review Card Component
function ReviewCard({ review, author, date }: { review: string; author: string; date: string }) {
  return (
    <motion.div
      className="relative rounded-[16px] w-[502px] md:block hidden overflow-hidden backdrop-blur-[14px] backdrop-filter bg-[rgba(228,236,241,0.4)] border border-[rgba(46,196,182,0.3)] border-solid shadow-[0px_4px_28px_-1px_rgba(46,196,182,0.12)]"
      animate={{
        y: [-10, 10, -10],
        x: [-5, 5, -5],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Content wrapper with padding */}
      <div className="relative px-[32px] pt-[24px] pb-[32px] flex flex-col gap-[16px]">
        <p className="font-['Lato:Regular',sans-serif] leading-[32px] not-italic text-[#2c4657] text-[20px] tracking-[0.04px]">{review}</p>
        <div className="flex items-center justify-between w-full">
          <p className="font-['Lato:Regular',sans-serif] leading-[16px] not-italic text-[#2c4657] text-[14px] text-nowrap">{author}</p>
          <p className="font-['Lato:Regular',sans-serif] leading-[16px] not-italic text-[#2c4657] text-[14px] text-nowrap">{date}</p>
        </div>
      </div>

      {/* Decorative ellipse at bottom */}
      <div className="absolute flex h-[107.628px] items-center justify-center left-[49.9px] bottom-[-60px] w-[358.491px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[356.635deg]">
          <div className="h-[87px] relative w-[353.994px]">
            <div className="absolute inset-[-59.77%_-14.69%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 457.994 191">
                <g filter="url(#filter0_f_1361_393)" id="Ellipse 15">
                  <ellipse cx="228.997" cy="95.5" fill="var(--fill-0, #2EC4B6)" fillOpacity="0.1" rx="176.997" ry="43.5" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="191" id="filter0_f_1361_393" width="457.994" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur_1361_393" stdDeviation="26" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Mobile Review Card Component - scaled down from desktop
// Uses CSS keyframe animation (GPU compositor) instead of Framer Motion infinite
// loop (JS thread) to prevent main-thread blocking on iOS.
function ReviewCardMobile({ review, author, date, animClass = 'float-card-a' }: { review: string; author: string; date: string; animClass?: string }) {
  return (
    <div
      className={`relative rounded-[16px] w-[305px] overflow-hidden ${animClass}`}
      style={{
        backgroundColor: 'rgba(228,236,241,0.4)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)'
      } as React.CSSProperties}
    >
      <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[16px] relative w-[305px]">
        <p className="font-['Lato:Regular',sans-serif] leading-[28px] min-w-full not-italic relative shrink-0 text-[#2c4657] text-[16px] tracking-[0.032px] w-[min-content]">{review}</p>
        <div className="flex items-center justify-between w-full">
          <p className="font-['Lato:Regular',sans-serif] leading-[16px] not-italic text-[#2c4657] text-[12px] text-nowrap">{author}</p>
          <p className="font-['Lato:Regular',sans-serif] leading-[16px] not-italic text-[#2c4657] text-[12px] text-nowrap">{date}</p>
        </div>
        <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.05869666114449501)+(var(--transform-inner-height)*0.9982757568359375)))] items-center justify-center left-[71.35px] top-[88.2px] w-[calc(1px*((var(--transform-inner-height)*0.05869666114449501)+(var(--transform-inner-width)*0.9982757568359375)))]" style={{ "--transform-inner-width": "353.984375", "--transform-inner-height": "87" } as React.CSSProperties}>
          <div className="flex-none rotate-[356.635deg]">
            <div className="h-[87px] relative w-[353.994px]">
              <div className="absolute inset-[-59.77%_-14.69%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 458 191">
                  <g filter="url(#filter0_f_550_1088)" id="Ellipse 15">
                    <ellipse cx="228.997" cy="95.5" fill="var(--fill-0, #2EC4B6)" fillOpacity="0.1" rx="176.997" ry="43.5" />
                  </g>
                  <defs>
                    <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="191" id="filter0_f_550_1088" width="457.994" x="0" y="0">
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                      <feGaussianBlur result="effect1_foregroundBlur_550_1088" stdDeviation="26" />
                    </filter>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(46,196,182,0.3)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_4px_28px_-1px_rgba(46,196,182,0.12)]" />
    </div>
  );
}

// Scroll indicator - Step 2 position
function ScrollIndicatorStep2() {
  return (
    <div className="absolute left-[1136px] size-[48px] top-[691px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Frame 1000002968">
          <rect fill="var(--fill-0, #2EC4B6)" fillOpacity="0.1" height="48" rx="24" width="48" />
          <path d="M 24 14 L 24 30.344 M 24 30.344 L 30 24.344 M 24 30.344 L 18 24.344" fill="var(--fill-0, #294150)" stroke="var(--stroke-0, #294150)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

export function Reviews({
  onScrollProgress,
  isModal = false,
  onClose,
  aboutUsScrollProgress,
  processScrollProgress,
  onReady
}: {
  onScrollProgress?: (progress: number) => void;
  isModal?: boolean;
  onClose?: () => void;
  aboutUsScrollProgress?: number;
  processScrollProgress?: number;
  onReady?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(0);

  // Signal readiness on mount
  useEffect(() => {
    if (onReady) {
      onReady();
    }
  }, []);

  // Detect mobile view
  const [isMobile, setIsMobile] = useState(false);
  const zoomFactor = window.innerWidth > 1920 ? (window.innerWidth / 1920) : 1;
  const viewportHeight = window.innerHeight / zoomFactor;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track scroll progress through this section using zoom-safe layout metrics
  const scrollYProgress = useMotionValue(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const zoomFactor = window.innerWidth > 1920 ? (window.innerWidth / 1920) : 1;
      
      const rectTop = rect.top / zoomFactor;
      const rectHeight = rect.height / zoomFactor;
      const viewportHeight = window.innerHeight / zoomFactor;
      
      // start start (rectTop = 0) to end end (rectTop = viewportHeight - rectHeight)
      const total = rectHeight - viewportHeight;
      const current = -rectTop;
      const progress = total <= 0 ? 0 : Math.min(1, Math.max(0, current / total));
      
      scrollYProgress.set(progress);
      setScrollProgress(progress);
      if (onScrollProgress) {
        onScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [onScrollProgress]);

  // Fade Reviews section based on AboutUs progress - don't show until Services mask is complete
  // Reviews section opacity - fades in when Services Step 1 ends
  // Default to full opacity when entering Reviews section normally
  let reviewsSectionOpacity = 1;

  // Different timing for mobile vs desktop
  // Desktop: Services Step 1 completes at 0.72, fade in from 0.72 to 0.76
  // Mobile: Services mask completes at 0.72, fade in from 0.72 to 0.76 (earlier timing)
  if (isMobile) {
    // Mobile timing - starts earlier
    if (aboutUsScrollProgress && aboutUsScrollProgress < 0.72) {
      reviewsSectionOpacity = 0;
    } else if (aboutUsScrollProgress && aboutUsScrollProgress < 0.76) {
      // Fade in from 0.72 to 0.76
      reviewsSectionOpacity = (aboutUsScrollProgress - 0.72) / 0.04;
    }
  } else {
    // Desktop timing
    if (aboutUsScrollProgress && aboutUsScrollProgress < 0.72) {
      reviewsSectionOpacity = 0;
    } else if (aboutUsScrollProgress && aboutUsScrollProgress < 0.76) {
      // Fade in from 0.72 to 0.76
      reviewsSectionOpacity = (aboutUsScrollProgress - 0.72) / 0.04;
    }
  }

  // Fade out when Process section slides up (0.05 - 0.15)
  if (processScrollProgress && processScrollProgress >= 0.05) {
    reviewsSectionOpacity = 1 - Math.min((processScrollProgress - 0.05) / 0.1, 1);
  }

  // STEP 1: 0 → 0.5 (REVIEWS shrinks from 232px → 160px, bold → regular, solid → lighter)
  // STEP 2: 0.5 → 1 (Review cards slide up)

  // Text size animation: Desktop 232px → 160px, Mobile 56px always
  const textSizeDesktop = useTransform(scrollYProgress, [0, 0.5], ['232px', '160px']);
  const textSizeMobile = useTransform(scrollYProgress, [0, 0.3, 0.5], ['56px', '56px', '56px']);

  // Letter spacing animation: Desktop 48px → 32px, Mobile 16px always
  const letterSpacingDesktop = useTransform(scrollYProgress, [0, 0.5], ['48px', '32px']);
  const letterSpacingMobile = useTransform(scrollYProgress, [0, 0.5], ['16px', '16px']);

  // Text color - Mobile fades through the card animation: 100% → 70% → 30% → 0%
  const textColorDesktop = useTransform(
    scrollYProgress,
    [0, 0.5],
    [
      'rgba(44, 70, 87, 1)',    // Start: Solid #2C4657
      'rgba(44, 70, 87, 0.3)'   // End: Very light
    ]
  );

  const textColorMobile = useTransform(
    scrollYProgress,
    [0, 0.02, 0.75, 0.78],
    [
      'rgba(41, 65, 80, 1)',      // Start: 100% opacity (full)
      'rgba(41, 65, 80, 0.2)',    // When centered: 20% opacity
      'rgba(41, 65, 80, 0.2)',    // Keep at 20% while cards slide
      'rgba(41, 65, 80, 0)'       // Fade out quickly after all cards move up
    ]
  );

  // Font weight change: Bold → Regular
  const fontWeight = useTransform(
    scrollYProgress,
    [0, 0.5],
    ['700', '400']
  );

  // Scroll indicator opacity for Step 2 - appears during card animation
  const scrollIndicatorStep2Opacity = useTransform(scrollYProgress, [0.5, 0.55, 0.70, 0.75], [0, 1, 1, 0]);

  // Review cards slide up from bottom in Step 2 (after text has faded)
  // Cards slide up ONE BY ONE sequentially - each has its own timing
  // FIRST cards go beyond the top, LAST cards stay visible in the Reviews section
  // Slower animation - extended scroll ranges
  // MOBILE: Slower animation with extended ranges (15% vs 10% for desktop)

  // Desktop card animations - 20% scroll range for SLOWER movement - ALL cards move beyond viewport
  const card1Y = useTransform(scrollYProgress, [0.50, 0.70], [800, -400]);  // First - Goes far beyond top - SLOWER (20% range)
  const card1Opacity = useTransform(scrollYProgress, [0.50, 0.52, 0.70, 0.88, 0.93], [0, 1, 1, 1, 0]);  // Fade out gradually as TEAM slides in (0.88 - 0.93)

  const card2Y = useTransform(scrollYProgress, [0.54, 0.74], [800, -350]);  // Second - Goes far beyond top - SLOWER (20% range)
  const card2Opacity = useTransform(scrollYProgress, [0.54, 0.56, 0.74, 0.88, 0.93], [0, 1, 1, 1, 0]);  // Fade out gradually as TEAM slides in (0.88 - 0.93)

  const card5Y = useTransform(scrollYProgress, [0.58, 0.78], [800, -300]);  // Third - Goes beyond top - SLOWER (20% range)
  const card5Opacity = useTransform(scrollYProgress, [0.58, 0.60, 0.88, 0.93], [0, 1, 1, 0]);  // Fade out gradually as TEAM slides in (0.88 - 0.93)

  const card6Y = useTransform(scrollYProgress, [0.62, 0.82], [800, -250]);  // Fourth - Goes beyond top - SLOWER (20% range)
  const card6Opacity = useTransform(scrollYProgress, [0.62, 0.64, 0.88, 0.93], [0, 1, 1, 0]);  // Fade out gradually as TEAM slides in (0.88 - 0.93)

  const card7Y = useTransform(scrollYProgress, [0.66, 0.86], [800, -200]);  // Fifth - Goes beyond top - SLOWER (20% range)
  const card7Opacity = useTransform(scrollYProgress, [0.66, 0.68, 0.88, 0.93], [0, 1, 1, 0]);  // Fade out gradually as TEAM slides in (0.88 - 0.93)

  // Mobile card animations - 5 cards total with sequential one-by-one animation
  // MUCH LONGER scroll ranges (55%) to prevent cards moving too fast on swipes
  // Each card requires MUCH MORE scrolling to complete its animation
  // Cards start 10% apart for sequential appearance but overlap for smooth flow
  // INCREASED starting position to 1200px to keep cards off-screen initially
  const card1YMobile = useTransform(scrollYProgress, [0.00, 0.40], [800, -800]);
  const card2YMobile = useTransform(scrollYProgress, [0.10, 0.50], [800, -800]);
  const card5YMobile = useTransform(scrollYProgress, [0.20, 0.60], [800, -900]);
  const card6YMobile = useTransform(scrollYProgress, [0.30, 0.70], [800, -1200]); // Jess's card is long, extra height to clear
  const card7YMobile = useTransform(scrollYProgress, [0.40, 0.80], [800, -800]);

  // Mobile card opacity - separate from desktop timing - adjusted for extended 55% scroll ranges
  // Cards fade out MUCH EARLIER - from 0.65 to 0.70 - well before TEAM masking starts (0.85)
  const card1OpacityMobile = useTransform(scrollYProgress, [0.00, 0.05, 0.35, 0.40], [0, 1, 1, 0]);
  const card2OpacityMobile = useTransform(scrollYProgress, [0.10, 0.15, 0.45, 0.50], [0, 1, 1, 0]);
  const card5OpacityMobile = useTransform(scrollYProgress, [0.20, 0.25, 0.55, 0.60], [0, 1, 1, 0]);
  const card6OpacityMobile = useTransform(scrollYProgress, [0.30, 0.35, 0.65, 0.70], [0, 1, 1, 0]);
  const card7OpacityMobile = useTransform(scrollYProgress, [0.40, 0.45, 0.75, 0.80], [0, 1, 1, 0]);  // Fade out early at 0.65-0.70

  // TEAM text animations - zooms in from right side after cards finish scrolling
  // Desktop: Cards finish at 0.80, TEAM starts at 0.88 (gap for cleanup)
  // Mobile: Cards finish at 0.90, TEAM starts at 0.85 - EXTREMELY SLOW slide from 0.85 to 1.00 (15% range)
  // Extended time for sliding AND gradual zooming - VERY SLOW ANIMATION for mobile
  // Text moves slowly from right to center, then very gradually zooms to fill screen - ALWAYS FULL OPACITY
  // X position accounts for text width (~800px) to properly center: -400px offset from left: 50%
  const teamXDesktop = useTransform(scrollYProgress, [0.88, 0.96, 0.98, 1], [2000, -200, -400, -400]); // SLOWER: 0.88 → 0.96 (8% range, was 5%)
  const teamXMobile = useTransform(scrollYProgress, [0.85, 0.91, 0.95, 0.98, 1.00], [1200, 700, 400, 150, -50]); // EXTREMELY SLOW: 0.85 → 1.00 (15% range) with very gradual steps
  const teamScale = useTransform(scrollYProgress, [0.88, 0.96, 0.98, 0.985, 0.99, 0.995, 1], [1.5, 1.5, 2.5, 4, 8, 20, 50]); // Adjusted to match new slower timing
  const teamOpacity = useTransform(scrollYProgress, [0.88, 0.91, 1], [0, 1, 1]); // Fades in slower and stays at full opacity

  // TEAM text color - solid during slide, then transparent during zoom for mask effect
  const teamTextColor = useTransform(
    scrollYProgress,
    [0.82, 0.93, 0.95],
    ['rgba(44, 70, 87, 1)', 'rgba(44, 70, 87, 1)', 'rgba(44, 70, 87, 0)']
  );

  // White overlay fade - Reviews section fades to white when transitioning to Team
  const whiteFadeOpacity = useTransform(scrollYProgress, [0.82, 0.93], [0, 1]); // Fades from transparent to white

  // Team section reveal through TEAM text mask - starts when zoom begins
  const teamSectionMaskOpacity = useTransform(scrollYProgress, [0.93, 0.98], [0, 1]); // Fades in during zoom

  // Handle wheel scroll when in modal mode
  const handleWheel = (e: React.WheelEvent) => {
    if (!isModal) return;

    e.preventDefault();
    e.stopPropagation();

    const now = Date.now();

    // Debounce: Only allow scroll every 500ms
    if (now - lastScrollTime.current < 500) {
      return;
    }

    // Check if we're scrolling up - go back to Services
    if (e.deltaY < -3 && onClose) {
      lastScrollTime.current = now;
      onClose();
    }
  };

  const content = (
    <>
      {/* White overlay that fades in when TEAM text slides in */}
      {!isModal && (
        <motion.div
          className="absolute inset-0 bg-white pointer-events-none"
          style={{
            opacity: whiteFadeOpacity,
            zIndex: 90
          }}
        />
      )}

      {/* Desktop Content */}
      <div className="hidden md:block">
        {/* Background gradient */}
        <div className="absolute h-[833px] left-[calc(50%+1px)] top-[-74px] translate-x-[-50%] w-[min(1296px,90vw)] max-w-[1296px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <g id="Ellipse 14"></g>
          </svg>
        </div>

        {/* REVIEWS Text - CENTERED and animates size, position, spacing, weight, and color */}
        <motion.p
          className="absolute font-['Lato',sans-serif] leading-[normal] not-italic text-center text-nowrap uppercase whitespace-pre"
          style={{
            fontSize: isModal ? 232 : (textSizeDesktop as any),
            color: isModal ? '#2C4657' : (textColorDesktop as any),
            fontWeight: isModal ? 700 : (fontWeight as any),
            top: isModal ? 'calc(50% + 20px)' : 'calc(50% - 150px)',
            left: 'calc(50% + 24px)',
            transform: 'translateX(-50%)',
            letterSpacing: isModal ? '48px' : (letterSpacingDesktop as any),
            paddingLeft: '48px',
            zIndex: 10,
            opacity: isModal ? 1 : useTransform(scrollYProgress, [0, 0.5, 0.78, 0.82], [1, 0.3, 0.3, 0]) // Fade out with cards
          }}
        >
          Reviews
        </motion.p>

        {/* Scroll Indicator - Step 2 */}
        {!isModal && (
          <motion.div style={{ opacity: scrollIndicatorStep2Opacity }}>
            {/* <ScrollIndicatorStep2 /> */}
          </motion.div>
        )}

        {/* Review Cards - Step 3 */}
        {!isModal && (
          <>
            {/* Card 1 - Left side */}
            <motion.div
              className="absolute flex items-center justify-center w-[502px] h-[145px]"
              style={{
                y: card1Y,
                opacity: card1Opacity,
                rotate: '354.19deg',
                zIndex: 60,
                left: 'calc(50% - 500px)',  // Center-aligned offset - shifted left
              }}
            >
              <ReviewCard review='"Amazing customer service, updates every step of the way and easy to get in contact with for information if I were ever lost or confused. As a first-time buyer, I couldn’t ask for more with this team. Thankyou!" ' author="~Cameron" date="October, 2025" />
            </motion.div>

            {/* Card 2 - Right side */}
            <motion.div
              className="absolute flex items-center justify-center w-[502px] h-[145px]"
              style={{
                y: card2Y,
                opacity: card2Opacity,
                rotate: '357.749deg',
                zIndex: 60,
                left: 'calc(50% + 92px)',  // Center-aligned offset - shifted left
              }}
            >
              <ReviewCard review='"Gemma and Nick were both so helpful, not only with the mortgage process but also during the house-buying process from start to completion and beyond. HIGHLY recommend!!"' author="~Amber" date="September, 2025" />
            </motion.div>

            {/* Card 5 - Left side */}
            <motion.div
              className="absolute flex items-center justify-center w-[502px] h-[145px]"
              style={{
                y: card5Y,
                opacity: card5Opacity,
                rotate: '357.749deg',
                zIndex: 60,
                left: 'calc(50% - 508px)',  // Center-aligned offset - shifted left
              }}
            >
              <ReviewCard review={`"I would strongly recommend Nick if you are looking to secure a mortgage or remortgage. He is exceptionally proactive and genuinely cares. Nick made the process of buying a house much more relaxed."`} author="~Daniel" date="August, 2025" />
            </motion.div>

            {/* Card 6 - Right side */}
            <motion.div
              className="absolute flex items-center justify-center w-[502px] h-[145px]"
              style={{
                y: card6Y,
                opacity: card6Opacity,
                rotate: '11.025deg',
                zIndex: 60,
                left: 'calc(50% + 184px)',  // Center-aligned offset - shifted left
              }}
            >
              <ReviewCard review={`"Nick was the most amazing person through my mortgage application process. I had already had an application denied with another company and Nick reassured me and worked so hard just for me to be living in my dream property now. I would recommend Jigsaw Financial to anyone after the 10/10 experience I have received. Thank you again to both Nick and Gemma for making the most stressful time in my life just that bit easier."`} author="~Jess" date="December, 2025" />
            </motion.div>

            {/* Card 7 - Left side */}
            <motion.div
              className="absolute flex items-center justify-center w-[502px] h-[145px]"
              style={{
                y: card7Y,
                opacity: card7Opacity,
                rotate: '354.19deg',
                zIndex: 60,
                left: 'calc(50% - 500px)',  // Center-aligned offset - shifted left
              }}
            >
              <ReviewCard review={`"Absolutely fantastic company! We can't thank Nick and Team enough for all they have done for us, from our first mortgage to our remortgage.
Very thorough and quick to reply! Would highly recommend!"`} author="~Rebecca" date="January, 2026" />
            </motion.div>
          </>
        )}

        {/* Down Arrow Button - Bottom Right */}


        {/* White overlay fade - Reviews section fades to white when transitioning to Team */}
        {!isModal && (
          <motion.div
            className="absolute inset-0 bg-white pointer-events-none"
            style={{
              zIndex: 95,
              opacity: whiteFadeOpacity,
            }}
          />
        )}

        {/* TEAM Text - Slides in from right, then fades out before mask takes over */}
        {!isModal && (
          <motion.p
            className="absolute font-['Lato:Bold',sans-serif] leading-[normal] not-italic text-center text-nowrap uppercase text-[#2c4657]"
            style={{
              fontSize: '232px',
              x: teamXDesktop,
              scale: teamScale,
              opacity: useTransform(scrollYProgress, [0.82, 0.84, 0.93, 0.95], [0, 1, 1, 0]), // Fades out at 0.95 when mask takes over
              top: 'calc(50% - 116px)',
              left: '50%',
              translateX: '-50%',
              letterSpacing: '48px',
              paddingLeft: '48px',
              zIndex: 100,
              transformOrigin: 'center center',
            }}
          >
            TEAM
          </motion.p>
        )}
      </div>

      {/* Mobile Content */}
      <div className="block md:hidden w-full h-full">
        {/* Mobile Navigation - Removed, using global nav from App.tsx */}
        <div className="relative w-full h-full">
          {/* REVIEWS Text - Mobile styling */}
          <motion.p
            className="absolute font-['Lato:Bold',sans-serif] leading-[normal] left-1/2 not-italic text-[56px] text-center text-nowrap top-[calc(50%-33px)] tracking-[16px] translate-x-[-50%] uppercase whitespace-pre"
            style={{
              color: isModal ? '#294150' : (textColorMobile as any),
              paddingLeft: '16px',
              marginRight: '-16px',
              zIndex: 10
            }}
          >
            Reviews
          </motion.p>

          {/* Down Arrow Button - Mobile - Bottom Center */}


          {/* Mobile Review Cards */}
          {!isModal && (
            <>
              {/* Card 1 - Top Left rotated - GOES BEYOND TOP */}
              <motion.div
                className="absolute w-[305px]"
                style={{
                  y: card1YMobile,
                  opacity: card1OpacityMobile,
                  left: '16px',
                  rotate: '353.654deg',
                  zIndex: 60
                }}
              >
                <ReviewCardMobile review='"Amazing customer service, updates every step of the way and easy to get in contact with for information if I were ever lost or confused. As a first-time buyer, I couldn’t ask for more with this team. Thankyou!"' author="~Cameron" date="October, 2025" />
              </motion.div>

              {/* Card 2 - Left rotated - GOES BEYOND TOP */}
              <motion.div
                className="absolute w-[305px]"
                style={{
                  y: card2YMobile,
                  opacity: card2OpacityMobile,
                  left: '32px',
                  rotate: '353.654deg',
                  zIndex: 60
                }}
              >
                <ReviewCardMobile animClass="float-card-b" review='"Gemma and Nick were both so helpful, not only with the mortgage process but also during the house-buying process from start to completion and beyond. HIGHLY recommend!!"' author="~Amber" date="September, 2025" />
              </motion.div>

              {/* Card 5 - Left Center - STAYS VISIBLE */}
              <motion.div
                className="absolute w-[305px]"
                style={{
                  y: card5YMobile,
                  opacity: card5OpacityMobile,
                  left: '24px',
                  rotate: '353.654deg',
                  zIndex: 60
                }}
              >
                <ReviewCardMobile animClass="float-card-c" review={`"I would strongly recommend Nick if you are looking to secure a mortgage or remortgage. He is exceptionally proactive and genuinely cares. Nick made the process of buying a house much more relaxed."`} author="~Daniel" date="August, 2025" />
              </motion.div>

              {/* Card 6 - Right Center - STAYS VISIBLE */}
              <motion.div
                className="absolute w-[305px]"
                style={{
                  y: card6YMobile,
                  opacity: card6OpacityMobile,
                  right: '24px',
                  rotate: '12.845deg',
                  zIndex: 60
                }}
              >
                <ReviewCardMobile animClass="float-card-d" review='"Nick was the most amazing person through my mortgage application process. I had already had an application denied with another company and Nick reassured me and worked so hard just for me to be living in my dream property now. I would recommend Jigsaw Financial to anyone after the 10/10 experience I have received. Thank you again to both Nick and Gemma for making the most stressful time in my life just that bit easier."' author="~Jess" date="December, 2025" />
              </motion.div>

              {/* Card 7 - Center - STAYS VISIBLE */}
              <motion.div
                className="absolute w-[305px]"
                style={{
                  y: card7YMobile,
                  opacity: card7OpacityMobile,
                  left: 'calc(50% - 152.5px)',  // Center the 305px card
                  rotate: '353.654deg',
                  zIndex: 60
                }}
              >
                <ReviewCardMobile animClass="float-card-e" review={`"Absolutely fantastic company! We can't thank Nick and Team enough for all they have done for us, from our first mortgage to our remortgage.
Very thorough and quick to reply! Would highly recommend!"`} author="~Rebecca" date="January, 2026" />
              </motion.div>
            </>
          )}

          {/* TEAM Text - Mobile - Slides in from right, then fades out before mask takes over */}
          {!isModal && false && ( // DISABLED - using mask text animation instead
            <motion.p
              className="absolute font-['Lato:Bold',sans-serif] leading-[normal] not-italic text-center text-nowrap uppercase text-[#294150]"
              style={{
                fontSize: '56px',
                x: teamXMobile,
                scale: teamScale,
                opacity: useTransform(scrollYProgress, [0.80, 0.88, 0.92, 0.94], [0, 1, 1, 0]), // Slower slide-in (0.80-0.88), holds until 0.92, fades out by 0.94
                top: 'calc(50% - 28px)',
                left: '50%',
                translateX: '-50%',
                letterSpacing: '16px',
                paddingLeft: '16px',
                zIndex: 100,
                transformOrigin: 'center center'
              }}
            >
              TEAM
            </motion.p>
          )}
        </div>
      </div>
    </>
  );

  // Render as modal or regular section
  if (isModal) {
    return (
      <motion.div
        ref={containerRef}
        className="fixed inset-0 z-[200] bg-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onWheel={handleWheel}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-white"
      style={{
        minHeight: isMobile ? '500vh' : `${viewportHeight * 4}px`,
        marginTop: '0vh',
        pointerEvents: (aboutUsScrollProgress && aboutUsScrollProgress >= 0.72 && aboutUsScrollProgress < 0.98) || (processScrollProgress && processScrollProgress >= 0.05) ? 'none' : 'auto',
        opacity: reviewsSectionOpacity,
        zIndex: (scrollProgress >= 0.82 || reviewsSectionOpacity <= 0.5) ? 50 : 96,
        visibility: reviewsSectionOpacity <= 0.01 ? 'hidden' : 'visible',
        touchAction: 'pan-y', // Enable vertical touch scrolling
        WebkitOverflowScrolling: 'touch' // Smooth scrolling on iOS
      } as React.CSSProperties}
    >
      <div
        className="sticky top-0 overflow-hidden bg-white"
        style={{
          height: window.innerWidth > 1920 ? `${window.innerHeight / (window.innerWidth / 1920)}px` : '100vh',
          pointerEvents: (aboutUsScrollProgress && aboutUsScrollProgress >= 0.72 && aboutUsScrollProgress < 0.98) || (processScrollProgress && processScrollProgress >= 0.05) ? 'none' : 'auto',
          zIndex: 20,
          opacity: reviewsSectionOpacity,
          touchAction: 'pan-y', // Enable vertical touch scrolling
          WebkitOverflowScrolling: 'touch' // Smooth scrolling on iOS
        } as React.CSSProperties}
      >
        {content}
      </div>
    </div>
  );
}