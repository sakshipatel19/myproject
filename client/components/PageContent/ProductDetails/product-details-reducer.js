import * as constants from "./product-details-constants";
import { REQUEST, SUCCESS, ERROR } from "../../../constants/actions";

const defaultState = {
	productInfo: {
		fetching: null,
		error: null,
		data: null
	},
	overallScore: {
		fetching: null,
		error: null,
		data: null
	},
	asinOverallScore: {
		fetching: null,
		error: null,
		data: null
	}
};

const productDetailsReducer = (state = defaultState, action) => {
	switch (action.type) {
		case constants.GET_PRODUCT_DETAILS_IN_ASIN_LANDING_PAGE[REQUEST]:
			return {
				...state,
				productInfo: { fetching: true, error: null, data: null }
			};

		case constants.GET_PRODUCT_DETAILS_IN_ASIN_LANDING_PAGE[SUCCESS]:
			return {
				...state,
				productInfo: { fetching: false, error: null, data: action.response }
			};

		case constants.GET_PRODUCT_DETAILS_IN_ASIN_LANDING_PAGE[ERROR]:
			return {
				...state,
				productInfo: { fetching: false, error: action.response, data: null }
			};
		case constants.GET_ASIN_OVERALL_SCORE[REQUEST]:
		case constants.GET_ASIN_BRAND_COMPARE_OVERALL_SCORE[REQUEST]:
			return {
				...state,
				asinOverallScore: { fetching: true, error: null, data: null }
			};

		case constants.GET_ASIN_OVERALL_SCORE[SUCCESS]:
		case constants.GET_ASIN_BRAND_COMPARE_OVERALL_SCORE[SUCCESS]:
			return {
				...state,
				asinOverallScore: {
					fetching: false,
					error: null,
					data: action.response
				}
			};
		case constants.GET_ASIN_OVERALL_SCORE[ERROR]:
		case constants.GET_ASIN_BRAND_COMPARE_OVERALL_SCORE[ERROR]:
			return {
				...state,
				asinOverallScore: {
					fetching: false,
					error: action.response,
					data: null
				}
			};

		case constants.GET_PRODUCT_DETAILS_OVERALL_SCORE[REQUEST]:
		case constants.GET_PRODUCT_DETAILS_COMPARE_OVERALL_SCORE[REQUEST]:
			return {
				...state,
				overallScore: { fetching: true, error: null, data: null }
			};

		case constants.GET_PRODUCT_DETAILS_OVERALL_SCORE[SUCCESS]:
		case constants.GET_PRODUCT_DETAILS_COMPARE_OVERALL_SCORE[SUCCESS]:
			return {
				...state,
				overallScore: { fetching: false, error: null, data: action.response }
			};

		case constants.GET_PRODUCT_DETAILS_OVERALL_SCORE[ERROR]:
		case constants.GET_PRODUCT_DETAILS_COMPARE_OVERALL_SCORE[ERROR]:
			return {
				...state,
				overallScore: { fetching: false, error: action.response, data: null }
			};

		default:
			return state;
	}
};

export default productDetailsReducer;
