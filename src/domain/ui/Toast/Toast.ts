import { JSX } from "react";

export interface Toast {
    render(
        text: string,
        onClick: () => void

    ): JSX.Element,
    
    
}