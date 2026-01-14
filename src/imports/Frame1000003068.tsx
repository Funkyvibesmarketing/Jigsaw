function Frame() {
  return (
    <div className="h-[14px] relative shrink-0 w-[68px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 68 14">
        <g id="Frame 1000003064">
          <circle cx="7" cy="7" fill="var(--fill-0, #2C4657)" id="Ellipse 37" r="7" />
          <circle cx="27" cy="7" fill="var(--fill-0, #D9D9D9)" id="Ellipse 38" r="5" />
          <circle cx="45" cy="7" fill="var(--fill-0, #D9D9D9)" id="Ellipse 39" r="5" />
          <circle cx="63" cy="7" fill="var(--fill-0, #D9D9D9)" id="Ellipse 40" r="5" />
        </g>
      </svg>
    </div>
  );
}

export default function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-center relative size-full">
      <div className="font-['Lato:Regular',sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#222526] text-[24px] text-center w-[min-content]">
        <ol className="list-decimal mb-0" start="1">
          <li className="list-inside ms-[36px]">
            <span className="leading-[36px] text-[24px]">&nbsp;</span>
          </li>
        </ol>
        <p className="leading-[36px]">{`At Jigsaw Financial Ltd, we are dedicated to shaping your financial future through insightful conversations. `}</p>
      </div>
      <Frame />
    </div>
  );
}