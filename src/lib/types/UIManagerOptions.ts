import { JSX } from "react";
import { ButtonOptions } from "../../domain/ui/Button/ButtonOptions";
import { SelectOptions } from "../../domain/ui/Select/SelectOptions";
import { TextFieldOptions } from "../../domain/ui/TextField/TextFieldOptions";
import { ToastOptions } from "../../domain/ui/Toast/ToastOptions";

export interface UIManagerOptions {
  themeParam: string;
  button: ButtonOptions;
  textFieldText: TextFieldOptions;
  numberTextField: TextFieldOptions;
  select: SelectOptions;
  toast: ToastOptions;
}

export interface UIManagerComponents {
  themeClass: string;
  textFieldText: JSX.Element;
  numberTextField: JSX.Element;
  button: JSX.Element;
  select?: JSX.Element;
  toast: JSX.Element;
}