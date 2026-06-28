import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import svgPaths from '../imports/svg-n75w9nmva4';
import svgPathsLinkedIn from '../imports/svg-cxhurimysf'; // Import LinkedIn SVG paths
import imgVector from "figma:asset/29d00c96d16b578c0374f784d6e51ab7656ee486.png";
import type { TeamMember } from '../utils/teamApi';
import imgTeamPreview from "figma:asset/8ff86b859ea6e1213d92ee504583e0bce2dc86d5.png";

// LinkedIn Icon Component
function LinkedInIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_linkedin_team)">
          <path
            clipRule="evenodd"
            d={svgPathsLinkedIn.p106ed680}
            fill={isHovered ? "#0076B2" : "white"}
            fillRule="evenodd"
          />
        </g>
        <defs>
          <clipPath id="clip0_linkedin_team">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

// LinkedIn Button Component
function LinkedInButton({ linkedinUrl }: { linkedinUrl: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={linkedinUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[rgba(255,255,255,0.1)] box-border content-stretch flex gap-[8px] items-center p-[16px] rounded-[100px] size-[56px] relative transition-all cursor-pointer"
      onMouseEnter={() => {
        setIsHovered(true);
        window.dispatchEvent(new Event('hideCursorOverlay'));
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        window.dispatchEvent(new Event('showCursorOverlay'));
      }}
      style={{
        boxShadow: isHovered ? '0 0 0 1px rgba(0, 118, 178, 0.3), 0 0 20px 8px rgba(0, 118, 178, 0.2), 0 0 40px 16px rgba(0, 118, 178, 0.1)' : 'none'
      }}
    >
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <LinkedInIcon isHovered={isHovered} />
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[100px]"
          style={{
            boxShadow: 'inset 0px 4px 4px 0px rgba(0, 118, 178, 0.12), inset 0px -5px 4px 0px rgba(0, 118, 178, 0.08)'
          }}
        />
      )}
    </a>
  );
}

