import svgPaths from "./svg-k4gs4aeqfc";
import imgVector from "figma:asset/29d00c96d16b578c0374f784d6e51ab7656ee486.png";
import { motion, MotionValue } from "motion/react";

function Group1() {
  return (
    <div className="absolute bottom-0 left-[9.37%] right-[9.37%] top-0" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 49">
        <g id="Group">
          <path d={svgPaths.peed8c00} fill="var(--fill-0, #2C4657)" id="Vector" />
          <path d={svgPaths.p1e4bc600} fill="var(--fill-0, #2C4657)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="overflow-clip relative shrink-0 size-[48.52px]" data-name="Frame">
      <Group1 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[4.313px] items-center justify-center p-[35.04px] relative rounded-[60px] shrink-0 size-[120.216px]">
      <Frame />
    </div>
  );
}

interface Frame13Props {
  iconSlideX?: MotionValue<number>;
  iconScale?: MotionValue<number>;
  iconOpacity?: MotionValue<number>;
}

function Frame13({ iconSlideX, iconScale, iconOpacity }: Frame13Props) {
  return (
    <motion.div 
      className="absolute bg-[rgba(255,255,255,0.1)] box-border content-stretch flex gap-[4.313px] items-center left-1/2 -translate-x-1/2 p-[39.892px] rounded-[100px] size-[200px] top-[150px]"
      style={{ x: iconSlideX, scale: iconScale, opacity: iconOpacity }}
    >
      <Frame12 />
    </motion.div>
  );
}

interface Frame14Props {
  barOpacities?: MotionValue<number>[];
}

function Frame14({ barOpacities }: Frame14Props) {
  const bars = [
    { bg: "rgba(255,255,255,0.72)", height: "76px" }, // Bar 0
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 1
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 2
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 3
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 4
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 5
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 6
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 7
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 8
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 9
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 10
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 11
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 12
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 13
    { bg: "rgba(255,255,255,0.72)", height: "76px" }, // Bar 14
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 15
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 16
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 17
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 18
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 19
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 20
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 21
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 22
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 23
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 24
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 25
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 26
    { bg: "rgba(255,255,255,0.72)", height: "44px" }, // Bar 27
    { bg: "rgba(255,255,255,0.72)", height: "76px" }, // Bar 28
  ];

  return (
    <div className="absolute content-stretch flex items-end justify-between left-1/2 top-[28px] translate-x-[-50%] w-[1069px]">
      {bars.map((bar, index) => (
        <motion.div
          key={index}
          className="rounded-[32px] shrink-0 w-[4px]"
          style={{
            backgroundColor: bar.bg,
            height: bar.height,
            opacity: barOpacities && barOpacities[index] ? barOpacities[index] : 1
          }}
        />
      ))}
    </div>
  );
}

function Frame15() {
  return (
    <div className="absolute left-[1059px] size-[17px] top-0">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        <g id="Frame 1000003013">
          <rect fill="var(--fill-0, white)" fillOpacity="0.22" height="17" rx="8.5" width="17" />
          <circle cx="8.5" cy="8.5" fill="var(--fill-0, white)" fillOpacity="0.72" id="Ellipse 30" r="2.5" />
        </g>
      </svg>
    </div>
  );
}

interface Frame16Props {
  barOpacities?: MotionValue<number>[];
}

function Frame16({ barOpacities }: Frame16Props) {
  return (
    <div className="absolute bottom-0 h-[104px] left-[calc(50%+0.5px)] translate-x-[-50%] w-[1069px]">
      <Frame14 barOpacities={barOpacities} />
      <Frame15 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="overflow-clip relative size-[36px]">
      <div className="absolute flex inset-[28.41%_14.26%_28.19%_14.28%] items-center justify-center">
        <div className="flex-none h-[15.557px] rotate-[359.849deg] w-[25.687px]">
          <div className="relative size-full" data-name="Vector">
            <div className="absolute inset-[-4.82%_-2.92%]">
              <img alt="" className="block max-w-none size-full" height="17.057" src={imgVector} width="27.187" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="bg-[#2ec4b6] relative rounded-[72px] size-[72px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[10.286px] items-center justify-center px-[41.143px] py-[30.857px] relative size-[72px]">
          <div className="flex items-center justify-center relative shrink-0 size-[36px]" style={{ "--transform-inner-width": "36", "--transform-inner-height": "36" } as React.CSSProperties}>
            <div className="flex-none rotate-[90deg]">
              <Frame2 />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[-6.429px_0px_5.143px_0px_inset_rgba(255,255,255,0.12),3.857px_0px_5.143px_0px_inset_rgba(255,255,255,0.16)]" />
    </div>
  );
}

interface Process3rdStepProps {
  iconSlideX?: MotionValue<number>;
  iconScale?: MotionValue<number>;
  iconOpacity?: MotionValue<number>;
  textSlideX?: MotionValue<number>;
  textOpacity?: MotionValue<number>;
  barOpacities?: MotionValue<number>[];
}

export default function Process3rdStep({
  iconSlideX,
  iconScale,
  iconOpacity,
  textSlideX,
  textOpacity,
  barOpacities
}: Process3rdStepProps) {
  return (
    <div className="bg-[#2c4657] relative size-full" data-name="Process (3rd step)">
      {/* Removed Frame6, Frame1, and keep scrolling text - using centralized navigation instead */}
      
      {/* Center icon with animation - using Step 3 layout */}
      <Frame13 iconSlideX={iconSlideX} iconScale={iconScale} iconOpacity={iconOpacity} />
      
      {/* Text content with slide in from right animation - using Step 3 layout */}
      <motion.div
        className="absolute inset-0"
        style={{ x: textSlideX, opacity: textOpacity }}
      >
        <p className="absolute font-['Lato:SemiBold',sans-serif] leading-[normal] left-1/2 -translate-x-1/2 not-italic text-[56px] text-center text-white top-[440px] whitespace-pre">3. Taking your stress away</p>
        <p className="absolute font-['Lato:Light',sans-serif] leading-[32px] left-1/2 not-italic opacity-70 text-[24px] text-center text-white top-[530px] translate-x-[-50%] whitespace-pre">Life's busy, but we focus on your future—first home.</p>
      </motion.div>
      
      {/* Progress bar removed - now handled centrally in Process.tsx */}
    </div>
  );
}