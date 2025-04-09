import { JSX } from "react";
import { Button } from "./Button";


export class DarkButton implements Button {
    render(onClick: () => void, label: string): JSX.Element {
        return <button className= 'focus:outline-none text-white  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-green-600 hover:bg-green-700 focus:ring-green-800' onClick={onClick}>{label}</button>;
    }
    

}