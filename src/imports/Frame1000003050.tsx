import imgVector from "figma:asset/f35d54ef11fdbb359ce9c55cc2ed92ff50c3ae67.png";

function Frame() {
  return (
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
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-center p-[4px] relative rounded-[32px] shrink-0 size-[64px]">
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
            <div className="absolute inset-[-2.07%_-1.25%]">
              <img alt="" className="block max-w-none size-full" height="18" src={imgVector} width="29.256" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-center justify-center p-[4px] relative rounded-[32px] size-[64px]">
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
    <div className="content-stretch flex gap-[32px] items-center relative size-full">
      <Frame2 />
      <p className="font-['Lato:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[32px] text-[rgba(255,255,255,0.2)] text-center text-nowrap">1/3</p>
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <Frame3 />
        </div>
      </div>
    </div>
  );
}