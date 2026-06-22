import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion, useScroll, useTransform, useMotionValue, animate } from 'motion/react';
import { Splash } from './components/Splash';
import { SplashMobile } from './components/SplashMobile';
import { HeroScrollSection } from './components/HeroScrollSection';
import { HeroScrollSectionMobile } from './components/HeroScrollSectionMobile';
import { AboutUs } from './components/AboutUs';
import { AboutUsMobile } from './components/AboutUsMobile';
import { CustomCursor } from './components/CustomCursor';
import { AboutUsNavigation } from './components/AboutUsNavigation';
import { MobileNavigation } from './components/MobileNavigation';
import { MobileNavigationLight } from './components/MobileNavigationLight';
import { MobileMenu } from './components/MobileMenu';
import { MobileUpArrow } from './components/MobileUpArrow';
import { UpArrowButton } from './components/UpArrowButton';
import { WhatsAppButton } from './components/WhatsAppButton';
import { fetchTeamMembers, defaultTeamMembers, type TeamMember } from './utils/teamApi';
import { fetchServices, defaultServices, type Service } from './utils/servicesApi';
import { fetchBlogs, defaultBlogs, type BlogData } from './utils/blogsApi';
import { fetchAboutUsCarouselData, defaultAboutUsCarouselData, type carouselTexts } from './utils/aboutApi';
import { useLenis } from './hooks/useLenis'; // Import Lenis hook
import { ErrorBoundary } from './components/ErrorBoundary';
import { runWhenIdle } from './utils/performanceUtils';

// Lazy load components that are not immediately visible
const Reviews = lazy(() => import('./components/Reviews').then(module => ({ default: module.Reviews })));
const Team = lazy(() => import('./components/Team').then(module => ({ default: module.Team })));
const TeamMobile = lazy(() => import('./components/TeamMobile').then(module => ({ default: module.TeamMobile })));
const Process = lazy(() => import('./components/Process'));
const ProcessMobile = lazy(() => import('./components/ProcessMobile'));
const Blogs = lazy(() => import('./components/Blogs'));
const BlogsMobile = lazy(() => import('./components/BlogsMobile').then(module => ({ default: module.BlogsMobile })));
const ContactUs = lazy(() => import('./components/ContactUs'));
const ContactUsForm = lazy(() => import('./components/ContactUsForm'));

// Loading skeleton/fallback component
const SectionLoader = () => <div className="min-h-[200px] w-full flex items-center justify-center bg-transparent" />;

