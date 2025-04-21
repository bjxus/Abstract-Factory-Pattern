import { Theme } from "../../domain/model/Theme";

export interface WizardContext {

    includeLogo?: boolean;
    title: string;
    includePaymentDetails?: boolean;
    includeUserInfo: boolean;
    theme: Theme;
    includeTimeStamp?: boolean;
    footerMessage: string;
    format: Format;

}

export type WizardEvent =
    | { type: 'SET_TYPE_PAY'; typePay: string }
    | { type: 'SET_AMOUNT'; amount: number }
    | { type: 'SET_INCLUDE_LOGO'; includeLogo: boolean }
    | { type: 'SET_TITLE'; title: string }
    | { type: 'SET_INCLUDE_PAYMENT_DETAILS'; includePaymentDetails: boolean }
    | { type: 'SET_INCLUDE_USER_INFO'; includeUserInfo: boolean }
    | { type: 'SET_THEME'; theme: Theme }
    | { type: 'SET_INCLUDE_TIMESTAMP'; includeTimeStamp: boolean }
    | { type: 'SET_FOOTER_MESSAGE'; footerMessage: string }
    | { type: 'SET_FORMAT'; format: Format }
    | { type: 'NEXT' }
    | { type: 'PREVIOUS' };

export enum Format {
        A4 = "A4",
        LETTER = "LETTER"
}

