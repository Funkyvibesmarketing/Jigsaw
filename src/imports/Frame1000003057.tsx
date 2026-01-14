import imgFrame1000003057 from "figma:asset/a36d14e3d445d288a215919fe8f6d766e0ca89b9.png";

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center not-italic relative shrink-0 text-[#222526] w-full">
      <p className="font-['Lato:Bold',sans-serif] leading-[24px] relative shrink-0 text-[20px] text-nowrap">£650</p>
      <p className="font-['Lato:Regular',sans-serif] leading-[20px] min-w-full relative shrink-0 text-[14px] w-[min-content]">No percentages, no sliding scales, no mystery ranges.</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[12px] grow items-start min-h-px min-w-px relative self-stretch shrink-0">
      <p className="font-['Lato:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[16px] text-[rgba(34,37,38,0.5)] w-full">Transparent Fees for new Clients:</p>
      <Frame3 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start not-italic relative shrink-0 text-[#222526] w-full">
      <p className="font-['Lato:Bold',sans-serif] leading-[24px] relative shrink-0 text-[20px] w-full">Free of Cost!</p>
      <p className="font-['Lato:Regular',sans-serif] leading-[20px] relative shrink-0 text-[14px] w-full">Because paying again for advice you already got feels unnecessary</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[12px] grow items-start min-h-px min-w-px relative shrink-0">
      <p className="font-['Lato:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[16px] text-[rgba(34,37,38,0.5)] w-full">For Existing Clients:</p>
      <Frame5 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-start justify-center left-[16px] top-[274px] w-[306px]">
      <Frame1 />
      <div className="flex items-center justify-center relative self-stretch shrink-0 w-0" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none h-full rotate-[90deg]">
          <div className="h-full relative w-[142px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 142 1">
                <line id="Line 28" stroke="var(--stroke-0, black)" strokeOpacity="0.2" x2="142" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame2 />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="overflow-clip relative rounded-[24px] shadow-[0px_36px_52px_-5px_rgba(0,0,0,0.12)] size-full">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[24px]">
        <img alt="" className="absolute h-[92.26%] left-0 max-w-none top-[-24.24%] w-full" src={imgFrame1000003057} />
      </div>
      <div className="absolute inset-[38.4%_-35.86%_-66.28%_-35.86%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 580.44 656">
          <ellipse cx="290.22" cy="328" fill="var(--fill-0, white)" id="Ellipse 29" rx="290.22" ry="328" />
        </svg>
      </div>
      <Frame4 />
    </div>
  );
}