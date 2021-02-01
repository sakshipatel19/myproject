import * as constants from "./filters-constants";
import { REQUEST, SUCCESS, ERROR } from "../../../constants/actions";

const defaultState = {
	brandsList: {
		fetching: null,
		error: null,
		data: null
	},
	categoriesList: {
		fetching: null,
		error: null,
		data: null
	},
	productsList: {
		fetching: null,
		error: null,
		data: null
	},
	presetsList: {
		fetching: null,
		error: null,
		data: null
	}
};

const filtersBarReducer = (state = defaultState, action) => {
	switch (action.type) {
		case constants.FETCH_BRANDS_LIST[REQUEST]:
			return {
				...state,
				brandsList: { fetching: true, error: null, data: null }
			};

		case constants.FETCH_BRANDS_LIST[SUCCESS]:
			return {
				...state,
				brandsList: { fetching: false, error: null, data: action.response }
			};

		case constants.FETCH_BRANDS_LIST[ERROR]:
			return {
				...state,
				brandsList: { fetching: false, error: action.response, data: null }
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

		case constants.FETCH_PRODUCTS_LIST[REQUEST]:
			return {
				...state,
				productsList: { fetching: true, error: null, data: null }
			};

		case constants.FETCH_PRODUCTS_LIST[SUCCESS]:
			return {
				...state,
				productsList: { fetching: false, error: null, data: action.response }
			};

		case constants.FETCH_PRODUCTS_LIST[ERROR]:
			return {
				...state,
				productsList: { fetching: false, error: action.response, data: null }
			};

		case constants.FETCH_PRESETS_LIST[REQUEST]:
			return {
				...state,
				presetsList: { fetching: true, error: null, data: null }
			};

		case constants.FETCH_PRESETS_LIST[SUCCESS]:
			return {
				...state,
				presetsList: { fetching: false, error: null, data: action.response }
			};

		case constants.FETCH_PRESETS_LIST[ERROR]:
			return {
				...state,
				presetsList: { fetching: false, error: action.response, data: null }
			};
		default:
			return state;
	}
};

export default filtersBarReducer;
