import * as constants from "./global-constants";

export const setCountryCodeInConfig = countryCode => {
	return {
		type: constants.SET_COUNTRY_CODE_IN_CONFIG,
		countryCode
	};
};

export const setMarketCodeInConfig = marketCode => {
	return {
		type: constants.SET_MARKET_CODE_IN_CONFIG,
		marketCode
	};
};
export const setPageConfigInConfig = pageConfig => {
	return {
		type: constants.SET_PAGE_CONFIG_IN_CONFIG,
		pageConfig
	};
};
export const setFromDateInConfig = fromDate => {
	return {
		type: constants.SET_FROMDATE_IN_CONFIG,
		fromDate
	};
};

export const setToDateInConfig = toDate => {
	return {
		type: constants.SET_TODATE_IN_CONFIG,
		toDate
	};
};

export const setCompareFromInConfig = compareFrom => {
	return {
		type: constants.SET_COMPARE_FROM_IN_CONFIG,
		compareFrom
	};
};

export const setCompareToInConfig = compareTo => {
	return {
		type: constants.SET_COMPARE_TO_IN_CONFIG,
		compareTo
	};
};

export const setBrandNamesInConfig = brandNames => {
	return {
		type: constants.SET_BRAND_NAMES_IN_CONFIG,
		brandNames
	};
};

export const setCategoryNamesInConfig = categoryNames => {
	return {
		type: constants.SET_CATEGORY_NAMES_IN_CONFIG,
		categoryNames
	};
};

export const setProductsListInConfig = productIdList => {
	return {
		type: constants.SET_PRODUCTS_LIST_IN_CONFIG,
		productIdList
	};
};

export const setPresetNameInConfig = presetName => {
	return {
		type: constants.SET_PRESET_NAME_IN_CONFIG,
		presetName
	};
};

export const setProductIdConfig = productId => {
	return {
		type: constants.SET_PRODUCT_ID_IN_CONFIG,
		productId
	};
};

export const setSelectedNavLinkInConfig = navlink => {
	return {
		type: constants.SET_SELECTED_NAV_LINK_IN_CONFIG,
		navlink
	};
};

export const setTableFilterInConfig = tableFilter => ({
	type: constants.SET_TABLE_FILTER_IN_CONFIG,
	tableFilter
});

export const setPaidKeywodBrandsInConfig = keywords => ({
	type: constants.SET_PAID_KEYWORD_BRANDS_IN_CONFIG,
	keywords
});

export const setBySearchSelectedKeywordsInConfig = keywords => ({
	type: constants.SET_BYSEARCH_SELECTED_KEYWORDS_IN_CONFIG,
	keywords
});

export const setCompareBrandsInConfig = data => ({
	type: constants.SET_COMPARE_BRAND_DATA_IN_CONFIG,
	data
});

export const setisBrandCompareInConfig = isbrandCompare => ({
	type: constants.SET_IS_BRAND_COMPARE_IN_CONFIG,
	response: isbrandCompare
});

export const setisAsinCompareInConfig = isAsinCompare => ({
	type: constants.SET_IS_ASIN_COMPARE_IN_CONFIG,
	response: isAsinCompare
});

export const setCloseRedirectUrlInConfig = url => ({
	type: constants.SET_ON_CLOSE_REDIRECT_URL_IN_CONFIG,
	response: url
});

export const setShowCompareDaterange = response => ({
	type: constants.SET_SHOW_COMPARE_DATE_RANGE_IN_CONFIG,
	response
});

export const setErrorMessage = data => ({
	type: constants.SET_ERROR_MESSAGE_DETAILS,
	response: data
});

export const show404ErrorMessage = data => ({
	type: constants.SHOW_404_ERROR_MESSAGE,
	data
});

export const showSessionTimeoutScreen = data => ({
	type: constants.SHOW_SESSION_TIMEOUT_SCREEN,
	data
});

export const setSessionRedirectUrl = redirectUrl => ({
	type: constants.SET_SESSION_RIDIRECT_URL,
	redirectUrl
});

export const setScoreTypeSelectorToDefault = response => ({
	type: constants.SET_SCORE_TYPE_SELECTOR_TO_DEFAULT,
	response
});

export const setBestSellerSelectedCategory = category => ({
	type: constants.SET_BEST_SELLER_SELECTED_CATEGORY,
	response: category
});

export const setBestSellerCategoriesList = categories => ({
	type: constants.SET_BEST_SELLER_CATEGORY_LIST,
	response: categories
});

export const setIsDateCompareSelected = response => ({
	type: constants.SET_IS_DATE_COMPARE_SELECTED,
	response
});

export const getCountryMarketListSuccess = response => ({
	type: constants.GET_COUNTRY_MARKET_LIST_SUCCESS,
	response
});

export const getCountryMarketListError = response => ({
	type: constants.GET_COUNTRY_MARKET_LIST_ERROR,
	response
});

export const setSelectedPageInConfig = response => ({
	type: constants.SET_SELECTED_PAGE_IN_CONFIG,
	response
});

export const setSelectedPrimaryModuleInConfig = response => ({
	type: constants.SET_SELECTED_PRIMARY_MODULE_IN_CONFIG,
	response
});

export const setisAsinsViewPageInConfig = isAsinsPage => ({
	type: constants.SET_IS_ASINS_LANDING_PAGE_IN_CONFIG,
	response: isAsinsPage
});

export const setAsinCompareBrandsInConfig = asinCompareBrands => ({
	type: constants.SET_ASINS_COMPARE_BRANDS_IN_CONFIG,
	response: asinCompareBrands
});
export const setViewPresetInConfig = viewPreset => {
	return {
		type: constants.SET_VIEW_PRESET_IN_CONFIG,
		response: viewPreset
	};
};