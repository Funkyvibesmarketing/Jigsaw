import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useMotionValueEvent, animate } from 'motion/react';
import svgPaths from '../imports/svg-jnardqphfi';
import svgPathsALogo from '../imports/svg-srebhhv8fw';
import imgFinancialBanner from 'figma:asset/9d0fdbe2203505eb3ad7a3a5c6f2a92dd6f76e7a.png';

// Detect iOS device for performance optimizations
const isIOS = () => {
  if (typeof navigator === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

export function SplashMobile({ onComplete }: { onComplete: () => void }) {
  const progressValue = useMotionValue(0);
  const [showFinancial, setShowFinancial] = useState(false);
  const [fadeProgress, setFadeProgress] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const iosDevice = isIOS();

  useEffect(() => {
    // Start animation
    setHasStarted(true);
    // Reduced from 5.0s to 2.0s for faster countdown and better iOS performance
    // iOS performance optimization: use shorter duration to reduce animation thread blocking
    const animationDuration = iosDevice ? 2.0 : 2.0;
    const controls = animate(progressValue, 100, {
      duration: animationDuration,
      ease: "linear",
      onComplete: () => {
        // Animation sequence after reaching 100% - scaled proportionally from 5s to 2s timeline
        // Original: 0ms, 50ms, 100ms (0%, 1%, 2% of 5s)
        // New: 0ms, 20ms, 40ms (0%, 1%, 2% of 2s)
        setTimeout(() => setFadeProgress(true), 0);
        setTimeout(() => setShowFinancial(true), 20);
        setTimeout(() => setShowScrollHint(true), 40);
      }
    });

    return () => controls.stop();
  }, [progressValue, iosDevice]);

  return (
    <div className="min-h-screen w-full overflow-hidden bg-white m-0 p-0 border-0 transition-opacity duration-300"
      style={{ opacity: hasStarted ? 1 : 0 }}>
      <AnimatedLogoScreen
        progressValue={progressValue}
        showFinancial={showFinancial}
        fadeProgress={fadeProgress}
        showScrollHint={showScrollHint}
        isIOS={iosDevice}
      />
    </div>
  );
}

function AnimatedLogoScreen({ progressValue, showFinancial, fadeProgress, showScrollHint, isIOS }: { progressValue: any, showFinancial: boolean, fadeProgress: boolean, showScrollHint: boolean, isIOS: boolean }) {
  const percentRef = useRef<HTMLParagraphElement>(null);

  // Direct DOM update for percentage text to avoid React re-renders
  useMotionValueEvent(progressValue, "change", (latest) => {
    if (percentRef.current) {
      percentRef.current.textContent = `${Math.floor(latest)}%`;
    }
  });

  // High-performance GPU transforms for progress bars (scaleX instead of width)
  // These represent the "empty" overlay (white/40) shrinking from 1 to 0
  const progressScale = useTransform(progressValue, [0, 100], [1, 0]);

  return (
    <motion.div
      className="relative size-full min-h-screen bg-white border-0"
      data-name="Loading (Letter) Mobile"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ margin: 0, padding: 0 }}
    >
      {/* JIGSAW Letters - Mobile optimized with will-change */}
      <div className="absolute h-[60px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[392px] px-4" style={{ marginTop: '-40px' }} data-name="JIGSAW">
        <svg className="block size-full overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 402 69">
          <g id="JIGSAW" style={{ willChange: 'transform, opacity' }}>
            {/* iOS optimization: disable complex easing (use ease, not custom bezier) during splash to reduce main thread load */}
            <motion.path
              d={svgPaths.p3630e540}
              fill="#2C4657"
              stroke="#2C4657"
              strokeWidth="1.5"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: -20 }}
              transition={{
                delay: 0.2,
                duration: 0.6,
                ease: isIOS ? "easeOut" : [0.34, 1.56, 0.64, 1]
              }}
            />
            <motion.path
              d={svgPaths.pb43e380}
              fill="#2C4657"
              stroke="#2C4657"
              strokeWidth="1.5"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: -15 }}
              transition={{
                delay: 0.4,
                duration: 0.6,
                ease: isIOS ? "easeOut" : [0.34, 1.56, 0.64, 1]
              }}
            />
            <motion.path
              d={svgPaths.p2fd354f0}
              fill="#2C4657"
              stroke="#2C4657"
              strokeWidth="1.5"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: -10 }}
              transition={{
                delay: 0.6,
                duration: 0.6,
                ease: isIOS ? "easeOut" : [0.34, 1.56, 0.64, 1]
              }}
            />
            <motion.path
              d={svgPaths.p27c9a80}
              fill="#2C4657"
              stroke="#2C4657"
              strokeWidth="1.5"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.8,
                duration: 0.6,
                ease: isIOS ? "easeOut" : [0.34, 1.56, 0.64, 1]
              }}
            />
            <motion.path
              d={svgPaths.p1094ff00}
              fill="#2C4657"
              stroke="#2C4657"
              strokeWidth="1.5"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 20 }}
              transition={{
                delay: 1.0,
                duration: 0.6,
                ease: isIOS ? "easeOut" : [0.34, 1.56, 0.64, 1]
              }}
            />
          </g>
        </svg>

        <motion.div
          className="absolute w-[60px] h-[60px]"
          style={{ willChange: 'transform, opacity, left, top' }}
          initial={{ opacity: 0, scale: 0.5, left: '50%', x: '-50%', top: '50%', y: '-50%' }}
          animate={{ opacity: 1, scale: 1, left: 'calc(50% + 20px)', top: '2px', x: 0, y: 0 }}
          transition={{
            opacity: { delay: 0, duration: 0.5 },
            scale: { delay: 0, duration: 0.8, ease: isIOS ? "easeOut" : [0.34, 1.56, 0.64, 1] },
            left: { delay: 0.2, duration: 0.6, ease: isIOS ? "easeOut" : [0.34, 1.56, 0.64, 1] },
            top: { delay: 0.2, duration: 0.6, ease: isIOS ? "easeOut" : [0.34, 1.56, 0.64, 1] },
            x: { delay: 0.2, duration: 0.6, ease: isIOS ? "easeOut" : [0.34, 1.56, 0.64, 1] },
            y: { delay: 0.2, duration: 0.6, ease: isIOS ? "easeOut" : [0.34, 1.56, 0.64, 1] }
          }}
        >
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 62.4487 68.11">
            <g clipPath="url(#clip0_2119_89)">
              <path d={svgPathsALogo.p2bf2a00} fill="#2EC4B6" stroke="#2EC4B6" strokeWidth="1.5" />
              <path d={svgPathsALogo.p27abc200} fill="#2C4657" stroke="#2C4657" strokeWidth="1.5" />
            </g>
            <defs><clipPath id="clip0_2119_89"><rect fill="white" height="68.11" width="62.4487" /></clipPath></defs>
          </svg>
        </motion.div>
      </div>

      {!showFinancial && (
        <motion.div
          className="absolute content-stretch flex gap-[32px] items-center left-1/2 top-1/2 -translate-x-1/2"
          style={{ marginTop: '20px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: fadeProgress ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-[180deg] scale-y-[-100%]">
              <div className="relative h-[6px] rounded-[12px] w-[122px] bg-gradient-to-r from-[rgba(255,255,255,0.4)] to-[rgba(46,196,182,0.4)] overflow-hidden">
                <motion.div className="absolute inset-0 bg-white/40" style={{ scaleX: progressScale, transformOrigin: 'left' }} />
              </div>
            </div>
          </div>

          <p ref={percentRef} className="font-['Lato:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#2ec4b6] text-[32px] text-center text-nowrap whitespace-pre">0%</p>

          <div className="relative h-[6px] rounded-[12px] shrink-0 w-[122px] bg-gradient-to-r from-[rgba(255,255,255,0.4)] to-[rgba(46,196,182,0.4)] overflow-hidden">
            <motion.div className="absolute inset-0 bg-white/40" style={{ scaleX: progressScale, transformOrigin: 'right' }} />
          </div>
        </motion.div>
      )}

      {showFinancial && (
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 w-[90%]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <img src={imgFinancialBanner} alt="Financial Banner" className="block w-full h-auto" />
        </motion.div>
      )}

      <ScrollDownHint visible={showScrollHint} />
    </motion.div>
  );
}

