import * as constants from "./AsinCompare-constants";
import { REQUEST, SUCCESS, ERROR } from "../../../constants/actions";

const defaultState = {
	clientBrandsList: { fetching: null, error: null, data: null },
	competitorBrandsList: { fetching: null, error: null, data: null },
	topsellerBrandsList: { fetching: null, error: null, data: null }
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case constants.GET_CLIENT_BRANDS_LIST[REQUEST]:
			return {
				...state,
				clientBrandsList: { fetching: true, error: null, data: null }
			};
		case constants.GET_CLIENT_BRANDS_LIST[SUCCESS]:
			return {
				...state,
				clientBrandsList: {
					fetching: false,
					error: null,
					data: action.response
				}
			};

		case constants.GET_CLIENT_BRANDS_LIST[ERROR]:
			return {
				...state,
				clientBrandsList: {
					fetching: false,
					error: action.response,
					data: null
				}
			};

		case constants.GET_COMPETITOR_BRANDS_LIST[REQUEST]:
			return {
				...state,
				competitorBrandsList: { fetching: true, error: null, data: null }
			};
		case constants.GET_COMPETITOR_BRANDS_LIST[SUCCESS]:
			return {
				...state,
				competitorBrandsList: {
					fetching: false,
					error: null,
					data: action.response
				}
			};

		case constants.GET_COMPETITOR_BRANDS_LIST[ERROR]:
			return {
				...state,
				competitorBrandsList: {
					fetching: false,
					error: action.response,
					data: null
				}
			};

		case constants.GET_TOPSELLER_BRANDS_LIST[REQUEST]:
			return {
				...state,
				topsellerBrandsList: { fetching: true, error: null, data: null }
			};
		case constants.GET_TOPSELLER_BRANDS_LIST[SUCCESS]:
			return {
				...state,
				topsellerBrandsList: {
					fetching: false,
					error: null,
					data: action.response
				}
			};

		case constants.GET_TOPSELLER_BRANDS_LIST[ERROR]:
			return {
				...state,
				topsellerBrandsList: {
					fetching: false,
					error: action.response,
					data: null
				}
			};

		case constants.CLEAR_COMPETITOR_BRAND_LIST:
			return {
				...state,
				competitorBrandsList: {
					fetching: false,
					error: null,
					data: null
				}
			};

		case constants.CLEAR_TOPSELLER_BRAND_LIST:
			return {
				...state,
				topsellerBrandsList: {
					fetching: false,
					error: null,
					data: null
				}
			};
		default:
			return { ...state };
	}
};
