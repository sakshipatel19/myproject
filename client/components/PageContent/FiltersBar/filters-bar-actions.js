import * as constants from "./filters-constants";

export const fetchBrandsList = payload =>
	constants.fetchBrandsList.request(payload);

export const fetchCategoriesList = payload =>
	constants.fetchCategoriesList.request(payload);

export const fetchProductsList = payload =>
	constants.fetchProductsList.request(payload);

export const fetchPresetsList = payload =>
	constants.fetchPresetsList.request(payload);
