import {Base} from "./base";

// 文档地址 https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=9_2
export class OrderQuery extends Base{
    // 微信支付分配的公众账号ID（企业号corpid即为此appId）
    public set appId(id: string) {
        this.values['appid'] = id;
    }

    public get appId(): string {
        if (this.values.hasOwnProperty('appid')) {
            return this.values['appid'];
        }
        return '';
    }

    public isAppIdSet(): boolean {
        return this.values.hasOwnProperty('appid');
    }

    // 微信支付分配的商户号
    public set mchId(id: string) {
        this.values['mch_id'] = id;
    }

    public get mchId(): string {
        if (this.values.hasOwnProperty('mch_id')) {
            return this.values['mch_id'];
        }
        return '';
    }

    public isMchIdSet(): boolean {
        return this.values.hasOwnProperty('mch_id');
    }

    // 微信的订单号，建议优先使用
    public set transactionId(id: string) {
        this.values['transaction_id'] = id;
    }

    public get transactionId(): string {
        if (this.values.hasOwnProperty('transaction_id')) {
            return this.values['transaction_id'];
        }
        return '';
    }

    public isTransactionIdSet(): boolean {
        return this.values.hasOwnProperty('transaction_id');
    }

    // 商户系统内部订单号，要求32个字符内，只能是数字、大小写字母_-|*@ ，且在同一个商户号下唯一。 详见 https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=4_2
    public set outTradeNo(id: string) {
        this.values['out_trade_no'] = id;
    }

    public get outTradeNo(): string {
        if (this.values.hasOwnProperty('out_trade_no')) {
            return this.values['out_trade_no'];
        }
        return '';
    }

    public isOutTradeNoSet(): boolean {
        return this.values.hasOwnProperty('out_trade_no');
    }

    // 随机字符串，不长于32位。推荐随机数生成算法
    public set nonceStr(str: string) {
        this.values['nonce_str'] = str;
    }

    public get nonceStr(): string {
        if (this.values.hasOwnProperty('nonce_str')) {
            return this.values['nonce_str'];
        }
        return '';
    }

    public isNonceStrSet(): boolean {
        return this.values.hasOwnProperty('nonce_str');
    }
}