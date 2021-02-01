import { takeEvery, take, call, put, all } from "redux-saga/effects";
import * as actions from "./content-constants";
import { REQUEST } from "../../../constants/actions";
import ContentService from "../../../services/ContentService";
import { DownloadResponse } from "../../../utils/download";

function* watchBestSellers() {
	yield takeEvery(actions.GET_CONTENT_BEST_SELLER[REQUEST], fetchBestSellers);
}

function* fetchBestSellers(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			ContentService.callBestSellerApi,
			payload
		);
		if (error) yield put(actions.getBestSeller.error(error));
		else yield put(actions.getBestSeller.success(result));
	} catch (error) {
		yield put(actions.getBestSeller.error(error));
	}
}

function* watchContentCatalogHealth() {
	yield takeEvery(
		actions.GET_CONTENT_CATALOG_HEALTH[REQUEST],
		fetchContentCatalogHealth
	);
}

function* fetchContentCatalogHealth(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			ContentService.callContentCatalogHealthApi,
			payload
		);
		if (error) yield put(actions.getContentCatalogHealth.error(error));
		else yield put(actions.getContentCatalogHealth.success(result));
	} catch (error) {
		yield put(actions.getContentCatalogHealth.error(error));
	}
}

function* watchContentAttributes() {
	yield takeEvery(
		actions.GET_CONTENT_ATTRIBUTES[REQUEST],
		fetchContentAttributes
	);
}

function* fetchContentAttributes(action) {
	const { payload } = action;
	try {
		const res = yield call(ContentService.callAttributeScoreApi, payload);
		yield put(actions.getContentAttributes.success(res.result));
	} catch (error) {
		yield put(actions.getContentAttributes.error(error));
	}
}

function* watchOverallContentScore() {
	yield takeEvery(
		actions.GET_CONTENT_OVERALL_SCORE[REQUEST],
		fetchOverallContentScore
	);
}

function* fetchOverallContentScore(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			ContentService.callOverallScoreApi,
			payload
		);
		if (error) yield put(actions.getContentOverallScore.error(error));
		else yield put(actions.getContentOverallScore.success(result));
	} catch (error) {
		yield put(actions.getContentOverallScore.error(error));
	}
}

function* watchContentBrandScore() {
	yield takeEvery(
		actions.GET_CONTENT_BRANDS_SCORE[REQUEST],
		fetchContentBrandScore
	);
}

function* fetchContentBrandScore(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			ContentService.callBrandsScoreApi,
			payload
		);
		if (error) yield put(actions.getContentBrandScore.error(error));
		else yield put(actions.getContentBrandScore.success(result));
	} catch (error) {
		yield put(actions.getContentBrandScore.error(error));
	}
}

function* watchContentCatalogueHealthTabs() {
	yield takeEvery(
		actions.GET_CATALOGUE_HEALTH_TAB[REQUEST],
		fetchContentCatalogueHealthTabs
	);
}

function* fetchContentCatalogueHealthTabs(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			ContentService.callContentCatalogHealthApiforTab,
			payload
		);
		if (error) yield put(actions.getCatalogueHealthTab.error(error));
		else yield put(actions.getCatalogueHealthTab.success(result));
	} catch (error) {
		yield put(actions.getCatalogueHealthTab.error(error));
	}
}

function* watchContentCatalogueHealthTable() {
	yield takeEvery(
		actions.GET_CATALOGUE_HEALTH_TABLE[REQUEST],
		fetchContentCatalogueHealthTable
	);
}

function* fetchContentCatalogueHealthTable(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			ContentService.callContentCatalogHealthApiforTable,
			payload
		);
		if (error) yield put(actions.getCatalogueHealthTable.error(error));
		else yield put(actions.getCatalogueHealthTable.success(result));
	} catch (error) {
		yield put(actions.getCatalogueHealthTable.error(error));
	}
}

function* watchContentBrandCompareOverallScore() {
	yield takeEvery(
		actions.GET_CONTENT_BRAND_COMPARE_OVERALL_SCORE[REQUEST],
		fetchContentBrandCompareOverallScore
	);
}

function* fetchContentBrandCompareOverallScore(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			ContentService.callBrandCompareOverallScoreApi,
			payload
		);
		if (error) yield put(actions.getContentOverallScore.error(error));
		else yield put(actions.getContentOverallScore.success(result));
	} catch (error) {
		yield put(actions.getContentOverallScore.error(error));
	}
}

function* watchContentBrandCompareAttributes() {
	yield takeEvery(
		actions.GET_CONTENT_BRAND_COMPARE_ATTRIBUTES[REQUEST],
		fetchContentBrandCompareAttributes
	);
}

function* fetchContentBrandCompareAttributes(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			ContentService.callBrandCompareAttributeScoreApi,
			payload
		);
		if (error) yield put(actions.getContentBrandCompareAttributes.error(error));
		else yield put(actions.getContentBrandCompareAttributes.success(result));
	} catch (error) {
		yield put(actions.getContentBrandCompareAttributes.error(error));
	}
}

function* watchContentCatalogHelathTableExport() {
	yield takeEvery(
		actions.EXPORT_CONTENT_CATALOG_HEALTH_TABLE[REQUEST],
		fetchContentCatalogHelathTableExport
	);
}

function* fetchContentCatalogHelathTableExport(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			ContentService.callContentCatalogHealthApiforTableExport,
			payload
		);

		if (error) yield put(actions.exportContentCatalogHealthTable.error(error));
		else {
			yield put(actions.exportContentCatalogHealthTable.success(result));
			yield call(DownloadResponse(result, payload));
		}
	} catch (error) {
		yield put(actions.exportContentCatalogHealthTable.error(error));
	}
}

function* watchContentOverallScoreExport() {
	yield takeEvery(
		actions.EXPORT_CONTENT_OVERALL_SCORE[REQUEST],
		fetchContentOverallScoreExport
	);
}

function* fetchContentOverallScoreExport(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			ContentService.callContentOverallScoreExport,
			payload
		);

		if (error) yield put(actions.exportContentOverallScore.error(error));
		else {
			yield put(actions.exportContentOverallScore.success(result));
			yield call(DownloadResponse(result, payload));
		}
	} catch (error) {
		yield put(actions.exportContentOverallScore.error(error));
	}
}

export default function* _watchContentActions() {
	yield all([
		watchBestSellers(),
		watchContentCatalogHealth(),
		watchContentAttributes(),
		watchOverallContentScore(),
		watchContentBrandScore(),
		watchContentCatalogueHealthTabs(),
		watchContentCatalogueHealthTable(),
		watchContentBrandCompareOverallScore(),
		watchContentBrandCompareAttributes(),
		watchContentCatalogHelathTableExport(),
		watchContentOverallScoreExport()
	]);
}
