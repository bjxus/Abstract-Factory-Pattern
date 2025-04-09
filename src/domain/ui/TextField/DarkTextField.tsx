import { JSX } from "react";
import { TextField } from "./TextField";


export class DarkTextField implements TextField {
    render(type: string, value: string | number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder?: string): JSX.Element {
        return <input type={type} name={type === "number" ? "amount" : "type"} value={value} className='text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white' onChange={onChange} placeholder={placeholder}></input>
    }

}