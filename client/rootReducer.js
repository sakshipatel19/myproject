import { combineReducers } from "redux";
import global from "./components/global-reducers";
import contentScore from "./components/PageContent/Content/content-reducers";
import filtersBar from "./components/PageContent/FiltersBar/filters-bar-reducer";
import availability from "./components/PageContent/Availability/availability-reducer";
import catalogDetail from "./components/PageContent/CatalogHealth/CatalogHealthDetail/cataloghealth-reducers";
import priceAndPromotion from "./components/PageContent/PriceAndPromotion/price-promotion-reducer";
import bySearch from "./components/PageContent/BySearch/by-search-reducer";
import brandCompare from "./components/PageContent/BrandCompare/BrandCompare-reducer";
import summaryScore from "./components/PageContent/Summary/summary-reducers";
import salesScore from "./components/PageContent/Sales/sales-reducer";
import notifications from "./components/Header/Notifications/notifications-reducer";
import productDetails from "./components/PageContent/ProductDetails/product-details-reducer";
import asinCompare from "./components/PageContent/AsinCompare/AsinCompare-reducer";
import presets from "./components/PageContent/Presets/presets-reducer";

const rootReducer = combineReducers({
	global,
	contentScore,
	filtersBar,
	availability,
	catalogDetail,
	priceAndPromotion,
	bySearch,
	brandCompare,
	summaryScore,
	salesScore,
	notifications,
	productDetails,
	asinCompare,
	presets
});

export default rootReducer;
