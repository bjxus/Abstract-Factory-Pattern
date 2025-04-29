
import { useMachine } from "@xstate/react";
import "./App.css"
import { wizardMachine } from "./lib/Helpers";
import { Format } from "./lib/types/StateMachineTypes";
import { UIManagerComponents } from "./lib/types/UIManagerOptions";
import React, { useState } from "react";
import CheckboxContainer from "./layouts/CheckboxContainer";
import ReportViewer from "./ReportViewer";
// import { ReportPDFBuilder } from "./domain/builder/ReportPDFBuilder";
import { ReportPDF } from "./domain/model/ReportPDF";
import { Theme } from "./domain/model/Theme";
import { UserInfo } from "./domain/model/UserInfo";
// import { PaymentDetails } from "./domain/model/PaymentDetails";
import { useGenerateTransactionId } from "./Hooks/useGenerateTransactionId";
import { ShareService } from "./services/ShareServices";
import Radio from "./components/Modal/Modal/RadioSelectSend";

// import PaymentCheckout from "./components/Modal/Modal/PaymentMethodSelector";



interface UIManagerProps {
    uiComponents: UIManagerComponents;
    isToast: boolean;
    payment: {
        type: string;
        amount: number;
    }
    theme: string
}


export const XStateMachine: React.FC<UIManagerProps> = ({ uiComponents, isToast, payment, theme }) => {



    const { numberTextField, button, toast, selectorPayment } = uiComponents;

    const [state, setState] = useMachine(wizardMachine);



    const [userInfo, setUserInfo] = useState<UserInfo>({
        nameUser: "",
        email: "",
        phone: "",
    });

    const [response, setResponse] = useState("");



    const [notification_type, setNotification_type] = useState("email");

    const handleSelectorPaymentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNotification_type(e.target.value);
      };



    const handleUserInfoChange = (field: keyof typeof userInfo, value: string) => {
        setUserInfo(prev => ({ ...prev, [field]: value }));
    };

    console.log("state.context:", state.context);


    const transactionId = useGenerateTransactionId();
    const { type, amount } = payment;
    console.log(type);


    const { includeLogo, title, includePaymentDetails, includeUserInfo, includeTimeStamp, footerMessage, format } = state.context;

    // ✅ Convertir string a enum
    const themeValue = theme === 'DARK' ? Theme.DARK : Theme.LIGHT;

    const handleProcessSendNotification = async () => {

        const paymentServiceInstance: ShareService = new ShareService();

        const payload = notification_type === "email" ? {
            to: userInfo.email,
            amount: amount,
            payment_method: type.toUpperCase(),
            notification_type: notification_type.toUpperCase()
        } : 
        {
            amount: amount,
            notification_type: notification_type.toUpperCase(),
            payment_method: type.toUpperCase(),
            phone_number: userInfo.phone,
        }

        console.table(payload);


        
        const sendMessage = await paymentServiceInstance.sendMessage(notification_type, payload);

        
        
        
        setResponse(sendMessage);



    }

    const report = ReportPDF.Builder
        .withTitle(title)
        .withUserInfo(includeUserInfo, { ...userInfo })
        .withPaymentDetails(includePaymentDetails!, {
            transactionId,
            type,
            amount: amount,

        })
        .withTimestamp(includeTimeStamp ?? false)
        .withFooterMessage(footerMessage)
        .withTheme(themeValue)
        .withFormat(format)
        .withLogo(includeLogo ?? false)

        .build();

    return (
        <section>
            <h2>
                💳 Procesador de Pagos 💸
            </h2>
            {state.matches('step1') && (
                <>
                    <div className="">
                        {selectorPayment}
                        {numberTextField}

                        <div className="border-2 border-gray-600 rounded p-2">
                            <label className="block mb-1 font-medium">🧑 Información del Usuario:</label>

                            <input
                                type="text"
                                placeholder="Nombre del usuario"
                                className="w-full p-1 border rounded"
                                value={userInfo.nameUser}
                                onChange={(e) => handleUserInfoChange('nameUser', e.target.value)}
                            />

                            <input
                                type="email"
                                placeholder="E-mail"
                                className="w-full p-1 border rounded"
                                value={userInfo.email}
                                onChange={(e) => handleUserInfoChange('email', e.target.value)}
                            />

                            <input
                                type="tel"
                                placeholder="Teléfono"
                                className="w-full p-1 border rounded"
                                value={userInfo.phone}
                                onChange={(e) => handleUserInfoChange('phone', e.target.value)}
                            />

                        </div>

                        {!isToast && (
                            <>
                                {button}
                            </>
                        )}

                        {isToast && (
                            <div>
                                {toast}

                                <button onClick={() => setState({ type: "NEXT" })}>Next</button>
                            </div>
                        )}

                    </div>

                </>
            )}
            {state.matches('step2') && (
                <>

                    {/* title */}

                    <div>
                        <label htmlFor="">Titulo</label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setState({ type: 'SET_TITLE', title: e.target.value })}
                            placeholder="Ej: Reporte de pago"

                        />
                    </div>


                    {/* INCLUDE LOGO  */}


                    <div className="row">

                        <CheckboxContainer label="¿Quiere incluir la información del usuario?"
                            includeUserInfo={includeUserInfo}
                        >
                            <input
                                type="checkbox"
                                checked={includeUserInfo}
                                onChange={(e) => setState({ type: 'SET_INCLUDE_USER_INFO', includeUserInfo: e.target.checked })}
                                placeholder='Include User Info'
                                className="size-5"
                            />

                        </CheckboxContainer>

                        <CheckboxContainer
                            label="¿Quiere incluir un Logo?"
                            includeLogo={includeLogo}


                        >
                            <input
                                type="checkbox"
                                checked={includeLogo}
                                onChange={(e) => setState({ type: 'SET_INCLUDE_LOGO', includeLogo: e.target.checked })}
                                className="size-5"
                            />
                        </CheckboxContainer>


                    </div>


                    {/* Include pyament details */}

                    <div className="row">

                        <CheckboxContainer label="¿Quiere incluir los detalles de Pago?">
                            <input
                                type="checkbox"
                                checked={includePaymentDetails}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) =>
                                    setState({
                                        type: 'SET_INCLUDE_PAYMENT_DETAILS',
                                        includePaymentDetails: e.target.checked,
                                    })
                                }
                                className="size-5"
                            />
                        </CheckboxContainer>

                        <CheckboxContainer label="¿Desea incluir los detalle de la fecha?">
                            <input
                                type="checkbox"
                                checked={includeTimeStamp}
                                onChange={(e) => setState({ type: 'SET_INCLUDE_TIMESTAMP', includeTimeStamp: e.target.checked })}
                                placeholder="Include Time Stamp"
                                className="size-5"
                            />
                        </CheckboxContainer>
                    </div>


                    {/* include User info */}



                    {/* Footer  Message */}
                    <div>

                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-green-950">Mensaje del Pie de Página</label>
                        <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-green-950 rounded-lg border" placeholder="Escriba su mensaje personalizado aquí..."
                            value={footerMessage}
                            onChange={(e) => setState({ type: 'SET_FOOTER_MESSAGE', footerMessage: e.target.value })}
                        ></textarea>
                    </div>
                    {/* Format */}

                    <div>
                        <label htmlFor="" className="block mb-2 text-sm font-medium text-green-950">Formato del documento</label>

                        <select
                            value={format}
                            onChange={(e) =>
                                setState({ type: 'SET_FORMAT', format: e.target.value as Format })
                            }
                        >
                            <option value={Format.A4}>A4</option>
                            <option value={Format.LETTER}>Carta</option>
                        </select>
                    </div>

                    <div>
                        <button onClick={() => setState({ type: "PREVIOUS" })}>Previous</button>
                        <button onClick={() => setState({ type: "NEXT" })}>Next</button>

                    </div>

                </>
            )
            }
            {
                state.matches('confirmation') && (
                    <>
                        <ReportViewer {...report} />

                        <button onClick={() => setState({ type: "PREVIOUS" })}>Previous</button>

                        


                        <Radio 
                        selected={notification_type}
                        onChange={(value: string) => {
            
                            const syntheticEvent = {
                              target: { value: value },
                            } as React.ChangeEvent<HTMLSelectElement>;
              
                            handleSelectorPaymentChange(syntheticEvent); 
                          }}
                        />

                        <button onClick={handleProcessSendNotification}>📩 Compartir</button>

                        {/* <p> {response.data} </p> */}
                    </>




                )
            }
        </section >
    )

}

