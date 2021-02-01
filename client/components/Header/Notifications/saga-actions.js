import { takeEvery, take, call, put, all } from "redux-saga/effects";
import * as actions from "./notifications-constants";
import { REQUEST } from "../../../constants/actions";
import NotificationService from "../../../services/NotificationService";

function* watchGetNotificationsList() {
	yield takeEvery(
		actions.GET_NOTIFICATION_LIST[REQUEST],
		fetchGetNotificationsList
	);
}

function* fetchGetNotificationsList(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			NotificationService.getNotificationList,
			payload
		);
		if (error) yield put(actions.getNotificationList.error(error));
		else yield put(actions.getNotificationList.success(result));
	} catch (error) {
		yield put(actions.getNotificationList.error(error));
	}
}

function* watchLoadMoreNotificationsList() {
	yield takeEvery(
		actions.APPEND_NOTIFICATION_LIST[REQUEST],
		fetchLoadMoreNotificationsList
	);
}

function* fetchLoadMoreNotificationsList(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			NotificationService.getNotificationList,
			payload
		);
		if (error) yield put(actions.appendNotificationList.error(error));
		else yield put(actions.appendNotificationList.success(result));
	} catch (error) {
		yield put(actions.appendNotificationList.error(error));
	}
}

function* watchUpdateNotificationStatus() {
	yield takeEvery(
		actions.UPDATE_NOTIFICATION_STATUS[REQUEST],
		fetchUpdateNotificationStatus
	);
}

function* fetchUpdateNotificationStatus(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			NotificationService.updateNotificationStatus,
			payload
		);
		if (error) yield put(actions.updateNotificationStatus.error(error));
		else yield put(actions.updateNotificationStatus.success(result));
	} catch (error) {
		yield put(actions.updateNotificationStatus.error(error));
	}
}

function* watchNotificationFilter() {
	yield takeEvery(
		actions.GET_NOTIFICATION_FILTER[REQUEST],
		fetchNotificationFilter
	);
}

function* fetchNotificationFilter(action) {
	const { payload } = action;
	try {
		const { result, error } = yield call(
			NotificationService.getNotificationFilters,
			payload
		);
		if (error) yield put(actions.getNotificationFilter.error(error));
		else yield put(actions.getNotificationFilter.success(result));
	} catch (error) {
		yield put(actions.getNotificationFilter.error(error));
	}
}

export default function* _watchNotificationActions() {
	yield all([
		watchGetNotificationsList(),
		watchLoadMoreNotificationsList(),
		watchUpdateNotificationStatus(),
		watchNotificationFilter()
	]);
}
