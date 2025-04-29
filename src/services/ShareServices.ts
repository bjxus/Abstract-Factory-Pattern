import axios from "axios";

export interface EmailPayload {
    to: string;
    amount: number;
    payment_method: string;
    notification_type: string;
}

export interface SmsPayload {
    amount: number;
    notification_type: string;
    payment_method: string;
    phone_number: string;
}

export class ShareService {
    async sendMessage(notification_type: string, payload: EmailPayload | SmsPayload) {

        console.log("Payload " + payload);



        try {
            const URL = `http://localhost:8080/api/notifications/${notification_type}`

            let params = {}


            if (notification_type === "email") {


                const emailPayload = payload as EmailPayload;
                params = {
                    to: emailPayload.to,
                    amount: emailPayload.amount,
                    payment_method: emailPayload.payment_method,
                    notification_type: emailPayload.notification_type

                }
            } else if (notification_type === "sms") {
                const smsPayload = payload as SmsPayload;

                params = {
                    amount: smsPayload.amount,
                    notification_type: notification_type.toUpperCase(),
                    payment_method: smsPayload.payment_method,
                    phone_number: smsPayload.phone_number,

                }
            }

            console.table(params)
            console.log(URL);




            const response = await axios.post(URL,
                params, {
                headers: {
                    "Content-type": "application/json"
                },
            });
            return response.data; 



        } catch (error) {
            console.error("Error al enviar el archivo: ", error);
        }
    }
}