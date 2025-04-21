
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



interface UIManagerProps {
    uiComponents: UIManagerComponents;
    isToast: boolean;
    payment: {
        type: string;
        amount: string;
    }
    theme: string
}


export const XStateMachine: React.FC<UIManagerProps> = ({ uiComponents, isToast, payment, theme }) => {

    const { textFieldText, numberTextField, button, toast } = uiComponents;

    const [state, setState] = useMachine(wizardMachine);

    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;


        if (file) {
            const src = URL.createObjectURL(file);
            setImageSrc(src);
        }
    }

    const [userInfo, setUserInfo] = useState<UserInfo>({
        nameUser: "",
        email: "",
        phone: "",
    });




    const handleUserInfoChange = (field: keyof typeof userInfo, value: string) => {
        setUserInfo(prev => ({ ...prev, [field]: value }));
    };

    console.log("state.context:", state.context);


    const transactionId = useGenerateTransactionId();
    const { type, amount } = payment;

    const { includeLogo, title, includePaymentDetails, includeUserInfo, includeTimeStamp, footerMessage, format } = state.context;

    // ✅ Convertir string a enum
  const themeValue = theme === 'DARK' ? Theme.DARK : Theme.LIGHT;

  console.log(`Footer message -->  ${footerMessage}`);
  
    
    const report = ReportPDF.Builder
    .withTitle(title)
    .withUserInfo(includeUserInfo, {...userInfo})
    .withPaymentDetails(includePaymentDetails!, {
        transactionId,
        type,
        amount: parseFloat(amount),

    })
    .withTimestamp(includeTimeStamp ?? false)
    .withFooterMessage(footerMessage)
    .withTheme(themeValue)
    .withFormat(format)
    .withLogo(includeLogo ?? false, imageSrc ?? null)

    .build();

    return (
        <section>
            <h2>
                💳 Procesador de Pagos 💸
            </h2>
            {state.matches('step1') && (
                <>
                    <div>
             
                        {textFieldText}

                        {numberTextField}

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

                        {/* <button onClick={() => setState({ type: "NEXT" })}>Next</button> */}


                    </div>

                </>
            )}
            {state.matches('step2') && (
                <>


                    {/* INCLUDE LOGO  */}


                    <CheckboxContainer 
                        label="¿Quiere incluir un Logo?"
                        includeLogo={includeLogo}
                        imageSrc={imageSrc}
                        handleImageChange={handleImageChange}
                        
                        >
                            <input
                                type="checkbox"
                                checked={includeLogo}
                                onChange={(e) => setState({ type: 'SET_INCLUDE_LOGO', includeLogo: e.target.checked })}
                                className="size-5"
                            />
                        </CheckboxContainer>

                    {/* title */}

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setState({ type: 'SET_TITLE', title: e.target.value })}
                        placeholder="Title"

                    />

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

                    <CheckboxContainer label="¿Quiere incluir la información del usuario?"
                    includeUserInfo={includeUserInfo}
                    userInfo={userInfo}
                    onUserInfoChange={handleUserInfoChange}
                    >
                        <input
                            type="checkbox"
                            checked={includeUserInfo}
                            onChange={(e) => setState({ type: 'SET_INCLUDE_USER_INFO', includeUserInfo: e.target.checked })}
                            placeholder='Include User Info'
                            className="size-5"
                        />

                    </CheckboxContainer>

                    {/* Footer  Message */}
                    <div>

                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-green-950">Mensaje del Pie de Página</label>
                        <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-green-950 rounded-lg border" placeholder="Escriba su mensaje personalizado aquí..."
                        value={footerMessage}
                        onChange={(e) => setState({type: 'SET_FOOTER_MESSAGE', footerMessage: e.target.value })}
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
                   
                    <ReportViewer {...report}  />
                 
                    
                )
            }
        </section >
    )

}

