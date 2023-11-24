const express = require("express");
const routerRouter = express.Router();
const ok = require("./resource/ok/okjx");
const qqq = require("./resource/777/777jx");
const url = require("url");




const okjx = new ok();
const qqqjx = new qqq();

routerRouter.get("/", async function (req, res) {
	const sourUrl = req.query.url;
	if (sourUrl === "null" || !sourUrl){
		res.json({
			"code": 2,
			"msg": "缺少参数",
		});
	}

	let result = await qqqjx.jx(sourUrl);
	if (result.success === 1){
		console.debug("777解析成功:" + sourUrl);
		res.json({
			"code": 0,
			"msg": "ok",
			"url": result.url,
			"resCode": 777
		});
	}else {
		console.debug("OK解析成功:" + sourUrl);
		res.json(await okjx.jx(sourUrl));
	}
});


module.exports = routerRouter;
