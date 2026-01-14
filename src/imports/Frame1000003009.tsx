import imgVector from "figma:asset/24ebb464585216d2f135c0d8be59fe6d29853f3e.png";

function Frame1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[40px] text-[#222526] top-[60px] w-[512px]">
      <p className="font-['Lato:SemiBold',sans-serif] leading-[36px] not-italic relative shrink-0 text-[28px] w-full">We’ll help you with:</p>
      <ul className="block font-['Lato:Regular','Noto_Sans:Regular',sans-serif] leading-[0] relative shrink-0 text-[20px] w-full" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
        <li className="mb-[16px] ms-[30px]">
          <span className="leading-[28px]">Understand what you can borrow</span>
        </li>
        <li className="mb-[16px] ms-[30px]">
          <span className="leading-[28px]">Compare mortgage products</span>
        </li>
        <li className="mb-[16px] ms-[30px]">
          <span className="leading-[28px]">Navigate schemes and incentives, rates and lenders criteria</span>
        </li>
        <li className="ms-[30px]">
          <span className="leading-[28px]">Avoid rookie mistakes with real, regulated advice</span>
        </li>
      </ul>
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
      <Frame1 />
    </div>
  );
}