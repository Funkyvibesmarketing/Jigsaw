import imgVector from "figma:asset/add4cb2fc6a41d59b6193f6298e99d6b25b9b0e5.png";

interface MobileUpArrowProps {
  onClick?: () => void;
  className?: string;
}

function Frame() {
  return (
    <div className="overflow-clip relative size-[24px]">
      <div className="absolute flex inset-[28.41%_14.26%_28.19%_14.28%] items-center justify-center">
        <div className="flex-none h-[10.371px] rotate-[359.849deg] w-[17.125px]">
          <div className="relative size-full" data-name="Vector">
            <div className="absolute inset-[-4.82%_-2.92%]">
              <img alt="" className="block max-w-none size-full" height="11.372" src={imgVector} width="18.125" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MobileUpArrow({ onClick, className = '' }: MobileUpArrowProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={onClick || scrollToTop}
      className={`cursor-pointer size-[64px] ${className}`}
    >
      <div className="bg-[#2ec4b6] relative rounded-[48px] size-full">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="box-border content-stretch flex gap-[6.857px] items-center justify-center px-[27.429px] py-[20.571px] relative size-full">
            <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "24", "--transform-inner-height": "24" } as React.CSSProperties}>
              <div className="flex-none rotate-[-90deg]">
                <Frame />
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}