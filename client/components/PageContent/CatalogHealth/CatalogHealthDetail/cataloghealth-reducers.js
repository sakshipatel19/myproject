import * as constants from "./cataloghealth-constants";
import { REQUEST, SUCCESS, ERROR } from "../../../../constants/actions";

export const defaultTab = "all";

export const defaultTableFilter = {
	sortBy: "productName",
	sortType: "ASC",
	pageNo: 1,
	pageSize: 15
};

const defaultState = {
	selectedTab: defaultTab,
	searchTerms: [],
	tableFilter: defaultTableFilter,
	categoriesList: {
		fetching: null,
		error: null,
		data: null
	}
};

const catalogDetailReducer = (state = defaultState, action) => {
	switch (action.type) {
		case constants.SET_CATALOGUE_HEALTH_TABLE_FILTER:
			return {
				...state,
				tableFilter: action.response
			};
		case constants.SET_CATALOGUE_HEALTH_SEARCH_TERMS:
			return {
				...state,
				searchTerms: action.response
			};
		case constants.SET_CATALOGUE_HEALTH_SELECTED_TAB:
			return {
				...state,
				selectedTab: action.response
			};
		case constants.FETCH_CATEGORIES_LIST[REQUEST]:
			return {
				...state,
				categoriesList: { fetching: true, error: null, data: null }
			};

		case constants.FETCH_CATEGORIES_LIST[SUCCESS]:
			return {
				...state,
				categoriesList: { fetching: false, error: null, data: action.response }
			};

		case constants.FETCH_CATEGORIES_LIST[ERROR]:
			return {
				...state,
				categoriesList: { fetching: false, error: action.response, data: null }
			};
		default:
			return state;
	}
};

export default catalogDetailReducer;
