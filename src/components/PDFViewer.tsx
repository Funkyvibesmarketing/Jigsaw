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
        className="relative w-[95vw] h-[calc(95vh-60px)] md:w-[90vw] md:h-[90vh] bg-white rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 bg-[#2c4657] text-white px-4 md:px-6 py-4 flex items-center justify-between z-10 cursor-default">
          <h2 className="font-['Lato:Regular',sans-serif] text-lg md:text-xl cursor-default">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Close PDF viewer"
          >
            <X className="size-6" />
          </button>
        </div>

        {/* PDF Viewer */}
        <div className="w-full h-full pt-[64px]">
          <iframe
            src={pdfUrl}
            className="w-full h-full border-none"
            title={title}
          />
        </div>

        {/* Fallback message for browsers that don't support iframe PDF viewing */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2ec4b6] text-white px-6 py-3 rounded-lg font-['Lato:Regular',sans-serif] hover:opacity-90 transition-opacity cursor-pointer md:cursor-none"
          >
            Open PDF in New Tab
          </a>
        </div>
      </div>
    </div>
  );
}