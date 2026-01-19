import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import type { TeamMember } from '../utils/teamApi';

export function TeamMobile({ 
  reviewsScrollProgress,
  teamMembers,
  processScrollProgress,
  onScrollProgress
}: { 
  reviewsScrollProgress?: number;
  teamMembers: TeamMember[];
  processScrollProgress?: number;
  onScrollProgress?: (progress: number) => void;
}) {
  // Track which member is expanded (first one by default)
  const [expandedMember, setExpandedMember] = useState(0);

  // Debug logging for scroll progress
  useEffect(() => {
    if (reviewsScrollProgress && reviewsScrollProgress >= 0.70) {
      console.log('TeamMobile TEAM Slide Progress:', {
        reviewsScrollProgress: reviewsScrollProgress.toFixed(3),
        xPosition: (() => {
          if (reviewsScrollProgress < 0.70) return "150%";
          if (reviewsScrollProgress < 1.0) {
            const p = (reviewsScrollProgress - 0.70) / 0.30;
            return `${150 - (100 * p)}%`;
          }
          return "50%";
        })(),
        slidePercentage: ((reviewsScrollProgress - 0.70) / 0.30 * 100).toFixed(1) + '%'
      });
    }
  }, [reviewsScrollProgress]);

  // Team content should be visible from the start of mask animation
  // Appears at 0.70 (when mask starts) so it's visible through the cutout
  let teamContentOpacity = reviewsScrollProgress && reviewsScrollProgress >= 0.70 ? 1 : 0;
  
  // Team slides up when Process section appears (processScrollProgress 0 - 0.20)
  let teamSlideY = 0;
  if (processScrollProgress && processScrollProgress > 0) {
    // Slide up during first 20% of Process scroll
    const slideProgress = Math.min(processScrollProgress / 0.20, 1);
    teamSlideY = slideProgress * -100; // Slide up by 100vh
  }
  
  // Report scroll progress to parent
  useEffect(() => {
    if (onScrollProgress) {
      // Team is visible when reviews progress is >= 0.98
      if (reviewsScrollProgress && reviewsScrollProgress >= 0.98) {
        onScrollProgress(1);
      } else {
        onScrollProgress(0);
      }
    }
  }, [reviewsScrollProgress, onScrollProgress]);

  // Calculate heights for accordion
  const collapsedHeight = 77; // Height of header (top line + name)
  const expandedHeight = 682; // Full height with content

  const toggleMember = (index: number) => {
    setExpandedMember(expandedMember === index ? -1 : index);
  };

  return (
    <>
      {/* White overlay with TEAM text cutout - reveals team content through the text - MOBILE VERSION */}
      {reviewsScrollProgress && reviewsScrollProgress >= 0.70 && reviewsScrollProgress < 1.0 && (
        <div 
          className="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-[96]"
          style={{ 
            // Fade out the mask at the very end (0.995 to 1.0)
            opacity: reviewsScrollProgress >= 0.995 ? 1 - ((reviewsScrollProgress - 0.995) / 0.005) : 1,
            touchAction: 'none', // Let touch events pass through to scrollable content below
            willChange: 'opacity',
            transform: `translateY(${teamSlideY}vh)` // Slide up with team content
          } as React.CSSProperties}
        >
          {/* SVG with mask to create cutout effect */}
          <svg className="absolute inset-0 w-full h-full" style={{ willChange: 'transform' } as React.CSSProperties}>
            <defs>
              <mask id="teamTextMaskMobile">
                {/* White background - everything covered */}
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                
                {/* Black text - creates the cutout (hole) - slides in from right then zooms */}
                <text
                  x={(() => {
                    // Slide animation: starts off-screen right (150%), slides to center (50%)
                    // ULTRA SLOW: 0.70 to 1.0 (30% range for ultra slow slide - 2x slower than before)
                    if (!reviewsScrollProgress || reviewsScrollProgress < 0.70) return "150%";
                    if (reviewsScrollProgress < 1.0) {
                      // 0.70 to 1.0: Slide from 150% to 50% (center) - ULTRA SLOW
                      const p = (reviewsScrollProgress - 0.70) / 0.30;
                      return `${150 - (100 * p)}%`;
                    }
                    return "50%"; // Centered at 1.0
                  })()}
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="black"
                  fontSize={(() => {
                    // Start with EVEN LARGER text during slide-in (200px), then zoom from there
                    if (!reviewsScrollProgress || reviewsScrollProgress < 0.88) return 200;
                    if (reviewsScrollProgress >= 1.0) return 200 * 80;
                    
                    // Gradual zoom progression
                    let scale;
                    if (reviewsScrollProgress < 0.94) {
                      // 0.88 to 0.94: Hold at scale 1 (200px) - EVEN LARGER during slide and hold
                      scale = 1;
                    } else if (reviewsScrollProgress < 0.95) {
                      // 0.94 to 0.95: scale 1 to 1.5
                      const p = (reviewsScrollProgress - 0.94) / 0.01;
                      scale = 1 + (1.5 - 1) * p;
                    } else if (reviewsScrollProgress < 0.96) {
                      // 0.95 to 0.96: scale 1.5 to 3
                      const p = (reviewsScrollProgress - 0.95) / 0.01;
                      scale = 1.5 + (3 - 1.5) * p;
                    } else if (reviewsScrollProgress < 0.97) {
                      // 0.96 to 0.97: scale 3 to 6
                      const p = (reviewsScrollProgress - 0.96) / 0.01;
                      scale = 3 + (6 - 3) * p;
                    } else if (reviewsScrollProgress < 0.98) {
                      // 0.97 to 0.98: scale 6 to 12
                      const p = (reviewsScrollProgress - 0.97) / 0.01;
                      scale = 6 + (12 - 6) * p;
                    } else if (reviewsScrollProgress < 0.99) {
                      // 0.98 to 0.99: scale 12 to 25
                      const p = (reviewsScrollProgress - 0.98) / 0.01;
                      scale = 12 + (25 - 12) * p;
                    } else if (reviewsScrollProgress < 0.995) {
                      // 0.99 to 0.995: scale 25 to 50
                      const p = (reviewsScrollProgress - 0.99) / 0.005;
                      scale = 25 + (50 - 25) * p;
                    } else {
                      // 0.995 to 1.0: scale 50 to 80 (final zoom as mask fades)
                      const p = (reviewsScrollProgress - 0.995) / 0.005;
                      scale = 50 + (80 - 50) * p;
                    }
                    
                    return 200 * scale; // Base size 200px (EVEN LARGER - was 140px)
                  })()}
                  fontFamily="Lato, sans-serif"
                  fontWeight="700"
                  letterSpacing="16"
                >
                  TEAM
                </text>
              </mask>
            </defs>
            
            {/* White rectangle with mask applied */}
            <rect x="0" y="0" width="100%" height="100%" fill="white" mask="url(#teamTextMaskMobile)" />
          </svg>
        </div>
      )}

      {/* Team content - fixed position, overlays on top of Reviews */}
      <motion.div
        className="fixed top-0 left-0 w-full h-screen overflow-hidden"
        style={{ 
          opacity: teamContentOpacity,
          pointerEvents: (reviewsScrollProgress && reviewsScrollProgress >= 1.0) ? 'auto' : 'none', // Only scrollable after mask is complete
          zIndex: processScrollProgress && processScrollProgress > 0 ? 50 : 95, // Lower z-index when Process starts
          transform: `translateY(${teamSlideY}vh)` // Slide up when Process appears
        }}
      >
        <div className="absolute inset-0 bg-[#2c4657] overflow-y-auto overflow-x-hidden">
          {/* Scrollable content container with top padding for navigation */}
          <div className="relative min-h-screen pt-[100px] pb-[80px] px-4">
            {teamMembers.map((member, index) => {
              const isExpanded = expandedMember === index;
              
              return (
                <motion.div 
                  key={member.id} 
                  className="relative overflow-hidden border-t border-white/30 w-full max-w-[393px] mx-auto"
                  animate={{ 
                    height: isExpanded ? expandedHeight : collapsedHeight 
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    mass: 1
                  }}
                >
                  {/* Clickable header area */}
                  <div 
                    className="relative cursor-pointer px-2"
                    onClick={() => toggleMember(index)}
                  >
                    {/* Member number - right side */}
                    <p className="absolute font-['Lato:Bold',sans-serif] leading-[normal] right-2 not-italic text-[14px] text-[rgba(255,255,255,0.5)] text-center text-nowrap top-[21px] whitespace-pre">
                      {String(index + 1).padStart(2, '0')}
                    </p>

                    {/* Member name - left side */}
                    <p className="absolute font-['Lato:Bold',sans-serif] leading-[normal] left-2 not-italic text-[20px] text-nowrap text-white top-[21px] whitespace-pre max-w-[70%] truncate">
                      {member.name}
                    </p>
                  </div>

                  {/* Expandable content */}
                  <motion.div
                    className="px-2"
                    animate={{ opacity: isExpanded ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: isExpanded ? 0.2 : 0 }}
                  >
                    {/* Job title */}
                    <p className="absolute font-['Lato:SemiBold',sans-serif] leading-[normal] left-2 not-italic text-[24px] text-[rgba(255,255,255,0.5)] top-[77px] w-[calc(100%-16px)]">
                      {member.title}
                    </p>

                    {/* Member photo */}
                    <div className="absolute h-[280px] left-2 top-[160px] w-[calc(100%-16px)]">
                      <img 
                        alt={member.name}
                        className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full rounded-lg" 
                        src={member.image}
                      />
                    </div>

                    {/* Bio text */}
                    <p className="absolute font-['Lato:Regular',sans-serif] leading-[22px] left-2 not-italic text-[13px] text-white top-[460px] tracking-[0.13px] w-[calc(100%-16px)]">
                      {member.bio}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Bottom horizontal line after last member */}
            <div className="h-[1px] bg-white/30 w-full max-w-[393px] mx-auto" />
          </div>
        </div>
      </motion.div>
    </>
  );
}