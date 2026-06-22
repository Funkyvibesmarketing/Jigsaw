import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import svgPathsALogo from '../imports/svg-srebhhv8fw';

export function SplashMobile({ dataProgress = 0, onComplete }: { dataProgress?: number, onComplete: () => void }) {
  const [showFinancial, setShowFinancial] = useState(false);
  const [fadeProgress, setFadeProgress] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Directly use dataProgress since App.tsx already smoothly increments it
  const progress = dataProgress;

  useEffect(() => {
    const startDelay = setTimeout(() => {
      setHasStarted(true);
    }, 50);
    return () => clearTimeout(startDelay);
  }, []);

  useEffect(() => {
    if (progress >= 99) {
      setTimeout(() => setFadeProgress(true), 150);
      setTimeout(() => setShowFinancial(true), 300);
      setTimeout(() => setShowScrollHint(true), 500);
      if (onComplete) {
        setTimeout(onComplete, 600);
      }
    }
  }, [progress, onComplete]);

  return (
    <div className="min-h-screen w-full bg-white m-0 p-0 border-0 transition-opacity duration-300"
      style={{ opacity: hasStarted ? 1 : 0 }}>
      <AnimatedLogoScreen
        progress={progress}
        showFinancial={showFinancial}
        fadeProgress={fadeProgress}
        showScrollHint={showScrollHint}
      />
    </div>
  );
}

