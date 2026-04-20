import { motion, AnimatePresence } from 'motion/react';
import svgPaths from '../imports/svg-075cmii2x1';

function House({ theme = 'dark' }: { theme?: 'light' | 'dark' }) {
  const iconColor = theme === 'dark' ? 'white' : '#2C4657';
  return (
    <div className="relative shrink-0 size-[24px]" data-name="House">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="House">
          <path d={svgPaths.pf1a2200} fill={iconColor} id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame({ onClick, isActive, theme = 'dark' }: { onClick: () => void; isActive?: boolean; theme?: 'light' | 'dark' }) {
  const isDark = theme === 'dark';
  const iconColor = isActive && !isDark ? '#2EC4B6' : (isActive ? 'white' : (isDark ? 'white' : '#2C4657'));
  
  return (
    <button 
      onClick={onClick}
      className={`h-[64px] relative rounded-[100px] shrink-0 w-full cursor-pointer transition-all duration-300 ${
        isActive 
          ? (isDark ? 'bg-[rgba(46,196,182,0.3)] hover:bg-[rgba(46,196,182,0.4)]' : 'bg-[rgba(190,240,237,1)] hover:bg-[rgba(170,235,230,1)]')
          : (isDark ? 'bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)]' : 'bg-[#e4ecf1] hover:bg-[#d9e6ed]')
      }`}
    >
      <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[100px] ${
        isActive ? 'border-[rgba(46,196,182,0.4)]' : (isDark ? 'border-[rgba(255,255,255,0.2)]' : 'border-[rgba(44,70,87,0.1)]')
      }`} />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[64px] items-center px-[17.5px] py-[12px] relative w-full">
          <div className="relative shrink-0 size-[24px]" data-name="House">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <g id="House">
                <path d={svgPaths.pf1a2200} fill={iconColor} id="Vector" />
              </g>
            </svg>
          </div>
          <p className={`leading-[24px] not-italic relative shrink-0 text-[20px] text-center text-nowrap whitespace-pre ${
            isActive && !isDark ? "font-['Lato:Medium',sans-serif] text-[#2EC4B6]" : (isActive ? "font-['Lato:Medium',sans-serif] text-white" : (isDark ? "font-['Lato:Light',sans-serif] text-white" : "font-['Lato:Light',sans-serif] text-[#2c4657]"))
          }`}>Home</p>
        </div>
      </div>
      {!isDark && (
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.12),inset_0px_-5px_4px_0px_rgba(255,255,255,0.08)] rounded-[100px]" />
      )}
    </button>
  );
}

function Group({ theme = 'dark' }: { theme?: 'light' | 'dark' }) {
  const strokeColor = theme === 'dark' ? 'white' : '#2C4657';
  return (
    <div className="absolute inset-[8.4%_12.5%_11.52%_12.5%]" data-name="Group">
      <div className="absolute inset-[-5.2%_-8.22%_-5.2%_-8.2%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 22">
          <g id="Group">
            <path d={svgPaths.p34fb0f80} id="Vector" stroke={strokeColor} />
            <path d={svgPaths.p38b3eb80} id="Vector_2" stroke={strokeColor} />
          </g>
        </svg>
      </div>
    </div>
  );
}

function House1({ theme = 'dark' }: { theme?: 'light' | 'dark' }) {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="House">
      <Group theme={theme} />
    </div>
  );
}

function Frame1({ onClick, isActive, theme = 'dark' }: { onClick: () => void; isActive?: boolean; theme?: 'light' | 'dark' }) {
  const isDark = theme === 'dark';
  const strokeColor = isActive && !isDark ? '#2EC4B6' : (isActive ? 'white' : (isDark ? 'white' : '#2C4657'));
  
  return (
    <button 
      onClick={onClick}
      className={`h-[64px] relative rounded-[100px] shrink-0 w-full cursor-pointer transition-all duration-300 ${
        isActive 
          ? (isDark ? 'bg-[rgba(46,196,182,0.3)] hover:bg-[rgba(46,196,182,0.4)]' : 'bg-[rgba(190,240,237,1)] hover:bg-[rgba(170,235,230,1)]')
          : (isDark ? 'bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)]' : 'bg-[#e4ecf1] hover:bg-[#d9e6ed]')
      }`}
    >
      <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[100px] ${
        isActive ? 'border-[rgba(46,196,182,0.4)]' : (isDark ? 'border-[rgba(255,255,255,0.2)]' : 'border-[rgba(44,70,87,0.1)]')
      }`} />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[17.5px] py-[12px] relative w-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="House">
            <div className="absolute inset-[8.4%_12.5%_11.52%_12.5%]" data-name="Group">
              <div className="absolute inset-[-5.2%_-8.22%_-5.2%_-8.2%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 22">
                  <g id="Group">
                    <path d={svgPaths.p34fb0f80} id="Vector" stroke={strokeColor} />
                    <path d={svgPaths.p38b3eb80} id="Vector_2" stroke={strokeColor} />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <p className={`leading-[24px] not-italic relative shrink-0 text-[20px] text-center text-nowrap whitespace-pre ${
            isActive && !isDark ? "font-['Lato:Medium',sans-serif] text-[#2EC4B6]" : (isActive ? "font-['Lato:Medium',sans-serif] text-white" : (isDark ? "font-['Lato:Light',sans-serif] text-white" : "font-['Lato:Light',sans-serif] text-[#2c4657]"))
          }`}>About us</p>
        </div>
      </div>
      {!isDark && (
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.12),inset_0px_-5px_4px_0px_rgba(255,255,255,0.08)] rounded-[100px]" />
      )}
    </button>
  );
}

