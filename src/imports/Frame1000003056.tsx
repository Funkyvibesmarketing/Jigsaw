import imgFrame1000003056 from "figma:asset/b5151c812ddda0f233ff901d629f7dab38b941a4.png";

function Frame1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-[4.73%] not-italic right-[4.73%] text-[#222526] top-[calc(50%+106.5px)] translate-y-[-50%]">
      <p className="font-['Lato:SemiBold',sans-serif] leading-[26px] relative shrink-0 text-[20px] w-full">Buying home for first time? We make it easy</p>
      <p className="font-['Lato:Regular',sans-serif] leading-[22px] relative shrink-0 text-[14px] w-full">Buying your first home can feel like learning a new language—one spoken entirely by banks. We translate the process, help you find the best deals, and support you every step of the way. So you can move in with confidence, not confusion.</p>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="overflow-clip relative rounded-[24px] shadow-[0px_36px_52px_-5px_rgba(0,0,0,0.12)] size-full">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[24px]">
        <div className="absolute bg-white inset-0 rounded-[24px]" />
        <div className="absolute inset-0 overflow-hidden rounded-[24px]">
          <img alt="" className="absolute h-[59.77%] left-[-17.99%] max-w-none top-[-9.75%] w-[136.05%]" src={imgFrame1000003056} />
        </div>
      </div>
      <div className="absolute inset-[38.4%_-35.86%_-66.28%_-35.86%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 580.44 656">
          <ellipse cx="290.22" cy="328" fill="var(--fill-0, white)" id="Ellipse 29" rx="290.22" ry="328" />
        </svg>
      </div>
      <Frame1 />
    </div>
  );
}