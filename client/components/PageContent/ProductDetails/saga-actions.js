import { takeEvery, call, put, all } from "redux-saga/effects";
import * as actions from "./product-details-constants";
import { REQUEST } from "../../../constants/actions";
import ProductDetailsService from "../../../services/ProductDetailsService";

function* watchProductDetails() {
	yield takeEvery(
		actions.GET_PRODUCT_DETAILS_IN_ASIN_LANDING_PAGE[REQUEST],
		fetchProductDetails
	);
}

function* fetchProductDetails(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			ProductDetailsService.callProductDetailScoreApi,
			payload
		);
		if (error)
			yield put(actions.getProductDetailsInAsinLandingPage.error(error));
		else yield put(actions.getProductDetailsInAsinLandingPage.success(result));
	} catch (error) {
		yield put(actions.getProductDetailsInAsinLandingPage.error(error));
	}
}
function* watchAsinOverAllScore() {
	yield takeEvery(
		actions.GET_ASIN_OVERALL_SCORE[REQUEST],
		fetchAsinOverAllScore
	);
}

function* fetchAsinOverAllScore(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			ProductDetailsService.callAsinOverallScoreApi,
			payload
		);
		if (error) yield put(actions.getAsinOverallScore.error(error));
		else yield put(actions.getAsinOverallScore.success(result));
	} catch (error) {
		yield put(actions.getAsinOverallScore.error(error));
	}
}
function* watchAsinBrandCompareOverAllScore() {
	yield takeEvery(
		actions.GET_ASIN_BRAND_COMPARE_OVERALL_SCORE[REQUEST],
		fetchAsinBrandCompareOverAllScore
	);
}

function* fetchAsinBrandCompareOverAllScore(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			ProductDetailsService.callAsinBrandCompareOverallScoreApi,
			payload
		);
		if (error) yield put(actions.getAsinBrandCompareOverallScore.error(error));
		else yield put(actions.getAsinBrandCompareOverallScore.success(result));
	} catch (error) {
		yield put(actions.getAsinBrandCompareOverallScore.error(error));
	}
}
function* watchProductDetailsOverallScore() {
	yield takeEvery(
		actions.GET_PRODUCT_DETAILS_OVERALL_SCORE[REQUEST],
		fetchProductDetailsOverallScore
	);
}

function* fetchProductDetailsOverallScore(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			ProductDetailsService.callProductOverallScoreApi,
			payload
		);
		if (error) yield put(actions.getProductDetailsOverallScore.error(error));
		else yield put(actions.getProductDetailsOverallScore.success(result));
	} catch (error) {
		yield put(actions.getProductDetailsOverallScore.error(error));
	}
}
function* watchProductDetailsCompareOverallScore() {
	yield takeEvery(
		actions.GET_PRODUCT_DETAILS_COMPARE_OVERALL_SCORE[REQUEST],
		fetchProductDetailsCompareOverallScore
	);
}

function* fetchProductDetailsCompareOverallScore(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			ProductDetailsService.callProductCompareOverallScoreApi,
			payload
		);
		if (error) yield put(actions.getProductDetailsCompareOverallScore.error(error));
		else yield put(actions.getProductDetailsCompareOverallScore.success(result));
	} catch (error) {
		yield put(actions.getProductDetailsCompareOverallScore.error(error));
	}
}

export default function* _watchProductDetailsPageActions() {
	yield all([
		watchProductDetails(),
		watchAsinOverAllScore(),
		watchProductDetailsOverallScore(),
		watchAsinBrandCompareOverAllScore(),
		watchProductDetailsCompareOverallScore()
	]);
}
