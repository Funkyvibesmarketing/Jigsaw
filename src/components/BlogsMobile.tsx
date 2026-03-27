import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import svgPaths from "../imports/svg-tsrio0k8sm";
import { X, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { AnimatePresence } from "motion/react";
import Frame1000002973 from "../imports/Frame1000002973-804-8";
import Frame1000002974 from "../imports/Frame1000002974-804-16";
import { type BlogData } from '../utils/blogsApi';

interface BlogsMobileProps {
  onScrollProgress?: (progress: number) => void;
  blogs?: BlogData[];
}



// Arrow Circle Right Component
function ArrowCircleRight({ fill = "#2C4657" }: { fill?: string }) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g>
          <path d={svgPaths.p31a0c900} fill={fill} />
        </g>
      </svg>
    </div>
  );
}

// Blog Card Component
function BlogCard({
  blog,
  isActive,
  onClick
}: {
  blog: BlogData;
  isActive: boolean;
  onClick: () => void;
}) {
  const [isInfoActive, setIsInfoActive] = useState(false);

  return (
    <div
      className={`
        bg-gradient-to-b box-border content-stretch flex items-center overflow-clip p-[16px] relative rounded-[12px] shrink-0
        cursor-pointer transition-all duration-300
        ${isActive
          ? 'from-[18.558%] from-[rgba(128,174,205,0.4)] to-[#2c4657] to-[70.769%] h-[480px] w-[292px]'
          : 'from-[18.558%] from-[rgba(228,236,241,0.4)] to-[#e4ecf1] to-[70.769%] h-[480px] w-[292px]'
        }
      `}
      onClick={onClick}
    >
      <div className={`basis-0 grow h-full min-h-px min-w-px relative rounded-[8px] shrink-0`}>
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[8px]">
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[8px] size-full" src={blog.image} />

          {/* Info Button - Only on Active Card */}
          {isActive && (
            <div className="absolute top-[16px] left-[16px] pointer-events-auto z-[60]">
              <motion.div
                onClick={(e) => {
                  e.stopPropagation();
                  setIsInfoActive(!isInfoActive);
                }}
                className="flex items-start overflow-hidden pointer-events-auto"
                animate={{
                  width: isInfoActive ? "230px" : "40px",
                }}
                style={{
                  backgroundColor: 'rgba(74, 74, 74, 0.9)',
                  borderRadius: '14px',
                  height: isInfoActive ? 'auto' : '40px',
                  minHeight: '40px',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 40,
                }}
              >
                <div className="size-[40px] flex items-center justify-center shrink-0">
                  <Info className="size-[20px] text-white" strokeWidth={1.5} />
                </div>
                <motion.div
                  animate={{
                    opacity: isInfoActive ? 1 : 0,
                    x: isInfoActive ? 0 : -10
                  }}
                  transition={{ duration: 0.2 }}
                  className="pr-[12px] py-[10px]"
                >
                  {isInfoActive && (
                    <p className="text-white text-[10px] leading-[normal] font-['Lato',sans-serif] font-light tracking-[0.2px]">
                      ‘This blog has information contained within that was correct at the time of publication, but is subject to change.”
                    </p>
                  )}
                </motion.div>
              </motion.div>
            </div>
          )}

          <div className={`absolute bg-gradient-to-b from-[22.439%] from-[rgba(255,255,255,0)] inset-0 rounded-[8px] ${isActive ? 'to-[#2c4657]' : 'to-[#e4ecf1]'} to-[82.58220000000001%]`} />
        </div>
        <div className="flex flex-col justify-end size-full">
          <div className={`box-border content-stretch flex flex-col gap-[8px] items-start justify-end ${isActive ? 'p-[12px]' : 'p-[16px]'} relative size-full`}>
            <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[4px] items-start not-italic relative shrink-0 w-full">
                <p className={`font-['Lato:SemiBold',sans-serif] leading-[normal] relative shrink-0 text-[16px] w-full ${isActive ? 'text-white' : 'text-[#2c4657]'}`}>
                  {blog.title}
                </p>
                <p className={`-webkit-box font-['Lato:Light',sans-serif] leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[12px] tracking-[0.2px] w-full ${isActive ? 'text-[rgba(255,255,255,0.8)]' : 'text-[rgba(44,70,87,0.8)]'}`}>
                  {blog.description}
                </p>
              </div>
              <div className="content-stretch flex gap-[4px] items-center justify-between overflow-clip relative rounded-[12px] shrink-0 w-full">
                <div className="flex gap-[4px] items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
                  <p className={`font-['Lato:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-nowrap whitespace-pre ${isActive ? 'text-white' : 'text-[#2c4657]'}`}>
                    Read More
                  </p>
                  <ArrowCircleRight fill={isActive ? "white" : "#2C4657"} />
                </div>
                {blog.date && (
                  <p className={`font-['Lato:Light',sans-serif] leading-[20px] not-italic relative shrink-0 text-[10px] ${isActive ? 'text-[rgba(255,255,255,0.6)]' : 'text-[rgba(44,70,87,0.6)]'}`}>
                    {blog.date}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Blog Popup Component for Mobile
function BlogPopupMobile({
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
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // Handle content scroll
  const handleContentScroll = () => {
    if (!contentRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
    const maxScroll = scrollHeight - clientHeight;
    const percentage = maxScroll > 0 ? scrollTop / maxScroll : 0;
    setScrollPercentage(percentage);
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

  // Prevent touch scroll propagation to main page
  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation();

    if (!contentRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
    const isAtTop = scrollTop === 0;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

    // Allow touch scroll within content bounds
    if (!isAtTop && !isAtBottom) {
      return;
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-[16px]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-white/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Popup Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 bg-gradient-to-b from-[rgba(255,255,255,0.95)] to-[rgba(228,236,241,0.95)] to-[80.385%] box-border flex flex-col gap-[24px] max-h-[70vh] h-[70vh] items-start overflow-hidden p-[24px] rounded-[12px] shrink-0 w-full max-w-[500px] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Blog Image */}
        <div className="h-[160px] relative shrink-0 w-full rounded-[8px] overflow-hidden">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={blog.image} />
        </div>

        {/* Blog Content */}
        <div className="flex-1 flex flex-col gap-[16px] items-start min-h-0 w-full overflow-hidden">
          {blog.date && (
            <p className="font-['Lato:Light',sans-serif] leading-[normal] not-italic shrink-0 text-[12px] text-[#2c4657]">
              {blog.date}
            </p>
          )}
          <p className="font-['Lato:SemiBold',sans-serif] leading-[normal] not-italic shrink-0 text-[#2c4657] text-[24px] w-full">
            {blog.title}
          </p>
          <p className="font-['Lato:Light',sans-serif] leading-[normal] not-italic text-[10px] text-[#2c4657] font-light tracking-[0.2px] opacity-80 mt-[-8px]">
            ‘This blog has information contained within that was correct at the time of publication, but is subject to change.”
          </p>

          {/* Scrollable Content */}
          <div
            ref={contentRef}
            onScroll={handleContentScroll}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            className="flex-1 overflow-y-auto w-full pr-[8px] custom-scrollbar min-h-0"
          >
            <div className="font-['Lato:Regular',sans-serif] leading-[20px] not-italic text-[14px] text-[rgba(44,70,87,0.8)] tracking-[0.2px] whitespace-pre-line pb-[20px]">
              {blog.fullContent || blog.description}
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-[16px] top-[16px] size-[40px] cursor-pointer hover:opacity-70 transition-opacity flex items-center justify-center bg-white rounded-full shadow-md z-10"
          aria-label="Close"
        >
          <X className="size-[20px] text-[#2c4657] stroke-[2.5]" />
        </button>
      </motion.div>

      {/* Navigation Arrows - Below Popup */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[60px] flex gap-[16px] z-20">
        <button
          onClick={onPrevious}
          className="w-[48px] h-[48px] cursor-pointer hover:opacity-70 transition-opacity"
        >
          <Frame1000002973 />
        </button>

        <button
          onClick={onNext}
          className="w-[48px] h-[48px] cursor-pointer hover:opacity-70 transition-opacity"
        >
          <Frame1000002974 />
        </button>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.3);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2ec4b6;
          border-radius: 16px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #26a89c;
          border-radius: 16px;
        }
      `}</style>
    </div>
  );
}

export function BlogsMobile({ onScrollProgress, blogs = [] }: BlogsMobileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedBlog, setSelectedBlog] = useState<BlogData | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Duplicate blogs to create enough slides for smooth looping with coverflow effect
  const blogData = blogs.length > 0 ? Array(20).fill(blogs).flat() : [];

  // Scroll-based animations for title
  const titleY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [0, 1, 0.3]);
  const titleColor = useTransform(
    scrollYProgress,
    [0, 0.3],
    ['rgba(34, 37, 38, 1)', 'rgba(34, 37, 38, 1)']
  );

  // Scroll-based animations for cards (delayed)
  const cardsY = useTransform(scrollYProgress, [0.2, 0.5], [100, 0]);
  const cardsOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  // Update scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (onScrollProgress) {
        onScrollProgress(latest);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, onScrollProgress]);

  const handleBlogClick = (index: number) => {
    if (blogs.length === 0) return;
    const actualIndex = index % blogs.length;
    setSelectedBlog(blogs[actualIndex]);
  };

  const handleClosePopup = () => {
    setSelectedBlog(null);
  };

  const handlePrevious = () => {
    if (!selectedBlog || blogs.length === 0) return;
    const currentIndex = blogs.findIndex(b => b.id === selectedBlog.id);
    const prevIndex = currentIndex === 0 ? blogs.length - 1 : currentIndex - 1;
    setSelectedBlog(blogs[prevIndex]);
  };

  const handleNext = () => {
    if (!selectedBlog || blogs.length === 0) return;
    const currentIndex = blogs.findIndex(b => b.id === selectedBlog.id);
    const nextIndex = (currentIndex + 1) % blogs.length;
    setSelectedBlog(blogs[nextIndex]);
  };

  return (
    <div ref={containerRef} className="relative bg-white min-h-[250vh]" style={{ position: "relative" }}>
      {/* Sticky container that stays below navigation */}
      <div className="sticky top-[80px] h-[calc(100vh-80px)] w-full overflow-hidden flex flex-col">
        {/* Background */}
        <div className="absolute inset-0 w-full h-full bg-white -z-10" />

        {/* BLOGS Title - Moves up first */}
        <motion.div
          className="relative bg-white flex justify-center px-[20px] pt-[40px] pb-[10px] z-30"
          style={{ y: titleY, opacity: titleOpacity }}
        >
          <motion.p
            className="font-['Lato:Regular',sans-serif] leading-[normal] not-italic text-[40px] text-center tracking-[20px]"
            style={{ color: titleColor }}
          >
            BLOGS
          </motion.p>
        </motion.div>

        {/* Swiper Carousel Container - Moves up after title */}
        <div className="flex-1 flex flex-col justify-center pb-[40px] z-10">
          <motion.div style={{ y: cardsY, opacity: cardsOpacity }}>
            {isMounted && (
            <Swiper
              key={`${isMounted}-${blogs.length}`}
              modules={[EffectCoverflow, Navigation]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              loop={true}
              speed={500}
              // @ts-ignore
              loopAddBlankSlides={true}
              updateOnWindowResize={true}
              observer={true}
              observeParents={true}
              touchRatio={1}
              resistance={true}
              resistanceRatio={0.85}
              coverflowEffect={{
                rotate: 0,
                stretch: -30,
                depth: 150,
                modifier: 1,
                slideShadows: false,
              }}
              onSwiper={(swiper) => {
                setSwiperInstance(swiper);
                setActiveIndex(swiper.activeIndex);
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              className="blogs-swiper-mobile"
            >
              {blogData.map((blog, index) => (
                <SwiperSlide key={`${blog.id}-${index}`}>
                  {({ isActive }) => (
                    <BlogCard
                      blog={blog}
                      isActive={isActive}
                      onClick={() => handleBlogClick(index)}
                    />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
            )}
          </motion.div>

          {/* Navigation Arrows */}
          <motion.div
            className="flex justify-center gap-[16px] mt-[10px]"
            style={{ y: cardsY, opacity: cardsOpacity }}
          >
            <button
              onClick={() => swiperInstance?.slidePrev()}
              className="w-[48px] h-[48px] cursor-pointer hover:opacity-70 transition-opacity"
            >
              <Frame1000002973 />
            </button>

            <button
              onClick={() => swiperInstance?.slideNext()}
              className="w-[48px] h-[48px] cursor-pointer hover:opacity-70 transition-opacity"
            >
              <Frame1000002974 />
            </button>
          </motion.div>
        </div>

        {/* Blog Popup */}
        <AnimatePresence>
          {selectedBlog && (
            <BlogPopupMobile
              blog={selectedBlog}
              onClose={handleClosePopup}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          )}
        </AnimatePresence>

        <style>{`
          .blogs-swiper-mobile {
            width: 100%;
            padding: 20px 0;
          }
          .blogs-swiper-mobile .swiper-slide {
            width: 292px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </div>
    </div>
  );
}