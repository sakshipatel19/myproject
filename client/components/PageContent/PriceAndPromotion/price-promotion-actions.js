import * as constants from "./price-promotion-constants";

export const fetchOverallPricePromotionScore = payload =>
	payload.brandCompareView
		? constants.getPricePromotionBrandCompareScore.request(payload)
		: constants.getPricePromotionOverallScore.request(payload);

export const fetchPriceBestSellers = payload =>
	constants.getPriceBestSeller.request(payload);

export const fetchPromotionBestSellers = payload =>
	constants.getPromotionBestSeller.request(payload);

export const fetchPromotionCountAndType = payload =>
	constants.getPromotionCountAndType.request(payload);

export const fetchPriceAndPromotionBrandLevelScores = payload =>
	constants.getBrandLevelScores.request(payload);

export const fetchPromotionCountBrandCompare = payload =>
	constants.getPromotionCountBrandCompare.request(payload);
