import { motion } from 'motion/react';
import { useState } from 'react';
import callIcon from '../assets/call.svg';
import svgPaths from '../imports/svg-hkse6zvihd';
import svgPathsCross from '../imports/svg-trmtdcmgb9';

function Main() {
  return (
    <div className="[grid-area:1_/_1] h-[27.429px] ml-0 mt-0 relative w-[25.714px]" data-name="Main_1_00000014621826160272210780000006234564362710872498_">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 28">
        <g id="Main_1_00000014621826160272210780000006234564362710872498_">
          <path d={svgPaths.p2e7e0c00} fill="#2EC4B6" id="Vector" />
          <path d={svgPaths.p32440100} fill="#2C4657" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Favicon() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative" data-name="Favicon">
      <Main />
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-white relative rounded-[48px] size-[48px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[6.857px] items-center justify-center px-[27.429px] py-[20.571px] relative size-[48px]">
          <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center leading-[0] relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "25.703125", "--transform-inner-height": "27.421875" } as React.CSSProperties}>
            <div className="flex-none rotate-[90deg]">
              <Favicon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneOutgoing() {
  return (
    <div className="relative size-[20px]" data-name="PhoneOutgoing">
      <img src={callIcon} alt="Contact" className="size-full object-contain" />
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-white relative rounded-[48px] size-[48px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[6.857px] items-center justify-center px-[27.429px] py-[20.571px] relative size-[48px]">
          <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "20.5625", "--transform-inner-height": "20.5625" } as React.CSSProperties}>
            <div className="flex-none rotate-[90deg]">
              <PhoneOutgoing />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconamoonMenuBurgerVerticalThin() {
  return (
    <div className="relative shrink-0 size-[19.2px]" data-name="iconamoon:menu-burger-vertical-thin">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="iconamoon:menu-burger-vertical-thin">
          <path d={svgPaths.p8bd0840} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
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

function Frame1({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
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
      className="bg-[rgba(255,255,255,0.1)] box-border content-stretch flex flex-col gap-[9.6px] items-center justify-center px-[21px] py-[14.4px] relative rounded-[120px] shrink-0 w-[48px] cursor-pointer"
    >
      <div aria-hidden="true" className="absolute border-[1.2px] border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[120px]" />
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
        className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))] cursor-pointer"
        style={{ "--transform-inner-width": "48", "--transform-inner-height": "48" } as React.CSSProperties}
        aria-label="Scroll to Contact"
      >
        <div className="flex-none rotate-[270deg]">
          <Frame2 />
        </div>
      </div>
      <Frame1 isOpen={isOpen} onClick={onClick} />
    </div>
  );
}

function Frame4({ isOpen, onClick, backgroundColor, showBorder = true }: { isOpen: boolean; onClick: () => void; backgroundColor?: string; showBorder?: boolean }) {
  const bgStyle = backgroundColor ? {} : { backgroundColor: 'rgba(255,255,255,0.05)' };
  const bgClass = backgroundColor || '';
  
  return (
    <div 
      className={`${bgClass} box-border content-stretch flex gap-[64px] items-center p-[12px] relative rounded-[72px] shrink-0`}
      style={bgStyle}
    >
      {showBorder && <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[72px]" />}
      <Frame3 isOpen={isOpen} onClick={onClick} />
    </div>
  );
}

interface MobileNavigationProps {
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  backgroundColor?: string;
  zIndex?: number;
  showBorder?: boolean;
  isMobileMenuOpen?: boolean;
  isVisible?: boolean;
}

export function MobileNavigation({ setIsMobileMenuOpen, backgroundColor, zIndex = 60, showBorder, isMobileMenuOpen = false, isVisible = true }: MobileNavigationProps) {
  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // When menu is open, navigation needs higher z-index than menu popup (z-200) to show close icon
  const zIndexClass = isMobileMenuOpen ? 'z-[250]' : (zIndex === 100 ? 'z-[100]' : 'z-[60]');
  
  return (
    <motion.div 
      initial={false}
      animate={{ 
        y: isVisible ? 0 : -100,
        x: '-50%' 
      }}
      transition={{ 
        duration: 0.5, 
        ease: [0.16, 1, 0.3, 1] // Custom ease for a premium feel
      }}
      className={`fixed top-[24px] left-1/2 w-[90%] max-w-[382px] px-4 ${zIndexClass}`}
    >
      <div className="content-stretch flex items-center justify-between relative w-full">
        <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "48", "--transform-inner-height": "48" } as React.CSSProperties}>
          <div className="flex-none rotate-[270deg]">
            <Frame />
          </div>
        </div>
        <Frame4 isOpen={isMobileMenuOpen} onClick={handleMenuToggle} backgroundColor={backgroundColor} showBorder={showBorder} />
      </div>
    </motion.div>
  );
}