import {
	createActions,
	createActionConstants
} from "../../../constants/actions";

export const GET_DISC_BY_SEARCH_OVERALL_SCORE = createActionConstants(
	"GET_DISC_BY_SEARCH_OVERALL_SCORE"
);

export const getDiscBySearchOverallScore = createActions(
	GET_DISC_BY_SEARCH_OVERALL_SCORE
);

export const GET_DISC_BY_SEARCH_BRAND_COMPARE_OVERALL_SCORE = createActionConstants(
	"GET_DISC_BY_SEARCH_BRAND_COMPARE_OVERALL_SCORE"
);

export const getDiscBySearchBrandCompareOverallScore = createActions(
	GET_DISC_BY_SEARCH_BRAND_COMPARE_OVERALL_SCORE
);

export const GET_DISC_BY_SEARCH_BEST_SELLER = createActionConstants(
	"GET_DISC_BY_SEARCH_BEST_SELLER"
);

export const getDiscBySearchBestSeller = createActions(
	GET_DISC_BY_SEARCH_BEST_SELLER
);

export const GET_DISC_BY_SEARCH_BEST_SELLER_KEYWORD_DETAIL = createActionConstants(
	"GET_DISC_BY_SEARCH_BEST_SELLER_KEYWORD_DETAIL"
);

export const getDiscBySearchBestSellerKeywordDetail = createActions(
	GET_DISC_BY_SEARCH_BEST_SELLER_KEYWORD_DETAIL
);

export const GET_BY_SEARCH_KEYWORDS_TABLE_DATA = createActionConstants(
	"GET_BY_SEARCH_KEYWORDS_TABLE_DATA"
);

export const getBySearchKeywordsTableData = createActions(
	GET_BY_SEARCH_KEYWORDS_TABLE_DATA
);

export const GET_BY_SEARCH_BRAND_COMPARE_KEYWORDS_TABLE_DATA = createActionConstants(
	"GET_BY_SEARCH_BRAND_COMPARE_KEYWORDS_TABLE_DATA"
);

export const getBySearchBrandCompareKeywordsTableData = createActions(
	GET_BY_SEARCH_BRAND_COMPARE_KEYWORDS_TABLE_DATA
);
