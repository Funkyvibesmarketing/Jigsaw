import imgVector from "figma:asset/6d6de80792d2de9d2d28717db9e5bf0e0b17e6c0.png";

function Frame() {
  return (
    <div className="overflow-clip relative size-[30px]">
      <div className="absolute flex inset-[28.38%_14.25%_28.22%_14.29%] items-center justify-center">
        <div className="flex-none h-[12.964px] rotate-[359.849deg] w-[21.406px]">
          <div className="relative size-full" data-name="Vector">
            <div className="absolute inset-[-2.07%_-1.25%]">
              <img alt="" className="block max-w-none size-full" height="13.5" src={imgVector} width="21.942" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-center p-[3px] relative rounded-[24px] shrink-0 size-[48px]">
      <div aria-hidden="true" className="absolute border-[0.75px] border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[24px]" />
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
    <div className="overflow-clip relative size-[30px]">
      <div className="absolute flex inset-[28.38%_14.25%_28.22%_14.29%] items-center justify-center">
        <div className="flex-none h-[12.964px] rotate-[359.849deg] w-[21.406px]">
          <div className="relative size-full" data-name="Vector">
            <div className="absolute inset-[-2.07%_-1.25%]">
              <img alt="" className="block max-w-none size-full" height="13.5" src={imgVector} width="21.942" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-center justify-center p-[3px] relative rounded-[24px] size-[48px]">
      <div aria-hidden="true" className="absolute border-[0.75px] border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[24px]" />
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
    <div className="content-stretch flex gap-[24px] items-center relative size-full">
      <Frame2 />
      <p className="css-ew64yg font-['Lato:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-[rgba(255,255,255,0.2)] text-center">1/3</p>
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <Frame3 />
        </div>
      </div>
    </div>
  );
}