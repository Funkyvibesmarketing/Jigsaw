import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect, useState } from "react";
import svgPaths from "../imports/svg-cxhurimysf";
import successSvgPaths from "../imports/svg-o2ors8ir2r";
import mobileSvgPaths from "../imports/svg-496nz61rw6";
import cursorSvgPaths from "../imports/svg-3ga094bafp";
import { ChevronUp, Phone, Menu } from "lucide-react";
import { submitContactForm, validateFormData, type ContactFormData } from "../utils/contactApi";

interface ContactUsFormProps {
  onScrollProgress?: (progress: number) => void;
}

// Mobile Components
function MobileFavicon() {
  return (
    <div className="relative shrink-0 size-[27.429px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 28">
        <g>
          <path d={mobileSvgPaths.p2545c2c0} fill="#2EC4B6" />
          <path d={mobileSvgPaths.p32440100} fill="#2C4657" />
        </g>
      </svg>
    </div>
  );
}

function MobileLogoButton() {
  return (
    <div className="bg-white relative rounded-[48px] size-[48px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[6.857px] items-center justify-center px-[27.429px] py-[20.571px] relative size-[48px]">
          <div className="flex h-[25.714px] items-center justify-center leading-[0] relative shrink-0 w-[27.429px]">
            <div className="flex-none rotate-[90deg]">
              <MobileFavicon />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[-4.286px_0px_3.429px_0px_inset_rgba(0,0,0,0.12),2.571px_0px_3.429px_0px_inset_rgba(0,0,0,0.16)]" />
    </div>
  );
}

function MobilePhoneButton() {
  return (
    <div className="bg-white relative rounded-[48px] size-[48px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[6.857px] items-center justify-center px-[27.429px] py-[20.571px] relative size-[48px]">
          <div className="flex items-center justify-center relative shrink-0 size-[20.571px]">
            <div className="flex-none rotate-[90deg]">
              <div className="relative size-[20.571px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
                  <g>
                    <path d={mobileSvgPaths.p3ff1cb00} fill="#2C4657" />
                    <path d={mobileSvgPaths.p70d3700} fill="#2EC4B6" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[-4.286px_0px_3.429px_0px_inset_rgba(0,0,0,0.12),2.571px_0px_3.429px_0px_inset_rgba(0,0,0,0.16)]" />
    </div>
  );
}

function MobileMenuButton() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] box-border content-stretch flex flex-col gap-[9.6px] items-center justify-center px-[21px] py-[14.4px] relative rounded-[120px] shrink-0 w-[48px]">
      <div aria-hidden="true" className="absolute border-[1.2px] border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[120px]" />
      <div className="relative shrink-0 size-[19.2px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <g>
            <path d={mobileSvgPaths.p8bd0840} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
          </g>
        </svg>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[0px_4.8px_4.8px_0px_inset_rgba(255,255,255,0.12),0px_-6px_4.8px_0px_inset_rgba(255,255,255,0.08)]" />
    </div>
  );
}

function MobileUpArrow() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className="bg-[#2ec4b6] relative rounded-[48px] size-[48px] cursor-pointer"
      onClick={scrollToTop}
    >
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[6.857px] items-center justify-center px-[27.429px] py-[20.571px] relative size-[48px]">
          <div className="flex items-center justify-center relative shrink-0 size-[24px]">
            <div className="flex-none rotate-[90deg]">
              <ChevronUp className="size-[24px] text-white" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[-4.286px_0px_3.429px_0px_inset_rgba(255,255,255,0.12),2.571px_0px_3.429px_0px_inset_rgba(255,255,255,0.16)]" />
    </div>
  );
}

