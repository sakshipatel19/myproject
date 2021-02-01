import {
	createActions,
	createActionConstants
} from "../../../constants/actions";

export const GET_CONTENT_BEST_SELLER = createActionConstants(
	"GET_CONTENT_BEST_SELLER"
);

export const getBestSeller = createActions(GET_CONTENT_BEST_SELLER);

export const GET_CONTENT_CATALOG_HEALTH = createActionConstants(
	"GET_CONTENT_CATALOG_HEALTH"
);

export const getContentCatalogHealth = createActions(
	GET_CONTENT_CATALOG_HEALTH
);

export const GET_CONTENT_BRANDS_SCORE = createActionConstants(
	"GET_CONTENT_BRANDS_SCORE"
);

export const getContentBrandScore = createActions(GET_CONTENT_BRANDS_SCORE);

export const GET_CONTENT_ATTRIBUTES = createActionConstants(
	"GET_CONTENT_ATTRIBUTES"
);

export const getContentAttributes = createActions(GET_CONTENT_ATTRIBUTES);

export const GET_CONTENT_OVERALL_SCORE = createActionConstants(
	"GET_CONTENT_OVERALL_SCORE"
);

export const getContentOverallScore = createActions(GET_CONTENT_OVERALL_SCORE);

export const GET_CATALOGUE_HEALTH_TABLE = createActionConstants(
	"GET_CATALOGUE_HEALTH_TABLE"
);

export const getCatalogueHealthTable = createActions(
	GET_CATALOGUE_HEALTH_TABLE
);

export const GET_CATALOGUE_HEALTH_TAB = createActionConstants(
	"GET_CATALOGUE_HEALTH_TAB"
);

export const getCatalogueHealthTab = createActions(GET_CATALOGUE_HEALTH_TAB);

export const GET_CONTENT_BRAND_COMPARE_OVERALL_SCORE = createActionConstants(
	"GET_CONTENT_BRAND_COMPARE_OVERALL_SCORE"
);

export const getContentBrandCompareOverallScore = createActions(
	GET_CONTENT_BRAND_COMPARE_OVERALL_SCORE
);

export const GET_CONTENT_BRAND_COMPARE_ATTRIBUTES = createActionConstants(
	"GET_CONTENT_BRAND_COMPARE_ATTRIBUTES"
);

export const getContentBrandCompareAttributes = createActions(
	GET_CONTENT_BRAND_COMPARE_ATTRIBUTES
);

export const EXPORT_CONTENT_CATALOG_HEALTH_TABLE = createActionConstants(
	"EXPORT_CONTENT_CATALOG_HEALTH_TABLE"
);

export const exportContentCatalogHealthTable = createActions(
	EXPORT_CONTENT_CATALOG_HEALTH_TABLE
);

export const EXPORT_CONTENT_OVERALL_SCORE = createActionConstants(
	"EXPORT_CONTENT_OVERALL_SCORE"
);

export const exportContentOverallScore = createActions(
	EXPORT_CONTENT_OVERALL_SCORE
);
