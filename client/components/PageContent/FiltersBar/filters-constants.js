import {
	createActions,
	createActionConstants
} from "../../../constants/actions";

export const FETCH_BRANDS_LIST = createActionConstants("FETCH_BRANDS_LIST");

export const fetchBrandsList = createActions(FETCH_BRANDS_LIST);

export const FETCH_CATEGORIES_LIST = createActionConstants(
	"FETCH_CATEGORIES_LIST"
);

export const fetchCategoriesList = createActions(FETCH_CATEGORIES_LIST);

export const FETCH_PRODUCTS_LIST = createActionConstants("FETCH_PRODUCTS_LIST");

export const fetchProductsList = createActions(FETCH_PRODUCTS_LIST);

export const FETCH_PRESETS_LIST = createActionConstants("FETCH_PRESETS_LIST");

export const fetchPresetsList = createActions(FETCH_PRESETS_LIST);