'use client'

import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
}

export const PDFViewerModal: React.FC<PDFViewerModalProps> = ({ isOpen, onClose, pdfUrl }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState<string | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setError(null);
  }

  function onDocumentLoadError(error: Error) {
    console.error('Error loading PDF:', error);
    setError('Failed to load PDF. You can try downloading it instead.');
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Valuation Report</DialogTitle>
        </DialogHeader>
        {error ? (
          <div className="text-red-500 mb-4">{error}</div>
        ) : (
          <div className="overflow-y-auto max-h-[80vh]">
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document>
          </div>
        )}
        <div className="flex justify-between mt-4">
          {!error && (
            <>
              <Button onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}>Previous</Button>
              <p>
                Page {pageNumber} of {numPages}
              </p>
              <Button onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages || 1))}>Next</Button>
            </>
          )}
          <Button onClick={() => window.open(pdfUrl, '_blank')}>Download PDF</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};