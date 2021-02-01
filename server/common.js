const SVC_ENDPOINT =
	process.env.MICROSERVICE_URL || "https://dev11.commerceintelligence.ai";
// const SVC_ENDPOINT = "https://dev1.commerceintelligence.ai";
// const SVC_ENDPOINT = "https://uat1.commerceintelligence.ai";

const requestHeaders = authToken => {
	return {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json, */*",
			Authorization: authToken
		}
	};
};

module.exports = {
	SVC_ENDPOINT: SVC_ENDPOINT,
	requestHeaders: requestHeaders
};
