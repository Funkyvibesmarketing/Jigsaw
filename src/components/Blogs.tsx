import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, type MotionValue } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { contactProgress } from "../utils/progressStore";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import svgPaths from "../imports/svg-i9v3tx5fim";
import svgPathsPopup from "../imports/svg-l10gl4rbi7";
import LeftNavButton from "../imports/Frame1000002973";
import RightNavButton from "../imports/Frame1000002974";
import { X, Info } from "lucide-react";
import { type BlogData } from '../utils/blogsApi';

interface BlogsProps {
  onScrollProgress?: (progress: number) => void;
  blogs?: BlogData[];
  contactUsScrollProgress?: number;
  onReady?: () => void;
}



// Arrow Circle Right Icon
function ArrowCircleRight({ fill = "#2C4657" }: { fill?: string }) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <path d={svgPaths.p31a0c900} fill={fill} />
      </svg>
    </div>
  );
}

// Unified Blog Card Component
function BlogCard({ blog, isActive, onClick }: { blog: BlogData; isActive: boolean; onClick?: () => void }) {
  const [isInfoHovered, setIsInfoHovered] = useState(false);

  return (
    <div
      className={`
        box-border content-stretch flex gap-[8px] items-center overflow-clip p-[16px] relative rounded-[12px] shrink-0 cursor-pointer transition-all duration-300
        ${isActive
          ? 'h-[520px] w-[420px]'
          : 'h-[520px] w-[420px]'
        }
      `}
      onClick={onClick}
      style={{
        background: isActive
          ? 'linear-gradient(180deg, rgba(128, 174, 205, 0.4) 18.558%, #2c4657 70.769%)'
          : 'linear-gradient(180deg, rgba(228, 236, 241, 0.4) 18.558%, #e4ecf1 70.769%)'
      }}
    >
      <div className="box-border content-stretch flex flex-col gap-[8px] items-start justify-end p-[16px] relative rounded-[8px] shrink-0 h-full w-[388px]">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[8px]">
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[8px] size-full" src={blog.image} loading="lazy" />

          {/* Info Button - Only on Active Card */}
          {isActive && (
            <div className="absolute top-[16px] left-[24px] pointer-events-auto z-[60]">
              <motion.div
                onHoverStart={() => setIsInfoHovered(true)}
                onHoverEnd={() => setIsInfoHovered(false)}
                className="flex items-start overflow-hidden pointer-events-auto"
                animate={{
                  width: isInfoHovered ? "320px" : "48px",
                }}
                style={{
                  backgroundColor: 'rgba(74, 74, 74, 0.9)',
                  borderRadius: '14px',
                  height: isInfoHovered ? 'auto' : '48px',
                  minHeight: '48px',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 40,
                }}
              >
                <div className="size-[48px] flex items-center justify-center shrink-0">
                  <Info className="size-[24px] text-white" strokeWidth={1.5} />
                </div>
                <motion.div
                  animate={{
                    opacity: isInfoHovered ? 1 : 0,
                    x: isInfoHovered ? 0 : -10
                  }}
                  transition={{ duration: 0.2 }}
                  className="pr-[16px] py-[14px]"
                >
                  {isInfoHovered && (
                    <p className="text-white text-[12px] text-align-center leading-[normal] font-['Lato',sans-serif] font-weight-[300] tracking-[0.2px] pt-[10px] pb-[10px]">
                      ‘This blog has information contained within that was correct at the time of publication, but is subject to change.”
                    </p>
                  )}
                </motion.div>
              </motion.div>
            </div>
          )}

          <div className={`absolute bg-gradient-to-b from-[22.439%] from-[rgba(255,255,255,0)] inset-0 rounded-[8px] ${isActive ? 'to-[#2c4657]' : 'to-[#e4ecf1]'} to-[82.58220000000001%]`} />
        </div>
        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[356px]">
          <div className="content-stretch flex flex-col gap-[4px] items-start not-italic relative shrink-0 w-full">
            <p className={`font-['Lato:SemiBold',sans-serif] leading-[normal] relative shrink-0 text-[24px] w-full ${isActive ? 'text-white' : 'text-[#2c4657]'}`}>
              {blog.title}
            </p>
            <p className={`-webkit-box font-['Lato:Light',sans-serif] leading-[24px] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] tracking-[0.2px] w-full ${isActive ? 'text-[rgba(255,255,255,0.8)]' : 'text-[rgba(44,70,87,0.8)]'}`}>
              {blog.description}
            </p>
          </div>
          <div className="content-stretch flex gap-[4px] items-center justify-between overflow-clip relative rounded-[12px] shrink-0 w-full">
            <div className="flex gap-[4px] items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
              <p className={`font-['Lato:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap whitespace-pre ${isActive ? 'text-white' : 'text-[#2c4657]'}`}>
                Read More
              </p>
              <ArrowCircleRight fill={isActive ? "white" : "#2C4657"} />
            </div>
            {blog.date && (
              <p className={`font-['Lato:Light',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] ${isActive ? 'text-[rgba(255,255,255,0.6)]' : 'text-[rgba(44,70,87,0.6)]'}`}>
                {blog.date}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Blog Popup Component
function BlogPopup({
  blog,
  onClose,
  onPrevious,
  onNext
}: {
  blog: BlogData;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollbarTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    // Store whether custom cursor style existed before popup opened
    const hadCustomCursorStyle = !!document.getElementById('custom-cursor-style');

    // Remove custom cursor style to show default cursor
    const customCursorStyle = document.getElementById('custom-cursor-style');
    if (customCursorStyle) {
      customCursorStyle.remove();
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';

      // Re-apply custom cursor style if it existed before popup opened
      if (hadCustomCursorStyle) {
        const style = document.createElement('style');
        style.id = 'custom-cursor-style';
        style.textContent = '* { cursor: none !important; }';
        document.head.appendChild(style);
      }
    };
  }, [onClose]);

  // Handle content scroll to update custom scrollbar position
  const handleContentScroll = () => {
    if (!contentRef.current || isDragging) return;

    const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
    const maxScroll = scrollHeight - clientHeight;
    const percentage = maxScroll > 0 ? scrollTop / maxScroll : 0;
    setScrollPercentage(percentage);
  };

  // Handle scrollbar thumb drag
  const handleScrollbarMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Prevent scroll propagation to main page
  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();

    if (!contentRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
    const isAtTop = scrollTop === 0;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

    // Prevent scroll if we're at the edge and trying to scroll further in that direction
    if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!scrollbarTrackRef.current || !contentRef.current) return;

      const trackRect = scrollbarTrackRef.current.getBoundingClientRect();
      const trackHeight = trackRect.height;
      const thumbHeight = 20; // Height of the scrollbar thumb
      const maxThumbTop = trackHeight - thumbHeight;

      // Calculate position relative to track
      const mouseY = e.clientY - trackRect.top;
      const thumbTop = Math.max(0, Math.min(mouseY - thumbHeight / 2, maxThumbTop));

      // Convert to scroll percentage
      const percentage = maxThumbTop > 0 ? thumbTop / maxThumbTop : 0;
      setScrollPercentage(percentage);

      // Update content scroll
      const { scrollHeight, clientHeight } = contentRef.current;
      const maxScroll = scrollHeight - clientHeight;
      contentRef.current.scrollTop = percentage * maxScroll;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Calculate thumb position
  const scrollbarTrackHeight = 440;
  const scrollbarThumbHeight = 20;
  const maxThumbTop = scrollbarTrackHeight - scrollbarThumbHeight;
  const thumbTop = 12 + scrollPercentage * maxThumbTop; // 12px initial offset

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-white/20"
        onClick={onClose}
      />

      {/* Popup Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 bg-gradient-to-b from-[rgba(255,255,255,1)] to-[rgba(228,236,241,1)] to-[80.385%] box-border content-stretch flex gap-[40px] h-[520px] items-start overflow-hidden p-[40px] rounded-[12px] shrink-0 w-[1280px] max-w-[90vw]"
        style={{ boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.15), 0 10px 40px rgba(0, 0, 0, 0.15), 0 0 80px rgba(0, 0, 0, 0.1)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Blog Image */}
        <div className="h-full relative shrink-0 w-[373px] rounded-[8px] overflow-hidden">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={blog.image} loading="lazy" />
        </div>

        {/* Blog Content */}
        <div className="basis-0 content-stretch flex flex-col gap-[24px] grow items-start min-h-0 min-w-px relative shrink-0">
          <div className="flex flex-col gap-[8px] w-full">
            <div className="flex items-center justify-between w-full">
              <p className="font-['Lato:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#2c4657] text-[32px]">
                {blog.title}
              </p>
              {blog.date && (
                <p className="font-['Lato:Light',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-[#2c4657] ml-[24px]">
                  {blog.date}
                </p>
              )}
            </div>
            <p className="font-['Lato:Light',sans-serif] leading-[normal] not-italic text-[12px] text-[#2c4657] font-light tracking-[0.2px] opacity-80">
              ‘This blog has information contained within that was correct at the time of publication, but is subject to change.”
            </p>
          </div>

          {/* Scrollable Content */}
          <div
            ref={contentRef}
            onScroll={handleContentScroll}
            onWheel={handleWheel}
            data-lenis-prevent
            className="overflow-y-scroll relative w-full pr-[16px] hide-scrollbar"
            style={{ height: '360px', minHeight: '360px', maxHeight: '360px' }}
          >
            <div className="font-['Lato:Regular',sans-serif] leading-[24px] not-italic text-[16px] text-[rgba(44,70,87,0.8)] tracking-[0.2px] whitespace-pre-line pb-[20px]">
              {blog.fullContent || blog.description}
            </div>
          </div>
          {/* Gradient Fade at Bottom */}
          <div className="absolute bg-gradient-to-b from-[rgba(228,236,241,0)] to-[#e4ecf1] h-[87px] bottom-0 right-0 left-[413px] pointer-events-none" />
        </div>

        {/* Custom Scrollbar */}
        <div ref={scrollbarTrackRef} className="h-full relative shrink-0 w-[8px]">
          <div className="absolute bg-white h-[440px] left-[3px] rounded-[8px] top-0 w-[2px]" />
          <div
            className="absolute bg-[#2ec4b6] h-[20px] left-0 rounded-[16px] w-[8px] cursor-pointer hover:bg-[#26a89c] transition-colors"
            style={{ top: `${thumbTop}px` }}
            onMouseDown={handleScrollbarMouseDown}
          />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-[12px] top-[12px] size-[24px] cursor-pointer hover:opacity-70 transition-opacity"
        >
          <X className="size-full text-[#2c4657]" />
        </button>

      </motion.div>

      {/* Navigation Arrows - Below Popup */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[15px] flex gap-[16px] items-center justify-center z-20">
        <div
          className="w-[48px] h-[48px] transition-all rounded-[32px] hover:bg-[rgba(46,196,182,0.2)] hover:border-2 hover:border-[#2ec4b6]"
          onClick={onPrevious}
        >
          <LeftNavButton />
        </div>
        <div
          className="w-[48px] h-[48px] transition-all rounded-[32px] hover:bg-[rgba(46,196,182,0.2)] hover:border-2 hover:border-[#2ec4b6] scale-x-[-1]"
          onClick={onNext}
        >
          <LeftNavButton />
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: white;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e4ecf1;
          border-radius: 16px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d0dde5;
          border-radius: 16px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }
      `}</style>
    </div>
  );
}

// ---- Entry: "BLOGS" letters flip up into place one after another ----
// Values the rest of the page compares blogsScrollProgress against (see App / navigation)
const PARENT_THRESHOLDS = [0.01, 0.2];
const parentBucket = (p: number) => (p <= 0 ? -1 : PARENT_THRESHOLDS.filter((t) => p >= t).length);

// This section is pulled up over the end of Our Process (BLOGS_OVERLAP_VH) and slides up over it
// like a white sheet while Our Process plays its exit. The "BLOGS" title rides near the sheet's top
// edge and flips in as the sheet rises (0 → 0.15); the section pins at ~0.22, then the cards rise.
const TITLE_FLIP_FROM = 0;
const TITLE_FLIP_TO = 0.15;
// Length of Our Process's exit scroll (see PROCESS_HEIGHT_VH - ORIGINAL_HEIGHT_VH in Process.tsx),
// so the sheet starts rising exactly when that exit begins
const BLOGS_OVERLAP_VH = 0.6;
const TITLE_FLIP_STAGGER = 0.5;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function FlipLetter({ char, index, count, progress }: { char: string; index: number; count: number; progress: MotionValue<number> }) {
  const local = (p: number) => {
    const t = clamp01((p - TITLE_FLIP_FROM) / (TITLE_FLIP_TO - TITLE_FLIP_FROM));
    const start = (index / Math.max(1, count - 1)) * TITLE_FLIP_STAGGER;
    return easeOutCubic(clamp01((t - start) / (1 - TITLE_FLIP_STAGGER)));
  };
  const rotateX = useTransform(progress, (p) => -95 * (1 - local(p)));
  const y = useTransform(progress, (p) => 40 * (1 - local(p)));
  const opacity = useTransform(progress, (p) => clamp01(local(p) * 1.6));
  return (
    <motion.span style={{ display: 'inline-block', rotateX, y, opacity, transformOrigin: '50% 100%' }}>
      {char}
    </motion.span>
  );
}

export default function Blogs({ onScrollProgress, blogs = [], contactUsScrollProgress = 0, onReady }: BlogsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [popupBlog, setPopupBlog] = useState<BlogData | null>(null);
  const [pendingPopupBlog, setPendingPopupBlog] = useState<BlogData | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (onReady) {
      onReady();
    }
  }, []);

  const width = window.innerWidth;
  const height = window.innerHeight;
  let scrl = -2;
  if (width > 1536) {
    scrl = -10;
  }

  // Duplicate the blogs for smooth infinite loop
  const blogData = blogs.length > 0 ? Array(10).fill(blogs).flat() : [];

  const zoomFactor = window.innerWidth > 1920 ? (window.innerWidth / 1920) : 1;
  const viewportHeight = window.innerHeight / zoomFactor;

  const scrollYProgress = useMotionValue(0);
  const lastParentBucketRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const total = rect.height + viewportHeight;
      const current = viewportHeight - rect.top;
      const progress = total <= 0 ? 0 : Math.min(1, Math.max(0, current / total));
      
      scrollYProgress.set(progress);
      const bucket = parentBucket(progress);
      if (bucket !== lastParentBucketRef.current) {
        lastParentBucketRef.current = bucket;
        onScrollProgress?.(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [onScrollProgress, viewportHeight]);

  // Force swiper update after initialization and data loading
  useEffect(() => {
    if (swiperInstance && blogs.length > 0) {
      const timer = setTimeout(() => {
        swiperInstance.update();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [swiperInstance, blogs.length]);

  // Desktop animations
  // Step 1: White screen slides up from bottom (0 - 0.30)
  const whiteScreenY = useTransform(scrollYProgress, [0, 0.30], [viewportHeight, 0]);

  // Step 2: BLOGS title sits at its spot above the cards from the start and flips in as the
  // section comes up (see TITLE_FLIP_FROM)
  const titleY = -viewportHeight * 0.85;
  const titleOpacity = useTransform(scrollYProgress, [0, 0.03], [0, 1]);

  // Step 3: Cards slide up from bottom (0.20 - 0.32), finishing just after the section pins
  const cardsY = useTransform(scrollYProgress, [0.20, 0.32], [viewportHeight, viewportHeight * (scrl / 100)]);
  const cardsOpacity = useTransform(scrollYProgress, [0.20, 0.25, 0.32], [0, 0.3, 1]);
  // Cards also grow in from slightly smaller as they rise
  const cardsScale = useTransform(scrollYProgress, (p) => 0.86 + 0.14 * easeOutCubic(clamp01((p - 0.20) / 0.13)));

  // Fade out the blogs section when Contact Us slides up: a white layer fades in on top, driven
  // straight from the live Contact progress. (Fading the container itself re-rendered Blogs every
  // frame and made the carousel - which watches its parents - re-measure itself every frame.)
  const fadeOverlayRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const apply = (cp: number) => {
      if (fadeOverlayRef.current) fadeOverlayRef.current.style.opacity = String(cp > 0 ? Math.min(1, cp * 3) : 0);
    };
    apply(contactProgress.get());
    return contactProgress.subscribe(apply);
  }, []);

  const handlePrevious = () => {
    swiperInstance?.slidePrev();
  };

  const handleNext = () => {
    swiperInstance?.slideNext();
  };

  const openPopup = (blog: BlogData) => {
    setPopupBlog(blog);
  };

  const closePopup = () => {
    setPopupBlog(null);
  };

  const popupPrevious = () => {
    const currentIndex = activeIndex;
    const newIndex = (currentIndex - 1 + blogData.length) % blogData.length;
    setActiveIndex(newIndex);
    setPopupBlog(blogData[newIndex]);
  };

  const popupNext = () => {
    const currentIndex = activeIndex;
    const newIndex = (currentIndex + 1) % blogData.length;
    setActiveIndex(newIndex);
    setPopupBlog(blogData[newIndex]);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-white"
      // Pulled up over the end of Our Process and slides up over it like a sheet (see TITLE_FLIP_FROM)
      style={{
        minHeight: `${viewportHeight * 3.5}px`,
        position: "relative",
        marginTop: `${-viewportHeight * BLOGS_OVERLAP_VH}px`,
        boxShadow: '0 -24px 60px rgba(0, 0, 0, 0.25)',
      }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 w-full overflow-hidden" style={{ height: `${viewportHeight}px` }}>
        {/* Fade-out layer (see fadeOverlayRef) */}
        <div ref={fadeOverlayRef} className="absolute inset-0 bg-white pointer-events-none" style={{ opacity: 0, zIndex: 60 }} />

        {/* Scaled wrapper for desktop */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full scale-[0.96] origin-center">

            {/* White Screen - slides up to cover everything */}
            <motion.div
              className="absolute inset-0 z-20"
              style={{ y: whiteScreenY }}
            >
              <div className="absolute inset-0 bg-white w-full h-full" />
            </motion.div>

            {/* BLOGS Title */}
            <motion.div
              className="absolute left-[calc(50%+0.5px)] bottom-0 translate-x-[-50%] z-30"
              style={{ opacity: titleOpacity, y: titleY }}
            >
              <p
                className="font-['Lato:Regular',sans-serif] leading-[normal] not-italic text-[#2C4657] text-[110px] text-center text-nowrap tracking-[40px] whitespace-pre"
                style={{ perspective: 700 }}
                aria-label="BLOGS"
              >
                {'BLOGS'.split('').map((char, i) => (
                  <FlipLetter key={i} char={char} index={i} count={5} progress={scrollYProgress} />
                ))}
              </p>
            </motion.div>

            {/* Blog Cards Container */}
            <motion.div
              className="absolute left-1/2 bottom-0 -translate-x-1/2 w-full z-40"
              style={{ opacity: cardsOpacity, y: cardsY, scale: cardsScale, transformOrigin: '50% 100%' }}
            >
              <div className="relative w-full">
                {isMounted && (
                  <Swiper
                  key={`${isMounted}-${blogs.length}`}
                  effect={'coverflow'}
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView={'auto'}
                  loop={true}
                  speed={600}
                  loopAdditionalSlides={5}
                  // @ts-ignore
                  loopAddBlankSlides={true}
                  updateOnWindowResize={true}
                  watchSlidesProgress={true}
                  observer={true}
                  observeParents={true}
                  initialSlide={0}
                  spaceBetween={60}
                  coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 200,
                    modifier: 1,
                    slideShadows: false,
                  }}
                  modules={[EffectCoverflow, Navigation]}
                  onSwiper={(swiper) => {
                    setSwiperInstance(swiper);
                    setActiveIndex(swiper.activeIndex);
                  }}
                  onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                  onSlideChangeTransitionEnd={() => {
                    if (pendingPopupBlog) {
                      setPopupBlog(pendingPopupBlog);
                      setPendingPopupBlog(null);
                    }
                  }}
                  className="!pb-[80px]"
                  style={{
                    overflow: 'visible'
                  }}
                >
                  {blogData.map((blog, index) => (
                    <SwiperSlide key={`${blog.id}-${index}`} className="!w-auto flex items-end justify-center">
                      {({ isActive }) => (
                        <BlogCard
                          blog={blog}
                          isActive={isActive}
                          onClick={() => {
                            if (isActive) {
                              openPopup(blog);
                            } else {
                              swiperInstance?.slideToLoop(index);
                              setPendingPopupBlog(blog);
                            }
                          }}
                        />
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>
                )}

                {/* Navigation Buttons - Hidden when popup is open */}
                {!popupBlog && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex gap-[16px] items-center justify-center z-10">
                    <div
                      className="w-[56px] h-[56px] cursor-pointer transition-all rounded-[32px] hover:bg-[rgba(46,196,182,0.2)] hover:border-2 hover:border-[#2ec4b6]"
                      onClick={handlePrevious}
                    >
                      <LeftNavButton />
                    </div>
                    <div
                      className="w-[56px] h-[56px] cursor-pointer transition-all rounded-[32px] hover:bg-[rgba(46,196,182,0.2)] hover:border-2 hover:border-[#2ec4b6] scale-x-[-1]"
                      onClick={handleNext}
                    >
                      <LeftNavButton />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Blog Popup */}
      {popupBlog && (
        <BlogPopup
          blog={popupBlog}
          onClose={closePopup}
          onPrevious={popupPrevious}
          onNext={popupNext}
        />
      )}

      <style>{`
        .swiper-slide {
          z-index: 1;
        }
        .swiper-slide-active {
          z-index: 10 !important;
        }
        .swiper-slide-prev,
        .swiper-slide-next {
          z-index: 5 !important;
        }
      `}</style>
    </div>
  );
}