function ScrollDownHint({ visible }: { visible: boolean }) {
  return (
    <motion.button
      type="button"
      className="flex flex-col items-center gap-1 rounded-full bg-white/98 px-3 py-2 text-center text-[#2C4657] shadow-[0_16px_30px_rgba(0,0,0,0.14)] transform-gpu"
      style={{ position: 'fixed', left: 0, right: 0, bottom: 40, margin: '0 auto', zIndex: 50, width: 'max-content' }}
      initial={{ opacity: 0, y: 16 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.6, ease: [0.24, 1, 0.32, 1] }}
      onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      aria-label="Scroll down"
    >
      <span className="font-['Lato:Regular',sans-serif] text-[14px] uppercase tracking-[0.24em]">Scroll down</span>
      <motion.svg
        className="h-[18px] w-[18px]"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={visible ? { y: [0, 6, 0] } : { y: 0 }}
        transition={{ repeat: Infinity, repeatType: 'loop', duration: 1.4, ease: 'easeInOut', delay: 0.2 }}
      >
        <path d="M25.8025 23.2713C23.2692 23.5359 18.1991 25.422 18.1848 30.8489M10.2454 23.2303C12.7772 23.5083 17.8373 25.4211 17.823 30.848M18.0144 26.8687L18.0715 5.1611" stroke="#2C4657" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1.29 1.29" />
      </motion.svg>
    </motion.button>
  );
}
