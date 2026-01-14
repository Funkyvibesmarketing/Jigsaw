import imgVector from "figma:asset/fae0ee08eb106871575ac18cac905aae9667c318.png";

function Frame1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[40px] not-italic text-[#222526] top-[60px] w-[512px]">
      <p className="font-['Lato:SemiBold',sans-serif] leading-[36px] relative shrink-0 text-[28px] w-full">Buying home for first time? We make it easy</p>
      <p className="font-['Lato:Regular',sans-serif] leading-[28px] relative shrink-0 text-[20px] w-full">Buying your first home can feel like learning a new language—one spoken entirely by banks. We translate the process, help you find the best deals, and support you every step of the way. So you can move in with confidence, not confusion.</p>
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