export interface TextFieldOptions {
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;        // Por defecto "text" o "number" según convenga
    placeholder?: string;
}