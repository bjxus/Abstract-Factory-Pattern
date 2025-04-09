import axios from "axios";
import { Payment } from "../domain/model/Payment";

export class PaymentService {
  async processPayment(payment: Payment) {
    try {
      const URL = "http://localhost:8000/pay";

      const response = await axios.get(URL, {
        params: {
          pay_method: payment.getType(),
          amount: payment.getAmount(),
        },
        headers: {
            "Content-Type": "application/json"
          }
      });

      return response.data;

    } catch (error) {
      console.error("Error al procesar el pago:", error);
      throw error; // Puedes lanzar el error si quieres manejarlo más arriba
    }
  }
}

