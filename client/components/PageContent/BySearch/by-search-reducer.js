import * as constants from "./by-search-constants";
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
	bestSellerDetail: {
		fetching: null,
		error: null,
		data: null
	},
	keywordsTable: {
		fetching: true,
		error: null,
		data: null
	}
};

const reducer = (state = defaultState, action) => {
	switch (action.type) {
		case constants.GET_DISC_BY_SEARCH_BEST_SELLER[REQUEST]:
			return {
				...state,
				bestSeller: { fetching: true, error: null, data: null }
			};

		case constants.GET_DISC_BY_SEARCH_BEST_SELLER[SUCCESS]:
			return {
				...state,
				bestSeller: { fetching: false, error: null, data: action.response }
			};

		case constants.GET_DISC_BY_SEARCH_BEST_SELLER[ERROR]:
			return {
				...state,
				bestSeller: { fetching: false, error: action.response, data: null }
			};
		case constants.GET_DISC_BY_SEARCH_BEST_SELLER_KEYWORD_DETAIL[REQUEST]:
			return {
				...state,
				bestSellerDetail: { fetching: true, error: null, data: null }
			};

		case constants.GET_DISC_BY_SEARCH_BEST_SELLER_KEYWORD_DETAIL[SUCCESS]:
			return {
				...state,
				bestSellerDetail: {
					fetching: false,
					error: null,
					data: action.response
				}
			};

		case constants.GET_DISC_BY_SEARCH_BEST_SELLER_KEYWORD_DETAIL[ERROR]:
			return {
				...state,
				bestSellerDetail: {
					fetching: false,
					error: action.response,
					data: null
				}
			};
		case constants.GET_BY_SEARCH_KEYWORDS_TABLE_DATA[REQUEST]:
		case constants.GET_BY_SEARCH_BRAND_COMPARE_KEYWORDS_TABLE_DATA[REQUEST]:
			return {
				...state,
				keywordsTable: { fetching: true, error: null, data: null }
			};

		case constants.GET_BY_SEARCH_KEYWORDS_TABLE_DATA[SUCCESS]:
		case constants.GET_BY_SEARCH_BRAND_COMPARE_KEYWORDS_TABLE_DATA[SUCCESS]:
			return {
				...state,
				keywordsTable: { fetching: false, error: null, data: action.response }
			};

		case constants.GET_BY_SEARCH_KEYWORDS_TABLE_DATA[ERROR]:
		case constants.GET_BY_SEARCH_BRAND_COMPARE_KEYWORDS_TABLE_DATA[ERROR]:
			return {
				...state,
				keywordsTable: { fetching: false, error: action.response, data: null }
			};
		case constants.GET_DISC_BY_SEARCH_OVERALL_SCORE[REQUEST]:
		case constants.GET_DISC_BY_SEARCH_BRAND_COMPARE_OVERALL_SCORE[REQUEST]:
			return {
				...state,
				overallScore: { fetching: true, error: null, data: null }
			};

		case constants.GET_DISC_BY_SEARCH_OVERALL_SCORE[SUCCESS]:
		case constants.GET_DISC_BY_SEARCH_BRAND_COMPARE_OVERALL_SCORE[SUCCESS]:
			return {
				...state,
				overallScore: { fetching: false, error: null, data: action.response }
			};
		case constants.GET_DISC_BY_SEARCH_OVERALL_SCORE[ERROR]:
		case constants.GET_DISC_BY_SEARCH_BRAND_COMPARE_OVERALL_SCORE[ERROR]:
			return {
				...state,
				overallScore: { fetching: false, error: action.response, data: null }
			};
	}
	return state;
};

export default reducer;