// Detect iOS device for performance optimizations
const isIOS = () => {
  if (typeof navigator === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

// Detect mobile device (iOS, Android, or any device with narrow viewport)
const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  // Check both userAgent patterns and viewport width
  const mobileUserAgents = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return mobileUserAgents.test(navigator.userAgent) || window.innerWidth < 768;
};

// Calculate splash animation duration based on device type
// Mobile (iOS & Android): 1.5s animation + 0.3s buffer = 1.8s total
// Desktop: 2.2s animation + 0.5s buffer = 2.7s total
const getSplashDuration = (): number => {
  const MOBILE_ANIMATION_DURATION = 1500; // ms (aligned with dynamic progress on mobile)
  const DESKTOP_ANIMATION_DURATION = 2200; // ms (from Splash.tsx)
  const UI_TRANSITION_BUFFER = isMobileDevice() ? 300 : 500; // ms (for post-animation UI transitions)

  return (isMobileDevice() ? MOBILE_ANIMATION_DURATION : DESKTOP_ANIMATION_DURATION) + UI_TRANSITION_BUFFER;
};

export default function App() {
  const [splashAnimationComplete, setSplashAnimationComplete] = useState(false);
  const [splashHasBeenViewed, setSplashHasBeenViewed] = useState(false); // Track if splash was already viewed
  const [heroScrollProgress, setHeroScrollProgress] = useState(0);
  const [aboutUsScrollProgress, setAboutUsScrollProgress] = useState(0);
  const [servicesScrollProgress, setServicesScrollProgress] = useState(0);
  const [reviewsScrollProgress, setReviewsScrollProgress] = useState(0);
  const [teamScrollProgress, setTeamScrollProgress] = useState(0);
  const [teamInternalScrollProgress, setTeamInternalScrollProgress] = useState(0);
  const [processScrollProgress, setProcessScrollProgress] = useState(0);
  const [blogsScrollProgress, setBlogsScrollProgress] = useState(0);
  const [contactUsScrollProgress, setContactUsScrollProgress] = useState(0);
  const [contactUsFormScrollProgress, setContactUsFormScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(isMobileDevice());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(defaultTeamMembers);
  const [isLoadingTeam, setIsLoadingTeam] = useState(true);
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [blogs, setBlogs] = useState<BlogData[]>(defaultBlogs);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);
  const [carouselTexts, setCarouselTexts] = useState<carouselTexts[]>(defaultAboutUsCarouselData);
  const [isLoadingCarousel, setIsLoadingCarousel] = useState(true);
  const [mountStage, setMountStage] = useState(0); // 0: Start, 1: Hero, 2: About, 3: Middle, 4: Process, 5: Complete
  const [visualProgress, setVisualProgress] = useState(0);
  const [timeProgress, setTimeProgress] = useState(0);
  const [minSplashTimerDone, setMinSplashTimerDone] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isTutorialActive, setIsTutorialActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleTutorialChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ active: boolean }>;
      const active = !!customEvent.detail?.active;
      setIsTutorialActive(active);

      if (!active) {
        const currentScrollY = window.scrollY;
        const heroThreshold = window.innerHeight * 0.9;
        if (currentScrollY >= heroThreshold) {
          setIsHeaderVisible(false);
        }
      }
    };
    window.addEventListener('mobile-tutorial-state-change', handleTutorialChange);
    return () => {
      window.removeEventListener('mobile-tutorial-state-change', handleTutorialChange);
    };
  }, []);

  // Background simulated loader to prevent getting stuck if network/assets are slow
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeProgress(prev => {
        if (prev < 97) {
          const increment = prev < 50 ? 3 : (prev < 80 ? 1.5 : 0.3);
          return Math.min(97, prev + increment);
        }
        return prev;
      });
    }, 45);
    return () => clearInterval(interval);
  }, []);

  // Target data progress calculation (50% API, 50% Render)
  const targetDataProgress = (() => {
    // API Progress: 50% total
    const apiTotal = 4;
    const apiCount = [!isLoadingTeam, !isLoadingServices, !isLoadingBlogs, !isLoadingCarousel].filter(Boolean).length;
    const apiProgress = (apiCount / apiTotal) * 50;

    // Render Progress: 50% total (staged 0 to 5)
    // Stage 0: Initial -> 0%
    // Stage 1: Hero (rendered) -> 10%
    // Stage 2: About (rendered) -> 20%
    // Stage 3: Middle/Process (rendered) -> 30%
    // Stage 4: Blogs (rendered) -> 40%
    // Stage 5: Contact/Complete (rendered) -> 50%
    const renderProgress = (mountStage / 5) * 50;

    const realProgress = Math.min(100, Math.floor(apiProgress + renderProgress));
    if (realProgress >= 100) return 100;
    return Math.max(realProgress, Math.floor(timeProgress));
  })();

  // Smoothly increment visualProgress to targetDataProgress
  useEffect(() => {
    if (visualProgress < targetDataProgress) {
      const timer = setTimeout(() => {
        setVisualProgress(prev => Math.min(prev + 1, targetDataProgress));
      }, isMobile ? 15 : 30); // Snappier progression on mobile (1.5s total max) vs desktop (3s total max)
      return () => clearTimeout(timer);
    }
  }, [visualProgress, targetDataProgress, isMobile]);

  // Use visualProgress for the splash screens
  const dataProgress = visualProgress;

  // Initialize Lenis smooth scroll for desktop
  useLenis();

  // Handle up arrow click - scroll to top (splash screen)
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Track scroll for splash fade transition
  const { scrollY } = useScroll();

  // Create a motion value for splash opacity
  const splashOpacityValue = useMotionValue(1);

  // Background color transition - starts white, matches splash bg
  const bgColor = useTransform(
    scrollY,
    [0, window.innerHeight],
    ['#ffffff', '#ffffff']
  );

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Already initialized via isMobileDevice() at the top
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // If we are currently prerendering for SEO, mount everything immediately (Stage 3)
    if ((window as any).__PRERENDER_IN_PROGRESS__) {
      setSplashAnimationComplete(true);
      setMountStage(4);
      return;
    }

    // Start Wave 1 (Hero) immediately
    runWhenIdle(() => setMountStage(1));

    // This timer controls when the splash overlay releases scroll and shows the site.
    const splashDuration = isMobileDevice() ? 1500 : 3500;
    const timer = setTimeout(() => {
      setMinSplashTimerDone(true);
    }, splashDuration);

    // Safety timeout: If mounting/data takes too long (> 3.5s on mobile, > 6s on desktop), proceed anyway
    const safetyTimer = setTimeout(() => {
      setVisualProgress(100);
      setMountStage(5);
      setSplashAnimationComplete(true);
    }, isMobileDevice() ? 3500 : 6000);

    // Signal the inlined preloader to remove itself (once React is stable)
    const cleanupTimer = setTimeout(() => {
      if (typeof (window as any).__REMOVE_PRELOADER__ === 'function') {
        (window as any).__REMOVE_PRELOADER__();
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      clearTimeout(cleanupTimer);
      clearTimeout(safetyTimer);
    };
  }, []);

  // Synchronize splash completion with data and render readiness
  useEffect(() => {
    // We require all 5 stages to be completed and min timer done and data loaded
    if (minSplashTimerDone && mountStage >= 5 && dataProgress >= 99) {
      // Use requestIdleCallback to ensure the final splash release doesn't hitch the opening animation
      runWhenIdle(() => {
        setSplashAnimationComplete(true);
      });
    }
  }, [minSplashTimerDone, mountStage, dataProgress]);

  // Track scroll position to hide navigation during splash and manage viewed state
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (value) => {
      // On mobile: fade the splash out over just 15% of viewport height so it
      // disappears quickly on the first scroll gesture and doesn't overlap hero content.
      // On desktop: keep the original 80% parallax fade.
      const fadeThreshold = window.innerHeight * (isMobile ? 0.25 : 0.8);

      const visibilityThreshold = fadeThreshold;
      const visible = !splashHasBeenViewed && value < visibilityThreshold;
      if (visible !== isSplashVisible) {
        setIsSplashVisible(visible);
      }

      // Mark splash as viewed once user scrolls past the fade threshold
      if (value > fadeThreshold && !splashHasBeenViewed) {
        setSplashHasBeenViewed(true);
      }

      // Update splash opacity based on scroll and viewed state
      if (splashHasBeenViewed) {
        splashOpacityValue.set(0);
      } else {
        const opacity = Math.max(0, Math.min(1, 1 - (value / fadeThreshold)));
        splashOpacityValue.set(opacity);
      }
    });
    return () => unsubscribe();
  }, [scrollY, splashHasBeenViewed, splashOpacityValue, isSplashVisible, isMobile]);

  // Fetch team members from API - Defer until Stage 2 (Mid-page) for core performance
  useEffect(() => {
    const fetchMembers = async () => {
      // Small staggered delay to prevent main thread lockup on iOS
      await new Promise(resolve => setTimeout(resolve, 0));
      try {
        const members = await fetchTeamMembers();
        setTeamMembers(members);
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setIsLoadingTeam(false);
      }
    };

    fetchMembers();
  }, []);

  // Fetch services from API - Defer until Stage 1 (Top-page) for core performance
  useEffect(() => {
    const fetchServiceList = async () => {
      // Small staggered delay to prevent main thread lockup on iOS
      await new Promise(resolve => setTimeout(resolve, 80));
      try {
        const serviceList = await fetchServices();
        setServices(serviceList);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setIsLoadingServices(false);
      }
    };

    fetchServiceList();
  }, []);

  // Fetch blogs from API - Defer until Stage 3 (Page bottom) for core performance
  useEffect(() => {
    const fetchBlogList = async () => {
      // Small staggered delay to prevent main thread lockup on iOS
      await new Promise(resolve => setTimeout(resolve, 160));
      try {
        const blogList = await fetchBlogs();
        setBlogs(blogList);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setIsLoadingBlogs(false);
      }
    };

    fetchBlogList();
  }, []);

  // Fetch about us carousel data from API - Defer until Stage 1 (Top-page) for core performance
  useEffect(() => {
    const fetchCarousel = async () => {
      // Small staggered delay to prevent main thread lockup on iOS
      await new Promise(resolve => setTimeout(resolve, 240));
      try {
        const carouselData = await fetchAboutUsCarouselData();
        setCarouselTexts(carouselData);
      } catch (error) {
        console.error('Error fetching about us carousel data:', error);
      } finally {
        setIsLoadingCarousel(false);
      }
    };

    fetchCarousel();
  }, []);

  // Track active section using Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger when section is in middle of viewport
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          // Map section IDs to menu items
          switch (sectionId) {
            case 'HeroSection':
              setActiveSection('home');
              break;
            case 'AboutUsSection':
              setActiveSection('about');
              break;
            case 'ServiceSection':
              setActiveSection('services');
              break;
            case 'ReviewsSection':
              setActiveSection('reviews');
              break;
            case 'TeamSection':
              setActiveSection('team');
              break;
            case 'ProcessSection':
              setActiveSection('process');
              break;
            case 'BlogsSection':
              setActiveSection('blogs');
              break;
            case 'ContactUsSection':
              setActiveSection('none'); // Deactivate all menu items in Contact Us section
              break;
            default:
              break;
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    const sections = [
      'HeroSection',
      'AboutUsSection',
      'ServiceSection',
      'ReviewsSection',
      'TeamSection',
      'ProcessSection',
      'BlogsSection',
      'ContactUsSection'
    ];

    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const lastScrollY = useRef(0);

  // Mobile Header Visibility Logic: Hide on scroll down, show on scroll up after hero section
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // If mobile menu is open, always show the header
      if (isMobileMenuOpen) {
        setIsHeaderVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Hero threshold (e.g. 90% of viewport height)
      const heroThreshold = window.innerHeight * 0.9;

      if (currentScrollY < heroThreshold) {
        // Keep header visible in the hero section
        setIsHeaderVisible(true);
      } else {
        // Past the hero section: hide on scroll down, show on scroll up
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down
          setIsHeaderVisible(false);
        } else {
          // Scrolling up
          setIsHeaderVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile, isMobileMenuOpen]);

  return (
    <motion.div
      ref={containerRef}
      className="relative"
      style={{
        backgroundColor: bgColor
      } as any}
    >
      {/* Custom Cursor - Fully deferred for performance */}
      {(splashAnimationComplete || splashHasBeenViewed) && (
        <CustomCursor
          aboutUsScrollProgress={aboutUsScrollProgress}
          reviewsScrollProgress={reviewsScrollProgress}
          teamScrollProgress={teamScrollProgress}
          processScrollProgress={processScrollProgress}
          blogsScrollProgress={blogsScrollProgress}
          contactUsScrollProgress={contactUsScrollProgress}
          isSplashVisible={isSplashVisible}
        />
      )}
      {/* Navigation Bar - Desktop and Tablet only */}
      {!isMobile && (
        <AboutUsNavigation
          aboutUsScrollProgress={aboutUsScrollProgress}
          reviewsScrollProgress={reviewsScrollProgress}
          processScrollProgress={processScrollProgress}
          blogsScrollProgress={blogsScrollProgress}
          heroScrollProgress={heroScrollProgress}
          teamScrollProgress={teamScrollProgress}
          isReviewsActive={reviewsScrollProgress > 0 && reviewsScrollProgress < 0.80}
          isContactUsSection={contactUsScrollProgress > 0}
          contactUsFormScrollProgress={contactUsFormScrollProgress}
          splashViewed={splashHasBeenViewed}
        />
      )}

      {/* Mobile Navigation - switches between dark (hero) and light (about us/services/reviews) */}
      {/* Hero section - dark background (before white transition) */}
      {isMobile && splashAnimationComplete && !isSplashVisible && heroScrollProgress < 0.90 && aboutUsScrollProgress < 0.05 && (
        <MobileNavigation setIsMobileMenuOpen={setIsMobileMenuOpen} isMobileMenuOpen={isMobileMenuOpen} isVisible={isHeaderVisible && !isTutorialActive} />
      )}
      {/* Hero section - white background (after white transition at compliance) */}
      {isMobile && splashAnimationComplete && !isSplashVisible && heroScrollProgress >= 0.90 && aboutUsScrollProgress < 0.05 && (
        <MobileNavigationLight setIsMobileMenuOpen={setIsMobileMenuOpen} isMobileMenuOpen={isMobileMenuOpen} isVisible={isHeaderVisible && !isTutorialActive} />
      )}
      {/* About Us section - light background */}
      {isMobile && splashAnimationComplete && !isSplashVisible && aboutUsScrollProgress > 0 && (
        <MobileNavigationLight setIsMobileMenuOpen={setIsMobileMenuOpen} isMobileMenuOpen={isMobileMenuOpen} isVisible={isHeaderVisible && !isTutorialActive} />
      )}
      {/* Reviews section - light background */}
      {isMobile && splashAnimationComplete && !isSplashVisible && reviewsScrollProgress > 0 && teamScrollProgress === 0 && processScrollProgress === 0 && (
        <MobileNavigationLight setIsMobileMenuOpen={setIsMobileMenuOpen} isMobileMenuOpen={isMobileMenuOpen} isVisible={isHeaderVisible && !isTutorialActive} />
      )}
      {/* Team section - dark background (both steps) */}
      {isMobile && splashAnimationComplete && !isSplashVisible && teamScrollProgress > 0 && processScrollProgress === 0 && (
        <MobileNavigation setIsMobileMenuOpen={setIsMobileMenuOpen} zIndex={100} isMobileMenuOpen={isMobileMenuOpen} isVisible={isHeaderVisible && !isTutorialActive} />
      )}
      {/* Process section - dark background */}
      {isMobile && splashAnimationComplete && !isSplashVisible && processScrollProgress > 0 && blogsScrollProgress === 0 && (
        <MobileNavigation setIsMobileMenuOpen={setIsMobileMenuOpen} isMobileMenuOpen={isMobileMenuOpen} isVisible={isHeaderVisible && !isTutorialActive} />
      )}
      {/* Blogs section - light background */}
      {isMobile && splashAnimationComplete && !isSplashVisible && blogsScrollProgress > 0 && contactUsScrollProgress === 0 && (
        <MobileNavigationLight setIsMobileMenuOpen={setIsMobileMenuOpen} isMobileMenuOpen={isMobileMenuOpen} isVisible={isHeaderVisible && !isTutorialActive} />
      )}
      {/* Contact Us section - dark background */}
      {isMobile && splashAnimationComplete && !isSplashVisible && contactUsScrollProgress > 0 && (
        <MobileNavigation setIsMobileMenuOpen={setIsMobileMenuOpen} isMobileMenuOpen={isMobileMenuOpen} isVisible={isHeaderVisible && !isTutorialActive} />
      )}

      {/* Mobile Menu */}
      {isMobile && (
        <MobileMenu
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          theme={
            // Determine theme based on current section
            // Light theme sections: About Us (before Services), Reviews, Blogs, "Reach us at"
            // Dark theme sections: Hero, Services (after masking), Team, Process, Contact Us Form
            (heroScrollProgress >= 0.90 && aboutUsScrollProgress < 0.05) || // Hero white transition
              (aboutUsScrollProgress > 0 && aboutUsScrollProgress < 0.68) || // About Us section (before Services masking complete)
              (reviewsScrollProgress > 0 && teamScrollProgress === 0) || // Reviews section
              (blogsScrollProgress > 0 && contactUsScrollProgress === 0) || // Blogs section
              (contactUsScrollProgress > 0 && contactUsFormScrollProgress === 0) // "Reach us at" section (before form)
              ? 'light'
              : 'dark'
          }
        />
      )}

      {/* Splash Screen - Fades up on scroll */}
      <motion.div
        className="fixed inset-0 z-50 pointer-events-none"
        style={{
          opacity: splashOpacityValue,
          display: useTransform(splashOpacityValue, [0, 0.01], ['none', 'block']),
          top: '-2px',
          bottom: '-2px',
          left: '-2px',
          right: '-2px'
        }}
      >
        {isMobile ? <SplashMobile dataProgress={dataProgress} onComplete={() => { }} /> : <Splash dataProgress={dataProgress} onComplete={() => { }} />}
      </motion.div>

      {/* Hero Screen - Conditional rendering based on screen size */}
      <div id="HeroSection">
        {isMobile ? (
          <HeroScrollSectionMobile
            onScrollProgress={setHeroScrollProgress}
            splashViewed={splashHasBeenViewed}
            onReady={() => setMountStage(prev => Math.max(prev, 1))}
          />
        ) : (
          <HeroScrollSection
            onScrollProgress={setHeroScrollProgress}
            splashViewed={splashHasBeenViewed}
            onReady={() => setMountStage(prev => Math.max(prev, 1))}
          />
        )}
      </div>

      {/* Wave 2 Components: About Us / Services */}
      {(mountStage >= 1 || splashHasBeenViewed) && (
        <>
          <div id="AboutUsSection" style={{ marginTop: isMobile ? '-350px' : '0' }}>
            {isMobile ? (
              <AboutUsMobile
                onScrollProgress={setAboutUsScrollProgress}
                carouselTexts={carouselTexts}
                services={services}
                onReady={() => setMountStage(prev => Math.max(prev, 2))}
              />
            ) : (
              <AboutUs
                onScrollProgress={setAboutUsScrollProgress}
                onServicesScrollProgress={setServicesScrollProgress}
                reviewsScrollProgress={reviewsScrollProgress}
                services={services}
                carouselTexts={carouselTexts}
                onReady={() => setMountStage(prev => Math.max(prev, 2))}
              />
            )}
          </div>

          <div id="ServiceSection">
            {/* This ID points to the same section as About Us since Services is part of About Us */}
          </div>
        </>
      )}

      {/* Wave 3 Components: Middle Content (Reviews/Team/Process) */}
      {(mountStage >= 2 || splashHasBeenViewed) && (
        <>
          <div id="ReviewsSection">
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <Reviews
                  onScrollProgress={setReviewsScrollProgress}
                  aboutUsScrollProgress={aboutUsScrollProgress}
                  processScrollProgress={processScrollProgress}
                  onReady={() => {/* Managed by Team/Process for Wave 3 completion */ }}
                />
              </Suspense>
            </ErrorBoundary>
          </div>

          <div id="TeamSection" className={isMobile ? "min-h-[150vh] bg-[#2c4657] overflow-hidden" : ""}>
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                {!isMobile && (
                  <Team
                    reviewsScrollProgress={reviewsScrollProgress}
                    aboutUsScrollProgress={aboutUsScrollProgress}
                    teamMembers={teamMembers}
                    processScrollProgress={processScrollProgress}
                    onReady={() => {/* Managed by Process */ }}
                  />
                )}
                {isMobile && (
                  <TeamMobile
                    reviewsScrollProgress={reviewsScrollProgress}
                    teamMembers={teamMembers}
                    processScrollProgress={processScrollProgress}
                    onScrollProgress={setTeamScrollProgress}
                    onReady={() => {/* Managed by Process */ }}
                  />
                )}
              </Suspense>
            </ErrorBoundary>
          </div>

          <div id="ProcessSection">
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                {!isMobile && (
                  <Process
                    onScrollProgress={setProcessScrollProgress}
                    onReady={() => setMountStage(prev => Math.max(prev, 3))}
                  />
                )}
                {isMobile && (
                  <ProcessMobile
                    onScrollProgress={setProcessScrollProgress}
                    teamScrollProgress={teamInternalScrollProgress}
                    onReady={() => setMountStage(prev => Math.max(prev, 3))}
                  />
                )}
              </Suspense>
            </ErrorBoundary>
          </div>
        </>
      )}

      {/* Wave 4 Components: Bottom Content (Blogs/Contact) */}
      {(mountStage >= 3 || splashHasBeenViewed) && (
        <>
          <div id="BlogsSection">
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                {!isMobile && (
                  <Blogs
                    onScrollProgress={setBlogsScrollProgress}
                    blogs={blogs}
                    contactUsScrollProgress={contactUsScrollProgress}
                    onReady={() => setMountStage(prev => Math.max(prev, 4))}
                  />
                )}
                {isMobile && (
                  <BlogsMobile
                    onScrollProgress={setBlogsScrollProgress}
                    blogs={blogs}
                    onReady={() => setMountStage(prev => Math.max(prev, 4))}
                  />
                )}
              </Suspense>
            </ErrorBoundary>
          </div>

          <div id="ContactUsSection">
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <ContactUs onScrollProgress={setContactUsScrollProgress} />
                <ContactUsForm
                  onScrollProgress={setContactUsFormScrollProgress}
                  onReady={() => setMountStage(prev => Math.max(prev, 5))}
                />
              </Suspense>
            </ErrorBoundary>
          </div>
        </>
      )}

      {/* Deferred Secondary UI Elements */}
      {(mountStage >= 1 || splashHasBeenViewed || ((window as any).__PRERENDER_IN_PROGRESS__)) && (
        <>
          {/* Up Arrow Button - Mobile only - appears across all sections from Hero compliance onwards */}
          {isMobile && (heroScrollProgress >= 0.82 || aboutUsScrollProgress > 0 || reviewsScrollProgress > 0 || teamScrollProgress > 0 || processScrollProgress > 0) && (
            <div className="fixed bottom-[40px] right-[24px] z-[250]">
              <MobileUpArrow onClick={handleScrollToTop} />
            </div>
          )}
          {/* Up Arrow Button - Desktop only - appears across all sections from Hero compliance onwards */}
          {!isMobile && (heroScrollProgress >= 0.82 || aboutUsScrollProgress > 0 || reviewsScrollProgress > 0 || teamScrollProgress > 0 || processScrollProgress > 0 || blogsScrollProgress > 0 || contactUsScrollProgress > 0 || contactUsFormScrollProgress > 0) && (
            <div className="fixed bottom-[40px] right-[24px] z-[250]">
              <UpArrowButton onClick={handleScrollToTop} />
            </div>
          )}
          <WhatsAppButton
            heroScrollProgress={heroScrollProgress}
            aboutUsScrollProgress={aboutUsScrollProgress}
            reviewsScrollProgress={reviewsScrollProgress}
            teamScrollProgress={teamScrollProgress}
            processScrollProgress={processScrollProgress}
            blogsScrollProgress={blogsScrollProgress}
            contactUsFormScrollProgress={contactUsFormScrollProgress}
            contactUsScrollProgress={contactUsScrollProgress}
            splashHasBeenViewed={splashHasBeenViewed || splashAnimationComplete}
          />
        </>
      )}
    </motion.div>
  );
}