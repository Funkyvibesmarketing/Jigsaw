export default function Frame() {
  return (
    <div className="backdrop-blur-[14px] backdrop-filter bg-[rgba(228,236,241,0.4)] border border-[rgba(46,196,182,0.3)] border-solid overflow-clip relative rounded-[16px] shadow-[0px_4px_28px_-1px_rgba(46,196,182,0.12)] size-full">
      <p className="absolute font-['Lato:Regular',sans-serif] leading-[32px] left-[calc(50%-236px)] not-italic text-[#2c4657] text-[20px] top-[calc(50%-53.5px)] tracking-[0.04px] w-[467px]">{`“I would strongly recommend Nick if you are looking to secure a mortgage or remortgage. `}</p>
      <p className="absolute font-['Lato:Regular',sans-serif] leading-[16px] left-[calc(50%-236px)] not-italic text-[#2c4657] text-[14px] text-nowrap top-[calc(50%+34.5px)]">~Daniel</p>
      <div className="absolute flex h-[107.628px] items-center justify-center left-[49.9px] top-[118.51px] w-[358.491px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[356.635deg]">
          <div className="h-[87px] relative w-[353.994px]">
            <div className="absolute inset-[-59.77%_-14.69%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 457.994 191">
                <g filter="url(#filter0_f_1361_393)" id="Ellipse 15">
                  <ellipse cx="228.997" cy="95.5" fill="var(--fill-0, #2EC4B6)" fillOpacity="0.1" rx="176.997" ry="43.5" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="191" id="filter0_f_1361_393" width="457.994" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur_1361_393" stdDeviation="26" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}