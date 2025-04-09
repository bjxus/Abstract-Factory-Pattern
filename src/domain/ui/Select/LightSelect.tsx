import { JSX } from "react";
import { Select } from "./Select";

export class LightSelect implements Select {
    render(theme: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void): JSX.Element {
        
        return <select id="themeSelect" value={theme} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={onChange}>
          <option value="LIGHT">Light</option>
          <option value="DARK">Dark</option>
        
        </select>
    }

}