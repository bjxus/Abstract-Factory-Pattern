import { JSX } from "react";
import { Select } from "./Select";
import  { PaymentMethodSelector } from "../../../components/Modal/Modal/PaymentMethodSelector";

export class LightSelect implements Select {
  render(theme: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, withCheckbox: boolean, selected?: string): JSX.Element {
        
      return (
        <>
          {withCheckbox && (
  <PaymentMethodSelector
    selected={selected ?? ""}
    onChange={(id: string) => {
      // Creamos un "evento" artificial para que coincida con la firma original
      const syntheticEvent = {
        target: { value: id },
      } as React.ChangeEvent<HTMLSelectElement>;

      onChange(syntheticEvent); // Llamamos el original
    }}
  />
)}

          {!withCheckbox && (
            <select
              id="themeSelect"
              value={theme}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={onChange}
            >
              <option value="LIGHT">Light</option>
              <option value="DARK">Dark</option>
            </select>
          )}
        </>
      );
      
        
    }

}