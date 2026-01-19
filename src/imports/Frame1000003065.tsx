import imgVector from "figma:asset/4234f71b7d4a1998f6e3282ba90ea09ce5633514.png";

function Frame() {
  return (
    <div className="overflow-clip relative size-[40px]">
      <div className="absolute flex inset-[28.38%_14.25%_28.22%_14.29%] items-center justify-center">
        <div className="flex-none h-[17.286px] rotate-[359.849deg] w-[28.542px]">
          <div className="relative size-full" data-name="Vector">
            <div className="absolute inset-[-3.86%_-2.34%]">
              <img alt="" className="block max-w-none size-full" height="18.619" src={imgVector} width="29.875" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-center p-[4px] relative rounded-[32px] size-full">
      <div aria-hidden="true" className="absolute border-[1.333px] border-[rgba(44,70,87,0.2)] border-solid inset-0 pointer-events-none rounded-[32px]" />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <Frame />
        </div>
      </div>
    </div>
  );
}