export function Team({
  reviewsScrollProgress,
  servicesScrollProgress,
  aboutUsScrollProgress,
  teamMembers,
  processScrollProgress,
  onReady
}: {
  reviewsScrollProgress?: number;
  servicesScrollProgress?: number;
  aboutUsScrollProgress?: number;
  teamMembers: TeamMember[];
  processScrollProgress?: number;
  onReady?: () => void;
}) {
  const zoomFactor = window.innerWidth > 1920 ? (window.innerWidth / 1920) : 1;
  const viewportHeight = window.innerHeight / zoomFactor;

  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  const [previousMemberIndex, setPreviousMemberIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isExtremeZoomedOut, setIsExtremeZoomedOut] = useState(window.innerWidth >= 3000);
  const currentMember = teamMembers[currentMemberIndex];
  const containerRef = useRef<HTMLDivElement>(null);

  // Handler for clicking on team member columns
  const handleMemberClick = (index: number) => {
    if (index === currentMemberIndex) return;

    setPreviousMemberIndex(currentMemberIndex);
    setIsTransitioning(true);
    setCurrentMemberIndex(index);

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };

  // Team content fades in when Reviews scroll progress reaches 0.82 (when TEAM text starts sliding)
  // Should be fully visible by scroll progress 0.85
  let teamContentOpacity = reviewsScrollProgress && reviewsScrollProgress >= 0.82 ?
    Math.min((reviewsScrollProgress - 0.82) / 0.03, 1) : 0;

  // Slide up transform when Process section starts - calculate immediately, no spring
  const teamTranslateY = processScrollProgress && processScrollProgress > 0
    ? `${-viewportHeight * Math.min(processScrollProgress / 0.15, 1)}px`
    : '0px';

  // Signal readiness on mount
  useEffect(() => {
    if (onReady) {
      onReady();
    }
  }, []);

  useEffect(() => {
    const updateZoomState = () => {
      setIsExtremeZoomedOut(window.innerWidth >= 3000);
    };

    updateZoomState();
    window.addEventListener('resize', updateZoomState);
    return () => window.removeEventListener('resize', updateZoomState);
  }, []);

  // Debug logging for Process scroll
  useEffect(() => {
    // if (processScrollProgress && processScrollProgress > 0) {
    //   console.log('Process Scroll Debug:', {
    //     processScrollProgress,
    //     teamTranslateY,
    //     calculation: `${-100 * Math.min(processScrollProgress / 0.15, 1)}vh`
    //   });
    // }
  }, [processScrollProgress, teamTranslateY]);

  // Check if Services Step 1 is currently visible (AboutUs scroll 0.72-0.98)
  const isServicesStep1Active = aboutUsScrollProgress && aboutUsScrollProgress >= 0.72 && aboutUsScrollProgress < 0.98;

  // Check if Services Step 2 modal is open
  const isServicesStep2Active = servicesScrollProgress && servicesScrollProgress > 0.1;

  // Debug logging
  // if (teamContentOpacity > 0) {
  //   console.log('Team Debug:', {
  //     teamContentOpacity,
  //     aboutUsScrollProgress,
  //     isServicesStep1Active,
  //     servicesScrollProgress,
  //     isServicesStep2Active,
  //     pointerEvents: (teamContentOpacity > 0 && !isServicesStep1Active && !isServicesStep2Active) ? 'auto' : 'none'
  //   });
  // }

  // Dynamic calculation based on number of team members
  const totalMembers = teamMembers.length;
  const containerWidth = 1600; // Total container width
  const startX = 128; // Starting position
  const availableWidth = containerWidth - startX - 100; // Leave 100px margin on right

  // Calculate optimal widths
  // Expanded column should be large enough for content (min 900px)
  const minExpandedWidth = 900;
  const maxExpandedWidth = 1065;

  // Calculate closed width dynamically
  // Formula: (availableWidth - expandedWidth) / (totalMembers - 1)
  const getOptimalWidths = () => {
    let expandedWidth = maxExpandedWidth;
    let closedWidth = (availableWidth - expandedWidth) / (totalMembers - 1);

    // If closed columns would be too narrow (< 80px), reduce expanded width
    if (closedWidth < 80) {
      closedWidth = 80;
      expandedWidth = availableWidth - (closedWidth * (totalMembers - 1));
    }

    return { expandedWidth, closedWidth };
  };

  const { expandedWidth, closedWidth } = getOptimalWidths();
  const desktopScale = isExtremeZoomedOut ? 0.88 : 0.8;

  // Function to get column style based on index
  const getColumnStyle = (index: number) => {
    let left = startX;

    // Calculate left position - sum of all columns before this one
    for (let i = 0; i < index; i++) {
      if (i === currentMemberIndex) {
        left += expandedWidth;
      } else {
        left += closedWidth;
      }
    }

    // Determine width - expanded if active, closed otherwise
    const width = index === currentMemberIndex ? expandedWidth : closedWidth;

    return { left, width };
  };

  return (
    <>
      {/* Team content - fixed position, overlays on top of Reviews */}
      <div
        ref={containerRef}
        className="fixed top-0 left-0 w-full overflow-hidden z-[95]"
        style={{
          height: `${viewportHeight}px`,
          opacity: teamContentOpacity,
          transform: `translateY(${teamTranslateY})`,
          pointerEvents: (teamContentOpacity > 0 && !isServicesStep1Active && !isServicesStep2Active) ? 'auto' : 'none',
          visibility: isServicesStep1Active ? 'hidden' : 'visible',
          transition: 'opacity 0.3s ease-out'
        }}
      >
        <div className="absolute inset-0 bg-[#2c4657] flex items-center justify-center">
          {/* Scaled container - design is 1440px wide, scale to fit viewport with padding */}
          <div
            className="relative w-[1600px] h-[800px]"
            style={{
              transform: `scale(${desktopScale}) translateY(-40px)`,
              transformOrigin: 'center center'
            }}
          >
            {/* Background glow effect */}
            <div className="absolute left-[362px] size-[538px] top-[260px]">
              <div className="absolute inset-[-36.43%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 930 930">
                  <g filter="url(#filter0_f_604_60)">
                    <circle cx="465" cy="465" fill="#264050" r="269" />
                  </g>
                  <defs>
                    <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="930" id="filter0_f_604_60" width="930" x="0" y="0">
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                      <feGaussianBlur result="effect1_foregroundBlur_604_60" stdDeviation="98" />
                    </filter>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Accordion columns - sliding doors effect */}
            {teamMembers.map((member, index) => {
              const { left, width } = getColumnStyle(index);
              const isActive = index === currentMemberIndex;
              const isClosing = isTransitioning && index === previousMemberIndex;

              // Z-index logic: ensure closing column slides UNDER other columns
              // Active (opening) column: z-index 10 (highest - always on top)
              // Previous (closing) column: z-index 3 (lowest - slides under everything)
              // Other columns: z-index 5-8 based on position
              let zIndex = 5;

              if (isActive) {
                // Currently active/expanded column - highest z-index
                zIndex = 10;
              } else if (isTransitioning && index === previousMemberIndex) {
                // Previously active column (closing) - LOWEST z-index so others slide over it
                zIndex = 3;
              } else if (isTransitioning) {
                // Other columns during transition
                // Columns that are sliding need to be above the closing column
                const isMovingRight = currentMemberIndex > previousMemberIndex;

                if (isMovingRight) {
                  // Moving right: columns between previous and current slide right
                  // Give them z-index based on position (rightmost on top)
                  if (index > previousMemberIndex && index < currentMemberIndex) {
                    zIndex = 6 + (index - previousMemberIndex);
                  } else {
                    zIndex = 5;
                  }
                } else {
                  // Moving left: columns between current and previous slide left
                  // Give them z-index based on position (leftmost on top)
                  if (index < previousMemberIndex && index > currentMemberIndex) {
                    zIndex = 6 + (previousMemberIndex - index);
                  } else {
                    zIndex = 5;
                  }
                }
              }

              return (
                <motion.div
                  key={member.id}
                  className="absolute top-0 h-full cursor-pointer overflow-hidden group"
                  style={{ zIndex }}
                  animate={{ left, width }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 22,
                    mass: 0.7,
                    velocity: 0
                  }}
                  onClick={() => handleMemberClick(index)}
                >
                  {/* Left vertical line - always visible */}
                  <div className="absolute flex h-[680px] items-center justify-center left-0 top-[91px] w-0 z-20">
                    <div className="flex-none rotate-[90deg]">
                      <div className="h-0 relative w-[680px]">
                        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 680 1">
                            <line stroke="white" strokeOpacity="0.3" x2="680" y1="0.5" y2="0.5" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right vertical line - always visible */}
                  <div className="absolute flex h-[680px] items-center justify-center right-0 top-[91px] w-0 z-20">
                    <div className="flex-none rotate-[90deg]">
                      <div className="h-0 relative w-[680px]">
                        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 680 1">
                            <line stroke="white" strokeOpacity="0.3" x2="680" y1="0.5" y2="0.5" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Column number - stays at left when closing, moves to center when fully closed */}
                  <motion.p
                    className={`absolute font-['Lato:Bold',sans-serif] leading-[normal] not-italic text-[24px] text-center text-nowrap top-[91px] whitespace-pre transition-colors duration-300 ${isActive ? 'text-[#2ec4b6]' : 'text-[rgba(255,255,255,0.5)]'}`}
                    animate={{
                      left: (isActive || isClosing) ? 38 : '50%',
                      x: (isActive || isClosing) ? 0 : '-50%'
                    }}
                    transition={{
                      duration: isClosing ? 0 : 0.5,
                      delay: isClosing ? 0 : (isActive ? 0 : 0.6),
                      type: "spring",
                      stiffness: 100,
                      damping: 20
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </motion.p>

                  {/* Team member name (rotated) - ONE element with conditional positioning */}
                  <div
                    className={`absolute flex h-[197px] items-center justify-center w-[38px] z-10 pointer-events-none transition-all duration-300 ${isActive || isClosing
                      ? 'left-[38px]'
                      : 'left-[58%] -translate-x-1/2 group-hover:!bottom-[-50px] group-hover:!top-auto'
                      }`}
                    style={{
                      top: (isActive || isClosing) ? 'calc(50% + 100px)' : 'calc(50% + 100px)',
                      transform: (isActive || isClosing) ? 'translateY(-50%)' : 'translateX(-50%) translateY(-50%)',
                    }}
                  >
                    <div className="flex-none rotate-[270deg]">
                      <p className={`font-['Lato:Bold',sans-serif] leading-[normal] not-italic relative text-center text-nowrap whitespace-pre transition-all duration-300 ${isActive ? 'text-[#2ec4b6] text-[32px]' : 'text-white text-[32px] group-hover:text-[20px]'}`}>
                        {member.name}
                      </p>
                    </div>
                  </div>

                  {/* Hover content for closed columns - Job title and "Click to view more" */}
                  {!isActive && !isClosing && (
                    <>
                      {/* Job title (rotated) - visible on hover, positioned relative to number */}
                      <div
                        className="absolute flex items-center justify-center top-[280px] z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          left: '50%',
                          transform: 'translateX(-50%)'
                        }}
                      >
                        <div className="flex-none rotate-[270deg]">
                          <p className="font-['Lato:Regular',sans-serif] leading-[20px] not-italic text-[20px] text-center text-white whitespace-nowrap">
                            {member.title}
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Content - only visible when column is expanded */}
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div
                        key={`content-${member.id}`}
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: "easeInOut"
                        }}
                        style={{ pointerEvents: 'none' }}
                      >
                        {/* Main team member photo */}
                        <div className="absolute h-[400px] left-[101px] top-[calc(50%+50px)] translate-y-[-50%] w-[300px]">
                          <img
                            alt={member.name}
                            className="absolute inset-0 max-w-none object-cover object-top pointer-events-none size-full"
                            src={member.image}
                            loading="lazy"
                          />
                        </div>

                        {/* Job title - positioned above the image */}
                        <p className="absolute font-['Lato:SemiBold',sans-serif] leading-[normal] left-[101px] not-italic text-[48px] text-[rgba(255,255,255,0.5)] top-[calc(50%+100px-450px/2-150px)] w-[461px]">
                          {member.title}
                        </p>

                        {/* Bio text - to the right of photo */}
                        <p className="absolute font-['Lato:Regular',sans-serif] leading-[40px] left-[432px] not-italic text-[16px] text-white top-[calc(50%+50px)] translate-y-[-50%] tracking-[0.14px] w-[600px]">
                          {member.bio}
                        </p>

                        {/* LinkedIn Button - positioned to the right of photo, below bio text */}
                        {member.linkedinUrl && (
                          <div className="absolute left-[432px] top-[calc(50%+100px+140px)]" style={{ pointerEvents: 'auto' }}>
                            <LinkedInButton linkedinUrl={member.linkedinUrl} />
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>

      {/* White overlay with TEAM text cutout - reveals team content through the text */}
      {/* Mask starts sliding in at 0.82, then zooms from 0.90+, stays visible longer */}
      {reviewsScrollProgress && reviewsScrollProgress >= 0.82 && reviewsScrollProgress < 1.0 && (
        <div
          className="fixed top-0 left-0 w-full overflow-hidden pointer-events-none z-[96]"
          style={{
            height: `${viewportHeight}px`,
            opacity: 1 // Full opacity immediately - no fade
          }}
        >
          {/* SVG with mask to create cutout effect */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <mask id="teamTextMask">
                {/* White background - everything covered */}
                <rect x="0" y="0" width="100%" height="100%" fill="white" />

                {/* Black text - creates the cutout (hole) with slide + zoom animation */}
                <text
                  x={(() => {
                    // Slide from right: starts at 150% at 0.82, center (50%) at 0.90 (earlier)
                    if (reviewsScrollProgress < 0.90) {
                      const slideProgress = Math.min((reviewsScrollProgress - 0.82) / (0.90 - 0.82), 1);
                      return `${150 - (100 * slideProgress)}%`;
                    }
                    return "50%";
                  })()}
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="black"
                  fontSize={(() => {
                    // Zoom animation - MUCH SLOWER: greatly extended scroll range
                    // Base size is 232px, scale from 2 to 12 over EXTENDED scroll range
                    const baseSize = 232;
                    if (!reviewsScrollProgress || reviewsScrollProgress < 0.90) return baseSize * 2; // Hold at 2x during slide-in
                    if (reviewsScrollProgress >= 0.999) return baseSize * 12; // Reduced max zoom from 15 to 12

                    // Linear progression from 0.90 to 0.999 (0.099 scroll range - even slower)
                    const progress = (reviewsScrollProgress - 0.90) / (0.999 - 0.90);
                    const scale = 2 + (10 * progress); // 2x to 12x scale (linear)
                    return baseSize * scale;
                  })()}
                  fontFamily="Lato, sans-serif"
                  fontWeight="700"
                  letterSpacing={(() => {
                    // Scale letter spacing proportionally to fontSize
                    const baseFontSize = 232;
                    const baseLetterSpacing = 48;
                    const fontSize = (() => {
                      if (!reviewsScrollProgress || reviewsScrollProgress < 0.90) return baseFontSize * 2;
                      if (reviewsScrollProgress >= 0.999) return baseFontSize * 12;
                      const progress = (reviewsScrollProgress - 0.90) / (0.999 - 0.90);
                      const scale = 2 + (10 * progress);
                      return baseFontSize * scale;
                    })();
                    return String((baseLetterSpacing * fontSize) / baseFontSize);
                  })()}
                >
                  TEAM
                </text>
              </mask>
            </defs>

            {/* White rectangle with mask applied */}
            <rect x="0" y="0" width="100%" height="100%" fill="white" mask="url(#teamTextMask)" />
          </svg>
        </div>
      )}
    </>
  );
}