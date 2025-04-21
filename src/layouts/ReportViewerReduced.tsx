import React, { ReactNode } from 'react'

interface ReportViewerReducedProps {
  modalOpen: () => void;
  children: ReactNode;
}

const ReportViewerReduced: React.FC<ReportViewerReducedProps> = ({ modalOpen, children }) => {
  return (
    <div className="h-64 w-full border rounded-lg overflow-hidden">

      {children}

      <button
        onClick={modalOpen}
        className="absolute bottom-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-sm"
      >
        Ampliar
      </button>

    </div>
  )
}

export default ReportViewerReduced
