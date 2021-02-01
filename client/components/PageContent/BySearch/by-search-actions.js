import * as constants from "./by-search-constants";

export const fetchDiscBySearchBestSeller = payload =>
	constants.getDiscBySearchBestSeller.request(payload);

export const fetchDiscBySearchBestSellerKeywordDetail = payload =>
	constants.getDiscBySearchBestSellerKeywordDetail.request(payload);

export const fetchBySearchKeywordsTableData = payload =>
	payload.brandCompareView
		? constants.getBySearchBrandCompareKeywordsTableData.request(payload)
		: constants.getBySearchKeywordsTableData.request(payload);

export const fetchBySearchOverallScore = payload =>
	payload.brandCompareView
		? constants.getDiscBySearchBrandCompareOverallScore.request(payload)
		: constants.getDiscBySearchOverallScore.request(payload);
