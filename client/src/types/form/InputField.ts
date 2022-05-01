import { Dispatch, SetStateAction } from "react";

export interface IInputField {
    name: string;
    label: string;
    placeholder: string;
    type?: string;
    showPassword?: boolean;
    setShowPassword?: Dispatch<SetStateAction<boolean>>;
    textarea?: boolean;
}
