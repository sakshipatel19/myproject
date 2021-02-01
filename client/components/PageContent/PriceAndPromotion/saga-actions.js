import { takeEvery, take, call, put, all } from "redux-saga/effects";
import * as actions from "./price-promotion-constants";
import { REQUEST } from "../../../constants/actions";
import services from "../../../services/PriceAndPromotionService";

function* watchOverallPricePromotionScore() {
	yield takeEvery(
		actions.GET_PRICE_PROMOTION_OVERALL_SCORE[REQUEST],
		fetchOverallPricePromotionScore
	);
}

function* fetchOverallPricePromotionScore(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(services.callOverallScoreApi, payload);
		if (error) yield put(actions.getPricePromotionOverallScore.error(error));
		else yield put(actions.getPricePromotionOverallScore.success(result));
	} catch (error) {
		yield put(actions.getPricePromotionOverallScore.error(error));
	}
}

function* watchPriceBestSellers() {
	yield takeEvery(
		actions.GET_PRICE_BEST_SELLER[REQUEST],
		fetchPriceBestSellers
	);
}

function* fetchPriceBestSellers(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			services.fetchPriceBestSeller,
			payload
		);
		if (error) yield put(actions.getPriceBestSeller.error(error));
		else yield put(actions.getPriceBestSeller.success(result));
	} catch (error) {
		yield put(actions.getPriceBestSeller.error(error));
	}
}

function* watchPromotionBestSellers() {
	yield takeEvery(
		actions.GET_PROMOTION_BEST_SELLER[REQUEST],
		fetchPromotionBestSellers
	);
}

function* fetchPromotionBestSellers(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			services.fetchPromotionBestSeller,
			payload
		);
		if (error) yield put(actions.getPromotionBestSeller.error(error));
		else yield put(actions.getPromotionBestSeller.success(result));
	} catch (error) {
		yield put(actions.getPromotionBestSeller.error(error));
	}
}

function* watchPromotionCountAndType() {
	yield takeEvery(
		actions.GET_PROMOTION_COUNT_AND_TYPE[REQUEST],
		fetchPromotionCountAndType
	);
}

function* fetchPromotionCountAndType(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			services.fetchPromotionCountAndTypes,
			payload
		);
		if (error) yield put(actions.getPromotionCountAndType.error(error));
		else yield put(actions.getPromotionCountAndType.success(result));
	} catch (error) {
		yield put(actions.getPromotionCountAndType.error(error));
	}
}
function* watchBrandLevelScores() {
	yield takeEvery(
		actions.GET_PRICE_AND_PROMOTION_BRAND_LEVEL_SCORES[REQUEST],
		fetchBrandLevelScores
	);
}

function* fetchBrandLevelScores(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			services.fetchBrandLevelScores,
			payload
		);
		if (error) yield put(actions.getBrandLevelScores.error(error));
		else yield put(actions.getBrandLevelScores.success(result));
	} catch (error) {
		yield put(actions.getBrandLevelScores.error(error));
	}
}
function* watchPromotionCountBrandCompare() {
	yield takeEvery(
		actions.GET_PRICE_AND_PROMOTION_COUNT_BRAND_COMPARE[REQUEST],
		fetchPromotionCountBrandCompare
	);
}

function* watchBrandCompareOverallPricePromotionScore() {
	yield takeEvery(
		actions.GET_PRICE_PROMOTION_BRAND_COMPARE_OVERALL_SCORE[REQUEST],
		fetchBrandCompareOverallPricePromotionScore
	);
}

function* fetchBrandCompareOverallPricePromotionScore(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			services.fetchBrandCompareOverallScores,
			payload
		);
		if (error)
			yield put(actions.getPricePromotionBrandCompareScore.error(error));
		else yield put(actions.getPricePromotionBrandCompareScore.success(result));
	} catch (error) {
		yield put(actions.getPricePromotionBrandCompareScore.error(error));
	}
}

function* fetchPromotionCountBrandCompare(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			services.fetchPromotionCountBrandCompareApi,
			payload
		);
		if (error) yield put(actions.getPromotionCountBrandCompare.error(error));
		else yield put(actions.getPromotionCountBrandCompare.success(result));
	} catch (error) {
		yield put(actions.getPromotionCountBrandCompare.error(error));
	}
}
export default function* _watchPriceAndPromotionActions() {
	yield all([
		watchOverallPricePromotionScore(),
		watchPriceBestSellers(),
		watchPromotionBestSellers(),
		watchPromotionCountAndType(),
		watchBrandLevelScores(),
		watchBrandCompareOverallPricePromotionScore(),
		watchPromotionCountBrandCompare()
	]);
}
