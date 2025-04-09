import { JSX } from "react";

export interface Select {
    render(theme: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void): JSX.Element
}