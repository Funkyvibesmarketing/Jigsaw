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
    // Wait for splash animation to complete before enabling scroll
    const timer = setTimeout(() => {
      setSplashAnimationComplete(true);
    }, 2200); // Match the splash animation duration

    // Signal the inlined preloader to remove itself (once React is stable)
    const cleanupTimer = setTimeout(() => {
      if (typeof (window as any).__REMOVE_PRELOADER__ === 'function') {
        (window as any).__REMOVE_PRELOADER__();
      }
      // Only set splash viewed after a small delay to ensure cleanup is done
      setTimeout(() => {
        // Set a global flag or local state if needed
      }, 300);
    }, 50);

    return () => {
      clearTimeout(timer);
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

  // Fetch team members from API
  useEffect(() => {
    const fetchMembers = async () => {
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

  // Fetch services from API
  useEffect(() => {
    const fetchServiceList = async () => {
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

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogList = async () => {
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

  // Fetch about us carousel data from API
  useEffect(() => {
    const fetchCarousel = async () => {
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
      {/* Custom Cursor */}
      <CustomCursor 
        aboutUsScrollProgress={aboutUsScrollProgress}
        reviewsScrollProgress={reviewsScrollProgress}
        teamScrollProgress={teamScrollProgress}
        processScrollProgress={processScrollProgress}
        blogsScrollProgress={blogsScrollProgress}
        contactUsScrollProgress={contactUsScrollProgress}
        currentScrollY={currentScrollY}
      />
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
        {isMobile ? <SplashMobile onComplete={() => {}} /> : <Splash onComplete={() => {}} />}
      </motion.div>

      {/* Hero Screen - Conditional rendering based on screen size */}
      <div id="HeroSection">
        {isMobile ? <HeroScrollSectionMobile onScrollProgress={setHeroScrollProgress} splashViewed={splashHasBeenViewed} /> : <HeroScrollSection onScrollProgress={setHeroScrollProgress} splashViewed={splashHasBeenViewed} />}
      </div>

      {/* About Us Section */}
      <div id="AboutUsSection" style={{marginTop: isMobile ? '-345px' : '0'}}>
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

      {/* Services Section - same as About Us on mobile */}
      <div id="ServiceSection">
        {/* This ID points to the same section as About Us since Services is part of About Us */}
      </div>
      
      {/* Reviews Section - appears after About Us/Services */}
      <div id="ReviewsSection">
        <Suspense fallback={<SectionLoader />}>
          <Reviews onScrollProgress={setReviewsScrollProgress} aboutUsScrollProgress={aboutUsScrollProgress} processScrollProgress={processScrollProgress} />
        </Suspense>
      </div>
      
      {/* Team Section - appears after Reviews with TEAM text transition */}
      <div id="TeamSection" className={isMobile ? "min-h-[50vh] bg-[#2c4657]" : ""}>
        <Suspense fallback={<SectionLoader />}>
          {!isMobile && <Team reviewsScrollProgress={reviewsScrollProgress} aboutUsScrollProgress={aboutUsScrollProgress} teamMembers={teamMembers} processScrollProgress={processScrollProgress} />}
          {isMobile && <TeamMobile reviewsScrollProgress={reviewsScrollProgress} teamMembers={teamMembers} processScrollProgress={processScrollProgress} onScrollProgress={setTeamScrollProgress} />}
        </Suspense>
      </div>
      
      {/* Process Section - appears after Team section */}
      <div id="ProcessSection" className={isMobile ? "" : ""}>
        <Suspense fallback={<SectionLoader />}>
          {!isMobile && <Process onScrollProgress={setProcessScrollProgress} />}
          {isMobile && <ProcessMobile onScrollProgress={setProcessScrollProgress} teamScrollProgress={teamInternalScrollProgress} />}
        </Suspense>
      </div>
      
      {/* Blogs Section - appears after Process section */}
      <div id="BlogsSection">
        <Suspense fallback={<SectionLoader />}>
          {!isMobile && <Blogs onScrollProgress={setBlogsScrollProgress} blogs={blogs} contactUsScrollProgress={contactUsScrollProgress} />}
          {isMobile && <BlogsMobile onScrollProgress={setBlogsScrollProgress} blogs={blogs} />}
        </Suspense>
      </div>
      
      {/* Contact Us Section - appears after Blogs section (Desktop only) */}
      <div id="ContactUsSection">
        <Suspense fallback={<SectionLoader />}>
          <ContactUs onScrollProgress={setContactUsScrollProgress} />
          {/* Contact Us Form Section - appears after Contact Us section (Desktop only) */}
          <ContactUsForm onScrollProgress={setContactUsFormScrollProgress} />
        </Suspense>
      </div>
      
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
        splashHasBeenViewed={splashHasBeenViewed}
      />
    </motion.div>
  );
}