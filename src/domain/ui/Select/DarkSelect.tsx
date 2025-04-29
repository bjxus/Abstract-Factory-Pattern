import { JSX } from "react";
import { Select } from "./Select";
import { PaymentMethodSelector } from "../../../components/Modal/Modal/PaymentMethodSelector";

export class DarkSelect implements Select {
  render(theme: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, withCheckbox: boolean, selected?: string): JSX.Element {

    return (
      <>

        {withCheckbox && (
          <PaymentMethodSelector
            selected={selected ?? ""}
            onChange={(id: string) => {
            
              const syntheticEvent = {
                target: { value: id },
              } as React.ChangeEvent<HTMLSelectElement>;

              onChange(syntheticEvent); 
            }}
          />
        )}

        {!withCheckbox && (

          <select id="themeSelect" value={theme} className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500" onChange={onChange}>
            <option value="LIGHT">Light</option>
            <option value="DARK">Dark</option>
          </select>
        )}
      </>

    )
  }

}