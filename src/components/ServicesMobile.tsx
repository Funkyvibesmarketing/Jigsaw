import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import imgVector from "figma:asset/6d6de80792d2de9d2d28717db9e5bf0e0b17e6c0.png";
import type { Service } from '../utils/servicesApi';
import { fetchServices } from '../utils/servicesApi';

export function ServicesMobile({ 
  onScrollProgress,
}: { 
  onScrollProgress?: (progress: number) => void;
}) {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cardDirection, setCardDirection] = useState(0);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const cardAreaRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Fetch services data on component mount
  useEffect(() => {
    const loadServices = async () => {
      setIsLoading(true);
      const data = await fetchServices();
      setServices(data);
      setIsLoading(false);
    };
    
    loadServices();
  }, []);

  const currentService = services[currentCategoryIndex];

  // Calculate previous and next service indices
  const prevServiceIndex = (currentCategoryIndex - 1 + services.length) % services.length;
  const nextServiceIndex = (currentCategoryIndex + 1) % services.length;
  const prevService = services[prevServiceIndex];
  const nextService = services[nextServiceIndex];

  // Handle horizontal drag/swipe to change categories with smooth animation
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - touchStartX.current;
    const deltaY = currentY - touchStartY.current;

    // Only allow horizontal drag if it's stronger than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      e.preventDefault();
      // Apply drag with some resistance at the edges
      const resistance = 0.5;
      setDragX(deltaX * resistance);
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (!currentService || !isDragging) return;

    const threshold = 80; // Minimum drag distance to trigger category change

    if (Math.abs(dragX) > threshold) {
      if (dragX > 0) {
        // Dragged right - previous category
        handlePrevCategory();
      } else {
        // Dragged left - next category
        handleNextCategory();
      }
    }

    // Reset drag state
    setDragX(0);
    setIsDragging(false);
  };

  // Add touch event listeners with passive: false
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, dragX, currentService, services]);

  const handleNextCategory = () => {
    if (services.length === 0) return;
    setCurrentCategoryIndex((prev) => (prev + 1) % services.length);
    setCurrentCardIndex(0); // Reset to first card of new category
  };

  const handlePrevCategory = () => {
    if (services.length === 0) return;
    setCurrentCategoryIndex((prev) => (prev - 1 + services.length) % services.length);
    setCurrentCardIndex(0); // Reset to first card of new category
  };

  // Card navigation - same logic as desktop
  const handleNextCard = () => {
    if (!currentService) return;
    if (currentCardIndex < currentService.detailCards.length - 1) {
      setCardDirection(1);
      setCurrentCardIndex(prev => prev + 1);
    }
  };

  const handlePrevCard = () => {
    if (!currentService) return;
    if (currentCardIndex > 0) {
      setCardDirection(-1);
      setCurrentCardIndex(prev => prev - 1);
    }
  };

  // Calculate drag progress for smooth height transitions
  // dragX ranges from negative (left drag) to positive (right drag)
  // Progress: 0 = at rest, 1 = fully dragged to threshold
  const dragProgress = Math.min(Math.abs(dragX) / 160, 1); // 160px = 2x threshold for smoother animation
  
  // Left card grows when dragging right (positive dragX)
  const leftCardScale = dragX > 0 ? 0.95 + (0.05 * (Math.min(dragX / 160, 1))) : 0.95;
  
  // Right card grows when dragging left (negative dragX)
  const rightCardScale = dragX < 0 ? 0.95 + (0.05 * (Math.min(Math.abs(dragX) / 160, 1))) : 0.95;

  if (isLoading || !currentService) {
    return (
      <div className="relative w-full h-screen flex items-center justify-center bg-[#2c4657]">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#2c4657]">
      <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-between bg-[#2c4657] pt-[80px] pb-[20px]">
        {/* Background gradient */}
        <div className="absolute h-[307px] left-1/2 top-[66px] -translate-x-1/2 w-[506px] pointer-events-none">
          <div className="absolute inset-[-19.54%_-11.86%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 626 427">
              <g filter="url(#filter0_f_services_mobile)" id="Ellipse 14">
                <ellipse cx="313" cy="213.5" fill="url(#paint0_radial_services_mobile)" fillOpacity="0.28" rx="253" ry="153.5" />
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="427" id="filter0_f_services_mobile" width="626" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_services_mobile" stdDeviation="30" />
                </filter>
                <radialGradient cx="0" cy="0" gradientTransform="translate(313 213.5) rotate(90) scale(153.5 362.399)" gradientUnits="userSpaceOnUse" id="paint0_radial_services_mobile" r="1">
                  <stop stopColor="#2D85BF" />
                  <stop offset="1" stopColor="#255B7E" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Category names carousel slider */}
        <div className="flex-shrink-0 w-full" style={{ marginTop: '46px', height: '80px' }}>
          <div className="relative w-full h-full overflow-hidden">
            {/* Previous category - left edge, partially visible - clips from LEFT side */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 overflow-hidden flex items-center" style={{ maxWidth: '18%' }}>
              <motion.p
                key={`prev-${prevServiceIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3, scale: 0.85 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="text-white text-nowrap whitespace-nowrap font-lato-regular leading-[normal] not-italic text-[18px] pl-4 overflow-hidden"
                style={{ fontWeight: 400, direction: 'rtl', textAlign: 'left' }}
              >
                {prevService.title}
              </motion.p>
            </div>

            {/* Active category - perfectly centered with more padding */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-[20%]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`current-${currentCategoryIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="text-white text-nowrap whitespace-nowrap font-lato-regular leading-[normal] not-italic text-[24px] text-center"
                  style={{ fontWeight: 600 }}
                >
                  {currentService.title}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Next category - right edge, partially visible - clips from RIGHT side */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 overflow-hidden flex items-center justify-end" style={{ maxWidth: '18%' }}>
              <motion.p
                key={`next-${nextServiceIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3, scale: 0.85 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="text-white text-nowrap whitespace-nowrap font-lato-regular leading-[normal] not-italic text-[18px] pr-4 overflow-hidden text-right"
                style={{ fontWeight: 400 }}
              >
                {nextService.title}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Card stack - swipeable horizontally for categories */}
        <div 
          className="flex-1 w-full touch-none relative flex items-center justify-center gap-[16px]" 
          style={{ 
            perspective: '2000px',
            minHeight: '400px',
            maxHeight: '513px',
            marginTop: '20px',
            marginBottom: '24px',
            paddingLeft: '7.5%',
            paddingRight: '7.5%'
          }}
          ref={containerRef}
        >
          {/* Left preview card - from previous category */}
          {prevService.detailCards.length > 0 && (() => {
            const leftCard = prevService.detailCards[0];
            return (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`left-preview-${prevService.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: 1, 
                    x: isDragging ? dragX : 0,
                    scaleY: isDragging ? leftCardScale : 0.95
                  }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ 
                    duration: 0.4,
                    x: { type: "spring", stiffness: 500, damping: 50 },
                    scaleY: { type: "spring", stiffness: 500, damping: 50 }
                  }}
                  className="absolute bg-white overflow-clip rounded-[24px] top-1/2 -translate-y-1/2"
                  style={{ 
                    width: '338px',
                    maxWidth: '80vw',
                    height: '80%',
                    left: '-75%',
                    zIndex: 1,
                    pointerEvents: 'none',
                    transformOrigin: 'center center'
                  }}
                >
                  {/* Background decorative elements */}
                  <div className="absolute inset-0 overflow-hidden rounded-[24px] z-0">
                    {leftCard.image && (
                      <img 
                        alt="" 
                        className="absolute max-w-none" 
                        src={leftCard.image}
                        style={{
                          height: '51.28%',
                            left: '-75.35%',
                            top: '0.01%',
                            width: '175.54%'
                        }}
                      />
                    )}
                    <div className="absolute inset-[38.4%_-35.86%_-66.28%_-35.86%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 580.44 656">
                        <ellipse cx="290.22" cy="328" fill="white" rx="290.22" ry="328" />
                      </svg>
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="absolute flex flex-col gap-[16px] items-start left-[4.73%] right-[4.73%] text-[#222526] top-[calc(50%+106.5px)] -translate-y-1/2 z-10">
                    {/* Type: Normal */}
                    {leftCard.type === 'normal' && (
                      <>
                        {leftCard.title && (
                          <p className="font-lato-semibold leading-[26px] text-[20px] w-full">
                            {leftCard.title}
                          </p>
                        )}
                        {leftCard.description && (
                          <p className="font-lato-regular leading-[22px] text-[14px] w-full">
                            {leftCard.description}
                          </p>
                        )}
                        {!leftCard.description && leftCard.text && (
                          <p className="font-lato-regular leading-[22px] text-[14px] w-full">
                            {leftCard.text}
                          </p>
                        )}
                      </>
                    )}

                    {/* Type: Bullet */}
                    {leftCard.type === 'bullet' && (
                      <>
                        {leftCard.bulletTitle && (
                          <p className="font-lato-semibold leading-[26px] text-[20px] w-full">
                            {leftCard.bulletTitle}
                          </p>
                        )}
                        {leftCard.bulletPoints && (
                          <ul className="font-lato-regular text-[14px] w-full list-disc pl-[20px]">
                            {leftCard.bulletPoints.map((point, idx) => (
                              <li key={idx} className="leading-[22px] mb-[4px]">
                                {point}
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            );
          })()}

          {/* Center card stack - current category */}
          <motion.div 
            className="w-[94%] max-w-[338px] relative h-full mx-auto"
            ref={cardAreaRef}
            animate={{ x: isDragging ? dragX : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 50 }}
          >
            <AnimatePresence initial={false} custom={cardDirection}>
              {currentService.detailCards.map((card, index) => {
                // Calculate position relative to current card
                let position = (index - currentCardIndex + currentService.detailCards.length) % currentService.detailCards.length;
                
                // Only show current card (0) and next 2 cards behind (1, 2)
                let cardConfig;
                let shouldShow = false;
                
                if (position === 0) {
                  // Front card
                  cardConfig = { top: 0, scale: 1, opacity: 1, zIndex: 30, blur: 0 };
                  shouldShow = true;
                } else if (position === 1) {
                  // First card behind
                  cardConfig = { top: 20, scale: 0.93, opacity: 0.5, zIndex: 20, blur: 0 };
                  shouldShow = true;
                } else if (position === 2) {
                  // Second card behind
                  cardConfig = { top: 40, scale: 0.87, opacity: 0.3, zIndex: 10, blur: 1 };
                  shouldShow = true;
                }

                if (!shouldShow) return null;

                return (
                  <motion.div
                    key={`${currentService.id}-${card.id}-${currentCardIndex}`}
                    className="absolute bg-white h-full overflow-clip rounded-[24px] w-full left-0"
                    initial={position === 0 && cardDirection !== 0 ? {
                      top: 40,
                      scale: 0.87,
                      opacity: 0.3,
                    } : undefined}
                    animate={{
                      top: cardConfig.top,
                      scale: cardConfig.scale,
                      opacity: cardConfig.opacity,
                    }}
                    exit={{
                      top: -30,
                      scale: 1.05,
                      opacity: 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      opacity: { duration: 0.3 }
                    }}
                    style={{
                      transformStyle: 'preserve-3d',
                      zIndex: cardConfig.zIndex,
                      filter: cardConfig.blur > 0 ? `blur(${cardConfig.blur}px)` : 'none'
                    }}
                  >
                    {/* Background decorative elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[24px] z-0">
                      {card.image && (
                        <img 
                          alt="" 
                          className="absolute max-w-none" 
                          src={card.image}
                          style={{
                            height: '51.28%',
                            left: '-75.35%',
                            top: '0.01%',
                            width: '175.54%'
                          }}
                        />
                      )}
                    </div>
                    <div className="absolute inset-[38.4%_-35.86%_-66.28%_-35.86%] z-0">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 580.44 656">
                        <ellipse cx="290.22" cy="328" fill="white" rx="290.22" ry="328" />
                      </svg>
                    </div>

                    {/* Card content */}
                    <div className="absolute flex flex-col gap-[16px] items-start left-[4.73%] right-[4.73%] text-[#222526] top-[calc(50%+106.5px)] -translate-y-1/2 z-10">
                      {/* Type: Normal */}
                      {card.type === 'normal' && (
                        <>
                          {card.title && (
                            <p className="font-lato-semibold leading-[26px] text-[20px] w-full">
                              {card.title}
                            </p>
                          )}
                          {card.description && (
                            <p className="font-lato-regular leading-[22px] text-[14px] w-full">
                              {card.description}
                            </p>
                          )}
                          {!card.description && card.text && (
                            <p className="font-lato-regular leading-[22px] text-[14px] w-full">
                              {card.text}
                            </p>
                          )}
                        </>
                      )}

                      {/* Type: Bullet */}
                      {card.type === 'bullet' && (
                        <>
                          {card.bulletTitle && (
                            <p className="font-lato-semibold leading-[26px] text-[20px] w-full">
                              {card.bulletTitle}
                            </p>
                          )}
                          {card.bulletPoints && (
                            <ul className="font-lato-regular text-[14px] w-full list-disc pl-[20px]">
                              {card.bulletPoints.map((point, idx) => (
                                <li key={idx} className="leading-[22px] mb-[4px]">
                                  {point}
                                </li>
                              ))}
                            </ul>
                          )}
                        </>
                      )}

                      {/* Type: Price */}
                      {card.type === 'price' && card.priceData && (
                        <div className="content-stretch flex gap-[12px] items-start justify-center w-full">
                          {/* New Client Pricing */}
                          <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px relative shrink-0">
                            <p className="font-lato-regular leading-[19px] not-italic text-[14px] text-[rgba(34,37,38,0.5)] w-full">
                              {card.priceData.newClientLabel}
                            </p>
                            <div className="content-stretch flex flex-col gap-[2px] items-start justify-center not-italic text-[#222526] w-full">
                              <p className="font-lato-bold leading-[21px] text-[17px] text-nowrap">
                                {card.priceData.newClientPrice}
                              </p>
                              <p className="font-lato-regular leading-[18px] min-w-full text-[12.5px] w-[min-content]">
                                {card.priceData.newClientDescription}
                              </p>
                            </div>
                          </div>

                          {/* Divider Line */}
                          <div className="h-auto w-[1px] bg-black opacity-20 self-stretch shrink-0"></div>

                          {/* Existing Client Pricing */}
                          <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px shrink-0">
                            <p className="font-lato-regular leading-[19px] not-italic text-[14px] text-[rgba(34,37,38,0.5)] w-full">
                              {card.priceData.existingClientLabel}
                            </p>
                            <div className="content-stretch flex flex-col gap-[2px] items-start not-italic text-[#222526] w-full">
                              <p className="font-lato-bold leading-[21px] text-[17px] w-full">
                                {card.priceData.existingClientPrice}
                              </p>
                              <p className="font-lato-regular leading-[18px] text-[12.5px] w-full">
                                {card.priceData.existingClientDescription}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Right preview card - from next category */}
          {nextService.detailCards.length > 0 && (() => {
            const rightCard = nextService.detailCards[0];
            return (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`right-preview-${nextService.id}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ 
                    opacity: 1, 
                    x: isDragging ? dragX : 0,
                    scaleY: isDragging ? rightCardScale : 0.95
                  }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ 
                    duration: 0.4,
                    x: { type: "spring", stiffness: 500, damping: 50 },
                    scaleY: { type: "spring", stiffness: 500, damping: 50 }
                  }}
                  className="absolute bg-white overflow-clip rounded-[24px] top-1/2 -translate-y-1/2"
                  style={{ 
                    width: '338px',
                    maxWidth: '80vw',
                    height: '80%',
                    right: '-75%',
                    zIndex: 1,
                    pointerEvents: 'none',
                    transformOrigin: 'center center'
                  }}
                >
                  {/* Background decorative elements */}
                  <div className="absolute inset-0 overflow-hidden rounded-[24px] z-0">
                    {rightCard.image && (
                      <img 
                        alt="" 
                        className="absolute max-w-none" 
                        src={rightCard.image}
                        style={{
                          height: '51.28%',
                          left: '-75.35%',
                          top: '0.01%',
                          width: '175.54%'
                        }}
                      />
                    )}
                    <div className="absolute inset-[38.4%_-35.86%_-66.28%_-35.86%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 580.44 656">
                        <ellipse cx="290.22" cy="328" fill="white" rx="290.22" ry="328" />
                      </svg>
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="absolute flex flex-col gap-[16px] items-start left-[4.73%] right-[4.73%] text-[#222526] top-[calc(50%+106.5px)] -translate-y-1/2 z-10">
                    {/* Type: Normal */}
                    {rightCard.type === 'normal' && (
                      <>
                        {rightCard.title && (
                          <p className="font-lato-semibold leading-[26px] text-[20px] w-full">
                            {rightCard.title}
                          </p>
                        )}
                        {rightCard.description && (
                          <p className="font-lato-regular leading-[22px] text-[14px] w-full">
                            {rightCard.description}
                          </p>
                        )}
                        {!rightCard.description && rightCard.text && (
                          <p className="font-lato-regular leading-[22px] text-[14px] w-full">
                            {rightCard.text}
                          </p>
                        )}
                      </>
                    )}

                    {/* Type: Bullet */}
                    {rightCard.type === 'bullet' && (
                      <>
                        {rightCard.bulletTitle && (
                          <p className="font-lato-semibold leading-[26px] text-[20px] w-full">
                            {rightCard.bulletTitle}
                          </p>
                        )}
                        {rightCard.bulletPoints && (
                          <ul className="font-lato-regular text-[14px] w-full list-disc pl-[20px]">
                            {rightCard.bulletPoints.map((point, idx) => (
                              <li key={idx} className="leading-[22px] mb-[4px]">
                                {point}
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            );
          })()}
        </div>

        {/* Bottom navigation - changes cards within category */}
        <div className="flex-shrink-0 w-full flex justify-center items-center pb-[80px]">
          <div className="content-stretch flex gap-[24px] items-center z-50">
            {/* Left arrow */}
            <button
              onClick={handlePrevCard}
              disabled={currentCardIndex === 0}
              className={`content-stretch flex items-center justify-center p-[3px] rounded-[24px] shrink-0 size-[48px] relative transition-opacity duration-200 ${
                currentCardIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
              }`}
            >
              <div aria-hidden="true" className="absolute border-[0.75px] border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[24px]" />
              <div className="flex items-center justify-center relative shrink-0">
                <div className="flex-none rotate-[180deg] scale-y-[-100%]">
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
                </div>
              </div>
            </button>
            
            {/* Counter - shows current card / total cards in current category (same as desktop) */}
            <p className="font-['Lato:Regular',sans-serif] leading-[normal] not-italic text-[24px] text-[rgba(255,255,255,0.2)] text-center text-nowrap">
              {currentCardIndex + 1}/{currentService.detailCards.length}
            </p>
            
            {/* Right arrow */}
            <button
              onClick={handleNextCard}
              disabled={currentCardIndex === currentService.detailCards.length - 1}
              className={`content-stretch flex items-center justify-center p-[3px] rounded-[24px] size-[48px] relative transition-opacity duration-200 ${
                currentCardIndex === currentService.detailCards.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
              }`}
            >
              <div aria-hidden="true" className="absolute border-[0.75px] border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[24px]" />
              <div className="flex items-center justify-center relative shrink-0">
                <div className="flex-none">
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
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}