import * as constants from "./cataloghealth-constants";

export const setTableFilter = tableFilter => {
	return {
		type: constants.SET_CATALOGUE_HEALTH_TABLE_FILTER,
		response: tableFilter
	};
};

export const setSearchTermsFilter = searchTerms => {
	return {
		type: constants.SET_CATALOGUE_HEALTH_SEARCH_TERMS,
		response: searchTerms
	};
};

export const setSelectedTab = tab => {
	return {
		type: constants.SET_CATALOGUE_HEALTH_SELECTED_TAB,
		response: tab
	};
};
