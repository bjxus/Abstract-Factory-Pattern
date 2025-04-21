import { JSX } from "react";
import { TextField } from "./TextField";


export class DarkTextField implements TextField {
    render(type: string, value: string | number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder?: string): JSX.Element {
        return <input type={type} name={type === "number" ? "amount" : "type"} value={value} className='text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 bg-green-200 border-green-600 placeholder-gray-500 text-green-950' onChange={onChange} placeholder={placeholder}></input>
    }

}