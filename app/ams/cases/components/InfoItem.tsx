'use client'

import React, { useState } from 'react';
import { PDFViewerModal } from './PDFViewerModal';
import { Button } from "@/components/ui/button";

interface InfoItemProps {
  label: string;
  value: string | null | undefined;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenPDF = () => {
    setIsModalOpen(true);
  };

  const isPDFLink = label === "Valuation Report" && value;

  return (
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      {isPDFLink ? (
        <>
          <Button onClick={handleOpenPDF} variant="outline" size="sm">
            View/Download Report
          </Button>
          <PDFViewerModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            pdfUrl={value}
          />
        </>
      ) : (
        <p className="font-medium">{value || 'N/A'}</p>
      )}
    </div>
  );
};
export default InfoItem;