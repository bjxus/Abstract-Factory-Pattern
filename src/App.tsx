// App.tsx
import React, { useState, useEffect, useMemo, useCallback, JSX } from "react";
import { UIManagerController } from "./controller/UIManagerController";
import { UIManagerService } from "./services/UIManagerService";
import { ThemeService } from "./services/ThemeService";
import { Payment } from "./domain/model/Payment";
import { PaymentService } from "./services/PaymentService";

const App: React.FC = () => {
  // Estado para el tema
  const [theme, setTheme] = useState("LIGHT");

  const [payment, setPayment] = useState({
    type: "",
    amount: "",
  });

  const [isToast, setIsToast] = useState(false)  

  const [response, setResponse] = useState("");

  const [uiComponents, setUIComponents] = useState<{
    themeClass: string;
    textFieldText: JSX.Element;
    numberTextField: JSX.Element;
    button: JSX.Element;
    select?: JSX.Element;
    toast: JSX.Element;
  }>();

  // Instanciar servicios y controladores
  const themeService = useMemo(() => new ThemeService(), []);
  const uiManagerService = useMemo(() => new UIManagerService(themeService), [themeService]);
  const uiManagerController = useMemo(() => new UIManagerController(uiManagerService), [uiManagerService]);

  // Funcion callback para cambiar el estado del tema 
  const handleThemeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
  }, []);

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
    const newPayment = new Payment(payment.type, Number(payment.amount));
    const result = await paymentServiceInstance.processPayment(newPayment);
    setResponse(result);
    setIsToast(true)
    setPayment({
      type: "",
      amount: ""
    })
    console.log("Pago procesado correctamente:", result);
  };

  // Actualizamos la UI cada vez que cambia el tema o el estado de payment
  useEffect(() => {

    if (theme === "DARK") {
      document.body.classList.remove("bg-light");
      document.body.classList.add("bg-dark");
    } else {
      document.body.classList.remove("bg-dark");
      document.body.classList.add("bg-light");
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
        
      },

      toast: {
        text: response,
        onClick: handleClose,
      }
    };

    // Llamamos a getUI pasando el objeto completo
    const ui = uiManagerController.getUI(uiOptions);
    setUIComponents(ui);
  }, [theme, uiManagerController, payment]);

  return (
    <div className={`container content-container ${uiComponents?.themeClass}`}>
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

      <div className="row">
        <div className="col">
        <h1 className={`bg-${theme} ${theme === "DARK" ? "text-white" : "text-dark"}`}>Procesador de pagos</h1>
          <div className="search-container d-flex gap-2 mb-2">
            <div className="flex-grow-1">{uiComponents?.textFieldText}</div>
            <div>{uiComponents?.numberTextField}</div>
            <div>{uiComponents?.button}</div>
            
          </div>
        </div>
      </div>
      {isToast && (
        <div>{uiComponents?.toast}</div>
      )}
      
    </div>
  );
};

export default App;


