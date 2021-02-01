import * as constants from "./sales-constants";

export const fetchSalesBrandsTable = payload =>
	payload.brandCompareView
		? constants.getSalesCompareBrandsTable.request(payload)
		: constants.getSalesBrandsTable.request(payload);

export const fetchSalesOverallScore = payload =>
	payload.brandCompareView
		? constants.getSalesCompareOverallScore.request(payload)
		: constants.getSalesOverallScore.request(payload);

export const exportSalesOverallScore = payload =>
	constants.exportSalesOverallScore.request(payload);
