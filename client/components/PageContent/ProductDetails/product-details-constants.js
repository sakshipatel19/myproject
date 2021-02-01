import {
	createActions,
	createActionConstants
} from "../../../constants/actions";

export const GET_PRODUCT_DETAILS_IN_ASIN_LANDING_PAGE = createActionConstants(
	"GET_PRODUCT_DETAILS_IN_ASIN_LANDING_PAGE"
);

export const getProductDetailsInAsinLandingPage = createActions(
	GET_PRODUCT_DETAILS_IN_ASIN_LANDING_PAGE
);
export const GET_ASIN_BRAND_COMPARE_OVERALL_SCORE = createActionConstants(
	"GET_ASIN_BRAND_COMPARE_OVERALL_SCORE"
);

export const getAsinBrandCompareOverallScore = createActions(
	GET_ASIN_BRAND_COMPARE_OVERALL_SCORE
);
export const GET_ASIN_OVERALL_SCORE = createActionConstants(
	"GET_ASIN_OVERALL_SCORE"
);
export const getAsinOverallScore = createActions(GET_ASIN_OVERALL_SCORE);

export const GET_PRODUCT_DETAILS_OVERALL_SCORE = createActionConstants(
	"GET_PRODUCT_DETAILS_OVERALL_SCORE"
);

export const getProductDetailsOverallScore = createActions(
	GET_PRODUCT_DETAILS_OVERALL_SCORE
);
export const GET_PRODUCT_DETAILS_COMPARE_OVERALL_SCORE = createActionConstants(
	"GET_PRODUCT_DETAILS_COMPARE_OVERALL_SCORE"
);
export const getProductDetailsCompareOverallScore = createActions(
	GET_PRODUCT_DETAILS_COMPARE_OVERALL_SCORE
);
