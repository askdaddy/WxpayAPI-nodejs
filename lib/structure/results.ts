import {Base} from "./base";
import {Config} from "../config";
import * as crypto from "crypto";
import {rejects} from "assert";

export class Results extends Base {
    // 生成签名 - override 父类方法
    // 返回签名，本函数不覆盖sign成员变量，如要设置签名需要调用SetSign方法赋值
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
        //签名步骤三：MD5加密或者HMAC-SHA256
        if (this.sign.length <= 32) {
            //如果签名小于等于32个,则使用md5验证
            tmp_str = crypto.createHash('md5').update(tmp_str).digest('hex');
        } else {
            //用sha256校验
            tmp_str = crypto.createHmac('sha256', config.GetKey()).update(tmp_str).digest('hex');
        }
        //签名步骤四：所有字符转为大写
        const sign_str: string = tmp_str.toUpperCase();

        return sign_str;
    }

    // 检测签名
    public checkSign(config: Config): boolean {
        if (!this.isSignSet()) throw new Error("签名为空！");

        const sign = this.makeSign(config, false);
        if (this.sign === sign) {
            return true;
        }

        return false;
    }

    // 设置参数
    public setData(key: string, value: any) {
        this.values[key] = value;
    }

    // 从xml构建参数
    public static async init(config: Config, xml: string): Promise<Results> {
        const self: Results = new this();
        const result: any = await self.fromXml(xml);
        return new Promise<Results>((resolve, rejects) => {
            if (!result) {
                rejects("解析xml错误！");
            }

            // 失败直接返回
            if (result['return_code'] !== 'SUCCESS') {
                for (const key in result) {
                    //除了return_code和return_msg之外其他的参数存在，则报错
                    if (key !== 'return_code' && key !== 'return_msg') {
                        rejects(new Error("输入数据存在异常！"));
                        break;
                    }
                }
            }
            // 检查签名
            if (!self.checkSign(config)) {
                rejects(new Error("签名校验错误"));
            }
            resolve(self);
        });
    }
}