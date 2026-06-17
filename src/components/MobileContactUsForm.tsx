import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import React, { useRef } from "react";
import mobileSvgPaths from "../imports/svg-496nz61rw6";
import successSvgPaths from "../imports/svg-o2ors8ir2r";
import svgPaths from "../imports/svg-cxhurimysf";
import { ChevronUp } from "lucide-react";

interface MobileContactUsFormProps {
  slideY: MotionValue<number>;
  opacity: MotionValue<number>;
  isSubmitted: boolean;
  isSubmitting: boolean;
  submitError: string | null;
  currentStep: number;
  formData: {
    name: string;
    email: string;
    phone: string;
    message: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      phone: string;
      message: string;
    }>
  >;
  handleNext: () => Promise<void>;
  handleBack: () => void;
  openPDF: (url: string, title: string) => void;
  setHideCursorForLinks: (hide: boolean) => void;
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

export default function MobileContactUsForm({
  slideY,
  opacity,
  isSubmitted,
  isSubmitting,
  submitError,
  currentStep,
  formData,
  setFormData,
  handleNext,
  handleBack,
  openPDF,
  setHideCursorForLinks
}: MobileContactUsFormProps) {
  const mobileRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: mobileScroll } = useScroll({
    target: mobileRef,
    offset: ["start end", "end start"],
  });

  const mobileContentY = useTransform(mobileScroll, [0.15, 0.75], [50, -220]);

