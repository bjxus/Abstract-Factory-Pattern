import { JSX } from "react";
import { ButtonOptions } from "../../domain/ui/Button/ButtonOptions";
import { PaymentSelectorOptions, SelectOptions } from "../../domain/ui/Select/SelectOptions";
import { TextFieldOptions } from "../../domain/ui/TextField/TextFieldOptions";
import { ToastOptions } from "../../domain/ui/Toast/ToastOptions";

export interface UIManagerOptions {
  themeParam: string;
  button: ButtonOptions;
  textFieldText: TextFieldOptions;
  numberTextField: TextFieldOptions;
  select: SelectOptions;
  selectorPayment: PaymentSelectorOptions;
  toast: ToastOptions;
}

export interface UIManagerComponents {
  themeClass: string;
  textFieldText: JSX.Element;
  numberTextField: JSX.Element;
  button: JSX.Element;
  select?: JSX.Element;
  selectorPayment: JSX.Element; 
  toast: JSX.Element;
}