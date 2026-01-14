import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { useRef, useEffect, useState } from "react";
import svgPaths from "../imports/svg-nqtx3ye8rh";
import svgPathsStep3 from "../imports/svg-euomkbalfx";
import svgPathsStep4 from "../imports/svg-r0vybjpidk";

interface ProcessMobileProps {
  onScrollProgress?: (progress: number) => void;
  teamScrollProgress: number;
}

// Handshake Icon Component (Step 2)
function HandshakeIcon() {
  return (
    <div className="relative w-[29.4px] h-[29.4px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43 49">
        <path d={svgPaths.p292fdc00} fill="#2C4656" />
      </svg>
    </div>
  );
}

// Research Icon Component (Step 3)
function ResearchIcon() {
  return (
    <div className="relative w-[29.4px] h-[29.4px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 29">
        <path d={svgPathsStep3.p2c0957c0} fill="#2C4657" />
        <path d={svgPathsStep3.p3130cc00} fill="#2C4657" />
        <path d={svgPathsStep3.p3b3daf80} fill="#2C4657" />
      </svg>
    </div>
  );
}

// Brain Icon Component (Step 4)
function BrainIcon() {
  return (
    <div className="relative w-[29.4px] h-[29.4px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 30">
        <path d={svgPathsStep4.p26f7ba00} fill="#2C4657" />
        <path d={svgPathsStep4.p3a59bab0} fill="#2C4657" />
      </svg>
    </div>
  );
}

