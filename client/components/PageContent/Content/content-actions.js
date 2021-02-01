import * as constants from "./content-constants";

export const fetchBestSellers = payload =>
	constants.getBestSeller.request(payload);

export const fetchContentCatalogHealth = payload =>
	constants.getContentCatalogHealth.request(payload);

export const fetchContentBrandsScore = payload =>
	constants.getContentBrandScore.request(payload);

export const fetchContentAttributes = payload =>
	payload.brandCompareView
		? constants.getContentBrandCompareAttributes.request(payload)
		: constants.getContentAttributes.request(payload);

export const fetchOverallContentScore = payload =>
	payload.brandCompareView
		? constants.getContentBrandCompareOverallScore.request(payload)
		: constants.getContentOverallScore.request(payload);

export const fetchContentCatalogueHealthTabs = payload =>
	constants.getCatalogueHealthTab.request(payload);

export const fetchContentCatalogueHealthTable = payload =>
	constants.getCatalogueHealthTable.request(payload);

export const fetchContentBrandCompareOverallScore = payload =>
	constants.getContentBrandCompareOverallScore.request(payload);

export const exportContentCatalogHealthTable = payload =>
	constants.exportContentCatalogHealthTable.request(payload);

export const exportContentOverallScore = payload =>
	constants.exportContentOverallScore.request(payload);
