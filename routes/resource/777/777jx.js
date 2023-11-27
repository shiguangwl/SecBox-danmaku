require("./wasm_exec");
const axios = require("axios");
const fs = require("fs");
const memory = require("../../../utils/memory");
// const wasmUrl = "./main7.wasm";
const wasmUrl = "routes/resource/777/main7.wasm";
const wasmFile = fs.readFileSync(wasmUrl);

const go = new Go();
go.importObject.env["syscall/js.finalizeRef"] = () => {
};

class Qiqijx {
	constructor() {
		let document = {};
		document.location = {
			"ancestorOrigins": {},
			"href": "",
			"origin": "https://jx.jsonplayer.com",
			"protocol": "https:",
			"host": "jx.jsonplayer.com",
			"hostname": "jx.jsonplayer.com",
			"port": "",
			"pathname": "/player/",
			"search": "",
			"hash": ""
		};

		global.document = document;
		global.window = {
			"document": document,
		};

		global.window.location = document.location;
		global.location = document.location;

	}

	generateRandomString(length) {
		var result = "";
		var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		var charactersLength = characters.length;
		for (var i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

	async jx(url) {

		global.document.location.href = "https://jx.jsonplayer.com/player/?url=" + url;
		global.document.location.search = "?url=" + url;
		global.window.toStatus = function () {
			return JSON.stringify({
				"url": "https://jx.jsonplayer.com/player/?url=" + url,
				"fingerprint": "d76c0a4c"
			});
		};

		let result = await WebAssembly.instantiate(wasmFile, go.importObject);

		go.run(result.instance);

		let p = {
			"domain": "jx.jsonplayer.com",
			"url": url,
			"referrer": "jx.jsonplayer.com",
			"s": 0,
			"f": 0
		};

		let codeString = encrypt(JSON.stringify(p));
		// console.debug("加密结果:",codeString);

		let { data } = await axios.post("https://service-ln11u4jm-1251388945.gz.apigw.tencentcs.com/proxy", {
			"url": "https://110.42.2.247:9090/xplayer/api.php",
			"requestType": "POST",
			"headers": {},
			"body": { "params": encodeURIComponent(codeString) }
		}, {
			headers: {
				"content-type": "application/json",
			}
		});

		//
		// let { data } = await axios.post("https://110.42.2.247:9090/xplayer/api.php", { "params": encodeURIComponent(codeString)});

		data.url = decrypt(data.url);

		return data;
		// console.log(await axios.get(data.url,{
		// 	redirect: "manual"
		// }));

	}
}

if (require.main === module) {

	// 测试耗时
	const startTime = process.hrtime();
	memory();
	for (let i = 0; i < 1; i++) {
		// 测试
		const test = new Qiqijx();

		test.jx("https://v.qq.com/x/cover/mcv8hkc8zk8lnov.html")
			.then((data) => {
				console.log(data);
			});
	}
	memory();
	const endTime = process.hrtime(startTime);

	console.log("Execution time:", endTime[0] * 1e3 + endTime[1] / 1e6, "ms");
} else {
	module.exports = Qiqijx;
}