// Bottom progress bar component - matches desktop functionality
function BottomProgressBar({ 
  step2BarOpacities, 
  step3BarOpacities, 
  step4BarOpacities,
  currentStep 
}: { 
  step2BarOpacities: MotionValue<number>[];
  step3BarOpacities: MotionValue<number>[];
  step4BarOpacities: MotionValue<number>[];
  currentStep: MotionValue<number>;
}) {
  // State for automatic dot position animation
  const [dotPosition, setDotPosition] = useState(0);
  const [dotVisible, setDotVisible] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  
  // State to track which bars should be bright vs dim
  const [barColors, setBarColors] = useState<string[]>(Array(29).fill("rgba(255,255,255,0.12)"));

  // Watch scroll progress and update dot position + bar colors
  useEffect(() => {
    const unsubscribe = currentStep.on("change", (progress) => {
      setCurrentProgress(progress);
      
      // Update bar colors based on current progress - animate color progressively
      const newColors = Array(29).fill(0).map((_, index) => {
        // Calculate which bar should be bright based on scroll progress
        let dotBarIndex = -1;
        
        if (progress >= 0.18 && progress < 0.30) {
          // Step 2: Only bar 0 is bright
          dotBarIndex = 0;
        } else if (progress >= 0.30 && progress < 0.40) {
          // Transition 2→3: Bars progressively light up from 0 to 14
          const transitionProgress = (progress - 0.30) / (0.40 - 0.30);
          dotBarIndex = Math.floor(transitionProgress * 14);
        } else if (progress >= 0.40 && progress < 0.55) {
          // Step 3: Bars 0-14 are bright
          dotBarIndex = 14;
        } else if (progress >= 0.55 && progress < 0.65) {
          // Transition 3→4: Bars progressively light up from 14 to 28
          const transitionProgress = (progress - 0.55) / (0.65 - 0.55);
          dotBarIndex = 14 + Math.floor(transitionProgress * 14);
        } else if (progress >= 0.65) {
          // Step 4: All bars 0-28 are bright
          dotBarIndex = 28;
        }
        
        // Bars should only be bright if they are at or before the calculated position
        if (index <= dotBarIndex) {
          return "rgba(255,255,255,0.72)"; // Full brightness
        } else {
          return "rgba(255,255,255,0.12)"; // Dim
        }
      });
      
      setBarColors(newColors);
      
      // Update dot position - jumps to positions (adapted for mobile width)
      // Mobile width is ~90% of 382px max = ~344px
      // Desktop: -7, 526, 1060 out of 1069px total
      // Mobile ratio: 344px total width
      const mobileBar0 = 0;
      const mobileBar14 = 172; // ~50% of width
      const mobileBar28 = 344; // ~100% of width
      
      if (progress < 0.18) {
        setDotVisible(false);
      } else if (progress < 0.40) {
        // Step 2: Dot appears at bar 0
        setDotVisible(true);
        setDotPosition(mobileBar0);
      } else if (progress < 0.65) {
        // Step 3: Dot appears at bar 14
        setDotVisible(true);
        setDotPosition(mobileBar14);
      } else {
        // Step 4: Dot appears at bar 28
        setDotVisible(true);
        setDotPosition(mobileBar28);
      }
    });
    
    return () => unsubscribe();
  }, [currentStep, step2BarOpacities, step3BarOpacities, step4BarOpacities]);

  const bars = [
    { bg: "rgba(255,255,255,0.72)", height: "60px" }, // Bar 0
    { bg: "rgba(255,255,255,0.72)", height: "31px" }, // Bar 1
    { bg: "rgba(255,255,255,0.72)", height: "31px" }, // Bar 2
    { bg: "rgba(255,255,255,0.72)", height: "31px" }, // Bar 3
    { bg: "rgba(255,255,255,0.72)", height: "31px" }, // Bar 4
    { bg: "rgba(255,255,255,0.72)", height: "31px" }, // Bar 5
    { bg: "rgba(255,255,255,0.72)", height: "31px" }, // Bar 6
    { bg: "rgba(255,255,255,0.72)", height: "31px" }, // Bar 7
    { bg: "rgba(255,255,255,0.72)", height: "31px" }, // Bar 8
    { bg: "rgba(255,255,255,0.72)", height: "31px" }, // Bar 9
    { bg: "rgba(255,255,255,0.72)", height: "31px" }, // Bar 10
    { bg: "rgba(255,255,255,0.72)", height: "31px" }, // Bar 11
    { bg: "rgba(255,255,255,0.72)", height: "31px" }, // Bar 12
    { bg: "rgba(255,255,255,0.72)", height: "31px" }, // Bar 13
    { bg: "rgba(255,255,255,0.72)", height: "60px" }, // Bar 14
    { bg: "rgba(255,255,255,0.72)", height: "31px" }, // Bar 15
    { bg: "rgba(255,255,255,0.72)", height: "31px" }, // Bar 16
    { bg: "rgba(255,255,255,0.72)", height: "31px" }, // Bar 17
    { bg: "rgba(255,255,255,0.72)", height: "31px" }, // Bar 18
    { bg: "rgba(255,255,255,0.72)", height: "31px" }, // Bar 19
    { bg: "rgba(255,255,255,0.72)", height: "31px" }, // Bar 20
    { bg: "rgba(255,255,255,0.72)", height: "31px" }, // Bar 21
    { bg: "rgba(255,255,255,0.72)", height: "31px" }, // Bar 22
    { bg: "rgba(255,255,255,0.72)", height: "31px" }, // Bar 23
    { bg: "rgba(255,255,255,0.72)", height: "31px" }, // Bar 24
    { bg: "rgba(255,255,255,0.72)", height: "31px" }, // Bar 25
    { bg: "rgba(255,255,255,0.72)", height: "31px" }, // Bar 26
    { bg: "rgba(255,255,255,0.72)", height: "31px" }, // Bar 27
    { bg: "rgba(255,255,255,0.72)", height: "60px" }, // Bar 28
  ];

  return (
    <div className="absolute h-[76px] left-1/2 -translate-x-1/2 bottom-0 w-[90%] max-w-[382px]">
      {/* Progress bars */}
      <div className="absolute content-stretch flex h-[60px] items-end justify-between left-1/2 -translate-x-1/2 top-[16px] w-full">
        {bars.map((bar, index) => (
          <div
            key={index}
            className="rounded-[32px] shrink-0 w-[2px]"
            style={{
              backgroundColor: barColors[index],
              height: bar.height,
              opacity: 1
            }}
          />
        ))}
      </div>
      
      {/* Milestone dots - show as active when reached/passed */}
      {/* Dot at Bar 0 */}
      <div 
        className="absolute size-[12px] top-0"
        style={{
          left: 0,
          transform: 'translateX(-5px)',
          opacity: dotVisible ? 1 : 0
        }}
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
          <rect fill="white" fillOpacity="0.22" height="12" rx="6" width="12" />
          {/* Show center dot if this milestone has been reached */}
          {dotPosition >= 0 && <circle cx="6" cy="6" fill="white" fillOpacity="0.72" r="1.76471" />}
        </svg>
      </div>
      
      {/* Dot at Bar 14 */}
      <div 
        className="absolute size-[12px] top-0"
        style={{
          left: '50%',
          transform: 'translateX(-6px)',
          opacity: dotVisible ? 1 : 0
        }}
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
          <rect fill="white" fillOpacity="0.22" height="12" rx="6" width="12" />
          {/* Show center dot if this milestone has been reached */}
          {dotPosition >= 172 && <circle cx="6" cy="6" fill="white" fillOpacity="0.72" r="1.76471" />}
        </svg>
      </div>
      
      {/* Dot at Bar 28 */}
      <div 
        className="absolute size-[12px] top-0"
        style={{
          left: '100%',
          transform: 'translateX(-7px)',
          opacity: dotVisible ? 1 : 0
        }}
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
          <rect fill="white" fillOpacity="0.22" height="12" rx="6" width="12" />
          {/* Show center dot if this milestone has been reached */}
          {dotPosition >= 344 && <circle cx="6" cy="6" fill="white" fillOpacity="0.72" r="1.76471" />}
        </svg>
      </div>
    </div>
  );
}

