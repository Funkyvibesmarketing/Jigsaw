import { motion, useScroll, useTransform, MotionValue, useMotionValue } from "motion/react";
import { useRef, useEffect, useState } from "react";
import Process1stStep from "../imports/Process1stStep";
import Process2ndStep from "../imports/Process2ndStep";
import Process3rdStep from "../imports/Process3rdStep";
import cursorSvgPaths from "../imports/svg-3ga094bafp";

interface ProcessProps {
  onScrollProgress?: (progress: number) => void;
  onReady?: () => void;
}

// Bottom progress bar component - always visible
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
  const [dotPosition, setDotPosition] = useState(-7);
  const [dotVisible, setDotVisible] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  
  // State to track actual bar opacity values
  const [barOpacityValues, setBarOpacityValues] = useState<number[]>(Array(29).fill(1)); // Always 1
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
      // All bars always have opacity 1 (always visible)
      setBarOpacityValues(Array(29).fill(1));
      
      // Update dot position - NO SLIDING, just jump to positions
      if (progress < 0.18) {
        setDotVisible(false);
      } else if (progress < 0.40) {
        // Step 2: Dot appears at bar 0
        setDotVisible(true);
        setDotPosition(-7);
      } else if (progress < 0.65) {
        // Step 3: Dot appears at bar 14
        setDotVisible(true);
        setDotPosition(526);
      } else {
        // Step 4: Dot appears at bar 28
        setDotVisible(true);
        setDotPosition(1060);
      }
    });
    
    return () => unsubscribe();
  }, [currentStep, step2BarOpacities, step3BarOpacities, step4BarOpacities]);

  const bars = [
    { bg: "rgba(255,255,255,0.72)", height: "76px" }, // Bar 0
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 1
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 2
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 3
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 4
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 5
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 6
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 7
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 8
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 9
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 10
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 11
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 12
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 13
    { bg: "rgba(255,255,255,0.72)", height: "76px" }, // Bar 14
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 15
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 16
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 17
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 18
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 19
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 20
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 21
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 22
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 23
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 24
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 25
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 26
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 27
    { bg: "rgba(255,255,255,0.72)", height: "76px" }, // Bar 28
  ];

  return (
    <div className="absolute bottom-0 h-[104px] left-[calc(50%+0.5px)] translate-x-[-50%] w-[1069px]">
      {/* Progress bars */}
      <div className="absolute content-stretch flex items-end justify-between left-1/2 top-[28px] translate-x-[-50%] w-[1069px]">
        {bars.map((bar, index) => (
          <div
            key={index}
            className="rounded-[32px] shrink-0 w-[4px]"
            style={{
              backgroundColor: barColors[index],
              height: bar.height,
              opacity: barOpacityValues[index]
            }}
          />
        ))}
      </div>
      
      {/* Inactive low-opacity dots for all long bars (0, 14, 28) */}
      {/* Dot at Bar 0 - Hidden when active dot is at Bar 0 */}
      <div 
        className="absolute size-[17px] top-0"
        style={{
          left: -7,
          opacity: (dotVisible && dotPosition >= -7 && dotPosition < 270) ? 0 : 1
        }}
      >
        <div className="bg-[rgba(255,255,255,0.22)] rounded-[8.5px] size-full" />
      </div>
      
      {/* Dot at Bar 14 - Hidden when active dot is at Bar 14 */}
      <div 
        className="absolute size-[17px] top-0"
        style={{
          left: 526,
          opacity: (dotVisible && dotPosition >= 270 && dotPosition < 793) ? 0 : 1
        }}
      >
        <div className="bg-[rgba(255,255,255,0.22)] rounded-[8.5px] size-full" />
      </div>
      
      {/* Dot at Bar 28 - Hidden when active dot is at Bar 28 */}
      <div 
        className="absolute size-[17px] top-0"
        style={{
          left: 1060,
          opacity: (dotVisible && dotPosition >= 793) ? 0 : 1
        }}
      >
        <div className="bg-[rgba(255,255,255,0.22)] rounded-[8.5px] size-full" />
      </div>
      
      {/* Active/Moving dot - High opacity */}
      <div 
        className="absolute size-[17px] top-0"
        style={{
          left: dotPosition,
          opacity: dotVisible ? 1 : 0
        }}
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
          <g id="Frame 1000003013">
            <rect fill="white" fillOpacity="0.22" height="17" rx="8.5" width="17" />
            <circle cx="8.5" cy="8.5" fill="white" fillOpacity="0.72" id="Ellipse 30" r="2.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default function Process({ onScrollProgress, onReady }: ProcessProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Custom cursor tracking for desktop
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  
  const zoomFactor = window.innerWidth > 1920 ? (window.innerWidth / 1920) : 1;
  const viewportHeight = window.innerHeight / zoomFactor;

  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const total = rect.height + viewportHeight;
      const current = viewportHeight - rect.top;
      const progress = total <= 0 ? 0 : Math.min(1, Math.max(0, current / total));
      
      scrollYProgress.set(progress);
      onScrollProgress?.(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [onScrollProgress, viewportHeight]);

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

  // Mouse tracking effect for custom cursor (desktop only)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && window.innerWidth >= 768) {
        const rect = containerRef.current.getBoundingClientRect();
        // Check if mouse is within the Process section
        if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
          const zoomFactor = window.innerWidth > 1920 ? (window.innerWidth / 1920) : 1;
          setCursorPosition({ x: e.clientX / zoomFactor, y: e.clientY / zoomFactor });
          setShowCursor(true);
        } else {
          setShowCursor(false);
        }
      }
    };

    const handleMouseLeave = () => {
      setShowCursor(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    if (containerRef.current) {
      containerRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (containerRef.current) {
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Dynamic z-index: Start at 90 (below Team's 95), raise to 100 when Team has slid up
  const [zIndex, setZIndex] = useState(90);
  
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Keep Process at z-90 until scroll progress > 0.15 (when Team has fully slid up)
      // Then raise to z-100 to be on top
      setZIndex(latest > 0.15 ? 100 : 90);
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Container-level opacity to completely hide Process until it starts
  const containerOpacity = useTransform(scrollYProgress, [0, 0.01], [0, 1]);
  
  // Container visibility - keep it hidden until scroll starts
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setIsVisible(latest > 0);
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);
  
  // Step 2 (now Step 1): "Understand your problem" - Visible immediately (0 - 0.40)
  const step2SlideX = useTransform(scrollYProgress, 
    [0, 0, 0.30, 0.40], 
    ["0vw", "0vw", "0vw", "-100vw"]
  );
  
  // Step 2: Icon and text are fully visible immediately
  const step2IconSlideX = useTransform(scrollYProgress, [0, 0], [0, 0]);
  const step2IconOpacity = useTransform(scrollYProgress, [0, 0.02], [1, 1]);
  
  const step2TextSlideX = useTransform(scrollYProgress, [0, 0], [0, 0]);
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
  
  // Step 3: Icon animations (relative to step container)
  const step3IconSlideX = useTransform(scrollYProgress, [0.30, 0.40], [300, 0]);
  const step3IconScale = useTransform(scrollYProgress, [0.30, 0.37], [0.8, 1]);
  const step3IconOpacity = useTransform(scrollYProgress, [0.30, 0.37], [0, 1]);
  
  // Step 3: Text animations (relative to step container)
  const step3TextSlideX = useTransform(scrollYProgress, [0.31, 0.40], [200, 0]);
  const step3TextOpacity = useTransform(scrollYProgress, [0.31, 0.40], [0, 1]);
  
  // Step 3 (previously Step 3): Slides from left (-100vw) to center (0), then to left (-100vw)
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
  
  // Step 4 (previously Step 4): Slides from right (100vw) to center (0) and stays there
  const step4SlideX = useTransform(scrollYProgress, 
    [0.55, 0.65, 1.0], 
    ["100vw", "0vw", "0vw"]
  );
  
  // Step 4: Icon animations (relative to step container)
  const step4IconSlideX = useTransform(scrollYProgress, [0.55, 0.65], [300, 0]);
  const step4IconScale = useTransform(scrollYProgress, [0.55, 0.62], [0.8, 1]);
  const step4IconOpacity = useTransform(scrollYProgress, [0.55, 0.62], [0, 1]);
  
  // Step 4: Text animations (relative to step container)
  const step4TextSlideX = useTransform(scrollYProgress, [0.56, 0.65], [200, 0]);
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
      className="relative w-full bg-[#2c4657] md:cursor-none"
      style={{
        marginTop: `${viewportHeight * 0.5}px`,
        height: `${viewportHeight * 3}px`,
        zIndex
      } as React.CSSProperties}
    >
      {/* Custom Cursor - Desktop Only */}
      {showCursor && (
        <div 
          className="fixed pointer-events-none z-[9999] hidden md:block"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="size-[48px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
              <g id="Frame 1000002968">
                <rect fill="#2EC4B6" fillOpacity="0.1" height="48" rx="24" width="48" />
                <path d={cursorSvgPaths.p38113d00} fill="white" id="Vector" />
                <path d={cursorSvgPaths.p10586800} fill="white" id="Vector_2" />
              </g>
            </svg>
          </div>
        </div>
      )}

      {/* Sticky container for all content AND progress bar */}
      <div 
        className="sticky top-0 w-full" 
        style={{ 
          height: `${viewportHeight}px`,
          opacity: containerOpacity,
          visibility: isVisible ? 'visible' : 'hidden',
          pointerEvents: isVisible ? 'auto' : 'none'
        } as React.CSSProperties}
      >
        {/* Background cover extending above viewport to cover gap when Team slides up */}
        <div className="absolute left-0 right-0 bottom-0 bg-[#2c4657]" style={{ top: `-${viewportHeight}px` }} />
        
        {/* Scaled content wrapper - Desktop only */}
        <div className="absolute inset-0 md:scale-[0.85] md:origin-center" style={{ transform: `translateY(${viewportHeight * 0.05}px)` }}>
          {/* "OUR PROCESS" Title - Desktop Only */}
          <div className="hidden md:block absolute top-[-50px] left-1/2 -translate-x-1/2 pointer-events-none z-[5]">
            <p 
              className="font-['Lato',sans-serif] text-white uppercase text-center text-nowrap"
              style={{
                opacity: 0.2,
                fontSize: '140px',
                fontWeight: 400,
                lineHeight: 'normal'
              }}
            >
              OUR PROCESS
            </p>
          </div>
          
          {/* SLIDER CONTAINER - Separate container for sliding content */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Content wrapper - no more slide animation needed */}
            <div className="absolute inset-0 w-full h-full">
              {/* Horizontal Slider Container for Steps 2, 3, 4 */}
              <div className="absolute inset-0">
                {/* Step 2: "Understand your problem" - Starts visible immediately */}
                <motion.div
                  className="absolute inset-0"
                  style={{ x: step2SlideX }}
                >
                  <Process1stStep 
                    iconSlideX={step2IconSlideX}
                    iconOpacity={step2IconOpacity}
                    textSlideX={step2TextSlideX}
                    textOpacity={step2TextOpacity}
                  />
                </motion.div>

                {/* Step 3: Research for best solution */}
                <motion.div
                  className="absolute inset-0"
                  style={{ x: step3SlideX }}
                >
                  <Process2ndStep 
                    iconSlideX={step3IconSlideX}
                    iconScale={step3IconScale}
                    iconOpacity={step3IconOpacity}
                    textSlideX={step3TextSlideX}
                    textOpacity={step3TextOpacity}
                  />
                </motion.div>

                {/* Step 4: Taking your stress away - Final step */}
                <motion.div
                  className="absolute inset-0"
                  style={{ x: step4SlideX }}
                >
                  <Process3rdStep 
                    iconSlideX={step4IconSlideX}
                    iconScale={step4IconScale}
                    iconOpacity={step4IconOpacity}
                    textSlideX={step4TextSlideX}
                    textOpacity={step4TextOpacity}
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* PROGRESS BAR CONTAINER - Completely separate, no overflow clipping, no transforms */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-10 md:mb-[-25px]">
            <BottomProgressBar 
              step2BarOpacities={step2BarOpacities}
              step3BarOpacities={step3BarOpacities}
              step4BarOpacities={step4BarOpacities}
              currentStep={scrollYProgress}
            />
          </div>
        </div>
      </div>
    </div>
  );
}