import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import type { TeamMember } from '../utils/teamApi';
import svgPaths from "../imports/svg-rqrvikz6z1";

export function TeamMobile({
  reviewsScrollProgress,
  teamMembers,
  processScrollProgress,
  onScrollProgress,
  onReady
}: {
  reviewsScrollProgress?: number;
  teamMembers: TeamMember[];
  processScrollProgress?: number;
  onScrollProgress?: (progress: number) => void;
  onReady?: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSectionActive, setIsSectionActive] = useState(false);

  // Signal readiness on mount
  useEffect(() => {
    if (onReady) {
      onReady();
    }
  }, []);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const hasSwiped = useRef(false);

  // State for the Read More popup
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    if (!selectedMember) return;

    // Disabling Lenis scroll if it's initialized
    window.dispatchEvent(new CustomEvent('lenisStop'));

    // Lock page scroll (without setting height: 100% to prevent jumping to top)
    const originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Touch-move prevention on body/html (except for our popup content)
    const preventDefault = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest('.overflow-y-auto')) {
        return; // Don't prevent scroll inside the scrollable bio element
      }
      e.preventDefault();
    };

    document.addEventListener('touchmove', preventDefault, { passive: false });

    return () => {
      window.dispatchEvent(new CustomEvent('lenisStart'));
      document.body.style.overflow = originalBodyOverflow;
      document.removeEventListener('touchmove', preventDefault);
    };
  }, [selectedMember]);

  // Detect small mobile screens (width <= 360px) to prevent vertical/horizontal overlapping
  const isSmallMobile = typeof window !== 'undefined' && window.innerWidth <= 360;

  // Only show first 3 team members
  const displayMembers = teamMembers.slice(0, 3);
  const totalSlides = 3;

  // Team content should be visible only after the TEAM mask has started (0.75)
  // Fade in from 0.78 to 0.88 — starts after mask is partially opaque, never bleeds through early
  let teamContentOpacity = 0;
  if (reviewsScrollProgress && reviewsScrollProgress >= 0.78 && reviewsScrollProgress < 0.88) {
    teamContentOpacity = (reviewsScrollProgress - 0.78) / 0.10;
  } else if (reviewsScrollProgress && reviewsScrollProgress >= 0.88) {
    teamContentOpacity = 1;
  }

  // Team slides up when Process section appears
  let teamSlideY = 0;
  if (processScrollProgress && processScrollProgress > 0) {
    const slideProgress = Math.min(processScrollProgress / 0.15, 1); // Slide completes by 0.15
    teamSlideY = slideProgress * -100;
  }

  // Keep team z-index ABOVE the Process section (zIndex 96/100) for the entire
  // duration of the slide-out. Only after the team is fully off-screen (-100vh)
  // do we let it drop below Process so touches pass through correctly.
  const teamIsFullyGone = processScrollProgress && processScrollProgress >= 0.15;
  const teamZIndex = teamIsFullyGone ? 50 : 105;

  // Report scroll progress to parent
  useEffect(() => {
    if (onScrollProgress) {
      if (reviewsScrollProgress && reviewsScrollProgress >= 0.98) {
        onScrollProgress(1);
      } else {
        onScrollProgress(0);
      }
    }
  }, [reviewsScrollProgress, onScrollProgress]); // Add onScrollProgress back with proper memoization expected from parent

  // Navigation handlers
  const handleNext = () => {
    if (currentIndex < totalSlides - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    hasSwiped.current = false;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - touchStartX.current;
    const deltaY = currentY - touchStartY.current;

    // Detect if horizontal swipe is dominant
    if (Math.abs(deltaX) > 10 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      e.preventDefault();
      e.stopPropagation();

      // Apply drag with boundaries
      let boundedDragX = deltaX;

      // Add resistance at boundaries
      if ((currentIndex === 0 && deltaX > 0) || (currentIndex === totalSlides - 1 && deltaX < 0)) {
        boundedDragX = deltaX * 0.3; // Strong resistance at edges
      }

      setDragX(boundedDragX);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    if (!isDragging) return;

    const threshold = 30; // Reduced threshold for easier swiping
    const velocity = Math.abs(dragX);

    // Check if swipe threshold or velocity is met
    if (velocity > threshold && !hasSwiped.current) {
      if (dragX > 0 && currentIndex > 0) {
        handlePrev();
        hasSwiped.current = true;
      } else if (dragX < 0 && currentIndex < totalSlides - 1) {
        handleNext();
        hasSwiped.current = true;
      }
    }

    setDragX(0);
    setIsDragging(false);
  };

  const currentMember = displayMembers[currentIndex];

  return (
    <>
      {/* Only render when TEAM mask has started appearing */}
      {reviewsScrollProgress && reviewsScrollProgress >= 0.75 && (
        <>
          {/* White overlay with TEAM text cutout - reveals team content through the text */}
          {reviewsScrollProgress >= 0.75 && reviewsScrollProgress <= 1.0 && (
            <div
              className="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none"
              style={{
                opacity: (() => {
                  if (reviewsScrollProgress < 0.75) return 0;
                  if (reviewsScrollProgress < 0.82) {
                    return (reviewsScrollProgress - 0.75) / 0.07;
                  }
                  if (reviewsScrollProgress >= 0.94) {
                    return Math.max(0, 1 - ((reviewsScrollProgress - 0.93) / 0.01));
                  }
                  return 1;
                })(),
                touchAction: 'none',
                transform: `translateY(${teamSlideY}vh)`,
                zIndex: teamIsFullyGone ? 40 : 106
              } as React.CSSProperties}
            >
              <svg className="absolute inset-0 w-full h-full" style={{ willChange: 'transform' } as React.CSSProperties}>
                <defs>
                  <mask id="teamTextMaskMobile">
                    <rect x="0" y="0" width="100%" height="100%" fill="white" />
                    <text
                      x={(() => {
                        if (!reviewsScrollProgress || reviewsScrollProgress < 0.75) return "350%";

                        // Calculate dynamic position to center on 'M'
                        const baseFontSize = 120;
                        const baseLetterSpacing = 12;

                        // We need the window width for pixel calculations
                        const vw = typeof window !== 'undefined' ? window.innerWidth : 375;
                        const vCenter = vw / 2;

                        // Current font size based on zoom progress
                        const fontSize = (() => {
                          if (reviewsScrollProgress < 0.90) return baseFontSize;
                          if (reviewsScrollProgress >= 1.0) return 10000;
                          const p = (reviewsScrollProgress - 0.90) / 0.10;
                          return baseFontSize * (1 + (82.33 * p));
                        })();

                        const letterSpacing = (baseLetterSpacing * fontSize) / baseFontSize;
                        const charWidth = fontSize * 0.55; // Typical width factor for Lato Bold
                        const totalCharWidth = charWidth + letterSpacing;

                        // Offset to move 'M' (the 4th letter) to the center.
                        // With text-anchor: middle, the center of the word is at index 1.5.
                        // Center of 'M' is at index 3.0.
                        // Difference is 1.5 character widths.
                        const offset = 1.5 * totalCharWidth;
                        const centeredX = vCenter - offset;

                        if (reviewsScrollProgress < 0.90) {
                          // Slide from right (350% of viewport) to centeredX
                          const startX = vw * 3.5;
                          const p = (reviewsScrollProgress - 0.75) / 0.15;
                          return startX - ((startX - centeredX) * p);
                        }

                        return centeredX;
                      })()}
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="black"
                      fontSize={(() => {
                        const baseSize = 120;
                        if (!reviewsScrollProgress || reviewsScrollProgress < 0.90) return baseSize;
                        if (reviewsScrollProgress >= 1.0) return 10000;

                        // Zoom starts AFTER slide completes (0.90)
                        const progress = (reviewsScrollProgress - 0.90) / 0.10;
                        const scale = 1 + (82.33 * progress);
                        return baseSize * scale;
                      })()}
                      fontFamily="Lato, sans-serif"
                      fontWeight="700"
                      letterSpacing={(() => {
                        const baseFontSize = 120;
                        const baseLetterSpacing = 12;
                        const fontSize = (() => {
                          if (reviewsScrollProgress < 0.90) return baseFontSize;
                          if (reviewsScrollProgress >= 1.0) return 10000;
                          const p = (reviewsScrollProgress - 0.90) / 0.10;
                          return baseFontSize * (1 + (82.33 * p));
                        })();
                        return (baseLetterSpacing * fontSize) / baseFontSize;
                      })()}
                    >
                      TEAM
                    </text>
                  </mask>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" fill="white" mask="url(#teamTextMaskMobile)" />
              </svg>
            </div>
          )}

          {/* Team content - fixed position, overlays on top of Reviews */}
          <motion.div
            className="fixed top-0 left-0 w-full h-screen overflow-hidden"
            style={{
              opacity: teamContentOpacity,
              pointerEvents: (reviewsScrollProgress && reviewsScrollProgress >= 0.95) ? 'auto' : 'none',
              zIndex: teamZIndex,
              transform: `translateY(${teamSlideY}vh)`
            }}
          >
            <div className="absolute inset-0 bg-[#2c4657]" ref={containerRef}>
              {/* Top divider lines */}
              <div className="absolute h-0 left-[24px] top-[100px] w-[calc(50%-36px)]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 351 1">
                  <line stroke="white" strokeOpacity="0.3" x2="100%" y1="0.5" y2="0.5" />
                </svg>
              </div>
              <div className="absolute h-0 right-[24px] top-[100px] w-[calc(50%-36px)]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 351 1">
                  <line stroke="white" strokeOpacity="0.3" x2="100%" y1="0.5" y2="0.5" />
                </svg>
              </div>

              {/* Card slider container - showing 2 members side by side */}
              <div
                className="team-slider-container"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div className="relative w-full h-full overflow-visible">{displayMembers.map((member, index) => {
                  // Calculate position for each slide
                  let xOffset = (index - currentIndex) * 100; // Percentage based on slide index

                  // Apply drag offset only to visible slides
                  if (isDragging && (index === currentIndex || index === currentIndex + 1 || index === currentIndex - 1)) {
                    const dragPercentage = (dragX / window.innerWidth) * 100;
                    xOffset += dragPercentage;
                  }

                  // Determine if slide should be visible
                  const isVisible = index === currentIndex || (index === currentIndex + 1 && index < totalSlides);

                  // Calculate the x position
                  let xPosition = `${xOffset}%`;
                  if (index === currentIndex + 1) {
                    // Do not peek or peek less on small screens to prevent overlap
                    xPosition = isSmallMobile ? `calc(100% + 24px)` : `calc(100% - 24px)`;
                  }

                  return (
                    <motion.div
                      key={member.id}
                      animate={{
                        x: xPosition,
                        opacity: isVisible ? 1 : 0
                      }}
                      transition={{
                        x: {
                          type: "spring",
                          stiffness: isDragging ? 500 : 300,
                          damping: isDragging ? 50 : 30,
                          mass: 0.5
                        },
                        opacity: { duration: 0.2 }
                      }}
                      className="absolute top-0 bottom-0 left-0 right-0"
                      style={{
                        pointerEvents: index === currentIndex ? 'auto' : 'none',
                        willChange: 'transform'
                      }}
                    >
                      {/* Member card with proper padding and responsive layout */}
                      <div className="flex flex-col h-full pl-[24px] pr-[24px] min-w-[280px]">
                        {/* Member name and subtitle */}
                        <div className="flex flex-col gap-[8px] items-start justify-center leading-normal not-italic w-full mb-[16px]">
                          <p className="font-['Lato',sans-serif] font-bold text-[28px] text-white whitespace-nowrap">
                            {member.name}
                          </p>
                          <p className="font-['Lato',sans-serif] font-normal text-[18px] text-[rgba(255,255,255,0.5)] w-full">
                            {member.title}
                          </p>
                        </div>

                        {/* Member photo */}
                        <div className="team-photo-wrapper">
                          <img
                            alt={member.name}
                            src={member.image}
                            loading="lazy"
                          />
                        </div>

                        {/* About and LinkedIn Button Row */}
                        <div className="team-buttons-row">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedMember(member);
                            }}
                            className="team-about-btn"
                          >
                            About {member.name.split(' ')[0]}
                          </button>

                          {member.linkedinUrl && (
                            <a
                              href={member.linkedinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="team-linkedin-btn"
                              aria-label="LinkedIn profile"
                            >
                              <div className="relative shrink-0 size-[20px]" data-name="akar-icons:linkedin-v1-fill">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                                  <g clipPath="url(#clip0_2221_245_new)" id="akar-icons:linkedin-v1-fill_new">
                                    <path clipRule="evenodd" d={svgPaths.p18701100} fill="white" fillRule="evenodd" id="Vector_new" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_2221_245_new">
                                      <rect fill="white" height="14" width="14" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
                </div>

                {/* Bottom dot indicators - sibling of slider container so gap is always consistent */}
                <div className="team-dots">
                  {Array.from({ length: totalSlides }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setDirection(idx > currentIndex ? 1 : -1);
                        setCurrentIndex(idx);
                      }}
                      className={`w-[8px] h-[8px] rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white scale-125' : 'bg-[rgba(255,255,255,0.3)]'
                        }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Read More Popup Overlay - Placed outside the transformed parent to ensure correct center alignment */}
          <AnimatePresence>
            {selectedMember && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[250] flex items-center justify-center p-[24px]"
                style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(23, 40, 52, 0.4)' }}
                onClick={() => setSelectedMember(null)}
              >
                {/* Wrapper: relative so the close button can escape overflow-hidden */}
                <div className="team-popup-wrapper">
                  {/* Close Button — outside the card so drop shadow is not clipped */}
                  <button
                    type="button"
                    onClick={() => setSelectedMember(null)}
                    className="team-popup-close"
                    aria-label="Close"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <g filter="url(#filter0_d_3416_3079)">
                        <rect x="4" width="24" height="24" rx="4" fill="#2EC4B6"/>
                        <path d="M20.8776 16.334C20.9154 16.3692 20.9457 16.4117 20.9667 16.4588C20.9877 16.506 20.999 16.557 20.9999 16.6086C21.0009 16.6602 20.9914 16.7115 20.972 16.7594C20.9527 16.8073 20.9239 16.8508 20.8874 16.8874C20.8508 16.9239 20.8073 16.9527 20.7594 16.972C20.7115 16.9914 20.6602 17.0009 20.6086 16.9999C20.557 16.999 20.506 16.9877 20.4588 16.9667C20.4117 16.9457 20.3692 16.9154 20.334 16.8776L15.9904 12.5346L11.6468 16.8776C11.5739 16.9455 11.4775 16.9825 11.3778 16.9808C11.2782 16.979 11.1831 16.9386 11.1127 16.8682C11.0422 16.7977 11.0018 16.7026 11.0001 16.603C10.9983 16.5033 11.0353 16.4069 11.1032 16.334L15.4462 11.9904L11.1032 7.64682C11.0353 7.57391 10.9983 7.47747 11.0001 7.37783C11.0018 7.27819 11.0422 7.18312 11.1127 7.11265C11.1831 7.04218 11.2782 7.00182 11.3778 7.00006C11.4775 6.9983 11.5739 7.03529 11.6468 7.10323L15.9904 11.4462L20.334 7.10323C20.4069 7.03529 20.5033 6.9983 20.603 7.00006C20.7026 7.00182 20.7977 7.04218 20.8682 7.11265C20.9386 7.18312 20.979 7.27819 20.9808 7.37783C20.9825 7.47747 20.9455 7.57391 20.8776 7.64682L16.5346 11.9904L20.8776 16.334Z" fill="white"/>
                      </g>
                      <defs>
                        <filter id="filter0_d_3416_3079" x="0" y="0" width="32" height="32" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                          <feOffset dy="4"/>
                          <feGaussianBlur stdDeviation="2"/>
                          <feComposite in2="hardAlpha" operator="out"/>
                          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3416_3079"/>
                          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3416_3079" result="shape"/>
                        </filter>
                      </defs>
                    </svg>
                  </button>

                  <motion.div
                    initial={{ scale: 0.95, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 20 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
                    className="team-popup-card"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className="team-popup-name">{selectedMember.name}</h3>

                    <div className="overflow-y-auto pr-2 bio-scrollbar flex-1 pb-[10px] pt-[10px]">
                      <p className="team-popup-bio">
                        {selectedMember.bio}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
}