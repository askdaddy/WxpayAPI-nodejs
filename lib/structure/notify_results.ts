import {Results} from "./results";
import {Config} from "../config";

export class NotifyResults extends Results {
    public static async init(config: Config, xml: string): Promise<Results> {

        const self: Results = new this();
        const result: any = await self.fromXml(xml);
        return new Promise<Results>((resolve, rejects) => {
            if (!result) {
                rejects("解析xml错误！");
            }
            // 检查签名
            if (!self.checkSign(config)) {
                rejects(new Error("签名校验错误"));
            }
            resolve(self);
        });
    }
}