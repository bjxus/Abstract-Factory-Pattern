// App.tsx
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { UIManagerController } from "./controller/UIManagerController";
import { UIManagerService } from "./services/UIManagerService";
import { ThemeService } from "./services/ThemeService";
import { Payment } from "./domain/model/Payment";
import { PaymentService } from "./services/PaymentService";
import { XStateMachine } from "./XStateMachineWizard";
import { UIManagerComponents } from "./lib/types/UIManagerOptions";


const App: React.FC = () => {
  // Estado para el tema
  const [theme, setTheme] = useState("LIGHT");

  const [selector, setSelector] = useState("paypal");


  

  const [isToast, setIsToast] = useState(false)

  const [response, setResponse] = useState<string>("");

  const [payment, setPayment] = useState({
    type: selector,
    amount: 0,
  });
  

  const [uiComponents, setUIComponents] = useState<UIManagerComponents>();


  // Instanciar servicios y controladores
  const themeService = useMemo(() => new ThemeService(), []);
  const uiManagerService = useMemo(() => new UIManagerService(themeService), [themeService]);
  const uiManagerController = useMemo(() => new UIManagerController(uiManagerService), [uiManagerService]);

  // Funcion callback para cambiar el estado del tema 
  const handleThemeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
  }, []);

  const handleSelectorPaymentChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelector(e.target.value);
  }, [])

  const handleClose = () => {
    setIsToast(false)
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    console.log(`Name: ${name} - Value: ${value}`);
    setPayment((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleProcessPayment = async () => {
    const paymentServiceInstance: PaymentService = new PaymentService();
    const newPayment = new Payment(selector, Number(payment.amount));
    const result = await paymentServiceInstance.processPayment(newPayment);
    
    
    setResponse(`Pago realizado exitosamente por: $${result.amount}`);

    setPayment({
      ...payment,
      amount: result.amount,
    })

    setIsToast(true);
    
  };

  // Actualizamos la UI cada vez que cambia el tema o el estado de payment
  useEffect(() => {

    if (theme === "DARK") {
     
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
      
    }
    // Construimos las opciones agrupadas para cada componente:
    const uiOptions = {
      themeParam: theme,
      button: {
        onClick: handleProcessPayment,
        label: "Pagar",
      },
      textFieldText: {
        value: payment.type,
        onChange: handleChange,
        placeholder: "Ej: PAYPAL",
        type: "text",
      },
      numberTextField: {
        value: Number(payment.amount),
        onChange: handleChange,
        placeholder: "$10.000",
        type: "number",
      },

      select: {
        themeParam: theme,
        onChange: handleThemeChange,
        withCheckbox: false,

      },
      selectorPayment: {
        
        selected: selector,
        onChange: handleSelectorPaymentChange,
      },

      toast: {
        text: response,
        onClick: handleClose,
      }
    };

    // Llamamos a getUI pasando el objeto completo
    const ui = uiManagerController.getUI(uiOptions);
    setUIComponents({
      themeClass: ui.themeParam,
      button: ui.button,
      textFieldText: ui.textFieldText,
      numberTextField: ui.numberTextField,
      select: ui.select,
      selectorPayment: ui.paymentSelector,
      toast: ui.toast,
    });
  }, [theme, uiManagerController, payment, selector]);

  

  return (
   
    <div className={uiComponents?.themeClass}>
      
      <div className="row mb-4">

        <div className="col-auto">
          <div className="theme-switch mb-2">
            <label htmlFor="themeSelect" className="form-label">
              Tema:
            </label>
            {uiComponents?.select}
          </div>
        </div>
      </div>



      {uiComponents && <XStateMachine uiComponents={uiComponents} isToast={isToast} payment={payment} theme={theme} />}
    </div>

  );
};

export default App;


