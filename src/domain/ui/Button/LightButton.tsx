import { JSX } from "react";
import { Button } from "./Button";

export class LightButton implements Button {
    render(onClick: () => void, label: string): JSX.Element {
       return <button className='bg-[#FBFFDC] 
    text-[#004028] 
    cursor-pointer 
    border 
    border-[#004028] 
    rounded-lg 
    font-poppins 
    font-normal 
    px-4 
    py-2 
    transition-all
    hover:border-l-2
    hover:border-b-2' onClick={onClick}>{label}</button>
    }
    





}