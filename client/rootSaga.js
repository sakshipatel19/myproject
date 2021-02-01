import { all } from "redux-saga/effects";
import _watchContentActions from "./components/PageContent/Content/saga-actions";
import _watchFilterActions from "./components/PageContent/FiltersBar/filters-saga-actions";
import _watchAvailabilityActions from "./components/PageContent/Availability/saga-actions";
import _watchPriceAndPromotionActions from "./components/PageContent/PriceAndPromotion/saga-actions";
import _watchDiscBySearchActions from "./components/PageContent/BySearch/saga-actions";
import _watchBrandCompareActions from "./components/PageContent/BrandCompare/BrandCompare-sagas";
import _watchSummaryActions from "./components/PageContent/Summary/saga-actions";
import _watchSalesActions from "./components/PageContent/Sales/saga-actions";
import _watchNotificationActions from "./components/Header/Notifications/saga-actions";
import _watchProductDetailsPageActions from "./components/PageContent/ProductDetails/saga-actions";
import _watchPresetModalActions from "./components/PageContent/Presets/presets-saga-actions";

export default function* rootSaga() {
	yield all([
		_watchContentActions(),
		_watchFilterActions(),
		_watchAvailabilityActions(),
		_watchPriceAndPromotionActions(),
		_watchDiscBySearchActions(),
		_watchBrandCompareActions(),
		_watchSummaryActions(),
		_watchSalesActions(),
		_watchNotificationActions(),
		_watchProductDetailsPageActions(),
		_watchPresetModalActions()
	]);
}
