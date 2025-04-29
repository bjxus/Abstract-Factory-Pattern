import React, { useEffect, useMemo, useState } from "react";
import ReportDocument from "./ReportDocument";

import ReportViewerReduced from "./layouts/ReportViewerReduced";

import { Format } from "./lib/types/StateMachineTypes";
import { pdf } from "@react-pdf/renderer";

interface ReportViewerProps {
  includeLogo?: boolean;
  title: string;
  includePaymentDetails?: boolean;
  includeUserInfo?: boolean;
  theme: string;
  includeTimestamp?: boolean;
  footerMessage?: string;
  format: Format;

}

const ReportViewer: React.FC<ReportViewerProps> = (reportPDF: ReportViewerProps) => {

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const reportDoc = useMemo(() => <ReportDocument {...reportPDF} />, [reportPDF]); 

  // Genera el PDF una sola vez
  useEffect(() => {

    
    const generatePdf = async () => {
      const blob = await pdf(reportDoc).toBlob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);

      return () => URL.revokeObjectURL(url); // limpieza
    };

    generatePdf();
  }, [reportDoc]); 

  const handleExpand = () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank'); // abre en nueva pestaña
    }
  };
  

  if (!pdfUrl) return <p>Cargando PDF...</p>;

  return (
    <div className="relative h-64 w-full">
      <ReportViewerReduced modalOpen={handleExpand}>
        <iframe src={pdfUrl} className="size-full" />
      </ReportViewerReduced>

    </div>
  );
}

export default ReportViewer
