import {Config, SSLCert} from "../index";

export class WxpayConfig implements Config {
    GetAppId(): string {
        return "";
    }

    GetAppSecret(): string {
        return "";
    }

    GetKey(): string {
        return "";
    }

    GetMerchantId(): string {
        return "";
    }

    GetNotifyUrl(): string {
        return "";
    }

    GetReportLevenl(): number {
        return 0;
    }

    GetSSLCertPath(): SSLCert {
        return {
            sslCertPath: '',
            sslKeyPath: ''
        }
    }

    GetSignType(): string {
        return "";
    }

}