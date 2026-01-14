import imgVector from "figma:asset/84c24fb90c35556f4ed45fa20bbd675e0a457d11.png";

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start not-italic relative shrink-0 w-full">
      <p className="font-['Lato:Bold',sans-serif] leading-[28px] relative shrink-0 text-[#222526] text-[40px] w-full">£650</p>
      <p className="font-['Lato:Regular',sans-serif] leading-[36px] relative shrink-0 text-[20px] text-[rgba(34,37,38,0.5)] w-full">No percentages, no sliding scales, no mystery ranges.</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <p className="font-['Lato:Regular',sans-serif] leading-[36px] not-italic relative shrink-0 text-[#222526] text-[20px] w-full">Transparent Fees for new Clients:</p>
      <Frame3 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start not-italic relative shrink-0 w-full">
      <p className="font-['Lato:Bold',sans-serif] leading-[28px] min-w-full relative shrink-0 text-[#222526] text-[40px] w-[min-content]">Free of Cost!</p>
      <p className="font-['Lato:Regular',sans-serif] leading-[36px] relative shrink-0 text-[20px] text-[rgba(34,37,38,0.5)] w-[465px]">Because paying again for advice you already got feels... unnecessary</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <p className="font-['Lato:Regular',sans-serif] leading-[36px] not-italic relative shrink-0 text-[#222526] text-[20px] w-full">For Existing Clients:</p>
      <Frame5 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] items-start left-[40px] top-[82px] w-[512px]">
      <Frame1 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 512 1">
            <line id="Line 27" stroke="var(--stroke-0, black)" strokeOpacity="0.25" x2="512" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Frame2 />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-white overflow-clip relative rounded-[40px] shadow-[0px_36px_52px_-5px_rgba(0,0,0,0.12)] size-full">
      <div className="absolute inset-[-107.69%_-45.15%_-64.94%_19.5%]" data-name="Vector">
        <img alt="" className="block max-w-none size-full" height="1524" src={imgVector} width="1205" />
      </div>
      <div className="absolute inset-[-40.07%_36.39%_-31.48%_-36.39%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 959 959">
          <circle cx="479.5" cy="479.5" fill="var(--fill-0, white)" id="Ellipse 29" r="479.5" />
        </svg>
      </div>
      <Frame4 />
    </div>
  );
}