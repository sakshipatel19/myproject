const CONTENT_ANALYSIS_CONTEXT = `/contentanalysis/analysis/content`;
const AVAILABILITY_ANALYSIS_CONTEXT = `/contentanalysis/analysis/availability`;
const DISCOVERABILITY_ANALYSIS_CONTEXT = `/contentanalysis/analysis/discoverability`;
const PRICE_PROMOTION_ANALYSIS_CONTEXT = `/contentanalysis/analysis/consideration/priceAndPromotion`;
const NAVIGATION_CONTEXT = `/contentanalysis/analysis/navigation`;
const PAID_ANALYSIS_CONTEXT = `/contentanalysis/analysis/discoverability`;
const DASHBOARD_ANALYSIS_CONTEXT = `/contentanalysis/analysis/dashboard`;
const SALES_ANALYSIS_CONTEXT = `/contentanalysis/analysis/conversion/sales`;
const PRODUCT_ANALYSIS_CONTEXT = `/contentanalysis/analysis/product`;
const NOTIFICATION_CONTEXT = `/notifications`;
const SUMMARY_CONTEXT = `/contentanalysis/analysis/shelf`;

const BY_SEARCH = `${DISCOVERABILITY_ANALYSIS_CONTEXT}/bySearch`;

module.exports = {
	endpoints: {
		countriesListUrl: `${CONTENT_ANALYSIS_CONTEXT}/countries`,
		marketPlacesListUrl: `${CONTENT_ANALYSIS_CONTEXT}/marketPlaces`,

		contentOverallScoreUrl: `${CONTENT_ANALYSIS_CONTEXT}/contentOverallScore/v2`,
		contentScoreByAttributeUrl: `${CONTENT_ANALYSIS_CONTEXT}/contentScoreByAttribute/v2`,
		contentScoreByBrandUrl: `${CONTENT_ANALYSIS_CONTEXT}/brandLevelScores`,
		contentBestSellerUrl: `${CONTENT_ANALYSIS_CONTEXT}/bestSellers/overallScore/v2`,
		contentCompareOverallScoreUrl: `${CONTENT_ANALYSIS_CONTEXT}/compare/overallScore/v2`,
		contentCompareScoreByAttributeUrl: `${CONTENT_ANALYSIS_CONTEXT}/compare/contentScoreByAttribute/v2`,
		contentcatalogHealthUrl: `${CONTENT_ANALYSIS_CONTEXT}/catalogHealth`,

		fetchBrandsListUrl: `${NAVIGATION_CONTEXT}/brands`,
		fetchCategoriesListUrl: `${NAVIGATION_CONTEXT}/categories`,
		fetchProductsListUrl: `${NAVIGATION_CONTEXT}/productid`,
		fetchPresetsListUrl: `${NOTIFICATION_CONTEXT}/allpresets/v2`,

		availabilityOverallScoreUrl: `${AVAILABILITY_ANALYSIS_CONTEXT}/OverallScore/v2`,
		availabilityOverallScoreCompareUrl: `${AVAILABILITY_ANALYSIS_CONTEXT}/compare/OverallScore/v2`,
		availabilityBrandScoreUrl: `${AVAILABILITY_ANALYSIS_CONTEXT}/brandLevelScores`,
		availabilityBestSellerUrl: `${AVAILABILITY_ANALYSIS_CONTEXT}/bestSellers/overallScore/v2`,
		availabilityCompareOverallScoreUrl: `${AVAILABILITY_ANALYSIS_CONTEXT}/compare/overallScore`,
		availabilityCatalogHealthUrl: `${AVAILABILITY_ANALYSIS_CONTEXT}/catalogHealth`,
		availabilityCatalogHealthTableUrl: `${AVAILABILITY_ANALYSIS_CONTEXT}/catalogHealthTable`,
		availabilityCatalogHealthTabsUrl: `${AVAILABILITY_ANALYSIS_CONTEXT}/catalogHealthTabs`,
		availabilityLostBuyBoxDetUrl: `${AVAILABILITY_ANALYSIS_CONTEXT}/lostBuyBoxDet/v2`,
		availabilityLostBuyBoxTablesUrl: `${AVAILABILITY_ANALYSIS_CONTEXT}/lostBuyBoxTable`,

		paidShareOfShelfUrl: `${PAID_ANALYSIS_CONTEXT}/paidShareOfShelfScore`,
		paidShareOfShelfTableUrl: `${PAID_ANALYSIS_CONTEXT}/paidShareOfShelfTable`,
		paidCompareShareOfShelfUrl: `${DISCOVERABILITY_ANALYSIS_CONTEXT}/comaprePaidShareOfShelfScore`,
		paidCompareShareOfShelfTableUrl: `${DISCOVERABILITY_ANALYSIS_CONTEXT}/comparePaidShareOfShelfTable`,
		bestSellerPaidShareOfShelfScoreUrl: `${DISCOVERABILITY_ANALYSIS_CONTEXT}/bestSellers/paidShareOfShelfScores`,
		bestSellerPaidShareOfShelfTableUrl: `${DISCOVERABILITY_ANALYSIS_CONTEXT}/bestSellers/paidShareOfShelfTable`,

		organicShareOfShelfScoreUrl: `${DISCOVERABILITY_ANALYSIS_CONTEXT}/organicShareOfShelfScore`,
		organicCompareShareOfShelfScoreUrl: `${DISCOVERABILITY_ANALYSIS_CONTEXT}/compareOrganicShareOfShelfScore`,
		organicShareOfShelfTableUrl: `${DISCOVERABILITY_ANALYSIS_CONTEXT}/organicShareOfShelfTable`,
		organicCompareShareOfShelfTableUrl: `${DISCOVERABILITY_ANALYSIS_CONTEXT}/compareOrganicShareOfShelfTable`,
		bestSellerOrganicShareOfShelfScoreUrl: `${DISCOVERABILITY_ANALYSIS_CONTEXT}/bestSellers/organicShareOfShelfScores`,
		bestSellerOrganicShareOfShelfTableUrl: `${DISCOVERABILITY_ANALYSIS_CONTEXT}/bestSellers/organicShareOfShelfTable`,

		priceOverallScoreUrl: `${PRICE_PROMOTION_ANALYSIS_CONTEXT}/priceOverallScore`,
		priceCompareOverallScoreUrl: `${PRICE_PROMOTION_ANALYSIS_CONTEXT}/compare/priceOverallScore`,
		promotionOverallScoreUrl: `${PRICE_PROMOTION_ANALYSIS_CONTEXT}/promotionOverallScore`,
		promotionCompareOverallScoreUrl: `${PRICE_PROMOTION_ANALYSIS_CONTEXT}/compare/promotionOverallScore`,
		priceBestSellerUrl: `${PRICE_PROMOTION_ANALYSIS_CONTEXT}/bestSellers/priceOverallScore/v2`,
		promotionBestSellerUrl: `${PRICE_PROMOTION_ANALYSIS_CONTEXT}/bestSellers/promotionOverallScore/v2`,
		brandsPriceAndPromotionScoreUrl: `${PRICE_PROMOTION_ANALYSIS_CONTEXT}/brandsPriceAndPromotionScore`,
		promotionCountAndTypesUrl: `${PRICE_PROMOTION_ANALYSIS_CONTEXT}/promotionCountAndTypes`,
		priceAndPromotionScoreUrl: `${PRICE_PROMOTION_ANALYSIS_CONTEXT}/OverallScore`,
		priceAndPromotionCompareScoreUrl: `${PRICE_PROMOTION_ANALYSIS_CONTEXT}/compare/OverallScore`,
		promotionCompareCountAndTypesUrl: `${PRICE_PROMOTION_ANALYSIS_CONTEXT}/compare/promotionCountAndTypes`,
		promotionCompareCountAndTypesUrlV2: `${PRICE_PROMOTION_ANALYSIS_CONTEXT}/compare/promotionCountAndType/v2`,

		catalogHealthTabsUrl: `${CONTENT_ANALYSIS_CONTEXT}/catalogHealthTabs`,
		catalogHealthTableUrl: `${CONTENT_ANALYSIS_CONTEXT}/catalogHealthTable`,

		dashboardDiscoverabilityUrl: `${DASHBOARD_ANALYSIS_CONTEXT}/discoverability/overAllScore`,
		dashboardCompareDiscoverabilityUrl: `${DASHBOARD_ANALYSIS_CONTEXT}/discoverability/compareBrandScores`,
		dashboardConsiderationUrl: `${DASHBOARD_ANALYSIS_CONTEXT}/consideration/overAllScore`,
		dashboardCompareConsiderationUrl: `${DASHBOARD_ANALYSIS_CONTEXT}/consideration/compareBrandScores`,
		dashboardConversionUrl: `${DASHBOARD_ANALYSIS_CONTEXT}/conversion/overAllScore`,
		dashboardCompareConversionUrl: `${DASHBOARD_ANALYSIS_CONTEXT}/conversion/compareBrandScores`,

		salesOverallScoreUrl: `${SALES_ANALYSIS_CONTEXT}/overallscore/v2`,
		salesOverallRevenueUrl: `${SALES_ANALYSIS_CONTEXT}/overallrevenue`,
		salesBrandsTableUrl: `${SALES_ANALYSIS_CONTEXT}/brandstable`,
		salesCompareOverallScoreUrl: `${SALES_ANALYSIS_CONTEXT}/compareOverallScore/v2`,
		salesCompareOverallRevenueUrl: `${SALES_ANALYSIS_CONTEXT}/compareOverallRevenue`,
		salesShareOfUnitsUrl: `${SALES_ANALYSIS_CONTEXT}/shareOfUnits`,
		salesCompareShareOfUnitsUrl: `${SALES_ANALYSIS_CONTEXT}/CompareShareOfUnits`,
		salesCompareBrandsTableUrl: `${SALES_ANALYSIS_CONTEXT}/compare/brandstable`,

		fetchClientBrandsListUrl: `${NAVIGATION_CONTEXT}/clientBrands`,
		fetchCompetitorBrandsListUrl: `${NAVIGATION_CONTEXT}/competitorBrands`,
		fetchTopSellerBrandsListUrl: `${NAVIGATION_CONTEXT}/topSellerBrands`,
		fetchCountryMarketsListUrl: `${NAVIGATION_CONTEXT}/countryMarkets`,
		productDetailsUrl: `${PRODUCT_ANALYSIS_CONTEXT}/details`,

		fetchNotificationsListUrl: `${NOTIFICATION_CONTEXT}/allNotifications/v2`,
		updateNotificationStatusUrl: `${NOTIFICATION_CONTEXT}/markNotificationStatus`,
		fetchNotificationFilterUrl: `${NOTIFICATION_CONTEXT}/notificationFilter/v2`,

		bySearchBestSellerBrandUrl: `${BY_SEARCH}/bestSellers/ShareOfShelfScores`,
		bySearchBestSellerKeywordUrl: `${BY_SEARCH}/bestSellers/shareOfShelfTable`,
		bySearchShareOfShelfTableUrl: `${BY_SEARCH}/shareOfShelfTable`,
		bySearchCompareShareOfShelfTableUrl: `${BY_SEARCH}/compare/shareOfShelfTable`,
		bySearchOverallScoreUrl: `${BY_SEARCH}/OverallScore`,
		bySearchCompareOverallScoreUrl: `${BY_SEARCH}/compare/OverallScore`,

		summaryAttributeScoreURL: `${SUMMARY_CONTEXT}/summary/scoreByAttribute`,
		summaryOverallScoreURL: `${SUMMARY_CONTEXT}/summary/overallScore`,
		summaryCompareAttributeURL: `${SUMMARY_CONTEXT}/summary/compare/scoreByAttribute`,
		summaryCompareOverallScoreURL: `${SUMMARY_CONTEXT}/summary/compare/overallScore`
	},
	exportEndPoints: {
		contentCatalogHealthTableExport: `${CONTENT_ANALYSIS_CONTEXT}/csv/catalogHealthTable`,
		contentOverallScoreExport: `${CONTENT_ANALYSIS_CONTEXT}/csv/contentOverallScore/v2`,
		salesOverallScoreExportUrl: `${SALES_ANALYSIS_CONTEXT}/csv/overallScore/v2`
	}
};
