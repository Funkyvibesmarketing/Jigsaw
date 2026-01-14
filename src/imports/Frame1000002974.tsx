import imgVector from "figma:asset/9646a140b8e2b69899752a888ce457c4796d6456.png";

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

export default function Frame1() {
  return (
    <div className="relative rounded-[32px] size-full">
      <div aria-hidden="true" className="absolute border border-[rgba(44,70,87,0.2)] border-solid inset-0 pointer-events-none rounded-[32px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center justify-center p-[4px] relative size-full">
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-[180deg] scale-y-[-100%]">
              <Frame />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}