export default function ProcessMobile({ onScrollProgress, teamScrollProgress }: ProcessMobileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      onScrollProgress?.(latest);
    });

    return () => unsubscribe();
  }, [scrollYProgress, onScrollProgress]);

  // Process section slides up from bottom (0 - 0.20)
  const processSlideY = useTransform(scrollYProgress, [0, 0.20], ["100vh", "0vh"]);

  // Step 2 (Step 1): "Understand your problem" - Visible immediately (0 - 0.40)
  const step2SlideX = useTransform(scrollYProgress, 
    [0, 0, 0.30, 0.40], 
    ["0vw", "0vw", "0vw", "-100vw"]
  );
  
  // Step 2: Icon and text are fully visible immediately
  const step2IconOpacity = useTransform(scrollYProgress, [0, 0.02], [1, 1]);
  
  const step2TextOpacity = useTransform(scrollYProgress, [0, 0.02], [1, 1]);
  
  // Step 2: Progress bar animations - only bar 0 animates (0 - 30%)
  const totalBars = 29;
  const step2BarOpacities = Array.from({ length: totalBars }, (_, i) => {
    if (i === 0) {
      // Bar 0 animates from dim to bright during Step 2
      return useTransform(scrollYProgress, [0.08, 0.18], [0, 1]);
    }
    // All other bars don't animate in this step
    return useTransform(scrollYProgress, [0, 1], [0, 0]);
  });
  
  // Step 3: Icon animations - REMOVED for mobile
  const step3IconOpacity = useTransform(scrollYProgress, [0.30, 0.37], [0, 1]);
  
  // Step 3: Text animations
  const step3TextSlideX = useTransform(scrollYProgress, [0.31, 0.40], [80, 0]);
  const step3TextOpacity = useTransform(scrollYProgress, [0.31, 0.40], [0, 1]);
  
  // Step 3: Slides from right (100vw) to center (0), then to left (-100vw)
  const step3SlideX = useTransform(scrollYProgress, 
    [0.30, 0.40, 0.55, 0.65], 
    ["100vw", "0vw", "0vw", "-100vw"]
  );
  
  // Step 3: Progress bar animations - bars 1-14 animate during dot movement (30-40%)
  const step3BarOpacities = Array.from({ length: totalBars }, (_, i) => {
    if (i === 0) {
      // Bar 0 is already bright, stays bright
      return useTransform(scrollYProgress, [0, 1], [1, 1]);
    }
    if (i >= 1 && i <= 14) {
      // Bars 1-14 animate during dot movement from bar 0 to bar 14 (30% - 40%)
      const barProgress = (i - 1) / 13; // 0 to 1 for bars 1-14 (13 intervals)
      const startProgress = 0.30 + (barProgress * (0.40 - 0.30));
      const endProgress = Math.min(startProgress + 0.015, 0.40);
      return useTransform(scrollYProgress, [startProgress, endProgress], [0, 1]);
    }
    // Bars 15-28 don't animate in this step
    return useTransform(scrollYProgress, [0, 1], [0, 0]);
  });
  
  // Step 4: Slides from right (100vw) to center (0) and stays there
  const step4SlideX = useTransform(scrollYProgress, 
    [0.55, 0.65, 1.0], 
    ["100vw", "0vw", "0vw"]
  );
  
  // Step 4: Icon animations - REMOVED for mobile
  const step4IconOpacity = useTransform(scrollYProgress, [0.55, 0.62], [0, 1]);
  
  // Step 4: Text animations
  const step4TextSlideX = useTransform(scrollYProgress, [0.56, 0.65], [80, 0]);
  const step4TextOpacity = useTransform(scrollYProgress, [0.56, 0.65], [0, 1]);
  
  // Step 4: Progress bar animations - bars 15-28 animate during dot movement (55-65%)
  const step4BarOpacities = Array.from({ length: totalBars }, (_, i) => {
    if (i <= 14) {
      // Bars 0-14 are already bright, stay bright
      return useTransform(scrollYProgress, [0, 1], [1, 1]);
    }
    // Bars 15-28 animate during dot movement from bar 14 to bar 28 (55% - 65%)
    const barProgress = (i - 14) / 14; // 0 to 1 (bar 15 = 0, bar 28 = 1)
    const startProgress = 0.55 + (barProgress * (0.65 - 0.55));
    const endProgress = Math.min(startProgress + 0.015, 0.65);
    return useTransform(scrollYProgress, [startProgress, endProgress], [0, 1]);
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#2c4657]"
      style={{ 
        minHeight: "200vh",
        touchAction: 'pan-y',
        WebkitOverflowScrolling: 'touch',
        zIndex: 100 // Higher z-index to appear above Team section
      } as React.CSSProperties}
    >
      {/* Sticky container */}
      <motion.div 
        className="sticky top-0 h-screen w-full overflow-hidden z-[100]"
        style={{ y: processSlideY }}
      >
        {/* Background */}
        <div className="absolute inset-0 w-full h-full bg-[#2c4657]" />
        
        {/* "OUR PROCESS" Title */}
        <div className="absolute top-[80px] left-1/2 -translate-x-1/2 pointer-events-none z-[5]">
          <p 
            className="font-['Lato',sans-serif] text-white uppercase text-center text-nowrap"
            style={{
              opacity: 0.2,
              fontSize: '48px',
              fontWeight: 400,
              lineHeight: 'normal'
            }}
          >
            OUR PROCESS
          </p>
        </div>
        
        {/* SLIDER CONTAINER - Separate container for sliding content */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Horizontal Slider Container for Steps 2, 3, 4 */}
          <div className="absolute inset-0">
            {/* Step 2: "Understand your problem" - Starts visible immediately */}
            <motion.div
              className="absolute inset-0"
              style={{ x: step2SlideX }}
            >
              {/* Outer circle - 120px with 10% opacity - centered */}
              <div className="absolute left-1/2 size-[120px] top-[337px] translate-x-[-50%] translate-y-[-50%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" fill="white" fillOpacity="0.1" r="60" />
                </svg>
              </div>

              {/* Inner circle - 72px solid white - centered within outer circle */}
              <div className="absolute left-1/2 size-[72px] top-[337px] translate-x-[-50%] translate-y-[-50%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
                  <circle cx="36" cy="36" fill="white" r="36" />
                </svg>
              </div>

              {/* Icon - centered within circles */}
              <motion.div 
                className="absolute left-1/2 size-[29.4px] top-[337px] translate-x-[-50%] translate-y-[-50%]"
                style={{ 
                  opacity: step2IconOpacity
                }}
              >
                <HandshakeIcon />
              </motion.div>

              {/* Text content */}
              <motion.div
                className="w-full px-4"
                style={{ 
                  opacity: step2TextOpacity
                }}
              >
                <h2 className="absolute font-['Lato:SemiBold',sans-serif] leading-[36px] left-1/2 not-italic text-[24px] text-center text-white top-[465px] translate-x-[-50%] max-w-[90%] w-[362px]">
                  1. Understand your problem
                </h2>
                <p className="absolute font-['Lato:Light',sans-serif] leading-[28px] left-1/2 not-italic opacity-70 text-[18px] text-center text-white top-[528px] translate-x-[-50%] w-[90%] max-w-[292px]">
                  Life's busy, but we focus on your future—first home.
                </p>
              </motion.div>
            </motion.div>

            {/* Step 3: Research for best solution */}
            <motion.div
              className="absolute inset-0"
              style={{ x: step3SlideX }}
            >
              {/* Outer circle - 120px with 10% opacity - centered */}
              <div className="absolute left-1/2 size-[120px] top-[337px] translate-x-[-50%] translate-y-[-50%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" fill="white" fillOpacity="0.1" r="60" />
                </svg>
              </div>

              {/* Inner circle - 72px solid white - centered within outer circle */}
              <div className="absolute left-1/2 size-[72px] top-[337px] translate-x-[-50%] translate-y-[-50%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
                  <circle cx="36" cy="36" fill="white" r="36" />
                </svg>
              </div>

              {/* Icon - with slide animation */}
              <motion.div 
                className="absolute left-1/2 size-[29.4px] top-[337px] translate-x-[-50%] translate-y-[-50%]"
                style={{ 
                  opacity: step3IconOpacity
                }}
              >
                <ResearchIcon />
              </motion.div>

              {/* Text content - with slide animation */}
              <motion.div
                className="w-full px-4"
                style={{ 
                  x: step3TextSlideX,
                  opacity: step3TextOpacity
                }}
              >
                <h2 className="absolute font-['Lato:SemiBold',sans-serif] leading-[36px] left-1/2 not-italic text-[24px] text-center text-white top-[465px] translate-x-[-50%] max-w-[90%] w-[362px]">
                  2. Research for best solution
                </h2>
                <p className="absolute font-['Lato:Light',sans-serif] leading-[28px] left-1/2 not-italic opacity-70 text-[18px] text-center text-white top-[528px] translate-x-[-50%] w-[90%] max-w-[292px]">
                  Life's busy, but we focus on your future—first home.
                </p>
              </motion.div>
            </motion.div>

            {/* Step 4: Taking your stress away - Final step */}
            <motion.div
              className="absolute inset-0"
              style={{ x: step4SlideX }}
            >
              {/* Outer circle - 120px with 10% opacity - centered */}
              <div className="absolute left-1/2 size-[120px] top-[337px] translate-x-[-50%] translate-y-[-50%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" fill="white" fillOpacity="0.1" r="60" />
                </svg>
              </div>

              {/* Inner circle - 72px solid white - centered within outer circle */}
              <div className="absolute left-1/2 size-[72px] top-[337px] translate-x-[-50%] translate-y-[-50%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
                  <circle cx="36" cy="36" fill="white" r="36" />
                </svg>
              </div>

              {/* Icon - with slide animation */}
              <motion.div 
                className="absolute left-1/2 size-[29.4px] top-[337px] translate-x-[-50%] translate-y-[-50%]"
                style={{ 
                  opacity: step4IconOpacity
                }}
              >
                <BrainIcon />
              </motion.div>

              {/* Text content - with slide animation */}
              <motion.div
                className="w-full px-4"
                style={{ 
                  x: step4TextSlideX,
                  opacity: step4TextOpacity
                }}
              >
                <h2 className="absolute font-['Lato:SemiBold',sans-serif] leading-[36px] left-1/2 not-italic text-[24px] text-center text-white top-[465px] translate-x-[-50%] max-w-[90%] w-[362px]">
                  3. Taking your stress away
                </h2>
                <p className="absolute font-['Lato:Light',sans-serif] leading-[28px] left-1/2 not-italic opacity-70 text-[18px] text-center text-white top-[528px] translate-x-[-50%] w-[90%] max-w-[292px]">
                  Life's busy, but we focus on your future—first home.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* PROGRESS BAR CONTAINER - Completely separate, always visible */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-10">
          <BottomProgressBar 
            step2BarOpacities={step2BarOpacities}
            step3BarOpacities={step3BarOpacities}
            step4BarOpacities={step4BarOpacities}
            currentStep={scrollYProgress}
          />
        </div>
      </motion.div>
    </div>
  );
}