import {Config, SSLCert} from "./config";
import {UnifiedOrder} from "./structure/unified_order";
import {Utils} from "./utils";
import * as fs from "fs";
import * as path from "path";
import * as requestPromise from "request-promise-native";
import {Results} from "./structure/results";
import {OrderQuery} from "./structure/order_query";

export class WxPayApi {
    static unifiedOrder(config: Config, input: UnifiedOrder): Promise<Results> {
        const api_url: string = 'https://api.mch.weixin.qq.com/pay/unifiedorder';

        //检测必填参数
        if (!input.isOutTradeNoSet()) {
            throw new Error('缺少统一支付接口必填参数out_trade_no！');
        }
        if (!input.isBodySet()) {
            throw new Error('缺少统一支付接口必填参数body！');
        }
        if (!input.isTotalFeeSet()) {
            throw new Error('缺少统一支付接口必填参数total_fee！');
        }
        if (!input.isTradeTypeSet()) {
            throw new Error('缺少统一支付接口必填参数trade_type！')
        }
        //关联参数
        if (input.tradeType.toLowerCase() === 'jsapi' && !input.isOpenIdSet()) {
            throw new Error('统一支付接口中，缺少必填参数openid！trade_type为JSAPI时，openid为必填参数！');
        }
        if (input.tradeType.toLowerCase() === 'native' && !input.isProductIdSet()) {
            throw new Error('统一支付接口中，缺少必填参数product_id！trade_type为JSAPI时，product_id为必填参数！');
        }

        //异步通知url未设置，则使用配置文件中的url
        if (!input.isNotifyUrlSet() && config.GetNotifyUrl() !== '') {
            input.notifyUrl = config.GetNotifyUrl();
        }

        input.appId = config.GetAppId();
        input.mchId = config.GetMerchantId();
        // TODO 此处不支持多公网IP
        input.spbillCreateIp = Utils.getRemoteIp().shift() || '';
        input.nonceStr = WxPayApi.getNonceStr();

        // 签名
        input.makeSign(config);
        const xml = input.toXml();
        const startTime = new Date().getTime();

        return new Promise<Results>((resolve, reject) => {
            WxPayApi.postXML(config, xml, api_url)
                .then((body: string) => {
                    return Results.init(config, body);
                })
                .then((results: Results) => {
                    resolve(results);
                })
                .catch((err: any) => {
                    reject(err);
                });
        });
    }

    static orderQuery(config: Config, input: OrderQuery): Promise<Results> {
        const api_url: string = 'https://api.mch.weixin.qq.com/pay/orderquery';

        //检测必填参数
        if (!input.isOutTradeNoSet() && !input.isTransactionIdSet()) {
            throw new Error("订单查询接口中，out_trade_no、transaction_id至少填一个！");
        }

        input.appId = config.GetAppId();
        input.mchId = config.GetMerchantId();
        input.nonceStr = WxPayApi.getNonceStr();

        input.makeSign(config);
        const xml = input.toXml();
        const startTime = new Date().getTime();

        return new Promise<Results>((resolve, reject) => {
            WxPayApi.postXML(config, xml, api_url)
                .then((body: string) => {
                    return Results.init(config, body);
                })
                .then((results: Results) => {
                    resolve(results);
                })
                .catch((err: any) => {
                    reject(err);
                })
        });

    }

    // 产生随机字符串，不长于32位
    static getNonceStr(length = 32): string {
        const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        let str = "";
        for (let i = 0; i < length; i++) {
            const idx = Math.floor(Math.random() * Math.floor(chars.length));
            str += chars.slice(idx, idx + 1);
        }
        return str;
    }

    static postXML(config: Config, xml: string, url: string, useCert = false, timeOutSec = 30): Promise<any> {
        const options: requestPromise.OptionsWithUri = {
            method: 'POST',
            uri: url,
            // integer containing number of milliseconds, controls two timeouts:
            // Read timeout: Time to wait for a server to send response headers (and start the response body) before aborting the request.
            // Connection timeout: Sets the socket to timeout after timeout milliseconds of inactivity. Note that increasing the timeout beyond the OS-wide TCP connection timeout will not have any effect.
            timeout: timeOutSec,
            headers: {
                'User-Agent': 'request'
            },
            body: xml
        }
        if (useCert) {
            //设置证书
            //使用证书：cert 与 key 分别属于两个.pem文件
            //证书文件请放入服务器的非web目录下
            const sslCertPath: SSLCert = config.GetSSLCertPath()
            const certFile = path.resolve(sslCertPath.sslCertPath)
                , keyFile = path.resolve(sslCertPath.sslKeyPath);

            options.cert = fs.readFileSync(certFile);
            options.key = fs.readFileSync(keyFile);
        }

        return requestPromise(options).promise();
    }

    // 回调的回显
    // 用户要重写此方法获取给微信回调的回显内容（xml）
    static replyNotify(xml: string) {
        console.log(xml);
    }
}