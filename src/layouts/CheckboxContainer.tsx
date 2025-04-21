import { ReactNode, useState } from "react"
import { UserInfo } from "../domain/model/UserInfo";



type CheckboxContainerProps =  {
    label: string;
    children: ReactNode;

    includeLogo?: boolean;
    imageSrc?: string | null
    handleImageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;


    includeUserInfo?: boolean;
    userInfo?: UserInfo;
    onUserInfoChange?: (field: keyof UserInfo, value: string) => void;
}

const CheckboxContainer: React.FC<CheckboxContainerProps> = ({ label, children, includeLogo,imageSrc, handleImageChange, includeUserInfo, userInfo, onUserInfoChange,  }) => {

    const [collapsed, setCollapsed] = useState(false)

    return (

        <div className="border border-[#ccc] rounded p-2 bg-[#EAF5ED] text-[#004028] gap-2 checkbox">
            <div>

                <label className="flex flex-row items-center gap-2">
                    {label}
                    {children}
                </label>

            </div>

            {/* Botón de colapso solo si aplica */}
            {(includeLogo || includeUserInfo) && (
                <button
                    type="button"
                    onClick={() => setCollapsed(c => !c)}
                    className="text-sm text-[#004028] underline"
                >
                    {collapsed ? 'Mostrar' : 'Ocultar'}
                </button>
            )}

            {!collapsed && includeLogo && (
                <div className="min-h-20 border-2 border-dashed border-[#888] rounded p-2 mt-2">
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imageSrc && <img src={imageSrc} alt="Imagen seleccionada" />}
                </div>
            )}

            {!collapsed && includeUserInfo && (
                <div className="border-2 border-dashed border-[#888] rounded p-2">
                    <label className="block mb-1 font-medium">🧑 Información del Usuario:</label>

                    <input
                        type="text"
                        placeholder="Nombre del usuario"
                        className="w-full p-1 border rounded"
                        value={userInfo?.nameUser}
                        onChange={(e) => onUserInfoChange?.('nameUser', e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="E-mail"
                        className="w-full p-1 border rounded"
                        value={userInfo?.email}
                        onChange={(e) => onUserInfoChange?.('email', e.target.value)}
                    />

                    <input
                        type="tel"
                        placeholder="Teléfono"
                        className="w-full p-1 border rounded"
                        value={userInfo?.phone}
                        onChange={(e) => onUserInfoChange?.('phone', e.target.value)}
                    />

                </div>
            )}
        </div>
    )
}

export default CheckboxContainer;
