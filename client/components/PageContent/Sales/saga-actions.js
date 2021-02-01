import { takeEvery, take, call, put, all } from "redux-saga/effects";
import * as actions from "./sales-constants";
import { REQUEST } from "../../../constants/actions";
import services from "../../../services/SalesService";
import { DownloadResponse } from "../../../utils/download";


function* watchSalesBrandsTable() {
	yield takeEvery(
		actions.GET_SALES_BRANDS_TABLE[REQUEST],
		fetchSalesBrandsTable
	);
}

function* fetchSalesBrandsTable(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			services.fetchSalesBrandsTable,
			payload
		);
		if (error) yield put(actions.getSalesBrandsTable.error(error));
		else yield put(actions.getSalesBrandsTable.success(result));
	} catch (error) {
		yield put(actions.getSalesBrandsTable.error(error));
	}
}

function* watchSalesOverallScore() {
	yield takeEvery(
		actions.GET_SALES_OVERALL_SCORE[REQUEST],
		fetchSalesOverallScore
	);
}

function* fetchSalesOverallScore(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			services.fetchOverallSalesScore,
			payload
		);
		if (error) yield put(actions.getSalesOverallScore.error(error));
		else yield put(actions.getSalesOverallScore.success(result));
	} catch (error) {
		yield put(actions.getSalesOverallScore.error(error));
	}
}

function* watchSalesCompareBrandsTable() {
	yield takeEvery(
		actions.GET_SALES_COMPARE_BRANDS_TABLE[REQUEST],
		fetchSalesCompareBrandsTable
	);
}

function* fetchSalesCompareBrandsTable(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			services.fetchSalesCompareBrandsTable,
			payload
		);
		if (error) yield put(actions.getSalesCompareBrandsTable.error(error));
		else yield put(actions.getSalesCompareBrandsTable.success(result));
	} catch (error) {
		yield put(actions.getSalesCompareBrandsTable.error(error));
	}
}

function* watchSalesCompareOverallScore() {
	yield takeEvery(
		actions.GET_SALES_COMPARE_OVERALL_SCORE[REQUEST],
		fetchSalesCompareOverallScore
	);
}

function* fetchSalesCompareOverallScore(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			services.fetchCompareOverallSalesScore,
			payload
		);
		if (error) yield put(actions.getSalesCompareOverallScore.error(error));
		else yield put(actions.getSalesCompareOverallScore.success(result));
	} catch (error) {
		yield put(actions.getSalesCompareOverallScore.error(error));
	}
}

function* watchSalesOverallScoreExport() {
	yield takeEvery(
		actions.EXPORT_SALES_OVERALL_SCORE[REQUEST],
		fetchSalesOverallScoreExport
	);
}

function* fetchSalesOverallScoreExport(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			services.callSalesOverallScoreExport,
			payload
		);
		
		if (error) yield put(actions.exportSalesOverallScore.error(error));
		else {
			yield put(actions.exportSalesOverallScore.success(result));
			yield call(DownloadResponse(result, payload));
			
		}
	} catch (error) {
		yield put(actions.exportSalesOverallScore.error(error));
	}
}

export default function* _watchSalesActions() {
	yield all([
		watchSalesBrandsTable(),
		watchSalesOverallScore(),
		watchSalesCompareBrandsTable(),
		watchSalesCompareOverallScore(),
		watchSalesOverallScoreExport()
	]);
}
