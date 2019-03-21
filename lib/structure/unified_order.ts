import {Base} from "./base";

// 文档地址： https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=9_1
export class UnifiedOrder extends Base {
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

    // 设置微信支付分配的终端设备号，商户自定义。可以为终端设备号(门店号或收银设备ID)，PC网页或公众号内支付可以传"WEB"

    public set deviceId(id: string) {
        this.values['device_info'] = id;
    }

    public get deviceId(): string {
        if (this.values.hasOwnProperty('device_info')) {
            return this.values['device_info'];
        }
        return '';
    }

    public isDeviceIdSet(): boolean {
        return this.values.hasOwnProperty('device_info');
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


    // 设置商品或支付单简要描述
    public set body(v: string) {
        this.values['body'] = v;
    }

    public get body(): string {
        if (this.values.hasOwnProperty('body')) {
            return this.values['body'];
        }
        return '';
    }

    public isBodySet(): boolean {
        return this.values.hasOwnProperty('body');
    }

    // 商品详细描述，对于使用单品优惠的商户，改字段必须按照规范上传，详见 https://pay.weixin.qq.com/wiki/doc/api/danpin.php?chapter=9_102&index=2
    public set detail(d: string) {
        this.values['detail'] = d;
    }

    public get detail(): string {
        if (this.values.hasOwnProperty('detail')) {
            return this.values['detail'];
        }
        return '';
    }

    public isDetailSet(): boolean {
        return this.values.hasOwnProperty('detail');
    }

    // 附加数据，在查询API和支付通知中原样返回，可作为自定义参数使用。
    public set attach(a: string) {
        this.values['attach'] = a;
    }

    public get attach(): string {
        if (this.values.hasOwnProperty('attach')) {
            return this.values['attach'];
        }
        return '';
    }

    public isAttachSet(): boolean {
        return this.values.hasOwnProperty('attach');
    }

    // 商户系统内部订单号，要求32个字符内，只能是数字、大小写字母_-|* 且在同一个商户号下唯一。详见 https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=4_2
    public set outTradeNo(o: string) {
        this.values['out_trade_no'] = o;
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

    // 符合ISO 4217标准的三位字母代码，默认人民币：CNY，详细列表请参见 https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=4_2
    public set feeType(ft: string) {
        this.values['fee_type'] = ft;
    }

    public get feeType(): string {
        if (this.values.hasOwnProperty('fee_type')) {
            return this.values['fee_type'];
        }
        return '';
    }

    public isFeeTypeSet(): boolean {
        return this.values.hasOwnProperty('fee_type');
    }

    // 订单总金额，单位为分，详见 https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=4_2
    public set totalFee(tf: number) {
        this.values['total_fee'] = tf;
    }

    public get totalFee(): number {
        if (this.values.hasOwnProperty('total_fee')) {
            return this.values['total_fee'];
        }
        return 0;
    }

    public isTotalFeeSet(): boolean {
        return this.values.hasOwnProperty('total_fee');
    }

    // 支持IPV4和IPV6两种格式的IP地址。调用微信支付API的机器IP
    public set spbillCreateIp(ip: string) {
        this.values['spbill_create_ip'] = ip;
    }

    public get spbillCreateIp(): string {
        if (this.values.hasOwnProperty('spbill_create_ip')) {
            return this.values['spbill_create_ip'];
        }
        return '';
    }

    public isSpbillCreateIpSet(): boolean {
        return this.values.hasOwnProperty('spbill_create_ip');
    }

    // 订单生成时间，格式为yyyyMMddHHmmss，如2009年12月25日9点10分10秒表示为20091225091010。
    // 其他详见 https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=4_2
    public set timeStart(t: string) {
        this.values['time_start'] = t;
    }

    public get timeStart(): string {
        if (this.values.hasOwnProperty('time_start')) {
            return this.values['time_start'];
        }
        return '';
    }

    public isTimeStartSet(): boolean {
        return this.values.hasOwnProperty('time_start');
    }

    // 订单失效时间，格式为yyyyMMddHHmmss，如2009年12月27日9点10分10秒表示为20091227091010。订单失效时间是针对订单号而言的，由于在请求支付的时候有一个必传参数prepay_id只有两小时的有效期，所以在重入时间超过2小时的时候需要重新请求下单接口获取新的prepay_id。
    // 其他详见 https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=4_2
    // 建议：最短失效时间间隔大于1分钟
    public set timeExpire(t: string) {
        this.values['time_expire'] = t;
    }

    public get timeExpire(): string {
        if (this.values.hasOwnProperty('time_expire')) {
            return this.values['time_expire'];
        }
        return '';
    }

    public isTimeExpireSet(): boolean {
        return this.values.hasOwnProperty('time_expire');
    }

    // 订单优惠标记，使用代金券或立减优惠功能时需要的参数，说明详见 https://pay.weixin.qq.com/wiki/doc/api/tools/sp_coupon.php?chapter=12_1
    public set goodsTag(t: string) {
        this.values['goods_tag'] = t;
    }

    public get goodsTag(): string {
        if (this.values.hasOwnProperty('goods_tag')) {
            return this.values['goods_tag'];
        }
        return '';
    }

    public isGoodsTagSet(): boolean {
        return this.values.hasOwnProperty('goods_tag');
    }

    // 异步接收微信支付结果通知的回调地址，通知url必须为外网可访问的url，不能携带参数。
    public set notifyUrl(t: string) {
        this.values['notify_url'] = t;
    }

    public get notifyUrl(): string {
        if (this.values.hasOwnProperty('notify_url')) {
            return this.values['notify_url'];
        }
        return '';
    }

    public isNotifyUrlSet(): boolean {
        return this.values.hasOwnProperty('notify_url');
    }

    // 交易类型, 详见 https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=4_2
    // JSAPI -JSAPI支付
    //
    // NATIVE -Native支付
    //
    // APP -APP支付
    public set tradeType(t: string) {
        this.values['trade_type'] = t;
    }

    public get tradeType(): string {
        if (this.values.hasOwnProperty('trade_type')) {
            return this.values['trade_type'];
        }
        return '';
    }

    public isTradeTypeSet(): boolean {
        return this.values.hasOwnProperty('trade_type');
    }

    // 商品ID
    // trade_type==NATIVE时，此参数必传。此参数为二维码中包含的商品ID，商户自行定义。
    public set productId(id: string) {
        this.values['product_id'] = id;
    }

    public get productId(): string {
        if (this.values.hasOwnProperty('product_id')) {
            return this.values['product_id'];
        }
        return '';
    }

    public isProductIdSet(): boolean {
        return this.values.hasOwnProperty('product_id');
    }

    // 用户标识
    // trade_type=JSAPI时（即JSAPI支付），此参数必传，此参数为微信用户在商户对应appid下的唯一标识。openid如何获取，可参考【获取openid】。
    // 企业号请使用【企业号OAuth2.0接口】获取企业号内成员userid，再调用【企业号userid转openid接口】进行转换
    public set openId(id: string) {
        this.values['openid'] = id;
    }

    public get openId(): string {
        if (this.values.hasOwnProperty('openid')) {
            return this.values['openid'];
        }
        return '';
    }

    public isOpenIdSet(): boolean {
        return this.values.hasOwnProperty('openid');
    }
}