function AnimatedLogoScreen({
  progress,
  showFinancial,
  fadeProgress,
  showScrollHint
}: {
  progress: number,
  showFinancial: boolean,
  fadeProgress: boolean,
  showScrollHint: boolean
}) {
  return (
    <motion.div
      className="relative size-full min-h-screen bg-white border-0"
      data-name="Loading (Letter) Mobile"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ margin: 0, padding: 0 }}
    >
      {/* JIGSAW Letters — each letter uses GPU promoted keyframe transitions */}
      <div className="absolute h-[69px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[392px] px-0" style={{ marginTop: '-40px' }} data-name="JIGSAW">
        <svg className="splash-logo-svg block size-full overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 346 69">
          {/* J — enters from x=-20 */}
          <g
            style={{
              willChange: 'transform, opacity',
              opacity: 0,
              animation: 'letter-enter-j 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) 0.25s forwards'
            }}
          >
            <path fill="#2C4657" d="M30.358 43.602C30.358 47.343 29.885 50.654 28.982 53.578C28.079 56.502 26.703 58.996 24.94 61.06C23.177 63.081 20.984 64.629 18.361 65.747C15.738 66.822 12.771 67.381 9.374 67.381C6.321 67.381 3.182 66.951 0 66.091C0.043 65.188 0.129 64.285 0.215 63.425C0.301 62.522 0.387 61.662 0.43 60.802C0.473 60.286 0.688001 59.856 1.032 59.512C1.376 59.168 1.849 59.039 2.537 59.039C3.096 59.039 3.827 59.168 4.73 59.469C5.633 59.77 6.88 59.899 8.428 59.899C10.492 59.899 12.298 59.598 13.932 58.953C15.523 58.351 16.899 57.362 17.974 56.072C19.049 54.782 19.909 53.105 20.468 51.084C21.027 49.063 21.328 46.655 21.328 43.86V0H30.358V43.602Z" />
          </g>
          {/* I — enters from x=20 */}
          <g
            style={{
              willChange: 'transform, opacity',
              opacity: 0,
              animation: 'letter-enter-i 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s forwards'
            }}
          >
            <path fill="#2C4657" d="M9.03 66.65H0V0H9.03V66.65Z" />
          </g>
          {/* G — enters from x=39 */}
          <g
            style={{
              willChange: 'transform, opacity',
              opacity: 0,
              animation: 'letter-enter-g 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) 0.55s forwards'
            }}
          >
            <path fill="#2C4657" d="M58.222 35.26V60.845C54.868 63.253 51.299 65.059 47.515 66.263C43.731 67.467 39.56 68.069 35.045 68.069C29.67 68.069 24.854 67.252 20.554 65.575C16.254 63.898 12.556 61.576 9.50299 58.609C6.44999 55.642 4.08499 52.03 2.45099 47.859C0.816992 43.688 0 39.087 0 34.056C0 28.982 0.816989 24.338 2.40799 20.167C3.99899 15.996 6.278 12.384 9.202 9.417C12.126 6.407 15.738 4.128 19.952 2.451C24.166 0.816999 28.896 0 34.099 0C36.722 0 39.173 0.215001 41.452 0.602001C43.731 0.989001 45.795 1.548 47.73 2.279C49.665 3.01 51.428 3.913 53.062 4.945C54.696 5.977 56.244 7.138 57.663 8.471L55.126 12.556C54.739 13.158 54.223 13.588 53.578 13.76C52.933 13.932 52.245 13.803 51.471 13.33C50.74 12.9 49.88 12.384 48.934 11.739C47.988 11.137 46.784 10.535 45.408 9.933C44.032 9.374 42.398 8.858 40.506 8.471C38.614 8.084 36.421 7.869 33.841 7.869C30.1 7.869 26.703 8.471 23.65 9.718C20.597 10.922 18.017 12.685 15.867 14.964C13.717 17.243 12.083 19.995 10.922 23.22C9.761 26.445 9.202 30.1 9.202 34.142C9.202 38.313 9.80399 42.054 11.008 45.365C12.212 48.676 13.889 51.471 16.125 53.793C18.361 56.115 21.027 57.878 24.209 59.082C27.391 60.286 30.917 60.888 34.873 60.888C37.969 60.888 40.721 60.544 43.129 59.856C45.537 59.168 47.859 58.179 50.181 56.932V42.14H39.689C39.087 42.14 38.614 41.968 38.27 41.624C37.926 41.28 37.754 40.85 37.754 40.377V35.26H58.222Z" />
          </g>
          {/* S — enters from x=112 */}
          <g
            style={{
              willChange: 'transform, opacity',
              opacity: 0,
              animation: 'letter-enter-s 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) 0.7s forwards'
            }}
          >
            <path fill="#2C4657" d="M39.603 11.137C39.345 11.61 39.001 11.954 38.7 12.169C38.356 12.384 37.969 12.513 37.496 12.513C36.98 12.513 36.335 12.255 35.647 11.739C34.916 11.223 34.056 10.621 32.981 9.976C31.906 9.331 30.616 8.772 29.111 8.213C27.606 7.697 25.8 7.439 23.65 7.439C21.629 7.439 19.866 7.697 18.318 8.256C16.77 8.815 15.48 9.546 14.448 10.449C13.416 11.395 12.642 12.47 12.083 13.717C11.567 14.964 11.309 16.34 11.309 17.802C11.309 19.651 11.782 21.199 12.685 22.446C13.588 23.65 14.792 24.725 16.297 25.585C17.802 26.445 19.522 27.219 21.414 27.821C23.306 28.466 25.284 29.111 27.262 29.799C29.24 30.487 31.218 31.261 33.11 32.121C35.002 32.981 36.722 34.056 38.227 35.346C39.732 36.636 40.936 38.227 41.839 40.119C42.742 42.011 43.215 44.333 43.215 47.085C43.215 50.009 42.699 52.718 41.71 55.298C40.721 57.835 39.259 60.071 37.367 61.963C35.475 63.855 33.11 65.36 30.358 66.435C27.563 67.51 24.424 68.069 20.898 68.069C16.555 68.069 12.642 67.295 9.07299 65.704C5.50399 64.113 2.537 62.006 0 59.34L2.62299 55.083C2.88099 54.739 3.18199 54.438 3.52599 54.223C3.86999 54.008 4.257 53.879 4.73 53.879C5.117 53.879 5.58999 54.051 6.10599 54.352C6.62199 54.696 7.18099 55.083 7.86899 55.599C8.514 56.115 9.245 56.631 10.105 57.233C10.922 57.835 11.911 58.351 12.943 58.867C14.018 59.383 15.222 59.77 16.598 60.114C17.974 60.458 19.479 60.587 21.199 60.587C23.349 60.587 25.241 60.286 26.918 59.684C28.595 59.082 30.014 58.265 31.175 57.19C32.336 56.115 33.239 54.825 33.841 53.363C34.443 51.858 34.787 50.224 34.787 48.375C34.787 46.354 34.314 44.72 33.411 43.43C32.508 42.14 31.304 41.065 29.799 40.205C28.294 39.345 26.617 38.614 24.682 38.012C22.747 37.41 20.812 36.808 18.834 36.163C16.856 35.518 14.878 34.787 12.986 33.97C11.051 33.153 9.37399 32.035 7.86899 30.702C6.364 29.369 5.16 27.692 4.257 25.714C3.354 23.736 2.88099 21.242 2.88099 18.318C2.88099 15.953 3.354 13.674 4.257 11.481C5.16 9.288 6.49299 7.31 8.25599 5.633C10.019 3.913 12.169 2.58 14.706 1.548C17.243 0.515999 20.21 0 23.521 0C27.262 0 30.616 0.601999 33.669 1.763C36.722 2.924 39.431 4.644 41.753 6.88L39.603 11.137Z" />
          </g>
          {/* A — enters from x=195 (from right) */}
          <g
            style={{
              willChange: 'transform, opacity',
              opacity: 0,
              animation: 'letter-enter-a 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) 0.85s forwards'
            }}
          >
            <path fill="#2C4657" d="M35.776 0H26.66L0 66.607H6.966C7.74001 66.607 8.385 66.392 8.901 65.962C9.417 65.532 9.804 65.016 9.976 64.457L15.609 49.923H15.566L19.264 40.549L29.197 14.835C29.885 13.158 30.53 11.051 31.175 8.557C31.476 9.761 31.82 10.922 32.164 11.954C32.508 13.029 32.809 13.975 33.153 14.749L42.871 39.861L46.741 49.837L52.374 64.414C52.632 65.016 52.976 65.532 53.492 65.962C54.008 66.349 54.653 66.564 55.427 66.564H62.393L35.776 0Z" />
          </g>
          {/* W — enters from x=267 (from right) */}
          <g
            style={{
              willChange: 'transform, opacity',
              opacity: 0,
              animation: 'letter-enter-w 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) 1.0s forwards'
            }}
          >
            <path fill="#2C4657" d="M93.396 0L72.627 66.607H64.543L47.644 15.781C47.472 15.265 47.343 14.749 47.214 14.19C47.085 13.631 46.913 13.029 46.784 12.427C46.612 13.029 46.483 13.631 46.311 14.19C46.139 14.749 46.01 15.265 45.838 15.781L28.853 66.607H20.769L0 0H7.48198C8.29898 0 8.94399 0.215001 9.50299 0.602001C10.062 0.989001 10.406 1.505 10.535 2.15L24.295 48.461C24.51 49.278 24.725 50.181 24.94 51.17C25.155 52.116 25.327 53.148 25.542 54.223C25.757 53.148 25.972 52.116 26.23 51.127C26.445 50.138 26.703 49.278 27.004 48.461L42.656 2.15C42.828 1.634 43.215 1.118 43.731 0.687999C44.29 0.257999 44.935 0 45.709 0H48.332C49.149 0 49.794 0.215001 50.267 0.602001C50.783 0.989001 51.127 1.505 51.385 2.15L66.994 48.461C67.252 49.278 67.51 50.138 67.768 51.084C67.983 52.03 68.241 52.976 68.456 54.008C68.628 52.976 68.8 52.03 68.972 51.084C69.144 50.138 69.359 49.278 69.574 48.461L83.377 2.15C83.549 1.591 83.893 1.118 84.409 0.645C84.968 0.215 85.613 0 86.387 0H93.396Z" />
          </g>
        </svg>

        {/* A-logo symbol */}
        <div
          style={{
            position: 'absolute',
            left: '64%',
            top: '0px',
            transform: 'translateX(-50%)',
          }}
        >
          <div
            className="w-[62px] h-[69px]"
            style={{
              willChange: 'transform, opacity',
              opacity: 0,
              animation: 'logo-a-fade-in 0.5s ease-out 0.1s forwards, logo-a-scale-y 0.75s cubic-bezier(0.34, 1.56, 0.64, 1) 0.85s forwards'
            }}
          >
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 62.4487 68.11">
              <g clipPath="url(#clip0_2119_89)">
                <path d={svgPathsALogo.p2bf2a00} fill="#2EC4B6" />
                <path d={svgPathsALogo.p27abc200} fill="#2C4657" />
              </g>
              <defs><clipPath id="clip0_2119_89"><rect fill="white" height="68.11" width="62.4487" /></clipPath></defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Progress Bars & Counting Text (Faded dynamically using standard style opacity) */}
      <div
        className="absolute content-stretch flex gap-[32px] items-center left-1/2 top-1/2 -translate-x-1/2 transition-opacity duration-500"
        style={{
          marginTop: '20px',
          opacity: fadeProgress ? 0 : 1,
          visibility: showFinancial ? 'hidden' : 'visible',
          willChange: 'opacity'
        }}
      >
        <div className="flex items-center justify-center relative shrink-0">
          <div className="flex-none rotate-[180deg] scale-y-[-100%]">
            <div className="relative h-[6px] rounded-[12px] w-[122px] bg-gradient-to-r from-[rgba(255,255,255,0.4)] to-[rgba(46,196,182,0.4)] overflow-hidden">
              {/* GPU-promoted pure CSS transition for the progress scale */}
              <div
                className="absolute inset-0 bg-white/40"
                style={{
                  transform: `scaleX(${(100 - progress) / 100})`,
                  transformOrigin: 'left',
                  transition: 'transform 0.1s ease-out',
                  willChange: 'transform'
                }}
              />
            </div>
          </div>
        </div>

        {/* Counter text updating directly via animated state to avoid React component render lag */}
        <p
          className="font-['Lato:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#2ec4b6] text-[32px] text-center text-nowrap whitespace-pre"
          style={{ willChange: 'transform' }}
        >
          {progress}%
        </p>

        <div className="relative h-[6px] rounded-[12px] shrink-0 w-[122px] bg-gradient-to-r from-[rgba(255,255,255,0.4)] to-[rgba(46,196,182,0.4)] overflow-hidden">
          {/* GPU-promoted pure CSS transition for the progress scale */}
          <div
            className="absolute inset-0 bg-white/40"
            style={{
              transform: `scaleX(${(100 - progress) / 100})`,
              transformOrigin: 'right',
              transition: 'transform 0.1s ease-out',
              willChange: 'transform'
            }}
          />
        </div>
      </div>

      {/* Financial Banner — GPU Accelerated keyframe CSS animation */}
      {showFinancial && (
        <div
          className="absolute left-1/2 top-1/2 w-[90%] transform-gpu"
          style={{
            transform: 'translate3d(-50%, calc(-50% + 30px), 0)',
            animation: 'mobile-financial-fade-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
            willChange: 'transform, opacity',
            opacity: 0
          }}
        >
          {/* Combined banner: teal background + A-pin + FINANCIAL text (white) */}
          <svg xmlns="http://www.w3.org/2000/svg" className="block w-full h-auto" viewBox="0 0 345 45" fill="none">
            <path d="M224.804 14.1908H215.774C217.107 13.8898 218.483 12.9008 217.064 10.9658C216.72 10.4928 216.29 9.97677 215.946 9.46077C214.871 8.38577 214.269 6.79476 214.398 5.20376C214.785 1.72076 217.58 -0.042232 220.332 0.000768007H220.375C223.17 0.000768007 225.922 1.76376 226.309 5.20376C226.438 6.79476 225.836 8.38577 224.761 9.46077C224.374 9.97677 223.987 10.4928 223.643 10.9658C222.138 12.9008 223.471 13.9328 224.804 14.1908ZM344.516 14.1908H0V44.1188H344.473V14.1908H344.516Z" fill="#2EC4B6" />
            <g transform="translate(10.5, 17.5)">
              <path d="M11.567 0.301025V2.36502H2.537V8.94402H10.234V11.008H2.537V19.092H0V0.301025H11.567Z" fill="white"/>
              <path d="M41.452 19.092H38.915V0.301025H41.452V19.092Z" fill="white"/>
              <path d="M71.8961 0.386985C72.0251 0.429985 72.1111 0.558993 72.2831 0.730993L83.1621 14.878C83.1191 14.663 83.1191 14.448 83.1191 14.233C83.1191 14.018 83.1191 13.803 83.1191 13.631V0.343983H85.3551V19.135H84.0651C83.8501 19.135 83.6781 19.092 83.5491 19.049C83.4201 19.006 83.2911 18.877 83.1621 18.705L72.2831 4.55799C72.2831 4.77299 72.3261 4.98799 72.3261 5.20299C72.3261 5.41799 72.3261 5.58999 72.3261 5.76199V19.135H70.0901V0.343983H71.3801C71.6381 0.300983 71.7671 0.343985 71.8961 0.386985Z" fill="white"/>
              <path d="M128.957 19.092H126.979C126.764 19.092 126.549 19.049 126.42 18.92C126.291 18.791 126.162 18.662 126.119 18.49L124.356 13.975H115.928L114.165 18.49C114.122 18.662 113.993 18.791 113.864 18.92C113.735 19.049 113.52 19.092 113.305 19.092H111.327L118.852 0.301025H121.432L128.957 19.092ZM116.659 12.126H123.668L120.701 4.47202C120.529 3.99902 120.314 3.39701 120.142 2.70901C120.056 3.05301 119.97 3.39702 119.841 3.69802C119.755 3.99902 119.669 4.25702 119.583 4.47202L116.659 12.126Z" fill="white"/>
              <path d="M156.735 0.38699C156.864 0.42999 156.95 0.558998 157.122 0.730998L168.001 14.878C167.958 14.663 167.958 14.448 167.958 14.233C167.958 14.018 167.958 13.803 167.958 13.631V0.343988H170.194V19.135H168.904C168.689 19.135 168.517 19.092 168.388 19.049C168.259 19.006 168.13 18.877 168.001 18.705L157.079 4.47199C157.079 4.68699 157.122 4.90199 157.122 5.11699C157.122 5.33199 157.122 5.504 157.122 5.676V19.049H154.929V0.257996H156.219C156.434 0.300996 156.606 0.34399 156.735 0.38699Z" fill="white"/>
              <path d="M211.56 15.222C211.689 15.222 211.818 15.265 211.947 15.394L212.936 16.469C212.162 17.372 211.216 18.06 210.141 18.533C209.023 19.049 207.733 19.264 206.185 19.264C204.809 19.264 203.605 19.049 202.487 18.576C201.369 18.103 200.466 17.458 199.649 16.598C198.875 15.738 198.273 14.749 197.843 13.545C197.413 12.384 197.198 11.051 197.198 9.632C197.198 8.213 197.413 6.92299 197.886 5.71899C198.359 4.55799 199.004 3.52601 199.821 2.66601C200.638 1.80601 201.627 1.161 202.788 0.688003C203.949 0.215003 205.239 0 206.615 0C207.991 0 209.195 0.215 210.184 0.645C211.173 1.075 212.076 1.634 212.85 2.408L212.033 3.56899C211.99 3.65499 211.904 3.74099 211.818 3.78399C211.732 3.82699 211.646 3.87 211.474 3.87C211.345 3.87 211.259 3.82701 211.13 3.741C211.001 3.655 210.872 3.569 210.657 3.44C210.485 3.311 210.27 3.182 210.055 3.053C209.84 2.924 209.539 2.79501 209.195 2.66601C208.851 2.53701 208.507 2.451 208.077 2.365C207.647 2.279 207.174 2.23601 206.615 2.23601C205.626 2.23601 204.68 2.408 203.863 2.752C203.046 3.096 202.315 3.56899 201.713 4.21399C201.111 4.85899 200.638 5.63301 200.294 6.53601C199.95 7.439 199.778 8.471 199.778 9.632C199.778 10.793 199.95 11.868 200.294 12.771C200.638 13.674 201.068 14.448 201.67 15.093C202.272 15.738 202.96 16.211 203.734 16.555C204.508 16.899 205.368 17.071 206.314 17.071C206.873 17.071 207.389 17.028 207.819 16.985C208.249 16.899 208.679 16.813 209.066 16.684C209.453 16.555 209.797 16.383 210.141 16.168C210.485 15.953 210.786 15.695 211.13 15.394C211.302 15.265 211.431 15.222 211.56 15.222Z" fill="white"/>
              <path d="M242.907 19.092H240.37V0.301025H242.907V19.092Z" fill="white"/>
              <path d="M286.982 19.092H285.004C284.789 19.092 284.574 19.049 284.445 18.92C284.316 18.791 284.187 18.662 284.144 18.49L282.381 13.975H273.953L272.19 18.49C272.147 18.662 272.018 18.791 271.889 18.92C271.76 19.049 271.545 19.092 271.33 19.092H269.352L276.877 0.301025H279.457L286.982 19.092ZM274.684 12.126H281.693L278.726 4.47202C278.554 3.99902 278.339 3.39701 278.167 2.70901C278.081 3.05301 277.995 3.39702 277.866 3.69802C277.78 3.99902 277.694 4.25702 277.608 4.47202L274.684 12.126Z" fill="white"/>
              <path d="M315.491 16.942H323.618V19.092H312.954V0.301025H315.491V16.942Z" fill="white"/>
            </g>
          </svg>
        </div>
      )}

      <ScrollDownHint visible={showScrollHint} />
    </motion.div>
  );
}

function ScrollDownHint({ visible }: { visible: boolean }) {
  return (
    <div
      className="flex flex-col items-center gap-1 rounded-full bg-white/98 px-3 py-2 text-center text-[#2C4657] shadow-[0_16px_30px_rgba(0,0,0,0.14)] transform-gpu transition-all duration-600 ease-out"
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 40,
        margin: '0 auto',
        zIndex: 50,
        width: 'max-content',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 16px, 0)',
        willChange: 'transform, opacity'
      }}
    >
      <span className="font-['Lato:Regular',sans-serif] text-[14px] uppercase tracking-[0.24em]">Scroll down</span>
      <svg
        className="h-[18px] w-[18px]"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          animation: visible ? 'hint-bounce 1.4s ease-in-out infinite' : 'none',
          willChange: 'transform'
        }}
      >
        <path d="M25.8025 23.2713C23.2692 23.5359 18.1991 25.422 18.1848 30.8489M10.2454 23.2303C12.7772 23.5083 17.8373 25.4211 17.823 30.848M18.0144 26.8687L18.0715 5.1611" stroke="#2C4657" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1.29 1.29" />
      </svg>
    </div>
  );
}
