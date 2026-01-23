import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import type { TeamMember } from '../utils/teamApi';
import imgVector from "figma:asset/6d6de80792d2de9d2d28717db9e5bf0e0b17e6c0.png";

// Arrow component for navigation
function NavArrow() {
  return (
    <div className="overflow-clip relative size-[30px]">
      <div className="absolute flex inset-[28.38%_14.25%_28.22%_14.29%] items-center justify-center">
        <div className="flex-none h-[12.964px] rotate-[359.849deg] w-[21.406px]">
          <div className="relative size-full">
            <div className="absolute inset-[-2.07%_-1.25%]">
              <img alt="" className="block max-w-none size-full" height="13.5" src={imgVector} width="21.942" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const hasSwiped = useRef(false);

  // Only show first 3 team members
  const displayMembers = teamMembers.slice(0, 3);
  const totalSlides = 3;

  // Team content should be visible when TEAM text masking starts sliding in (0.76)
  // Fade in from 0.76 to 0.82 for smooth transition
  let teamContentOpacity = 0;
  if (reviewsScrollProgress && reviewsScrollProgress >= 0.76 && reviewsScrollProgress < 0.82) {
    // Fade in from 0.76 to 0.82
    teamContentOpacity = (reviewsScrollProgress - 0.76) / 0.06;
  } else if (reviewsScrollProgress && reviewsScrollProgress >= 0.82) {
    teamContentOpacity = 1;
  }
  
  // Team slides up when Process section appears
  let teamSlideY = 0;
  if (processScrollProgress && processScrollProgress > 0) {
    // Start sliding earlier - use a faster/earlier timing
    // When processScrollProgress is 0.10 (halfway through Process slide-up), Team should start moving
    const slideProgress = Math.min(processScrollProgress / 0.15, 1); // Slide completes by 0.15 instead of 0.20
    teamSlideY = slideProgress * -100;
  }
  
  // Report scroll progress to parent
  useEffect(() => {
    if (onScrollProgress) {
      if (reviewsScrollProgress && reviewsScrollProgress >= 0.98) {
        onScrollProgress(1);
      } else {
        onScrollProgress(0);
      }
    }
  }, [reviewsScrollProgress]); // Remove onScrollProgress from dependencies to prevent infinite loop

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

  // Add touch event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Remove native event listeners since we're using React synthetic events
    return () => {};
  }, [isDragging, dragX, currentIndex]);

  const currentMember = displayMembers[currentIndex];

  return (
    <>
      {/* Only render when Team should be visible */}
      {reviewsScrollProgress && reviewsScrollProgress >= 0.76 && (
        <>
          {/* White overlay with TEAM text cutout - reveals team content through the text */}
          {reviewsScrollProgress >= 0.76 && reviewsScrollProgress < 1.0 && (
            <div 
              className="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none"
              style={{ 
                opacity: reviewsScrollProgress >= 0.995 ? 1 - ((reviewsScrollProgress - 0.995) / 0.005) : 1,
                touchAction: 'none',
                willChange: 'opacity',
                transform: `translateY(${teamSlideY}vh)`,
                zIndex: processScrollProgress && processScrollProgress > 0 ? 40 : 100
              } as React.CSSProperties}
            >
              <svg className="absolute inset-0 w-full h-full" style={{ willChange: 'transform' } as React.CSSProperties}>
                <defs>
                  <mask id="teamTextMaskMobile">
                    <rect x="0" y="0" width="100%" height="100%" fill="white" />
                    <text
                      x={(() => {
                        if (!reviewsScrollProgress || reviewsScrollProgress < 0.76) return "220%";
                        if (reviewsScrollProgress < 0.88) {
                          // Slide from right to center (220% to 50%)
                          const p = (reviewsScrollProgress - 0.76) / 0.12; // 0.88 - 0.76 = 0.12
                          return `${220 - (170 * p)}%`;
                        }
                        // Stay at center during zoom
                        return "50%";
                      })()}
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="black"
                      fontSize={(() => {
                        const baseSize = 200;
                        if (!reviewsScrollProgress || reviewsScrollProgress < 0.88) return baseSize;
                        if (reviewsScrollProgress >= 1.0) return baseSize * 25;
                        
                        // Zoom starts AFTER slide completes (0.88) - simple linear interpolation like SERVICES
                        const progress = (reviewsScrollProgress - 0.88) / (1.0 - 0.88);
                        const scale = 1 + (24 * progress); // 1x to 25x scale
                        return baseSize * scale;
                      })()}
                      fontFamily="Lato, sans-serif"
                      fontWeight="700"
                      letterSpacing="16"
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
              pointerEvents: (reviewsScrollProgress && reviewsScrollProgress >= 1.0) ? 'auto' : 'none',
              zIndex: processScrollProgress && processScrollProgress > 0 ? 50 : 95,
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
                className="absolute left-0 right-5 top-[145px] bottom-[120px] overflow-visible"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ touchAction: 'pan-y' }}
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
                      xPosition = `calc(100% - 24px)`; // Position next card to show larger peek preview
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
                          {/* Line above name - using RGBA for better mobile compatibility */}
                          <div className="w-full h-[1px] bg-[rgba(255,255,255,0.3)] mb-[16px]" style={{ minHeight: '1px' }} />

                          {/* Member name with number on same line */}
                          <div className="flex items-baseline justify-between mb-[24px] min-h-[29px]">
                            <p className="font-['Lato:Bold',sans-serif] leading-[normal] not-italic text-[20px] sm:text-[24px] text-white" style={{ fontWeight: 700 }}>
                              {member.name}
                            </p>
                            <p className="font-['Lato:Bold',sans-serif] leading-[normal] not-italic text-[14px] sm:text-[16px] text-[rgba(255,255,255,0.5)] ml-2">
                              {String(index + 1).padStart(2, '0')}
                            </p>
                          </div>

                          {/* Job title - responsive with proper wrapping */}
                          <p className="font-['Lato:SemiBold',sans-serif] leading-[32px] sm:leading-[38px] not-italic text-[24px] sm:text-[32px] text-[rgba(255,255,255,0.5)] mb-[24px] sm:mb-[32px] max-w-full break-words min-h-[64px] sm:min-h-[76px]" style={{ fontWeight: 600 }}>
                            {member.title}
                          </p>

                          {/* Member photo - responsive with reduced height */}
                          <div className="w-full min-h-[200px] max-h-[260px] h-[30vh] mb-[20px] sm:mb-[24px] overflow-hidden flex-shrink-0">
                            <img 
                              alt={member.name}
                              className="w-full h-full object-cover" 
                              src={member.image}
                            />
                          </div>

                          {/* Bio text - responsive sizing without scrollbar */}
                          <div className="flex-1">
                            <p className="font-['Lato:Regular',sans-serif] leading-[20px] sm:leading-[24px] not-italic text-[12px] sm:text-[14px] text-white tracking-[0.12px] sm:tracking-[0.14px] pr-2">
                              {member.bio}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom navigation */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[40px] flex gap-[24px] items-center z-50">
                {/* Left arrow */}
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className={`content-stretch flex items-center justify-center p-[3px] rounded-[24px] shrink-0 size-[48px] relative transition-opacity duration-200 ${
                    currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
                  }`}
                >
                  <div aria-hidden="true" className="absolute border-[0.75px] border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[24px]" />
                  <div className="flex items-center justify-center relative shrink-0">
                    <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                      <NavArrow />
                    </div>
                  </div>
                </button>
                
                {/* Counter - shows current page / total pages */}
                <p className="font-['Lato:Regular',sans-serif] leading-[normal] not-italic text-[24px] text-[rgba(255,255,255,0.2)] text-center text-nowrap">
                  {currentIndex + 1}/{totalSlides}
                </p>
                
                {/* Right arrow */}
                <div className="flex items-center justify-center relative shrink-0">
                  <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                    <button
                      onClick={handleNext}
                      disabled={currentIndex === totalSlides - 1}
                      className={`content-stretch flex items-center justify-center p-[3px] rounded-[24px] size-[48px] relative transition-opacity duration-200 ${
                        currentIndex === totalSlides - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
                      }`}
                    >
                      <div aria-hidden="true" className="absolute border-[0.75px] border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[24px]" />
                      <div className="flex items-center justify-center relative shrink-0">
                        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                          <NavArrow />
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
}