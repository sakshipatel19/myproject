import * as constants from "./sales-constants";
import { REQUEST, SUCCESS, ERROR } from "../../../constants/actions";

const defaultState = {
	brandsTable: {
		fetching: null,
		error: null,
		data: null
	},
	overallScore: {
		fetching: null,
		error: null,
		data: null
	},
	overallScoreExportData: {
		fetching: null,
		error: null
	}
};

const reducer = (state = defaultState, action) => {
	switch (action.type) {
		case constants.GET_SALES_COMPARE_BRANDS_TABLE[REQUEST]:
		case constants.GET_SALES_BRANDS_TABLE[REQUEST]:
			return {
				...state,
				brandsTable: { fetching: true, error: null, data: null }
			};

		case constants.GET_SALES_COMPARE_BRANDS_TABLE[SUCCESS]:
		case constants.GET_SALES_BRANDS_TABLE[SUCCESS]:
			return {
				...state,
				brandsTable: { fetching: false, error: null, data: action.response }
			};

		case constants.GET_SALES_COMPARE_BRANDS_TABLE[ERROR]:
		case constants.GET_SALES_BRANDS_TABLE[ERROR]:
			return {
				...state,
				brandsTable: { fetching: false, error: action.response, data: null }
			};
		case constants.GET_SALES_COMPARE_OVERALL_SCORE[REQUEST]:
		case constants.GET_SALES_OVERALL_SCORE[REQUEST]:
			return {
				...state,
				overallScore: { fetching: true, error: null, data: null }
			};

		case constants.GET_SALES_COMPARE_OVERALL_SCORE[SUCCESS]:
		case constants.GET_SALES_OVERALL_SCORE[SUCCESS]:
			return {
				...state,
				overallScore: { fetching: false, error: null, data: action.response }
			};
		case constants.GET_SALES_COMPARE_OVERALL_SCORE[ERROR]:
		case constants.GET_SALES_OVERALL_SCORE[ERROR]:
			return {
				...state,
				overallScore: { fetching: false, error: action.response, data: null }
			};
		case constants.EXPORT_SALES_OVERALL_SCORE[REQUEST]:
			return {
				...state,
				overallScoreExportData: {
					fetching: true,
					error: null
				}
			};
		case constants.EXPORT_SALES_OVERALL_SCORE[SUCCESS]:
			return {
				...state,
				overallScoreExportData: {
					fetching: false,
					error: null
				}
			};
		case constants.EXPORT_SALES_OVERALL_SCORE[ERROR]:
			return {
				...state,
				overallScoreExportData: {
					fetching: false,
					error: action.error
				}
			};
	}
	return state;
};

export default reducer;
