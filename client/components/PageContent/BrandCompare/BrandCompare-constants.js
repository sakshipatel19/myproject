import {
	createActions,
	createActionConstants
} from "../../../constants/actions";

export const GET_CLIENT_BRANDS_LIST = createActionConstants(
	"GET_CLIENT_BRANDS_LIST"
);

export const getClientBrandsList = createActions(GET_CLIENT_BRANDS_LIST);

export const GET_COMPETITOR_BRANDS_LIST = createActionConstants(
	"GET_COMPETITOR_BRANDS_LIST"
);

export const getCompetitorBrandsList = createActions(
	GET_COMPETITOR_BRANDS_LIST
);

export const GET_TOPSELLER_BRANDS_LIST = createActionConstants(
	"GET_TOPSELLER_BRANDS_LIST"
);

export const getTopSellerBrandsList = createActions(GET_TOPSELLER_BRANDS_LIST);

export const CLEAR_TOPSELLER_BRAND_LIST = "CLEAR_TOPSELLER_BRAND_LIST";
export const CLEAR_COMPETITOR_BRAND_LIST = "CLEAR_COMPETITOR_BRAND_LIST";
