import * as constants from "./price-promotion-constants";
import { REQUEST, SUCCESS, ERROR } from "../../../constants/actions";

const defaultState = {
	overallScore: {
		fetching: null,
		error: null,
		data: null
	},
	bestSeller: {
		fetching: null,
		error: null,
		data: null
	},
	promotionCountAndTypes: {
		fetching: null,
		error: null,
		data: null
	},
	brandLevelScore: {
		fetching: null,
		error: null,
		data: null
	},
	promotionCountBrandCompare: {
		fetching: null,
		error: null,
		data: null
	}
};

const pricePromotionScoreReducer = (state = defaultState, action) => {
	switch (action.type) {
		case constants.GET_PRICE_PROMOTION_OVERALL_SCORE[REQUEST]:
		case constants.GET_PRICE_PROMOTION_BRAND_COMPARE_OVERALL_SCORE[REQUEST]:
			return {
				...state,
				overallScore: { fetching: true, error: null, data: null }
			};

		case constants.GET_PRICE_PROMOTION_OVERALL_SCORE[SUCCESS]:
		case constants.GET_PRICE_PROMOTION_BRAND_COMPARE_OVERALL_SCORE[SUCCESS]:
			return {
				...state,
				overallScore: { fetching: false, error: null, data: action.response }
			};
		case constants.GET_PRICE_PROMOTION_OVERALL_SCORE[ERROR]:
		case constants.GET_PRICE_PROMOTION_BRAND_COMPARE_OVERALL_SCORE[ERROR]:
			return {
				...state,
				overallScore: { fetching: false, error: action.response, data: null }
			};

		case constants.GET_PRICE_BEST_SELLER[REQUEST]:
			return {
				...state,
				bestSeller: { fetching: true, error: null, data: null }
			};

		case constants.GET_PRICE_BEST_SELLER[SUCCESS]:
			return {
				...state,
				bestSeller: { fetching: false, error: null, data: action.response }
			};

		case constants.GET_PRICE_BEST_SELLER[ERROR]:
			return {
				...state,
				bestSeller: { fetching: false, error: action.response, data: null }
			};
		case constants.GET_PROMOTION_BEST_SELLER[REQUEST]:
			return {
				...state,
				bestSeller: { fetching: true, error: null, data: null }
			};
		case constants.GET_PRICE_AND_PROMOTION_BRAND_LEVEL_SCORES[REQUEST]:
			return {
				...state,
				brandLevelScore: { fetching: true, error: null, data: null }
			};

		case constants.GET_PRICE_AND_PROMOTION_BRAND_LEVEL_SCORES[SUCCESS]:
			return {
				...state,
				brandLevelScore: { fetching: false, error: null, data: action.response }
			};

		case constants.GET_PRICE_AND_PROMOTION_BRAND_LEVEL_SCORES[ERROR]:
			return {
				...state,
				brandLevelScore: { fetching: false, error: action.response, data: null }
			};
		case constants.GET_PROMOTION_BEST_SELLER[SUCCESS]:
			return {
				...state,
				bestSeller: { fetching: false, error: null, data: action.response }
			};

		case constants.GET_PROMOTION_BEST_SELLER[ERROR]:
			return {
				...state,
				bestSeller: { fetching: false, error: action.response, data: null }
			};

		case constants.GET_PROMOTION_COUNT_AND_TYPE[REQUEST]:
			return {
				...state,
				promotionCountAndTypes: { fetching: true, error: null, data: null }
			};
		case constants.GET_PROMOTION_COUNT_AND_TYPE[SUCCESS]:
			return {
				...state,
				promotionCountAndTypes: {
					fetching: false,
					error: null,
					data: action.response
				}
			};
		case constants.GET_PROMOTION_COUNT_AND_TYPE[ERROR]:
			return {
				...state,
				promotionCountAndTypes: {
					fetching: false,
					error: action.response,
					data: null
				}
			};
		case constants.GET_PRICE_AND_PROMOTION_COUNT_BRAND_COMPARE[REQUEST]:
			return {
				...state,
				promotionCountBrandCompare: { fetching: true, error: null, data: null }
			};
		case constants.GET_PRICE_AND_PROMOTION_COUNT_BRAND_COMPARE[SUCCESS]:
			return {
				...state,
				promotionCountBrandCompare: {
					fetching: false,
					error: null,
					data: action.response
				}
			};
		case constants.GET_PRICE_AND_PROMOTION_COUNT_BRAND_COMPARE[ERROR]:
			return {
				...state,
				promotionCountBrandCompare: {
					fetching: false,
					error: action.response,
					data: null
				}
			};
		default:
			return state;
	}
};

export default pricePromotionScoreReducer;
