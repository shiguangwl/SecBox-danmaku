const express = require("express");
const axios = require("axios");
const router = express.Router();


/* GET home page. */
router.get("/", async function (req, res) {
	res.render("danmaku");
});


// router.post("/proxy", async (req, res) => {
// 	try {
// 		const { url, requestType, headers, body } = req.body;
//
// 		const options = {
// 			method: requestType,
// 			headers: headers,
// 		};
//
// 		if (body) {
// 			options.data = body;
// 		}
//
// 		const response = await axios(url, options);
//
// 		// res.set(response.headers);
// 		res.send(response.data);
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// });


module.exports = router;
