import {
	createActions,
	createActionConstants
} from "../../../constants/actions";
export const GET_SUMMARY_OVERALL_SCORE = createActionConstants(
	"GET_SUMMARY_OVERALL_SCORE"
);

export const getSummaryOverallScore = createActions(GET_SUMMARY_OVERALL_SCORE);

export const GET_SUMMARY_BRAND_COMPARE_OVERALL_SCORE = createActionConstants(
	"GET_SUMMARY_BRAND_COMPARE_OVERALL_SCORE"
);

export const getSummaryBrandCompareOverallScore = createActions(
	GET_SUMMARY_BRAND_COMPARE_OVERALL_SCORE
);
export const GET_SUMMARY_ATTRIBUTE_SCORE = createActionConstants(
	"GET_SUMMARY_ATTRIBUTE_SCORE"
);

export const getSummaryAttributeScore = createActions(
	GET_SUMMARY_ATTRIBUTE_SCORE
);

export const GET_SUMMARY_COMPARE_ATTRIBUTE_SCORE = createActionConstants(
	"GET_SUMMARY_COMPARE_ATTRIBUTE_SCORE"
);

export const getSummaryCompareAttributeScore = createActions(
	GET_SUMMARY_COMPARE_ATTRIBUTE_SCORE
);
