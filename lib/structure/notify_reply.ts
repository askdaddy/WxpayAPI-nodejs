import {BaseSignMd5} from "./base_sign_md5";

export class NotifyReply extends BaseSignMd5 {
    public set returnCode(code: string) {
        this.values['return_code'] = code;
    }

    public get returnCode(): string {
        if (this.values.hasOwnProperty('return_code')) {
            return this.values['return_code'];
        }
        return '';
    }

    public set returnMsg(m: string) {
        this.values['return_msg'] = m;
    }

    public get returnMsg(): string {
        if (this.values.hasOwnProperty('return_msg')) {
            return this.values['return_msg'];
        }
        return '';
    }

    public setData(key: string, value: any) {
        this.values[key] = value;
    }
}