import {
	createActions,
	createActionConstants
} from "../../../constants/actions";

export const GET_SALES_BRANDS_TABLE = createActionConstants(
	"GET_SALES_BRANDS_TABLE"
);

export const getSalesBrandsTable = createActions(GET_SALES_BRANDS_TABLE);

export const GET_SALES_OVERALL_SCORE = createActionConstants(
	"GET_SALES_OVERALL_SCORE"
);

export const getSalesOverallScore = createActions(GET_SALES_OVERALL_SCORE);

export const GET_SALES_COMPARE_BRANDS_TABLE = createActionConstants(
	"GET_SALES_COMPARE_BRANDS_TABLE"
);

export const getSalesCompareBrandsTable = createActions(
	GET_SALES_COMPARE_BRANDS_TABLE
);

export const GET_SALES_COMPARE_OVERALL_SCORE = createActionConstants(
	"GET_SALES_COMPARE_OVERALL_SCORE"
);

export const getSalesCompareOverallScore = createActions(
	GET_SALES_COMPARE_OVERALL_SCORE
);

export const EXPORT_SALES_OVERALL_SCORE = createActionConstants(
	"EXPORT_SALES_OVERALL_SCORE"
);

export const exportSalesOverallScore = createActions(
	EXPORT_SALES_OVERALL_SCORE
);
