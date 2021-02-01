const axios = require("axios");
const { requestHeaders } = require("./common");

module.exports.callBackendApi = function(app, proxyUrl, actualUrl, isExport) {
	app.post(proxyUrl, (req, res) => {
		axios
			.post(actualUrl, req.body, requestHeaders(req.headers.authorization))
			.then(response => {
				if (isExport) {
					res.setHeader(
						"content-type",
						response.headers["content-type"] || "application/octet-stream"
					);
					res.setHeader(
						"content-disposition",
						response.headers["content-disposition"] || "attachment"
					);

					res.send(response.data);
					return;
				}

				res.json(response.data);
			})
			.catch(err => {
				console.log(JSON.stringify(err));
				console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
				res.status(err.response.status).json(err.response.data);
			})
			.catch(err => {
				console.log(JSON.stringify(err));
				console.log("===================================");
				res.status(500).json(err);
			});
	});
};
