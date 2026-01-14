export default function Frame() {
  return (
    <div className="bg-[rgba(228,236,241,0.6)] relative rounded-[12px] size-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-center justify-center overflow-clip p-[24px] relative size-full">
          <p className="font-['Lato:SemiBold',sans-serif] leading-[32px] min-w-full not-italic relative shrink-0 text-[#2c4657] text-[32px] w-[min-content]">Phone</p>
          <p className="font-['Lato:Light',sans-serif] leading-[40px] min-w-full not-italic relative shrink-0 text-[#2c4657] text-[28px] w-[min-content]">0161 667 5990</p>
          <div className="absolute h-[109px] left-[311.33px] top-[-45px] w-[148px]">
            <div className="absolute inset-[-84.4%_-62.16%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 332 293">
                <g filter="url(#filter0_f_1361_445)" id="Ellipse 31">
                  <ellipse cx="166" cy="146.5" fill="var(--fill-0, #2EC4B6)" fillOpacity="0.14" rx="74" ry="54.5" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="293" id="filter0_f_1361_445" width="332" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur_1361_445" stdDeviation="46" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#2ec4b6] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_4px_28px_6px_rgba(46,196,182,0.12)]" />
    </div>
  );
}