import {
	createActions,
	createActionConstants
} from "../../../constants/actions";

export const GET_PRICE_PROMOTION_OVERALL_SCORE = createActionConstants(
	"GET_PRICE_PROMOTION_OVERALL_SCORE"
);

export const getPricePromotionOverallScore = createActions(
	GET_PRICE_PROMOTION_OVERALL_SCORE
);

export const GET_PRICE_BEST_SELLER = createActionConstants(
	"GET_PRICE_BEST_SELLER"
);

export const getPriceBestSeller = createActions(GET_PRICE_BEST_SELLER);

export const GET_PROMOTION_BEST_SELLER = createActionConstants(
	"GET_PROMOTION_BEST_SELLER"
);

export const getPromotionBestSeller = createActions(GET_PROMOTION_BEST_SELLER);

export const GET_PROMOTION_COUNT_AND_TYPE = createActionConstants(
	"GET_PROMOTION_COUNT_AND_TYPE"
);

export const getPromotionCountAndType = createActions(
	GET_PROMOTION_COUNT_AND_TYPE
);
export const GET_PRICE_AND_PROMOTION_BRAND_LEVEL_SCORES = createActionConstants(
	"GET_PRICE_AND_PROMOTION_BRAND_LEVEL_SCORES"
);

export const getBrandLevelScores = createActions(
	GET_PRICE_AND_PROMOTION_BRAND_LEVEL_SCORES
);

export const GET_PRICE_PROMOTION_BRAND_COMPARE_OVERALL_SCORE = createActionConstants(
	"GET_PRICE_PROMOTION_BRAND_COMPARE_OVERALL_SCORE"
);

export const getPricePromotionBrandCompareScore = createActions(
	GET_PRICE_PROMOTION_BRAND_COMPARE_OVERALL_SCORE
);
export const GET_PRICE_AND_PROMOTION_COUNT_BRAND_COMPARE = createActionConstants(
	"GET_PRICE_AND_PROMOTION_COUNT_BRAND_COMPARE"
);

export const getPromotionCountBrandCompare = createActions(
	GET_PRICE_AND_PROMOTION_COUNT_BRAND_COMPARE
);
