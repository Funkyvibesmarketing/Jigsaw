import imgVector from "figma:asset/29d00c96d16b578c0374f784d6e51ab7656ee486.png";
import { motion } from "motion/react";

export function UpArrowButton({ onClick }: { onClick?: () => void }) {
  return (
    <motion.div 
      className="size-[72px] cursor-pointer"
      onClick={onClick}
      whileHover={{ 
        scale: 1.1
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex-none rotate-[180deg] size-full">
        <div className="bg-[#2ec4b6] relative rounded-[72px] size-full">
          <div className="flex flex-row items-center justify-center size-full">
            <div className="box-border content-stretch flex gap-[10.286px] items-center justify-center px-[41.143px] py-[30.857px] relative size-full">
              <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "36", "--transform-inner-height": "36" } as React.CSSProperties}>
                <div className="flex-none rotate-[90deg]">
                  <div className="overflow-clip relative size-[36px]">
                    <div className="absolute flex inset-[28.41%_14.26%_28.19%_14.28%] items-center justify-center">
                      <div className="flex-none h-[15.557px] rotate-[359.849deg] w-[25.687px]">
                        <div className="relative size-full">
                          <div className="absolute inset-[-4.82%_-2.92%]">
                            <img alt="" className="block max-w-none size-full" height="17.057" src={imgVector} width="27.187" />
                          </div>
                        </div>
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