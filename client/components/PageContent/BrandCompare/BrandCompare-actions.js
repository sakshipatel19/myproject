import * as constants from "./BrandCompare-constants";

export const fetchClientBrandsList = payload =>
	constants.getClientBrandsList.request(payload);

export const fetchCompetitorBrandsList = payload =>
	constants.getCompetitorBrandsList.request(payload);

export const fetchTopSellerBrandsList = payload =>
	constants.getTopSellerBrandsList.request(payload);

export const clearCompetitorBrandsList = () => {
	return {
		type: constants.CLEAR_COMPETITOR_BRAND_LIST
	};
};

export const clearTopSellerBrandsList = () => {
	return {
		type: constants.CLEAR_TOPSELLER_BRAND_LIST
	};
};
