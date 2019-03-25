import {Notify, OrderQuery, Results, WxPayApi} from "../index";
import {WxpayConfig} from "./wxpay_config";

export class NotifyHandler extends Notify {
    protected queryOrder(transaction_id: string) {
        const input = new OrderQuery();
        input.transactionId = transaction_id;

        const config: WxpayConfig = new WxpayConfig();
        WxPayApi.orderQuery(config, input)
            .then((results: Results) => {
                // TODO 订单支付OK
                console.log(JSON.stringify(results));
            })
            .catch((reason: Error) => {
                // TODO 订单失败
                console.error(JSON.stringify(reason));
            });

    }

    public process(results: Results): boolean {
        const data = results.getValues();
        //TODO 1、进行参数校验
        if (!data.hasOwnProperty('return_code') || data.hasOwnProperty('return_code') && data['return_code'] !== 'SUCCESS') {
            //TODO失败,不是支付成功的通知
            //如果有需要可以做失败时候的一些清理处理，并且做一些监控
            throw new Error("异常：非支付成功通知！");
        }
        //TODO 2、进行签名验证
        if (!this.config) {
            throw new Error('配置项为空');
        }
        try {
            const checkResult: boolean = results.checkSign(this.config);
            if (!checkResult) {
                console.error("签名错误...");
                return false;
            }
        } catch (e) {
            console.error(JSON.stringify(e));
        }


        //TODO 3、处理业务逻辑
        console.log(`notify callback: ${JSON.stringify(data)}`);

        if (!data.hasOwnProperty('transaction_id')) {
            throw new Error("transaction_id为空！");
        }
        const transactionId = data["transaction_id"];
        // 异步
        this.queryOrder(transactionId);

        return true;
    }

    public LogAfterProcess(xmlData: string) {
        console.debug(xmlData);
        return;
    }
}