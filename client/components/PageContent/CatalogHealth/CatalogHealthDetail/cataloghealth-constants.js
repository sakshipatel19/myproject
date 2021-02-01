import {
	createActions,
	createActionConstants
} from "../../../../constants/actions";

export const SET_CATALOGUE_HEALTH_TABLE_FILTER =
	"SET_CATALOGUE_HEALTH_TABLE_FILTER";
export const SET_CATALOGUE_HEALTH_SELECTED_TAB =
	"SET_CATALOGUE_HEALTH_SELECTED_TAB";
export const SET_CATALOGUE_HEALTH_SEARCH_TERMS =
	"SET_CATALOGUE_HEALTH_SEARCH_TERMS";

export const FETCH_CATEGORIES_LIST = createActionConstants(
	"FETCH_CATEGORIES_LIST"
);

export const fetchCategoriesList = createActions(FETCH_CATEGORIES_LIST);
