import * as actions from "./global-constants";
import moment from "moment";
import { pageConfig } from "../components/Header/pageConfig";

export const defaultTableFilter = {
	pageNo: 1,
	pageSize: 15,
	sortBy: "keyword",
	sortType: "ASC",
	searchTerms: []
};

export const defaultFromDate = process.env.SCRAPING_START_DATE;
export const defaultToDate = moment().format("YYYY-MM-DD");

const defaultState = {
	config: {
		clientOrg: process.env.CLIENT_ID,
		countryCode: "us",
		marketCode: "amazon",
		fromDate: defaultFromDate,
		toDate: defaultToDate,
		compareFrom: "",
		compareTo: "",
		isDateCompareSelected: false,
		showCompareDateRange: false,
		brandNames: [],
		categoryNames: [],
		productIdList: [],
		presetName: "",
		selectedNavLink: "dashboard",
		selectedPage: "dashboard",
		primaryModule: "dashboard",
		tableFilter: defaultTableFilter,
		paidKeywordBrands: [],
		bySearchSelectedKeywordsList: [],
		brandCompareView: false,
		compareBrands: [],
		productId: "",
		closeRedirectUrl: "",
		isErrorMessageShown: false,
		errorCode: "",
		is404ErrorMessageShown: false,
		isSessionTimedOut: false,
		sessionTimeoutRedirectUrl: "/analysis/dashboard",
		countryMarket: {
			data: null,
			fetching: false,
			error: null
		},
		pageConfig: pageConfig["us-amazon"] || pageConfig.default,
		isAsinsLandingPage: false,
		asinCompareView: false,
		asinCompareBrands: [],
		viewPreset: false
	},
	scoreTypeSelectorToDefault: false,
	bestSellersCategories: [],
	bestSellerSelectedCategory: ""
};

