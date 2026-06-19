import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import imgHandPointing from "figma:asset/afd1672a55f4a23bde9fafacdcef4ae17ef17583.svg";
import imgSwipeLeftLine from "figma:asset/04a052e66c89e43d1744c99791d3a7e71c5f4bc4.svg";
import imgSwipeRightLine from "figma:asset/7b9da65eddff7821c8abb42335243a47a8a55502.svg";
import imgArrowLeftBack from "figma:asset/ff6dd2b4be6368f7b00a933f80d7a0a53258f505.svg";
import imgArrowRightNext from "figma:asset/2dbbabf0da323aa7e01edd231d124e8c72ca5f47.svg";
import imgXClose from "figma:asset/4fd17dade7a6d0b84c0dc070c4a744e6610ce2cd.svg";
import type { Service } from '../utils/servicesApi';
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

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('mobile-tutorial-state-change', { detail: { active: showTutorial } }));
  }, [showTutorial]);

  const touchStart = useRef({ x: 0, y: 0 });
  const touchTime = useRef(0);

  const tutorialShownRef = useRef(false);

  const getTargetScrollY = () => {
    const container = document.getElementById('AboutUsSection');
    if (!container) return window.scrollY;

    const rect = container.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const containerHeight = rect.height;
    const viewportHeight = window.innerHeight;

    // Calculate the exact scroll Y corresponding to scrollProgress = 0.70
    return (containerTop - viewportHeight) + 0.705 * (containerHeight + viewportHeight);
  };

  useEffect(() => {
    if (scrollProgress !== undefined && scrollProgress >= 0.70) {
      // Only trigger once per session (module-level flag resets on page load)
      if (!tutorialShownRef.current && !_tutorialSessionShown) {
        tutorialShownRef.current = true;
        _tutorialSessionShown = true;

        // Immediately halt momentum scroll by locking it to the calculated target
        const lockY = getTargetScrollY();
        window.scrollTo(0, lockY);

        // Trigger right as masking finishes (low delay)
        setTimeout(() => setShowTutorial(true), 50);
      }
    }
  }, [scrollProgress]);

  useEffect(() => {
    if (showTutorial) {
      const lockY = getTargetScrollY();

      document.body.style.overflow = 'hidden';

      const preventDefault = (e: TouchEvent) => {
        // Stop default touch scroll actions on mobile
        e.preventDefault();
      };

      const handleScroll = () => {
        window.scrollTo(0, lockY);
      };

      window.scrollTo(0, lockY);

      document.body.addEventListener('touchmove', preventDefault, { passive: false });
      window.addEventListener('scroll', handleScroll, { passive: false });

      const intervalId = setInterval(() => {
        if (Math.abs(window.scrollY - lockY) > 2) {
          window.scrollTo(0, lockY);
        }
      }, 30);

      return () => {
        document.body.style.overflow = '';
        document.body.removeEventListener('touchmove', preventDefault);
        window.removeEventListener('scroll', handleScroll);
        clearInterval(intervalId);
      };
    }
  }, [showTutorial]);

  useEffect(() => {
    const handleClose = () => {
      _tutorialSessionShown = true;
      tutorialShownRef.current = true;
      setShowTutorial(false);
    };
    window.addEventListener('close-mobile-tutorial', handleClose);
    return () => {
      window.removeEventListener('close-mobile-tutorial', handleClose);
    };
  }, []);

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
      <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-[#2c4657] gap-[20px] pt-[35px]">
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
        <div className="flex-shrink-0 w-full" style={{ height: '30px', marginTop: '30px' }}>
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
                  className="text-white whitespace-normal font-['Lato',sans-serif] leading-tight not-italic text-center px-4"
                  style={{
                    fontWeight: 400,
                    fontSize: currentService.title.length > 24 ? '20px' : (currentService.title.length > 16 ? '22px' : '26px')
                  }}
                >
                  {currentService.title}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Card stack area — swipeable horizontally to change category */}
        <div
          className="w-full relative z-10 flex items-center justify-center"
          style={{ minHeight: 0 }}
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
                      style={{ width: '338px', maxWidth: '88vw', height: '508px' }}
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
                            cardConfig = { top: 20, scale: 0.95, opacity: 0.5, zIndex: 20, blur: 0 };
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
                                      height: '230px',
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
                                {/* Teal numbering circle */}
                                <div className="services-numbering-circle">
                                  {index + 1}
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

                              {/* "Tap to view next card" — absolutely pinned to card bottom, always visible regardless of content length */}
                              {position === 0 && (
                                <p
                                  className="font-lato-regular italic text-center text-[rgba(34,37,38,0.4)]"
                                  style={{
                                    position: 'absolute',
                                    bottom: 14,
                                    left: 0,
                                    right: 0,
                                    fontSize: 12,
                                    lineHeight: '16px',
                                    zIndex: 20,
                                    pointerEvents: 'none',
                                  }}
                                >
                                  Tap to view next card
                                </p>
                              )}
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
        <div className="flex-shrink-0 w-full flex flex-col items-center gap-[16px] pb-0" style={{ marginTop: '12px' }}>
          <div className="content-stretch flex gap-[24px] items-center z-50">
            {/* Counter - shows current card / total cards in current category */}
            <p className="font-['Lato:Regular',sans-serif] leading-[normal] not-italic text-[24px] text-[rgba(255,255,255,0.2)] text-center text-nowrap">
              {currentCardIndex + 1}/{currentService.detailCards.length}
            </p>
          </div>
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
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: 'rgba(16, 28, 36, 0.9)',
              }}
            >
              {/* Center wrapper matching Swiper card dimensions */}
              <div style={{
                position: 'relative',
                width: '338px',
                height: '513px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                pointerEvents: 'none',
              }}>
                {/* Gestures Area (centered in the upper image portion of the card) */}
                <div style={{
                  width: '100%',
                  height: '330px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {/* Step 1: Left/Right swipe */}
                  {tutorialStep === 1 && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      {/* Arrows row */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '4px' }}>
                        {/* Left arrow */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="92" height="23" viewBox="0 0 92 23" fill="none">
                          <path d="M90.5 12.546H92V9.54596H90.5V11.046V12.546ZM0.43934 9.9853C-0.146447 10.5711 -0.146447 11.5208 0.43934 12.1066L9.98528 21.6526C10.5711 22.2383 11.5208 22.2383 12.1066 21.6526C12.6924 21.0668 12.6924 20.117 12.1066 19.5312L3.62132 11.046L12.1066 2.56068C12.6924 1.97489 12.6924 1.02514 12.1066 0.439358C11.5208 -0.146429 10.5711 -0.146429 9.98528 0.439358L0.43934 9.9853ZM90.5 11.046V9.54596H1.5V11.046V12.546H90.5V11.046Z" fill="url(#paint0_linear_3055_336)" />
                          <defs>
                            <linearGradient id="paint0_linear_3055_336" x1="1.5" y1="11.546" x2="90.5" y2="11.546" gradientUnits="userSpaceOnUse">
                              <stop stopColor="white" />
                              <stop offset="1" stopColor="white" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                        </svg>
                        {/* Right arrow */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="92" height="23" viewBox="0 0 92 23" fill="none">
                          <path d="M1.5 12.546H0V9.54596H1.5V11.046V12.546ZM91.5607 9.9853C92.1464 10.5711 92.1464 11.5208 91.5607 12.1066L82.0147 21.6526C81.4289 22.2383 80.4792 22.2383 79.8934 21.6526C79.3076 21.0668 79.3076 20.117 79.8934 19.5312L88.3787 11.046L79.8934 2.56068C79.3076 1.97489 79.3076 1.02514 79.8934 0.439358C80.4792 -0.146429 81.4289 -0.146429 82.0147 0.439358L91.5607 9.9853ZM1.5 11.046V9.54596H90.5V11.046V12.546H1.5V11.046Z" fill="url(#paint0_linear_3055_338)" />
                          <defs>
                            <linearGradient id="paint0_linear_3055_338" x1="90.5" y1="11.546" x2="1.5" y2="11.546" gradientUnits="userSpaceOnUse">
                              <stop stopColor="white" />
                              <stop offset="1" stopColor="white" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                      {/* Animated hand */}
                      <motion.div
                        animate={{ x: [-50, 50, -50] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 80 80" fill="none">
                          <path d="M61.25 28.75C59.3937 28.7478 57.6032 29.4374 56.2281 30.6844C56.1215 29.2893 55.6268 27.9518 54.7998 26.8232C53.9729 25.6945 52.8467 24.8197 51.5486 24.2976C50.2505 23.7755 48.8322 23.6269 47.4541 23.8687C46.0759 24.1104 44.7929 24.7329 43.75 25.6656V13.75C43.75 11.7609 42.9598 9.85322 41.5533 8.4467C40.1468 7.04018 38.2391 6.25 36.25 6.25C34.2609 6.25 32.3532 7.04018 30.9467 8.4467C29.5402 9.85322 28.75 11.7609 28.75 13.75V43.125L25.2344 37.4813C24.2373 35.7594 22.5971 34.5042 20.6746 33.9917C18.752 33.4792 16.7047 33.7514 14.9828 34.7484C13.261 35.7455 12.0057 37.3857 11.4932 39.3082C10.9807 41.2308 11.253 43.2782 12.25 45L13.7125 47.5781C19.1281 57.125 22.7063 63.4375 26.7688 67.6031C31.025 71.9688 35.5813 73.75 42.5 73.75C49.4597 73.7426 56.1321 70.9745 61.0533 66.0533C65.9746 61.1321 68.7426 54.4596 68.75 47.5V36.25C68.75 34.2609 67.9598 32.3532 66.5533 30.9467C65.1468 29.5402 63.2391 28.75 61.25 28.75ZM66.25 47.5C66.2426 53.7966 63.7379 59.8332 59.2856 64.2856C54.8332 68.7379 48.7966 71.2426 42.5 71.25C30 71.25 26.4531 64.975 15.8875 46.3406L14.4219 43.75C13.7782 42.6028 13.6126 41.2482 13.9608 39.9798C14.309 38.7113 15.1431 37.6312 16.2822 36.9734C17.4214 36.3157 18.7738 36.1333 20.0465 36.4659C21.3191 36.7984 22.4095 37.6191 23.0813 38.75C23.0897 38.7618 23.097 38.7743 23.1031 38.7875L28.9406 48.1625C29.0846 48.3924 29.2994 48.5692 29.5527 48.6662C29.806 48.7633 30.084 48.7753 30.3447 48.7005C30.6054 48.6257 30.8347 48.4682 30.998 48.2516C31.1614 48.035 31.2498 47.7712 31.25 47.5V13.75C31.25 12.4239 31.7768 11.1521 32.7145 10.2145C33.6522 9.27678 34.9239 8.75 36.25 8.75C37.5761 8.75 38.8479 9.27678 39.7855 10.2145C40.7232 11.1521 41.25 12.4239 41.25 13.75V35C41.25 35.3315 41.3817 35.6495 41.6161 35.8839C41.8505 36.1183 42.1685 36.25 42.5 36.25C42.8315 36.25 43.1495 36.1183 43.3839 35.8839C43.6183 35.6495 43.75 35.3315 43.75 35V31.25C43.75 29.9239 44.2768 28.6521 45.2145 27.7145C46.1522 26.7768 47.4239 26.25 48.75 26.25C50.0761 26.25 51.3479 26.7768 52.2855 27.7145C53.2232 28.6521 53.75 29.9239 53.75 31.25V37.5C53.75 37.8315 53.8817 38.1495 54.1161 38.3839C54.3505 38.6183 54.6685 38.75 55 38.75C55.3315 38.75 55.6495 38.6183 55.8839 38.3839C56.1183 38.1495 56.25 37.8315 56.25 37.5V36.25C56.25 34.9239 56.7768 33.6521 57.7145 32.7145C58.6522 31.7768 59.9239 31.25 61.25 31.25C62.5761 31.25 63.8479 31.7768 64.7855 32.7145C65.7232 33.6521 66.25 34.9239 66.25 36.25V47.5Z" fill="white" />
                        </svg>
                      </motion.div>
                    </div>
                  )}
                  {/* Step 2: Tap */}
                  {tutorialStep === 2 && (
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
                          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 80 80" fill="none">
                            <path d="M18.7499 23.75C18.7499 19.1087 20.5937 14.6575 23.8756 11.3756C27.1575 8.09374 31.6087 6.25 36.2499 6.25C40.8912 6.25 45.3424 8.09374 48.6243 11.3756C51.9062 14.6575 53.7499 19.1087 53.7499 23.75C53.7499 24.0815 53.6183 24.3995 53.3838 24.6339C53.1494 24.8683 52.8315 25 52.4999 25C52.1684 25 51.8505 24.8683 51.6161 24.6339C51.3816 24.3995 51.2499 24.0815 51.2499 23.75C51.2499 19.7718 49.6696 15.9564 46.8565 13.1434C44.0435 10.3304 40.2282 8.75 36.2499 8.75C32.2717 8.75 28.4564 10.3304 25.6433 13.1434C22.8303 15.9564 21.2499 19.7718 21.2499 23.75C21.2499 24.0815 21.1182 24.3995 20.8838 24.6339C20.6494 24.8683 20.3315 25 19.9999 25C19.6684 25 19.3505 24.8683 19.1161 24.6339C18.8816 24.3995 18.7499 24.0815 18.7499 23.75ZM61.2499 38.75C59.3937 38.7478 57.6032 39.4374 56.2281 40.6844C56.1215 39.2893 55.6267 37.9518 54.7998 36.8232C53.9728 35.6945 52.8466 34.8197 51.5485 34.2976C50.2504 33.7755 48.8321 33.6269 47.454 33.8687C46.0759 34.1104 44.7928 34.7329 43.7499 35.6656V23.75C43.7499 21.7609 42.9598 19.8532 41.5532 18.4467C40.1467 17.0402 38.2391 16.25 36.2499 16.25C34.2608 16.25 32.3532 17.0402 30.9466 18.4467C29.5401 19.8532 28.7499 21.7609 28.7499 23.75V53.125L25.2312 47.4813C24.2103 45.8088 22.5754 44.6024 20.6763 44.12C18.7772 43.6375 16.7647 43.9175 15.0694 44.8999C13.374 45.8823 12.1305 47.4892 11.6047 49.3767C11.079 51.2643 11.3128 53.2826 12.25 55L21.4187 70.625C21.5973 70.884 21.8669 71.0662 22.1739 71.1352C22.4809 71.2041 22.8026 71.1548 23.0748 70.997C23.347 70.8392 23.5497 70.5846 23.6424 70.2839C23.7351 69.9832 23.711 69.6587 23.5749 69.375L14.4156 53.75C13.7525 52.6013 13.573 51.2362 13.9164 49.9551C14.2598 48.674 15.0981 47.5818 16.2468 46.9188C17.3955 46.2557 18.7606 46.0762 20.0417 46.4196C21.3191 46.763 22.415 47.6013 23.0781 48.75L23.0999 48.7875L28.9374 58.1625C29.0808 58.3938 29.2958 58.5721 29.5497 58.6701C29.8036 58.7682 30.0826 58.7807 30.3442 58.7057C30.6059 58.6307 30.8359 58.4724 30.9994 58.2548C31.1628 58.0372 31.2508 57.7722 31.2499 57.5V23.75C31.2499 22.4239 31.7767 21.1521 32.7144 20.2145C33.6521 19.2768 34.9239 18.75 36.2499 18.75C37.576 18.75 38.8478 19.2768 39.7855 20.2145C40.7232 21.1521 41.2499 22.4239 41.2499 23.75V45C41.2499 45.3315 41.3816 45.6495 41.6161 45.8839C41.8505 46.1183 42.1684 46.25 42.4999 46.25C42.8315 46.25 43.1494 46.1183 43.3838 45.8839C43.6182 45.6495 43.7499 45.3315 43.7499 45V41.25C43.7499 39.9239 44.2767 38.6521 45.2144 37.7145C46.1521 36.7768 47.4239 36.25 48.7499 36.25C50.076 36.25 51.3478 36.7768 52.2855 37.7145C53.2232 38.6521 53.7499 39.9239 53.7499 41.25V47.5C53.7499 47.8315 53.8816 48.1495 54.1161 48.3839C54.3505 48.6183 54.6684 48.75 54.9999 48.75C55.3315 48.75 55.6494 48.6183 55.8838 48.3839C56.1183 48.1495 56.2499 47.8315 56.2499 47.5V46.25C56.2499 44.9239 56.7767 43.6521 57.7144 42.7145C58.6521 41.7768 59.9239 41.25 61.2499 41.25C62.576 41.25 63.8478 41.7768 64.7855 42.7145C65.7232 43.6521 66.2499 44.9239 66.2499 46.25V57.5C66.2499 64.5812 63.9031 69.3938 63.8812 69.4406C63.8076 69.5875 63.7637 69.7475 63.752 69.9113C63.7403 70.0752 63.7611 70.2398 63.813 70.3956C63.865 70.5515 63.9471 70.6956 64.0548 70.8197C64.1625 70.9437 64.2936 71.0454 64.4406 71.1188C64.6145 71.2048 64.8059 71.2497 64.9999 71.25C65.2322 71.2502 65.4598 71.1856 65.6575 71.0637C65.8551 70.9417 66.0148 70.767 66.1187 70.5594C66.2249 70.3438 68.7499 65.2062 68.7499 57.5V46.25C68.7499 44.2609 67.9598 42.3532 66.5532 40.9467C65.1467 39.5402 63.2391 38.75 61.2499 38.75Z" fill="white" />
                          </svg>
                        </motion.div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom card — navigation and actions */}
                <div style={{
                  width: '100%',
                  padding: '16px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '16px',
                  zIndex: 10,
                  pointerEvents: 'auto',
                  marginBottom: '10px'
                }}>
                  {/* Instruction text */}
                  <div style={{ textAlign: 'center' }}>
                    {tutorialStep === 1 && (
                      <p style={{ color: 'white', fontSize: '18px', lineHeight: '26px', fontFamily: 'Lato, sans-serif', fontWeight: 400, textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
                        Swipe <span style={{ fontWeight: 700 }}>Left/Right</span> to view next<br />
                        <span style={{ fontWeight: 700 }}>Service cards</span>
                      </p>
                    )}
                    {tutorialStep === 2 && (
                      <p style={{ color: 'white', fontSize: '18px', lineHeight: '26px', fontFamily: 'Lato, sans-serif', fontWeight: 400, textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
                        Tap <span style={{ fontWeight: 700 }}>anywhere on the card</span> to view<br />
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
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3 L5 8 L10 13" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        Previous
                      </button>
                    ) : (
                      <div style={{ width: '80px' }} />
                    )}

                    {/* Dots */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {[1, 2].map(step => (
                        <div key={step} style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: tutorialStep === step ? '#2ec4b6' : 'rgba(255,255,255,0.25)', transition: 'background-color 0.3s' }} />
                      ))}
                    </div>

                    {/* Next / Okay */}
                    {tutorialStep < 2 ? (
                      <button
                        onClick={() => setTutorialStep(prev => prev + 1)}
                        style={{ backgroundColor: 'white', color: '#222526', borderRadius: '8px', padding: '8px 16px', fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', border: 'none', cursor: 'pointer', fontFamily: 'Lato, sans-serif' }}
                      >
                        Next
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 2.5 L9 7 L4 11.5" stroke="#222526" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.5)', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Lato, sans-serif', marginTop: '-4px' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2 L12 12" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round" /><path d="M12 2 L2 12" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round" /></svg>
                    Skip
                  </button>
                </div>
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