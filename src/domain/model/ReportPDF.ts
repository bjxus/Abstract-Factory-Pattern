import { ReportPDFBuilder } from "../builder/ReportPDFBuilder";
import { Format } from "./Format";
import { PaymentDetails } from "./PaymentDetails";
import { Theme } from "./Theme";
import { UserInfo } from "./UserInfo";

export class ReportPDF {
    readonly includeLogo: boolean;
    readonly imageSrc: string | null;
    readonly title: string;
    readonly includePaymentDetails: boolean;
    readonly paymentDetails: PaymentDetails;
    readonly includeUserInfo: boolean;
    readonly userInfo: UserInfo;
    readonly theme: Theme;
    readonly includeTimestamp: boolean;
    readonly footerMessage: string;
    readonly format: Format;
  
    constructor(builder: ReportPDFBuilder) {
      this.includeLogo = builder.includeLogo;
this.imageSrc = builder.imageSrc || null;
      this.title = builder.title;
      this.includePaymentDetails = builder.includePaymentDetails;
      this.paymentDetails = builder.paymentDetails;
      this.includeUserInfo = builder.includeUserInfo;
      this.userInfo = builder.userInfo;
      this.theme = builder.theme;
      this.includeTimestamp = builder.includeTimestamp;
      this.footerMessage = builder.footerMessage;
      this.format = builder.format;
    }
  
    static get Builder() {
      return new ReportPDFBuilder();
    }
  }