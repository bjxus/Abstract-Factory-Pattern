import { PaymentService } from "../services/PaymentService";
import { Payment } from "../domain/model/Payment";

export class PaymentController {
    private paymentService: PaymentService;
    

    constructor(paymentService: PaymentService) {
        this.paymentService = paymentService;
    }

 
    async getData(
        payment: Payment,
    ) {

        const processedPayment = await this.paymentService.processPayment(payment);

        return {
            processedPayment,
        };
    }


}