function Stack({ theme = 'dark' }: { theme?: 'light' | 'dark' }) {
  const iconColor = theme === 'dark' ? 'white' : '#2C4657';
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Stack">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Stack">
          <path d={svgPaths.p377c9080} fill={iconColor} id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame2({ onClick, isActive, theme = 'dark' }: { onClick: () => void; isActive?: boolean; theme?: 'light' | 'dark' }) {
  const isDark = theme === 'dark';
  const iconColor = isActive && !isDark ? '#2EC4B6' : (isActive ? 'white' : (isDark ? 'white' : '#2C4657'));
  
  return (
    <button 
      onClick={onClick}
      className={`h-[64px] relative rounded-[100px] shrink-0 w-full cursor-pointer transition-all duration-300 ${
        isActive 
          ? (isDark ? 'bg-[rgba(46,196,182,0.3)] hover:bg-[rgba(46,196,182,0.4)]' : 'bg-[rgba(190,240,237,1)] hover:bg-[rgba(170,235,230,1)]')
          : (isDark ? 'bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)]' : 'bg-[#e4ecf1] hover:bg-[#d9e6ed]')
      }`}
    >
      <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[100px] ${
        isActive ? 'border-[rgba(46,196,182,0.4)]' : (isDark ? 'border-[rgba(255,255,255,0.2)]' : 'border-[rgba(44,70,87,0.1)]')
      }`} />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[17.5px] py-[12px] relative w-full">
          <div className="relative shrink-0 size-[24px]" data-name="Stack">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <g id="Stack">
                <path d={svgPaths.p377c9080} fill={iconColor} id="Vector" />
              </g>
            </svg>
          </div>
          <p className={`leading-[24px] not-italic relative shrink-0 text-[20px] text-center text-nowrap whitespace-pre ${
            isActive && !isDark ? "font-['Lato:Medium',sans-serif] text-[#2EC4B6]" : (isActive ? "font-['Lato:Medium',sans-serif] text-white" : (isDark ? "font-['Lato:Light',sans-serif] text-white" : "font-['Lato:Light',sans-serif] text-[#2c4657]"))
          }`}>Services</p>
        </div>
      </div>
      {!isDark && (
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.12),inset_0px_-5px_4px_0px_rgba(255,255,255,0.08)] rounded-[100px]" />
      )}
    </button>
  );
}

function ShootingStar({ theme = 'dark' }: { theme?: 'light' | 'dark' }) {
  const iconColor = theme === 'dark' ? 'white' : '#2C4657';
  return (
    <div className="relative shrink-0 size-[24px]" data-name="ShootingStar">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="ShootingStar">
          <path d={svgPaths.p29e0fc80} fill={iconColor} id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame3({ onClick, isActive, theme = 'dark' }: { onClick: () => void; isActive?: boolean; theme?: 'light' | 'dark' }) {
  const isDark = theme === 'dark';
  const iconColor = isActive && !isDark ? '#2EC4B6' : (isActive ? 'white' : (isDark ? 'white' : '#2C4657'));
  
  return (
    <button 
      onClick={onClick}
      className={`h-[64px] relative rounded-[100px] shrink-0 w-full cursor-pointer transition-all duration-300 ${
        isActive 
          ? (isDark ? 'bg-[rgba(46,196,182,0.3)] hover:bg-[rgba(46,196,182,0.4)]' : 'bg-[rgba(190,240,237,1)] hover:bg-[rgba(170,235,230,1)]')
          : (isDark ? 'bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)]' : 'bg-[#e4ecf1] hover:bg-[#d9e6ed]')
      }`}
    >
      <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[100px] ${
        isActive ? 'border-[rgba(46,196,182,0.4)]' : (isDark ? 'border-[rgba(255,255,255,0.2)]' : 'border-[rgba(44,70,87,0.1)]')
      }`} />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[17.5px] py-[12px] relative w-full">
          <div className="relative shrink-0 size-[24px]" data-name="ShootingStar">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <g id="ShootingStar">
                <path d={svgPaths.p29e0fc80} fill={iconColor} id="Vector" />
              </g>
            </svg>
          </div>
          <p className={`leading-[24px] not-italic relative shrink-0 text-[20px] text-center text-nowrap whitespace-pre ${
            isActive && !isDark ? "font-['Lato:Medium',sans-serif] text-[#2EC4B6]" : (isActive ? "font-['Lato:Medium',sans-serif] text-white" : (isDark ? "font-['Lato:Light',sans-serif] text-white" : "font-['Lato:Light',sans-serif] text-[#2c4657]"))
          }`}>Reviews</p>
        </div>
      </div>
      {!isDark && (
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.12),inset_0px_-5px_4px_0px_rgba(255,255,255,0.08)] rounded-[100px]" />
      )}
    </button>
  );
}

