const { endpoints, exportEndPoints } = require("./endpoints");
const serviceModule = require("./serviceModule");
const { SVC_ENDPOINT } = require("./common");

module.exports = function(app) {
	Object.keys(endpoints).map(endpoint => {
		serviceModule.callBackendApi(
			app,
			`/api${endpoints[endpoint]}`,
			`${SVC_ENDPOINT}${endpoints[endpoint]}`
		);
	});

	Object.keys(exportEndPoints).map(endpoint => {
		serviceModule.callBackendApi(
			app,
			`/api${exportEndPoints[endpoint]}`,
			`${SVC_ENDPOINT}${exportEndPoints[endpoint]}`,
			true
		);
	});
	console.log("All routes registered");
};
