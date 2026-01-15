import { motion, useScroll, useTransform } from 'motion/react';
import svgPathsAboutNav from '../imports/svg-whbrdv87q5';
import svgPathsAboutInactive from '../imports/svg-whtgxs3zhn';
import svgPathsServicesInactive from '../imports/svg-tqff6mendf';
import svgPathsServicesActive from '../imports/svg-qvylmze8pl';
import svgPathsAboutUsInactive from '../imports/svg-0h8xki9d41';
import svgPathsHeroNav from '../imports/svg-1tzim1euwq';
import UsersThree from '../imports/UsersThree';
import UsersThreeInactive from '../imports/UsersThree-623-37';
import svgPathsPhone from '../imports/svg-8ivxfq7sgy';
import { useState } from 'react';

export function AboutUsNavigation({ aboutUsScrollProgress, reviewsScrollProgress, processScrollProgress, blogsScrollProgress, heroScrollProgress, servicesScrollProgress, teamScrollProgress, isReviewsActive, isContactUsSection, contactUsFormScrollProgress, isServicesDetailActive, splashViewed }: { aboutUsScrollProgress: number; reviewsScrollProgress?: number; processScrollProgress?: number; blogsScrollProgress?: number; heroScrollProgress?: number; servicesScrollProgress?: number; teamScrollProgress?: number; isReviewsActive?: boolean; isContactUsSection?: boolean; contactUsFormScrollProgress?: number; isServicesDetailActive?: boolean; splashViewed?: boolean }) {
  const { scrollY } = useScroll();
  const [isHovered, setIsHovered] = useState(false);
  const [isContactHovered, setIsContactHovered] = useState(false);
  const [hoveredMenuItem, setHoveredMenuItem] = useState<string | null>(null);
  
  // Scroll to section handler
  const scrollToSection = (sectionName: string) => {
    // Get the current scroll position
    const currentScrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    
    // Calculate target scroll positions based on actual section layout
    // These are more accurate multipliers based on the actual structure
    let targetScrollY = 0;
    
    switch(sectionName) {
      case 'Home':
        // Scroll to top (Hero section)
        targetScrollY = viewportHeight * 1;
        break;
      case 'About us':
        // About Us section starts after Hero (100vh splash + hero height)
        // Hero is typically 800vh tall, so About Us starts around 800vh
        targetScrollY = viewportHeight * 3.6; // Start of About Us
        break;
      case 'Services':
        // Services appears within About Us section around 50% through
        // About Us is 600vh tall, Services appears around 300vh into it
        targetScrollY = viewportHeight * 4.5; // Approximately middle of About Us where Services appears
        break;
      case 'Reviews':
        // Reviews section starts after About Us completes
        // About Us starts at 8vh and is 600vh tall = ends at 608vh
        // Reviews has marginTop: 100vh and starts there
        targetScrollY = viewportHeight * 7.8; // Start of Reviews section
        break;
      case 'Our team':
        // Team section starts after Reviews completes
        // Reviews is 400vh tall, so Team starts at 608vh + 100vh + 400vh
        targetScrollY = viewportHeight * 11; // Start of Team section
        break;
      case 'Our process':
        // Process section starts after Team completes
        // Team section length varies, but Process typically starts here
        targetScrollY = viewportHeight * 12.4; // Start of Process section
        break;
      case 'Blogs':
        // Blogs section starts after Process completes
        // Process is typically around 300vh, so Blogs follows
        targetScrollY = viewportHeight * 16.6; // Start of Blogs section (increased from 26)
        break;
      default:
        targetScrollY = 0;
    }
    
    // Smooth scroll to the target position
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  };
  
  // Navigation appears during hero section at same time as down arrow (scroll progress 0.32-0.37)
  // Using heroScrollProgress instead of absolute scrollY for consistency
  // If splash has been viewed and we're at the top (heroProgress < 0.32), show navigation immediately
  const heroProgress = heroScrollProgress ?? 0;
  
  // Navigation visibility:
  // - If splash has been viewed, show at scroll position 0 to 0.32 (before normal fade-in)
  // - Otherwise, fades in during hero at step 4 (32-37% of hero, same as down arrow)
  // - Stays fully visible through About Us and all other sections
  const isHeroVisible = (splashViewed && heroProgress < 0.32) || heroProgress >= 0.32; // Show at top if splash viewed, or at 0.32 normally
  const isAboutUsVisible = aboutUsScrollProgress > 0;
  const navOpacity = (isHeroVisible || isAboutUsVisible) ? 1 : 0;
  
  // Determine active menu item based on scroll progress
  // Home is active during hero section (before About Us starts)
  // When SERVICES text reaches middle of screen (at 0.50), switch to Services
  // When Reviews section is fully visible (at 0.82), switch to Reviews
  // When TEAM text starts appearing (reviewsScrollProgress >= 0.80), switch to "Our team"
  // When Process section slides up (processScrollProgress >= 0.15), switch to "Our process"
  // When Blogs section starts (blogsScrollProgress >= 0.2), switch to "Blogs"
  // In Contact Us section, all menu items are inactive
  const isReviewsActive_real = isReviewsActive ?? false;
  const isBlogsActive = isContactUsSection ? false : (blogsScrollProgress ?? 0) >= 0.2; // Blogs inactive in Contact Us, active when title animation completes
  const isProcessActive = isContactUsSection ? false : ((processScrollProgress ?? 0) >= 0.15 && !isBlogsActive); // Process inactive in Contact Us, active after slide up completes (0.05-0.15 slide)
  const isTeamActive = isContactUsSection ? false : ((reviewsScrollProgress ?? 0) >= 0.80 && !isProcessActive && !isBlogsActive); // Team inactive in Contact Us, active when TEAM text starts appearing
  // Reviews is active ONLY when fully visible (0.82+) OR when already in Reviews section, NOT during fade-in (0.72-0.82)
  const isReviewsInView = (aboutUsScrollProgress >= 0.82 || (reviewsScrollProgress ?? 0) > 0.05) && (reviewsScrollProgress ?? 0) < 0.80; // Reviews active when fully visible (0.82+) or Reviews section started (scrollProgress > 0.05 to avoid early trigger)
  const isReviewsActiveOrInView = isContactUsSection ? false : (isReviewsActive_real || isReviewsInView); // Reviews inactive in Contact Us
  const isServicesActive = isContactUsSection ? false : (aboutUsScrollProgress >= 0.50 && aboutUsScrollProgress < 0.82 && !isReviewsActiveOrInView && !isTeamActive && !isProcessActive && !isBlogsActive); // Services inactive in Contact Us, active when SERVICES text reaches middle (0.50), deactivates when Reviews is fully visible (0.82)
  const isAboutUsActive = isContactUsSection ? false : (aboutUsScrollProgress >= 0.01 && aboutUsScrollProgress < 0.50 && !isReviewsActiveOrInView && !isTeamActive && !isProcessActive && !isBlogsActive); // About Us active when section starts but before SERVICES text reaches middle (0.50)
  const isHomeActive = aboutUsScrollProgress < 0.01 && !isContactUsSection; // Home active only during hero section
  
  // Determine if current section has dark background
  // Dark sections: Hero, Services (with blue screen), Team, Process, Contact Us Form
  // Light sections: About Us, Reviews, Blogs, Contact Us (intro)
  // SPECIAL CASE: During TEAM text animation in Reviews (0.82-1.0), use LIGHT mode (white icons)
  // SPECIAL CASE 2: When Services section is revealed (0.68-0.82), use DARK mode (blue background)
  // SPECIAL CASE 3: When Reviews is active (0.82+), use LIGHT mode even if still in Services Step 1 range
  const isInContactUsForm = (contactUsFormScrollProgress ?? 0) > 0; // Contact Us Form section started
  const isTeamTextAnimating = (reviewsScrollProgress ?? 0) >= 0.82 && (reviewsScrollProgress ?? 0) < 1.0; // TEAM text showing and zooming
  const isInServicesStep1 = aboutUsScrollProgress >= 0.68 && aboutUsScrollProgress < 0.82; // Services section with blue background (0.68-0.82, after mask reveal completes, before Reviews)
  const isInServicesSection = isInServicesStep1 || (servicesScrollProgress ?? 0) > 0; // In Services Step 1 OR Step 2
  const isDarkBackground = isTeamTextAnimating ? false : (isHomeActive || isInServicesSection || isTeamActive || isProcessActive || isInContactUsForm);

  return (
    <motion.div
      className={`fixed left-[40px] rounded-[72px] top-[calc(50%+0.5px)] translate-y-[-50%] z-[999] w-[80px]`}
      id="AboutUsNavigation"
      style={{ 
        opacity: navOpacity
      }}
      data-name="AboutUsNavigation"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        backgroundColor: isHovered 
          ? (isDarkBackground ? 'rgba(255,255,255,0.15)' : 'rgba(228,236,241,0.6)') 
          : 'rgba(255,255,255,0)',
        backdropFilter: isHovered ? 'blur(12px) saturate(180%)' : 'blur(0px) saturate(100%)',
        WebkitBackdropFilter: isHovered ? 'blur(12px) saturate(180%)' : 'blur(0px) saturate(100%)',
        paddingBottom: isContactHovered ? '64px' : '0px',
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="flex flex-col items-center size-full">
        <motion.div 
          className="box-border content-stretch flex flex-col items-center px-[12px] relative w-full"
          animate={{
            gap: isContactHovered ? '16px' : '25px',
            paddingTop: isContactHovered ? '12px' : '16px',
            paddingBottom: isContactHovered ? '12px' : '16px',
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* Logo Button */}
          <motion.div 
            className="flex h-[56px] items-center justify-center relative shrink-0 w-full pointer-events-none" 
            style={{ "--transform-inner-width": "56", "--transform-inner-height": "56" } as React.CSSProperties}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex-none rotate-[270deg] w-full">
              <div className="bg-white h-[56px] relative rounded-[56px] w-full pointer-events-auto">
                <div className="flex flex-row items-center justify-center size-full">
                  <div className="box-border content-stretch flex gap-[8px] h-[56px] items-center justify-center px-[32px] py-[24px] relative w-full">
                    <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center leading-[0] relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "30", "--transform-inner-height": "32" } as React.CSSProperties}>
                      <div className="flex-none rotate-[90deg]">
                        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative">
                          <div className="[grid-area:1_/_1] h-[32px] ml-0 mt-0 relative w-[30px]">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 32">
                              <g>
                                <path d={svgPathsAboutNav.p78c5800} fill="#2EC4B6" />
                                <path d={svgPathsAboutNav.p202aac80} fill="#2C4657" />
                              </g>
                            </svg>
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
          <motion.div 
            className="content-stretch flex flex-col items-start relative shrink-0 w-[50px]"
            animate={{
              gap: isContactHovered ? '12px' : '16px',
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Home Icon */}
            <div 
              className="relative"
              onMouseEnter={() => !isHomeActive && setHoveredMenuItem('Home')}
              onMouseLeave={() => setHoveredMenuItem(null)}
              onClick={() => scrollToSection('Home')}
            >
              <div className={isHomeActive ? "bg-[rgba(46,196,182,0.4)] relative rounded-[100px] shrink-0 w-full cursor-pointer" : (isDarkBackground ? "bg-[rgba(255,255,255,0.1)] relative rounded-[100px] shrink-0 w-full h-[50px] cursor-pointer" : "bg-[#e4ecf1] relative rounded-[100px] shrink-0 w-full h-[50px] cursor-pointer")}>
                <div aria-hidden="true" className={isHomeActive ? "absolute border border-[#2ec4b6] border-solid inset-0 pointer-events-none rounded-[100px]" : (isDarkBackground ? "absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[100px]" : "absolute border border-[rgba(44,70,87,0.1)] border-solid inset-0 pointer-events-none rounded-[100px]")} />
                <div className="flex flex-col items-center justify-center size-full">
                  <div className="box-border content-stretch flex flex-col gap-[8px] items-center justify-center px-[17.5px] py-[12px] relative w-full">
                    {isHomeActive ? (
                      <>
                        <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "42.6875", "--transform-inner-height": "16" } as React.CSSProperties}>
                          <div className="flex-none rotate-[270deg]">
                            <p className="font-['Lato:Medium',sans-serif] leading-[16px] not-italic relative text-white text-[16px] text-center text-nowrap whitespace-pre">Home</p>
                          </div>
                        </div>
                        <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "16", "--transform-inner-height": "16" } as React.CSSProperties}>
                          <div className="flex-none rotate-[270deg]">
                            <div className="relative shrink-0 size-[16px]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                <path d={svgPathsAboutNav.p35230a00} fill="white" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="relative shrink-0 size-[16px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                          <path d={svgPathsAboutNav.p35230a00} fill={isDarkBackground ? "white" : "#2C4657"} />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Tooltip */}
              {!isHomeActive && hoveredMenuItem === 'Home' && (
                <motion.div
                  className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 pointer-events-none z-[1000]"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`px-4 py-2 rounded-lg whitespace-nowrap ${isDarkBackground ? 'bg-white text-[#2C4657]' : 'bg-[#2C4657] text-white'}`}
                    style={{
                      backdropFilter: 'blur(12px)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }}
                  >
                    <p className="font-['Lato:Medium',sans-serif] text-[14px] leading-[20px]">Home</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* About Us Icon - Conditional Active */}
            <div 
              className="relative"
              onMouseEnter={() => !isAboutUsActive && setHoveredMenuItem('About us')}
              onMouseLeave={() => setHoveredMenuItem(null)}
              onClick={() => scrollToSection('About us')}
            >
              <div className={isAboutUsActive ? "bg-[rgba(46,196,182,0.2)] relative rounded-[100px] shrink-0 w-full cursor-pointer" : (isDarkBackground ? "bg-[rgba(255,255,255,0.1)] relative rounded-[100px] shrink-0 w-full h-[50px] cursor-pointer" : "bg-[#e4ecf1] relative rounded-[100px] shrink-0 w-full h-[50px] cursor-pointer")}>
                <div aria-hidden="true" className={isAboutUsActive ? "absolute border border-[rgba(46,196,182,0.3)] border-solid inset-0 pointer-events-none rounded-[100px]" : (isDarkBackground ? "absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[100px]" : "absolute border border-[rgba(44,70,87,0.1)] border-solid inset-0 pointer-events-none rounded-[100px]")} />
                <div className="flex flex-col items-center justify-center size-full">
                  <div className="box-border content-stretch flex flex-col gap-[8px] items-center justify-center px-[17.5px] py-[12px] relative w-full">
                    {isAboutUsActive ? (
                      <>
                        <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "63.15625", "--transform-inner-height": "16" } as React.CSSProperties}>
                          <div className="flex-none rotate-[270deg]">
                            <p className="font-['Lato:Medium',sans-serif] leading-[16px] not-italic relative text-white text-[16px] text-center text-nowrap whitespace-pre">About us</p>
                          </div>
                        </div>
                        <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "16", "--transform-inner-height": "16" } as React.CSSProperties}>
                          <div className="flex-none rotate-[270deg]">
                            <div className="overflow-clip relative size-[16px]">
                              <div className="absolute inset-[8.4%_12.5%_11.52%_12.5%]">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 13">
                                  <g>
                                    <path d={svgPathsAboutNav.p5637200} fill="white" />
                                    <path d={svgPathsAboutNav.p39df4a00} fill="white" />
                                  </g>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="overflow-clip relative shrink-0 size-[16px]">
                        <div className="absolute inset-[8.39%_12.5%_11.52%_12.5%]">
                          <div className="absolute inset-[-3.9%_-6.16%]">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                              <g>
                                <path d={svgPathsAboutUsInactive.pec13500} stroke={isDarkBackground ? "white" : "#2C4657"} strokeWidth="0.5" />
                                <path d={svgPathsAboutUsInactive.p9bf9200} stroke={isDarkBackground ? "white" : "#2C4657"} strokeWidth="0.5" />
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Tooltip */}
              {!isAboutUsActive && hoveredMenuItem === 'About us' && (
                <motion.div
                  className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 pointer-events-none z-[1000]"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`px-4 py-2 rounded-lg whitespace-nowrap ${isDarkBackground ? 'bg-white text-[#2C4657]' : 'bg-[#2C4657] text-white'}`}
                    style={{
                      backdropFilter: 'blur(12px)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }}
                  >
                    <p className="font-['Lato:Medium',sans-serif] text-[14px] leading-[20px]">About us</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Services Icon - Conditional Active */}
            <div 
              className="relative"
              onMouseEnter={() => !isServicesActive && setHoveredMenuItem('Services')}
              onMouseLeave={() => setHoveredMenuItem(null)}
              onClick={() => scrollToSection('Services')}
            >
              <div className={isServicesActive ? "bg-[rgba(46,196,182,0.2)] relative rounded-[100px] shrink-0 w-full cursor-pointer" : (isDarkBackground ? "bg-[rgba(255,255,255,0.1)] relative rounded-[100px] shrink-0 w-full h-[50px] cursor-pointer" : "bg-[#e4ecf1] relative rounded-[100px] shrink-0 w-full h-[50px] cursor-pointer")}>
                <div aria-hidden="true" className={isServicesActive ? "absolute border border-[rgba(46,196,182,0.3)] border-solid inset-0 pointer-events-none rounded-[100px]" : (isDarkBackground ? "absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[100px]" : "absolute border border-[rgba(44,70,87,0.1)] border-solid inset-0 pointer-events-none rounded-[100px]")} />
                <div className="flex flex-col items-center justify-center size-full">
                  <div className="box-border content-stretch flex flex-col gap-[8px] items-center justify-center px-[17.5px] py-[12px] relative w-full">
                    {isServicesActive ? (
                      <>
                        <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "61.359375", "--transform-inner-height": "16" } as React.CSSProperties}>
                          <div className="flex-none rotate-[270deg]">
                            <p className="font-['Lato:Medium',sans-serif] leading-[16px] not-italic relative text-white text-[16px] text-center text-nowrap whitespace-pre">Services</p>
                          </div>
                        </div>
                        <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "16", "--transform-inner-height": "16" } as React.CSSProperties}>
                          <div className="flex-none rotate-[270deg]">
                            <div className="relative size-[16px]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                <g>
                                  <path d={svgPathsServicesActive.p37de8b00} fill="white" />
                                  <path d={svgPathsServicesActive.pbbcd000} fill="white" />
                                  <path d={svgPathsServicesActive.p2e976200} fill="white" />
                                </g>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="relative shrink-0 size-[16px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                          <g>
                            <path d={svgPathsServicesInactive.p3a091870} fill={isDarkBackground ? "white" : "#2C4657"} />
                          </g>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Tooltip */}
              {!isServicesActive && hoveredMenuItem === 'Services' && (
                <motion.div
                  className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 pointer-events-none z-[1000]"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`px-4 py-2 rounded-lg whitespace-nowrap ${isDarkBackground ? 'bg-white text-[#2C4657]' : 'bg-[#2C4657] text-white'}`}
                    style={{
                      backdropFilter: 'blur(12px)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }}
                  >
                    <p className="font-['Lato:Medium',sans-serif] text-[14px] leading-[20px]">Services</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Reviews Icon - Conditional Active */}
            <div 
              className="relative"
              onMouseEnter={() => !isReviewsActiveOrInView && setHoveredMenuItem('Reviews')}
              onMouseLeave={() => setHoveredMenuItem(null)}
              onClick={() => scrollToSection('Reviews')}
            >
              <div className={isReviewsActiveOrInView ? "bg-[rgba(46,196,182,0.2)] relative rounded-[100px] shrink-0 w-full cursor-pointer" : (isDarkBackground ? "bg-[rgba(255,255,255,0.1)] relative rounded-[100px] shrink-0 w-full h-[50px] cursor-pointer" : "bg-[#e4ecf1] relative rounded-[100px] shrink-0 w-full h-[50px] cursor-pointer")}>
                <div aria-hidden="true" className={isReviewsActiveOrInView ? "absolute border border-[rgba(46,196,182,0.3)] border-solid inset-0 pointer-events-none rounded-[100px]" : (isDarkBackground ? "absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[100px]" : "absolute border border-[rgba(44,70,87,0.1)] border-solid inset-0 pointer-events-none rounded-[100px]")} />
                <div className="flex flex-col items-center justify-center size-full">
                  <div className="box-border content-stretch flex flex-col gap-[8px] items-center justify-center px-[17.5px] py-[12px] relative w-full">
                    {isReviewsActiveOrInView ? (
                      <>
                        <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "60.453125", "--transform-inner-height": "16" } as React.CSSProperties}>
                          <div className="flex-none rotate-[270deg]">
                            <p className="font-['Lato:Medium',sans-serif] leading-[16px] not-italic relative text-white text-[16px] text-center text-nowrap whitespace-pre">Reviews</p>
                          </div>
                        </div>
                        <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "16", "--transform-inner-height": "16" } as React.CSSProperties}>
                          <div className="flex-none rotate-[270deg]">
                            <div className="relative size-[16px]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                <g>
                                  <path d={svgPathsAboutNav.p343a5e00} fill="white" />
                                </g>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="relative shrink-0 size-[16px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                          <g>
                            <path d={svgPathsAboutNav.p343a5e00} fill={isDarkBackground ? "white" : "#2C4657"} />
                          </g>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Tooltip */}
              {!isReviewsActiveOrInView && hoveredMenuItem === 'Reviews' && (
                <motion.div
                  className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 pointer-events-none z-[1000]"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`px-4 py-2 rounded-lg whitespace-nowrap ${isDarkBackground ? 'bg-white text-[#2C4657]' : 'bg-[#2C4657] text-white'}`}
                    style={{
                      backdropFilter: 'blur(12px)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }}
                  >
                    <p className="font-['Lato:Medium',sans-serif] text-[14px] leading-[20px]">Reviews</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Team Icon - Conditional Active */}
            <div 
              className="relative"
              onMouseEnter={() => !isTeamActive && setHoveredMenuItem('Our team')}
              onMouseLeave={() => setHoveredMenuItem(null)}
              onClick={() => scrollToSection('Our team')}
            >
              <div className={isTeamActive ? "bg-[rgba(46,196,182,0.2)] relative rounded-[100px] shrink-0 w-full cursor-pointer" : (isDarkBackground ? "bg-[rgba(255,255,255,0.1)] relative rounded-[100px] shrink-0 w-full h-[50px] cursor-pointer" : "bg-[#e4ecf1] relative rounded-[100px] shrink-0 w-full h-[50px] cursor-pointer")}>
                <div aria-hidden="true" className={isTeamActive ? "absolute border border-[rgba(46,196,182,0.3)] border-solid inset-0 pointer-events-none rounded-[100px]" : (isDarkBackground ? "absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[100px]" : "absolute border border-[rgba(44,70,87,0.1)] border-solid inset-0 pointer-events-none rounded-[100px]")} />
                <div className="flex flex-col items-center justify-center size-full">
                  <div className="box-border content-stretch flex flex-col gap-[8px] items-center justify-center px-[17.5px] py-[12px] relative w-full">
                    {isTeamActive ? (
                      <>
                        <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "66.6875", "--transform-inner-height": "16" } as React.CSSProperties}>
                          <div className="flex-none rotate-[270deg]">
                            <p className="font-['Lato:Medium',sans-serif] leading-[16px] not-italic relative text-white text-[16px] text-center text-nowrap whitespace-pre">Our team</p>
                          </div>
                        </div>
                        <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "16", "--transform-inner-height": "16" } as React.CSSProperties}>
                          <div className="flex-none rotate-[270deg]">
                            <div className="relative size-[16px]" style={{ "--fill-0": "white" } as React.CSSProperties}>
                              <UsersThree />
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="relative shrink-0 size-[16px]" style={{ "--fill-0": isDarkBackground ? "white" : "#2C4657" } as React.CSSProperties}>
                        <UsersThreeInactive />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Tooltip */}
              {!isTeamActive && hoveredMenuItem === 'Our team' && (
                <motion.div
                  className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 pointer-events-none z-[1000]"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`px-4 py-2 rounded-lg whitespace-nowrap ${isDarkBackground ? 'bg-white text-[#2C4657]' : 'bg-[#2C4657] text-white'}`}
                    style={{
                      backdropFilter: 'blur(12px)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }}
                  >
                    <p className="font-['Lato:Medium',sans-serif] text-[14px] leading-[20px]">Our team</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Process Icon - Conditional Active */}
            <div 
              className="relative"
              onMouseEnter={() => !isProcessActive && setHoveredMenuItem('Our process')}
              onMouseLeave={() => setHoveredMenuItem(null)}
              onClick={() => scrollToSection('Our process')}
            >
              <div className={isProcessActive ? "bg-[rgba(46,196,182,0.4)] relative rounded-[100px] shrink-0 w-full cursor-pointer" : (isDarkBackground ? "bg-[rgba(255,255,255,0.1)] relative rounded-[100px] shrink-0 w-full h-[50px] cursor-pointer" : "bg-[#e4ecf1] relative rounded-[100px] shrink-0 w-full h-[50px] cursor-pointer")}>
                <div aria-hidden="true" className={isProcessActive ? "absolute border border-[#2ec4b6] border-solid inset-0 pointer-events-none rounded-[100px]" : (isDarkBackground ? "absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[100px]" : "absolute border border-[rgba(44,70,87,0.1)] border-solid inset-0 pointer-events-none rounded-[100px]")} />
                <div className="flex flex-col items-center justify-center size-full">
                  <div className="box-border content-stretch flex flex-col gap-[8px] items-center justify-center px-[17.5px] py-[12px] relative w-full">
                    {isProcessActive ? (
                      <>
                        <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "87.140625", "--transform-inner-height": "16" } as React.CSSProperties}>
                          <div className="flex-none rotate-[270deg]">
                            <p className="font-['Lato:Medium',sans-serif] leading-[16px] not-italic relative text-white text-[16px] text-center text-nowrap whitespace-pre">Our process</p>
                          </div>
                        </div>
                        <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "16", "--transform-inner-height": "16" } as React.CSSProperties}>
                          <div className="flex-none rotate-[270deg]">
                            <div className="relative shrink-0 size-[16px]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                <path d={svgPathsAboutNav.pfc60680} fill="white" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="relative shrink-0 size-[16px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                          <path d={svgPathsAboutNav.pfc60680} fill={isDarkBackground ? "white" : "#2C4657"} />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Tooltip */}
              {!isProcessActive && hoveredMenuItem === 'Our process' && (
                <motion.div
                  className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 pointer-events-none z-[1000]"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`px-4 py-2 rounded-lg whitespace-nowrap ${isDarkBackground ? 'bg-white text-[#2C4657]' : 'bg-[#2C4657] text-white'}`}
                    style={{
                      backdropFilter: 'blur(12px)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }}
                  >
                    <p className="font-['Lato:Medium',sans-serif] text-[14px] leading-[20px]">Our process</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Blogs Icon - Conditional Active */}
            <div 
              className="relative"
              onMouseEnter={() => !isBlogsActive && setHoveredMenuItem('Blogs')}
              onMouseLeave={() => setHoveredMenuItem(null)}
              onClick={() => scrollToSection('Blogs')}
            >
              <div className={isBlogsActive ? "bg-[rgba(46,196,182,0.2)] relative rounded-[100px] shrink-0 w-full cursor-pointer" : (isDarkBackground ? "bg-[rgba(255,255,255,0.1)] relative rounded-[100px] shrink-0 w-full h-[50px] cursor-pointer" : "bg-[#e4ecf1] relative rounded-[100px] shrink-0 w-full h-[50px] cursor-pointer")}>
                <div aria-hidden="true" className={isBlogsActive ? "absolute border border-[rgba(46,196,182,0.3)] border-solid inset-0 pointer-events-none rounded-[100px]" : (isDarkBackground ? "absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[100px]" : "absolute border border-[rgba(44,70,87,0.1)] border-solid inset-0 pointer-events-none rounded-[100px]")} />
                <div className="flex flex-col items-center justify-center size-full">
                  <div className="box-border content-stretch flex flex-col gap-[8px] items-center justify-center px-[17.5px] py-[12px] relative w-full">
                    {isBlogsActive ? (
                      <>
                        <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "60.453125", "--transform-inner-height": "16" } as React.CSSProperties}>
                          <div className="flex-none rotate-[270deg]">
                            <p className="font-['Lato:Medium',sans-serif] leading-[16px] not-italic relative text-white text-[16px] text-center text-nowrap whitespace-pre">Blogs</p>
                          </div>
                        </div>
                        <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "16", "--transform-inner-height": "16" } as React.CSSProperties}>
                          <div className="flex-none rotate-[270deg]">
                            <div className="relative size-[16px]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                <g>
                                  <path d={svgPathsAboutNav.p16e5a580} fill="white" />
                                </g>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="relative shrink-0 size-[16px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                          <g>
                            <path d={svgPathsAboutNav.p16e5a580} fill={isDarkBackground ? "white" : "#2C4657"} />
                          </g>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Tooltip */}
              {!isBlogsActive && hoveredMenuItem === 'Blogs' && (
                <motion.div
                  className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 pointer-events-none z-[1000]"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`px-4 py-2 rounded-lg whitespace-nowrap ${isDarkBackground ? 'bg-white text-[#2C4657]' : 'bg-[#2C4657] text-white'}`}
                    style={{
                      backdropFilter: 'blur(12px)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }}
                  >
                    <p className="font-['Lato:Medium',sans-serif] text-[14px] leading-[20px]">Blogs</p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Contact Button */}
          <motion.div 
            className="flex items-center justify-center relative shrink-0 w-full" 
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              marginTop: isContactHovered ? '54px' : '0px'
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onMouseEnter={() => setIsContactHovered(true)}
            onMouseLeave={() => setIsContactHovered(false)}
          >
            <div className="flex-none rotate-[270deg]">
              <a href="tel:01616675990" className="block">
                <motion.div 
                  className="bg-white box-border flex flex-row items-center relative rounded-[56px] h-[56px] overflow-hidden cursor-pointer"
                  animate={{
                    width: isContactHovered ? '175px' : '56px',
                    gap: isContactHovered ? '8px' : '0px',
                    justifyContent: isContactHovered ? 'flex-start' : 'center',
                    paddingLeft: isContactHovered ? '24px' : '0px',
                    paddingRight: isContactHovered ? '24px' : '0px',
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  {/* Phone icon - always visible */}
                  <div className="flex items-center justify-center relative shrink-0 size-[24px]">
                    <div className="flex-none rotate-[90deg]">
                      <div className="relative size-[24px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                          <g>
                            <path d={svgPathsPhone.p38b1d500} fill="#2C4657" />
                            <path d={svgPathsPhone.p1af2b00} fill="#2EC4B6" />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* "Contact us" text - fades in when hovered */}
                  <motion.div 
                    className="flex items-center justify-center overflow-hidden whitespace-nowrap"
                    animate={{
                      opacity: isContactHovered ? 1 : 0,
                      width: isContactHovered ? 'auto' : '0px',
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="flex-none rotate-[360deg]">
                      <p className="font-['Lato',sans-serif] leading-[24px] not-italic text-[#222526] text-[20px] whitespace-nowrap">Contact us</p>
                    </div>
                  </motion.div>
                </motion.div>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <motion.div 
        aria-hidden="true" 
        className="absolute border border-solid inset-0 pointer-events-none rounded-[72px]"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          borderColor: isHovered ? 'rgba(44, 70, 87, 0.15)' : 'rgba(255, 255, 255, 0)'
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}