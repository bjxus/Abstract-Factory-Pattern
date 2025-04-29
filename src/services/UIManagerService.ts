import { JSX } from "react";
import { UIFactory } from "../domain/factory/UIFactory";
import { Theme } from "../domain/model/Theme";
import { Button } from "../domain/ui/Button/Button";
import { TextField } from "../domain/ui/TextField/TextField";
import { ThemeService } from "./ThemeService";
import { Select } from "../domain/ui/Select/Select";
import { Toast } from "../domain/ui/Toast/Toast";

export class UIManagerService {
    private themeService!: ThemeService
    private currentFactory!: UIFactory

    constructor(themeService: ThemeService) {
        this.themeService = themeService
        this.currentFactory = themeService.getFactory(Theme.LIGHT)
    }
   
    
    setTheme(theme: Theme) {
        this.currentFactory = this.themeService.getFactory(theme)
    }

    getButton(onClick: () => void, label: string): JSX.Element {
        if (!this.currentFactory) {
            throw new Error("UIFactory no ha sido inicializada correctamente.");
        }
    
        const button: Button = this.currentFactory.createButton();
    
        if (!button) {
            throw new Error("No se pudo crear el botón: factory devolvió undefined.");
        }
    
        return button.render(onClick, label);
    }

    getTextField(type: string, value: string | number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder?: string): JSX.Element {
        const textField: TextField = this.currentFactory.createTextField();
        return textField.render(type, value, onChange, placeholder);
    }

    getSelect(theme: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, withCheckbox: boolean = false): JSX.Element {

        const select: Select = this.currentFactory.createSelect();
        return select.render(theme, onChange, withCheckbox)
    }

    getPaymentSelector(theme: string, selected: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void): JSX.Element {
        
        const select: Select = this.currentFactory.createSelect();
        return select.render(theme, onChange, true, selected)
            
      }
      
      
      

    getToast(text: string, onClick: () => void): JSX.Element {

        const toast: Toast = this.currentFactory.createToast();
        return toast.render(text, onClick)

    }

    getThemeClass(theme: Theme) {
        return theme == Theme.DARK ? "bg-dark" : "bg-light"
    }








}