  return (
    <div
      ref={mobileRef}
      className="mobile-form-wrapper"
    >
      {/* Background Gradient */}
      <div className="absolute h-[622px] left-1/2 top-[calc(50%-300px)] translate-x-[-50%] translate-y-[-50%] w-[1150px] pointer-events-none">
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


      {/* Main Container */}
      <div 
        className="mobile-form-container"
      >
        
        {/* Form and Navigation */}
        <div className="mobile-form-inner-container">
          
          {/* Step & Title */}
          {!isSubmitted && (
            <div className="w-full flex flex-col gap-[24px] items-center text-center">
              <p className="mobile-form-step">
                {currentStep}/4
              </p>
              <p className="mobile-form-title">
                contact us
              </p>
            </div>
          )}

          {/* Form Fields/Input & Next Button */}
          {isSubmitted ? (
            <motion.div
              className="flex flex-col gap-[24px] items-center w-full mt-[50px]"
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
          ) : (
            <div className="w-full flex flex-col gap-[32px] items-center">
              
              {/* Input Fields */}
              <div className="w-full flex flex-col gap-[16px] items-center relative">
                {currentStep === 1 && (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="mobile-form-input pb-2"
                  />
                )}
                {currentStep === 2 && (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Your email"
                    className="mobile-form-input pb-2"
                  />
                )}
                {currentStep === 3 && (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Your phone"
                    className="mobile-form-input pb-2"
                  />
                )}
                {currentStep === 4 && (
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your message"
                    className="mobile-form-input resize-none h-[80px] pb-2"
                  />
                )}
                
                {/* Underline separator */}
                <div className="mobile-form-underline" />
              </div>

              {/* Next/Submit Button */}
              <button
                onClick={handleNext}
                disabled={
                  isSubmitting ||
                  (currentStep === 1 && !formData.name) ||
                  (currentStep === 2 && !formData.email) ||
                  (currentStep === 3 && !formData.phone) ||
                  (currentStep === 4 && !formData.message)
                }
                className="mobile-form-btn-next"
              >
                <span className="font-['Lato:Regular',sans-serif] leading-[24px] not-italic text-[16px] text-white whitespace-nowrap">
                  {isSubmitting ? 'Sending...' : currentStep === 4 ? 'Submit' : 'Next'}
                </span>
              </button>

              {/* Error Message */}
              {submitError && (
                <motion.p
                  className="font-['Lato:Regular',sans-serif] text-[14px] text-red-400 text-center max-w-[95%] px-4"
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
                  className="cursor-pointer bg-transparent border-none hover:opacity-75 transition-opacity disabled:opacity-50"
                >
                  <p className="font-['Lato:Regular',sans-serif] leading-[24px] not-italic text-[20px] text-white whitespace-pre">Back</p>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Legal, Social, and Footer Content */}
        <div className="mobile-form-footer-container">
          
          {/* Legal Compliance */}
          <div className="w-full flex flex-col gap-[24px] items-center not-italic text-white">
            <p className="font-['Lato:Light',sans-serif] leading-[20px] text-[14px] text-[rgba(255,255,255,0.6)] whitespace-pre-wrap">{`Your home  may be repossessed if you do not keep up repayments on your mortgage. Jigsaw Financial Limited are registered in England and Wales, and an Appointed Representative of PRIMIS Mortgage Network, a trading name of First Complete Ltd. First Complete Ltd is authorised and regulated by the Financial Conduct Authority.`}</p>
            <p className="font-['Lato:Light',sans-serif] leading-[0] text-[14px] text-[rgba(255,255,255,0.6)] whitespace-pre-wrap">
              <span className="leading-[20px]">
                The guidance contained within this website is subject to the UK regulatory regime and is therefore primarily targeted at consumers based in the UK
                <br aria-hidden="true" />
                {`Registered office address - `}
              </span>
              <span className="[text-decoration-skip-ink:none] decoration-solid font-['Lato:Regular',sans-serif] leading-[20px] text-white underline">Suite 2f2 Sovereign House, Stockport Road, Cheadle, England, SK8 2EA. Company No: 11821948</span>
            </p>
            <p className="font-['Lato:Light',sans-serif] leading-[20px] text-[14px] text-[rgba(255,255,255,0.6)] whitespace-pre-wrap">{`Jigsaw Financial usually charges a fee for mortgage advice. The amount of the fee will depend on your circumstances and will be discussed and agreed with you at the earliest opportunity. This should be payable for the customer on application, offer or completion.`}</p>

            {/* Complaints and Privacy */}
            <div className="mobile-form-links-row flex font-['Lato:Regular',sans-serif] items-center justify-between leading-[18px] text-[16px] text-white underline w-full whitespace-nowrap">
              <button
                onClick={() => openPDF('/pdfs/complaints-process.pdf', 'Complaints Process')}
                onMouseEnter={() => setHideCursorForLinks(true)}
                onMouseLeave={() => setHideCursorForLinks(false)}
                className="decoration-solid hover:opacity-70 transition-opacity bg-transparent border-none text-white underline cursor-pointer font-['Lato:Regular',sans-serif] text-[16px] leading-[18px]"
              >
                Complaints Process
              </button>
              <button
                onClick={() => openPDF('/pdfs/privacy-policy.pdf', 'Privacy Policy')}
                onMouseEnter={() => setHideCursorForLinks(true)}
                onMouseLeave={() => setHideCursorForLinks(false)}
                className="decoration-solid hover:opacity-70 transition-opacity bg-transparent border-none text-white underline cursor-pointer font-['Lato:Regular',sans-serif] text-[16px] leading-[18px]"
              >
                Privacy Policy
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="w-full flex flex-col gap-[32px] items-center justify-center">
            <p className="font-['Lato:Regular',sans-serif] leading-[26px] not-italic text-[24px] text-white whitespace-nowrap">Follow us on:</p>
            <div className="flex items-center justify-between w-full">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/JigsawFinancialLtd/#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-[8px] items-center shrink-0 w-[84px]"
              >
                <div className="bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] border-solid flex items-center p-[16px] rounded-[100px] size-[56px] relative">
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
                  <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.12),inset_0px_-5px_4px_0px_rgba(255,255,255,0.08)]" />
                </div>
                <p className="font-['Lato:Light',sans-serif] leading-[28px] not-italic text-[20px] text-white tracking-[0.2px] text-center w-full">Facebook</p>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/jigsaw_financial?igsh=N2luMzM1dHU1dWNs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-[8px] items-center shrink-0 w-[86px]"
              >
                <div className="bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] border-solid flex items-center p-[16px] rounded-[100px] size-[56px] relative">
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
                  <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.12),inset_0px_-5px_4px_0px_rgba(255,255,255,0.08)]" />
                </div>
                <p className="font-['Lato:Light',sans-serif] leading-[28px] not-italic text-[20px] text-center text-white tracking-[0.2px] w-full">Instagram</p>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/jigsaw-financial-ltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-[8px] items-center shrink-0 w-[74px]"
              >
                <div className="bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] border-solid flex items-center p-[16px] rounded-[100px] size-[56px] relative">
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
                  <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.12),inset_0px_-5px_4px_0px_rgba(255,255,255,0.08)]" />
                </div>
                <p className="font-['Lato:Light',sans-serif] leading-[28px] not-italic text-[20px] text-center text-white tracking-[0.2px] w-full">LinkedIn</p>
              </a>
            </div>
          </div>

          {/* Footer Separator and Copyright */}
          <div className="w-full flex flex-col gap-[32px] items-center">
            <div className="w-full h-[1px] bg-white/50" />
            <div className="w-full flex flex-col gap-[24px] items-center justify-center text-white text-center whitespace-nowrap">
              <p className="font-['Lato:Regular',sans-serif] leading-[18px] text-[14px]">
                © Copyright Jigsaw Financial. 2026. All Rights Reserved.
              </p>
              <p className="font-['Poppins:Regular',sans-serif] leading-[0] text-[0px] text-right">
                <span className="font-['Lato:Light',sans-serif] leading-[18px] text-[14px]">Website by</span>
                <span className="font-['Lato:Regular',sans-serif] leading-[18px] text-[14px]">{` `}</span>
                <a
                  href="https://funkyvibes.co.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-['Lato:SemiBold',sans-serif] leading-[18px] text-[14px] text-white hover:underline transition-all"
                >
                  Funky Vibes Marketing
                </a>
              </p>
            </div>
          </div>

        </div>

      </div>


    </div>
  );
}
