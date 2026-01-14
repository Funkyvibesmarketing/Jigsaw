export default function Frame() {
  return (
    <div className="backdrop-blur-[14px] backdrop-filter bg-[rgba(228,236,241,0.4)] relative rounded-[16px] size-full">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start overflow-clip p-[16px] relative size-full">
          <p className="font-['Lato:Regular',sans-serif] leading-[28px] min-w-full not-italic relative shrink-0 text-[#2c4657] text-[16px] tracking-[0.032px] w-[min-content]">{`“I would strongly recommend Nick if you are looking to secure a mortgage or remortgage. `}</p>
          <p className="font-['Lato:Regular',sans-serif] leading-[16px] min-w-full not-italic relative shrink-0 text-[#2c4657] text-[12px] w-[min-content]">~Daniel</p>
          <div className="absolute flex h-[107.628px] items-center justify-center left-[71.35px] top-[88.2px] w-[358.491px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
            <div className="flex-none rotate-[356.635deg]">
              <div className="h-[87px] relative w-[353.994px]">
                <div className="absolute inset-[-59.77%_-14.69%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 457.994 191">
                    <g filter="url(#filter0_f_1515_40)" id="Ellipse 15">
                      <ellipse cx="228.997" cy="95.5" fill="var(--fill-0, #2EC4B6)" fillOpacity="0.1" rx="176.997" ry="43.5" />
                    </g>
                    <defs>
                      <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="191" id="filter0_f_1515_40" width="457.994" x="0" y="0">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                        <feGaussianBlur result="effect1_foregroundBlur_1515_40" stdDeviation="26" />
                      </filter>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(46,196,182,0.3)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_4px_28px_-1px_rgba(46,196,182,0.12)]" />
    </div>
  );
}