import {Base} from "./base";
import {Config} from "../config";
import * as crypto from "crypto";

export class BaseSignMd5 extends Base {
    // 本函数不覆盖sign成员变量
    public makeSign(config: Config, needSignType: boolean = false): string {
        const self = this;

        //签名步骤一：按字典序排序参数
        const orderedValues: { [key: string]: any } = {};
        Object.keys(self.values).sort().forEach(key => {
            orderedValues[key] = self.values[key];
        });
        let tmp_str: string = this.toUrlParams(orderedValues);

        //签名步骤二：在string后加入KEY
        tmp_str += `&key=${config.GetKey()}`;

        //签名步骤三：仅用MD5方式加密
        tmp_str = crypto.createHash('md5').update(tmp_str).digest('hex');

        //签名步骤四：所有字符转为大写
        const sign_str: string = tmp_str.toUpperCase();

        return sign_str;
    }
}