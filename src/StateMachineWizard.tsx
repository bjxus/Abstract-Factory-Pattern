import { useState } from "react";
import "./App.css"
import { Payment } from "./domain/model/Payment";
import { Theme } from "./domain/model/Theme";

interface StateMachineConfig<StateType, StepNames extends string> {
    initialStep: StepNames;
    steps: {
        [key: string]: {
            canRolledBack: (state: StateType) => boolean;
            canAdvance: (state: StateTypes) => boolean;

        };
    };
    views: {
        [key in StepNames]: React.ComponentType<{
            state: StateType;
            setState: React.Dispatch<React.SetStateAction<StateType>>;
        }>
    }
}

enum Format {
    A4 = "A4",
    LETTER = "LETTER"
}
interface ReportPay {
    includeLogo?: boolean;
    title: string
    includePaymentDetails?: boolean;
    theme: Theme;
    includeTimeStamp?: boolean
    footerMessage: string;
    format: Format;
}

type WizardState = {
    payment: {
        type: string;
        amount: number;
    };
    reportPay: ReportPay;
}

type StepNames = "step1" | "step2" | "confirmation";

const stateMachineConfig: StateMachineConfig<WizardState, StepNames> = {
    initialStep: "step1",
    steps: {
        step1: {
            canRolledBack: () => false,
            canAdvance: (state) => !!state.payment,
        },
        step2: {
            canRolledBack: (state) => !!state.payment,
            canAdvance: (state) => !!state.reportPay,

        },
        confirmation: {
            canRolledBack: (state) => !!state.reportPay,
            canAdvance: () => true
        }
    },
    views: {
        step1: ({ state, setState }) => (
            <div>
                <input
                    type="text"
                    value={state.name}
                    onChange={(e) => setState((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder='Full name'
                />
                <input
                    type="number"
                    value={state.age}
                    onChange={(e) => setState((prev) => ({ ...prev, age: parseInt(e.target.value) }))}
                    placeholder='Age'
                />
            </div>

        ),
        step2: ({ state, setState }) => (
            <div>
                <input
                    type="checkbox"
                    value={state.reportPay.includeLogo}
                    onChange={(e) => setState((prev) => ({ ...prev, includeLogo: e.target.value }))}
                    placeholder='Include logo'
                />
                <input
                    type="text"
                    value={state.reportPay.title}
                    onChange={(e) => setState((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder='Title'
                />

                <input
                    type="checkbox"
                    value={state.reportPay.includePaymentDetails}
                    onChange={(e) => setState((prev) => ({ ...prev, includePaymentDetails: e.target.value }))}
                    placeholder='Include Payment Details'
                />

                <input
                    type="checkbox"
                    value={state.reportPay.includeUserInfo}
                    onChange={(e) => setState((prev) => ({ ...prev, includeUserInfo: e.target.value }))}
                    placeholder='Include User Info'
                />

                <input
                    type="text"
                    value={state.reportPay.theme}
                    onChange={(e) => setState((prev) => ({ ...prev, theme: e.target.value }))}
                    placeholder='Theme'
                />

                <input
                    type="checkbox"
                    value={state.reportPay.includeTimeStamp}
                    onChange={(e) => setState((prev) => ({
                        ...prev,
                        includeTimeStamp: e.target.value,
                    }))}
                    placeholder="Include Time Stamp"
                />

                <input
                    type="text"
                    value={state.reportPay.format}
                    onChange={(e) => setState((prev) => ({ ...prev, format: e.target.value }))}
                    placeholder='Format'
                />



            </div>
        ),
        step3: ({ state }) => (
            <div>
                <p>{state.payment}</p>
                <p>{state.reportPay}</p>
            </div>
        )
    }
}

const getStepView = <T, V extends string>(
    config: StateMachineConfig<T, V>,
    stepName: V,
): React.ComponentType<{ state: T, setState: React.Dispatch<React.SetStateAction<T>>  }> => config.views[stepName]; 

const StateMachineWizard = () => {
    const [wizardState, setWizardState] = useState<WizardState>({
        payment: {
            type: "",
            amount: 0
        },
        reportPay: {
            title: "",
            theme: Theme.LIGHT,
            footerMessage: "",
            format: Format.A4
        }
    })

    const [currentStep, setCurrentStep] = useState<StepNames>(stateMachineConfig.initialStep)

    const StepComponent = getStepView(stateMachineConfig, currentStep)

    const handlePrevious = () => {
        const canRolledBack = stateMachineConfig.steps[currentStep].canRolledBack(wizardState)

        if (canRolledBack) {
            if (currentStep === "step2") setCurrentStep("step1")
            
            else if (currentStep === "confirmation") setCurrentStep("step2")
                
        }

    }

    const handleNext = () => {
        const canAdvance = stateMachineConfig.steps[currentStep].canAdvance(wizardState)
    
        if (canAdvance) {
          if (currentStep === "step1") setCurrentStep("step2")
          else if (currentStep === "step2") setCurrentStep("confirmation")  
          
        } else {
          alert("You can't move forward yet.") 
        }
      }

      return (
        <section>
        <h2>
            ✨ Wizard State Machine ✨
        </h2>
        {state.matches('step1') && (
          <>
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => send({ type: 'SET_NAME', name: e.target.value })}
                  placeholder="Complete name"
                />
              
              </div>
              <button onClick={() => send({type:"NEXT"})}>Next</button>
          </>
        )}
        {state.matches('step2') && (
          <>
              <div>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => send({ type: 'SET_AGE', age: parseInt(e.target.value) })}
                  placeholder="Edad"
                />
                
              </div>
              <button onClick={() => send({ type: "PREVIOUS" })}>Previous</button>
                <button onClick={() => send({ type: "NEXT"})}>Next</button>
          </>
        )}
        {state.matches('confirmation') && (
          <>
              <div>
                <p>Name: {name}</p>
                <p>Age: {age} years old</p>                
              </div>
              
          </>
        )}
      </section>
      )


}