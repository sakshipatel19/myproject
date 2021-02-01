import store from "../store";
import {
	fetchOverallContentScore,
	fetchContentAttributes,
	fetchBestSellers,
	fetchContentBrandsScore,
	fetchContentCatalogHealth,
	fetchContentCatalogueHealthTabs,
	fetchContentCatalogueHealthTable
} from "../components/PageContent/Content/content-actions";
import {
	fetchAvailibilityOverallScore,
	fetchAvailabilityCatalogHealth,
	fetchAvailabilityBestSellers,
	fetchAvailabilityLostBuyBox,
	fetchAvailabilityBrandScore,
	fetchAvailabilityCatalogueHealthTabs,
	fetchAvailabilityCatalogueHealthTable,
	fetchAvailabilityLostBuyBoxDetails
} from "../components/PageContent/Availability/availability-actions";
import {
	fetchDiscBySearchBestSeller,
	fetchBySearchKeywordsTableData,
	fetchBySearchOverallScore
} from "../components/PageContent/BySearch/by-search-actions";

import {
	fetchPromotionCountAndType,
	fetchPriceAndPromotionBrandLevelScores,
	fetchPriceBestSellers,
	fetchPromotionBestSellers,
	fetchOverallPricePromotionScore,
	fetchPromotionCountBrandCompare
} from "../components/PageContent/PriceAndPromotion/price-promotion-actions";
import {
	fetchSummaryOverallScore,
	fetchSummaryAttributeScore
} from "../components/PageContent/Summary/summary-actions";

import {
	fetchSalesOverallScore,
	fetchSalesBrandsTable
} from "../components/PageContent/Sales/sales-actions";

import {
	fetchProductDetails,
	fetchAsinOverallScore,
	fetchProductDetailsOverallScore
} from "../components/PageContent/ProductDetails/product-details-actions";

import * as pageHeaders from "../constants/PageHeaders";

export const currentSelectedPage = () => {
	const paths = window.location.pathname.split("/");
	let pageKeys = Object.keys(pageHeaders.pageTitle);
	return getPageDetails(paths, pageKeys, paths.length - 1);
};

const getPageDetails = (paths, pageKeys, length) => {
	if (length < 0) return;
	if (pageKeys.indexOf(paths[length]) > -1) return paths[length];
	else return getPageDetails(paths, pageKeys, length - 1);
};