function UsersThree({ theme = 'dark' }: { theme?: 'light' | 'dark' }) {
  const iconColor = theme === 'dark' ? 'white' : '#2C4657';
  return (
    <div className="relative shrink-0 size-[24px]" data-name="UsersThree">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="UsersThree">
          <path d={svgPaths.p2ff36c0} fill={iconColor} id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame4({ onClick, isActive, theme = 'dark' }: { onClick: () => void; isActive?: boolean; theme?: 'light' | 'dark' }) {
  const isDark = theme === 'dark';
  const iconColor = isActive && !isDark ? '#2EC4B6' : (isActive ? 'white' : (isDark ? 'white' : '#2C4657'));
  
  return (
    <button 
      onClick={onClick}
      className={`h-[64px] relative rounded-[100px] shrink-0 w-full cursor-pointer transition-all duration-300 ${
        isActive 
          ? (isDark ? 'bg-[rgba(46,196,182,0.3)] hover:bg-[rgba(46,196,182,0.4)]' : 'bg-[rgba(190,240,237,1)] hover:bg-[rgba(170,235,230,1)]')
          : (isDark ? 'bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)]' : 'bg-[#e4ecf1] hover:bg-[#d9e6ed]')
      }`}
    >
      <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[100px] ${
        isActive ? 'border-[rgba(46,196,182,0.4)]' : (isDark ? 'border-[rgba(255,255,255,0.2)]' : 'border-[rgba(44,70,87,0.1)]')
      }`} />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[17.5px] py-[12px] relative w-full">
          <div className="relative shrink-0 size-[24px]" data-name="UsersThree">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <g id="UsersThree">
                <path d={svgPaths.p2ff36c0} fill={iconColor} id="Vector" />
              </g>
            </svg>
          </div>
          <p className={`leading-[24px] not-italic relative shrink-0 text-[20px] text-center text-nowrap whitespace-pre ${
            isActive && !isDark ? "font-['Lato:Medium',sans-serif] text-[#2EC4B6]" : (isActive ? "font-['Lato:Medium',sans-serif] text-white" : (isDark ? "font-['Lato:Light',sans-serif] text-white" : "font-['Lato:Light',sans-serif] text-[#2c4657]"))
          }`}>Our team</p>
        </div>
      </div>
      {!isDark && (
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.12),inset_0px_-5px_4px_0px_rgba(255,255,255,0.08)] rounded-[100px]" />
      )}
    </button>
  );
}

function GitDiff({ theme = 'dark' }: { theme?: 'light' | 'dark' }) {
  const iconColor = theme === 'dark' ? 'white' : '#2C4657';
  return (
    <div className="relative shrink-0 size-[24px]" data-name="GitDiff">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="GitDiff">
          <path d={svgPaths.p1d567280} fill={iconColor} id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame5({ onClick, isActive, theme = 'dark' }: { onClick: () => void; isActive?: boolean; theme?: 'light' | 'dark' }) {
  const isDark = theme === 'dark';
  const iconColor = isActive && !isDark ? '#2EC4B6' : (isActive ? 'white' : (isDark ? 'white' : '#2C4657'));
  
  return (
    <button 
      onClick={onClick}
      className={`h-[64px] relative rounded-[100px] shrink-0 w-full cursor-pointer transition-all duration-300 ${
        isActive 
          ? (isDark ? 'bg-[rgba(46,196,182,0.3)] hover:bg-[rgba(46,196,182,0.4)]' : 'bg-[rgba(190,240,237,1)] hover:bg-[rgba(170,235,230,1)]')
          : (isDark ? 'bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)]' : 'bg-[#e4ecf1] hover:bg-[#d9e6ed]')
      }`}
    >
      <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[100px] ${
        isActive ? 'border-[rgba(46,196,182,0.4)]' : (isDark ? 'border-[rgba(255,255,255,0.2)]' : 'border-[rgba(44,70,87,0.1)]')
      }`} />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[17.5px] py-[12px] relative w-full">
          <div className="relative shrink-0 size-[24px]" data-name="GitDiff">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <g id="GitDiff">
                <path d={svgPaths.p1d567280} fill={iconColor} id="Vector" />
              </g>
            </svg>
          </div>
          <p className={`leading-[24px] not-italic relative shrink-0 text-[20px] text-center text-nowrap whitespace-pre ${
            isActive && !isDark ? "font-['Lato:Medium',sans-serif] text-[#2EC4B6]" : (isActive ? "font-['Lato:Medium',sans-serif] text-white" : (isDark ? "font-['Lato:Light',sans-serif] text-white" : "font-['Lato:Light',sans-serif] text-[#2c4657]"))
          }`}>Our process</p>
        </div>
      </div>
      {!isDark && (
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.12),inset_0px_-5px_4px_0px_rgba(255,255,255,0.08)] rounded-[100px]" />
      )}
    </button>
  );
}

