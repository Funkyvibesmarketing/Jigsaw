import { motion, useScroll, useTransform, useMotionValue } from "motion/react";
import { useRef, useEffect, useState } from "react";

interface ContactUsProps {
  onScrollProgress?: (progress: number) => void;
}

function InfoCard({ title, children, className, cardOpacity, cardY, onClick }: { title: string; children: React.ReactNode; className?: string; cardOpacity: any; cardY: any; onClick?: () => void }) {
  return (
    <motion.div 
      className={`basis-0 bg-[rgba(255,255,255,0.1)] grow min-h-px min-w-px relative rounded-[12px] self-stretch shrink-0 transition-all duration-300 hover:bg-[rgba(228,236,241,0.6)] group cursor-pointer ${className}`}
      style={{ opacity: cardOpacity, y: cardY }}
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-center justify-center p-[24px] relative size-full">
          <p className="font-['Lato:SemiBold',sans-serif] leading-[32px] min-w-full not-italic relative shrink-0 text-[#2c4657] text-[32px] w-[min-content]">{title}</p>
          {children}
          <div className="absolute h-[109px] left-[calc(50%+17.5px)] top-[-45px] w-[148px]">
            <div className="absolute inset-[-84.4%_-62.16%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 332 293">
                <g filter="url(#filter0_f_815_169)" id="Ellipse 31">
                  <ellipse cx="166" cy="146.5" fill="var(--fill-0, #2EC4B6)" fillOpacity="0.14" rx="74" ry="54.5" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="293" id="filter0_f_815_169" width="332" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur_815_169" stdDeviation="46" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(44,70,87,0.2)] border-solid inset-0 pointer-events-none rounded-[12px] transition-all duration-300 group-hover:border-[#2ec4b6] group-hover:shadow-[0px_4px_28px_6px_rgba(46,196,182,0.12)]" />
    </motion.div>
  );
}

