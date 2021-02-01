import { takeEvery, take, call, put, all } from "redux-saga/effects";
import * as actions from "./summary-constants";
import { REQUEST } from "../../../constants/actions";
import SummaryService from "../../../services/SummaryService";

export function* watchOverallScore() {
	yield takeEvery(
		actions.GET_SUMMARY_OVERALL_SCORE[REQUEST],
		fetchOverallScore
	);
}

export function* fetchOverallScore(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			SummaryService.callOverallScoreApi,
			payload
		);
		if (error) yield put(actions.getSummaryOverallScore.error(error));
		else yield put(actions.getSummaryOverallScore.success(result));
	} catch (error) {
		yield put(actions.getSummaryOverallScore.error(error));
	}
}
export function* watchOverallScoreBrandCompare() {
	yield takeEvery(
		actions.GET_SUMMARY_BRAND_COMPARE_OVERALL_SCORE[REQUEST],
		fetchOverallScoreBrandCompare
	);
}

export function* fetchOverallScoreBrandCompare(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			SummaryService.callOverallScoreBrandCompareApi,
			payload
		);
		if (error)
			yield put(actions.getSummaryBrandCompareOverallScore.error(error));
		else yield put(actions.getSummaryBrandCompareOverallScore.success(result));
	} catch (error) {
		yield put(actions.getSummaryBrandCompareOverallScore.error(error));
	}
}

export function* watchSummaryAttributeScore() {
	yield takeEvery(
		actions.GET_SUMMARY_ATTRIBUTE_SCORE[REQUEST],
		fetchSummaryAttributeScore
	);
}

export function* fetchSummaryAttributeScore(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			SummaryService.callAttributeScoreApi,
			payload
		);
		if (error) yield put(actions.getSummaryAttributeScore.error(error));
		else yield put(actions.getSummaryAttributeScore.success(result));
	} catch (error) {
		yield put(actions.getSummaryAttributeScore.error(error));
	}
}

function* watchBrandCompareAttributeScore() {
	yield takeEvery(
		actions.GET_SUMMARY_COMPARE_ATTRIBUTE_SCORE[REQUEST],
		fetchBrandCompareAttributeScore
	);
}

function* fetchBrandCompareAttributeScore(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			SummaryService.callCompareAttributeScoreApi,
			payload
		);
		if (error) yield put(actions.getSummaryCompareAttributeScore.error(error));
		else yield put(actions.getSummaryCompareAttributeScore.success(result));
	} catch (error) {
		yield put(actions.getSummaryCompareAttributeScore.error(error));
	}
}

export default function* _watchSummaryActions() {
	yield all([
		watchOverallScore(),
		watchOverallScoreBrandCompare(),
		watchSummaryAttributeScore(),
		watchBrandCompareAttributeScore()
	]);
}
