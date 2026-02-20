import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function PdfViewer({ pdf, attachType, fileName }) {
  const [numPages, setNumPages] = useState(null);
  const [containerWidth, setContainerWidth] = useState(null);

  function onDocumentLoaded({ numPages }) {
    setNumPages(numPages);
  }

  const isPdf =
    (!attachType && !fileName) ||
    attachType === 'PDF' ||
    (fileName && fileName.toLowerCase().endsWith('.pdf')) ||
    (typeof pdf === 'string' && pdf.toLowerCase().endsWith('.pdf'));

  if (!isPdf) {
    return (
      <div className='flex w-full flex-col items-center px-2'>
        <img
          src={pdf}
          alt={fileName || 'attachment'}
          className='w-full max-w-3xl rounded object-contain'
        />
      </div>
    );
  }

  return (
    <div
      className='flex w-full flex-col items-center overflow-auto px-2'
      ref={(el) => {
        if (el && !containerWidth) {
          setContainerWidth(el.clientWidth);
        }
      }}
    >
      <Document
        file={pdf}
        onLoadSuccess={onDocumentLoaded}
        onLoadError={(error) => console.log('PDF Load Error:', error)}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            className='mb-4 shadow-md'
            width={containerWidth ? Math.min(containerWidth, 900) : undefined}
          />
        ))}
      </Document>
    </div>
  );
}

export default PdfViewer;
