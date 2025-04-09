import { JSX } from "react";

export interface Button {
    render(onClick: () => void, label: string): JSX.Element,
}