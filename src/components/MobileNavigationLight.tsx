import { motion } from 'motion/react';
import { useState } from 'react';
import logoImage from 'figma:asset/9dfebdcaec6bb839286570622d9e5b46ef1d865c.png';
import callIcon from '../assets/call.svg';
import svgPathsMenu from '../imports/svg-hkse6zvihd';
import svgPathsCross from '../imports/svg-trmtdcmgb9';

function IconamoonMenuBurgerVerticalThin() {
  return (
    <div className="relative shrink-0 size-[19.2px]" data-name="iconamoon:menu-burger-vertical-thin">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="iconamoon:menu-burger-vertical-thin">
          <path d={svgPathsMenu.p8bd0840} id="Vector" stroke="#2C4657" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
        </g>
      </svg>
    </div>
  );
}

function X() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="X">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="X">
          <path d={svgPathsCross.pd841500} fill="#2EC4B6" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame2({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  if (isOpen) {
    return (
      <button
        onClick={onClick}
        className="bg-[rgba(46,196,182,0.3)] box-border content-stretch flex flex-col gap-[8px] items-center justify-center px-[17.5px] py-[12px] relative rounded-[100px] shrink-0 size-[48px] cursor-pointer"
      >
        <div aria-hidden="true" className="absolute border border-[rgba(46,196,182,0.4)] border-solid inset-0 pointer-events-none rounded-[100px]" />
        <X />
      </button>
    );
  }
  
  return (
    <button
      onClick={onClick}
      className="bg-[#e4ecf1] box-border content-stretch flex flex-col gap-[8px] items-center justify-center px-[17.5px] py-[12px] relative rounded-[100px] shrink-0 size-[48px] cursor-pointer"
    >
      <div aria-hidden="true" className="absolute border border-[rgba(44,70,87,0.1)] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <IconamoonMenuBurgerVerticalThin />
    </button>
  );
}

function Frame3({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      {/* Phone icon - clickable with tel: link */}
      <div 
        onClick={() => {
          window.dispatchEvent(new CustomEvent('close-mobile-tutorial'));
          document.getElementById('ContactUsSection')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="bg-white flex h-[48px] items-center justify-center relative rounded-full shrink-0 w-[48px] cursor-pointer"
        aria-label="Scroll to Contact"
      >
        <img src={callIcon} alt="Contact" className="size-[20px] object-contain" />
      </div>
      <Frame2 isOpen={isOpen} onClick={onClick} />
    </div>
  );
}

function Frame4({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <div className="bg-[rgba(228,236,241,0.4)] box-border content-stretch flex h-[72px] items-center justify-between px-[12px] py-[16px] relative rounded-[72px] shrink-0 w-[136px]">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[72px]" />
      <Frame3 isOpen={isOpen} onClick={onClick} />
    </div>
  );
}

interface MobileNavigationLightProps {
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  isMobileMenuOpen?: boolean;
  isVisible?: boolean;
}

export function MobileNavigationLight({ setIsMobileMenuOpen, isMobileMenuOpen = false, isVisible = true }: MobileNavigationLightProps) {
  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // When menu is open, navigation needs higher z-index than menu popup (z-200) to show close icon
  const zIndexClass = isMobileMenuOpen ? 'z-[250]' : 'z-[120]';
  
  return (
    <motion.div 
      initial={false}
      animate={{ 
        y: isVisible ? 0 : -100,
        x: '-50%' 
      }}
      transition={{ 
        duration: 0.5, 
        ease: [0.16, 1, 0.3, 1]
      }}
      className={`fixed top-[24px] left-1/2 ${zIndexClass} w-[90%] max-w-[382px] px-4`}
    >
      <div className="content-stretch flex items-center justify-between relative w-full">
        <div className="flex h-[48px] items-center justify-center relative shrink-0 w-[48px]">
          <img src={logoImage} alt="Logo" className="size-full object-contain" />
        </div>
        <Frame4 isOpen={isMobileMenuOpen} onClick={handleMenuToggle} />
      </div>
    </motion.div>
  );
}