import { JSX } from "react";
import { Select } from "./Select";

export class DarkSelect implements Select {
    render(theme: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void): JSX.Element {

        return <select id="themeSelect" value={theme} className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500" onChange={onChange}>
            <option value="LIGHT">Light</option>
            <option value="DARK">Dark</option>
        </select>
    }

}