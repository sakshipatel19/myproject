import { takeEvery, take, call, put, all } from "redux-saga/effects";
import * as actions from "./by-search-constants";
import { REQUEST } from "../../../constants/actions";
import services from "../../../services/DiscoverabilityBySearchService";

function* watchBestSellers() {
	yield takeEvery(
		actions.GET_DISC_BY_SEARCH_BEST_SELLER[REQUEST],
		fetchBestSellers
	);
}

function* fetchBestSellers(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			services.callBestSellerShareShelfScoreApi,
			payload
		);
		if (error) yield put(actions.getDiscBySearchBestSeller.error(error));
		else yield put(actions.getDiscBySearchBestSeller.success(result));
	} catch (error) {
		yield put(actions.getDiscBySearchBestSeller.error(error));
	}
}
function* watchKeywordsTable() {
	yield takeEvery(
		actions.GET_BY_SEARCH_KEYWORDS_TABLE_DATA[REQUEST],
		fetchBySearchKeywordsTable
	);
}

function* fetchBySearchKeywordsTable(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			services.callBySearchKeywordTableApi,
			payload
		);
		if (error) yield put(actions.getBySearchKeywordsTableData.error(error));
		else yield put(actions.getBySearchKeywordsTableData.success(result));
	} catch (error) {
		yield put(actions.getBySearchKeywordsTableData.error(error));
	}
}

function* watchBrandCompareKeywordsTable() {
	yield takeEvery(
		actions.GET_BY_SEARCH_BRAND_COMPARE_KEYWORDS_TABLE_DATA[REQUEST],
		fetchBySearchBrandCompareKeywordsTable
	);
}

function* fetchBySearchBrandCompareKeywordsTable(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			services.callBySearchBrandCompareKeywordTableApi,
			payload
		);
		if (error)
			yield put(actions.getBySearchBrandCompareKeywordsTableData.error(error));
		else
			yield put(
				actions.getBySearchBrandCompareKeywordsTableData.success(result)
			);
	} catch (error) {
		yield put(actions.getBySearchBrandCompareKeywordsTableData.error(error));
	}
}

function* watchBestSellersKeywordDetail() {
	yield takeEvery(
		actions.GET_DISC_BY_SEARCH_BEST_SELLER_KEYWORD_DETAIL[REQUEST],
		fetchBestSellersKeywordDetail
	);
}

function* fetchBestSellersKeywordDetail(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			services.callBestSellerKeywordShareShelfTableApi,
			payload
		);
		if (error)
			yield put(actions.getDiscBySearchBestSellerKeywordDetail.error(error));
		else
			yield put(actions.getDiscBySearchBestSellerKeywordDetail.success(result));
	} catch (error) {
		yield put(actions.getDiscBySearchBestSellerKeywordDetail.error(error));
	}
}

function* watchBySearchOverallScore() {
	yield takeEvery(
		actions.GET_DISC_BY_SEARCH_OVERALL_SCORE[REQUEST],
		fetchBySearchOverallScore
	);
}

function* fetchBySearchOverallScore(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			services.callBySearchOverallScoreApi,
			payload
		);
		if (error) yield put(actions.getDiscBySearchOverallScore.error(error));
		else yield put(actions.getDiscBySearchOverallScore.success(result));
	} catch (error) {
		yield put(actions.getDiscBySearchOverallScore.error(error));
	}
}

function* watchBySearchBrandCompareOverallScore() {
	yield takeEvery(
		actions.GET_DISC_BY_SEARCH_BRAND_COMPARE_OVERALL_SCORE[REQUEST],
		fetchBySearchBrandCompareOverallScore
	);
}

function* fetchBySearchBrandCompareOverallScore(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			services.callBySearchCompareOverallScoreApi,
			payload
		);
		if (error)
			yield put(actions.getDiscBySearchBrandCompareOverallScore.error(error));
		else
			yield put(
				actions.getDiscBySearchBrandCompareOverallScore.success(result)
			);
	} catch (error) {
		yield put(actions.getDiscBySearchBrandCompareOverallScore.error(error));
	}
}

export default function* _watchDiscBySearchActions() {
	yield all([
		watchBestSellers(),
		watchKeywordsTable(),
		watchBestSellersKeywordDetail(),
		watchBySearchOverallScore(),
		watchBrandCompareKeywordsTable(),
		watchBySearchBrandCompareOverallScore()
	]);
}
