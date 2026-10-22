import { motion, useScroll, useTransform, MotionValue, useMotionValue, animate } from "motion/react";
import { useRef, useEffect, useState } from "react";
import Process1stStep from "../imports/Process1stStep";
import Process2ndStep from "../imports/Process2ndStep";
import Process3rdStep from "../imports/Process3rdStep";
import cursorSvgPaths from "../imports/svg-3ga094bafp";
import { processProgress } from "../utils/progressStore";
import { RevealText } from "./RevealText";

// Values the rest of the page compares processScrollProgress against. App is only told when one
// is crossed, instead of re-rendering the whole page on every scroll frame.
const PARENT_THRESHOLDS = [0.01, 0.05, 0.1, 0.15];
const parentBucket = (p: number) => (p <= 0 ? -1 : PARENT_THRESHOLDS.filter((t) => p >= t).length);

// ---- Section entry choreography (scroll-driven; the sticky view locks in at ~0.25) ----
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeOutBack = (t: number) => {
  const c1 = 1.4;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
// 0 → 1 between two progress values, eased
const phase = (p: number, from: number, to: number, ease = easeOutCubic) => ease(clamp01((p - from) / (to - from)));

const TITLE_TEXT = 'OUR PROCESS';
const TITLE_FROM = 0.05;
const TITLE_TO = 0.24;
const TITLE_STAGGER = 0.45; // share of the title phase spread across the letters

// One letter of "OUR PROCESS": starts spread out from the centre, low and blurred, then
// rises and snaps into place - letters arrive one after another, left to right
function TitleLetter({ char, index, count, progress }: { char: string; index: number; count: number; progress: MotionValue<number> }) {
  const local = (p: number) => {
    const t = clamp01((p - TITLE_FROM) / (TITLE_TO - TITLE_FROM));
    const start = (index / Math.max(1, count - 1)) * TITLE_STAGGER;
    return easeOutCubic(clamp01((t - start) / (1 - TITLE_STAGGER)));
  };
  const spread = (index - (count - 1) / 2) * 38;
  const x = useTransform(progress, (p) => spread * (1 - local(p)));
  const y = useTransform(progress, (p) => 90 * (1 - local(p)));
  const opacity = useTransform(progress, (p) => local(p));
  const filter = useTransform(progress, (p) => {
    const b = 14 * (1 - local(p));
    return b < 0.2 ? 'none' : `blur(${b.toFixed(1)}px)`;
  });
  return (
    <motion.span className="inline-block" style={{ x, y, opacity, filter, whiteSpace: 'pre' }}>
      {char}
    </motion.span>
  );
}

// ---- Step changes (1 -> 2 at 0.30-0.40, 2 -> 3 at 0.55-0.65; same timing as the progress bar dot) ----
// Step changes are TRIGGERED by scroll (not scrubbed), then play out on their own time, so a
// mouse-wheel notch never leaves a half-finished change on screen. Everything below runs off a
// "step position" value that animates 0 -> 1 -> 2 (step 1 -> 2 -> 3), and back when scrolling up.
// Within each change: old text lifts out, then the panels slide right-to-left, then new text rises in.
const CHANGE_A: [number, number] = [0.22, 0.78]; // the slide, in step-position units
const CHANGE_B: [number, number] = [1.22, 1.78];
const TEXT_OUT_1: [number, number] = [0, 0.3];
const TEXT_IN_2: [number, number] = [0.68, 1];
const TEXT_OUT_2: [number, number] = [1, 1.3];
const TEXT_IN_3: [number, number] = [1.68, 2];
const STEP_CHANGE_SECONDS = 1.3; // one full change (text out + slide + text in)
// Scroll progress where each change is triggered (+/- a little hysteresis so it can't flicker)
const STEP_TRIGGERS = [0.35, 0.60];
const STEP_TRIGGER_HYSTERESIS = 0.01;

// ---- Section exit: "bars -> line -> light" ----
// The section is 0.6 viewport taller than before; that extra scroll is spent at the end, with the
// view still held in place, on the exit. Progress is remapped so every earlier timing is unchanged
// (0 -> 0.75 covers exactly the same scroll as before).
const PROCESS_HEIGHT_VH = 3.6;
const ORIGINAL_HEIGHT_VH = 3;
const EXIT_START = 0.75; // where the view used to be released
const LINE_START_SCALE = 0.003; // the white line's starting thickness, as a share of the screen height
const EXIT_END = 0.75 + 0.25 * ((PROCESS_HEIGHT_VH - ORIGINAL_HEIGHT_VH) / (PROCESS_HEIGHT_VH + 1 - ORIGINAL_HEIGHT_VH));
const easeInCubic = (t: number) => t * t * t;
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const changeT = (p: number, [from, to]: [number, number]) => clamp01((p - from) / (to - from));

type StepPose = {
  iconScale: number; iconRotate: number; iconOpacity: number; iconY: number;
  titleY: number; titleOpacity: number; descY: number; descOpacity: number;
};

// Layered on top of the original sideways slides:
// - outgoing step: icon spins away + shrinks + fades, title then description lift up and fade
// - incoming step: icon spins in with a small overshoot, title then description rise into place
//   (incoming fade/slide-in still comes from the original animation)
function stepPose(p: number, enter: [number, number] | null, leave: [number, number] | null): StepPose {
  const tin = enter ? changeT(p, enter) : 1;
  const tout = leave ? changeT(p, leave) : 0;

  const iconIn = clamp01(tin / 0.85);
  const iconOut = easeInCubic(clamp01(tout / 0.7));
  const titleIn = easeOutCubic(clamp01((tin - 0.1) / 0.8));
  const titleOut = easeInCubic(clamp01(tout / 0.6));
  const descIn = easeOutCubic(clamp01((tin - 0.25) / 0.75));
  const descOut = easeInCubic(clamp01((tout - 0.08) / 0.6));

  return {
    iconScale: (0.7 + 0.3 * easeOutBack(iconIn)) * (1 - 0.4 * iconOut),
    iconRotate: 90 * (1 - easeOutCubic(iconIn)) - 90 * iconOut,
    iconOpacity: 1 - iconOut,
    iconY: -30 * iconOut,
    titleY: 60 * (1 - titleIn) - 60 * titleOut,
    titleOpacity: 1 - titleOut,
    descY: 50 * (1 - descIn) - 50 * descOut,
    descOpacity: 1 - descOut,
  };
}

// MotionValues for one step's pose (pass the result straight to the step component)
function useStepPose(progress: MotionValue<number>, enter: [number, number] | null, leave: [number, number] | null) {
  const pose = (key: keyof StepPose) => (p: number) => stepPose(p, enter, leave)[key];
  return {
    iconScale: useTransform(progress, pose('iconScale')),
    iconRotate: useTransform(progress, pose('iconRotate')),
    iconOpacity: useTransform(progress, pose('iconOpacity')),
    iconY: useTransform(progress, pose('iconY')),
    titleY: useTransform(progress, pose('titleY')),
    titleOpacity: useTransform(progress, pose('titleOpacity')),
    descY: useTransform(progress, pose('descY')),
    descOpacity: useTransform(progress, pose('descOpacity')),
  };
}

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
  const lastParentBucketRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const total = rect.height + viewportHeight;
      const current = viewportHeight - rect.top;
      // Up to the old release point progress is exactly as before; the added exit scroll and the
      // final scroll-away share the rest (see PROCESS_HEIGHT_VH)
      const knee = ORIGINAL_HEIGHT_VH * viewportHeight;
      const progress = total <= 0
        ? 0
        : current <= knee
          ? Math.max(0, current / (knee + viewportHeight))
          : Math.min(1, EXIT_START + (1 - EXIT_START) * ((current - knee) / (total - knee)));
      
      scrollYProgress.set(progress);
      processProgress.set(progress);

      const bucket = parentBucket(progress);
      if (bucket !== lastParentBucketRef.current) {
        lastParentBucketRef.current = bucket;
        onScrollProgress?.(progress);
      }
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
  
  // Entry: icon pops (slight overshoot), ring draws, then title and description rise in
  const entryIconScale = useTransform(scrollYProgress, (p) => 0.55 + 0.45 * phase(p, 0.10, 0.22, easeOutBack));
  const entryIconY = useTransform(scrollYProgress, (p) => 60 * (1 - phase(p, 0.10, 0.22)));
  const entryTitleY = useTransform(scrollYProgress, (p) => 70 * (1 - phase(p, 0.15, 0.25)));
  const entryTitleOpacity = useTransform(scrollYProgress, (p) => phase(p, 0.15, 0.25));
  const entryDescY = useTransform(scrollYProgress, (p) => 50 * (1 - phase(p, 0.18, 0.28)));
  const entryDescOpacity = useTransform(scrollYProgress, (p) => phase(p, 0.18, 0.28));
  // Only clips sideways (the left-to-right sweep). The wrapper has no height of its own, so the
  // vertical inset must be large enough to keep the whole 104px bar row, including the 3 dots on top
  const entryBarClip = useTransform(scrollYProgress, (p) => `inset(-200px ${(100 * (1 - phase(p, 0.16, 0.28))).toFixed(2)}% -200px -20px)`);

  // Exit (view held in place): 1) "OUR PROCESS" then the step content sink toward the progress
  // bar and fade, 2) the bars collapse into one thin white line drawn across the screen,
  // 3) the line opens up into a full white screen, which hands over to the white Blogs section
  const exitT = (p: number) => clamp01((p - EXIT_START) / (EXIT_END - EXIT_START));
  const exitPhase = (p: number, from: number, to: number, ease = easeInOutCubic) => ease(clamp01((exitT(p) - from) / (to - from)));
  const exitTitleY = useTransform(scrollYProgress, (p) => 160 * exitPhase(p, 0, 0.35));
  const exitTitleOpacity = useTransform(scrollYProgress, (p) => 1 - exitPhase(p, 0, 0.3));
  const exitContentY = useTransform(scrollYProgress, (p) => 140 * exitPhase(p, 0.08, 0.45));
  const exitContentScale = useTransform(scrollYProgress, (p) => 1 - 0.12 * exitPhase(p, 0.08, 0.45));
  const exitContentOpacity = useTransform(scrollYProgress, (p) => 1 - exitPhase(p, 0.12, 0.42));
  const barScaleY = useTransform(scrollYProgress, (p) => (0.2 + 0.8 * phase(p, 0.18, 0.29)) * (1 - 0.94 * exitPhase(p, 0.3, 0.52)));
  const barOpacity = useTransform(scrollYProgress, (p) => phase(p, 0.16, 0.22) * (1 - exitPhase(p, 0.5, 0.62)));
  const lineScaleX = useTransform(scrollYProgress, (p) => exitPhase(p, 0.34, 0.6));
  const lineScaleY = useTransform(scrollYProgress, (p) => {
    const open = exitPhase(p, 0.58, 1);
    return LINE_START_SCALE + (1 - LINE_START_SCALE) * open;
  });
  const lineOpacity = useTransform(scrollYProgress, (p) => (exitT(p) > 0.34 ? 1 : 0));

  // Where the bars are on screen (the line starts there); measured, since the bar sits in a scaled wrapper
  const stickyRef = useRef<HTMLDivElement>(null);
  const barWrapRef = useRef<HTMLDivElement>(null);
  const [lineOriginY, setLineOriginY] = useState(0.93);
  useEffect(() => {
    const measure = () => {
      const sticky = stickyRef.current?.getBoundingClientRect();
      const row = barWrapRef.current?.querySelector('div.h-\\[104px\\]') as HTMLElement | null;
      if (!sticky || !row || sticky.height === 0) return;
      const r = row.getBoundingClientRect();
      // the short bars' middle
      setLineOriginY(clamp01((r.top + r.height * 0.79 - sticky.top) / sticky.height));
    };
    measure();
    const unsubscribe = scrollYProgress.on('change', (p) => {
      if (p > EXIT_START - 0.05 && p < EXIT_START) measure();
    });
    window.addEventListener('resize', measure);
    return () => {
      unsubscribe();
      window.removeEventListener('resize', measure);
    };
  }, [scrollYProgress]);

  // Animated step position (see STEP_TRIGGERS): 0 = step 1, 1 = step 2, 2 = step 3
  const stepPos = useMotionValue(0);
  useEffect(() => {
    const targetFor = (p: number, current: number) =>
      STEP_TRIGGERS.reduce((n, t, i) => {
        // above a trigger -> past that step; inside the hysteresis band keep the current side
        if (p >= t + STEP_TRIGGER_HYSTERESIS) return i + 1;
        if (p > t - STEP_TRIGGER_HYSTERESIS && current > i) return i + 1;
        return n;
      }, 0);
    let target = targetFor(scrollYProgress.get(), 0);
    stepPos.jump(target);
    let anim: ReturnType<typeof animate> | null = null;

    // Hold the page still while a change plays, so it always finishes before the section can
    // scroll away (wheel input during the change is swallowed; scrolling resumes right after)
    let lockToken = 0;
    let locked = false;
    const blockScroll = (e: Event) => {
      if (e.cancelable) e.preventDefault();
    };
    const lock = () => {
      if (locked) return;
      locked = true;
      window.dispatchEvent(new CustomEvent('lenisStop')); // also halts any smooth-scroll still in motion
      window.addEventListener('wheel', blockScroll, { passive: false });
      window.addEventListener('touchmove', blockScroll, { passive: false });
    };
    // Only hold the page for the user's own scrolling (wheel / touch / keys) - never for an
    // automatic scroll such as a menu click jumping past this section
    let lastUserInput = -Infinity;
    const markUserInput = () => {
      lastUserInput = performance.now();
    };
    window.addEventListener('wheel', markUserInput, { passive: true });
    window.addEventListener('touchmove', markUserInput, { passive: true });
    window.addEventListener('keydown', markUserInput);
    const unlock = () => {
      if (!locked) return;
      locked = false;
      window.removeEventListener('wheel', blockScroll);
      window.removeEventListener('touchmove', blockScroll);
      window.dispatchEvent(new CustomEvent('lenisStart'));
    };

    const unsubscribe = scrollYProgress.on('change', (p) => {
      const next = targetFor(p, target);
      if (next === target) return;
      target = next;
      anim?.stop();
      const token = ++lockToken;
      if (performance.now() - lastUserInput < 400) lock();
      const distance = Math.abs(next - stepPos.get());
      // linear here: each phase inside the change applies its own easing
      anim = animate(stepPos, next, { duration: STEP_CHANGE_SECONDS * Math.pow(distance, 0.7), ease: 'linear' });
      anim.then(() => {
        if (token === lockToken) unlock();
      });
    });
    return () => {
      unsubscribe();
      anim?.stop();
      unlock();
      window.removeEventListener('wheel', markUserInput);
      window.removeEventListener('touchmove', markUserInput);
      window.removeEventListener('keydown', markUserInput);
    };
  }, [scrollYProgress, stepPos]);

  // Original right-to-left slide, now driven by the step position
  const slideA = (s: number) => easeInOutCubic(changeT(s, CHANGE_A));
  const slideB = (s: number) => easeInOutCubic(changeT(s, CHANGE_B));
  const step2SlideX = useTransform(stepPos, (s) => `${-100 * slideA(s)}vw`);
  const step3SlideX = useTransform(stepPos, (s) => `${100 * (1 - slideA(s)) - 100 * slideB(s)}vw`);
  const step4SlideX = useTransform(stepPos, (s) => `${100 * (1 - slideB(s))}vw`);
  const step3IconSlideX = useTransform(stepPos, (s) => 300 * (1 - slideA(s)));
  const step3TextSlideX = useTransform(stepPos, (s) => 200 * (1 - slideA(s)));
  const step4IconSlideX = useTransform(stepPos, (s) => 300 * (1 - slideB(s)));
  const step4TextSlideX = useTransform(stepPos, (s) => 200 * (1 - slideB(s)));
  const step3IconScale = useTransform(stepPos, (s) => 0.8 + 0.2 * clamp01(slideA(s) / 0.7));
  const step3IconOpacity = useTransform(stepPos, (s) => clamp01(slideA(s) / 0.7));
  const step3TextOpacity = useTransform(stepPos, (s) => slideA(s));
  const step4IconScale = useTransform(stepPos, (s) => 0.8 + 0.2 * clamp01(slideB(s) / 0.7));
  const step4IconOpacity = useTransform(stepPos, (s) => clamp01(slideB(s) / 0.7));
  const step4TextOpacity = useTransform(stepPos, (s) => slideB(s));

  // Icon spin on top of the slide
  const pose1 = useStepPose(stepPos, null, CHANGE_A);
  const pose2 = useStepPose(stepPos, CHANGE_A, CHANGE_B);
  const pose3 = useStepPose(stepPos, CHANGE_B, null);

  // Progress bar follows the same animation: dot travels while the panels slide
  const barDriver = useTransform([scrollYProgress, stepPos], ([p, s]: number[]) => {
    if (s <= 0.001) return Math.min(p, 0.2999);
    if (s < 0.999) return 0.30 + 0.10 * slideA(s);
    if (s <= 1.001) return 0.47;
    if (s < 1.999) return 0.55 + 0.10 * slideB(s);
    return Math.max(0.651, p);
  });

  const mul = ([a, b]: number[]) => a * b;
  const step2IconScale = useTransform([step3IconScale, pose2.iconScale], mul);
  const step2IconOpacity = useTransform([step3IconOpacity, pose2.iconOpacity], mul);
  const step3IconScaleAll = useTransform([step4IconScale, pose3.iconScale], mul);
  const step1IconScale = useTransform([entryIconScale, pose1.iconScale], ([a, b]: number[]) => a * b);
  const step1IconY = useTransform([entryIconY, pose1.iconY], ([a, b]: number[]) => a + b);

  // Step 2: Progress bar animations - only bar 0 animates (0 - 30%)
  const totalBars = 29;
  const step2BarOpacities = Array.from({ length: totalBars }, (_, i) => {
    if (i === 0) {
      // Bar 0 animates from dim to bright during Step 2
      return useTransform(barDriver, [0.08, 0.18], [0, 1]);
    }
    // All other bars don't animate in this step
    return useTransform(barDriver, [0, 1], [0, 0]);
  });
  
  // Step 3: Progress bar animations - bars 1-14 animate during dot movement (30-40%)
  const step3BarOpacities = Array.from({ length: totalBars }, (_, i) => {
    if (i === 0) {
      // Bar 0 is already bright, stays bright
      return useTransform(barDriver, [0, 1], [1, 1]);
    }
    if (i >= 1 && i <= 14) {
      // Bars 1-14 animate during dot movement from bar 0 to bar 14 (30% - 40%)
      const barProgress = (i - 1) / 13; // 0 to 1 for bars 1-14 (13 intervals)
      const startProgress = 0.30 + (barProgress * (0.40 - 0.30));
      const endProgress = Math.min(startProgress + 0.015, 0.40);
      return useTransform(barDriver, [startProgress, endProgress], [0, 1]);
    }
    // Bars 15-28 don't animate in this step
    return useTransform(barDriver, [0, 1], [0, 0]);
  });
  
  // Step 4: Progress bar animations - bars 15-28 animate during dot movement (55-65%)
  const step4BarOpacities = Array.from({ length: totalBars }, (_, i) => {
    if (i <= 14) {
      // Bars 0-14 are already bright, stay bright
      return useTransform(barDriver, [0, 1], [1, 1]);
    }
    // Bars 15-28 animate during dot movement from bar 14 to bar 28 (55% - 65%)
    const barProgress = (i - 14) / 14; // 0 to 1 (bar 15 = 0, bar 28 = 1)
    const startProgress = 0.55 + (barProgress * (0.65 - 0.55));
    const endProgress = Math.min(startProgress + 0.015, 0.65);
    return useTransform(barDriver, [startProgress, endProgress], [0, 1]);
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#2c4657] md:cursor-none"
      style={{
        marginTop: `${viewportHeight * 0.5}px`,
        height: `${viewportHeight * PROCESS_HEIGHT_VH}px`,
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
        ref={stickyRef}
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
          {/* "OUR PROCESS" Title - Desktop Only (letters assemble on entry, sink away on exit) */}
          <div className="hidden md:block absolute top-[-50px] left-1/2 -translate-x-1/2 pointer-events-none z-[5]">
            <motion.div style={{ y: exitTitleY, opacity: exitTitleOpacity }}>
            <p 
              className="font-['Lato',sans-serif] text-white uppercase text-center text-nowrap"
              style={{
                opacity: 0.2,
                fontSize: '140px',
                fontWeight: 400,
                lineHeight: 'normal'
              }}
              aria-label={TITLE_TEXT}
            >
              {TITLE_TEXT.split('').map((char, i) => (
                <TitleLetter key={i} char={char} index={i} count={TITLE_TEXT.length} progress={scrollYProgress} />
              ))}
            </p>
            </motion.div>
          </div>
          
          {/* SLIDER CONTAINER - Separate container for sliding content (sinks + fades on exit) */}
          <motion.div
            className="absolute inset-0 overflow-hidden"
            style={{ y: exitContentY, scale: exitContentScale, opacity: exitContentOpacity, transformOrigin: '50% 100%' }}
          >
            {/* Content wrapper - no more slide animation needed */}
            <div className="absolute inset-0 w-full h-full">
              {/* Horizontal Slider Container for Steps (original right-to-left slide) */}
              <div className="absolute inset-0">
                {/* Step 1: "Understanding You" - visible immediately, slides out left */}
                <motion.div
                  className="absolute inset-0"
                  style={{ x: step2SlideX }}
                >
                  <Process1stStep
                    iconScale={step1IconScale}
                    iconY={step1IconY}
                    iconRotate={pose1.iconRotate}
                    iconOpacity={pose1.iconOpacity}
                    titleY={entryTitleY}
                    titleOpacity={entryTitleOpacity}
                    descY={entryDescY}
                    descOpacity={entryDescOpacity}
                    titleContent={<RevealText text="1. Understanding You" progress={stepPos} leave={TEXT_OUT_1} />}
                    descContent={<RevealText text={"We take time to understand your needs, goals, and aspirations-so every\nrecommendation starts with you, not a product."} progress={stepPos} leave={TEXT_OUT_1} />}
                  />
                </motion.div>

                {/* Step 2: Tailored Solutions - slides in from right, then out left */}
                <motion.div
                  className="absolute inset-0"
                  style={{ x: step3SlideX }}
                >
                  <Process2ndStep
                    iconSlideX={step3IconSlideX}
                    iconScale={step2IconScale}
                    iconOpacity={step2IconOpacity}
                    iconRotate={pose2.iconRotate}
                    iconY={pose2.iconY}
                    textSlideX={step3TextSlideX}
                    textOpacity={step3TextOpacity}
                    titleContent={<RevealText text="2. Tailored Solutions" progress={stepPos} enter={TEXT_IN_2} leave={TEXT_OUT_2} />}
                    descContent={<RevealText text={"We search the market to find mortgage and protection options matched\nto you-because every client matters."} progress={stepPos} enter={TEXT_IN_2} leave={TEXT_OUT_2} />}
                  />
                </motion.div>

                {/* Step 3: Ongoing Support - slides in from right and stays */}
                <motion.div
                  className="absolute inset-0"
                  style={{ x: step4SlideX }}
                >
                  <Process3rdStep
                    iconSlideX={step4IconSlideX}
                    iconScale={step3IconScaleAll}
                    iconOpacity={step4IconOpacity}
                    iconRotate={pose3.iconRotate}
                    iconY={pose3.iconY}
                    textSlideX={step4TextSlideX}
                    textOpacity={step4TextOpacity}
                    titleContent={<RevealText text="3. Ongoing Support" progress={stepPos} enter={TEXT_IN_3} />}
                    descContent={<RevealText text={"One fee for expert advice, meaning continued support and free\nremortgage advice when the time is right."} progress={stepPos} enter={TEXT_IN_3} />}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* PROGRESS BAR CONTAINER - Completely separate, no overflow clipping, no transforms */}
          {/* On entry it sweeps in from left to right while the bars grow up */}
          {/* On exit the bars collapse flat into the white line */}
          <motion.div
            ref={barWrapRef}
            className="absolute bottom-0 left-0 right-0 pointer-events-none z-10 md:mb-[-25px]"
            style={{ clipPath: entryBarClip, scaleY: barScaleY, opacity: barOpacity, transformOrigin: '50% 82%' }}
          >
            <BottomProgressBar 
              step2BarOpacities={step2BarOpacities}
              step3BarOpacities={step3BarOpacities}
              step4BarOpacities={step4BarOpacities}
              currentStep={barDriver}
            />
          </motion.div>
        </div>

        {/* Exit: thin white line drawn across the bars, which then opens up to fill the screen */}
        <motion.div
          className="absolute inset-0 bg-white pointer-events-none z-20"
          style={{
            scaleX: lineScaleX,
            scaleY: lineScaleY,
            opacity: lineOpacity,
            transformOrigin: `50% ${(lineOriginY * 100).toFixed(2)}%`,
            boxShadow: '0 0 24px rgba(255,255,255,0.6)',
          }}
        />
      </div>
    </div>
  );
}