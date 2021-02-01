import { takeEvery, take, call, put, all } from "redux-saga/effects";

import * as actions from "./BrandCompare-constants";
import { REQUEST } from "../../../constants/actions";
import services from "../../../services/FilterService";

function* watchClientBrandsList() {
	yield takeEvery(
		actions.GET_CLIENT_BRANDS_LIST[REQUEST],
		fetchClientBrandsList
	);
}

function* fetchClientBrandsList(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			services.fetchClientBrandsList,
			payload
		);
		if (error) yield put(actions.getClientBrandsList.error(error));
		else yield put(actions.getClientBrandsList.success(result));
	} catch (error) {
		yield put(actions.getClientBrandsList.error(error));
	}
}

function* watchCompetitorBrandsList() {
	yield takeEvery(
		actions.GET_COMPETITOR_BRANDS_LIST[REQUEST],
		fetchCompetitorBrandsList
	);
}

function* fetchCompetitorBrandsList(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			services.fetchCompetitorBrandsList,
			payload
		);
		if (error) yield put(actions.getCompetitorBrandsList.error(error));
		else yield put(actions.getCompetitorBrandsList.success(result));
	} catch (error) {
		yield put(actions.getCompetitorBrandsList.error(error));
	}
}

function* watchTopSellerBrandsList() {
	yield takeEvery(
		actions.GET_TOPSELLER_BRANDS_LIST[REQUEST],
		fetchTopSellerBrandsList
	);
}

function* fetchTopSellerBrandsList(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			services.fetchTopSellerBrandsList,
			payload
		);
		if (error) yield put(actions.getTopSellerBrandsList.error(error));
		else yield put(actions.getTopSellerBrandsList.success(result));
	} catch (error) {
		yield put(actions.getTopSellerBrandsList.error(error));
	}
}

export default function* _watchBrandCompareActions() {
	yield all([
		watchClientBrandsList(),
		watchCompetitorBrandsList(),
		watchTopSellerBrandsList()
	]);
}
