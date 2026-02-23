import { useEffect } from 'react';
import { X } from 'lucide-react';

interface PDFViewerProps {
  pdfUrl: string;
  title: string;
  onClose: () => void;
}

export default function PDFViewer({ pdfUrl, title, onClose }: PDFViewerProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-[#2c4657]/95 backdrop-blur-sm pt-[60px] md:pt-0"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="relative w-[95vw] h-[calc(80vh-60px)] md:w-[90vw] md:h-[90vh] bg-white rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 bg-[#2c4657] text-white px-4 md:px-6 py-4 flex items-center justify-between z-20 cursor-default shadow-md pointer-events-auto">
          <h2 className="font-['Lato:Regular',sans-serif] text-lg md:text-xl cursor-default truncate pr-4">{title}</h2>
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onClose();
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer shrink-0 touch-manipulation relative z-[9999] pointer-events-auto"
            aria-label="Close PDF viewer"
          >
            <X className="size-6" />
          </button>
        </div>

        {/* PDF Viewer - Desktop Only */}
        <div className="hidden md:block w-full h-full pt-[64px] relative z-10">
          <iframe
            src={pdfUrl}
            className="w-full h-full border-none"
            title={title}
          />
        </div>

        {/* Mobile Fallback - Shown only on small screens */}
        <div className="md:hidden w-full h-full pt-[64px] flex flex-col items-center justify-center bg-gray-50 p-6 relative z-10">
          <div className="w-16 h-16 bg-[#2ec4b6]/20 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#2ec4b6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-[#2c4657] font-['Lato:Regular',sans-serif] text-center text-lg mb-8 max-w-[280px]">
            To provide the best experience on mobile devices, please open the document directly.
          </p>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2ec4b6] text-white px-8 py-4 rounded-full font-['Lato:Bold',sans-serif] text-lg hover:opacity-90 transition-opacity active:scale-95 shadow-lg w-full max-w-[280px] text-center"
          >
            Open Document
          </a>
        </div>
      </div>
    </div>
  );
}