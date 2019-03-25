import * as express from "express";
import * as bodyParser from "body-parser";
import {WxpayConfig} from "./wxpay_config";
import {Results, UnifiedOrder, WxPayApi} from "../index";
import * as path from "path";
import {NotifyHandler} from "./notify_handler";

const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));
app.use(bodyParser.raw({type: '*/*'}));

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/native', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const config = new WxpayConfig();
    // 配置订单
    const input: UnifiedOrder = new UnifiedOrder();
    input.body = "WxAPI_test_body";
    input.attach = "test_attach";
    input.outTradeNo = `sdkJS-${new Date().getTime()}`;
    input.totalFee = 1;
    input.notifyUrl = "http://<YOUR_SERVER_IP>:4008/notify/";
    input.tradeType = "NATIVE";
    input.goodsTag = "goodsTag";
    //此参数必传。此参数为二维码中包含的商品ID，商户自行定义。
    input.productId = "1234509876";

    try {
        WxPayApi.unifiedOrder(config, input)
            .then((value: Results) => {
                console.log(value);
                // TODO
                const code_url = value.getValues()['code_url'];
                console.log(code_url);
                res.render("qrcode", {code_url: encodeURI(code_url)});
            })
            .catch((reason: Error) => {
                console.error(reason);
                res.send(JSON.stringify(reason));
            })
    } catch (e) {
        res.send(JSON.stringify(e));
    }
});

app.post('/notify', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const body = req.body;
    console.log(`/notify ---- ${body}`);

    const handler = new NotifyHandler();
    try {
        handler.handle(new WxpayConfig(), body);
    } catch (e) {
        console.error(e);
    }

    // 假的返回
    res.send("<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>");
});


app.listen(4008, "0.0.0.0", function () {
    console.log('Example app listening on port 4008.');
});