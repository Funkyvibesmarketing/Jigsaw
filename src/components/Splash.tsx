import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import svgPaths from '../imports/svg-62agla70ld';
import Frame1000002994 from '../imports/Frame1000002994-928-222';
import Rectangle14189 from '../imports/Rectangle14189';
import Rectangle14188 from '../imports/Rectangle14188';
import { SplashMobile } from './SplashMobile';

export function Splash({ onComplete }: { onComplete: () => void }) {
  const [isMobile, setIsMobile] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showFinancial, setShowFinancial] = useState(false);
  const [fadeProgress, setFadeProgress] = useState(false);

  useEffect(() => {
    // Detect mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Animate progress from 0 to 100 over the duration of the letter animations
    const duration = 3500; // 3.5 seconds total animation
    const steps = 100;
    const stepDuration = duration / steps;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Hold at 100% for 400ms before fading
          setTimeout(() => {
            setFadeProgress(true);
          }, 400);
          // Show financial banner after fade starts
          setTimeout(() => {
            setShowFinancial(true);
          }, 700);
          return 100;
        }
        return prev + 1;
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  // Render mobile version on mobile devices
  if (isMobile) {
    return <SplashMobile onComplete={onComplete} />;
  }

  // Desktop version
  return (
    <div className="min-h-screen w-full overflow-hidden bg-white m-0 p-0 border-0">
      <AnimatedLogoScreen progress={progress} showFinancial={showFinancial} fadeProgress={fadeProgress} />
    </div>
  );
}

function AnimatedLogoScreen({ progress, showFinancial, fadeProgress }: { progress: number, showFinancial: boolean, fadeProgress: boolean }) {
  return (
    <motion.div 
      className="relative size-full min-h-screen bg-white border-0" 
      data-name="Loading (Letter)"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ margin: 0, padding: 0 }}
    >
      {/* JIGSAW Letters - J, I, G, S, W (without A) */}
      <div className="absolute h-[143px] left-1/2 top-[calc(50%-64.5px)] translate-x-[-50%] translate-y-[-50%] w-[802px] pointer-events-none" data-name="JIGSAW">
        <svg className="block size-full pointer-events-none" fill="none" preserveAspectRatio="none" viewBox="0 0 802 143">
          <g id="JIGSAW">
            {/* J - appears from left */}
            <motion.path 
              d={svgPaths.p1a605780} 
              fill="#2C4657"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            />
            
            {/* I - appears from left */}
            <motion.path 
              d={svgPaths.p17527d40} 
              fill="#2C4657"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            />
            
            {/* G - appears from left */}
            <motion.path 
              d={svgPaths.p1a7ff700} 
              fill="#2C4657"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            />
            
            {/* S - appears from left */}
            <motion.path 
              d={svgPaths.p2d2881f0} 
              fill="#2C4657"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            />
            
            {/* W - appears from right */}
            <motion.path 
              d={svgPaths.p3b325f00} 
              fill="#2C4657"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            />
          </g>
        </svg>
        
        {/* Main - The special A logo that appears FIRST - starts in center then moves to position */}
        <motion.div 
          className="absolute h-[143px] w-[135px]" 
          data-name="Main"
          initial={{ opacity: 0, scale: 0.5, left: '50%', x: '-50%', top: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            left: '460px',
            x: 0
          }}
          transition={{ 
            opacity: { delay: 0, duration: 0.5 },
            scale: { delay: 0, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
            left: { delay: 0.4, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
            x: { delay: 0.4, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }
          }}
        >
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 132 140">
            <g id="Main">
              <path d={svgPaths.p231ced00} fill="#2EC4B6" id="Vector" />
              <path d={svgPaths.p289f1580} fill="#2C4657" id="Vector_2" />
            </g>
          </svg>
        </motion.div>
      </div>

      {/* Progress bars and percentage - fade out when reaching 100% */}
      {!showFinancial && (
        <motion.div 
          className="absolute flex gap-[32px] items-center left-1/2 top-[calc(50%+89px)] -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: fadeProgress ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Left progress bar - always at 100% */}
          <div className="w-[122px] h-[8px] rotate-[180deg] scale-y-[-100%] shrink-0">
            <Rectangle14189 />
          </div>
          
          {/* Percentage text */}
          <motion.p 
            className="font-['Lato:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#2ec4b6] text-[40px] text-center text-nowrap whitespace-pre"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            {progress}%
          </motion.p>
          
          {/* Right progress bar - always at 100% */}
          <div className="w-[122px] h-[8px] shrink-0">
            <Rectangle14188 />
          </div>
        </motion.div>
      )}

      {/* Financial Banner */}
      {showFinancial && (
        <motion.div 
          className="absolute w-[813px] h-[103px] left-1/2 top-[calc(50%+24px)] -translate-x-[calc(50%-10px)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <Frame1000002994 />
        </motion.div>
      )}
    </motion.div>
  );
}