import { JSX } from "react";
import { Toast } from "./Toast";

export class DarkToast implements Toast {
    render(text: string, onClick: () => void): JSX.Element {
        
        return <div id="toast-success" className="flex items-center w-full max-w-xs p-4 mb-4 rounded-lg shadow-sm text-gray-400 bg-green-800" role="alert">
        <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg bg-green-800 text-green-200">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>
            <span className="sr-only">Check icon</span>
        </div>
        <div className="ms-3 text-green-200 text-sm font-normal">{text}</div>
        <button type="button" className="ms-auto -mx-1.5 -my-1.5  rounded-lg focus:ring-2 inline-flex items-center justify-center h-8 w-8 text-gray-500 hover:text-white bg-gray-800 hover:bg-gray-700" onClick={onClick} data-dismiss-target="#toast-success" aria-label="Close">
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </button>
    </div>

    }

}