export default function ContactUs({ onScrollProgress }: ContactUsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExtremeZoomedOut, setIsExtremeZoomedOut] = useState(window.innerWidth >= 3000);

  const zoomFactor = window.innerWidth > 1920 ? (window.innerWidth / 1920) : 1;
  const viewportHeight = window.innerHeight / zoomFactor;

  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const updateZoomState = () => {
      setIsExtremeZoomedOut(window.innerWidth >= 3000);
    };

    updateZoomState();
    window.addEventListener('resize', updateZoomState);
    return () => window.removeEventListener('resize', updateZoomState);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const total = rect.height + viewportHeight;
      const current = viewportHeight - rect.top;
      const progress = total <= 0 ? 0 : Math.min(1, Math.max(0, current / total));
      
      scrollYProgress.set(progress);
      onScrollProgress?.(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [onScrollProgress, viewportHeight]);

  // Slide up animation for the entire ContactUs section
  const slideY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  
  // Card staggered animations
  const card1Opacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
  const card1Y = useTransform(scrollYProgress, [0.15, 0.25], [40, 0]);
  
  const card2Opacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const card2Y = useTransform(scrollYProgress, [0.2, 0.3], [40, 0]);
  
  const card3Opacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);
  const card3Y = useTransform(scrollYProgress, [0.25, 0.35], [40, 0]);

  // Click handlers
  const handlePhoneClick = () => {
    window.location.href = 'tel:01616675990';
  };

  const handleAddressClick = () => {
    const address = 'Suite 2F2 Sovereign House, Stockport Road, Cheadle, SK8 2EA';
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:info@jigsaw.ltd';
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-white z-[80]"
      style={{
        minHeight: `${viewportHeight * 1.5}px`
      } as React.CSSProperties}
    >
      <div className="contact-us-to-form-bg hidden md:block" aria-hidden="true" />
      {/* Sticky container */}
      <div className="sticky top-0 w-full overflow-hidden" style={{ height: `${viewportHeight}px` } as React.CSSProperties}>
        {/* Mobile View */}
        <div className="md:hidden bg-white relative w-full h-full">
          <div className="relative w-full h-full flex flex-col items-center justify-center py-[24px] px-[16px]">
            {/* Main Content Container */}
            <div className="flex flex-col items-center justify-center w-full max-w-[382px]">
              {/* Title */}
              <p className="font-['Lato:Regular',sans-serif] leading-[normal] not-italic text-[28px] text-[rgba(44,70,87,0.4)] text-nowrap mb-[40px] tracking-[15px] w-full text-center ">REACH US</p>

              {/* Contact Cards */}
              <div className="content-stretch flex flex-col gap-[32px] items-start w-full">
                {/* Address Card */}
                <div 
                  className="bg-[rgba(255,255,255,0.1)] relative rounded-[12px] shrink-0 w-full cursor-pointer transition-all duration-300 hover:bg-[rgba(228,236,241,0.6)] group"
                  onClick={handleAddressClick}
                >
                  <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
                    <div className="box-border content-stretch flex flex-col gap-[24px] items-center p-[24px] relative w-full">
                      <p className="font-['Lato:SemiBold',sans-serif] leading-[24px] min-w-full not-italic relative shrink-0 text-[#2c4657] text-[24px] w-[min-content]">Address</p>
                      <p className="font-['Lato:Light',sans-serif] leading-[24px] min-w-full not-italic relative shrink-0 text-[#2c4657] text-[16px] w-[min-content]">Suite 2F2 Sovereign House, Stockport Road, Cheadle, SK8 2EA.</p>
                      <div className="absolute h-[109px] left-[294px] top-[-45px] w-[148px]">
                        <div className="absolute inset-[-84.4%_-62.16%]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 332 293">
                            <g filter="url(#filter0_f_address)" id="Ellipse 31">
                              <ellipse cx="166" cy="146.5" fill="#2EC4B6" fillOpacity="0.14" rx="74" ry="54.5" />
                            </g>
                            <defs>
                              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="293" id="filter0_f_address" width="332" x="0" y="0">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                                <feGaussianBlur result="effect1_foregroundBlur_address" stdDeviation="46" />
                              </filter>
                            </defs>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div aria-hidden="true" className="absolute border border-[rgba(44,70,87,0.2)] border-solid inset-0 pointer-events-none rounded-[12px] transition-all duration-300 group-hover:border-[#2ec4b6] group-hover:shadow-[0px_4px_28px_6px_rgba(46,196,182,0.12)]" />
                </div>

                {/* Phone Card */}
                <div 
                  className="bg-[rgba(255,255,255,0.1)] relative rounded-[12px] shrink-0 w-full cursor-pointer transition-all duration-300 hover:bg-[rgba(228,236,241,0.6)] group"
                  onClick={handlePhoneClick}
                >
                  <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
                    <div className="box-border content-stretch flex flex-col gap-[24px] items-center p-[24px] relative w-full">
                      <p className="font-['Lato:SemiBold',sans-serif] leading-[24px] min-w-full not-italic relative shrink-0 text-[#2c4657] text-[24px] w-[min-content]">Phone</p>
                      <p className="font-['Lato:Light',sans-serif] leading-[24px] min-w-full not-italic relative shrink-0 text-[#2c4657] text-[16px] w-[min-content]">
                        
                        <span className="font-['Lato:Light',sans-serif]">0161 667 5990</span>
                      </p>
                      <div className="absolute h-[109px] left-[294px] top-[-45px] w-[148px]">
                        <div className="absolute inset-[-84.4%_-62.16%]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 332 293">
                            <g filter="url(#filter0_f_phone)" id="Ellipse 31">
                              <ellipse cx="166" cy="146.5" fill="#2EC4B6" fillOpacity="0.14" rx="74" ry="54.5" />
                            </g>
                            <defs>
                              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="293" id="filter0_f_phone" width="332" x="0" y="0">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                                <feGaussianBlur result="effect1_foregroundBlur_phone" stdDeviation="46" />
                              </filter>
                            </defs>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div aria-hidden="true" className="absolute border border-[rgba(44,70,87,0.2)] border-solid inset-0 pointer-events-none rounded-[12px] transition-all duration-300 group-hover:border-[#2ec4b6] group-hover:shadow-[0px_4px_28px_6px_rgba(46,196,182,0.12)]" />
                </div>

                {/* Email Card */}
                <div 
                  className="bg-[rgba(255,255,255,0.1)] relative rounded-[12px] shrink-0 w-full cursor-pointer transition-all duration-300 hover:bg-[rgba(228,236,241,0.6)] group"
                  onClick={handleEmailClick}
                >
                  <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
                    <div className="box-border content-stretch flex flex-col gap-[24px] items-center p-[24px] relative w-full">
                      <p className="font-['Lato:SemiBold',sans-serif] leading-[24px] min-w-full not-italic relative shrink-0 text-[#2c4657] text-[24px] w-[min-content]">Email</p>
                      <p className="font-['Lato:Light',sans-serif] leading-[24px] min-w-full not-italic relative shrink-0 text-[#2c4657] text-[16px] w-[min-content]">info@jigsaw.ltd</p>
                      <div className="absolute h-[109px] left-[294px] top-[-45px] w-[148px]">
                        <div className="absolute inset-[-84.4%_-62.16%]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 332 293">
                            <g filter="url(#filter0_f_email)" id="Ellipse 31">
                              <ellipse cx="166" cy="146.5" fill="#2EC4B6" fillOpacity="0.14" rx="74" ry="54.5" />
                            </g>
                            <defs>
                              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="293" id="filter0_f_email" width="332" x="0" y="0">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                                <feGaussianBlur result="effect1_foregroundBlur_email" stdDeviation="46" />
                              </filter>
                            </defs>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div aria-hidden="true" className="absolute border border-[rgba(44,70,87,0.2)] border-solid inset-0 pointer-events-none rounded-[12px] transition-all duration-300 group-hover:border-[#2ec4b6] group-hover:shadow-[0px_4px_28px_6px_rgba(46,196,182,0.12)]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop View */}
        <motion.div 
          className={`contact-us-intro-desktop hidden md:block bg-white relative size-full ${isExtremeZoomedOut ? 'contact-us-intro-extreme-zoom-out' : ''}`}
          data-name="Reach us"
          style={{ y: slideY, opacity }}
        >


          {/* Main Title */}
          <p className="contact-us-intro-title absolute font-['Lato:Regular',sans-serif] leading-[normal] left-[calc(50%+0.5px)] not-italic text-[100px] text-[rgba(44,70,87,0.4)] text-center text-nowrap top-[calc(50%-218px)] translate-x-[-50%] whitespace-pre tracking-[48px]" style={{ fontWeight: 400 }}>REACH US</p>

          {/* Info Cards Container */}
          <div className="contact-us-intro-cards absolute content-stretch flex gap-[32px] items-start left-[calc(50%+34.5px)] top-[calc(50%+96px)] translate-x-[-50%] translate-y-[-50%] w-[1293px]">
            
            {/* Phone Card */}
            <InfoCard title="Phone" cardOpacity={card2Opacity} cardY={card2Y} onClick={handlePhoneClick}>
              <p className="font-['Lato:Light',sans-serif] leading-[40px] min-w-full not-italic relative shrink-0 text-[#2c4657] text-[28px] w-[min-content]">
                <span className="font-['Lato:Light',sans-serif]">0161 667 5990</span>
              </p>
              <p className="font-['Lato:Light',sans-serif] leading-[40px] min-w-full not-italic relative shrink-0 text-[#2c4657] text-[28px] w-[min-content]">&nbsp;</p>
            </InfoCard>

            {/* Address Card */}
            <InfoCard title="Address" cardOpacity={card1Opacity} cardY={card1Y} onClick={handleAddressClick}>
              <p className="font-['Lato:Light',sans-serif] leading-[36px] min-w-full not-italic relative shrink-0 text-[#2c4657] text-[24px] w-[min-content]">Suite 2F2 Sovereign House, Stockport Road, Cheadle, SK8 2EA</p>
            </InfoCard>

            {/* Email Card */}
            <InfoCard title="Email" cardOpacity={card3Opacity} cardY={card3Y} onClick={handleEmailClick}>
              <p className="font-['Lato:Light',sans-serif] leading-[40px] min-w-full not-italic relative shrink-0 text-[#2c4657] text-[28px] w-[min-content]">info@jigsaw.ltd</p>
              <p className="font-['Lato:Light',sans-serif] leading-[40px] min-w-full not-italic relative shrink-0 text-[#2c4657] text-[28px] w-[min-content]">&nbsp;</p>
            </InfoCard>
          </div>
        </motion.div>
      </div>
    </div>
  );
}