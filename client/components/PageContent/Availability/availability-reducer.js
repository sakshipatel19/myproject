import * as constants from "./availability-constants";
import { REQUEST, SUCCESS, ERROR } from "../../../constants/actions";

const defaultState = {
	overallScore: {
		fetching: null,
		error: null,
		data: null
	},
	brandsScore: {
		fetching: null,
		error: null,
		data: null
	},
	bestSeller: {
		fetching: null,
		error: null,
		data: null
	},
	bestSellerFilter: {
		selectedBrand: "",
		selectedCategory: ""
	},
	catalogHealth: {
		fetching: null,
		error: null,
		data: null
	},
	lostBuyBox: {
		fetching: null,
		error: null,
		data: null
	},
	catalogHealthTableData: {
		fetching: null,
		error: null,
		data: null
	},
	catalogHealthTabData: {
		fetching: null,
		error: null,
		data: null
	}
};

const reducer = (state = defaultState, action) => {
	switch (action.type) {
		case constants.GET_AVAILABILITY_OVERALL_SCORE[REQUEST]:
		case constants.GET_AVAILABILITY_BRAND_COMPARE_OVERALL_SCORE[REQUEST]:
			return {
				...state,
				overallScore: { fetching: true, error: null, data: null }
			};

		case constants.GET_AVAILABILITY_OVERALL_SCORE[SUCCESS]:
		case constants.GET_AVAILABILITY_BRAND_COMPARE_OVERALL_SCORE[SUCCESS]:
			return {
				...state,
				overallScore: { fetching: false, error: null, data: action.response }
			};

		case constants.GET_AVAILABILITY_OVERALL_SCORE[ERROR]:
		case constants.GET_AVAILABILITY_BRAND_COMPARE_OVERALL_SCORE[ERROR]:
			return {
				...state,
				overallScore: { fetching: false, error: action.response, data: null }
			};

		case constants.GET_AVAILABILITY_BEST_SELLER[REQUEST]:
			return {
				...state,
				bestSeller: { fetching: true, error: null, data: null }
			};

		case constants.GET_AVAILABILITY_BEST_SELLER[SUCCESS]:
			return {
				...state,
				bestSeller: { fetching: false, error: null, data: action.response }
			};

		case constants.GET_AVAILABILITY_BEST_SELLER[ERROR]:
			return {
				...state,
				bestSeller: { fetching: false, error: action.response, data: null }
			};
		case constants.GET_AVAILABILITY_CATALOG_HEALTH[REQUEST]:
			return {
				...state,
				catalogHealth: { fetching: true, error: null, data: null }
			};

		case constants.GET_AVAILABILITY_CATALOG_HEALTH[SUCCESS]:
			return {
				...state,
				catalogHealth: { fetching: false, error: null, data: action.response }
			};

		case constants.GET_AVAILABILITY_CATALOG_HEALTH[ERROR]:
			return {
				...state,
				catalogHealth: { fetching: false, error: action.response, data: null }
			};

		case constants.GET_AVAILABILITY_LOST_BUY_BOX[REQUEST]:
			return {
				...state,
				lostBuyBox: { fetching: true, error: null, data: null }
			};

		case constants.GET_AVAILABILITY_LOST_BUY_BOX[SUCCESS]:
			return {
				...state,
				lostBuyBox: { fetching: false, error: null, data: action.response }
			};

		case constants.GET_AVAILABILITY_LOST_BUY_BOX[ERROR]:
			return {
				...state,
				lostBuyBox: { fetching: false, error: action.response, data: null }
			};

		case constants.GET_AVAILABILITY_BRAND_SCORE[REQUEST]:
			return {
				...state,
				brandsScore: { fetching: true, error: null, data: null }
			};

		case constants.GET_AVAILABILITY_BRAND_SCORE[SUCCESS]:
			return {
				...state,
				brandsScore: { fetching: false, error: null, data: action.response }
			};

		case constants.GET_AVAILABILITY_BRAND_SCORE[ERROR]:
			return {
				...state,
				brandsScore: { fetching: false, error: action.response, data: null }
			};
		case constants.GET_AVAILABILITY_CATALOGUE_HEALTH_TABLE[REQUEST]:
			return {
				...state,
				catalogHealthTableData: { fetching: true, error: null, data: null }
			};

		case constants.GET_AVAILABILITY_CATALOGUE_HEALTH_TABLE[SUCCESS]:
			return {
				...state,
				catalogHealthTableData: {
					fetching: false,
					error: null,
					data: action.response
				}
			};

		case constants.GET_AVAILABILITY_CATALOGUE_HEALTH_TABLE[ERROR]:
			return {
				...state,
				catalogHealthTableData: {
					fetching: false,
					error: action.response,
					data: null
				}
			};
		case constants.GET_AVAILABILITY_CATALOGUE_HEALTH_TAB[REQUEST]:
			return {
				...state,
				catalogHealthTabData: { ...state.tabData, fetching: true, error: null }
			};
		case constants.GET_AVAILABILITY_CATALOGUE_HEALTH_TAB[SUCCESS]:
			return {
				...state,
				catalogHealthTabData: {
					fetching: false,
					error: null,
					data: action.response
				}
			};
		case constants.GET_AVAILABILITY_CATALOGUE_HEALTH_TAB[ERROR]:
			return {
				...state,
				catalogHealthTabData: {
					fetching: false,
					error: action.response,
					data: null
				}
			};
		case constants.GET_AVAILABILITY_LOST_BUY_BOX_DETAILS[REQUEST]:
			return {
				...state,
				lostBuyBoxDetails: {
					fetching: true,
					error: null,
					data: null
				}
			};
		case constants.GET_AVAILABILITY_LOST_BUY_BOX_DETAILS[SUCCESS]:
			return {
				...state,
				lostBuyBoxDetails: {
					fetching: false,
					error: null,
					data: action.response
				}
			};
		case constants.GET_AVAILABILITY_LOST_BUY_BOX_DETAILS[ERROR]:
			return {
				...state,
				lostBuyBoxDetails: {
					fetching: false,
					error: action.response,
					data: null
				}
			};
	}

	return state;
};

export default reducer;
