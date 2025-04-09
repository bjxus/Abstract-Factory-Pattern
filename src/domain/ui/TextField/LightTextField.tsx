import { JSX } from "react";
import { TextField } from "./TextField";

export class LightTextField implements TextField {
    render(type: string, value: string | number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder?: string): JSX.Element {

        return <input type={type} name={type === "number" ? "amount" : "type"}  value={value} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' onChange={onChange} placeholder={placeholder}  />;
    }


}