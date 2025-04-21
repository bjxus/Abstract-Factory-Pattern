import React, { useEffect, useMemo, useState } from "react";
import ReportDocument from "./ReportDocument";

import ReportViewerReduced from "./layouts/ReportViewerReduced";
import Modal from "./components/Modal/Modal/Modal";
import { Format } from "./lib/types/StateMachineTypes";
import { pdf, PDFViewer } from "@react-pdf/renderer";
import ReportViewerExpanded from "./layouts/ReportViewerExpanded";
import ModalHeader from "./components/Modal/Modal/ModalHeader";

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

  // Genera el PDF una sola vez
  useEffect(() => {
    const generatePdf = async () => {
      const blob = await pdf(<ReportDocument {...reportPDF} />).toBlob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);

      return () => URL.revokeObjectURL(url); // limpieza
    };

    generatePdf();
  }, [reportPDF]); 

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
