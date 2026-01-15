import { useEffect, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'motion/react';
import svgPathsLight from '../imports/svg-ocjo2bj55r';
import svgPathsDark from '../imports/svg-iqnu45ed6g';
import svgPathsScrolling from '../imports/svg-k4gl8dsfxl';
import svgPathsAfterZoom from '../imports/svg-wkqtg88nrk';
import svgPathsReviews from '../imports/svg-bolpleu54r';
import svgPathsSplash from '../imports/svg-4kj0u9tsz3';

export function CustomCursor({ aboutUsScrollProgress, servicesScrollProgress, reviewsScrollProgress, teamScrollProgress, processScrollProgress, blogsScrollProgress, contactUsScrollProgress, currentScrollY }: { 
  aboutUsScrollProgress: number;
  servicesScrollProgress?: number;
  reviewsScrollProgress?: number;
  teamScrollProgress?: number;
  processScrollProgress?: number;
  blogsScrollProgress?: number;
  contactUsScrollProgress?: number;
  currentScrollY?: number;
}) {
  const [cursorType, setCursorType] = useState<'light' | 'dark' | 'scrolling' | 'afterZoom' | 'reviews' | 'splash'>('splash');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [hideOverlay, setHideOverlay] = useState(false);
  const { scrollY } = useScroll();

  // Listen for custom events to hide/show cursor overlay
  useEffect(() => {
    const handleHideCursor = () => setHideOverlay(true);
    const handleShowCursor = () => setHideOverlay(false);
    
    window.addEventListener('hideCursorOverlay', handleHideCursor);
    window.addEventListener('showCursorOverlay', handleShowCursor);
    
    return () => {
      window.removeEventListener('hideCursorOverlay', handleHideCursor);
      window.removeEventListener('showCursorOverlay', handleShowCursor);
    };
  }, []);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Splash screen - use splash cursor (when very little scroll)
    if (currentScrollY !== undefined && currentScrollY < window.innerHeight * 0.3) {
      setCursorType('splash');
      return;
    }
    
    // Contact Us section - dark background, use light cursor
    if (contactUsScrollProgress !== undefined && contactUsScrollProgress >= 0.01) {
      setCursorType('light');
      return;
    }
    
    // Blogs section - light background, use dark cursor (reviews style)
    if (blogsScrollProgress !== undefined && blogsScrollProgress >= 0.01) {
      setCursorType('reviews');
      return;
    }
    
    // Process section - dark background, use light cursor
    if (processScrollProgress !== undefined && processScrollProgress >= 0.01) {
      setCursorType('light');
      return;
    }
    
    // Team section - dark background, use light cursor
    if (teamScrollProgress !== undefined && teamScrollProgress >= 0.01) {
      setCursorType('light');
      return;
    }
    
    // Reviews section - light background, use dark cursor (reviews style)
    if (reviewsScrollProgress !== undefined && reviewsScrollProgress >= 0.01) {
      setCursorType('reviews');
      return;
    }
    
    // Services Step 2 (modal view) - hide global cursor (servicesScrollProgress === 1)
    // Services Step 1 (scroll view) - show light cursor (servicesScrollProgress > 0.1 && < 1)
    if (servicesScrollProgress && servicesScrollProgress >= 1) {
      // Services Step 2 is active - don't show global cursor
      return;
    } else if (servicesScrollProgress && servicesScrollProgress > 0.1) {
      setCursorType('light');
    } 
    // Check if we're in the About Us section - light background
    else if (aboutUsScrollProgress > 0.05 && aboutUsScrollProgress < 0.55) {
      // Before zoom - show "keep scrolling" cursor
      setCursorType('scrolling');
    } else if (aboutUsScrollProgress >= 0.55) {
      // After zoom trigger - show dark cursor (light background)
      setCursorType('dark');
    } else if (latest > window.innerHeight * 0.3) {
      // Hero compliance section - white background, use dark cursor
      setCursorType('dark');
    } else {
      // Hero section - dark background, use light cursor
      setCursorType('light');
    }
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Don't apply custom cursor styles on mobile - use default cursor
    if (isMobile) {
      // Remove any custom cursor styles and reset to default
      const existingStyle = document.getElementById('custom-cursor-style');
      if (existingStyle) {
        existingStyle.remove();
      }
      document.documentElement.style.cursor = '';
      return;
    }

    // Don't apply cursor styles when Services Step 2 is active
    if (servicesScrollProgress && servicesScrollProgress >= 1) {
      const existingStyle = document.getElementById('custom-cursor-style');
      if (existingStyle) {
        existingStyle.remove();
      }
      document.documentElement.style.cursor = '';
      return;
    }

    if (cursorType === 'scrolling' || cursorType === 'reviews') {
      // Hide default cursor when showing custom overlay
      // Use * selector to ensure all interactive elements also have cursor: none
      // BUT exclude specific interactive elements like buttons and links
      const existingStyle = document.getElementById('custom-cursor-style');
      if (existingStyle) {
        existingStyle.remove();
      }
      const style = document.createElement('style');
      style.id = 'custom-cursor-style';
      style.textContent = `
        * { cursor: none !important; }
        button { cursor: pointer !important; }
        a { cursor: pointer !important; }
        input { cursor: text !important; }
        textarea { cursor: text !important; }
        .use-default-cursor, .use-default-cursor * { cursor: pointer !important; }
      `;
      document.head.appendChild(style);
      
      return () => {
        const existingStyle = document.getElementById('custom-cursor-style');
        if (existingStyle) {
          existingStyle.remove();
        }
      };
    } else {
      // Remove the cursor: none style if it exists
      const existingStyle = document.getElementById('custom-cursor-style');
      if (existingStyle) {
        existingStyle.remove();
      }
      
      // Create SVG data URLs for cursors
      const lightCursorSVG = `
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#2EC4B6" fill-opacity="0.1" height="48" rx="24" width="48" />
          <path d="${svgPathsLight.p38113d00}" fill="#2C4657" />
          <path d="${svgPathsLight.p10586800}" fill="#2C4657" />
        </svg>
      `;

      const darkCursorSVG = `
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#2EC4B6" fill-opacity="0.1" height="48" rx="24" width="48" />
          <path d="${svgPathsDark.p38113d00}" fill="white" />
          <path d="${svgPathsDark.p10586800}" fill="white" />
        </svg>
      `;

      const afterZoomCursorSVG = `
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#2EC4B6" fill-opacity="0.1" height="48" rx="24" width="48" />
          <path d="${svgPathsAfterZoom.p38113d00}" fill="#2C4657" />
          <path d="${svgPathsAfterZoom.p10586800}" fill="#2C4657" />
        </svg>
      `;

      const reviewsCursorSVG = `
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#2EC4B6" fill-opacity="0.1" height="48" rx="24" width="48" />
          <path d="${svgPathsReviews.p38113d00}" fill="white" />
          <path d="${svgPathsReviews.p10586800}" fill="white" />
        </svg>
      `;

      const splashCursorSVG = `
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#2EC4B6" fill-opacity="0.1" height="48" rx="24" width="48" />
          <path d="${svgPathsSplash.p38113d00}" fill="#2C4657" />
          <path d="${svgPathsSplash.p10586800}" fill="#2C4657" />
        </svg>
      `;

      const lightCursorURL = `data:image/svg+xml;base64,${btoa(lightCursorSVG)}`;
      const darkCursorURL = `data:image/svg+xml;base64,${btoa(darkCursorSVG)}`;
      const afterZoomCursorURL = `data:image/svg+xml;base64,${btoa(afterZoomCursorSVG)}`;
      const reviewsCursorURL = `data:image/svg+xml;base64,${btoa(reviewsCursorSVG)}`;
      const splashCursorURL = `data:image/svg+xml;base64,${btoa(splashCursorSVG)}`;

      // Apply cursor to document
      let cursorURL = lightCursorURL;
      if (cursorType === 'splash') {
        cursorURL = splashCursorURL;
      } else if (cursorType === 'dark') {
        cursorURL = darkCursorURL;
      } else if (cursorType === 'afterZoom') {
        cursorURL = afterZoomCursorURL;
      } else if (cursorType === 'reviews') {
        cursorURL = reviewsCursorURL;
      }
      
      // Apply to both html and body to override the cursor: inherit in globals.css
      const cursorStyle = `url("${cursorURL}") 24 24, auto`;
      document.documentElement.style.cursor = cursorStyle;
      document.body.style.cursor = cursorStyle;
    }
  }, [cursorType, isMobile, servicesScrollProgress]);

  // Don't render custom cursor on mobile (after all hooks have been called)
  if (isMobile) {
    return null;
  }

  // Don't render global cursor when Services Step 2 is active
  if (servicesScrollProgress && servicesScrollProgress >= 1) {
    return null;
  }

  if (cursorType !== 'scrolling' && cursorType !== 'reviews') {
    return null;
  }

  // Hide overlay when hovering over carousel dots
  if (hideOverlay) {
    return null;
  }

  return (
    <div 
      className="fixed pointer-events-none z-[9999]"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-24px, -24px)', // Align cursor icon center (48px / 2) with mouse position
      }}
    >
      <div className="relative size-[48px]">
        <div 
          className="absolute left-0 size-[48px] top-0 rounded-full"
        >
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
            <g>
              <rect fill="#2EC4B6" fillOpacity="0.2" height="48" rx="24" width="48" />
              <rect fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" height="47" rx="23.5" width="47" x="0.5" y="0.5" />
              {cursorType === 'scrolling' ? (
                <>
                  <path d={svgPathsScrolling.p38113d00} fill="#2C4657" />
                  <path d={svgPathsScrolling.p10586800} fill="#2C4657" />
                </>
              ) : (
                <>
                  <path d={svgPathsReviews.p38113d00} fill="#2C4657" />
                  <path d={svgPathsReviews.p10586800} fill="#2C4657" />
                </>
              )}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}