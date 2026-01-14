import { useState } from 'react';
import { motion } from 'motion/react';
import imgVector from "figma:asset/014b95c85e9fb3cd7c02723afbd472b33f528fcc.png";
import imgVector1 from "figma:asset/f33c89228f77e10df76386c283f5e8e3001bf955.png";
import imgVector2 from "figma:asset/3791fa3a033d59e429d3014419a1dff88e58a90c.png";

function ArrowIcon({ src }: { src: string }) {
  return (
    <div className="overflow-clip relative shrink-0 size-[45px]">
      <div className="absolute flex inset-[28.38%_14.25%_28.21%_14.29%] items-center justify-center">
        <div className="flex-none h-[19.446px] rotate-[359.849deg] w-[32.109px]">
          <div className="relative size-full" data-name="Vector">
            <div className="absolute inset-[-2.76%_-1.67%]">
              <img alt="" className="block max-w-none size-full" height="20.519" src={src} width="33.18" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AnimatedDoubtButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className="bg-[#222526] box-border content-stretch flex gap-[8px] items-center justify-center px-[32px] py-[24px] rounded-[56px] w-fit relative overflow-hidden cursor-pointer"
      style={{
        boxShadow: '0px -9px 4px 0px inset rgba(0,0,0,0.25), 0px 4px 4px 0px inset rgba(255,255,255,0.16)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated arrows container - stationary with opacity animation */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center gap-[8px]"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Arrow 1 - Fades from light to deep */}
        <motion.div
          animate={{ 
            opacity: isHovered ? [0.3, 1, 0.3] : 0
          }}
          transition={{ 
            duration: 0.8,
            times: [0, 0.5, 1],
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 0,
            ease: "easeInOut"
          }}
        >
          <ArrowIcon src={imgVector} />
        </motion.div>
        
        {/* Arrow 2 - Fades with delay */}
        <motion.div
          animate={{ 
            opacity: isHovered ? [0.3, 1, 0.3] : 0
          }}
          transition={{ 
            duration: 0.8,
            times: [0, 0.5, 1],
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 0,
            delay: 0.15,
            ease: "easeInOut"
          }}
        >
          <ArrowIcon src={imgVector1} />
        </motion.div>
        
        {/* Arrow 3 - Fades with more delay */}
        <motion.div
          animate={{ 
            opacity: isHovered ? [0.3, 1, 0.3] : 0
          }}
          transition={{ 
            duration: 0.8,
            times: [0, 0.5, 1],
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 0,
            delay: 0.3,
            ease: "easeInOut"
          }}
        >
          <ArrowIcon src={imgVector2} />
        </motion.div>
      </motion.div>

      {/* Button text */}
      <motion.p 
        className="font-['Lato:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[24px] text-nowrap text-white whitespace-pre z-10"
        animate={{ 
          opacity: isHovered ? 0 : 1 
        }}
        transition={{ duration: 0.3 }}
      >
        Any Doubt?
      </motion.p>
    </button>
  );
}