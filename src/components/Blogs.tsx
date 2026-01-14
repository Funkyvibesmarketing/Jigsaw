import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect, useState } from "react";
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
import { X } from "lucide-react";
import { type BlogData } from '../utils/blogsApi';

interface BlogsProps {
  onScrollProgress?: (progress: number) => void;
  blogs?: BlogData[];
  contactUsScrollProgress?: number;
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
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[8px] size-full" src={blog.image} />
          <div className={`absolute bg-gradient-to-b from-[22.439%] from-[rgba(255,255,255,0)] inset-0 rounded-[8px] ${isActive ? 'to-[#2c4657]' : 'to-[#e4ecf1]'} to-[82.582%]`} />
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
          <div className="content-stretch flex gap-[4px] items-center justify-center overflow-clip relative rounded-[12px] shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
            <p className={`font-['Lato:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap whitespace-pre ${isActive ? 'text-white' : 'text-[#2c4657]'}`}>
              Read More
            </p>
            <ArrowCircleRight fill={isActive ? "white" : "#2C4657"} />
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
        className="relative z-10 bg-gradient-to-b from-[rgba(255,255,255,1)] to-[rgba(228,236,241,1)] to-[80.385%] box-border content-stretch flex gap-[40px] h-[520px] items-start overflow-clip p-[40px] rounded-[12px] shrink-0 w-[1280px] max-w-[90vw]"
        style={{ boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.15), 0 10px 40px rgba(0, 0, 0, 0.15), 0 0 80px rgba(0, 0, 0, 0.1)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Blog Image */}
        <div className="h-full relative shrink-0 w-[373px] rounded-[8px] overflow-hidden">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={blog.image} />
        </div>

        {/* Blog Content */}
        <div className="basis-0 content-stretch flex flex-col gap-[24px] grow items-start min-h-px min-w-px relative shrink-0">
          <p className="font-['Lato:SemiBold',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[#2c4657] text-[32px] w-[min-content]">
            {blog.title}
          </p>
          
          {/* Scrollable Content */}
          <div 
            ref={contentRef}
            onScroll={handleContentScroll}
            className="flex-1 overflow-y-auto relative w-full pr-[16px] hide-scrollbar" 
            style={{ maxHeight: '360px' }}
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
            className="absolute bg-[#e4ecf1] h-[20px] left-0 rounded-[16px] w-[8px] cursor-pointer hover:bg-[#d0dde5] transition-colors" 
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

export default function Blogs({ onScrollProgress, blogs = [], contactUsScrollProgress = 0 }: BlogsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [popupBlog, setPopupBlog] = useState<BlogData | null>(null);
  
  // Duplicate the blogs for smooth infinite loop
  const blogData = blogs.length > 0 ? [
    ...blogs,
    ...blogs,
    ...blogs,
    ...blogs,
    ...blogs,
    ...blogs,
    ...blogs,
    ...blogs,
  ] : [];
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      onScrollProgress?.(latest);
    });

    return () => unsubscribe();
  }, [scrollYProgress, onScrollProgress]);

  // Desktop animations
  // Step 1: White screen slides up from bottom (0 - 0.30)
  const whiteScreenY = useTransform(scrollYProgress, [0, 0.30], ["100vh", "0vh"]);
  
  // Step 2: BLOGS text slides up from bottom (0.21 - 0.45)
  // Start when white screen covers 70% height (at scroll progress 0.21)
  const titleY = useTransform(scrollYProgress, [0.21, 0.45], ["0vh", "-85vh"]);
  const titleOpacity = useTransform(scrollYProgress, [0.21, 0.26], [0, 1]);

  // Step 3: Cards slide up from bottom (0.40 - 0.50)
  const cardsY = useTransform(scrollYProgress, [0.40, 0.50], ["100vh", "-2vh"]);
  const cardsOpacity = useTransform(scrollYProgress, [0.40, 0.45, 0.50], [0, 0.3, 1]);
  
  // Fade out entire blogs section when Contact Us slides up
  const blogsOpacity = contactUsScrollProgress > 0 ? Math.max(0, 1 - (contactUsScrollProgress * 3)) : 1;

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
      style={{ minHeight: "350vh", opacity: blogsOpacity }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
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
          <p className="font-['Lato:Regular',sans-serif] leading-[normal] not-italic text-[#222526] text-[100px] text-center text-nowrap tracking-[40px] whitespace-pre">
            BLOGS
          </p>
        </motion.div>

        {/* Blog Cards Container */}
        <motion.div
          className="absolute left-1/2 bottom-0 -translate-x-1/2 w-full z-40"
          style={{ opacity: cardsOpacity, y: cardsY }}
        >
          <div className="relative w-full">
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              loop={true}
              speed={600}
              loopAdditionalSlides={5}
              watchSlidesProgress={true}
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
              onSwiper={setSwiperInstance}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              className="!pb-[80px]"
              style={{
                overflow: 'visible'
              }}
            >
              {blogData.map((blog, index) => (
                <SwiperSlide key={index} className="!w-auto flex items-end justify-center">
                  <BlogCard blog={blog} isActive={index % blogs.length === activeIndex} onClick={() => openPopup(blog)} />
                </SwiperSlide>
              ))}
            </Swiper>
            
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