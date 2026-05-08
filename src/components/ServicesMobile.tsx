import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import imgVector from "figma:asset/6d6de80792d2de9d2d28717db9e5bf0e0b17e6c0.png";
import type { Service } from '../utils/servicesApi';

// Arrow component for navigation
function NavArrow() {
  return (
    <div className="overflow-clip relative size-[30px]">
      <div className="absolute flex inset-[28.38%_14.25%_28.22%_14.29%] items-center justify-center">
        <div className="flex-none h-[12.964px] rotate-[0deg] w-[21.406px]">
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

export function ServicesMobile({
  onScrollProgress,
  services,
}: {
  onScrollProgress?: (progress: number) => void;
  services: Service[];
}) {
  const [cardDirection, setCardDirection] = useState(0);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const categoryContainerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const hasSwiped = useRef(false);

  // Show loading state if parent hasn't passed services yet
  const isLoading = !services || services.length === 0;

  const currentService = services[currentCategoryIndex];

  // Calculate previous and next service indices
  const prevServiceIndex = (currentCategoryIndex - 1 + services.length) % services.length;
  const nextServiceIndex = (currentCategoryIndex + 1) % services.length;
  const prevService = services[prevServiceIndex];
  const nextService = services[nextServiceIndex];

  // Category navigation functions
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

  // Touch handlers for category swipe
  const handleCategoryTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    hasSwiped.current = false;
    setIsDragging(true);
  };

  const handleCategoryTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - touchStartX.current;
    const deltaY = currentY - touchStartY.current;

    // Detect if horizontal swipe is dominant
    if (Math.abs(deltaX) > 10 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      e.preventDefault();
      e.stopPropagation();

      // Apply drag without boundaries - circular navigation
      setDragX(deltaX);
    }
  };

  const handleCategoryTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const threshold = 30;
    const velocity = Math.abs(dragX);

    // Check if swipe threshold or velocity is met - circular navigation
    if (velocity > threshold && !hasSwiped.current) {
      if (dragX > 0) {
        // Swipe right - go to previous category (wraps around)
        handlePrevCategory();
        hasSwiped.current = true;
      } else if (dragX < 0) {
        // Swipe left - go to next category (wraps around)
        handleNextCategory();
        hasSwiped.current = true;
      }
    }

    setDragX(0);
    setIsDragging(false);
  };

  // Card navigation - same logic as before
  const handleNextCard = () => {
    // Right button (UP arrow) - advances forward, card slides UP
    if (!currentService) return;
    if (currentCardIndex < currentService.detailCards.length - 1) {
      setCardDirection(1);
      setCurrentCardIndex(prev => prev + 1);
    }
  };

  const handlePrevCard = () => {
    // Left button (DOWN arrow) - goes backward, card slides DOWN
    if (!currentService) return;
    if (currentCardIndex > 0) {
      setCardDirection(-1);
      setCurrentCardIndex(prev => prev - 1);
    }
  };

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
        <div className="absolute h-[307px] left-1/2 top-[86px] -translate-x-1/2 w-[506px] pointer-events-none">
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
        <div className="flex-shrink-0 w-full" style={{ marginTop: '20px', height: '60px' }}>
          <div className="relative w-full h-full overflow-hidden">
            {/* Previous category - left edge, partially visible - clips from LEFT side */}
            <div className="hidden absolute left-0 top-1/2 -translate-y-1/2 overflow-hidden flex items-center" style={{ maxWidth: '18%' }}>
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
            <div className="hidden absolute right-0 top-1/2 -translate-y-1/2 overflow-hidden flex items-center justify-end" style={{ maxWidth: '18%' }}>
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
          className="flex-1 w-full relative flex items-center justify-center gap-[10px]"
          style={{
            perspective: '2000px',
            minHeight: '450px',
            maxHeight: '523px',
            marginTop: '5px',
            marginBottom: '30px',
            paddingLeft: '7.5%',
            paddingRight: '7.5%',
            touchAction: 'pan-y'
          }}
          ref={categoryContainerRef}
          onTouchStart={handleCategoryTouchStart}
          onTouchMove={handleCategoryTouchMove}
          onTouchEnd={handleCategoryTouchEnd}
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
                    x: 0,
                    scaleY: 0.95
                  }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className="absolute bg-white overflow-clip rounded-[24px] top-1/2 -translate-y-1/2"
                  style={{
                    width: '338px',
                    maxWidth: '80vw',
                    height: '85%',
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
                          height: '61.28%',
                          left: '-67.35%',
                          top: '-6%',
                          width: '168.54%'
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
                  <div className="absolute flex flex-col gap-[10px] items-start left-[4.73%] right-[4.73%] text-[#222526] top-[calc(50%+106.5px)] -translate-y-1/2 z-10">
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
          <div
            className="w-[94%] max-w-[338px] relative h-full mx-auto"
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
                  shouldShow = false;
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
                      {/* Info Bar for Type: Normal - positioned above image */}
                      {card.type === 'normal' && (
                        <div 
                          className="absolute left-[4.73%] right-[4.73%] top-[16px] z-10 flex items-center gap-[12px] w-[calc(100%-9.46%)] p-[8px]"
                          style={{
                            borderRadius: '8px',
                            background: 'rgba(0, 0, 0, 0.50)',
                            backdropFilter: 'blur(2px)'
                          }}
                        >
                          {/* Info Icon */}
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                            <mask id="mask0_2709_240" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                              <rect width="16" height="16" fill="#D9D9D9"/>
                            </mask>
                            <g mask="url(#mask0_2709_240)">
                              <path d="M7.49935 11.167H8.49935V7.33366H7.49935V11.167ZM8.38135 6.03783C8.48568 5.9346 8.53785 5.80671 8.53785 5.65416C8.53785 5.5016 8.48624 5.37371 8.38302 5.27049C8.27979 5.16738 8.1519 5.11583 7.99935 5.11583C7.84679 5.11583 7.7189 5.16738 7.61568 5.27049C7.51246 5.37371 7.46085 5.5016 7.46085 5.65416C7.46085 5.80671 7.51302 5.9346 7.61735 6.03783C7.72157 6.14105 7.8489 6.19266 7.99935 6.19266C8.14979 6.19266 8.27713 6.14105 8.38135 6.03783ZM8.00052 14.3337C7.12452 14.3337 6.30113 14.1674 5.53035 13.835C4.75957 13.5025 4.08913 13.0514 3.51902 12.4815C2.9489 11.9116 2.49752 11.2414 2.16485 10.471C1.83229 9.70055 1.66602 8.87738 1.66602 8.00149C1.66602 7.12549 1.83224 6.3021 2.16468 5.53133C2.49713 4.76055 2.94829 4.0901 3.51818 3.51999C4.08807 2.94988 4.75824 2.49849 5.52868 2.16583C6.29913 1.83327 7.12229 1.66699 7.99818 1.66699C8.87418 1.66699 9.69757 1.83321 10.4683 2.16566C11.2391 2.4981 11.9096 2.94927 12.4797 3.51916C13.0498 4.08905 13.5012 4.75921 13.8338 5.52966C14.1664 6.3001 14.3327 7.12327 14.3327 7.99916C14.3327 8.87516 14.1665 9.69855 13.834 10.4693C13.5016 11.2401 13.0504 11.9105 12.4805 12.4807C11.9106 13.0508 11.2405 13.5022 10.47 13.8348C9.69957 14.1674 8.8764 14.3337 8.00052 14.3337ZM7.99935 13.3337C9.48824 13.3337 10.7493 12.817 11.7827 11.7837C12.816 10.7503 13.3327 9.48921 13.3327 8.00033C13.3327 6.51144 12.816 5.25033 11.7827 4.21699C10.7493 3.18366 9.48824 2.66699 7.99935 2.66699C6.51046 2.66699 5.24935 3.18366 4.21602 4.21699C3.18268 5.25033 2.66602 6.51144 2.66602 8.00033C2.66602 9.48921 3.18268 10.7503 4.21602 11.7837C5.24935 12.817 6.51046 13.3337 7.99935 13.3337Z" fill="white"/>
                            </g>
                          </svg>
                          <p className="font-lato-regular text-[12px] leading-[16px] text-white flex-1">
                            Your home may be repossessed if you do not keep up with your mortgage repayments
                          </p>
                        </div>
                      )}
                      {card.image && (
                        <img
                          alt=""
                          className="absolute "
                          src={card.imagem}
                          style={{
                            height: '60.28%',
                            left: '0%',
                            top: '0%',
                            width: '100%'
                          }}
                        />
                      )}
                    </div>
                    <div className="absolute inset-[26.4%_-35.86%_-66.28%_-35.86%] z-0">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 580.44 656">
                        <ellipse cx="290.22" cy="328" fill="white" rx="290.22" ry="328" />
                      </svg>
                    </div>

                    {/* Card content */}
                    <div className="absolute flex flex-col gap-[14px] items-start left-[4.73%] right-[4.73%] text-[#222526] top-[calc(50%+86.5px)] -translate-y-1/2 z-10">
                      {/* Type: Normal */}
                      {card.type === 'normal' && (
                        <>
                          {card.title && (
                            <p className="font-lato-semibold leading-[26px] text-[18px] w-full">
                              {card.title}
                            </p>
                          )}
                          {card.description && (
                            <p className="font-lato-regular leading-[18px] text-[14px] w-full" dangerouslySetInnerHTML={{ __html: card.description }}></p>
                          )}
                          {card.textItalic && (
                            <p className="font-lato-regular leading-[18px] relative shrink-0 text-[14px] w-full">
                              <i>{card.textItalic}</i>
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
                            <p className="font-lato-semibold leading-[18px] text-[18px] w-full">
                              {card.bulletTitle}
                            </p>
                          )}
                          {card.bulletSubTitle && (
                            <p className="font-lato-regular leading-[18px] not-italic text-[14px] w-full">
                              {card.bulletSubTitle}
                            </p>
                          )}
                          {card.bulletPoints && (
                            <ul className="font-lato-regular text-[14px] leading-[18px] w-full list-disc pl-[20px]">
                              {card.bulletPoints.map((point, idx) => (
                                <li key={idx} className="leading-[18px] mb-[4px]">
                                  {point}
                                </li>
                              ))}
                            </ul>
                          )}
                          {card.textItalic2 && (
                            <p className="font-lato-regular leading-[18px] relative shrink-0 text-[14px] w-full">
                              <i>{card.textItalic2}</i>
                            </p>
                          )}
                        </>
                      )}

                      {/* Type: Price */}
                      {card.type === 'price' && card.priceData && (
                        <div className="content-stretch flex flex-col justify-center w-full">
                          {/* New Client Pricing */}
                          <div className="w-full flex flex-col gap-[8px]">
                            <p className="font-lato-bold text-[18px] leading-[26px] text-[#222526]">
                              {card.priceData.newClientLabel}
                            </p>
                            {card.priceData.newClientSubLabel && (
                              <p className="font-lato-semibold text-[16px] leading-[16px] text-[rgba(34,37,38,0.7)]">
                                {card.priceData.newClientSubLabel}
                              </p>
                            )}
                            <p className="font-lato-regular text-[14px] leading-[20px] text-[#222526]">
                              {card.priceData.newClientPrice}
                            </p>
                            {card.priceData.existingClientZeroPrice && (
                              <p className="font-lato-bold leading-[16px] not-italic text-[#222526] text-[16px] w-full">
                                {card.priceData.existingClientZeroPrice}
                              </p>
                            )}
                            <p className="font-lato-regular text-[14px] leading-[20px]">
                              {card.priceData.newClientDescription}
                            </p>
                          </div>

                          {/* Divider Line */}
                          <div
                            className="h-[1px] w-full bg-[rgba(34,37,38,0.2)] my-[16px]"
                            style={{
                              backgroundColor: 'rgba(34, 37, 38, 0.2)',
                              height: '1px',
                              width: '100%',
                              margin: '16px 0',
                              display: 'block'
                            }}
                          ></div>

                          {/* Existing Client Pricing */}
                          <div className="w-full flex flex-col gap-[6.4px]">
                            {card.priceData.existingClientLabel && (
                              <p className="font-lato-semibold text-[16px] leading-[16px] text-[rgba(34,37,38,0.7)]">
                                {card.priceData.existingClientLabel}
                              </p>
                            )}
                            <p className="font-lato-regular text-[14px] leading-[18px] text-[#222526]">
                              {card.priceData.existingClientPrice}
                            </p>
                            <p className="font-lato-regular text-[14px] leading-[16px] text-[rgba(34,37,38,0.5)]">
                              <i>{card.priceData.existingClientDescription}</i>
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

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
                    x: 0,
                    scaleY: 0.95
                  }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className="absolute bg-white overflow-clip rounded-[24px] top-1/2 -translate-y-1/2"
                  style={{
                    width: '338px',
                    maxWidth: '80vw',
                    height: '85%',
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
                          height: '61.28%',
                          left: '-67.35%',
                          top: '-6%',
                          width: '168.54%'
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
            {/* Left arrow - pointing UP - advances forward */}
            <button
              onPointerDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleNextCard();
              }}
              disabled={currentCardIndex === currentService.detailCards.length - 1}
              className={`content-stretch flex items-center justify-center p-[3px] rounded-[24px] shrink-0 size-[48px] relative transition-opacity duration-200 touch-manipulation ${currentCardIndex === currentService.detailCards.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
                }`}
              style={{
                cursor: 'pointer',
                pointerEvents: 'auto',
                zIndex: 99999,
                position: 'relative',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
                userSelect: 'none'
              }}
              aria-label="Next card"
            >
              <div aria-hidden="true" className="absolute border-[0.75px] border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[24px]" />
              <div className="flex items-center justify-center relative shrink-0">
                <div className="flex-none rotate-[-90deg]">
                  <div className="overflow-clip relative size-[30px]">
                    <div className="absolute flex inset-[28.38%_14.25%_28.22%_14.29%] items-center justify-center">
                      <div className="flex-none h-[12.964px] rotate-[0deg] w-[21.406px]">
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

            {/* Counter - shows current card / total cards in current category */}
            <p className="font-['Lato:Regular',sans-serif] leading-[normal] not-italic text-[24px] text-[rgba(255,255,255,0.2)] text-center text-nowrap">
              {currentCardIndex + 1}/{currentService.detailCards.length}
            </p>

            {/* Right arrow - pointing DOWN - goes backward */}
            <button
              onPointerDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handlePrevCard();
              }}
              disabled={currentCardIndex === 0}
              className={`content-stretch flex items-center justify-center p-[3px] rounded-[24px] size-[48px] relative transition-opacity duration-200 touch-manipulation ${currentCardIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
                }`}
              style={{
                cursor: 'pointer',
                pointerEvents: 'auto',
                zIndex: 99999,
                position: 'relative',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
                userSelect: 'none'
              }}
              aria-label="Previous card"
            >
              <div aria-hidden="true" className="absolute border-[0.75px] border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[24px]" />
              <div className="flex items-center justify-center relative shrink-0">
                <div className="flex-none rotate-[90deg]">
                  <div className="overflow-clip relative size-[30px]">
                    <div className="absolute flex inset-[28.38%_14.25%_28.22%_14.29%] items-center justify-center">
                      <div className="flex-none h-[12.964px] rotate-[0deg] w-[21.406px]">
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