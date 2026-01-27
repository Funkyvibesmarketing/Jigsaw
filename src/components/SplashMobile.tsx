import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import svgPaths from '../imports/svg-jnardqphfi';
import svgPathsFullLogo from '../imports/svg-vfi0emqqhx';
import svgPathsMain from '../imports/svg-w3sqzfwyzd';
import svgPathsALogo from '../imports/svg-srebhhv8fw';
import Main from '../imports/Main100000014621826160272210780000006234564362710872498';
import imgMobileA from 'figma:asset/e55262ede034fdfcdc468926f793b234c0108a2a.png';
import imgFinancialBanner from 'figma:asset/9d0fdbe2203505eb3ad7a3a5c6f2a92dd6f76e7a.png';

export function SplashMobile({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [showFinancial, setShowFinancial] = useState(false);
  const [fadeProgress, setFadeProgress] = useState(false);

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
      data-name="Loading (Letter) Mobile"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ margin: 0, padding: 0 }}
    >
      {/* JIGSAW Letters - J, I, G, S, W (without A) - Mobile optimized */}
      <div className="absolute h-[60px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[392px] px-4" style={{ marginTop: '-40px' }} data-name="JIGSAW">
        <svg className="block size-full overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 402 69">
          <g id="JIGSAW">
            {/* J - appears from left */}
            <motion.path 
              d={svgPaths.p3630e540} 
              fill="#2C4657"
              stroke="#2C4657"
              strokeWidth="1.5"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: -20 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            />
            
            {/* I - appears from left */}
            <motion.path 
              d={svgPaths.pb43e380} 
              fill="#2C4657"
              stroke="#2C4657"
              strokeWidth="1.5"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: -15 }}
              transition={{ delay: 0.7, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            />
            
            {/* G - appears from left */}
            <motion.path 
              d={svgPaths.p2fd354f0} 
              fill="#2C4657"
              stroke="#2C4657"
              strokeWidth="1.5"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: -10 }}
              transition={{ delay: 1.0, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            />
            
            {/* S - appears from left */}
            <motion.path 
              d={svgPaths.p27c9a80} 
              fill="#2C4657"
              stroke="#2C4657"
              strokeWidth="1.5"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            />
            
            {/* W - appears from right */}
            <motion.path 
              d={svgPaths.p1094ff00} 
              fill="#2C4657"
              stroke="#2C4657"
              strokeWidth="1.5"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 20 }}
              transition={{ delay: 1.6, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            />
          </g>
        </svg>
        
        {/* Main - The special A logo that appears FIRST - starts in center then moves to position */}
        <motion.div 
          className="absolute w-[60px] h-[60px]" 
          data-name="Main_1_00000014621826160272210780000006234564362710872498_"
          initial={{ opacity: 0, scale: 0.5, left: '50%', x: '-50%', top: '50%', y: '-50%' }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            left: 'calc(50% + 20px)',
            top: '2px',
            x: 0,
            y: 0
          }}
          transition={{ 
            opacity: { delay: 0, duration: 0.5 },
            scale: { delay: 0, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
            left: { delay: 0.4, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
            top: { delay: 0.4, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
            x: { delay: 0.4, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
            y: { delay: 0.4, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }
          }}
        >
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 62.4487 68.11">
            <g clipPath="url(#clip0_2119_89)">
              <path 
                d={svgPathsALogo.p2bf2a00} 
                fill="#2EC4B6"
                stroke="#2EC4B6"
                strokeWidth="1.5"
              />
              <path 
                d={svgPathsALogo.p27abc200} 
                fill="#2C4657"
                stroke="#2C4657"
                strokeWidth="1.5"
              />
            </g>
            <defs>
              <clipPath id="clip0_2119_89">
                <rect fill="white" height="68.11" width="62.4487" />
              </clipPath>
            </defs>
          </svg>
        </motion.div>
      </div>

      {/* Progress bars and percentage - fade out when reaching 100% */}
      {!showFinancial && (
        <motion.div 
          className="absolute content-stretch flex gap-[32px] items-center left-1/2 top-1/2 -translate-x-1/2"
          style={{ marginTop: '20px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: fadeProgress ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Left progress bar - rotated and flipped */}
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-[180deg] scale-y-[-100%]">
              <div className="relative h-[6px] rounded-[12px] w-[122px] bg-gradient-to-r from-[rgba(255,255,255,0.4)] to-[rgba(46,196,182,0.4)] overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-white/40"
                  initial={{ width: '100%' }}
                  animate={{ width: `${100 - progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          </div>
          
          {/* Percentage text */}
          <motion.p 
            className="font-['Lato:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#2ec4b6] text-[32px] text-center text-nowrap whitespace-pre"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            {progress}%
          </motion.p>
          
          {/* Right progress bar */}
          <div className="relative h-[6px] rounded-[12px] shrink-0 w-[122px] bg-gradient-to-r from-[rgba(255,255,255,0.4)] to-[rgba(46,196,182,0.4)] overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-white/40"
              initial={{ width: '100%', marginLeft: 0 }}
              animate={{ width: `${100 - progress}%`, marginLeft: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </motion.div>
      )}

      {/* Financial Banner - Mobile optimized */}
      {showFinancial && (
        <motion.div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 w-[90%]"
          style={{ marginTop: '0px',left : '50%' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <MobileFinancialBanner />
        </motion.div>
      )}
    </motion.div>
  );
}

function MobileFinancialBanner() {
  return (
    <img 
      src={imgFinancialBanner} 
      alt="Financial Banner" 
      className="block w-full h-auto"
    />
  );
}