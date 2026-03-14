interface WhatsAppButtonProps {
  heroScrollProgress?: number;
  aboutUsScrollProgress?: number;
  reviewsScrollProgress?: number;
  teamScrollProgress?: number;
  processScrollProgress?: number;
  blogsScrollProgress?: number;
  contactUsFormScrollProgress?: number;
  contactUsScrollProgress?: number;
  splashHasBeenViewed?: boolean;
}

export function WhatsAppButton({
  heroScrollProgress = 0,
  aboutUsScrollProgress = 0,
  reviewsScrollProgress = 0,
  teamScrollProgress = 0,
  processScrollProgress = 0,
  blogsScrollProgress = 0,
  contactUsFormScrollProgress = 0,
  contactUsScrollProgress = 0,
  splashHasBeenViewed = false
}: WhatsAppButtonProps) {
  const phoneNumber = '01616675990';
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  // Theme logic similar to AboutUsNavigation
  const isBlogsActive = contactUsScrollProgress > 0 ? false : blogsScrollProgress >= 0.2;
  const isProcessActive = contactUsScrollProgress > 0 ? false : (processScrollProgress >= 0.15 && !isBlogsActive);
  const isTeamActive = contactUsScrollProgress > 0 ? false : (reviewsScrollProgress >= 0.80 && !isProcessActive && !isBlogsActive);
  const isInContactUsForm = contactUsFormScrollProgress > 0;
  const isHomeActive = aboutUsScrollProgress < 0.01 && contactUsScrollProgress === 0;
  const isInServicesStep1 = aboutUsScrollProgress >= 0.68 && aboutUsScrollProgress < 0.82;

  // Logic for dark background sections
  const isDarkBackground = (isHomeActive || isInServicesStep1 || isTeamActive || isProcessActive || isInContactUsForm);

  // Show only after splash and when some scrolling has happened OR if we're past hero
  const shouldShow = splashHasBeenViewed && (heroScrollProgress > 0.01 || aboutUsScrollProgress > 0);

  if (!shouldShow) return null;

  return (
    <div className="fixed right-[12px] top-[calc(50%+89px)] -translate-y-1/2 z-[1000] hidden md:block overflow-visible">
      <a
        id="whatsapp-floating-button"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div
          className="flex flex-col items-center gap-6 pt-[10px] pb-[12px] px-[12px] rounded-full shadow-2xl transition-colors duration-300"
          style={{
            backgroundColor: isDarkBackground ? '#ffffff' : '#26A69A',
            borderColor: isDarkBackground ? 'rgba(44, 70, 87, 0.1)' : 'rgba(255, 255, 255, 0.1)',
            borderWidth: '1px',
            borderStyle: 'solid',
            backdropFilter: 'blur(12px)',
            width: '50px'
          }}
        >
          {/* Text Center - Reading bottom to top */}
          <div className="flex items-center justify-center rotate-180">
            <span
              className="font-lato-bold text-[16px] tracking-[0.05em] whitespace-nowrap"
              style={{
                writingMode: 'vertical-rl',
                color: isDarkBackground ? '#26A69A' : 'white'
              }}
            >
              WhatsApp Us
            </span>
          </div>

          {/* Icon Container at Bottom */}
          <div
            className="size-[28px] flex items-center justify-center shrink-0 transition-transform duration-300"
            style={{ color: isDarkBackground ? '#26A69A' : 'white' }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className="size-full"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </div>
        </div>
      </a>
    </div>
  );
}
