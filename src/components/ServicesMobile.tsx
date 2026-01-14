import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import imgVector from "figma:asset/6d6de80792d2de9d2d28717db9e5bf0e0b17e6c0.png";
import imgVector1 from "figma:asset/d9d043aba62229fe40aba8743fc6dbfe62b9cdd3.png";
import type { Service, DetailCard } from '../utils/servicesApi';
import { fetchServices } from '../utils/servicesApi';

export function ServicesMobile({ 
  onScrollProgress,
}: { 
  onScrollProgress?: (progress: number) => void;
}) {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [direction, setDirection] = useState(0);
  const [selectedService, setSelectedService] = useState<Service | null>(null); // Initialize with first service
  const [detailCardIndex, setDetailCardIndex] = useState(0);
  const lastScrollTime = useRef(0);
  const cardAreaRef = useRef<HTMLDivElement>(null);

  // Fetch services data on component mount
  useEffect(() => {
    const loadServices = async () => {
      setIsLoading(true);
      const data = await fetchServices();
      setServices(data);
      setIsLoading(false);
      setSelectedService(data[0]); // Initialize with first service
    };
    
    loadServices();
  }, []);

  const handleNext = () => {
    if (selectedService) {
      // Navigate categories in detail view
      setDirection(1);
      const currentServiceIndex = services.findIndex(s => s.id === selectedService?.id);
      const nextServiceIndex = (currentServiceIndex + 1) % services.length;
      setSelectedService(services[nextServiceIndex]);
      setDetailCardIndex(0); // Reset to first card of new category
    }
  };

  const handlePrev = () => {
    if (selectedService) {
      // Navigate categories in detail view
      setDirection(-1);
      const currentServiceIndex = services.findIndex(s => s.id === selectedService?.id);
      const prevServiceIndex = (currentServiceIndex - 1 + services.length) % services.length;
      setSelectedService(services[prevServiceIndex]);
      setDetailCardIndex(0); // Reset to first card of new category
    }
  };

  // Detail View with carousel
  if (selectedService) {
    // Handle touch swipe to navigate cards (mobile only)
    const handleTouchStart = (e: React.TouchEvent) => {
      const touch = e.touches[0];
      const startY = touch.clientY;
      const startTime = Date.now();
      
      const handleTouchMove = (moveEvent: TouchEvent) => {
        moveEvent.preventDefault(); // Prevent scrolling
      };
      
      const handleTouchEnd = (endEvent: TouchEvent) => {
        const endTouch = endEvent.changedTouches[0];
        const deltaY = startY - endTouch.clientY;
        const deltaTime = Date.now() - startTime;
        
        // Only trigger if swipe is fast enough and long enough
        if (Math.abs(deltaY) > 50 && deltaTime < 500) {
          if (deltaY > 0 && detailCardIndex < selectedService.detailCards.length - 1) {
            // Swipe up - next card
            setDirection(1);
            setDetailCardIndex(prev => prev + 1);
          } else if (deltaY < 0 && detailCardIndex > 0) {
            // Swipe down - previous card
            setDirection(-1);
            setDetailCardIndex(prev => prev - 1);
          }
        }
        
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
      
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    };
    
    return (
      <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-transparent">
        <div className="relative w-full h-screen flex flex-col items-center justify-between bg-[#2c4657] pt-[80px] pb-[20px]">
          {/* Background gradient - scaled down for mobile */}
          <div className="absolute h-[307px] left-1/2 top-[66px] -translate-x-1/2 w-[506px] pointer-events-none">
            <div className="absolute inset-[-19.54%_-11.86%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 626 427">
                <g filter="url(#filter0_f_503_477)" id="Ellipse 14">
                  <ellipse cx="313" cy="213.5" fill="url(#paint0_radial_503_477)" fillOpacity="0.28" rx="253" ry="153.5" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="427" id="filter0_f_503_477" width="626" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur_503_477" stdDeviation="30" />
                  </filter>
                  <radialGradient cx="0" cy="0" gradientTransform="translate(313 213.5) rotate(90) scale(153.5 362.399)" gradientUnits="userSpaceOnUse" id="paint0_radial_503_477" r="1">
                    <stop stopColor="#2D85BF" />
                    <stop offset="1" stopColor="#255B7E" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Large title in background */}
          <div className="flex-shrink-0 w-full px-4" style={{ marginTop: '46px' }}>
            <AnimatePresence initial={false} mode="wait">
              <motion.p
                key={selectedService.id}
                initial={{ opacity: 0, y: direction === 1 ? 20 : -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: direction === 1 ? -20 : 20 }}
                transition={{ duration: 0.4 }}
                className="font-['Lato:Regular',sans-serif] leading-[1.2] not-italic text-center"
                style={{ 
                  fontSize: 'clamp(16px, 6vw, 22px)', 
                  whiteSpace: 'nowrap', 
                  color: 'white',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {selectedService.title}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* White content card with carousel */}
          <div 
            className="flex-1 w-[85%] max-w-[300px] touch-none relative" 
            style={{ 
              perspective: '2000px',
              minHeight: '240px',
              maxHeight: '400px',
              marginTop: '8px',
              marginBottom: 'clamp(16px, 2.5vh, 24px)'
            }}
            ref={cardAreaRef}
            onTouchStart={handleTouchStart}
          >
            <AnimatePresence initial={false}>
              {selectedService.detailCards.map((card, index) => {
                // Calculate position relative to current card
                let position = (index - detailCardIndex + selectedService.detailCards.length) % selectedService.detailCards.length;
                
                // Only show current card (0) and next 2 cards behind (1, 2)
                let cardConfig;
                let shouldShow = false;
                
                if (position === 0) {
                  // Front card
                  cardConfig = { top: 0, scale: 1, opacity: 1, zIndex: 30, rotateX: 0 };
                  shouldShow = true;
                } else if (position === 1) {
                  // First card behind
                  cardConfig = { top: 12, scale: 0.95, opacity: 0.6, zIndex: 20, rotateX: 2 };
                  shouldShow = true;
                } else if (position === 2) {
                  // Second card behind
                  cardConfig = { top: 24, scale: 0.9, opacity: 0.3, zIndex: 10, rotateX: 4 };
                  shouldShow = true;
                }

                if (!shouldShow) return null;

                return (
                  <motion.div
                    key={`${selectedService.id}-${card.id}`}
                    className="absolute bg-white h-full overflow-clip rounded-[20px] shadow-[0px_28px_42px_-5px_rgba(0,0,0,0.12)] w-full left-0"
                    initial={position === 0 && direction !== 0 ? {
                      top: 24,
                      scale: 0.9,
                      opacity: 0.3,
                      rotateX: 4
                    } : undefined}
                    animate={{
                      top: cardConfig.top,
                      scale: cardConfig.scale,
                      opacity: cardConfig.opacity,
                      rotateX: cardConfig.rotateX
                    }}
                    exit={{
                      top: -20,
                      scale: 1.05,
                      opacity: 0,
                      rotateX: -3
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 30,
                      opacity: { duration: 0.3 }
                    }}
                    style={{
                      transformStyle: 'preserve-3d',
                      zIndex: cardConfig.zIndex
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
                            height: card.type === 'bullet' ? '79.94%' : '79.94%',
                            left: card.type === 'bullet' ? '-76.13%' : '-76.13%',
                            top: card.type === 'bullet' ? '-13.5%' : '-13.5%',
                            width: card.type === 'bullet' ? '189.47%' : '189.47%'
                          }}
                        />
                      )}
                    </div>
                    <div className="absolute inset-[38.4%_-35.86%_-66.28%_-35.86%] z-0">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 580.44 656">
                        <ellipse cx="290.22" cy="328" fill="white" rx="290.22" ry="328" />
                      </svg>
                    </div>

                    {/* Type: Normal */}
                    {card.type === 'normal' && (
                      <div className="absolute flex flex-col gap-[12px] items-start left-[4.73%] right-[4.73%] text-[#222526] top-[calc(50%+90px)] -translate-y-1/2 z-10">
                        {card.title && (
                          <p className="font-lato-semibold leading-[22px] text-[17px] w-full">
                            {card.title}
                          </p>
                        )}
                        {card.description && (
                          <p className="font-lato-regular leading-[19px] text-[12.5px] w-full">
                            {card.description}
                          </p>
                        )}
                        {/* Fallback to text if no description */}
                        {!card.description && card.text && (
                          <p className="font-lato-regular leading-[19px] text-[12.5px] w-full">
                            {card.text}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Type: Bullet */}
                    {card.type === 'bullet' && (
                      <div className="absolute flex flex-col gap-[12px] items-start left-[4.73%] right-[4.73%] text-[#222526] top-[calc(50%+90px)] -translate-y-1/2 z-10">
                        {card.bulletTitle && (
                          <p className="font-lato-semibold leading-[22px] text-[17px] w-full">
                            {card.bulletTitle}
                          </p>
                        )}
                        {card.bulletPoints && (
                          <ul className="font-lato-regular text-[12.5px] w-full">
                            {card.bulletPoints.map((point, idx) => (
                              <li key={idx} className={`${idx < card.bulletPoints!.length - 1 ? 'mb-[3px]' : ''} ms-[18px]`}>
                                <span className="leading-[19px]">{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}

                    {/* Type: Price */}
                    {card.type === 'price' && card.priceData && (
                      <div className="absolute content-stretch flex gap-[12px] items-start justify-center left-[14px] top-[210px] w-[calc(100%-28px)] z-10">
                        {/* New Client Pricing */}
                        <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px relative self-stretch shrink-0">
                          <p className="font-lato-regular leading-[19px] not-italic relative shrink-0 text-[14px] text-[rgba(34,37,38,0.5)] w-full">
                            {card.priceData.newClientLabel}
                          </p>
                          <div className="content-stretch flex flex-col gap-[2px] items-start justify-center not-italic relative shrink-0 text-[#222526] w-full">
                            <p className="font-lato-bold leading-[21px] relative shrink-0 text-[17px] text-nowrap">
                              {card.priceData.newClientPrice}
                            </p>
                            <p className="font-lato-regular leading-[18px] min-w-full relative shrink-0 text-[12.5px] w-[min-content]">
                              {card.priceData.newClientDescription}
                            </p>
                          </div>
                        </div>

                        {/* Divider Line */}
                        <div className="h-auto w-[1px] bg-black opacity-20 self-stretch shrink-0"></div>

                        {/* Existing Client Pricing */}
                        <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px relative shrink-0">
                          <p className="font-lato-regular leading-[19px] not-italic relative shrink-0 text-[14px] text-[rgba(34,37,38,0.5)] w-full">
                            {card.priceData.existingClientLabel}
                          </p>
                          <div className="content-stretch flex flex-col gap-[2px] items-start not-italic relative shrink-0 text-[#222526] w-full">
                            <p className="font-lato-bold leading-[21px] relative shrink-0 text-[17px] w-full">
                              {card.priceData.existingClientPrice}
                            </p>
                            <p className="font-lato-regular leading-[18px] relative shrink-0 text-[12.5px] w-full">
                              {card.priceData.existingClientDescription}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Navigation with card counter - Bottom Center */}
          <div className="flex-shrink-0 w-full flex justify-center items-center" style={{ marginBottom: 'clamp(20px, 3vh, 30px)' }}>
            <div className="content-stretch flex gap-[20px] items-center z-50" style={{ marginBottom: '50px' }}>
              {/* Left arrow */}
              <button
                onClick={handlePrev}
                className="content-stretch flex items-center justify-center p-[3px] rounded-[20px] shrink-0 size-[44px] relative"
              >
                <div aria-hidden="true" className="absolute border-[0.75px] border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[24px]" />
                <div className="flex items-center justify-center relative shrink-0">
                  <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                    <div className="overflow-clip relative size-[28px]">
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
              
              {/* Counter */}
              <p className="font-['Lato:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[20px] text-[rgba(255,255,255,0.2)] text-center text-nowrap">
                {detailCardIndex + 1}/{selectedService.detailCards.length}
              </p>
              
              {/* Right arrow */}
              <button
                onClick={handleNext}
                className="content-stretch flex items-center justify-center p-[3px] rounded-[20px] size-[44px] relative"
              >
                <div aria-hidden="true" className="absolute border-[0.75px] border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[24px]" />
                <div className="flex items-center justify-center relative shrink-0">
                  <div className="flex-none">
                    <div className="overflow-clip relative size-[28px]">
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

  return null;
}