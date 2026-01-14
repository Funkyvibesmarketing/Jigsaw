import imgVector from "figma:asset/f35d54ef11fdbb359ce9c55cc2ed92ff50c3ae67.png";
import { motion } from "motion/react";

export function DownArrowButton({ onClick }: { onClick?: () => void }) {
  return (
    <motion.div 
      className="relative rounded-[40px] size-[80px] cursor-pointer"
      onClick={onClick}
      whileHover={{ 
        scale: 1.1,
        boxShadow: "0 8px 30px rgba(255, 255, 255, 0.3)"
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <div aria-hidden="true" className="absolute border-2 border-dashed border-white inset-[-2px] pointer-events-none rounded-[42px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[20px] relative size-full">
          <div className="flex items-center justify-center relative shrink-0 size-[40px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
            <div className="flex-none rotate-[90deg]">
              <div className="overflow-clip relative size-[40px]">
                <div className="absolute flex inset-[28.38%_14.25%_28.21%_14.29%] items-center justify-center">
                  <div className="flex-none h-[17.286px] rotate-[359.849deg] w-[28.542px]">
                    <div className="relative size-full" data-name="Vector">
                      <div className="absolute inset-[-2.07%_-1.25%]">
                        <img alt="" className="block max-w-none size-full" height="18" src={imgVector} width="29.256" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}