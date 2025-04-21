import { Format } from "../model/Format";
import { PaymentDetails } from "../model/PaymentDetails";
import { ReportPDF } from "../model/ReportPDF";
import { Theme } from "../model/Theme";
import { UserInfo } from "../model/UserInfo";

export class ReportPDFBuilder {
  includeLogo: boolean = false;
  imageSrc?: string | null;
  title: string = 'Reporte';
  includePaymentDetails: boolean = false;
  paymentDetails: PaymentDetails = {
    transactionId: "",
    type: "",
    amount: 0,
  }
  includeUserInfo: boolean = false;
  userInfo: UserInfo = {
    nameUser: '',
    email: '',
    phone: '',
  };
  theme: Theme = Theme.LIGHT;
  includeTimestamp: boolean = false;
  footerMessage: string = '';
  format: Format = Format.A4;

  withLogo(value: boolean, imageSrc: string | null): this {
    this.includeLogo = value;
    this.imageSrc = imageSrc;
    return this;
  }

  withTitle(title: string): this {
    this.title = title;
    return this;
  }

  withPaymentDetails(value: boolean, paymentDetails: PaymentDetails): this {
    this.includePaymentDetails = value;
    this.paymentDetails = paymentDetails;
    return this;
  }

  withUserInfo(value: boolean, userInfo: UserInfo): this {
    this.includeUserInfo = value;
    this.userInfo = userInfo;
    return this;
  }

  withTheme(theme: Theme): this {
    this.theme = theme;
    return this;
  }

  withTimestamp(value: boolean): this {
    this.includeTimestamp = value;
    return this;
  }

  withFooterMessage(msg: string): this {
    this.footerMessage = msg;
    return this;
  }

  withFormat(format: Format): this {
    this.format = format;
    return this;
  }

  build(): ReportPDF {
    return new ReportPDF(this);
  }
}