function Article({ theme = 'dark' }: { theme?: 'light' | 'dark' }) {
  const iconColor = theme === 'dark' ? 'white' : '#2C4657';
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Article">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Article">
          <path d={svgPaths.p57ca580} fill={iconColor} id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame6({ onClick, isActive, theme = 'dark' }: { onClick: () => void; isActive?: boolean; theme?: 'light' | 'dark' }) {
  const isDark = theme === 'dark';
  const iconColor = isActive && !isDark ? '#2EC4B6' : (isActive ? 'white' : (isDark ? 'white' : '#2C4657'));
  
  return (
    <button 
      onClick={onClick}
      className={`h-[64px] relative rounded-[100px] shrink-0 w-full cursor-pointer transition-all duration-300 ${
        isActive 
          ? (isDark ? 'bg-[rgba(46,196,182,0.3)] hover:bg-[rgba(46,196,182,0.4)]' : 'bg-[rgba(190,240,237,1)] hover:bg-[rgba(170,235,230,1)]')
          : (isDark ? 'bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)]' : 'bg-[#e4ecf1] hover:bg-[#d9e6ed]')
      }`}
    >
      <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[100px] ${
        isActive ? 'border-[rgba(46,196,182,0.4)]' : (isDark ? 'border-[rgba(255,255,255,0.2)]' : 'border-[rgba(44,70,87,0.1)]')
      }`} />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[17.5px] py-[12px] relative w-full">
          <div className="relative shrink-0 size-[24px]" data-name="Article">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <g id="Article">
                <path d={svgPaths.p57ca580} fill={iconColor} id="Vector" />
              </g>
            </svg>
          </div>
          <p className={`leading-[24px] not-italic relative shrink-0 text-[20px] text-center text-nowrap whitespace-pre ${
            isActive && !isDark ? "font-['Lato:Medium',sans-serif] text-[#2EC4B6]" : (isActive ? "font-['Lato:Medium',sans-serif] text-white" : (isDark ? "font-['Lato:Light',sans-serif] text-white" : "font-['Lato:Light',sans-serif] text-[#2c4657]"))
          }`}>Blogs</p>
        </div>
      </div>
      {!isDark && (
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.12),inset_0px_-5px_4px_0px_rgba(255,255,255,0.08)] rounded-[100px]" />
      )}
    </button>
  );
}

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  theme?: 'light' | 'dark';
}

export function MobileMenu({ isMobileMenuOpen, setIsMobileMenuOpen, activeSection, setActiveSection, theme = 'dark' }: MobileMenuProps) {
  // Navigation handler - scrolls to section and closes menu
  const handleNavigate = (sectionId: string, activeState: string) => {
    // Set the active section based on which button was clicked
    setActiveSection(activeState);
    
    // Special handling for Home - scroll past splash screen to hero content
    if (sectionId === 'HeroSection') {
      window.scrollTo({ 
        top: window.innerHeight * 1, // Scroll past splash fade threshold
        behavior: 'smooth' 
      });
      setIsMobileMenuOpen(false);
      return;
    }
    
    // Special handling for About Us section
    if (sectionId === 'AboutUsSection') {
      window.scrollTo({ 
        top: window.innerHeight * 3.8, // Adjusted position for About Us section
        behavior: 'smooth' 
      });
      setIsMobileMenuOpen(false);
      return;
    }

    // Special handling for Service Us section
    if (sectionId === 'ServiceSection') {
      window.scrollTo({ 
        top: window.innerHeight * 6.2, // Same position as Services
        behavior: 'smooth' 
      });
      setIsMobileMenuOpen(false);
      return;
    }


    // Special handling for Team section
    if (sectionId === 'TeamSection') {
      window.scrollTo({ 
        top: window.innerHeight * 12, // Same position as Services
        behavior: 'smooth' 
      });
      setIsMobileMenuOpen(false);
      return;
    }

    // Special handling for Process Us section
    if (sectionId === 'ProcessSection') {
      window.scrollTo({ 
        top: window.innerHeight * 13.8, // Same position as Services
        behavior: 'smooth' 
      });
      setIsMobileMenuOpen(false);
      return;
    }

    // Special handling for Blogs Us section
    if (sectionId === 'BlogsSection') {
      window.scrollTo({ 
        top: window.innerHeight * 18, // Same position as Services
        behavior: 'smooth' 
      });
      setIsMobileMenuOpen(false);
      return;
    }
    
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Fallback: scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const isDark = theme === 'dark';

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-[100px] left-1/2 -translate-x-1/2 z-[200] w-[410px] px-[24px] max-h-[calc(100vh-120px)] overflow-y-auto"
          style={{ willChange: 'opacity, transform' }}
        >
          <div 
            className={`${isDark ? 'bg-[rgba(44,70,87,0.92)] backdrop-blur-[20px]' : 'bg-[rgba(228,236,241,0.88)] backdrop-blur-[20px]'} relative rounded-[32px] w-full`}
            style={{ 
              WebkitBackdropFilter: 'blur(20px)',
              transform: 'translateZ(0)',
              willChange: 'backdrop-filter'
            } as React.CSSProperties}
          >
            <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[32px] ${isDark ? 'border-[rgba(255,255,255,0.15)]' : 'border-[rgba(255,255,255,0.1)]'}`} />
            <div className="w-full">
              <div className="box-border content-stretch flex flex-col gap-[14px] items-start px-[16px] py-[18px] relative w-full">
                <Frame onClick={() => handleNavigate('HeroSection', 'home')} isActive={activeSection === 'home'} theme={theme} />
                <Frame1 onClick={() => handleNavigate('AboutUsSection', 'about')} isActive={activeSection === 'about'} theme={theme} />
                <Frame2 onClick={() => handleNavigate('ServiceSection', 'services')} isActive={activeSection === 'services'} theme={theme} />
                <Frame3 onClick={() => handleNavigate('ReviewsSection', 'reviews')} isActive={activeSection === 'reviews'} theme={theme} />
                <Frame4 onClick={() => handleNavigate('TeamSection', 'team')} isActive={activeSection === 'team'} theme={theme} />
                <Frame5 onClick={() => handleNavigate('ProcessSection', 'process')} isActive={activeSection === 'process'} theme={theme} />
                <Frame6 onClick={() => handleNavigate('BlogsSection', 'blogs')} isActive={activeSection === 'blogs'} theme={theme} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}