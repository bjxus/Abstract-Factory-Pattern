import { JSX } from "react";

export interface TextField {
    render(type: string, value: string | number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder?: string): JSX.Element;
}