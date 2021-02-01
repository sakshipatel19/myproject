import { takeEvery, take, call, put, all } from "redux-saga/effects";
import * as actions from "./availability-constants";
import { REQUEST } from "../../../constants/actions";
import services from "../../../services/AvailabilityService";

function* watchOverallScore() {
	yield takeEvery(
		actions.GET_AVAILABILITY_OVERALL_SCORE[REQUEST],
		fetchOverallScore
	);
}

function* fetchOverallScore(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(services.callOverallScoreApi, payload);
		if (error) yield put(actions.getAvailabilityOverallScore.error(error));
		else yield put(actions.getAvailabilityOverallScore.success(result));
	} catch (error) {
		yield put(actions.getAvailabilityOverallScore.error(error));
	}
}
function* watchOverallScoreBrandCompare() {
	yield takeEvery(
		actions.GET_AVAILABILITY_BRAND_COMPARE_OVERALL_SCORE[REQUEST],
		fetchOverallScoreBrandCompare
	);
}

function* fetchOverallScoreBrandCompare(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			services.callOverallScoreBrandCompareApi,
			payload
		);
		if (error)
			yield put(actions.getAvailabilityBrandCompareOverallScore.error(error));
		else
			yield put(
				actions.getAvailabilityBrandCompareOverallScore.success(result)
			);
	} catch (error) {
		yield put(actions.getAvailabilityBrandCompareOverallScore.error(error));
	}
}

function* watchBestSellers() {
	yield takeEvery(
		actions.GET_AVAILABILITY_BEST_SELLER[REQUEST],
		fetchBestSellers
	);
}

function* fetchBestSellers(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(services.callBestSellerApi, payload);
		if (error) yield put(actions.getBestSeller.error(error));
		else yield put(actions.getBestSeller.success(result));
	} catch (error) {
		yield put(actions.getBestSeller.error(error));
	}
}

function* watchAvailabilityCatalogHealth() {
	yield takeEvery(
		actions.GET_AVAILABILITY_CATALOG_HEALTH[REQUEST],
		fetchAvailabilityCatalogHealth
	);
}

function* fetchAvailabilityCatalogHealth(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			services.callCatalogHealthApi,
			payload
		);
		if (error) yield put(actions.getAvailabilityCatalogHealth.error(error));
		else yield put(actions.getAvailabilityCatalogHealth.success(result));
	} catch (error) {
		yield put(actions.getAvailabilityCatalogHealth.error(error));
	}
}

function* watchLostBuyBox() {
	yield takeEvery(
		actions.GET_AVAILABILITY_LOST_BUY_BOX[REQUEST],
		fetchLostBuyBox
	);
}

function* fetchLostBuyBox(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(services.callLostBuyBoxApi, payload);
		if (error) yield put(actions.getAvailabilityLostBuyBox.error(error));
		else yield put(actions.getAvailabilityLostBuyBox.success(result));
	} catch (error) {
		yield put(actions.getAvailabilityLostBuyBox.error(error));
	}
}

function* watchAvailabilityBrandsScore() {
	yield takeEvery(
		actions.GET_AVAILABILITY_BRAND_SCORE[REQUEST],
		fetchAvailabilityBrandsScore
	);
}

function* fetchAvailabilityBrandsScore(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(services.callBrandsScoreApi, payload);
		if (error) yield put(actions.getAvailabilityBrandScore.error(error));
		else yield put(actions.getAvailabilityBrandScore.success(result));
	} catch (error) {
		yield put(actions.getAvailabilityBrandScore.error(error));
	}
}
function* watchAvailabilityCatalogueHealthTabs() {
	yield takeEvery(
		actions.GET_AVAILABILITY_CATALOGUE_HEALTH_TAB[REQUEST],
		fetchAvailabilityCatalogueHealthTabs
	);
}

function* fetchAvailabilityCatalogueHealthTabs(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			services.callAvailabilityCatalogHealthApiforTab,
			payload
		);
		if (error)
			yield put(actions.getAvailabilityCatalogueHealthTab.error(error));
		else yield put(actions.getAvailabilityCatalogueHealthTab.success(result));
	} catch (error) {
		yield put(actions.getAvailabilityCatalogueHealthTab.error(error));
	}
}

function* watchAvailabilityCatalogueHealthTable() {
	yield takeEvery(
		actions.GET_AVAILABILITY_CATALOGUE_HEALTH_TABLE[REQUEST],
		fetchAvailabilityCatalogueHealthTable
	);
}

function* fetchAvailabilityCatalogueHealthTable(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			services.callAvailabilityCatalogHealthApiforTable,
			payload
		);
		if (error)
			yield put(actions.getAvailabilityCatalogueHealthTable.error(error));
		else yield put(actions.getAvailabilityCatalogueHealthTable.success(result));
	} catch (error) {
		yield put(actions.getAvailabilityCatalogueHealthTable.error(error));
	}
}
export function* watchAvailabilityLostBuyBoxDetails() {
	yield takeEvery(
		actions.GET_AVAILABILITY_LOST_BUY_BOX_DETAILS[REQUEST],
		fetchAvailabilityLostBuyBoxDetails
	);
}

export function* fetchAvailabilityLostBuyBoxDetails(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			services.callAvailabilityLostBuyBoxDetails,
			payload
		);
		if (error) yield put(actions.getAvailabilityLostBuyBoxDetails.error(error));
		else yield put(actions.getAvailabilityLostBuyBoxDetails.success(result));
	} catch (error) {
		yield put(actions.getAvailabilityLostBuyBoxDetails.error(error));
	}
}

export default function* _watchAvailabilityActions() {
	yield all([
		watchBestSellers(),
		watchAvailabilityCatalogHealth(),
		watchOverallScore(),
		watchLostBuyBox(),
		watchAvailabilityBrandsScore(),
		watchAvailabilityCatalogueHealthTabs(),
		watchAvailabilityCatalogueHealthTable(),
		watchAvailabilityLostBuyBoxDetails(),
		watchOverallScoreBrandCompare()
	]);
}
