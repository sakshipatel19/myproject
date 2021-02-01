import * as constants from "./content-constants";
import { REQUEST, SUCCESS, ERROR } from "../../../constants/actions";

const defaultState = {
	overallScore: {
		fetching: null,
		error: null,
		data: null
	},
	attributesScore: {
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
	catalogHealthTableData: {
		fetching: null,
		error: null,
		data: null
	},
	catalogHealthTabData: {
		fetching: null,
		error: null,
		data: null
	},
	catalogHelathTableExport: {
		fetching: null,
		error: null
	},
	overallScoreExportData: {
		fetching: null,
		error: null
	}
};

const contentScoreReducer = (state = defaultState, action) => {
	switch (action.type) {
		case constants.GET_CONTENT_BEST_SELLER[REQUEST]:
			return {
				...state,
				bestSeller: { fetching: true, error: null, data: null }
			};

		case constants.GET_CONTENT_BEST_SELLER[SUCCESS]:
			return {
				...state,
				bestSeller: { fetching: false, error: null, data: action.response }
			};

		case constants.GET_CONTENT_BEST_SELLER[ERROR]:
			return {
				...state,
				bestSeller: { fetching: false, error: action.response, data: null }
			};

		case constants.GET_CONTENT_CATALOG_HEALTH[REQUEST]:
			return {
				...state,
				catalogHealth: { fetching: true, error: null, data: null }
			};

		case constants.GET_CONTENT_CATALOG_HEALTH[SUCCESS]:
			return {
				...state,
				catalogHealth: { fetching: false, error: null, data: action.response }
			};

		case constants.GET_CONTENT_CATALOG_HEALTH[ERROR]:
			return {
				...state,
				catalogHealth: { fetching: false, error: action.response, data: null }
			};
		case constants.GET_CONTENT_BRANDS_SCORE[REQUEST]:
			return {
				...state,
				brandsScore: { fetching: true, error: null, data: null }
			};

		case constants.GET_CONTENT_BRANDS_SCORE[SUCCESS]:
			return {
				...state,
				brandsScore: { fetching: false, error: null, data: action.response }
			};

		case constants.GET_CONTENT_BRANDS_SCORE[ERROR]:
			return {
				...state,
				brandsScore: { fetching: false, error: action.response, data: null }
			};
		case constants.GET_CONTENT_ATTRIBUTES[REQUEST]:
		case constants.GET_CONTENT_BRAND_COMPARE_ATTRIBUTES[REQUEST]:
			return {
				...state,
				attributesScore: { fetching: true, error: null, data: null }
			};

		case constants.GET_CONTENT_ATTRIBUTES[SUCCESS]:
		case constants.GET_CONTENT_BRAND_COMPARE_ATTRIBUTES[SUCCESS]:
			return {
				...state,
				attributesScore: { fetching: false, error: null, data: action.response }
			};

		case constants.GET_CONTENT_ATTRIBUTES[ERROR]:
		case constants.GET_CONTENT_BRAND_COMPARE_ATTRIBUTES[ERROR]:
			return {
				...state,
				attributesScore: { fetching: false, error: action.response, data: null }
			};
		case constants.GET_CONTENT_OVERALL_SCORE[REQUEST]:
		case constants.GET_CONTENT_BRAND_COMPARE_OVERALL_SCORE[REQUEST]:
			return {
				...state,
				overallScore: { fetching: true, error: null, data: null }
			};

		case constants.GET_CONTENT_OVERALL_SCORE[SUCCESS]:
		case constants.GET_CONTENT_BRAND_COMPARE_OVERALL_SCORE[SUCCESS]:
			return {
				...state,
				overallScore: { fetching: false, error: null, data: action.response }
			};
		case constants.GET_CONTENT_OVERALL_SCORE[ERROR]:
		case constants.GET_CONTENT_BRAND_COMPARE_OVERALL_SCORE[ERROR]:
			return {
				...state,
				overallScore: { fetching: false, error: action.response, data: null }
			};

		case constants.GET_CATALOGUE_HEALTH_TABLE[REQUEST]:
			return {
				...state,
				catalogHealthTableData: { fetching: true, error: null, data: null }
			};

		case constants.GET_CATALOGUE_HEALTH_TABLE[SUCCESS]:
			return {
				...state,
				catalogHealthTableData: {
					fetching: false,
					error: null,
					data: action.response
				}
			};

		case constants.GET_CATALOGUE_HEALTH_TABLE[ERROR]:
			return {
				...state,
				catalogHealthTableData: {
					fetching: false,
					error: action.response,
					data: null
				}
			};
		case constants.GET_CATALOGUE_HEALTH_TAB[REQUEST]:
			return {
				...state,
				catalogHealthTabData: { ...state.tabData, fetching: true, error: null }
			};
		case constants.GET_CATALOGUE_HEALTH_TAB[SUCCESS]:
			return {
				...state,
				catalogHealthTabData: {
					fetching: false,
					error: null,
					data: action.response
				}
			};
		case constants.GET_CATALOGUE_HEALTH_TAB[ERROR]:
			return {
				...state,
				catalogHealthTabData: {
					fetching: false,
					error: action.response,
					data: null
				}
			};
		case constants.EXPORT_CONTENT_CATALOG_HEALTH_TABLE[REQUEST]:
			return {
				...state,
				catalogHelathTableExport: {
					fetching: true,
					error: null
				}
			};
		case constants.EXPORT_CONTENT_CATALOG_HEALTH_TABLE[SUCCESS]:
			return {
				...state,
				catalogHelathTableExport: {
					fetching: false,
					error: null
				}
			};
		case constants.EXPORT_CONTENT_CATALOG_HEALTH_TABLE[ERROR]:
			return {
				...state,
				catalogHelathTableExport: {
					fetching: false,
					error: action.error
				}
			};

		case constants.EXPORT_CONTENT_OVERALL_SCORE[REQUEST]:
			return {
				...state,
				overallScoreExportData: {
					fetching: true,
					error: null
				}
			};
		case constants.EXPORT_CONTENT_OVERALL_SCORE[SUCCESS]:
			return {
				...state,
				overallScoreExportData: {
					fetching: false,
					error: null
				}
			};
		case constants.EXPORT_CONTENT_OVERALL_SCORE[ERROR]:
			return {
				...state,
				overallScoreExportData: {
					fetching: false,
					error: action.error
				}
			};

		default:
			return state;
	}
};

export default contentScoreReducer;
