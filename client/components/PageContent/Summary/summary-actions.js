import * as constants from "./summary-constants";

export const fetchSummaryOverallScore = payload =>
	payload.brandCompareView
		? constants.getSummaryBrandCompareOverallScore.request(payload)
		: constants.getSummaryOverallScore.request(payload);
export const fetchSummaryAttributeScore = payload =>
	payload.brandCompareView
		? constants.getSummaryCompareAttributeScore.request(payload)
		: constants.getSummaryAttributeScore.request(payload);
