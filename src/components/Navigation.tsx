import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent } from 'motion/react';
import svgPaths from '../imports/svg-1tzim1euwq';
import logoImage from 'figma:asset/b67552075865b1754199c544ec4803af3ee4fc83.png';
import contactImage from 'figma:asset/32150d2da7444f71cf517def3075b8fb3e9bac6e.png';
import callIcon from '../assets/call.svg';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useRef, useEffect } from 'react';

export function Navigation() {
  const { scrollY } = useScroll();
  const [isHovered, setIsHovered] = useState(false);
  const logoContactFinalOpacity = useMotionValue(0);
  const currentScrollOpacity = useRef(0);
  
  // Hero section calculations
  const heroStart = window.innerHeight;
  const heroHeight = window.innerHeight * 15;
  
  // Step 4: Navigation slides in from left at 40px width (at 22% of hero) - MOVED EARLIER to eliminate 10% gap
  const step4Start = heroStart + (heroHeight * 0.22);
  const step4End = heroStart + (heroHeight * 0.27);
  
  // Step 5: Navigation expands to 80px (at 27% of hero) - adjusted to follow immediately
  const step5Start = heroStart + (heroHeight * 0.27);
  const step5End = heroStart + (heroHeight * 0.35);
  
  // Step 9: Navigation fades out when entering About Us section (at 82-85% of hero)
  const fadeOutStart = heroStart + (heroHeight * 0.82);
  const fadeOutEnd = heroStart + (heroHeight * 0.85);
  
  // Position and opacity animations - No sliding, just pop in
  const navOpacity = useTransform(
    scrollY, 
    [0, step4Start, step4Start + (step4End - step4Start) * 0.01, step4End, fadeOutStart, fadeOutEnd], 
    [0, 0, 1, 1, 1, 0]
  );
  
  const navWidth = useTransform(scrollY, [step5Start, step5End], [40, 80]);
  const logoContactOpacity = useTransform(
    scrollY, 
    [0, step5Start, step5Start + (step5End - step5Start) * 0.3, step5End, fadeOutStart, fadeOutEnd], 
    [0, 0, 1, 1, 1, 0]
  );
  
  // Track the scroll-based opacity value
  useMotionValueEvent(logoContactOpacity, 'change', (value) => {
    currentScrollOpacity.current = value;
    logoContactFinalOpacity.set(isHovered ? value : 0);
  });
  
  // Update when hover state changes
  useEffect(() => {
    logoContactFinalOpacity.set(isHovered ? currentScrollOpacity.current : 0);
  }, [isHovered, logoContactFinalOpacity]);

  return (
    <motion.div
      className="fixed left-[40px] rounded-[72px] top-[calc(50%+0.5px)] translate-y-[-50%] z-[100]"
      style={{ opacity: navOpacity, width: '80px',zIndex:999 }}
      data-name="Navigation"
    >
      <motion.div
        className="relative size-full rounded-[72px]"
        animate={{
          backgroundColor: isHovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0)',
          backdropFilter: isHovered ? 'blur(12px) saturate(180%)' : 'blur(0px) saturate(100%)',
          WebkitBackdropFilter: isHovered ? 'blur(12px) saturate(180%)' : 'blur(0px) saturate(100%)',
        }}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col items-center size-full">
          <div className="box-border content-stretch flex flex-col gap-[32px] items-center overflow-clip px-[12px] py-[16px] relative size-full">
            {/* Logo Button */}
            <motion.div 
              className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-full"
              style={{ 
                opacity: logoContactFinalOpacity,
                "--transform-inner-width": "56",
                "--transform-inner-height": "56"
              } as React.CSSProperties}
            >
              <div className="flex-none rotate-[270deg] w-full">
                <div className="bg-white h-[56px] relative rounded-[56px] w-full">
                  <div className="flex flex-row items-center justify-center size-full">
                    <div className="box-border content-stretch flex gap-[8px] h-[56px] items-center justify-center px-[32px] py-[24px] relative w-full">
                      <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center leading-[0] relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "30", "--transform-inner-height": "32" } as React.CSSProperties}>
                        <div className="flex-none rotate-[90deg]">
                          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative">
                            <div className="[grid-area:1_/_1] h-[32px] ml-0 mt-0 relative w-[30px]">
                              <ImageWithFallback src={logoImage} alt="Logo" className="block size-full object-contain" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Navigation Icons */}
            <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[40px]">
              {/* Home Icon */}
              <div className="bg-[rgba(46,196,182,0.4)] relative rounded-[100px] shrink-0 w-full">
                <div aria-hidden="true" className="absolute border border-[#2ec4b6] border-solid inset-0 pointer-events-none rounded-[100px]" />
                <div className="flex flex-col items-center justify-center size-full">
                  <div className="box-border content-stretch flex flex-col gap-[8px] items-center justify-center px-[17.5px] py-[12px] relative w-full">
                    <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "42.6875", "--transform-inner-height": "16" } as React.CSSProperties}>
                      <div className="flex-none rotate-[270deg]">
                        <p className="font-['Lato:Medium',sans-serif] leading-[16px] not-italic relative text-[16px] text-center text-nowrap text-white whitespace-pre">Home</p>
                      </div>
                    </div>
                    <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "16", "--transform-inner-height": "16" } as React.CSSProperties}>
                      <div className="flex-none rotate-[270deg]">
                        <div className="relative size-[16px]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                            <path d={svgPaths.p3e95a600} fill="white" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Nav Icons */}
              {[
                { 
                  type: 'group',
                  paths: [svgPaths.pec13500, svgPaths.p9bf9200]
                },
                { type: 'single', path: svgPaths.p3a091870 },
                { type: 'single', path: svgPaths.p343a5e00 },
                { type: 'single', path: svgPaths.p20449980 },
                { type: 'single', path: svgPaths.pfc60680 },
                { type: 'single', path: svgPaths.p16e5a580 }
              ].map((icon, i) => (
                <div key={i} className="bg-[rgba(255,255,255,0.1)] relative rounded-[100px] shrink-0 w-full">
                  <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[100px]" />
                  <div className="flex flex-col items-center justify-center size-full">
                    <div className="box-border content-stretch flex flex-col gap-[8px] items-center justify-center px-[17.5px] py-[12px] relative w-full">
                      {icon.type === 'group' ? (
                        <div className="overflow-clip relative shrink-0 size-[16px]">
                          <div className="absolute inset-[8.39%_12.5%_11.52%_12.5%]">
                            <div className="absolute inset-[-3.9%_-6.16%_-3.9%_-6.15%]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                                <g>
                                  <path d={icon.paths[0]} stroke="white" strokeWidth="0.5" />
                                  <path d={icon.paths[1]} stroke="white" strokeWidth="0.5" />
                                </g>
                              </svg>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="relative shrink-0 size-[16px]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                            <path d={icon.path} fill="white" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Button */}
            <motion.div 
              className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-full"
              style={{ 
                opacity: logoContactFinalOpacity,
                "--transform-inner-width": "56",
                "--transform-inner-height": "56"
              } as React.CSSProperties}
            >
              <div className="flex-none rotate-[270deg] w-full">
                <div 
                  onClick={() => {
                    const viewportHeight = window.innerHeight;
                    window.scrollTo({ top: viewportHeight * 20.1, behavior: 'smooth' });
                  }} 
                  className="bg-white h-[56px] relative rounded-[56px] w-full cursor-pointer"
                >
                  <div className="flex flex-row items-center justify-center size-full">
                    <div className="box-border content-stretch flex gap-[8px] h-[56px] items-center justify-center px-[32px] py-[24px] relative w-full">
                      <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "24", "--transform-inner-height": "24" } as React.CSSProperties}>
                        <motion.div 
                          className="flex-none"
                          animate={{ rotate: isHovered ? 45 : 90 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                          <div className="relative size-[24px]">
                            <ImageWithFallback src={callIcon} alt="Contact" className="block size-full object-contain" />
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Border */}
        <motion.div 
          aria-hidden="true" 
          className="absolute border border-solid inset-0 pointer-events-none rounded-[72px]"
          animate={{ 
            borderColor: isHovered ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0)'
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}