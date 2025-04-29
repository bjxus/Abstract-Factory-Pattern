import { Theme } from "../domain/model/Theme";
import { UIManagerOptions } from "../lib/types/UIManagerOptions";
import { UIManagerService } from "../services/UIManagerService";

export class UIManagerController {

    private uiManagerService!: UIManagerService;

    constructor(uiManagerService: UIManagerService) {
        this.uiManagerService = uiManagerService;
    }


    getUI(options: UIManagerOptions) {
        // Desestructuramos y asignamos valores por defecto a los parámetros opcionales
        const {
          themeParam,
          button: buttonOptions,
          textFieldText: textFieldOptions,
          numberTextField: numberTextFieldOptions,
          select: selectOptions,
          selectorPayment: selectPaymentOptions,
          toast: toastOptions,

        } = options;

      
        // Determinamos el tema en base a la cadena recibida
        const selectedTheme: Theme =
          themeParam.toUpperCase() === "DARK" ? Theme.DARK : Theme.LIGHT;
        // Actualizamos el servicio de UI con el tema seleccionado
        this.uiManagerService.setTheme(selectedTheme);
      
        // Retornamos un objeto con los componentes generados
        return {
          // Clase CSS global para el tema
          themeParam: this.uiManagerService.getThemeClass(selectedTheme),
          // Botón generado con el onClick y label correspondientes
          button: this.uiManagerService.getButton(buttonOptions.onClick, buttonOptions.label),
          // Input de texto: se envían el tipo, valor, onChange y placeholder
          textFieldText: this.uiManagerService.getTextField(
            textFieldOptions.type,
            textFieldOptions.value,
            textFieldOptions.onChange,
            textFieldOptions.placeholder
          ),
          // Input numérico: igual que el de texto, pero para números
          numberTextField: this.uiManagerService.getTextField(
            numberTextFieldOptions.type,
            numberTextFieldOptions.value,
            numberTextFieldOptions.onChange,
            numberTextFieldOptions.placeholder
          ),

          select: this.uiManagerService.getSelect(
            themeParam,
            selectOptions.onChange,
            selectOptions.withCheckbox,
          ),

          paymentSelector: this.uiManagerService.getPaymentSelector(
            themeParam,
            selectPaymentOptions.selected,
            selectPaymentOptions.onChange,
          ),
          

          toast: this.uiManagerService.getToast(
            toastOptions.text,
            toastOptions.onClick
          )
        };

    
}
}