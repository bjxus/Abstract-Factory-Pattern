import React, { ReactNode } from 'react'

interface ReportViewerProps {
    children: ReactNode;
}

const ReportViewerExpanded: React.FC<ReportViewerProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col">

            
                {children}
            

        </div>
    </div>
  )
}

export default ReportViewerExpanded;
