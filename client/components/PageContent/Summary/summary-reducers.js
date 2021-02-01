import * as constants from "./summary-constants";
import { REQUEST, SUCCESS, ERROR } from "../../../constants/actions";

const defaultState = {
	overallScore: {
		fetching: null,
		error: null,
		data: null
	},
	attributeScore: {
		fetching: null,
		error: null,
		data: null
	}
};
const summaryScoreReducer = (state = defaultState, action) => {
	switch (action.type) {
		case constants.GET_SUMMARY_OVERALL_SCORE[REQUEST]:
		case constants.GET_SUMMARY_BRAND_COMPARE_OVERALL_SCORE[REQUEST]:
			return {
				...state,
				overallScore: { fetching: true, error: null, data: null }
			};

		case constants.GET_SUMMARY_OVERALL_SCORE[SUCCESS]:
		case constants.GET_SUMMARY_BRAND_COMPARE_OVERALL_SCORE[SUCCESS]:
			return {
				...state,
				overallScore: { fetching: false, error: null, data: action.response }
			};

		case constants.GET_SUMMARY_OVERALL_SCORE[ERROR]:
		case constants.GET_SUMMARY_BRAND_COMPARE_OVERALL_SCORE[ERROR]:
			return {
				...state,
				overallScore: { fetching: false, error: action.response, data: null }
			};
		case constants.GET_SUMMARY_ATTRIBUTE_SCORE[REQUEST]:
		case constants.GET_SUMMARY_COMPARE_ATTRIBUTE_SCORE[REQUEST]:
			return {
				...state,
				attributeScore: { fetching: true, error: null, data: null }
			};

		case constants.GET_SUMMARY_ATTRIBUTE_SCORE[SUCCESS]:
		case constants.GET_SUMMARY_COMPARE_ATTRIBUTE_SCORE[SUCCESS]:
			return {
				...state,
				attributeScore: { fetching: false, error: null, data: action.response }
			};

		case constants.GET_SUMMARY_ATTRIBUTE_SCORE[ERROR]:
		case constants.GET_SUMMARY_COMPARE_ATTRIBUTE_SCORE[ERROR]:
			return {
				...state,
				attributeScore: { fetching: false, error: action.response, data: null }
			};
		default:
			return state;
	}
};
export default summaryScoreReducer;
