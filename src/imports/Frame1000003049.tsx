import imgVector from "figma:asset/5aa702b67fe4226d00799fb3446a7e9a9a904d28.png";

function Frame() {
  return (
    <div className="overflow-clip relative size-[40px]">
      <div className="absolute flex inset-[28.38%_14.25%_28.21%_14.29%] items-center justify-center">
        <div className="flex-none h-[17.286px] rotate-[359.849deg] w-[28.542px]">
          <div className="relative size-full" data-name="Vector">
            <div className="absolute inset-[-2.89%_-1.75%]">
              <img alt="" className="block max-w-none size-full" height="18.286" src={imgVector} width="29.542" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center p-[4px] relative rounded-[32px] size-[64px]">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[32px]" />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <Frame />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="overflow-clip relative size-[40px]">
      <div className="absolute flex inset-[28.38%_14.25%_28.21%_14.29%] items-center justify-center">
        <div className="flex-none h-[17.286px] rotate-[359.849deg] w-[28.542px]">
          <div className="relative size-full" data-name="Vector">
            <div className="absolute inset-[-2.89%_-1.75%]">
              <img alt="" className="block max-w-none size-full" height="18.286" src={imgVector} width="29.542" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center left-0 p-[4px] rounded-[32px] size-[64px] top-[26px]">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[32px]" />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <Frame1 />
        </div>
      </div>
    </div>
  );
}

export default function Frame4() {
  return (
    <div className="content-stretch flex gap-[120px] items-center justify-center relative size-full">
      <p className="font-['Lato:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[56px] text-[rgba(255,255,255,0.1)] text-center text-nowrap">Production</p>
      <p className="font-['Lato:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[96px] text-[rgba(255,255,255,0.8)] text-center text-nowrap">First Time Buyers</p>
      <p className="font-['Lato:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[56px] text-[rgba(255,255,255,0.1)] text-center text-nowrap">Remortgage</p>
      <div className="absolute backdrop-blur-[2px] backdrop-filter bg-gradient-to-l from-[rgba(44,71,88,0)] h-[115px] left-0 to-[#2c4758] top-0 w-[97px]" />
      <div className="absolute flex h-[115px] items-center justify-center left-[1247px] top-0 w-[97px]">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="backdrop-blur-[2px] backdrop-filter bg-gradient-to-l from-[rgba(44,71,88,0)] h-[115px] to-[#2c4758] to-[68.041%] w-[97px]" />
        </div>
      </div>
      <div className="absolute flex items-center justify-center left-[1280px] size-[64px] top-[26px]">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <Frame2 />
        </div>
      </div>
      <Frame3 />
    </div>
  );
}