import * as express from "express";
import {WxpayConfig} from "./wxpay_config";
import {Base, Results, UnifiedOrder, WxPayApi} from "../index";
import {urlencoded} from "express";
import * as path from "path";

const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/native', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const config = new WxpayConfig();
    // 配置订单
    const input: UnifiedOrder = new UnifiedOrder();
    input.body = "WxAPI_test_body";
    input.attach = "test_attach";
    input.outTradeNo = `sdkJS-TradeNO-${new Date().toISOString().slice(0, 20)}`;
    input.totalFee = 1;
    input.notifyUrl = "";
    input.tradeType = "NATIVE";
    input.goodsTag = "goodsTag";
    //此参数必传。此参数为二维码中包含的商品ID，商户自行定义。
    input.productId = "1234509876";

    WxPayApi.unifiedOrder(config, input)
        .then((value: Results) => {
            // TODO
            const code_url = value.getValues()['code_url'];
            res.render("qrcode", {code: urlencoded(code_url)});
        })
        .catch((reason: Error) => {
            console.error(reason);
            res.send(JSON.stringify(reason));
        })
});

app.post('/notify', (req: express.Request, res: express.Response, next: express.NextFunction) => {

});


app.listen(4008, function () {
    console.log('Example app listening on port 4008.');
});