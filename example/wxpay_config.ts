import {Config, SSLCert} from "../index";

export class WxpayConfig implements Config {
    GetAppId(): string {
        return "wx------------";
    }

    GetKey(): string {
        return "3a-----------------------------69";
    }

    GetMerchantId(): string {
        return "000000000000";
    }


    GetSignType(): string {
        return "MD5";
    }

    GetRemoteIpv4(): string | null {
        return null;
    }

    GetSSLCertPath(): SSLCert {
        return {
            sslCertPath: '',
            sslKeyPath: ''
        }
    }

    // No needed.
    GetAppSecret(): string {
        return "";
    }

    GetReportLevenl(): number {
        return 0;
    }

    GetNotifyUrl(): string {
        return "";
    }
}