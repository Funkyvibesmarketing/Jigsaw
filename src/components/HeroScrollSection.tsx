import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useMotionValue } from 'motion/react';
import svgPaths from '../imports/svg-oksog5kqro';
import svgPathsCompliance from '../imports/svg-a12xqqb4fo';
import imgModernHouseAtTwilight4 from 'figma:asset/77b24f13b4242da58b9f7acf069a8d06393d7e02.png';
import imgVector from 'figma:asset/29d00c96d16b578c0374f784d6e51ab7656ee486.png';
import imgJigsawLogo from 'figma:asset/a4641c1a776e3a061386003b194f52b5d42a8c11.png';
import imgRectangle14200 from "figma:asset/2b522be0adda68686cd941d2da701840d5a124a6.png";
import { DownArrowButton } from './DownArrowButton';
import { ImageWithFallback } from './figma/ImageWithFallback';
import AboutUsScrollEffect from '../imports/AboutUsScrollEffect';

export function HeroScrollSection({ onScrollProgress, splashViewed, onReady }: { onScrollProgress?: (progress: number) => void; splashViewed?: boolean; onReady?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hideDownArrow, setHideDownArrow] = useState(false);
  const zoomFactor = window.innerWidth > 1920 ? (window.innerWidth / 1920) : 1;
  const viewportHeight = window.innerHeight / zoomFactor;
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const isPhysicalLargeDisplay = () => {
    const pixelRatio = window.devicePixelRatio || 1;
    const screenWidth = Math.max(window.screen.width, window.screen.availWidth);
    return screenWidth > 1920 || screenWidth * pixelRatio > 3000;
  };
  const isExtremeZoomOut = () => {
    const screenWidth = Math.max(window.screen.width, window.screen.availWidth);
    return window.innerWidth >= 3000 || (screenWidth > 0 && window.innerWidth / screenWidth >= 1.7);
  };
  const isModerateZoomOut = () => {
    const screenWidth = Math.max(window.screen.width, window.screen.availWidth);
    const zoomRatio = screenWidth > 0 ? window.innerWidth / screenWidth : 1;
    return window.innerWidth >= 1921 && window.innerWidth < 3000 && zoomRatio < 1.7;
  };
  const [isLargeDisplay, setIsLargeDisplay] = useState(
    isPhysicalLargeDisplay()
  );
  const [isExtremeZoomedOut, setIsExtremeZoomedOut] = useState(isExtremeZoomOut());
  const [isModerateZoomedOut, setIsModerateZoomedOut] = useState(isModerateZoomOut());

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
      setIsLargeDisplay(isPhysicalLargeDisplay());
      setIsExtremeZoomedOut(isExtremeZoomOut());
      setIsModerateZoomedOut(isModerateZoomOut());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onReadyRef = useRef(onReady);
  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  // Signal readiness on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      onReadyRef.current?.();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle down arrow click - scroll to About Us section
  const handleDownArrowClick = () => {
    if (containerRef.current) {
      // Get the hero container height
      const heroHeight = containerRef.current.offsetHeight;
      // Scroll to the end of the hero section (which is the start of About Us)
      window.scrollTo({
        top: viewportHeight * 1.8,
        behavior: 'smooth'
      });
    }
  };

  // Track scroll progress through this section using zoom-safe layout metrics
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // start start (rect.top = 0) to end start (rect.top = -rect.height)
      const progress = Math.min(1, Math.max(0, -rect.top / rect.height));
      scrollYProgress.set(progress);
      if (onScrollProgress) {
        onScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [onScrollProgress]);

  // Adjust for splash transition - hero starts appearing during splash fade
  // Step 1: JIGSAW text fades in (0 to 0.08)
  // If splash has been viewed, start at full visibility when at top
  const jigsawOpacity = useTransform(
    scrollYProgress,
    [0, 0.04, 0.08],
    splashViewed ? [0.7, 0.7, 0.7] : [0, 0.5, 0.7]
  );

  // Step 2: House image slides up (0.04 to 0.10)
  // If splash has been viewed, show house immediately at top
  const bgImageOpacity = useTransform(
    scrollYProgress,
    [0, 0.04, 0.06, 0.10, 0.65, 0.75],
    splashViewed ? [0.08, 0.08, 0.08, 0.08, 0.08, 0] : [0, 0, 0, 0.08, 0.08, 0]
  );
  const bgImageY = useTransform(
    scrollYProgress,
    [0, 0.04, 0.10, 0.48, 0.75],
    splashViewed ? [0, 0, 0, 0, -800] : [150, 150, 0, 0, -800]
  );
  const mainImageOpacity = useTransform(
    scrollYProgress,
    [0, 0.04, 0.06, 0.10, 0.65, 0.75],
    splashViewed ? [1, 1, 1, 1, 1, 0] : [0, 0, 0.5, 1, 1, 0]
  );
  const mainImageY = useTransform(
    scrollYProgress,
    [0, 0.04, 0.10, 0.48, 0.75],
    splashViewed ? [0, 0, 0, 0, -800] : [150, 150, 0, 0, -800]
  );

  // Hero house image (original) - fades out when compliance appears
  const heroHouseOpacity = useTransform(
    scrollYProgress,
    [0.04, 0.06, 0.10, 0.40, 0.44],
    splashViewed ? [1, 1, 1, 1, 0] : [0, 0.5, 1, 1, 0]
  );

  // Compliance house image (desktop) - fades in when compliance appears
  const complianceHouseOpacity = useTransform(scrollYProgress, [0.40, 0.44, 0.65, 1], [0, 0.3, 0.3, 0]);

  // Step 3: Sentence appears and slides up quickly (0.04 to 0.06), stays, then slides up more and fades out - compressed timeline
  // If splash has been viewed, show sentence immediately at top (moved up to be visible in viewport)
  // Delay appearance until after house and JIGSAW text are visible
  const sentenceOpacity = useTransform(
    scrollYProgress,
    [0, 0.10, 0.14, 0.38, 0.44],
    splashViewed ? [1, 1, 1, 1, 0] : [0, 0, 1, 1, 0]
  );
  // For desktop: start from marking position (centered on house), for mobile: use original values
  // Sentence stays in position until 0.25, then starts sliding up
  const sentenceY = useTransform(
    scrollYProgress,
    [0, 0.10, 0.14, 0.25, 0.36, 0.44],
    splashViewed
      ? (isDesktop ? [-500, -500, -500, -500, -700, -1400] : [-280, -280, -280, -280, -480, -1180])
      : (isDesktop ? [-400, -400, -400, -400, -600, -1300] : [1500, 1500, 0, 0, -200, -900])
  );

  // Step 6: Down arrow appears (compressed from 0.48-0.53 to 0.32-0.37)
  // If splash has been viewed, show down arrow immediately at top
  const arrowY = useTransform(
    scrollYProgress,
    [0, 0.32, 0.37],
    splashViewed ? [0, 0, 0] : [100, 100, 0]
  );
  const arrowOpacity = useTransform(
    scrollYProgress,
    [0, 0.32, 0.37, 0.38, 0.39],
    splashViewed ? [1, 1, 1, 1, 0] : [0, 0, 1, 1, 0]
  );

  // Step 6: Bottom gradient appears with arrow - should not fade out
  const step6GradientOpacity = useTransform(
    scrollYProgress,
    [0, 0.32, 0.37],
    splashViewed ? [1, 1, 1] : [0, 0, 1]
  );

  // Step 7: Top JIGSAW text fades out (compressed to 0.40-0.44)
  const topJigsawOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.38, 0.40],
    splashViewed ? [0.7, 0.7, 0.7, 0] : [0, 0.7, 0.7, 0]
  );

  // JIGSAW text Y position (stays at top)
  const textY = useTransform(scrollYProgress, [0, 1], [0, 0]);

  // Step 7.5: Bottom gradient appears (compressed)
  const bottomGradientOpacity = useTransform(scrollYProgress, [0.63, 0.65, 0.67], [0, 1, 0]);

  // Step 8: Compliance content appears (slides up from bottom, then continues sliding up with parallax effect)
  const complianceY = useTransform(scrollYProgress, [0.38, 0.41, 0.48, 0.75], [300, 0, -200, -1200]);
  const complianceOpacity = useTransform(scrollYProgress, [0.38, 0.41, 0.48, 0.75], [0, 1, 1, 1]);

  // We're Rewarded text specific parallax - moves slower for depth effect
  const rewardedTextY = useTransform(scrollYProgress, [0.48, 0.75], [0, -400]);
  const rewardedTextOpacity = useTransform(scrollYProgress, [0.38, 0.41, 0.48, 0.75], [0, 1, 1, 1]);

  // Text color transition for compliance section - white to dark
  const complianceTextColor = useTransform(
    scrollYProgress,
    [0.88, 0.93],
    ['rgba(255, 255, 255, 1)', 'rgba(13, 20, 25, 1)']
  );

  // Award circles fade out gradually as About Us approaches (0.60 to 0.75)
  const circlesOpacity = useTransform(scrollYProgress, [0.60, 0.75], [1, 0]);

  // Award circles spread/scale animation - grow larger and become brighter white
  const circlesScale = useTransform(scrollYProgress, [0.60, 0.75], [1, 3]);
  const circlesBrightness = useTransform(scrollYProgress, [0.60, 0.68, 0.75], [1, 1.5, 0]);

  // Listen for scroll progress and trigger function when Step 8 is reached
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Step 8 starts at 0.96
    const WeRewarded = document.getElementById("WeRewarded");
    const AboutUsNavigation = document.getElementById("AboutUsNavigation");

    // Debug: Log scroll progress
    //console.log("Scroll Progress:", latest.toFixed(3));

    //if (latest >= 0.90) {
    //AboutUsNavigation.style.opacity = 1;
    //AboutUsNavigation.style.zIndex = 999;
    //}
    //else{
    //AboutUsNavigation.style.opacity = 0;
    //AboutUsNavigation.style.zIndex = 0;
    //}

    if (latest >= 0.75) {
      setHideDownArrow(true);

      //let opacity = 0; // start invisible
      //WeRewarded.style.display = "inline-block";
      // Remove manual opacity override - let Motion handle it
      //WeRewarded.style.opacity = 1;


      //console.log("Step 8 reached! Hiding down arrow. Scroll progress:", latest);
    } else {
      setHideDownArrow(false);
      //Reward section hiding
      //WeRewarded.style.opacity = 0;
      //--------------------
    }
  });

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full m-0 p-0 bg-[#2c4657] ${isLargeDisplay ? 'hero-large-display' : ''} ${isModerateZoomedOut ? 'hero-moderate-zoom-out' : ''} ${isExtremeZoomedOut ? 'hero-extreme-zoom-out' : ''}`}
      style={{
        height: `${viewportHeight * 4}px`
      }}
    >
      <div
        className="sticky top-0 w-full overflow-hidden m-0 p-0"
        style={{
          height: '100vh'
        }}
      >
        <div className="relative size-full overflow-hidden m-0 p-0">
          {/* Base background that transitions from light to dark blue - stays dark during compliance */}
          <motion.div
            className="absolute inset-0 z-[0] m-0 p-0"
            style={{
              background: useTransform(
                scrollYProgress,
                [0, 0.04, 0.08, 0.12, 0.25],
                splashViewed
                  ? ['#2c4657', '#2c4657', '#2c4657', '#2c4657', '#2c4657']
                  : ['#ffffff', '#ffffff', '#b8d4e0', '#8eaab8', '#2c4657']
              )
            }}
          />

          {/* JIGSAW Text - Always visible but changes gradient */}
          <motion.div
            className="hero-jigsaw-desktop absolute h-[212.774px] left-[50%] top-[40px] translate-x-[-50%] w-[min(1190px,90vw)] max-w-[1190px]"
            style={{ opacity: topJigsawOpacity, y: textY }}
          >
            <img
              src={imgJigsawLogo}
              alt="JIGSAW"
              className="w-full h-full object-contain"
              fetchpriority="high"
              style={{
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)'
              }}
            />
          </motion.div>

          {/* Background House Image - Fades in during Step 2 */}
          <motion.div
            className="hero-house-bg-desktop absolute flex h-[1086px] items-center justify-center left-1/2 -translate-x-1/2 w-[1318px] z-[1] pointer-events-none"
            style={{
              opacity: bgImageOpacity,
              y: bgImageY,
              top: window.innerWidth > 1920 ? '0px' : '-100px'
            }}
          >
            <div className="flex-none rotate-[180deg] scale-y-[-100%] pointer-events-none">
              <div className="h-[1086px] relative w-[1318px] pointer-events-none">
                <div className="absolute inset-0 opacity-[0] overflow-hidden pointer-events-none">
                  <img
                    alt=""
                    className="absolute h-full left-1/2 -translate-x-1/2 max-w-none top-0 w-[123.59%]"
                    src={imgModernHouseAtTwilight4}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main House Image - Slides up during Step 2 */}
          <motion.div
            className="hero-house-main-desktop absolute h-[982px] left-0 w-full left-1/2 -translate-x-1/2 z-[2] pointer-events-none"
            style={{
              opacity: mainImageOpacity,
              y: mainImageY,
              top: window.innerWidth > 1920 ? 'calc(50% - 300px)' : 'calc(50% - 310px)'
            }}
          >
            <div className="absolute flex h-[982px] items-center justify-center left-0 top-0 w-full pointer-events-none">
              <div className="flex-none rotate-[180deg] scale-y-[-100%] pointer-events-none w-full">
                <div className="h-[982px] relative w-full pointer-events-none">
                  <img
                    alt=""
                    className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full"
                    src={imgModernHouseAtTwilight4}
                    fetchpriority="high"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Gradient overlay at bottom of house - Fades in with house during Step 2, fades out before compliance */}
          <motion.div
            className="absolute bg-gradient-to-b from-[14.787%] from-[rgba(44,70,87,0)] h-[541px] left-0 to-[#2c4657] to-[85.86%] bottom-0 w-full z-[3]"
            style={{ opacity: useTransform(scrollYProgress, [0.14, 0.22, 0.38, 0.42], [0, 0.5, 0.5, 0]) }}
          />

          {/* Gradient overlay at bottom of house image - blends house into dark background during compliance section */}
          <motion.div
            className="absolute left-0 bottom-0 w-full h-[60vh] z-[3] pointer-events-none"
            style={{ opacity: useTransform(scrollYProgress, [0.38, 0.40, 0.42, 0.44], [0, 1, 1, 0]) }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(44, 70, 87, 0) 0%, rgba(44, 70, 87, 0.3) 10%, rgba(44, 70, 87, 0.6) 25%, rgba(44, 70, 87, 0.85) 45%, rgba(44, 70, 87, 0.95) 65%, #2c4657 80%, #2c4657 100%)'
              }}
            />
          </motion.div>

          {/* Blue gradient overlay on house - shows during compliance section while house moves up */}
          <motion.div
            className="absolute left-0 top-0 w-full h-full z-[4] pointer-events-none"
            style={{ opacity: useTransform(scrollYProgress, [0.40, 0.42, 0.60, 0.65], [0, 0.7, 0.7, 0]) }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(44, 70, 87, 0) 0%, rgba(44, 70, 87, 0) 25%, rgba(44, 70, 87, 0.6) 35%, rgba(44, 70, 87, 0.9) 45%, #2c4657 55%, #2c4657 100%)'
              }}
            />
          </motion.div>

          {/* Step 6 Bottom Gradient - Appears with down arrow (0.48 to 0.53) - MOVED EARLIER */}
          <motion.div
            className="absolute left-0 bottom-0 w-full h-full z-[5]"
            style={{ opacity: step6GradientOpacity }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(26, 42, 53, 0) 0%, rgba(26, 42, 53, 0.3) 10%, rgba(26, 42, 53, 0.8) 50%, #1a2a35 85%, #0d1419 100%)'
              }}
            />
          </motion.div>

          {/* White Background - REMOVED to keep compliance section on dark background */}

          {/* Sentence - Appears during Step 3 at lower position, slides up starting from Step 6 */}
          <motion.div
            className="hero-sentence-desktop absolute z-[15]"
            style={{
              opacity: sentenceOpacity,
              y: sentenceY
            }}
            aria-label="ADVICE THAT FITS"
          >
            <span className="hero-sentence-desktop-single">ADVICE THAT FITS</span>
            <div className="hero-sentence-desktop-stack" aria-hidden="true">
              <p>Advice</p>
              <p>that fits</p>
            </div>
          </motion.div>

          {/* Down Arrow Button - Appears during Step 6 */}
          <motion.div
            id="downArrowButton"
            className="absolute bottom-[80px] right-[80px] z-[50]"
            style={{
              y: arrowY,
              opacity: isExtremeZoomedOut && isDesktop ? (hideDownArrow ? 0 : 1) : (hideDownArrow ? 0 : arrowOpacity),
              pointerEvents: hideDownArrow ? 'none' : 'auto'
            }}
          >
            <DownArrowButton onClick={handleDownArrowClick} />
          </motion.div>

          {/* Compliance Content - Appears during Step 8, sits above white background */}
          <motion.div
            className="absolute left-0 top-0 h-screen w-full z-[100] pointer-events-none"
            id="WeRewarded"
            style={{ y: complianceY, opacity: complianceOpacity }}
          >

            {/* FCA Compliance Section */}
            <div className="hero-compliance-desktop pointer-events-auto">
              <h2>Trusted Mortgage Compliance</h2>
              <div className="hero-compliance-desktop-copy">
                <p>Jigsaw Financial operates as an Appointed Representative of a mortgage network authorised and regulated by the Financial Conduct Authority.</p>
                <p>This structure provides additional oversight, with experienced compliance specialists supporting cases and helping ensure advice remains accurate and responsible.</p>
                <p>We also stay closely informed of regulatory developments so our clients can feel confident they are being properly looked after.</p>
              </div>
            </div>
          </motion.div>

          {/* About Us Transition Screen (0.96 to 1.0) */}
          <motion.div
            className="absolute left-0 top-0 h-full w-full z-[11]"
            style={{ opacity: useTransform(scrollYProgress, [0.96, 0.97, 0.985, 1], [0, 1, 1, 0]) }}
          >
            {/* Transition House Image */}
            <motion.div
              className="absolute h-[1117.744px] left-1/2 top-[-100px] -translate-x-1/2 w-[1668.854px] z-[1]"
              style={{ opacity: useTransform(scrollYProgress, [0.96, 0.98], [0, 0.08]) }}
            >
              <div className="absolute flex h-[1615.479px] items-center justify-center left-[2px] top-[-162px] w-[2412px]">
                <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                  <div className="h-[1615.479px] relative w-[2412px]">
                    <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgModernHouseAtTwilight4} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Transition JIGSAW Logo */}
            <motion.div
              className="absolute h-[212.774px] left-[50%] top-[calc(50%-405.87px)] translate-x-[-50%] translate-y-[-50%] w-[1190px] z-[2]"
              style={{ opacity: useTransform(scrollYProgress, [0.96, 0.98], [0, 0.5]) }}
            >
              <img
                src={imgJigsawLogo}
                alt="JIGSAW"
                className="w-full h-full object-contain"
                style={{
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)'
                }}
              />
            </motion.div>

            {/* Gradient from dark blue to white */}
            <motion.div
              className="absolute left-0 bottom-0 w-full h-full z-[3]"
              style={{ opacity: useTransform(scrollYProgress, [0.96, 0.98, 0.985, 1], [0, 1, 1, 0]) }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to bottom, #2c4657 24%, #ffffff 83%)'
                }}
              />
            </motion.div>

            {/* We're Rewarded Text */}
            <motion.p
              className="absolute font-lato-light leading-[48px] left-1/2 not-italic text-[48px] text-center text-nowrap text-white top-[calc(50%+200px)] -translate-x-1/2 whitespace-pre z-[4]"
              style={{ opacity: useTransform(scrollYProgress, [0.96, 0.98], [0, 0.5]) }}
            >
              We're Rewarded
            </motion.p>

            {/* Three Award Circles */}
            <motion.div
              className="absolute left-[calc(50%-400px)] size-[180px] top-[calc(50%+300px)] z-[4]"
              style={{ opacity: useTransform(scrollYProgress, [0.96, 0.98], [0, 0.5]) }}
            >
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 180 180">
                <circle cx="90" cy="90" fill="white" fillOpacity="0.8" r="90" />
              </svg>
            </motion.div>
            <motion.div
              className="absolute left-[calc(50%-90px)] size-[180px] top-[calc(50%+300px)] z-[4]"
              style={{ opacity: useTransform(scrollYProgress, [0.96, 0.98], [0, 0.5]) }}
            >
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 180 180">
                <circle cx="90" cy="90" fill="white" fillOpacity="0.8" r="90" />
              </svg>
            </motion.div>
            <motion.div
              className="absolute left-[calc(50%+220px)] size-[180px] top-[calc(50%+300px)] z-[4]"
              style={{ opacity: useTransform(scrollYProgress, [0.96, 0.98], [0, 0.5]) }}
            >
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 180 180">
                <circle cx="90" cy="90" fill="white" fillOpacity="0.8" r="90" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}