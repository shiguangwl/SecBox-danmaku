const urlmodule = require("url");
const axios = require("axios");

function Bilibili() {
	this.name = "B站";
	this.domain = "bilibili.com";
	this.example_urls = [
		"https://www.bilibili.com/video/av170001",
		"https://www.bilibili.com/video/av170001?p=2",
		"https://www.bilibili.com/video/BV17x411w7KC?p=3",
		"https://www.bilibili.com/bangumi/play/ep691614"
	];

	this.resolve = async (url) => {
		// 相关API
		const api_video_info = "https://api.bilibili.com/x/web-interface/view";
		const api_epid_cid = "https://api.bilibili.com/pgc/view/web/season";
		const q = urlmodule.parse(url, true);
		const path = q.pathname.split("/");
		// 普通投稿视频
		if (url.indexOf("video/") !== -1) {
			// 获取视频分P信息
			const p = q.query.p || 1;
			// 判断是否为旧版av号
			let params;
			if (url.indexOf("BV") !== -1) {
				params = {"bvid": path[2]};
			} else {
				params = {"aid": path[2].substring(2)};
			}
			const response = await axios.get(api_video_info, {params});
			if (response.data.code !== 0) {
				this.error_msg = "获取普通投稿视频信息失败！"+response.data.message;
				return;
			}
			this.title = response.data.data.title;
			const subtitle = response.data.data.pages[p - 1].part;
			this.title = this.title + "-" + subtitle;
			const cid = response.data.data.pages[p - 1].cid;
			return [`https://comment.bilibili.com/${cid}.xml`];
		} // 番剧
		else if (url.indexOf("bangumi/") !== -1 && url.indexOf("ep") !== -1) {
			const epid = path.slice(-1)[0];
			const params = {"ep_id": epid.slice(2)};
			const response = await axios.get(api_epid_cid, {params});
			if (response.data.code !== 0) {
				this.error_msg = "获取番剧视频信息失败！";
				return;
			}
			for (let i = 0; i < response.data.result.episodes.length; i++) {
				if (response.data.result.episodes[i].id == params.ep_id) {
					this.title = response.data.result.episodes[i].share_copy;
					const cid = response.data.result.episodes[i].cid;
					return [`https://comment.bilibili.com/${cid}.xml`];
				}
			}
		} else {
			this.error_msg = "不支持的B站视频网址，仅支持普通视频(av,bv)、剧集视频(ep)";
		}

	};

	this.work = async (url) => {
		const urls = await this.resolve(url);
		if (!this.error_msg) {
			this.url = urls[0];
		}
		return {
			title: this.title,
			url: this.url,
			msg: this.error_msg? this.error_msg: "ok"
		};
	};
}

module.exports = Bilibili;

if(!module.parent) {
	const b = new Bilibili();
	b.work(b.example_urls[0]).then(() => {
		console.log(b.content);
		console.log(b.title);
	});
}
