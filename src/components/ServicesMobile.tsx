import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import imgVector from "figma:asset/6d6de80792d2de9d2d28717db9e5bf0e0b17e6c0.png";
import type { Service } from '../utils/servicesApi';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

export function ServicesMobile({
  onScrollProgress,
  services,
}: {
  onScrollProgress?: (progress: number) => void;
  services: Service[];
}) {
  const [cardDirection, setCardDirection] = useState(0);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [prevCategoryIndex, setPrevCategoryIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isMounted, setIsMounted] = useState(false);

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

        {/* Category names slider with chevrons */}
        <div className="flex-shrink-0 w-full" style={{ marginTop: '20px', height: '60px' }}>
          <div className="relative w-full h-full overflow-hidden flex items-center justify-between px-6">
            {/* Left Category Button */}
            <button
              onClick={handlePrevCategory}
              disabled={swiperInstance ? swiperInstance.isBeginning : true}
              className="text-white opacity-60 disabled:opacity-20 hover:opacity-100 cursor-pointer disabled:cursor-not-allowed p-2 z-50 transition-opacity"
              aria-label="Previous Category"
            >
              <ChevronLeft className="size-[28px]" />
            </button>

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

            {/* Right Category Button */}
            <button
              onClick={handleNextCategory}
              disabled={swiperInstance ? swiperInstance.isEnd : true}
              className="text-white opacity-60 disabled:opacity-20 hover:opacity-100 cursor-pointer disabled:cursor-not-allowed p-2 z-50 transition-opacity"
              aria-label="Next Category"
            >
              <ChevronRight className="size-[28px]" />
            </button>
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
                          let shouldShow = false;

                          if (position === 0) {
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
                              initial={position === 0 && cardDirection !== 0 ? {
                                top: 40,
                                scale: 0.87,
                                opacity: 0.3,
                              } : undefined}
                              animate={{
                                top: cfg.top,
                                scale: cfg.scale,
                                opacity: cfg.opacity,
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
                                zIndex: cfg.zIndex,
                                filter: cfg.blur > 0 ? `blur(${cfg.blur}px)` : 'none'
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
                                {/* Info Bar for Type: Normal - rendered on top of image */}
                                {card.type === 'normal' && (
                                  <div
                                    className="absolute left-[12px] right-[12px] top-[12px] z-10 flex items-start gap-[12px] p-[8px] rounded-[8px] bg-[rgba(0,0,0,0.5)]"
                                    style={{ width: 'calc(100% - 24px)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
                                  >
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
                              <div className="absolute flex flex-col gap-[12px] items-start text-[#222526] z-10" style={{ top: '236px', left: '16px', right: '16px' }}>
                                {/* Type: Normal */}
                                {card.type === 'normal' && (
                                  <>
                                    {card.title && (
                                      <p className="font-lato-semibold leading-[26px] text-[18px] w-full hidden">
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
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
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