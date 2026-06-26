import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import imgVector from "figma:asset/d5e8c58984c14c183924583d7a6a35d180f7b988.png";
import imgVector3 from "figma:asset/5aa702b67fe4226d00799fb3446a7e9a9a904d28.png";
import { AnimatedDoubtButton } from './AnimatedDoubtButton';
import type { Service } from '../utils/servicesApi';

// Arrow button component for category navigation (top)
function CategoryArrowButton({ direction, onClick }: { direction: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative content-stretch flex items-center justify-center p-[4px] rounded-full size-[48px] transition-all duration-200 ease-out group overflow-hidden"
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: `
          inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
          inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)
        `
      }}
    >
      {/* Border overlay */}
      <div
        aria-hidden="true"
        className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-full transition-all duration-200 ease-out group-hover:border-[#2ec4b6] group-hover:border-2"
      />

      {/* Hover glow effect */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(46, 196, 182, 0.15) 0%, transparent 70%)'
        }}
      />

      <div className="flex items-center justify-center relative shrink-0 z-10 w-full h-full">
        {direction === 'left' ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="19" viewBox="0 0 30 19" fill="none" className="transition-transform duration-200 group-hover:scale-110">
            <path d="M8.91931 17.7855C8.62522 14.9708 6.52957 9.33734 0.499674 9.32147M8.9648 0.49984C8.6559 3.313 6.53063 8.93535 0.500732 8.91948M4.92212 9.13211L29.0417 9.19559" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1.43 1.43" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="19" viewBox="0 0 30 19" fill="none" className="transition-transform duration-200 group-hover:scale-110">
            <path d="M20.6217 17.7855C20.9158 14.9708 23.0114 9.33734 29.0413 9.32147M20.5762 0.49984C20.8851 3.313 23.0104 8.93535 29.0403 8.91948M24.6189 9.13211L0.499307 9.19559" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1.43 1.43" />
          </svg>
        )}
      </div>
    </button>
  );
}

