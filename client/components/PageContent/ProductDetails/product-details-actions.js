import * as constants from "./product-details-constants";

export const fetchProductDetails = payload =>
	constants.getProductDetailsInAsinLandingPage.request(payload);

export const fetchAsinOverallScore = payload =>
	payload.asinCompareView
		? constants.getAsinBrandCompareOverallScore.request(payload)
		: constants.getAsinOverallScore.request(payload);

export const fetchProductDetailsOverallScore = payload =>
	payload.asinCompareView
		? constants.getProductDetailsCompareOverallScore.request(payload) :
		constants.getProductDetailsOverallScore.request(payload);
