import {NotifyReply} from "./structure/notify_reply";
import {Config} from "./config";
import {NotifyResults} from "./structure/notify_results";
import WxPayApi from "./api";
import {Results} from "./structure/results";

export class Notify extends NotifyReply {
    protected config: Config | null = null;

    public handle(config: Config, response: string, needSign = true) {
        const self = this;
        this.config = config;

        this.notifyCallBack(response)
            .then(() => {
                self.returnCode = "SUCCESS";
                self.returnMsg = "OK";
                self.replyNotify(needSign);
            })
            .catch((err: Error) => {
                self.returnCode = "FAIL";
                self.returnMsg = err.message;
                self.replyNotify(false);
            });
    }

    private notifyCallBack(response: string): Promise<Error | null> {
        const self = this;
        return new Promise<Error | null>((resolve, reject) => {
            if (!self.config)
                return reject(new Error("缺少配置！"));

            NotifyResults.init(self.config, response)
                .then((results: Results) => {
                    // 调用处理方法
                    if (self.process(results)) {
                        resolve(null);
                    } else {
                        reject(new Error("处理失败！"));
                    }
                })
                .catch((reason: Error) => {
                    reject(reason);
                })
        })

    }

    // 回调方法入口，子类可重写该方法
    // TODO 1、进行参数校验
    // TODO 2、进行签名验证
    // TODO 3、处理业务逻辑
    //  注意：
    //  1、微信回调超时时间为2s，建议用户使用异步处理流程，确认成功之后立刻回复微信服务器
    //  2、微信服务器在调用失败或者接到回包为非确认包的时候，会发起重试，需确保你的回调是可以重入
    public process(results: Results): boolean {
        return false;
    }

    public logAfterProcess(xmlData: string) {
        return;
    }

    private replyNotify(needSign = true) {
        if (this.config && needSign && this.returnCode === 'SUCCESS') {
            this.sign = this.makeSign(this.config)
        }
        const xml = this.toXml();
        this.logAfterProcess(xml);
        WxPayApi.replyNotify(xml);
    }

}