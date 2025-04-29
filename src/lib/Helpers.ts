import { assign, createMachine } from "xstate";
import { Theme } from "../domain/model/Theme";
import { Format, WizardContext, WizardEvent } from "./types/StateMachineTypes";



export const wizardMachine = createMachine({
    id: "wizard",
    initial: "step1",
    context: {

        includeLogo: false,
        title: '',
        includePaymentDetails: false,
        includeUserInfo: false,
        theme: Theme.LIGHT,
        includeTimeStamp: false,
        footerMessage: '',
        format: Format.A4,
    },
    types: {
        events: {} as WizardEvent,
        context: {} as WizardContext

    },
    states: {
        step1: {
            on: {
                
                NEXT: {
                    target: 'step2',
                },
            },
        },
        step2: {
            on: {
                SET_INCLUDE_LOGO: {
                    actions: assign({
                        includeLogo: ({ event }) => event.includeLogo
                    }),
                },
                SET_TITLE: {
                    actions: assign({
                        title: ({ event }) => event.title
                    }),
                },
                SET_INCLUDE_PAYMENT_DETAILS: {
                    actions: assign({
                        includePaymentDetails: ({ event }) => event.includePaymentDetails
                    }),
                },
                SET_INCLUDE_USER_INFO: {
                    actions: assign({
                        includeUserInfo: ({ event }) => event.includeUserInfo
                    }),
                },
                SET_THEME: {
                    actions: assign({
                        theme: ({ event }) => event.theme
                    }),
                },
                SET_INCLUDE_TIMESTAMP: {
                    actions: assign({
                        includeTimeStamp: ({ event }) => event.includeTimeStamp
                    }),
                },
                SET_FOOTER_MESSAGE: {
                    actions: assign({
                        footerMessage: ({ event }) => event.footerMessage
                    }),
                },
                SET_FORMAT: {
                    actions: assign({
                        format: ({ event }) => event.format
                    }),
                },
                NEXT: {
                    target: 'confirmation',
                },
                PREVIOUS: {
                    target: 'step1',
                },
            },
        },
        confirmation: {
            on: {
                PREVIOUS: {
                    target: 'step2',
                },
            },
        },
    },
});
