import { ReactNode } from "react"



type CheckboxContainerProps =  {
    label: string;
    children: ReactNode;

    includeLogo?: boolean;
    includeUserInfo?: boolean;
    
}

const CheckboxContainer: React.FC<CheckboxContainerProps> = ({ label, children  }) => {

   
    return (

        <div className="border border-[#ccc] rounded p-2 bg-[#EAF5ED] text-[#004028] gap-2 checkbox">
            <div>

                <label className="flex flex-row items-center gap-2">
                    {label}
                    {children}
                </label>

            </div>

           

         

          
        </div>
    )
}

export default CheckboxContainer;
