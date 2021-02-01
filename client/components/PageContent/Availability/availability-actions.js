import * as constants from "./availability-constants";

export const fetchAvailibilityOverallScore = payload =>
	payload.brandCompareView
		? constants.getAvailabilityBrandCompareOverallScore.request(payload)
		: constants.getAvailabilityOverallScore.request(payload);

export const fetchAvailabilityBestSellers = payload =>
	constants.getBestSeller.request(payload);

export const fetchAvailabilityCatalogHealth = payload =>
	constants.getAvailabilityCatalogHealth.request(payload);

export const fetchAvailabilityLostBuyBox = payload =>
	constants.getAvailabilityLostBuyBox.request(payload);

export const fetchAvailabilityBrandScore = payload =>
	constants.getAvailabilityBrandScore.request(payload);

export const fetchAvailabilityCatalogueHealthTabs = payload =>
	constants.getAvailabilityCatalogueHealthTab.request(payload);

export const fetchAvailabilityCatalogueHealthTable = payload =>
	constants.getAvailabilityCatalogueHealthTable.request(payload);

export const fetchAvailabilityLostBuyBoxDetails = payload =>
	constants.getAvailabilityLostBuyBoxDetails.request(payload);