// Arrow button component for card navigation (bottom)
function CardArrowButton({ direction, onClick, disabled }: { direction: 'left' | 'right'; onClick: () => void; disabled: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center rounded-full size-[64px] border border-[rgba(255,255,255,0.3)] transition-all duration-200 ease-out ${disabled ? 'opacity-30 cursor-not-allowed' : 'hover:border-[#2ec4b6] hover:bg-[rgba(46,196,182,0.1)]'
        }`}
    >
      {/* Left arrow points UP, Right arrow points DOWN */}
      <div className="overflow-clip relative size-[40px]">
        <div className="absolute flex inset-[28.38%_14.25%_28.22%_14.29%] items-center justify-center">
          <div className={`flex-none h-[17.286px] w-[28.542px] ${direction === 'left' ? 'rotate-[-90deg]' : 'rotate-[90deg]'}`}>
            <div className="relative size-full">
              <div className="absolute inset-[-2.89%_-1.75%]">
                <img alt="" className="block max-w-none size-full" height="18.286" src={imgVector3} width="29.542" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

export function Services({
  scrollProgress,
  services,
  reviewsScrollProgress
}: {
  scrollProgress: number;
  services: Service[];
  reviewsScrollProgress?: number;
}) {
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [detailCardIndex, setDetailCardIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [navigationSource, setNavigationSource] = useState<'category' | 'card'>('category');
  const containerRef = useRef<HTMLDivElement>(null);
  const activeCategoryRef = useRef<HTMLDivElement>(null);
  const [activeCategoryWidth, setActiveCategoryWidth] = useState(0);
  const isScrollingRef = useRef(false);
  const cardStackRef = useRef<HTMLDivElement>(null);
  // Refs to hold live state for the stable wheel listener
  const detailCardIndexRef = useRef(0);
  const currentServiceRef = useRef(services[0]);

  const width = window.innerWidth;
  const height = window.innerHeight;
  let scale = 0.72;
  if (width >= 768) {
    scale = 0.82;
  }

  //console.log('Viewport size:', width, 'x', height);

  // Check if mobile for conditional slide-up behavior
  const [isMobileView, setIsMobileView] = useState(false);
  const [isModerateZoomedOut, setIsModerateZoomedOut] = useState(window.innerWidth >= 1921 && window.innerWidth < 3000);
  const [isExtremeZoomedOut, setIsExtremeZoomedOut] = useState(window.innerWidth >= 3000);

  if ((isModerateZoomedOut || isExtremeZoomedOut) && width >= 768) {
    scale = 0.96;
  }

  // Define currentService and related indices BEFORE using them in useEffect
  const currentService = services[currentServiceIndex];
  const isMortgageService = currentService.title.toLowerCase().includes('mortgage') || currentService.title.toLowerCase().includes('buyer');
  const prevServiceIndex = (currentServiceIndex - 1 + services.length) % services.length;
  const nextServiceIndex = (currentServiceIndex + 1) % services.length;

  // Keep refs in sync with state for use in stable wheel listener
  detailCardIndexRef.current = detailCardIndex;
  currentServiceRef.current = currentService;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768);
      setIsModerateZoomedOut(window.innerWidth >= 1921 && window.innerWidth < 3000);
      setIsExtremeZoomedOut(window.innerWidth >= 3000);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Measure active category width
  useEffect(() => {
    if (activeCategoryRef.current) {
      setActiveCategoryWidth(activeCategoryRef.current.offsetWidth);
    }
  }, [currentServiceIndex, currentService]);

  // Visibility and positioning based on scroll progress
  // Start fading in during mask zoom (0.55) so content is visible through the cutout immediately
  const servicesSectionOpacity = (() => {
    if (scrollProgress < 0.55) return 0;
    if (scrollProgress < 0.56) {
      // Very quick fade in from 0.55 to 0.56 to match solid text fade out
      const progress = (scrollProgress - 0.55) / 0.01;
      return progress;
    }
    return 1;
  })();
  // Enable pointer events right after mask reveal completes (0.68)
  const servicesSectionPointerEvents = scrollProgress >= 0.69 ? 'auto' : 'none';


  // Category navigation (top arrows)
  const handleCategoryPrev = () => {
    setDirection('right'); // Left arrow: cards move from left to right
    setCurrentServiceIndex(prevServiceIndex);
    setDetailCardIndex(0); // Reset to first card of new category
    setNavigationSource('category');
  };

  const handleCategoryNext = () => {
    setDirection('left'); // Right arrow: cards move from right to left
    setCurrentServiceIndex(nextServiceIndex);
    setDetailCardIndex(0); // Reset to first card of new category
    setNavigationSource('category');
  };

  // Card navigation (bottom arrows)
  const handleCardPrev = () => {
    // Right button (DOWN arrow) - goes backward, card slides DOWN
    if (detailCardIndex > 0) {
      setDirection('right'); // Cards slide DOWN
      setDetailCardIndex(prev => prev - 1);
      setNavigationSource('card');
    }
  };

  const handleCardNext = () => {
    // Left button (UP arrow) - advances forward, card slides UP
    setDirection('left'); // Cards slide UP
    setDetailCardIndex(prev => (prev + 1) % currentService.detailCards.length);
    setNavigationSource('card');
  };


  // Stable wheel listener - reads live state via refs, never needs to be re-registered
  useEffect(() => {
    const stack = cardStackRef.current;
    if (!stack) return;

    const onWheel = (e: WheelEvent) => {
      // Always prevent page scroll when mouse is over the card stack
      e.preventDefault();

      if (isScrollingRef.current) return;

      const idx = detailCardIndexRef.current;
      const svc = currentServiceRef.current;

      if (Math.abs(e.deltaY) > 20) {
        if (e.deltaY > 0) {
          // Scroll down -> advance to next card
          if (idx < svc.detailCards.length - 1) {
            setDirection('left');
            setDetailCardIndex(prev => prev + 1);
            setNavigationSource('card');
            isScrollingRef.current = true;
            setTimeout(() => { isScrollingRef.current = false; }, 800);
          }
        } else {
          // Scroll up -> go to previous card
          if (idx > 0) {
            setDirection('right');
            setDetailCardIndex(prev => prev - 1);
            setNavigationSource('card');
            isScrollingRef.current = true;
            setTimeout(() => { isScrollingRef.current = false; }, 800);
          }
        }
      }
    };

    stack.addEventListener('wheel', onWheel, { passive: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => stack.removeEventListener('wheel', onWheel);
  }, []); // Empty deps: listener is set up once and reads state via refs

  const currentCard = currentService.detailCards[detailCardIndex];

  // For preview cards (left and right):
  // - Left card: always shows first card of the left/previous category
  // - Right card: always shows first card of the right/next category
  // - These only change when category changes (top navigation)
  const prevCard = services[prevServiceIndex].detailCards.length > 0
    ? services[prevServiceIndex].detailCards[0] // First card of left category
    : null;
  const nextCard = services[nextServiceIndex].detailCards.length > 0
    ? services[nextServiceIndex].detailCards[0] // First card of right category
    : null;

  // Unified animation variants
  const mainVariants = {
    enter: ({ direction, source }: { direction: 'left' | 'right'; source: 'category' | 'card' }) => {
      if (source === 'category') {
        return {
          x: direction === 'left' ? 600 : -600,
          y: 0,
          opacity: 0,
          scale: 0.9,
          rotateX: 0,
          zIndex: 1
        };
      } else {
        // Card navigation (vertical)
        // Left (Next/Up) -> Enter from Bottom (y=500)
        // Right (Prev/Down) -> Enter from Top (y=-500)
        return {
          x: 0,
          y: direction === 'left' ? 500 : -500,
          opacity: 0,
          scale: 0.9,
          rotateX: direction === 'left' ? 15 : -15,
          zIndex: 1
        };
      }
    },
    center: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      zIndex: 10
    },
    exit: ({ direction, source }: { direction: 'left' | 'right'; source: 'category' | 'card' }) => {
      if (source === 'category') {
        return {
          x: direction === 'left' ? -600 : 600,
          y: 0,
          opacity: 0,
          scale: 0.9,
          rotateX: 0,
          zIndex: 1
        };
      } else {
        // Card navigation (vertical)
        // Left (Next/Up) -> Exit to Top (y=-500)
        // Right (Prev/Down) -> Exit to Bottom (y=500)
        return {
          x: 0,
          y: direction === 'left' ? -500 : 500,
          opacity: 0,
          scale: 0.9,
          rotateX: direction === 'left' ? -15 : 15,
          zIndex: 1
        };
      }
    }
  };

  // Animation variants for back card - clearer stack effect
  const backCardVariants = {
    // Hidden behind the main card
    hidden: {
      opacity: 0,
      y: 120,
      scale: 0.85,
      zIndex: 1
    },
    // Visible at back position
    atBack: {
      opacity: 0.4,
      y: 120,
      scale: 0.85,
      zIndex: 1
    }
  };

  // Get the next card in the stack for back card display
  const backCardIndex = detailCardIndex < currentService.detailCards.length - 1
    ? detailCardIndex + 1
    : 0; // Loop to first card
  const backCard = currentService.detailCards[backCardIndex];

  // Calculate dynamic positioning for left/right categories based on active category width
  // Minimum gap between active category and adjacent categories
  const minGap = 60; // 60px gap
  const halfActiveCategoryWidth = activeCategoryWidth / 2;
  const leftCategoryRight = `calc(50% - ${halfActiveCategoryWidth + minGap}px)`;
  const rightCategoryLeft = `calc(50% + ${halfActiveCategoryWidth + minGap}px)`;

  if (scrollProgress < 0.55) return null;

  return (
    <motion.div
      ref={containerRef}
      className={`absolute inset-0 z-20 bg-[#2c4657] pointer-events-auto overflow-hidden ${isModerateZoomedOut ? 'services-moderate-zoom-out' : ''} ${isExtremeZoomedOut ? 'services-extreme-zoom-out' : ''}`}
      style={{
        opacity: servicesSectionOpacity,
        pointerEvents: servicesSectionPointerEvents,
        // Only start sliding up after mask animation completes (scrollProgress >= 0.9) on DESKTOP
        // AND Reviews section has started significantly (reviewsScrollProgress > 0.15)
        // On mobile, don't apply slide-up animation
        y: !isMobileView && reviewsScrollProgress && reviewsScrollProgress > 0.15 && scrollProgress >= 0.9
          ? `${-100 * Math.min((reviewsScrollProgress - 0.15) * 20, 1)}%`
          : 0
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Background gradient */}
      <div className="absolute h-[544px] left-[calc(50%+1px)] top-[-83px] translate-x-[-50%] w-[1296px] pointer-events-none">
        <div className="absolute inset-[-30.15%_-12.65%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1624 872">
            <g filter="url(#filter0_f_363_104)">
              <ellipse cx="812" cy="436" fill="url(#paint0_radial_363_104)" fillOpacity="0.28" rx="648" ry="272" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="872" id="filter0_f_363_104" width="1624" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_363_104" stdDeviation="82" />
              </filter>
              <radialGradient cx="0" cy="0" gradientTransform="translate(812 436) rotate(90) scale(272 928.2)" gradientUnits="userSpaceOnUse" id="paint0_radial_363_104" r="1">
                <stop stopColor="#2D85BF" />
                <stop offset="0.2" stopColor="#2A7DB5" />
                <stop offset="0.4" stopColor="#2874AA" />
                <stop offset="0.6" stopColor="#266C9F" />
                <stop offset="0.8" stopColor="#256490" />
                <stop offset="1" stopColor="#255B7E" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Category Carousel - Desktop Only */}
      <div className="services-desktop-category-bar hidden md:block absolute left-0 top-[50px] z-50 w-full px-8">
        <div className="relative flex items-center justify-center w-full max-w-[1600px] mx-auto h-[60px] gap-[64px]">
          {/* Left - Previous Category Name */}
          <div className="flex-1 flex justify-end items-center h-full">
            <p
              className="services-side-category services-side-category-left font-lato-regular text-[32px] text-[rgba(255,255,255,0.4)] cursor-pointer transition-all hover:text-[rgba(255,255,255,0.8)] whitespace-nowrap overflow-hidden text-ellipsis max-w-[350px] text-right"
              onClick={handleCategoryPrev}
            >
              {services[prevServiceIndex].title}
            </p>
          </div>

          {/* Center - Active Category Navigation */}
          <div className="services-active-category-wrap flex items-center justify-center gap-6 shrink-0">
            {/* Active Category Name */}
            <div ref={activeCategoryRef} className="px-4">
              <p className="services-active-category-title font-lato-regular text-[60px] text-white text-center whitespace-nowrap">
                {currentService.title}
              </p>
            </div>
          </div>

          {/* Right - Next Category Name */}
          <div className="flex-1 flex justify-start items-center h-full">
            <p
              className="services-side-category services-side-category-right font-lato-regular text-[32px] text-[rgba(255,255,255,0.4)] cursor-pointer transition-all hover:text-[rgba(255,255,255,0.8)] whitespace-nowrap overflow-hidden text-ellipsis max-w-[350px] text-left"
              onClick={handleCategoryNext}
            >
              {services[nextServiceIndex].title}
            </p>
          </div>
        </div>
      </div>

      {/* Card Stack - Desktop Only */}
      <div
        ref={cardStackRef}
        data-scroll-lock
        data-lenis-prevent
        className="services-desktop-card-stack hidden md:block absolute left-1/2 top-1/2 z-10"
        style={{
          transform: 'translate(-50%, -50%) scale(' + scale + ')'
        }}
        onMouseEnter={() => window.dispatchEvent(new Event('lenisStop'))}
        onMouseLeave={() => window.dispatchEvent(new Event('lenisStart'))}
        onWheel={(e) => {
          if (isScrollingRef.current) return;
          const idx = detailCardIndexRef.current;
          const svc = currentServiceRef.current;
          if (Math.abs(e.deltaY) > 20) {
            if (e.deltaY > 0 && idx < svc.detailCards.length - 1) {
              setDirection('left');
              setDetailCardIndex(prev => prev + 1);
              setNavigationSource('card');
              isScrollingRef.current = true;
              setTimeout(() => { isScrollingRef.current = false; }, 800);
            } else if (e.deltaY < 0 && idx > 0) {
              setDirection('right');
              setDetailCardIndex(prev => prev - 1);
              setNavigationSource('card');
              isScrollingRef.current = true;
              setTimeout(() => { isScrollingRef.current = false; }, 800);
            }
          }
        }}
      >
        {/* Back Card (furthest back, center-bottom) */}
        <motion.div
          key={`back-card-static-${currentService.id}`}
          className="services-back-card absolute bg-white h-[473px] left-[calc(50%-0.27px)] overflow-hidden rounded-[33.846px] top-[calc(50%+92.5px)] translate-x-[-50%] translate-y-[-50%] w-[811.462px] pointer-events-none opacity-30"
        >
          {/* Decorative background circle */}
          <div className="absolute inset-[-40.07%_36.39%_-31.48%_-36.39%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 811.462 811.462">
              <circle cx="405.731" cy="405.731" fill="white" r="405.731" />
            </svg>
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={`back-text-${currentService.id}-${backCardIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute font-lato-regular inset-[11.45%_42.44%_69.1%_4.17%] leading-[30.462px] not-italic text-[#222526] text-[23.692px]"
            >
              {backCard.text}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Left Preview Card */}
        {prevCard && (
          <AnimatePresence initial={false}>
            <motion.div
              key={navigationSource === 'card' ? `left-static-${currentService.id}` : `left-card-${currentService.id}-${detailCardIndex - 1}`}
              initial={navigationSource === 'category' ? { opacity: 0, x: direction === 'right' ? -100 : 0, scale: 0.95 } : false}
              animate={{ opacity: 0.5, x: 0, scale: 1 }}
              exit={navigationSource === 'category' ? { opacity: 0, x: direction === 'right' ? 0 : -100, scale: 0.95 } : false}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="services-preview-card services-preview-card-left absolute bg-white h-[318px] left-[calc(50%-830px)] overflow-hidden rounded-[22.755px] top-[calc(50%+25.5px)] translate-x-[-50%] translate-y-[-50%] w-[545.549px] cursor-pointer"
              whileHover={{ scale: 1.02, opacity: 0.7 }}
              onClick={handleCategoryPrev}
            >
              {/* Decorative background */}
              <div className="absolute" style={{ inset: prevCard.imageInset || '-107.69% -45.15% -64.94% 19.5%' }}>
                <img alt="" className="block max-w-none size-full" height="866.962" src={prevCard.image} width="685.492" />
              </div>
              <div className="absolute inset-[-40.07%_36.39%_-31.48%_-36.39%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 545.549 545.549">
                  <circle cx="272.775" cy="272.775" fill="white" r="272.775" />
                </svg>
              </div>

              {/* Content - scaled down version of main card */}
              <div className="relative z-10 h-full">
                {/* Type: Normal */}
                {prevCard.type === 'normal' && (
                  <div className="absolute content-stretch flex flex-col gap-[14px] items-start left-[23px] not-italic text-[#222526] top-[34px] w-[290px]">
                    {prevCard.title && (
                      <p className="font-lato-semibold leading-[20px] relative shrink-0 text-[16px] w-full">
                        {prevCard.title}
                      </p>
                    )}

                    {prevCard.description && (
                      <p className="font-lato-regular leading-[16px] relative shrink-0 text-[11.5px] w-full" dangerouslySetInnerHTML={{ __html: prevCard.description }}>
                      </p>
                    )}

                    {!prevCard.description && prevCard.text && (
                      <p className="font-lato-regular leading-[16px] relative shrink-0 text-[11.5px] w-full">
                        {prevCard.text}
                      </p>
                    )}

                    {prevCard.textItalic && (
                      <p className="font-lato-regular leading-[16px] relative shrink-0 text-[11.5px] w-full">
                        <i>{prevCard.textItalic}</i>
                      </p>
                    )}
                  </div>
                )}

                {/* Type: Bullet */}
                {prevCard.type === 'bullet' && (
                  <div className="absolute left-[23px] top-[34px] flex flex-col gap-[14px] items-start w-[290px] text-[#222526]">
                    <p className="font-lato-semibold leading-[20px] not-italic text-[16px] w-full">
                      {prevCard.bulletTitle}
                    </p>
                    <ul className="block font-lato-regular leading-[0] text-[11.5px] w-full list-disc pl-[17px]">
                      {prevCard.bulletPoints?.map((point, index) => (
                        <li key={index} className="mb-[9px] last:mb-0">
                          <span className="leading-[16px]">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Type: Price */}
                {prevCard.type === 'price' && prevCard.priceData && (
                  <div className="absolute left-[23px] top-[46px] flex flex-col gap-[23px] items-start w-[290px]">
                    <div className="content-stretch flex flex-col gap-[14px] items-start w-full">
                      <p className="font-lato-regular leading-[20px] not-italic text-[#222526] text-[11.5px] w-full">
                        {prevCard.priceData.newClientLabel}
                      </p>
                      <div className="content-stretch flex flex-col gap-[7px] items-start w-full">
                        <p className="font-lato-bold leading-[16px] text-[#222526] text-[23px] w-full">
                          {prevCard.priceData.newClientPrice}
                        </p>
                        <p className="font-lato-regular leading-[20px] text-[11.5px] text-[rgba(34,37,38,0.5)] w-full">
                          {prevCard.priceData.newClientDescription}
                        </p>
                      </div>
                    </div>

                    <div className="h-0 w-full relative">
                      <div className="absolute inset-[-1px_0_0_0]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 290 1">
                          <line stroke="black" strokeOpacity="0.25" x2="290" y1="0.5" y2="0.5" />
                        </svg>
                      </div>
                    </div>

                    <div className="content-stretch flex flex-col gap-[14px] items-start w-full">
                      <p className="font-lato-regular leading-[20px] not-italic text-[#222526] text-[11.5px] w-full">
                        {prevCard.priceData.existingClientLabel}
                      </p>
                      <div className="content-stretch flex flex-col gap-[7px] items-start w-full">
                        <p className="font-lato-bold leading-[16px] text-[#222526] text-[23px] w-full">
                          {prevCard.priceData.existingClientPrice}
                        </p>
                        <p className="font-lato-regular leading-[20px] text-[11.5px] text-[rgba(34,37,38,0.5)] w-full">
                          {prevCard.priceData.existingClientDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Main Card (front center) */}
        <AnimatePresence initial={false} custom={{ direction, source: navigationSource }}>
          <motion.div
            key={`main-card-${currentService.id}-${detailCardIndex}`}
            custom={{ direction, source: navigationSource }}
            initial="enter"
            animate="center"
            exit="exit"
            variants={mainVariants}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="services-main-card absolute bg-white h-[559px] left-[calc(50%+0.5px)] overflow-hidden rounded-[40px] top-[calc(50%+25.5px)] translate-x-[-50%] translate-y-[-50%] w-[959px]"
            style={navigationSource === 'card' ? {
              transformOrigin: 'center center'
            } : undefined}
          >
            {/* Decorative background */}
            <div className="absolute" style={{ inset: currentCard.imageInset || '-107.69% -45.15% -64.94% 19.5%' }}>
              <img alt="" className="block max-w-none size-full" height="1524" src={currentCard.image} width="1205" />
            </div>
            <div className="absolute inset-[-30.07%_30.39%_-31.48%_-36.39%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 959 959">
                <circle cx="479.5" cy="479.5" fill="white" r="479.5" />
              </svg>
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full">
              {/* Left side - Text */}
              <div className="flex-1 flex flex-col justify-between">
                {/* Type: Normal */}
                {currentCard.type === 'normal' && (
                  <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[40px] not-italic text-[#222526] top-[50px] w-[512px]">
                    {currentCard.title && (
                      <p className="font-lato-semibold leading-[36px] relative shrink-0 text-[28px] font-[600] w-full">
                        {currentCard.title}
                      </p>
                    )}

                    {currentCard.description && (
                      // <p className="font-lato-regular leading-[28px] relative shrink-0 text-[20px] w-full">
                      //   {currentCard.description}
                      // </p>
                      <div className="services-p" dangerouslySetInnerHTML={{ __html: currentCard.description }} />
                    )}

                    {currentCard.textItalic && (
                      <p className="font-lato-regular leading-[24px] relative shrink-0 text-[20px] w-full">
                        <i>{currentCard.textItalic}</i>
                      </p>
                    )}

                    <p className="font-inter-regular leading-[24px] relative shrink-0 text-[14px] w-full">
                      <i>Your home may be repossessed if you do not keep up with your mortgage repayments</i>
                    </p>

                    {/* Fallback to text if no description */}
                    {!currentCard.description && currentCard.text && (
                      <p className="font-lato-regular leading-[24px] relative shrink-0 text-[20px] w-full">
                        {currentCard.text}
                      </p>
                    )}
                  </div>
                )}

                {/* Type: Bullet */}
                {currentCard.type === 'bullet' && (
                  <div className="absolute left-[40px] top-[60px] flex flex-col gap-[24px] items-start w-[534px] text-[#222526]">
                    <p className="font-lato-semibold leading-[36px] not-italic text-[28px] w-full">
                      {currentCard.bulletTitle}
                    </p>
                    {currentCard.bulletSubTitle && (
                      <p className="font-lato-regular leading-[28px] not-italic text-[20px] w-full">
                        {currentCard.bulletSubTitle}
                      </p>
                    )}
                    <ul className="block font-lato-regular leading-[0] text-[20px] w-full list-disc pl-[30px]">
                      {currentCard.bulletPoints?.map((point, index) => (
                        <li key={index} className="mb-[16px] last:mb-0">
                          <span className="leading-[28px]">{point}</span>
                        </li>
                      ))}
                    </ul>
                    {currentCard.textItalic2 && (
                      <p className="font-lato-regular leading-[28px] relative shrink-0 text-[20px] w-full">
                        <i>{currentCard.textItalic2}</i>
                      </p>
                    )}
                  </div>
                )}

                {/* Type: Price */}
                {currentCard.type === 'price' && currentCard.priceData && (
                  <div className="absolute left-[40px] top-[50px] flex flex-col gap-[40px] items-start w-[540px]">
                    {/* New Client Pricing */}
                    <div className="content-stretch flex flex-col gap-[20px] items-start w-full">
                      <p className="font-lato-bold leading-[36px] text-[#222526] text-[28px] w-full">
                        {currentCard.priceData.newClientLabel}
                      </p>
                      {currentCard.priceData.newClientSubLabel && (
                        <p className="font-lato-bold leading-[28px] not-italic text-[#222526] text-[24px] w-full">
                          {currentCard.priceData.newClientSubLabel}
                        </p>
                      )}

                      <div className="content-stretch flex flex-col gap-[10px] items-start w-full">
                        <p className="font-lato-regular leading-[36px] text-[#222526] text-[20px] w-full">
                          {currentCard.priceData.newClientPrice}
                        </p>
                        {currentCard.priceData.existingClientZeroPrice && (
                          <p className="font-lato-bold leading-[28px] not-italic text-[#222526] text-[24px] w-full">
                            {currentCard.priceData.existingClientZeroPrice}
                          </p>
                        )}
                        {currentCard.priceData.newClientDescription && (
                          <p className="font-lato-regular leading-[28px] text-[20px] text-[rgba(34,37,38,0.5)] w-full">
                            {currentCard.priceData.newClientDescription}
                          </p>
                        )}

                        {currentCard.priceData.newClientDescription2 && (
                          <p className="font-lato-regular leading-[36px] text-[20px] w-full">
                            {currentCard.priceData.newClientDescription2}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Divider Line */}
                    <div className="h-0 w-full relative">
                      <div className="absolute inset-[-1px_0_0_0]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 512 1">
                          <line stroke="black" strokeOpacity="0.25" x2="512" y1="0.5" y2="0.5" />
                        </svg>
                      </div>
                    </div>

                    {/* Existing Client Pricing */}
                    <div className="content-stretch flex flex-col gap-[6px] items-start w-full">
                      {currentCard.priceData.existingClientSubLabel && (
                        <p className="font-lato-bold leading-[36px] text-[#222526] text-[28px] w-full">
                          {currentCard.priceData.existingClientSubLabel}
                        </p>
                      )}
                      {currentCard.priceData.existingClientLabel && (
                        <p className="font-lato-bold leading-[28px] not-italic text-[#222526] text-[24px] w-full">
                          {currentCard.priceData.existingClientLabel}
                        </p>
                      )}
                      <div className="content-stretch flex flex-col gap-[12px] items-start w-full">
                        <p className="font-lato-regular leading-[26px] min-w-full text-[#222526] text-[20px] w-[min-content]">
                          {currentCard.priceData.existingClientPrice}
                        </p>
                        <p className="font-lato-regular leading-[26px] text-[20px] text-[rgba(34,37,38,0.5)] w-[540px]">
                          <i>{currentCard.priceData.existingClientDescription}</i>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Any Doubt Button - Only show for normal type */}
                {/* {currentCard.type === 'normal' && (
                  <div className="absolute left-[calc(50%-345px)] top-[calc(50%+179.5px)] translate-x-[-50%] translate-y-[-50%]">
                    <AnimatedDoubtButton />
                  </div>
                )} */}
              </div>

            </div>
            <div className="services-card-number-badge">
              {detailCardIndex + 1}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dot Indicators */}
        <div
          className="services-card-dots absolute flex flex-col gap-[20px] z-50"
          style={{
            left: 'calc(50% + 500px)',
            top: 'calc(50% + 25.5px)',
            transform: 'translateY(-50%)'
          }}
        >
          {currentService.detailCards.map((_, idx) => (
            <motion.div
              key={`dot-${idx}`}
              className="w-[10px] h-[10px] rounded-full cursor-pointer"
              animate={{
                backgroundColor: detailCardIndex === idx ? "#0AD1B2" : "rgba(255, 255, 255, 0.2)",
                scale: detailCardIndex === idx ? 1.2 : 1,
                boxShadow: detailCardIndex === idx ? "0 0 8px rgba(10, 209, 178, 0.4)" : "none"
              }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                setDirection(idx > detailCardIndex ? 'left' : 'right');
                setDetailCardIndex(idx);
                setNavigationSource('card');
              }}
            />
          ))}
        </div>

        {/* Right Preview Card */}
        {nextCard && (
          <AnimatePresence initial={false}>
            <motion.div
              key={navigationSource === 'card' ? `right-static-${currentService.id}` : `right-card-${currentService.id}-${detailCardIndex + 1}`}
              initial={navigationSource === 'category' ? { opacity: 0, x: direction === 'right' ? 0 : 100, scale: 0.95 } : false}
              animate={{ opacity: 0.5, x: 0, scale: 1 }}
              exit={navigationSource === 'category' ? { opacity: 0, x: direction === 'right' ? 100 : 0, scale: 0.95 } : false}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="services-preview-card services-preview-card-right absolute bg-white h-[318px] left-[calc(50%+830px)] overflow-hidden rounded-[22.755px] top-[calc(50%+25.5px)] translate-x-[-50%] translate-y-[-50%] w-[545.549px] cursor-pointer"
              whileHover={{ scale: 1.02, opacity: 0.7 }}
              onClick={handleCategoryNext}
            >
              {/* Decorative background */}
              <div className="absolute" style={{ inset: nextCard.imageInset || '-107.69% -45.15% -64.94% 19.5%' }}>
                <img alt="" className="block max-w-none size-full" height="866.962" src={nextCard.image} width="685.492" />
              </div>
              <div className="absolute inset-[-40.07%_36.39%_-31.48%_-36.39%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 545.549 545.549">
                  <circle cx="272.775" cy="272.775" fill="white" r="272.775" />
                </svg>
              </div>

              {/* Content - scaled down version of main card */}
              <div className="relative z-10 h-full">
                {/* Type: Normal */}
                {nextCard.type === 'normal' && (
                  <div className="absolute content-stretch flex flex-col gap-[14px] items-start left-[23px] not-italic text-[#222526] top-[34px] w-[290px]">
                    {nextCard.title && (
                      <p className="font-lato-semibold leading-[20px] relative shrink-0 text-[16px] w-full">
                        {nextCard.title}
                      </p>
                    )}

                    {nextCard.description && (
                      <p className="font-lato-regular leading-[16px] relative shrink-0 text-[11.5px] w-full" dangerouslySetInnerHTML={{ __html: nextCard.description }} />
                    )}

                    {!nextCard.description && nextCard.text && (
                      <p className="font-lato-regular leading-[16px] relative shrink-0 text-[11.5px] w-full">
                        {nextCard.text}
                      </p>
                    )}

                    {nextCard.textItalic && (
                      <p className="font-lato-regular leading-[16px] relative shrink-0 text-[11.5px] w-full">
                        <i>{nextCard.textItalic}</i>
                      </p>
                    )}
                  </div>
                )}

                {/* Type: Bullet */}
                {nextCard.type === 'bullet' && (
                  <div className="absolute left-[23px] top-[34px] flex flex-col gap-[14px] items-start w-[290px] text-[#222526]">
                    <p className="font-lato-semibold leading-[20px] not-italic text-[16px] w-full">
                      {nextCard.bulletTitle}
                    </p>
                    <ul className="block font-lato-regular leading-[0] text-[11.5px] w-full list-disc pl-[17px]">
                      {nextCard.bulletPoints?.map((point, index) => (
                        <li key={index} className="mb-[9px] last:mb-0">
                          <span className="leading-[16px]">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Type: Price */}
                {nextCard.type === 'price' && nextCard.priceData && (
                  <div className="absolute left-[23px] top-[46px] flex flex-col gap-[23px] items-start w-[290px]">
                    <div className="content-stretch flex flex-col gap-[14px] items-start w-full">
                      <p className="font-lato-regular leading-[20px] not-italic text-[#222526] text-[11.5px] w-full">
                        {nextCard.priceData.newClientLabel}
                      </p>
                      <div className="content-stretch flex flex-col gap-[7px] items-start w-full">
                        <p className="font-lato-bold leading-[16px] text-[#222526] text-[23px] w-full">
                          {nextCard.priceData.newClientPrice}
                        </p>
                        <p className="font-lato-regular leading-[20px] text-[11.5px] text-[rgba(34,37,38,0.5)] w-full">
                          {nextCard.priceData.newClientDescription}
                        </p>
                      </div>
                    </div>

                    <div className="h-0 w-full relative">
                      <div className="absolute inset-[-1px_0_0_0]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 290 1">
                          <line stroke="black" strokeOpacity="0.25" x2="290" y1="0.5" y2="0.5" />
                        </svg>
                      </div>
                    </div>

                    <div className="content-stretch flex flex-col gap-[14px] items-start w-full">
                      <p className="font-lato-regular leading-[20px] not-italic text-[#222526] text-[11.5px] w-full">
                        {nextCard.priceData.existingClientLabel}
                      </p>
                      <div className="content-stretch flex flex-col gap-[7px] items-start w-full">
                        <p className="font-lato-bold leading-[16px] text-[#222526] text-[23px] w-full">
                          {nextCard.priceData.existingClientPrice}
                        </p>
                        <p className="font-lato-regular leading-[20px] text-[11.5px] text-[rgba(34,37,38,0.5)] w-full">
                          {nextCard.priceData.existingClientDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Desktop category/card controls */}
      <div className="services-desktop-side-controls hidden md:block">
        <div className="services-category-arrow services-category-arrow-left">
          <CategoryArrowButton direction="left" onClick={handleCategoryPrev} />
        </div>
        <div className="services-category-arrow services-category-arrow-right">
          <CategoryArrowButton direction="right" onClick={handleCategoryNext} />
        </div>
        <button
          type="button"
          className="services-next-card-pill"
          onClick={handleCardNext}
        >
          <span>Click to view next card</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M3 9H14M14 9L9.5 4.5M14 9L9.5 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Bottom Navigation - Card Counter and Arrows - Desktop Only */}
      {/* <div className="hidden md:flex absolute content-stretch gap-[32px] items-center left-1/2 -translate-x-1/2 bottom-[15px]">
        <CardArrowButton
          direction="left"
          onClick={handleCardNext}
          disabled={detailCardIndex === currentService.detailCards.length - 1}
        />
        <p className="font-lato-regular leading-[normal] not-italic relative shrink-0 text-[32px] text-[rgba(255,255,255,0.2)] text-center text-nowrap">
          {detailCardIndex + 1}/{currentService.detailCards.length}
        </p>
        <CardArrowButton
          direction="right"
          onClick={handleCardPrev}
          disabled={detailCardIndex === 0}
        />
      </div> */}

      {/* Mobile Version - Shows service cards directly after zoom */}
      <div className="md:hidden flex flex-col items-center justify-center h-screen px-4 pb-8">
        {/* Category Navigation */}
        <div className="flex items-center justify-between w-full mb-6">
          <button
            onClick={handleCategoryPrev}
            className="p-3 rounded-full bg-white/10 border border-white/20"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="rotate-180">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <h2 className="font-lato-regular text-white/80 text-[28px] text-center">
            {currentService.title}
          </h2>

          <button
            onClick={handleCategoryNext}
            className="p-3 rounded-full bg-white/10 border border-white/20"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Service Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`mobile-card-${currentService.id}-${detailCardIndex}`}
            custom={direction}
            initial={{ opacity: 0, x: direction === 'left' ? 300 : -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === 'left' ? -300 : 300 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="bg-white rounded-[24px] p-6 w-full max-w-[400px] min-h-[280px] flex flex-col justify-between relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute inset-[-50%] opacity-5">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 400 400">
                <circle cx="200" cy="200" fill="#2c4657" r="200" />
              </svg>
            </div>

            {/* Card text */}
            <p className="font-lato-regular text-[#222526] text-[18px] leading-[26px] relative z-10 mb-6">
              {currentCard.text}
            </p>

            {/* Any Doubt Button */}
            <div className="relative z-10 flex justify-center">
              <AnimatedDoubtButton />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Card Navigation */}
        <div className="flex items-center gap-6 mt-8">
          <button
            onClick={handleCardNext}
            className="content-stretch flex items-center justify-center p-[3px] rounded-[24px] shrink-0 size-[48px] relative"
          >
            <div aria-hidden="true" className="absolute border-[0.75px] border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[24px]" />
            <div className="flex items-center justify-center relative shrink-0">
              <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                <div className="overflow-clip relative size-[30px]">
                  <div className="absolute flex inset-[28.38%_14.25%_28.22%_14.29%] items-center justify-center">
                    <div className="flex-none h-[12.964px] rotate-[359.849deg] w-[21.406px]">
                      <div className="relative size-full">
                        <div className="absolute inset-[-2.89%_-1.75%]">
                          <img alt="" className="block max-w-none size-full" height="13.286" src={imgVector3} width="22.542" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>

          <p className="font-lato-regular leading-[normal] not-italic relative shrink-0 text-[24px] text-[rgba(255,255,255,0.2)] text-center text-nowrap">
            {detailCardIndex + 1}/{currentService.detailCards.length}
          </p>

          <button
            onClick={handleCardPrev}
            className="content-stretch flex items-center justify-center p-[3px] rounded-[24px] size-[48px] relative"
          >
            <div aria-hidden="true" className="absolute border-[0.75px] border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[24px]" />
            <div className="flex items-center justify-center relative shrink-0">
              <div className="flex-none">
                <div className="overflow-clip relative size-[30px]">
                  <div className="absolute flex inset-[28.38%_14.25%_28.22%_14.29%] items-center justify-center">
                    <div className="flex-none h-[12.964px] rotate-[359.849deg] w-[21.406px]">
                      <div className="relative size-full">
                        <div className="absolute inset-[-2.89%_-1.75%]">
                          <img alt="" className="block max-w-none size-full" height="13.286" src={imgVector3} width="22.542" />
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
    </motion.div>
  );
}