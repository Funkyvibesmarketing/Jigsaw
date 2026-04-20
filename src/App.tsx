import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'motion/react';
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
// Mobile (iOS & Android): 2.0s animation + 0.5s buffer = 2.5s total
// Desktop: 2.2s animation + 0.5s buffer = 2.7s total
const getSplashDuration = (): number => {
  const MOBILE_ANIMATION_DURATION = 2000; // ms (from SplashMobile.tsx for both iOS and Android)
  const DESKTOP_ANIMATION_DURATION = 2200; // ms (from Splash.tsx)
  const UI_TRANSITION_BUFFER = 500; // ms (for post-animation UI transitions)

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
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentScrollY, setCurrentScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(defaultTeamMembers);
  const [isLoadingTeam, setIsLoadingTeam] = useState(true);
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [blogs, setBlogs] = useState<BlogData[]>(defaultBlogs);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);
  const [carouselTexts, setCarouselTexts] = useState<carouselTexts[]>(defaultAboutUsCarouselData);
  const [isLoadingCarousel, setIsLoadingCarousel] = useState(true);
  const [mountStage, setMountStage] = useState(0); // 0: Splash, 1: Hero+AboutUs, 2: Mid, 3: Full
  const containerRef = useRef<HTMLDivElement>(null);

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

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // If we are currently prerendering for SEO, mount everything immediately (Stage 3)
    if ((window as any).__PRERENDER_IN_PROGRESS__) {
      setSplashAnimationComplete(true);
      setMountStage(3);
      return;
    }

    // Start background loading waves immediately but spread them out to prevent logo jitter.
    // Wave 1: Hero + About Us (Small initial hydration)
    const wave1Timer = setTimeout(() => setMountStage(prev => Math.max(prev, 1)), 800);

    // Wave 2: Middle Sections (Reviews/Team/Process) - Start at 2.5s
    const wave2Timer = setTimeout(() => setMountStage(prev => Math.max(prev, 2)), 2500);

    // Wave 3: Bottom Sections (Blogs/Contact) - Start at 4.0s
    const wave3Timer = setTimeout(() => setMountStage(prev => Math.max(prev, 3)), 4000);

    // This timer controls when the "Scroll Down" button and site visibility triggers
    const timer = setTimeout(() => {
      setSplashAnimationComplete(true);
    }, 5500); // 5000ms (splash duration) + 500ms buffer

    // Signal the inlined preloader to remove itself (once React is stable)
    const cleanupTimer = setTimeout(() => {
      if (typeof (window as any).__REMOVE_PRELOADER__ === 'function') {
        (window as any).__REMOVE_PRELOADER__();
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      clearTimeout(wave1Timer);
      clearTimeout(wave2Timer);
      clearTimeout(wave3Timer);
      clearTimeout(cleanupTimer);
    };
  }, []);

  // Track scroll position to hide navigation during splash
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (value) => {
      setCurrentScrollY(value);

      // Mark splash as viewed once user scrolls past the splash fade threshold
      // Splash fades out at 0.8vh, so mark it as viewed after that
      const splashFadeThreshold = window.innerHeight * 0.8;
      if (value > splashFadeThreshold && !splashHasBeenViewed) {
        setSplashHasBeenViewed(true);
      }

      // OPTIMIZATION: If the user starts scrolling, mount all remaining sections immediately
      // This prevents "grey holes" if the user scrolls faster than the staggered timers.
      if (value > 50 && mountStage > 0 && mountStage < 3) {
        setMountStage(3);
      }

      // Update splash opacity based on scroll and viewed state
      if (splashHasBeenViewed) {
        splashOpacityValue.set(0);
      } else {
        const fadeThreshold = window.innerHeight * 0.8;
        const opacity = Math.max(0, Math.min(1, 1 - (value / fadeThreshold)));
        splashOpacityValue.set(opacity);
      }
    });
    return () => unsubscribe();
  }, [scrollY, splashHasBeenViewed, splashOpacityValue]);

  // Calculate if splash is still visible (navigation should be hidden)
  const isSplashVisible = !splashHasBeenViewed && currentScrollY < window.innerHeight * 0.3;

  // Fetch team members from API - Defer until Stage 2 (Mid-page) for core performance
  useEffect(() => {
    if (mountStage < 2 && !splashHasBeenViewed) return;

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
  }, [mountStage, splashAnimationComplete, splashHasBeenViewed]);

  // Fetch services from API - Defer until Stage 1 (Top-page) for core performance
  useEffect(() => {
    if (mountStage < 1 && !splashHasBeenViewed) return;

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
  }, [mountStage, splashAnimationComplete, splashHasBeenViewed]);

  // Fetch blogs from API - Defer until Stage 3 (Page bottom) for core performance
  useEffect(() => {
    if (mountStage < 3 && !splashHasBeenViewed) return;

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
  }, [mountStage, splashAnimationComplete, splashHasBeenViewed]);

  // Fetch about us carousel data from API - Defer until Stage 1 (Top-page) for core performance
  useEffect(() => {
    if (mountStage < 1 && !splashHasBeenViewed) return;

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
  }, [mountStage, splashAnimationComplete, splashHasBeenViewed]);

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

  return (
    <motion.div
      ref={containerRef}
      className="relative"
      style={{
        backgroundColor: bgColor,
        touchAction: 'pan-y', // Enable vertical touch scrolling
        WebkitOverflowScrolling: 'touch' // Smooth scrolling on iOS
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
          currentScrollY={currentScrollY}
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
        <MobileNavigation setIsMobileMenuOpen={setIsMobileMenuOpen} isMobileMenuOpen={isMobileMenuOpen} />
      )}
      {/* Hero section - white background (after white transition at compliance) */}
      {isMobile && splashAnimationComplete && !isSplashVisible && heroScrollProgress >= 0.90 && aboutUsScrollProgress < 0.05 && (
        <MobileNavigationLight setIsMobileMenuOpen={setIsMobileMenuOpen} isMobileMenuOpen={isMobileMenuOpen} />
      )}
      {/* About Us section - light background */}
      {isMobile && splashAnimationComplete && !isSplashVisible && aboutUsScrollProgress > 0 && (
        <MobileNavigationLight setIsMobileMenuOpen={setIsMobileMenuOpen} isMobileMenuOpen={isMobileMenuOpen} />
      )}
      {/* Reviews section - light background */}
      {isMobile && splashAnimationComplete && !isSplashVisible && reviewsScrollProgress > 0 && teamScrollProgress === 0 && processScrollProgress === 0 && (
        <MobileNavigationLight setIsMobileMenuOpen={setIsMobileMenuOpen} isMobileMenuOpen={isMobileMenuOpen} />
      )}
      {/* Team section - dark background (both steps) */}
      {isMobile && splashAnimationComplete && !isSplashVisible && teamScrollProgress > 0 && processScrollProgress === 0 && (
        <MobileNavigation setIsMobileMenuOpen={setIsMobileMenuOpen} zIndex={100} isMobileMenuOpen={isMobileMenuOpen} />
      )}
      {/* Process section - dark background */}
      {isMobile && splashAnimationComplete && !isSplashVisible && processScrollProgress > 0 && blogsScrollProgress === 0 && (
        <MobileNavigation setIsMobileMenuOpen={setIsMobileMenuOpen} isMobileMenuOpen={isMobileMenuOpen} />
      )}
      {/* Blogs section - light background */}
      {isMobile && splashAnimationComplete && !isSplashVisible && blogsScrollProgress > 0 && contactUsScrollProgress === 0 && (
        <MobileNavigationLight setIsMobileMenuOpen={setIsMobileMenuOpen} isMobileMenuOpen={isMobileMenuOpen} />
      )}
      {/* Contact Us section - dark background */}
      {isMobile && splashAnimationComplete && !isSplashVisible && contactUsScrollProgress > 0 && (
        <MobileNavigation setIsMobileMenuOpen={setIsMobileMenuOpen} isMobileMenuOpen={isMobileMenuOpen} />
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
        className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
        style={{
          opacity: splashOpacityValue,
          top: '-2px',
          bottom: '-2px',
          left: '-2px',
          right: '-2px'
        }}
      >
        {isMobile ? <SplashMobile onComplete={() => { }} /> : <Splash onComplete={() => { }} />}
      </motion.div>

      {/* Hero Screen - Conditional rendering based on screen size */}
      <div id="HeroSection">
        {isMobile ? <HeroScrollSectionMobile onScrollProgress={setHeroScrollProgress} splashViewed={splashHasBeenViewed} /> : <HeroScrollSection onScrollProgress={setHeroScrollProgress} splashViewed={splashHasBeenViewed} />}
      </div>

      {/* Wave 1 Components: Hero + About Us (The content the user sees immediately) */}
      {(mountStage >= 1 || splashHasBeenViewed) && (
        <>
          {/* About Us Section */}
          <div id="AboutUsSection" style={{ marginTop: isMobile ? '-345px' : '0' }}>
            {isMobile ? (
              <AboutUsMobile onScrollProgress={setAboutUsScrollProgress} carouselTexts={carouselTexts} />
            ) : (
              <AboutUs
                onScrollProgress={setAboutUsScrollProgress}
                onServicesScrollProgress={setServicesScrollProgress}
                reviewsScrollProgress={reviewsScrollProgress}
                services={services}
                carouselTexts={carouselTexts}
              />
            )}
          </div>

          <div id="ServiceSection">
            {/* This ID points to the same section as About Us since Services is part of About Us */}
          </div>
        </>
      )}

      {/* Wave 2 Components: Middle Content (Mounts after 2s delay) */}
      {(mountStage >= 2 || splashHasBeenViewed) && (
        <>
          <div id="ReviewsSection">
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <Reviews onScrollProgress={setReviewsScrollProgress} aboutUsScrollProgress={aboutUsScrollProgress} processScrollProgress={processScrollProgress} />
              </Suspense>
            </ErrorBoundary>
          </div>

          <div id="TeamSection" className={isMobile ? "min-h-[50vh] bg-[#2c4657]" : ""}>
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                {!isMobile && <Team reviewsScrollProgress={reviewsScrollProgress} aboutUsScrollProgress={aboutUsScrollProgress} teamMembers={teamMembers} processScrollProgress={processScrollProgress} />}
                {isMobile && <TeamMobile reviewsScrollProgress={reviewsScrollProgress} teamMembers={teamMembers} processScrollProgress={processScrollProgress} onScrollProgress={setTeamScrollProgress} />}
              </Suspense>
            </ErrorBoundary>
          </div>

          <div id="ProcessSection" className={isMobile ? "" : ""}>
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                {!isMobile && <Process onScrollProgress={setProcessScrollProgress} />}
                {isMobile && <ProcessMobile onScrollProgress={setProcessScrollProgress} teamScrollProgress={teamInternalScrollProgress} />}
              </Suspense>
            </ErrorBoundary>
          </div>
        </>
      )}

      {/* Wave 3 Components: Bottom Content (Mounts after 4s delay) */}
      {(mountStage >= 3 || splashHasBeenViewed) && (
        <>
          <div id="BlogsSection">
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                {!isMobile && <Blogs onScrollProgress={setBlogsScrollProgress} blogs={blogs} contactUsScrollProgress={contactUsScrollProgress} />}
                {isMobile && <BlogsMobile onScrollProgress={setBlogsScrollProgress} blogs={blogs} />}
              </Suspense>
            </ErrorBoundary>
          </div>

          <div id="ContactUsSection">
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <ContactUs onScrollProgress={setContactUsScrollProgress} />
                <ContactUsForm onScrollProgress={setContactUsFormScrollProgress} />
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