const { JSDOM } = require("jsdom");
const fs = require("fs");
const CryptoJS = require("crypto-js");
const axios = require("axios");
require("./wasm_exec");

class Okjx {
	constructor() {
		this.Domain = "43.240.74.102";
		// 创建一个虚拟的浏览器窗口
		const { window } = new JSDOM();
		window.Domain = this.Domain;
		global.window = window;

		// const wasmUrl = "./demo.wasm"; // 替换为你的实际 URL
		const wasmUrl = "routes/resource/ok/demo.wasm"; // 替换为你的实际 URL
		// eslint-disable-next-line no-undef
		const go = new Go();
		go.importObject.env["syscall/js.finalizeRef"] = () => {
		};

		WebAssembly.instantiate(fs.readFileSync(wasmUrl), go.importObject)
			.then((result) => {
				go.run(result.instance);
			});
	}


	Md5(QQQ0Q0O) {
		return CryptoJS.MD5(QQQ0Q0O).toString();
	}

	QQOQQ0Q(QQQQ0O0, Q0Q000Q) {
		var QO0O000 = CryptoJS.enc.Hex.parse(QQQQ0O0);
		var OO0QQQO = CryptoJS.enc.Base64.stringify(QO0O000);
		QO0OQQQ = Q0Q000Q.substring(0, 16);
		OO0Q000 = Q0Q000Q.substring(16, 32);
		var QO0OQQQ = CryptoJS.enc.Latin1.parse(QO0OQQQ);
		var OO0Q000 = CryptoJS.enc.Latin1.parse(OO0Q000);
		var QOOQO00 = CryptoJS.AES.decrypt(OO0QQQO, QO0OQQQ, {
			"iv": OO0Q000,
			"mode": CryptoJS.mode.CBC,
			"padding": CryptoJS.pad.Pkcs7
		});
		return CryptoJS.enc.Utf8.stringify(QOOQO00);
	}

	UUID = function () {
		var O00O0OO = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
		return function (O0OOOOQ, QO0O00Q) {
			var QOOQO0O = O00O0OO,
				O0O0QOO = [],
				OO0QOO0 = Math.random;
			QO0O00Q = QO0O00Q || QOOQO0O.length;

			if (O0OOOOQ) {
				for (var OO0Q00O = 0; OO0Q00O < O0OOOOQ; OO0Q00O++) O0O0QOO[OO0Q00O] = QOOQO0O[0 | OO0QOO0() * QO0O00Q];
			} else {
				var OQOO0QQ;
				O0O0QOO[8] = O0O0QOO[13] = O0O0QOO[18] = O0O0QOO[23] = "-";
				O0O0QOO[14] = "4";

				for (var OO0Q00O = 0; OO0Q00O < 36; OO0Q00O++) {
					!O0O0QOO[OO0Q00O] && (OQOO0QQ = 0 | OO0QOO0() * 16, O0O0QOO[OO0Q00O] = QOOQO0O[OO0Q00O == 19 ? OQOO0QQ & 3 | 8 : OQOO0QQ & 15]);
				}
			}

			return O0O0QOO.join("");
		};
	}();

	async jx(sourUrl) {
		try {

			// axios 请求
			let url = "https://43.240.74.102:4433/?url=";
			let referer = url + sourUrl;
			let { data: html } = await axios.get(referer);
			// let { data: html } = await axios.get("http://localhost:5500/test.html");

			const pattern = /Content-Type.+id="(.+)".>[\s\S]+"viewport".+id="(.+)".>[\s\S]+var Api = "(.+)"[\s\S]+var Time = "(.+)"[\s\S]+var Vurl = "(.+)";/;
			const match = html.match(pattern);


			const ContentTypeID = match[1]; // 匹配到的字符串
			const viewportID = match[2]; // 匹配到的字符串
			const Api = match[3]; // 匹配到的字符串
			const time = match[4]; // 匹配到的字符串
			const urlCode = match[5]; // 匹配到的字符串

			let uuid  = this.UUID();

			let version = "V3.2";

			let p = {
				"url": urlCode,
				"wap": "0",
				"ios": "0",
				"host": "43.240.74.102",
				"referer": "",
				"time": time
			};

			let params =  global.hxm_encrypt(JSON.stringify(p)).toUpperCase();
			let data = {
				"Params": params
			};

			const proxyData = {
				"url": Api + "/Api.php",
				"requestType":"POST",
				"headers": {
					"x-requested-with": "XMLHttpRequest",
					"Referer": referer,
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0",
					"Origin": "https://43.240.74.102:4433",
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					"Video-Parse-Uuid": uuid,
					"Video-Parse-Time": time,
					"Video-Parse-Version": version,
					"Video-Parse-Sign": global.hxm_encrypt("43.240.74.102" + " | " + uuid + " | " + time + " | " + version + " | " + params).toUpperCase()
				},
				"body": data
			};

			let {data:resData} =   await axios.post( "https://service-ln11u4jm-1251388945.gz.apigw.tencentcs.com/proxy", proxyData,{
				headers: {
					"content-type": "application/json",
				}
			});

			let info = {};
			let QO0OOQQ = ContentTypeID + viewportID;
			QO0OOQQ = QO0OOQQ.replace("viewport", "");

			let OO00QQ0;
			if (resData.Code == 10){
				OO00QQ0 = resData.Code + QO0OOQQ + resData.Appkey + resData.Version;
			}else {
				OO00QQ0 = resData.Code + resData.Appkey + resData.Version;
			}

			let QO0QQOQ = this.QQOQQ0Q(resData.Data, this.Md5(OO00QQ0));
			info = JSON.parse(QO0QQOQ);

			let urlL;
			if (resData.Code == 10){
				urlL = global.hxm_decrypt(info.url);
			}else {
				// urlL = info.url;
				urlL = "http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8";
				console.warn("解析失败:" + referer);
			}

			info.url = decodeURIComponent(urlL);

			console.info("解析成功:" + referer + "  info:" + info.url);

			// 优化权限
			// if (info.url.indexOf(this.Domain)){
			// 	let {data:resData} =   await axios.post( "https://service-ln11u4jm-1251388945.gz.apigw.tencentcs.com/proxy", proxyData,{
			// 		headers: {
			// 			"content-type": "application/json",
			// 		}
			// 	});
			// }


			return  {
				"code": 0,
				"msg": "ok",
				"url": info.url,
				"resCode": resData.Code,
			};
		}catch (e) {
			console.warn("解析异常:" ,e);
			return  {
				"code": 1,
				"msg": "解析错误",
			};
		}
	}

}
if (require.main === module) {
	// 测试
	let ok = new Okjx();
	console.log(ok.jx("https://www.mgtv.com/b/510924/18030372.html?cxid=vb4rv4jhk"));
}else {
	module.exports = Okjx;
}
