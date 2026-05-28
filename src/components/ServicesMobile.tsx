import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import imgVector from "figma:asset/6d6de80792d2de9d2d28717db9e5bf0e0b17e6c0.png";
import imgHandPointing from "figma:asset/afd1672a55f4a23bde9fafacdcef4ae17ef17583.svg";
import imgSwipeLeftLine from "figma:asset/04a052e66c89e43d1744c99791d3a7e71c5f4bc4.svg";
import imgSwipeRightLine from "figma:asset/7b9da65eddff7821c8abb42335243a47a8a55502.svg";
import imgArrowLeftBack from "figma:asset/ff6dd2b4be6368f7b00a933f80d7a0a53258f505.svg";
import imgArrowRightNext from "figma:asset/2dbbabf0da323aa7e01edd231d124e8c72ca5f47.svg";
import imgXClose from "figma:asset/4fd17dade7a6d0b84c0dc070c4a744e6610ce2cd.svg";
import type { Service } from '../utils/servicesApi';
import { ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

// Session flag — resets every page load so tutorial reliably shows
let _tutorialSessionShown = false;

export function ServicesMobile({
  onScrollProgress,
  services,
  scrollProgress,
}: {
  onScrollProgress?: (progress: number) => void;
  services: Service[];
  scrollProgress?: number;
}) {
  const [cardDirection, setCardDirection] = useState(0);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [prevCategoryIndex, setPrevCategoryIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(1);

  const touchStart = useRef({ x: 0, y: 0 });
  const touchTime = useRef(0);

  const tutorialShownRef = useRef(false);

  useEffect(() => {
    if (scrollProgress !== undefined && scrollProgress >= 0.70) {
      // Only trigger once per session (module-level flag resets on page load)
      if (!tutorialShownRef.current && !_tutorialSessionShown) {
        tutorialShownRef.current = true;
        _tutorialSessionShown = true;
        // Delay so the services UI is fully visible first
        setTimeout(() => setShowTutorial(true), 800);
      }
    }
  }, [scrollProgress]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const categoryDirection = currentCategoryIndex >= prevCategoryIndex ? 1 : -1;

  // Show loading state if parent hasn't passed services yet
  const isLoading = !services || services.length === 0;

  const currentService = services[currentCategoryIndex];

  // Category navigation functions using Swiper instance
  const handleNextCategory = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  const handlePrevCategory = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setPrevCategoryIndex(currentCategoryIndex);
    setCurrentCategoryIndex(swiper.activeIndex);
    setCurrentCardIndex(0); // Reset card index inside the new category
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    };
    touchTime.current = Date.now();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!currentService) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStart.current.x - touchEndX;
    const diffY = touchStart.current.y - touchEndY;
    const duration = Date.now() - touchTime.current;

    // Detect Tap
    if (Math.abs(diffX) < 10 && Math.abs(diffY) < 10 && duration < 300) {
      if (currentCardIndex === currentService.detailCards.length - 1) {
        setCardDirection(-1);
        setCurrentCardIndex(0);
      } else {
        handleNextCard();
      }
      return;
    }

    // Detect Swipe Up / Down (vertical)
    const minSwipeDistance = 40;
    if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > minSwipeDistance) {
      if (diffY > 0) {
        handleNextCard();
      } else {
        handlePrevCard();
      }
    }
  };

  // Card navigation - same logic as before
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

  // Helper to format textItalic to highlight "ask away" in teal and underline
  const renderItalicText = (text: string) => {
    if (!text) return null;
    const formattedText = text.replace(
      /ask away/g,
      '<span class="text-[#2ec4b6] underline font-lato-italic italic font-normal">ask away</span>'
    );
    return <span dangerouslySetInnerHTML={{ __html: formattedText }} />;
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
      <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-between bg-[#2c4657] pt-[80px] pb-0">
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

        {/* Category names slider */}
        <div className="flex-shrink-0 w-full" style={{ marginTop: '20px', height: '60px' }}>
          <div className="relative w-full h-full overflow-hidden flex items-center justify-center px-6">
            {/* Active category with slide-in animation */}
            <div className="flex-1 flex justify-center items-center overflow-hidden mx-4">
              <AnimatePresence mode="wait" custom={categoryDirection}>
                <motion.p
                  key={`cat-${currentCategoryIndex}`}
                  custom={categoryDirection}
                  initial={(dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 })}
                  animate={{ opacity: 1, x: 0 }}
                  exit={(dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 })}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className="text-white text-nowrap whitespace-nowrap font-lato-regular leading-[normal] not-italic text-[22px] text-center truncate"
                  style={{ fontWeight: 600 }}
                >
                  {currentService.title}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Card stack area — swipeable horizontally to change category */}
        <div
          className="flex-1 w-full relative z-10 flex items-center justify-center"
          style={{ minHeight: 0, marginTop: '8px', marginBottom: '8px' }}
        >
          {isMounted && (
            <Swiper
              modules={[EffectCoverflow]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              loop={false}
              speed={500}
              coverflowEffect={{
                rotate: 0,
                stretch: -30,
                depth: 150,
                modifier: 1,
                slideShadows: false,
              }}
              onSwiper={(swiper) => {
                setSwiperInstance(swiper);
              }}
              onSlideChange={handleSlideChange}
              className="services-swiper-mobile"
            >
              {services.map((service, categoryIndex) => {
                const isActiveCategory = categoryIndex === currentCategoryIndex;
                const activeCardIdx = isActiveCategory ? currentCardIndex : 0;
                const isMortgageService = service.title.toLowerCase().includes('mortgage') || service.title.toLowerCase().includes('buyer');

                return (
                  <SwiperSlide key={service.id}>
                    {/* Card stack container */}
                    <div
                      className="relative mx-auto"
                      style={{ width: '338px', maxWidth: '88vw', height: '513px' }}
                    >
                      <AnimatePresence initial={false} custom={cardDirection}>
                        {service.detailCards.map((card, index) => {
                          // Calculate position relative to current card
                          let position = (index - activeCardIdx + service.detailCards.length) % service.detailCards.length;

                          let cardConfig: { top: number; scale: number; opacity: number; zIndex: number; blur: number } | null = null;
                          let shouldShow = false; if (position === 0) {
                            cardConfig = { top: 0, scale: 1, opacity: 1, zIndex: 30, blur: 0 };
                            shouldShow = true;
                          } else if (position === 1) {
                            cardConfig = { top: 20, scale: 0.93, opacity: 0.5, zIndex: 20, blur: 0 };
                            shouldShow = true;
                          } else if (position === 2) {
                            cardConfig = { top: 40, scale: 0.87, opacity: 0.3, zIndex: 10, blur: 1 };
                            shouldShow = false;
                          }

                          if (!shouldShow || !cardConfig) return null;
                          const cfg = cardConfig;

                          return (
                            <motion.div
                              key={`${service.id}-card-${card.id}-${activeCardIdx}`}
                              className="absolute bg-white h-full overflow-clip rounded-[24px] w-full left-0 shadow-[0px_36px_52px_-5px_rgba(0,0,0,0.12)]"
                              onTouchStart={position === 0 ? handleTouchStart : undefined}
                              onTouchEnd={position === 0 ? handleTouchEnd : undefined}
                              initial={position === 0 && cardDirection !== 0 ? {
                                y: cardDirection === 1 ? 500 : -500,
                                opacity: 0,
                              } : undefined}
                              animate={{
                                y: 0,
                                top: cfg.top,
                                scale: cfg.scale,
                                opacity: cfg.opacity,
                              }}
                              exit={{
                                y: cardDirection === 1 ? -500 : 500,
                                opacity: 0,
                              }}
                              transition={{
                                duration: 0.7,
                                ease: [0.25, 1, 0.5, 1] // Custom ease-out curve for smooth deceleration
                              }}
                              style={{
                                transformStyle: 'preserve-3d',
                                zIndex: cfg.zIndex,
                                filter: cfg.blur > 0 ? `blur(${cfg.blur}px)` : 'none',
                                transformOrigin: 'bottom center'
                              }}
                            >
                              {/* Background decorative elements - all inside overflow-clip container */}
                              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[24px]">
                                {/* Image */}
                                {card.image && (
                                  <img
                                    alt=""
                                    className="absolute object-cover"
                                    src={card.imagem}
                                    style={{
                                      height: '361px',
                                      left: '0%',
                                      top: '0%',
                                      width: '100%'
                                    }}
                                  />
                                )}
                                {/* White curved ellipse - creates smooth image-to-white transition */}
                                <div className="absolute inset-[35.28%_-35.8%_-3.31%_-35.8%]">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 580.44 656">
                                    <ellipse cx="290.22" cy="328" fill="white" rx="290.22" ry="328" />
                                  </svg>
                                </div>
                                {/* Info Bar - rendered on top of image for the first card only */}
                                {card.image && index === 0 && (
                                  <div className="services-info-bar">
                                    {/* Info Icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-[1px]">
                                      <path d="M7.49935 11.167H8.49935V7.33366H7.49935V11.167ZM8.38135 6.03783C8.48568 5.9346 8.53785 5.80671 8.53785 5.65416C8.53785 5.5016 8.48624 5.37371 8.38302 5.27049C8.27979 5.16738 8.1519 5.11583 7.99935 5.11583C7.84679 5.11583 7.7189 5.16738 7.61568 5.27049C7.51246 5.37371 7.46085 5.5016 7.46085 5.65416C7.46085 5.80671 7.51302 5.9346 7.61735 6.03783C7.72157 6.14105 7.8489 6.19266 7.99935 6.19266C8.14979 6.19266 8.27713 6.14105 8.38135 6.03783ZM8.00052 14.3337C7.12452 14.3337 6.30113 14.1674 5.53035 13.835C4.75957 13.5025 4.08913 13.0514 3.51902 12.4815C2.9489 11.9116 2.49752 11.2414 2.16485 10.471C1.83229 9.70055 1.66602 8.87738 1.66602 8.00149C1.66602 7.12549 1.83224 6.3021 2.16468 5.53133C2.49713 4.76055 2.94829 4.0901 3.51818 3.51999C4.08807 2.94988 4.75824 2.49849 5.52868 2.16583C6.29913 1.83327 7.12229 1.66699 7.99818 1.66699C8.87418 1.66699 9.69757 1.83321 10.4683 2.16566C11.2391 2.4981 11.9096 2.94927 12.4797 3.51916C13.0498 4.08905 13.5012 4.75921 13.8338 5.52966C14.1664 6.3001 14.3327 7.12327 14.3327 7.99916C14.3327 8.87516 14.1665 9.69855 13.834 10.4693C13.5016 11.2401 13.0504 11.9105 12.4805 12.4807C11.9106 13.0508 11.2405 13.5022 10.47 13.8348C9.69957 14.1674 8.8764 14.3337 8.00052 14.3337ZM7.99935 13.3337C9.48824 13.3337 10.7493 12.817 11.7827 11.7837C12.816 10.7503 13.3327 9.48921 13.3327 8.00033C13.3327 6.51144 12.816 5.25033 11.7827 4.21699C10.7493 3.18366 9.48824 2.66699 7.99935 2.66699C6.51046 2.66699 5.24935 3.18366 4.21602 4.21699C3.18268 5.25033 2.66602 6.51144 2.66602 8.00033C2.66602 9.48921 3.18268 10.7503 4.21602 11.7837C5.24935 12.817 6.51046 13.3337 7.99935 13.3337Z" fill="white" />
                                    </svg>
                                    <p className="font-['Lato:Light',sans-serif] text-[12px] leading-[14px] text-white tracking-[0.2px] flex-1">
                                      Your home may be repossessed if you do not keep up with your mortgage repayments
                                    </p>
                                  </div>
                                )}
                              </div>

                              {/* Card content - positioned below the curved image area */}
                              <div className={`services-mobile-card-content ${position !== 0 ? 'back-card' : (index === 0 ? 'first-card-front' : '')}`}>
                                {/* Type: Normal */}
                                {card.type === 'normal' && (
                                  <>
                                    {card.title && (
                                      <p className="font-lato-semibold leading-[26px] text-[18px] services-mobile-card-title hidden">
                                        {card.title}
                                      </p>
                                    )}
                                    {card.description && (
                                      <div
                                        className="font-lato-regular text-[14px] leading-[18px] text-[#222526] w-full desc-content"
                                        dangerouslySetInnerHTML={{ __html: card.description }}
                                      />
                                    )}
                                    {card.textItalic && (
                                      <p className="font-lato-regular leading-[18px] relative shrink-0 text-[14px] w-full italic">
                                        {renderItalicText(card.textItalic)}
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
                                      <p className="font-lato-semibold leading-[18px] text-[18px] services-mobile-card-title">
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
                                      <p className="font-lato-bold text-[18px] leading-[26px] text-[#222526] services-mobile-card-title">
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
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>

        {/* Bottom navigation - changes cards within category */}
        <div className="flex-shrink-0 w-full flex flex-col items-center gap-[16px] pb-0">
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

          {/* Reviews Navigation Button from Figma Design */}
          <button
            onClick={() => {
              document.getElementById('ReviewsSection')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="services-reviews-btn"
            aria-label="Scroll to Reviews"
          >
            <ArrowDown className="size-[16px] text-[#2ec4b6]" strokeWidth={2.5} />
            <span className="font-['Lato',sans-serif] text-[14px] font-semibold tracking-[0.2px] text-white">Reviews</span>
          </button>
        </div>

      </div>

      {/* Tutorial overlay — rendered via portal to bypass all parent stacking contexts */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {showTutorial && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'fixed', inset: 0, zIndex: 999999,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'flex-end',
                backgroundColor: 'rgba(20, 38, 50, 0.55)',
                paddingBottom: '32px',
              }}
            >
              {/* Gesture area — centered over the card stack */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -60%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>

                {/* Step 1: Left/Right swipe */}
                {tutorialStep === 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Arrows row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '4px' }}>
                      {/* Left arrow */}
                      <svg width="90" height="24" viewBox="0 0 90 24" fill="none">
                        <path d="M82 12 L14 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                        <path d="M22 5 L14 12 L22 19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {/* Right arrow */}
                      <svg width="90" height="24" viewBox="0 0 90 24" fill="none">
                        <path d="M8 12 L76 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                        <path d="M68 5 L76 12 L68 19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    {/* Animated hand */}
                    <motion.div
                      animate={{ x: [-50, 50, -50] }}
                      transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                        {/* Pointing finger */}
                        <rect x="31" y="6" width="10" height="30" rx="5" fill="white"/>
                        {/* Palm */}
                        <rect x="16" y="30" width="40" height="26" rx="10" fill="white"/>
                        {/* Finger lines */}
                        <line x1="24" y1="35" x2="24" y2="48" stroke="rgba(44,70,87,0.15)" strokeWidth="1.5" strokeLinecap="round"/>
                        <line x1="36" y1="35" x2="36" y2="48" stroke="rgba(44,70,87,0.15)" strokeWidth="1.5" strokeLinecap="round"/>
                        <line x1="48" y1="35" x2="48" y2="48" stroke="rgba(44,70,87,0.15)" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </motion.div>
                  </div>
                )}

                {/* Step 2: Up/Down swipe */}
                {tutorialStep === 2 && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    {/* Up arrow */}
                    <svg width="24" height="70" viewBox="0 0 24 70" fill="none">
                      <path d="M12 62 L12 10" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M5 18 L12 10 L19 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {/* Animated hand */}
                    <motion.div
                      animate={{ y: [30, -30, 30] }}
                      transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                    >
                      <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                        <rect x="31" y="6" width="10" height="30" rx="5" fill="white"/>
                        <rect x="16" y="30" width="40" height="26" rx="10" fill="white"/>
                        <line x1="24" y1="35" x2="24" y2="48" stroke="rgba(44,70,87,0.15)" strokeWidth="1.5" strokeLinecap="round"/>
                        <line x1="36" y1="35" x2="36" y2="48" stroke="rgba(44,70,87,0.15)" strokeWidth="1.5" strokeLinecap="round"/>
                        <line x1="48" y1="35" x2="48" y2="48" stroke="rgba(44,70,87,0.15)" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </motion.div>
                    {/* Down arrow */}
                    <svg width="24" height="70" viewBox="0 0 24 70" fill="none">
                      <path d="M12 8 L12 60" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M5 52 L12 60 L19 52" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}

                {/* Step 3: Tap */}
                {tutorialStep === 3 && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                    <div style={{ position: 'relative', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {/* Pulse ring */}
                      <motion.div
                        animate={{ scale: [1, 2.2, 1], opacity: [0.7, 0, 0.7] }}
                        transition={{ repeat: Infinity, duration: 1.4, ease: 'easeOut' }}
                        style={{ position: 'absolute', width: '44px', height: '44px', border: '2.5px solid #2ec4b6', borderRadius: '50%' }}
                      />
                      {/* Hand */}
                      <motion.div
                        animate={{ scale: [1, 0.88, 1] }}
                        transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                      >
                        <svg width="64" height="64" viewBox="0 0 72 72" fill="none">
                          <rect x="31" y="6" width="10" height="30" rx="5" fill="white"/>
                          <rect x="16" y="30" width="40" height="26" rx="10" fill="white"/>
                          <line x1="24" y1="35" x2="24" y2="48" stroke="rgba(44,70,87,0.15)" strokeWidth="1.5" strokeLinecap="round"/>
                          <line x1="36" y1="35" x2="36" y2="48" stroke="rgba(44,70,87,0.15)" strokeWidth="1.5" strokeLinecap="round"/>
                          <line x1="48" y1="35" x2="48" y2="48" stroke="rgba(44,70,87,0.15)" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom card — text + navigation */}
              <div style={{ width: '100%', maxWidth: '375px', padding: '0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                {/* Instruction text */}
                <div style={{ textAlign: 'center' }}>
                  {tutorialStep === 1 && (
                    <p style={{ color: 'white', fontSize: '18px', lineHeight: '26px', fontFamily: 'Lato, sans-serif', fontWeight: 400, textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
                      Swipe <span style={{ fontWeight: 700, color: '#2ec4b6' }}>Left/Right</span> to view next<br />
                      <span style={{ fontWeight: 700 }}>Service cards</span>
                    </p>
                  )}
                  {tutorialStep === 2 && (
                    <p style={{ color: 'white', fontSize: '18px', lineHeight: '26px', fontFamily: 'Lato, sans-serif', fontWeight: 400, textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
                      Swipe <span style={{ fontWeight: 700, color: '#2ec4b6' }}>Up/Down</span> to change the<br />
                      <span style={{ fontWeight: 700 }}>content cards</span>
                    </p>
                  )}
                  {tutorialStep === 3 && (
                    <p style={{ color: 'white', fontSize: '18px', lineHeight: '26px', fontFamily: 'Lato, sans-serif', fontWeight: 400, textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
                      Tap <span style={{ fontWeight: 700, color: '#2ec4b6' }}>anywhere on the card</span> to view<br />
                      <span style={{ fontWeight: 700 }}>next content card</span>
                    </p>
                  )}
                </div>

                {/* Navigation row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  {/* Previous */}
                  {tutorialStep > 1 ? (
                    <button
                      onClick={() => setTutorialStep(prev => prev - 1)}
                      style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Lato, sans-serif', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3 L5 8 L10 13" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Previous
                    </button>
                  ) : (
                    <div style={{ width: '80px' }} />
                  )}

                  {/* Dots */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[1, 2, 3].map(step => (
                      <div key={step} style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: tutorialStep === step ? '#2ec4b6' : 'rgba(255,255,255,0.25)', transition: 'background-color 0.3s' }} />
                    ))}
                  </div>

                  {/* Next / Okay */}
                  {tutorialStep < 3 ? (
                    <button
                      onClick={() => setTutorialStep(prev => prev + 1)}
                      style={{ backgroundColor: 'white', color: '#222526', borderRadius: '8px', padding: '8px 16px', fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', border: 'none', cursor: 'pointer', fontFamily: 'Lato, sans-serif' }}
                    >
                      Next
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 2.5 L9 7 L4 11.5" stroke="#222526" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  ) : (
                    <button
                      onClick={() => { localStorage.setItem('hasSeenServicesTutorial', 'true'); setShowTutorial(false); }}
                      style={{ backgroundColor: '#2ec4b6', color: 'white', borderRadius: '8px', padding: '8px 20px', fontSize: '15px', fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'Lato, sans-serif' }}
                    >
                      Okay!
                    </button>
                  )}
                </div>

                {/* Skip */}
                <button
                  onClick={() => { localStorage.setItem('hasSeenServicesTutorial', 'true'); setShowTutorial(false); }}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.5)', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Lato, sans-serif', marginTop: '-8px' }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2 L12 12" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round"/><path d="M12 2 L2 12" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  Skip
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <style>{`
        .desc-content p {
          line-height: 18px;
          margin-bottom: 12px;
        }
        .desc-content p:last-child {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
}