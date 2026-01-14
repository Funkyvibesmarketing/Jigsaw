import imgVector from "figma:asset/f1a8a1e811cf04531a014fb874a72563a14ded38.png";

function Frame() {
  return (
    <div className="overflow-clip relative size-[30px]">
      <div className="absolute flex inset-[28.38%_14.25%_28.22%_14.29%] items-center justify-center">
        <div className="flex-none h-[12.964px] rotate-[359.849deg] w-[21.406px]">
          <div className="relative size-full" data-name="Vector">
            <div className="absolute inset-[-3.86%_-2.34%]">
              <img alt="" className="block max-w-none size-full" height="13.964" src={imgVector} width="22.406" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Frame1000002974() {
  return (
    <div className="relative rounded-[24px] size-full">
      <div aria-hidden="true" className="absolute border border-[rgba(44,70,87,0.2)] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[6px] items-center justify-center p-[3px] relative size-full">
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none">
              <Frame />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}