const globalReducer = (state = defaultState, action) => {
	switch (action.type) {
		case actions.SET_COUNTRY_CODE_IN_CONFIG:
			return {
				...state,
				config: {
					...state.config,
					countryCode: action.countryCode
				}
			};

		case actions.SET_MARKET_CODE_IN_CONFIG:
			return {
				...state,
				config: {
					...state.config,
					marketCode: action.marketCode
				}
			};
		case actions.SET_PAGE_CONFIG_IN_CONFIG:
			return {
				...state,
				config: {
					...state.config,
					pageConfig: action.pageConfig
				}
			};

		case actions.SET_FROMDATE_IN_CONFIG:
			return {
				...state,
				config: { ...state.config, fromDate: action.fromDate }
			};

		case actions.SET_TODATE_IN_CONFIG:
			return {
				...state,
				config: { ...state.config, toDate: action.toDate }
			};

		case actions.SET_COMPARE_FROM_IN_CONFIG:
			return {
				...state,
				config: { ...state.config, compareFrom: action.compareFrom }
			};

		case actions.SET_COMPARE_TO_IN_CONFIG:
			return {
				...state,
				config: { ...state.config, compareTo: action.compareTo }
			};

		case actions.SET_IS_DATE_COMPARE_SELECTED:
			return {
				...state,
				config: { ...state.config, isDateCompareSelected: action.response }
			};

		case actions.SET_BRAND_NAMES_IN_CONFIG:
			return {
				...state,
				config: { ...state.config, brandNames: action.brandNames }
			};

		case actions.SET_CATEGORY_NAMES_IN_CONFIG:
			return {
				...state,
				config: { ...state.config, categoryNames: action.categoryNames }
			};

		case actions.SET_PRODUCTS_LIST_IN_CONFIG:
			return {
				...state,
				config: { ...state.config, productIdList: action.productIdList }
			};

		case actions.SET_PRESET_NAME_IN_CONFIG:
			return {
				...state,
				config: { ...state.config, presetName: action.presetName }
			};

		case actions.SET_SELECTED_NAV_LINK_IN_CONFIG:
			return {
				...state,
				config: { ...state.config, selectedNavLink: action.navlink }
			};

		case actions.SET_SELECTED_PAGE_IN_CONFIG:
			return {
				...state,
				config: { ...state.config, selectedPage: action.response }
			};

		case actions.SET_SELECTED_PRIMARY_MODULE_IN_CONFIG:
			return {
				...state,
				config: { ...state.config, primaryModule: action.response }
			};

		case actions.SET_TABLE_FILTER_IN_CONFIG:
			return {
				...state,
				config: { ...state.config, tableFilter: { ...action.tableFilter } }
			};
		case actions.SET_PAID_KEYWORD_BRANDS_IN_CONFIG:
			return {
				...state,
				config: { ...state.config, paidKeywordBrands: action.keywords }
			};
		case actions.SET_BYSEARCH_SELECTED_KEYWORDS_IN_CONFIG:
			return {
				...state,
				config: {
					...state.config,
					bySearchSelectedKeywordsList: action.keywords
				}
			};
		case actions.SET_COMPARE_BRAND_DATA_IN_CONFIG:
			return {
				...state,
				config: { ...state.config, compareBrands: [...action.data] }
			};
		case actions.SET_IS_BRAND_COMPARE_IN_CONFIG:
			return {
				...state,
				config: { ...state.config, brandCompareView: action.response }
			};
		case actions.SET_IS_ASIN_COMPARE_IN_CONFIG:
			return {
				...state,
				config: { ...state.config, asinCompareView: action.response }
			};
		case actions.SET_PRODUCT_ID_IN_CONFIG:
			return {
				...state,
				config: { ...state.config, productId: action.productId }
			};
		case actions.SET_ON_CLOSE_REDIRECT_URL_IN_CONFIG:
			return {
				...state,
				config: { ...state.config, closeRedirectUrl: action.response }
			};
		case actions.SET_SHOW_COMPARE_DATE_RANGE_IN_CONFIG:
			return {
				...state,
				config: { ...state.config, showCompareDateRange: action.response }
			};

		case actions.SHOW_404_ERROR_MESSAGE:
			return {
				...state,
				config: { ...state.config, is404ErrorMessageShown: action.data }
			};

		case actions.SHOW_SESSION_TIMEOUT_SCREEN:
			return {
				...state,
				config: { ...state.config, isSessionTimedOut: action.data }
			};

		case actions.SET_SESSION_RIDIRECT_URL:
			return {
				...state,
				config: {
					...state.config,
					sessionTimeoutRedirectUrl: action.redirectUrl
				}
			};

		case actions.SET_ERROR_MESSAGE_DETAILS:
			return {
				...state,
				config: {
					...state.config,
					errorCode: action.response.errorCode,
					isErrorMessageShown: action.response.isErrorMessageShown
				}
			};
		case actions.SET_SCORE_TYPE_SELECTOR_TO_DEFAULT:
			return {
				...state,
				scoreTypeSelectorToDefault: action.response
			};

		case actions.SET_BEST_SELLER_SELECTED_CATEGORY:
			return {
				...state,
				bestSellerSelectedCategory: action.response
			};
		case actions.SET_BEST_SELLER_CATEGORY_LIST:
			return {
				...state,
				bestSellersCategories: action.response
			};

		case actions.GET_COUNTRY_MARKET_LIST_REQUEST:
			return {
				...state,
				config: {
					...state.config,
					countryMarket: { fetching: true, data: null, error: null }
				}
			};
		case actions.GET_COUNTRY_MARKET_LIST_SUCCESS:
			return {
				...state,
				config: {
					...state.config,
					countryMarket: { fetching: false, data: action.response, error: null }
				}
			};
		case actions.GET_COUNTRY_MARKET_LIST_ERROR:
			return {
				...state,
				config: {
					...state.config,
					countryMarket: { fetching: false, data: null, error: action.response }
				}
			};
		case actions.SET_IS_ASINS_LANDING_PAGE_IN_CONFIG:
			return {
				...state,
				config: {
					...state.config,
					isAsinsLandingPage: action.response
				}
			};
		case actions.SET_ASINS_COMPARE_BRANDS_IN_CONFIG:
			return {
				...state,
				config: {
					...state.config,
					asinCompareBrands: [...action.response]
				}
			};
		case actions.SET_VIEW_PRESET_IN_CONFIG:
			debugger;
			return {
				...state,
				config: {
					...state.config,
					viewPreset: action.response
				}
			};

		default:
			return state;
	}
};

export default globalReducer;
