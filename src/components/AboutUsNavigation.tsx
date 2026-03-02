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

    switch (sectionName) {
      case 'Home':
        // Scroll to top (Hero section)
        targetScrollY = viewportHeight * 1;
        break;
      case 'About us':
        // About Us section starts after Hero (100vh splash + hero height)
        // Hero is typically 800vh tall, so About Us starts around 800vh
        targetScrollY = viewportHeight * 3.2; // Start of About Us
        break;
      case 'Services':
        // Services appears within About Us section around 50% through
        // About Us is 600vh tall, Services appears around 300vh into it
        targetScrollY = viewportHeight * 5.5; // Approximately middle of About Us where Services appears
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
        targetScrollY = viewportHeight * 10; // Start of Team section
        break;
      case 'Our process':
        // Process section starts after Team completes
        // Team section length varies, but Process typically starts here
        targetScrollY = viewportHeight * 11.3; // Start of Process section
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
                            <p className="font-['Lato:Medium',sans-serif] leading-[16px] not-italic relative text-[16px] text-center text-nowrap whitespace-pre" style={{ color: isDarkBackground ? 'white' : '#2EC4B6' }}>Home</p>
                          </div>
                        </div>
                        <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "16", "--transform-inner-height": "16" } as React.CSSProperties}>
                          <div className="flex-none">
                            <div className="relative shrink-0 size-[16px]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                <path d={svgPathsHeroNav.pActiveHome} fill={isDarkBackground ? "white" : "#2EC4B6"} />
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
                            <p className="font-['Lato:Medium',sans-serif] leading-[16px] not-italic relative text-[16px] text-center text-nowrap whitespace-pre" style={{ color: isDarkBackground ? 'white' : '#2EC4B6' }}>About us</p>
                          </div>
                        </div>
                        <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "16", "--transform-inner-height": "16" } as React.CSSProperties}>
                          <div className="flex-none rotate-[270deg]">
                            <div className="overflow-clip relative size-[16px]">
                              <div className="absolute inset-[8.4%_12.5%_11.52%_12.5%]">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 13">
                                  <g>
                                    <path d={svgPathsAboutNav.p5637200} fill={isDarkBackground ? "white" : "#2EC4B6"} />
                                    <path d={svgPathsAboutNav.p39df4a00} fill={isDarkBackground ? "white" : "#2EC4B6"} />
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
                            <p className="font-['Lato:Medium',sans-serif] leading-[16px] not-italic relative text-[16px] text-center text-nowrap whitespace-pre" style={{ color: isDarkBackground ? 'white' : '#2EC4B6' }}>Services</p>
                          </div>
                        </div>
                        <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "16", "--transform-inner-height": "16" } as React.CSSProperties}>
                          <div className="flex-none rotate-[270deg]">
                            <div className="relative size-[16px]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                <g>
                                  <path d={svgPathsServicesActive.p37de8b00} fill={isDarkBackground ? "white" : "#2EC4B6"} />
                                  <path d={svgPathsServicesActive.pbbcd000} fill={isDarkBackground ? "white" : "#2EC4B6"} />
                                  <path d={svgPathsServicesActive.p2e976200} fill={isDarkBackground ? "white" : "#2EC4B6"} />
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
                            <p className="font-['Lato:Medium',sans-serif] leading-[16px] not-italic relative text-[16px] text-center text-nowrap whitespace-pre" style={{ color: isDarkBackground ? 'white' : '#2EC4B6' }}>Reviews</p>
                          </div>
                        </div>
                        <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "16", "--transform-inner-height": "16" } as React.CSSProperties}>
                          <div className="flex-none">
                            <div className="relative size-[16px]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                                <g>
                                  <path d={svgPathsHeroNav.pActiveReviews} fill={isDarkBackground ? "white" : "#2EC4B6"} />
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
                            <p className="font-['Lato:Medium',sans-serif] leading-[16px] not-italic relative text-[16px] text-center text-nowrap whitespace-pre" style={{ color: isDarkBackground ? 'white' : '#2EC4B6' }}>Our team</p>
                          </div>
                        </div>
                        <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "16", "--transform-inner-height": "16" } as React.CSSProperties}>
                          <div className="flex-none rotate-[270deg]">
                            <div className="relative size-[16px]" style={{ "--fill-0": isDarkBackground ? "white" : "#2EC4B6" } as React.CSSProperties}>
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
                          <div className="flex-none rotate-[180deg]">
                              <div className="relative shrink-0 size-[16px]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="block size-full">
                                  <path d="M13.3175 8.61374C13.3262 8.62062 13.3343 8.62874 13.3425 8.63624L13.3537 8.64624L13.3631 8.65687C13.3713 8.66517 13.379 8.67393 13.3862 8.68312C13.3918 8.68951 13.397 8.69619 13.4018 8.70312L13.4156 8.72187L13.43 8.74562C13.4339 8.75165 13.4374 8.75792 13.4406 8.76437L13.4525 8.78749L13.4618 8.80874L13.47 8.83124C13.4732 8.83896 13.4759 8.8469 13.4781 8.85499L13.4843 8.87749C13.4843 8.88624 13.4887 8.89374 13.49 8.90249L13.4943 8.92874L13.4975 8.95062C13.4984 8.96706 13.4984 8.98355 13.4975 8.99999V12C13.4975 12.1326 13.4448 12.2598 13.351 12.3535C13.2573 12.4473 13.1301 12.5 12.9975 12.5C12.8649 12.5 12.7377 12.4473 12.6439 12.3535C12.5501 12.2598 12.4975 12.1326 12.4975 12V10.2069L10.1462 12.5625C10.0069 12.7021 9.8412 12.8126 9.65882 12.8877C9.47643 12.9628 9.28096 13.001 9.08372 13H5.93747C5.81577 13.4713 5.52635 13.8821 5.12346 14.1553C4.72057 14.4285 4.23187 14.5454 3.74897 14.4841C3.26606 14.4227 2.8221 14.1874 2.50031 13.8221C2.17851 13.4569 2.00098 12.9868 2.00098 12.5C2.00098 12.0132 2.17851 11.5431 2.50031 11.1779C2.8221 10.8126 3.26606 10.5773 3.74897 10.5159C4.23187 10.4546 4.72057 10.5715 5.12346 10.8447C5.52635 11.1179 5.81577 11.5287 5.93747 12H9.08622C9.218 11.9994 9.34423 11.9469 9.43747 11.8537L11.7931 9.49999H9.99997C9.86736 9.49999 9.74018 9.44732 9.64641 9.35355C9.55265 9.25978 9.49997 9.1326 9.49997 8.99999C9.49997 8.86739 9.55265 8.74021 9.64641 8.64644C9.74018 8.55267 9.86736 8.49999 9.99997 8.49999H13C13.0166 8.49904 13.0333 8.49904 13.05 8.49999C13.0568 8.49999 13.0631 8.49999 13.07 8.49999C13.0768 8.49999 13.0887 8.49999 13.0987 8.50437C13.1065 8.50572 13.1143 8.5076 13.1218 8.50999C13.13 8.50999 13.1381 8.51374 13.1462 8.51624C13.1543 8.51874 13.1606 8.52124 13.1681 8.52374L13.1925 8.53249L13.2118 8.54187C13.22 8.54562 13.2287 8.54937 13.2368 8.55374C13.245 8.55812 13.2481 8.56062 13.2543 8.56374L13.2787 8.57874L13.2962 8.59187L13.3175 8.61374ZM10.0625 2.99999H6.91434C6.7171 2.999 6.52163 3.03715 6.33924 3.11225C6.15686 3.18735 5.99119 3.2979 5.85184 3.43749L3.49997 5.79312L3.49997 3.99999C3.49997 3.86739 3.44729 3.74021 3.35352 3.64644C3.25975 3.55267 3.13258 3.49999 2.99997 3.49999C2.86736 3.49999 2.74018 3.55267 2.64641 3.64644C2.55265 3.74021 2.49997 3.86739 2.49997 3.99999L2.49997 7.01124V7.04874C2.49997 7.05749 2.49997 7.06624 2.50372 7.07437V7.09749L2.51059 7.12437L2.51559 7.14499L2.52434 7.16999L2.53247 7.19124L2.54247 7.21312L2.55372 7.23562C2.5571 7.24229 2.56085 7.24876 2.56497 7.25499C2.56934 7.26249 2.57372 7.27062 2.57872 7.27749C2.58315 7.28421 2.58795 7.29068 2.59309 7.29687C2.59774 7.30379 2.60275 7.31047 2.60809 7.31687C2.61559 7.32624 2.62309 7.33437 2.63122 7.34312L2.64059 7.35374L2.65184 7.36374C2.65997 7.37124 2.66809 7.37937 2.67684 7.38624L2.69872 7.40249L2.71622 7.41562L2.74059 7.43062C2.74684 7.43374 2.75247 7.43749 2.75809 7.44062C2.76372 7.44374 2.77497 7.44874 2.78309 7.45249L2.80247 7.46187L2.82684 7.47062C2.83434 7.47062 2.84122 7.47624 2.84872 7.47812C2.85622 7.47999 2.86497 7.48249 2.87309 7.48437C2.88067 7.48676 2.88839 7.48864 2.89622 7.48999C2.90622 7.48999 2.91559 7.48999 2.92497 7.49437C2.93434 7.49874 2.93809 7.49437 2.94497 7.49749C2.96162 7.49845 2.97832 7.49845 2.99497 7.49749H5.99997C6.13258 7.49749 6.25975 7.44482 6.35352 7.35105C6.44729 7.25728 6.49997 7.1301 6.49997 6.99749C6.49997 6.86489 6.44729 6.73771 6.35352 6.64394C6.25975 6.55017 6.13258 6.49749 5.99997 6.49749H4.20684L6.56247 4.14624C6.60894 4.09983 6.6641 4.06302 6.72479 4.03793C6.78549 4.01283 6.85054 3.99994 6.91622 3.99999H10.0625C10.1842 4.47132 10.4736 4.88209 10.8765 5.1553C11.2794 5.4285 11.7681 5.54539 12.251 5.48405C12.7339 5.42272 13.1778 5.18736 13.4996 4.82211C13.8214 4.45686 13.999 3.98678 13.999 3.49999C13.999 3.01321 13.8214 2.54313 13.4996 2.17788C13.1778 1.81262 12.7339 1.57727 12.251 1.51593C11.7681 1.4546 11.2794 1.57149 10.8765 1.84469C10.4736 2.1179 10.1842 2.52866 10.0625 2.99999Z" fill="white"/>
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
                            <p className="font-['Lato:Medium',sans-serif] leading-[16px] not-italic relative text-[16px] text-center text-nowrap whitespace-pre" style={{ color: isDarkBackground ? 'white' : '#2EC4B6' }}>Blogs</p>
                          </div>
                        </div>
                        <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "16", "--transform-inner-height": "16" } as React.CSSProperties}>
                          <div className="flex-none rotate-[180deg]">
                              <div className="relative size-[16px]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="block size-full">
                                  <path d="M2.5 2.5L2.5 13.5C2.5 13.7652 2.60536 14.0196 2.79289 14.2071C2.98043 14.3946 3.23478 14.5 3.5 14.5H12.5C12.7652 14.5 13.0196 14.3946 13.2071 14.2071C13.3946 14.0196 13.5 13.7652 13.5 13.5V2.5C13.5 2.23478 13.3946 1.98043 13.2071 1.79289C13.0196 1.60536 12.7652 1.5 12.5 1.5H3.5C3.23478 1.5 2.98043 1.60536 2.79289 1.79289C2.60536 1.98043 2.5 2.23478 2.5 2.5ZM10.5 5V11C10.5 11.1326 10.4473 11.2598 10.3536 11.3536C10.2598 11.4473 10.1326 11.5 10 11.5C9.86739 11.5 9.74021 11.4473 9.64645 11.3536C9.55268 11.2598 9.5 11.1326 9.5 11V5C9.5 4.86739 9.55268 4.74021 9.64645 4.64645C9.74021 4.55268 9.86739 4.5 10 4.5C10.1326 4.5 10.2598 4.55268 10.3536 4.64645C10.4473 4.74021 10.5 4.86739 10.5 5ZM8.5 5V11C8.5 11.1326 8.44732 11.2598 8.35355 11.3536C8.25979 11.4473 8.13261 11.5 8 11.5C7.86739 11.5 7.74021 11.4473 7.64645 11.3536C7.55268 11.2598 7.5 11.1326 7.5 11L7.5 5C7.5 4.86739 7.55268 4.74021 7.64645 4.64645C7.74021 4.55268 7.86739 4.5 8 4.5C8.13261 4.5 8.25979 4.55268 8.35355 4.64645C8.44732 4.74021 8.5 4.86739 8.5 5ZM6.5 5L6.5 11C6.5 11.1326 6.44732 11.2598 6.35355 11.3536C6.25979 11.4473 6.13261 11.5 6 11.5C5.86739 11.5 5.74021 11.4473 5.64645 11.3536C5.55268 11.2598 5.5 11.1326 5.5 11V5C5.5 4.86739 5.55268 4.74021 5.64645 4.64645C5.74021 4.55268 5.86739 4.5 6 4.5C6.13261 4.5 6.25979 4.55268 6.35355 4.64645C6.44732 4.74021 6.5 4.86739 6.5 5Z" fill={isDarkBackground ? "white" : "#2EC4B6"} />
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