// Social Media Icons
function UilInstagramAlt({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="uil:instagram-alt">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_823_187)" id="uil:instagram-alt">
          <path 
            d={svgPaths.p2f6d7600} 
            fill={isHovered ? "url(#paint0_radial_instagram)" : "var(--fill-0, white)"} 
            id="Vector" 
          />
        </g>
        <defs>
          <radialGradient 
            cx="0" 
            cy="0" 
            gradientTransform="translate(6.375 25.8485) rotate(-90) scale(23.7858 22.1227)" 
            gradientUnits="userSpaceOnUse" 
            id="paint0_radial_instagram" 
            r="1"
          >
            <stop stopColor="#FFDD55" />
            <stop offset="0.1" stopColor="#FFDD55" />
            <stop offset="0.5" stopColor="#FF543E" />
            <stop offset="1" stopColor="#C837AB" />
          </radialGradient>
          <clipPath id="clip0_823_187">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function AkarIconsLinkedinV1Fill({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="akar-icons:linkedin-v1-fill">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_823_190)" id="akar-icons:linkedin-v1-fill">
          <path 
            clipRule="evenodd" 
            d={svgPaths.p106ed680} 
            fill={isHovered ? "#0076B2" : "var(--fill-0, white)"} 
            fillRule="evenodd" 
            id="Vector" 
          />
        </g>
        <defs>
          <clipPath id="clip0_823_190">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BiFacebook({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="bi:facebook">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_823_195)" id="bi:facebook">
          <path 
            d={svgPaths.pa2aea00} 
            fill={isHovered ? "#1877F2" : "var(--fill-0, white)"} 
            id="Vector" 
          />
        </g>
        <defs>
          <clipPath id="clip0_823_195">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SocialButton({ 
  children, 
  shadowColor,
  glowColor,
  onHoverChange
}: { 
  children: React.ReactNode;
  shadowColor?: string;
  glowColor?: string;
  onHoverChange?: (isHovered: boolean) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverChange?.(false);
  };

  return (
    <div 
      className="bg-[rgba(255,255,255,0.1)] box-border content-stretch flex gap-[8px] items-center p-[16px] rounded-[100px] size-[56px] relative md:cursor-none transition-all"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        boxShadow: isHovered && glowColor ? glowColor : 'none'
      }}
    >
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[100px]" />
      {typeof children === 'function' ? children(isHovered) : children}
      {isHovered && shadowColor && (
        <div 
          className="absolute inset-0 pointer-events-none rounded-[100px]" 
          style={{ 
            boxShadow: shadowColor
          }}
        />
      )}
    </div>
  );
}

export default function ContactUsForm({ onScrollProgress }: ContactUsFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // Track hover state for each social button
  const [facebookHovered, setFacebookHovered] = useState(false);
  const [instagramHovered, setInstagramHovered] = useState(false);
  const [linkedinHovered, setLinkedinHovered] = useState(false);

  // Custom cursor tracking for desktop
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      onScrollProgress?.(latest);
    });

    return () => unsubscribe();
  }, [scrollYProgress, onScrollProgress]);

  // Mouse tracking effect for custom cursor (desktop only)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && window.innerWidth >= 768) {
        const rect = containerRef.current.getBoundingClientRect();
        // Check if mouse is within the ContactUsForm section
        if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
          setCursorPosition({ x: e.clientX, y: e.clientY });
          setShowCursor(true);
        } else {
          setShowCursor(false);
        }
      }
    };

    const handleMouseLeave = () => {
      setShowCursor(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    if (containerRef.current) {
      containerRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (containerRef.current) {
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Slide up animation for the entire ContactUsForm section
  const slideY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const handleNext = async () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 4) {
      // Validate form data
      const validation = validateFormData(formData);
      
      if (!validation.isValid) {
        // Show first validation error
        const firstError = Object.values(validation.errors)[0];
        setSubmitError(firstError);
        setTimeout(() => setSubmitError(null), 3000);
        return;
      }

      // Submit the form via API
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        const response = await submitContactForm(formData as ContactFormData);
        
        if (response.success) {
          setIsSubmitted(true);
          
          // Hide success message after 3 seconds
          setTimeout(() => {
            setIsSubmitted(false);
            // Reset form
            setFormData({
              name: '',
              email: '',
              phone: '',
              message: ''
            });
            setCurrentStep(1);
          }, 3000);
        } else {
          setSubmitError(response.message);
          setTimeout(() => setSubmitError(null), 3000);
        }
      } catch (error) {
        setSubmitError('An unexpected error occurred. Please try again.');
        setTimeout(() => setSubmitError(null), 3000);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderFormField = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="absolute content-stretch flex flex-col gap-[24px] items-center left-[50%] top-[calc(50%-140px)] translate-x-[-50%] translate-y-[-50%] w-[800px]">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your name"
              className="font-['Lato:Light',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[48px] text-white text-center w-[min-content] bg-transparent border-none outline-none placeholder:text-[rgba(255,255,255,0.2)] caret-white"
            />
            <div className="h-0 relative shrink-0 w-full flex justify-center">
              <div className="absolute bottom-0 top-[-1px] w-[600px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 600 1">
                  <line id="Line 32" stroke="var(--stroke-0, white)" strokeOpacity="0.5" x2="600" y1="0.5" y2="0.5" />
                </svg>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="absolute content-stretch flex flex-col gap-[24px] items-center left-[50%] top-[calc(50%-140px)] translate-x-[-50%] translate-y-[-50%] w-[800px]">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              className="font-['Lato:Light',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[48px] text-white text-center w-[min-content] bg-transparent border-none outline-none placeholder:text-[rgba(255,255,255,0.2)] caret-white"
            />
            <div className="h-0 relative shrink-0 w-full flex justify-center">
              <div className="absolute bottom-0 top-[-1px] w-[600px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 600 1">
                  <line stroke="var(--stroke-0, white)" strokeOpacity="0.5" x2="600" y1="0.5" y2="0.5" />
                </svg>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="absolute content-stretch flex flex-col gap-[24px] items-center left-[50%] top-[calc(50%-140px)] translate-x-[-50%] translate-y-[-50%] w-[800px]">
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Enter your phone"
              className="font-['Lato:Light',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[48px] text-white text-center w-[min-content] bg-transparent border-none outline-none placeholder:text-[rgba(255,255,255,0.2)] caret-white"
            />
            <div className="h-0 relative shrink-0 w-full flex justify-center">
              <div className="absolute bottom-0 top-[-1px] w-[600px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 600 1">
                  <line stroke="var(--stroke-0, white)" strokeOpacity="0.5" x2="600" y1="0.5" y2="0.5" />
                </svg>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="absolute content-stretch flex flex-col gap-[24px] items-center left-[50%] top-[calc(50%-140px)] translate-x-[-50%] translate-y-[-50%] w-[800px]">
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Enter your message"
              className="font-['Lato:Light',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[48px] text-white text-center w-[min-content] bg-transparent border-none outline-none placeholder:text-[rgba(255,255,255,0.2)] resize-none h-[60px] caret-white"
            />
            <div className="h-0 relative shrink-0 w-full flex justify-center">
              <div className="absolute bottom-0 top-[-1px] w-[600px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 600 1">
                  <line stroke="var(--stroke-0, white)" strokeOpacity="0.5" x2="600" y1="0.5" y2="0.5" />
                </svg>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#2c4657] z-[80] min-h-[150vh] md:cursor-none"
    >
      {/* Custom Cursor - Desktop Only */}
      {showCursor && (
        <div 
          className="fixed pointer-events-none z-[9999] hidden md:block"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="size-[48px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
              <g id="Frame 1000002968">
                <rect fill="#2EC4B6" fillOpacity="0.1" height="48" rx="24" width="48" />
                <path d={cursorSvgPaths.p38113d00} fill="white" id="Vector" />
                <path d={cursorSvgPaths.p10586800} fill="white" id="Vector_2" />
              </g>
            </svg>
          </div>
        </div>
      )}

      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Mobile View */}
        <motion.div 
          className="md:hidden bg-[#2c4657] relative size-full"
          style={{ y: slideY, opacity }}
        >
          {/* Background Gradient */}
          <div className="absolute h-[622px] left-1/2 top-[calc(50%+466px)] translate-x-[-50%] translate-y-[-50%] w-[1150px]">
            <div className="absolute inset-[-26.37%_-14.26%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1478 950">
                <g filter="url(#filter0_f_mobile)" id="Ellipse 14">
                  <ellipse cx="739" cy="475" fill="url(#paint0_linear_mobile)" fillOpacity="0.2" rx="575" ry="311" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="950" id="filter0_f_mobile" width="1478" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur_mobile" stdDeviation="82" />
                  </filter>
                  <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_mobile" x1="1110.59" x2="315.336" y1="475" y2="373.031">
                    <stop stopColor="#2EC4B6" />
                    <stop offset="1" stopColor="#2D85BF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Success Message */}
          {isSubmitted && (
            <motion.div 
              className="absolute left-1/2 top-[calc(50%-200px)] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-[24px] items-center w-[90%] max-w-[382px] px-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative shrink-0 size-[80px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 120 120">
                  <g id="SealCheck">
                    <path d={successSvgPaths.p110ffc00} fill="var(--fill-0, white)" fillOpacity="0.6" id="Vector" />
                  </g>
                </svg>
              </div>
              <p className="font-['Lato:Light',sans-serif] leading-[normal] not-italic text-[32px] text-center text-white whitespace-pre-wrap">Your message has been sent</p>
            </motion.div>
          )}

          {/* Title */}
          {!isSubmitted && (
            <p className="absolute font-['Lato:Regular',sans-serif] leading-[normal] left-1/2 not-italic text-[48px] text-[rgba(255,255,255,0.2)] text-center text-nowrap top-[calc(50%-290px)] translate-x-[-50%] whitespace-pre px-4">Get in Touch</p>
          )}

          {!isSubmitted && (
            <>
              {/* Step Indicator */}
              <p className="absolute font-['Lato:Regular',sans-serif] leading-[normal] right-[24px] not-italic text-[32px] text-[rgba(255,255,255,0.2)] text-center text-nowrap top-[calc(50%-200px)] whitespace-pre">{currentStep}/4</p>

              {/* Form Field */}
              {currentStep === 1 && (
                <div className="absolute content-stretch flex flex-col gap-[16px] items-center left-1/2 top-[calc(50%-138px)] translate-x-[-50%] translate-y-[-50%] w-[90%] max-w-[382px] px-4">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="font-['Lato:Light',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[28px] text-white text-center w-[min-content] bg-transparent border-none outline-none placeholder:text-[rgba(255,255,255,0.2)] caret-white"
                  />
                  <div className="h-0 relative shrink-0 w-full">
                    <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 382 1">
                        <line stroke="white" strokeOpacity="0.5" x2="382" y1="0.5" y2="0.5" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="absolute content-stretch flex flex-col gap-[16px] items-center left-1/2 top-[calc(50%-138px)] translate-x-[-50%] translate-y-[-50%] w-[90%] max-w-[382px] px-4">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    className="font-['Lato:Light',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[28px] text-white text-center w-[min-content] bg-transparent border-none outline-none placeholder:text-[rgba(255,255,255,0.2)] caret-white"
                  />
                  <div className="h-0 relative shrink-0 w-full">
                    <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 382 1">
                        <line stroke="white" strokeOpacity="0.5" x2="382" y1="0.5" y2="0.5" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="absolute content-stretch flex flex-col gap-[16px] items-center left-1/2 top-[calc(50%-138px)] translate-x-[-50%] translate-y-[-50%] w-[90%] max-w-[382px] px-4">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter your phone"
                    className="font-['Lato:Light',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[28px] text-white text-center w-[min-content] bg-transparent border-none outline-none placeholder:text-[rgba(255,255,255,0.2)] caret-white"
                  />
                  <div className="h-0 relative shrink-0 w-full">
                    <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 382 1">
                        <line stroke="white" strokeOpacity="0.5" x2="382" y1="0.5" y2="0.5" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="absolute content-stretch flex flex-col gap-[16px] items-center left-1/2 top-[calc(50%-138px)] translate-x-[-50%] translate-y-[-50%] w-[90%] max-w-[382px] px-4">
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your message"
                    className="font-['Lato:Light',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[28px] text-white text-center w-[min-content] bg-transparent border-none outline-none placeholder:text-[rgba(255,255,255,0.2)] resize-none h-[60px] caret-white"
                  />
                  <div className="h-0 relative shrink-0 w-full">
                    <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 382 1">
                        <line stroke="white" strokeOpacity="0.5" x2="382" y1="0.5" y2="0.5" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleNext}
                disabled={
                  isSubmitting ||
                  (currentStep === 1 && !formData.name) ||
                  (currentStep === 2 && !formData.email) ||
                  (currentStep === 3 && !formData.phone) ||
                  (currentStep === 4 && !formData.message)
                }
                className={`absolute bg-[#222526] box-border content-stretch flex gap-[8px] items-center justify-center left-1/2 px-[24px] py-[12px] rounded-[56px] top-[calc(50%-40px)] translate-x-[-50%] transition-opacity border-none ${
                  isSubmitting ||
                  (currentStep === 1 && !formData.name) ||
                  (currentStep === 2 && !formData.email) ||
                  (currentStep === 3 && !formData.phone) ||
                  (currentStep === 4 && !formData.message)
                    ? 'opacity-50 cursor-not-allowed'
                    : 'opacity-100 cursor-pointer'
                }`}
              >
                <p className="font-['Lato:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">
                  {isSubmitting ? 'Sending...' : currentStep === 4 ? 'Submit' : 'Next'}
                </p>
              </button>

              {/* Error Message */}
              {submitError && (
                <motion.p 
                  className="absolute left-1/2 translate-x-[-50%] top-[calc(50%+60px)] font-['Lato:Regular',sans-serif] text-[14px] text-red-400 text-center max-w-[320px]"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {submitError}
                </motion.p>
              )}

              {/* Back Button */}
              {currentStep > 1 && (
                <button
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="absolute left-1/2 translate-x-[-50%] top-[calc(50%+20px)] cursor-pointer bg-transparent border-none disabled:opacity-50"
                >
                  <p className="font-['Lato:Regular',sans-serif] leading-[24px] not-italic text-[16px] text-white whitespace-pre">Back</p>
                </button>
              )}
            </>
          )}

          {/* Social Media - Instagram */}
          <div className="absolute bg-[rgba(255,255,255,0.1)] box-border content-stretch flex gap-[8px] items-center left-1/2 -translate-x-1/2 p-[16px] rounded-[100px] size-[56px] bottom-[200px]">
            <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[100px]" />
            <div className="relative shrink-0 size-[24px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <g clipPath="url(#clip0_mobile_instagram)">
                  <path d={svgPaths.p2f6d7600} fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_mobile_instagram">
                    <rect fill="white" height="24" width="24" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <p className="absolute font-['Lato:Light',sans-serif] leading-[20px] left-1/2 -translate-x-1/2 not-italic text-[16px] text-center text-white bottom-[170px] tracking-[0.2px]">Instagram</p>

          {/* Social Media - LinkedIn */}
          <div className="absolute bg-[rgba(255,255,255,0.1)] box-border content-stretch flex gap-[8px] items-center right-[20px] p-[16px] rounded-[100px] size-[56px] bottom-[200px]">
            <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[100px]" />
            <div className="relative shrink-0 size-[24px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <g clipPath="url(#clip0_mobile_linkedin)">
                  <path clipRule="evenodd" d={svgPaths.p106ed680} fill="white" fillRule="evenodd" />
                </g>
                <defs>
                  <clipPath id="clip0_mobile_linkedin">
                    <rect fill="white" height="24" width="24" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <p className="absolute font-['Lato:Light',sans-serif] leading-[20px] right-[22px] not-italic text-[16px] text-center text-white bottom-[170px] tracking-[0.2px]">LinkedIn</p>

          {/* Social Media - Facebook */}
          <div className="absolute bg-[rgba(255,255,255,0.1)] box-border content-stretch flex gap-[8px] items-center left-[20px] p-[16px] rounded-[100px] size-[56px] bottom-[200px]">
            <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[100px]" />
            <div className="relative shrink-0 size-[24px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <g clipPath="url(#clip0_mobile_facebook)">
                  <path d={svgPaths.pa2aea00} fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_mobile_facebook">
                    <rect fill="white" height="24" width="24" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <p className="absolute font-['Lato:Light',sans-serif] leading-[20px] left-[18px] not-italic text-[16px] text-white bottom-[170px] tracking-[0.2px]">Facebook</p>

          {/* Separator Line */}
          <div className="absolute bottom-[150px] h-0 left-1/2 -translate-x-1/2 w-[90%] max-w-[378px]">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 378 1">
                <line stroke="white" strokeOpacity="0.5" x2="378" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>

          {/* Footer */}
          <div className="absolute content-stretch flex flex-col gap-[20px] items-center justify-center left-1/2 not-italic text-white bottom-[40px] -translate-x-1/2 w-[90%] max-w-[382px] px-4">
            <p className="font-['Lato:Regular',sans-serif] leading-[16px] relative shrink-0 text-[12px] text-center">© Copyright Jigsaw Finacial. 2025. All Rights Reserved.</p>
            <p className="font-['Poppins:Regular',sans-serif] leading-[16px] relative shrink-0 text-[12px] text-center">
              <span className="font-['Lato:Light',sans-serif]">Website by</span>
              <span className="font-['Lato:Regular',sans-serif]"> </span>
              <a 
                href="https://funkyvibes.co.uk/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-['Lato:SemiBold',sans-serif] hover:underline transition-all"
              >
                Funky Vibes Marketing
              </a>
            </p>
          </div>
        </motion.div>

        {/* Desktop View */}
        <motion.div 
          className="hidden md:block bg-[#2c4657] relative size-full" 
          data-name="Contact us Form"
          style={{ y: slideY, opacity }}
        >
          {/* Background Gradient */}
          <div className="absolute h-[622px] left-[calc(50%+27.5px)] top-[calc(50%+381px)] translate-x-[-50%] translate-y-[-50%] w-[1959px]">
            <div className="absolute inset-[-26.37%_-8.37%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2287 950">
                <g filter="url(#filter0_f_823_185)" id="Ellipse 14">
                  <ellipse cx="1143.5" cy="475" fill="url(#paint0_linear_823_185)" fillOpacity="0.2" rx="979.5" ry="311" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="950" id="filter0_f_823_185" width="2287" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur_823_185" stdDeviation="82" />
                  </filter>
                  <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_823_185" x1="1776.5" x2="462.228" y1="475" y2="187.932">
                    <stop stopColor="#2EC4B6" />
                    <stop offset="1" stopColor="#2D85BF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Success Message */}
          {isSubmitted && (
            <motion.div 
              className="absolute left-1/2 top-[calc(50%-100px)] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-[36px] items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative shrink-0 size-[120px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 120 120">
                  <g id="SealCheck">
                    <path d={successSvgPaths.p110ffc00} fill="var(--fill-0, white)" fillOpacity="0.6" id="Vector" />
                  </g>
                </svg>
              </div>
              <p className="font-['Lato:Light',sans-serif] leading-[normal] not-italic text-[80px] text-center text-white whitespace-pre-wrap max-w-[800px]">Your message has been sent</p>
            </motion.div>
          )}

          {/* Main Title */}
          {!isSubmitted && (
            <p className="absolute font-['Lato:Regular',sans-serif] leading-[normal] left-1/2 not-italic text-[72px] text-[rgba(255,255,255,0.2)] text-center text-nowrap top-[40px] translate-x-[-50%] whitespace-pre">Get in Touch</p>
          )}

          {!isSubmitted && (
            <>
              {/* Step Indicator */}
              <p className="absolute font-['Lato:Regular',sans-serif] leading-[normal] left-[calc(50%+440px)] not-italic text-[48px] text-[rgba(255,255,255,0.2)] text-center text-nowrap top-[calc(50%-130px)] translate-x-[-50%] whitespace-pre">{currentStep}/4</p>

              {/* Form Field */}
              {renderFormField()}

              {/* Submit Button */}
              <button
                onClick={handleNext}
                disabled={
                  isSubmitting ||
                  (currentStep === 1 && !formData.name) ||
                  (currentStep === 2 && !formData.email) ||
                  (currentStep === 3 && !formData.phone) ||
                  (currentStep === 4 && !formData.message)
                }
                className={`absolute bg-[#222526] box-border content-stretch flex gap-[8px] items-center justify-center left-[50%] translate-x-[-50%] px-[40px] py-[24px] rounded-[56px] top-[calc(50%-65px)] transition-opacity border-none ${
                  isSubmitting ||
                  (currentStep === 1 && !formData.name) ||
                  (currentStep === 2 && !formData.email) ||
                  (currentStep === 3 && !formData.phone) ||
                  (currentStep === 4 && !formData.message)
                    ? 'opacity-50 cursor-not-allowed md:cursor-none'
                    : 'opacity-100 cursor-pointer md:cursor-none hover:opacity-90'
                }`}
              >
                <p className="font-['Lato:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[24px] text-nowrap text-white whitespace-pre">
                  {isSubmitting ? 'Sending...' : currentStep === 4 ? 'Submit' : 'Next'}
                </p>
                <div className="absolute inset-0 pointer-events-none shadow-[0px_-9px_4px_0px_inset_rgba(0,0,0,0.25),0px_4px_4px_0px_inset_rgba(255,255,255,0.16)] rounded-[56px]" />
              </button>

              {/* Error Message */}
              {submitError && (
                <motion.p 
                  className="absolute left-1/2 translate-x-[-50%] top-[calc(50%+80px)] font-['Lato:Regular',sans-serif] text-[18px] text-red-400 text-center max-w-[600px]"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {submitError}
                </motion.p>
              )}

              {/* Back Button */}
              {currentStep > 1 && (
                <button
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="absolute left-[50%] translate-x-[-50%] top-[calc(50%+25px)] cursor-pointer md:cursor-none bg-transparent border-none hover:opacity-70 transition-opacity disabled:opacity-50"
                >
                  <p className="font-['Lato:Regular',sans-serif] leading-[24px] not-italic text-[24px] text-white whitespace-pre">Back</p>
                </button>
              )}
            </>
          )}

          {/* Social Media Icons */}
          <p className={`absolute leading-[24px] left-[calc(50%-140px)] not-italic text-[16px] text-nowrap text-white bottom-[120px] tracking-[0.2px] translate-x-[-50%] whitespace-pre transition-all ${facebookHovered ? "font-['Lato:Bold',sans-serif]" : "font-['Lato:Light',sans-serif]"}`}>Facebook</p>
          <p className={`absolute leading-[24px] left-1/2 not-italic text-[16px] text-center text-nowrap text-white bottom-[120px] tracking-[0.2px] translate-x-[-50%] whitespace-pre transition-all ${instagramHovered ? "font-['Lato:Bold',sans-serif]" : "font-['Lato:Light',sans-serif]"}`}>Instagram</p>
          <p className={`absolute leading-[24px] left-[calc(50%+140px)] not-italic text-[16px] text-center text-nowrap text-white bottom-[120px] tracking-[0.2px] translate-x-[-50%] whitespace-pre transition-all ${linkedinHovered ? "font-['Lato:Bold',sans-serif]" : "font-['Lato:Light',sans-serif]"}`}>LinkedIn</p>

          <div className="absolute left-[calc(50%-140px)] size-[56px] bottom-[150px] translate-x-[-50%]">
            <SocialButton 
              shadowColor="inset 0px 4px 4px 0px rgba(24, 119, 242, 0.12), inset 0px -5px 4px 0px rgba(24, 119, 242, 0.08)"
              glowColor="0 0 0 1px rgba(24, 119, 242, 0.3), 0 0 20px 8px rgba(24, 119, 242, 0.2), 0 0 40px 16px rgba(24, 119, 242, 0.1)"
              onHoverChange={setFacebookHovered}
            >
              {(isHovered: boolean) => <BiFacebook isHovered={isHovered} />}
            </SocialButton>
          </div>
          <div className="absolute left-1/2 size-[56px] bottom-[150px] translate-x-[-50%]">
            <SocialButton 
              shadowColor="inset 0px 4px 4px 0px rgba(200, 55, 171, 0.12), inset 0px -5px 4px 0px rgba(200, 55, 171, 0.08)"
              glowColor="0 0 0 1px rgba(200, 55, 171, 0.3), 0 0 20px 8px rgba(200, 55, 171, 0.2), 0 0 40px 16px rgba(200, 55, 171, 0.1)"
              onHoverChange={setInstagramHovered}
            >
              {(isHovered: boolean) => <UilInstagramAlt isHovered={isHovered} />}
            </SocialButton>
          </div>
          <div className="absolute left-[calc(50%+140px)] size-[56px] bottom-[150px] translate-x-[-50%]">
            <SocialButton 
              shadowColor="inset 0px 4px 4px 0px rgba(0, 118, 178, 0.12), inset 0px -5px 4px 0px rgba(0, 118, 178, 0.08)"
              glowColor="0 0 0 1px rgba(0, 118, 178, 0.3), 0 0 20px 8px rgba(0, 118, 178, 0.2), 0 0 40px 16px rgba(0, 118, 178, 0.1)"
              onHoverChange={setLinkedinHovered}
            >
              {(isHovered: boolean) => <AkarIconsLinkedinV1Fill isHovered={isHovered} />}
            </SocialButton>
          </div>

          {/* Footer Divider */}
          <div className="absolute h-0 left-1/2 bottom-[70px] translate-x-[-50%] w-[1100px]">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1100 1">
                <line id="Line 33" stroke="var(--stroke-0, white)" strokeOpacity="0.5" x2="1100" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>

          {/* Footer */}
          <div className="absolute content-stretch flex items-center justify-between left-1/2 translate-x-[-50%] not-italic text-[14px] text-nowrap text-white bottom-[30px] w-[1100px] whitespace-pre">
            <p className="font-['Lato:Regular',sans-serif] leading-[16px] relative shrink-0">© Copyright Jigsaw Finacial. 2025. All Rights Reserved.</p>
            <p className="font-['Poppins:Regular',sans-serif] leading-[16px] relative shrink-0 text-right">
              <span className="font-['Lato:Light',sans-serif]">Website by</span>
              <span className="font-['Lato:Regular',sans-serif]"> </span>
              <a 
                href="https://funkyvibes.co.uk/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-['Lato:SemiBold',sans-serif] hover:underline transition-all"
              >
                Funky Vibes Marketing
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}