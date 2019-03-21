import {Config} from "../config";
import * as crypto from "crypto";
import * as xml2js from "xml2js";
import {rejects} from "assert";

export class Base {
    protected values: { [key: string]: any } = {};

    public getValues(): { [key: string]: any } {
        return this.values;
    }

    // 签名加密方式： MD5|HMAC-SHA256（SHA2）
    public set signType(st: string) {
        this.values['sign_type'] = st;
    }

    public get signType(): string {
        if (this.values.hasOwnProperty('sign_type')) {
            return this.values['sign_type'];
        }
        return '';
    }

    // 设置签名
    public set sign(s: string) {
        this.values['sign'] = s;
    }

    public get sign(): string {
        if (this.values.hasOwnProperty('sign')) {
            return this.values['sign'];
        }
        return '';
    }

    public isSignSet(): boolean {
        return this.values.hasOwnProperty('sign');
    }

    // 生成签名
    public makeSign(config: Config, needSignType: boolean = true): string {
        const self = this;

        if (needSignType)
            this.signType = config.GetSignType();

        //签名步骤一：按字典序排序参数
        const orderedValues: { [key: string]: any } = {};
        Object.keys(self.values).sort().forEach(key => {
            orderedValues[key] = self.values[key];
        });
        let tmp_str: string = this.toUrlParams(orderedValues);
        //签名步骤二：在string后加入KEY
        tmp_str += `&key=${config.GetKey()}`;
        //签名步骤三：用MD5或者HMAC-SHA256方式加密
        const sign_type: string = config.GetSignType().toLowerCase();
        if (sign_type === 'md5') {
            tmp_str = crypto.createHash('md5').update(tmp_str).digest('hex');
        } else if (sign_type === 'sha2' || sign_type === 'hmac-sha256' || sign_type === 'sha256') {
            tmp_str = crypto.createHmac('sha256', config.GetKey()).update(tmp_str).digest('hex');
        } else {
            throw new Error('签名类型不支持!');
        }
        //签名步骤四：所有字符转为大写
        const sign_str: string = tmp_str.toUpperCase();

        // 存储签名
        this.sign = sign_str;

        return sign_str;
    }

    protected toUrlParams(values: { [key: string]: any }) {
        let buff: string = '';
        for (const key in values) {
            const value: any = values[key];
            if (key !== 'sign' && value !== '' && !Array.isArray(value)) {
                buff += `${key}=${value}&`;
            }
        }
        return buff.replace(/&+$/, '');
    }

    public toXml(): string {
        const values = this.values;
        if (!values || Object.keys(values).length <= 0) {
            throw new Error('数据异常或为空!');
        }

        const builder = new xml2js.Builder();
        return builder.buildObject(values);
    }

    public async fromXml(xml: string): Promise<Object> {
        if (!xml) {
            throw new Error('xml数据为空!');
        }
        const parser = new xml2js.Parser({trim: true, explicitArray: false, explicitRoot: false});

        return new Promise<Object>((resolve, rejects) => {
            parser.parseString(xml, (err: Error, result: any) => {
                if (err) {
                    rejects(err);
                } else {
                    this.values = result;
                    resolve(result);
                }
            })
        });
    }
}