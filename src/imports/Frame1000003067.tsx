function Frame() {
  return (
    <div className="h-[20px] relative shrink-0 w-[98px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 98 20">
        <g id="Frame 1000003064">
          <circle cx="10" cy="10" fill="var(--fill-0, #2C4657)" id="Ellipse 37" r="10" />
          <circle cx="39" cy="10" fill="var(--fill-0, #D9D9D9)" id="Ellipse 38" r="7" />
          <circle cx="65" cy="10" fill="var(--fill-0, #D9D9D9)" id="Ellipse 39" r="7" />
          <circle cx="91" cy="10" fill="var(--fill-0, #D9D9D9)" id="Ellipse 40" r="7" />
        </g>
      </svg>
    </div>
  );
}

export default function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[56px] items-center relative size-full">
      <ol className="block font-['Lato:Regular',sans-serif] leading-[0] list-decimal min-w-full not-italic relative shrink-0 text-[#222526] text-[40px] text-center w-[min-content]" start="1">
        <li className="list-inside ms-[60px]">
          <span className="leading-[64px]">{`At Jigsaw Financial Ltd, we are dedicated to shaping your financial future through insightful conversations. `}</span>
        </li>
      </ol>
      <Frame />
    </div>
  );
}