export const apiCallBasedOnRoute = payload => {
	const state = store.getState();
	const isBrandCompareView = payload.brandCompareView;
	const { pageConfig } = payload;
	const currentPage = currentSelectedPage();
	const currPageConfig = pageConfig[currentPage];

	if (payload.brandCompareView || payload.asinCompareView) {
		apiCallBasedonRouteBrandCompare(payload, currentPage, currPageConfig);
		return;
	}

	switch (currentPage) {
		case pageHeaders.DASHBOARD:
			store.dispatch(fetchDiscoverabilityOverallScores(payload));
			store.dispatch(fetchConversionOverallScores(payload));
			store.dispatch(fetchConsiderationOverallScores(payload));
			break;

		case pageHeaders.CONTENT:
			currPageConfig.summaryChart.enable &&
				store.dispatch(fetchOverallContentScore(payload));
			currPageConfig.attributes.enable &&
				store.dispatch(fetchContentAttributes(payload));
			currPageConfig.bestSeller.enable &&
				store.dispatch(fetchBestSellers(payload));
			currPageConfig.brandsTable.enable &&
				store.dispatch(fetchContentBrandsScore(payload));
			currPageConfig.catalogHealth.enable &&
				store.dispatch(fetchContentCatalogHealth(payload));
			break;

		case pageHeaders.AVAILABILITY:
			currPageConfig.summaryChart.enable &&
				store.dispatch(fetchAvailibilityOverallScore(payload));
			currPageConfig.bestSeller.enable &&
				store.dispatch(fetchAvailabilityBestSellers(payload));
			currPageConfig.lostBuyBox.enable &&
				store.dispatch(fetchAvailabilityLostBuyBox(payload));
			currPageConfig.brandsTable.enable &&
				store.dispatch(fetchAvailabilityBrandScore(payload));
			currPageConfig.catalogHealth.enable &&
				store.dispatch(fetchAvailabilityCatalogHealth(payload));
			break;

		case pageHeaders.BY_SEARCH:
			currPageConfig.bestSeller.enable &&
				store.dispatch(fetchDiscBySearchBestSeller(payload));
			currPageConfig.keywordsTable.enable &&
				store.dispatch(fetchBySearchKeywordsTableData(payload));
			currPageConfig.summaryChart.enable &&
				store.dispatch(fetchBySearchOverallScore(payload));
			break;

		case pageHeaders.PRICE_AND_PROMOTION:
			currPageConfig.brandTable.enable &&
				store.dispatch(fetchPriceAndPromotionBrandLevelScores(payload));
			currPageConfig.summaryChart.enable &&
				store.dispatch(fetchOverallPricePromotionScore(payload));
			currPageConfig.bestSeller.enable &&
				store.dispatch(fetchPriceBestSellers(payload));
			currPageConfig.bestSeller.enable &&
				store.dispatch(fetchPromotionBestSellers(payload));
			currPageConfig.promotionCountAndType.enable &&
				store.dispatch(fetchPromotionCountAndType(payload));
			break;

		case pageHeaders.SALES:
			currPageConfig.summaryChart.enable &&
				store.dispatch(fetchSalesOverallScore(payload));
			currPageConfig.brandTable.enable &&
				store.dispatch(fetchSalesBrandsTable(payload));
			break;

		case pageHeaders.CATALOUGE_HEALTH:
			switch (payload.selectedNavLink) {
				case pageHeaders.CONTENT:
					store.dispatch(fetchContentCatalogueHealthTabs(payload));
					store.dispatch(fetchContentCatalogueHealthTable(payload));
					break;
				case pageHeaders.AVAILABILITY:
					store.dispatch(fetchAvailabilityCatalogueHealthTabs(payload));
					store.dispatch(fetchAvailabilityCatalogueHealthTable(payload));
					break;
				default:
					break;
			}

			break;
		case pageHeaders.PRODUCT_DETAILS:
			// grab current state
			// const selectedTrafficTab = state?.productDetails?.trafficPageTab;

			store.dispatch(fetchProductDetails(payload));
			store.dispatch(fetchProductDetailsOverallScore(payload));
			store.dispatch(fetchAsinOverallScore(payload));
			// apiCallbasedonRouteForProductDetails(payload, selectedTrafficTab);
			break;
		case pageHeaders.SUMMARY:
			currPageConfig.summaryChart.enable &&
				store.dispatch(fetchSummaryOverallScore(payload));
			currPageConfig.attributeScore.enable &&
				store.dispatch(fetchSummaryAttributeScore(payload));
			break;
		case pageHeaders.LOST_BUY_BOX:
			currPageConfig.summaryChart.enable &&
				store.dispatch(fetchAvailabilityLostBuyBox(payload));
			currPageConfig.summaryChart.enable &&
				store.dispatch(fetchAvailabilityLostBuyBoxDetails(payload));
			break;
	}
};

export const apiCallBasedonRouteBrandCompare = (
	payload,
	currentPage,
	currPageConfig
) => {
	switch (currentPage) {
		case pageHeaders.SUMMARY:
			currPageConfig.summaryChart.enable &&
				store.dispatch(fetchSummaryOverallScore(payload));
			currPageConfig.attributeScore.enable &&
				store.dispatch(fetchSummaryAttributeScore(payload));
			break;
		case pageHeaders.CONTENT:
			currPageConfig.summaryChart.enable &&
				store.dispatch(fetchOverallContentScore(payload));
			currPageConfig.attributes.enable &&
				store.dispatch(fetchContentAttributes(payload));
			break;
		case pageHeaders.AVAILABILITY:
			currPageConfig.summaryChart.enable &&
				store.dispatch(fetchAvailibilityOverallScore(payload));
			break;
		case pageHeaders.PRICE_AND_PROMOTION:
			currPageConfig.summaryChart.enable &&
				store.dispatch(fetchOverallPricePromotionScore(payload));
			currPageConfig.promotionCount.enable &&
				store.dispatch(fetchPromotionCountBrandCompare(payload));
			break;
		case pageHeaders.BY_SEARCH:
			currPageConfig.keywordsTable.enable &&
				store.dispatch(fetchBySearchKeywordsTableData(payload));
			currPageConfig.summaryChart.enable &&
				store.dispatch(fetchBySearchOverallScore(payload));
			break;
		case pageHeaders.SALES:
			currPageConfig.summaryChart.enable &&
				store.dispatch(fetchSalesOverallScore(payload));
			currPageConfig.brandTable.enable &&
				store.dispatch(fetchSalesBrandsTable(payload));
			break;
		case pageHeaders.PRODUCT_DETAILS:
			store.dispatch(fetchProductDetailsOverallScore(payload));
			store.dispatch(fetchAsinOverallScore(payload));
			break;
	}
};
