import { take, call, put, all, takeEvery } from "redux-saga/effects";
import * as actions from "./filters-constants";
import { REQUEST } from "../../../constants/actions";
import FilterService from "../../../services/FilterService";

function* watchBrandsList() {
	yield takeEvery(actions.FETCH_BRANDS_LIST[REQUEST], fetchBrandsList);
}

function* fetchBrandsList(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			FilterService.fetchBrandsList,
			payload
		);
		if (error) yield put(actions.fetchBrandsList.error(error));
		else yield put(actions.fetchBrandsList.success(result));
	} catch (error) {
		yield put(actions.fetchBrandsList.error(error));
	}
}

function* watchCategoriesList() {
	yield takeEvery(actions.FETCH_CATEGORIES_LIST[REQUEST], fetchCategoriesList);
}

function* fetchCategoriesList(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			FilterService.fetchCategoriesList,
			payload
		);
		if (error) yield put(actions.fetchCategoriesList.error(error));
		else yield put(actions.fetchCategoriesList.success(result));
	} catch (error) {
		yield put(actions.fetchCategoriesList.error(error));
	}
}

function* watchProductsList() {
	yield takeEvery(actions.FETCH_PRODUCTS_LIST[REQUEST], fetchProductsList);
}

function* fetchProductsList(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			FilterService.fetchProductsList,
			payload
		);
		if (error) yield put(actions.fetchProductsList.error(error));
		else yield put(actions.fetchProductsList.success(result));
	} catch (error) {
		yield put(actions.fetchProductsList.error(error));
	}
}

function* watchPresetsList() {
	yield takeEvery(actions.FETCH_PRESETS_LIST[REQUEST], fetchPresetsList);
}

function* fetchPresetsList(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			FilterService.fetchPresetsList,
			payload
		);
		if (error) yield put(actions.fetchPresetsList.error(error));
		else yield put(actions.fetchPresetsList.success(result));
	} catch (error) {
		yield put(actions.fetchPresetsList.error(error));
	}
}

export default function* _watchFilterActions() {
	yield all([
		watchBrandsList(),
		watchCategoriesList(),
		watchProductsList(),
		watchPresetsList()
	]);
}
