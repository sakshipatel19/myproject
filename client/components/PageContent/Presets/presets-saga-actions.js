import { takeEvery, call, put, all } from "redux-saga/effects";
import * as actions from "./presets-constants";
import { REQUEST } from "../../../constants/actions";
import PresetsService from "../../../services/PresetsService";

export function* watchPresets() {
    yield takeEvery(
        actions.GET_PRESETS[REQUEST],
        fetchPresets
    );
}

export function* fetchPresets(action) {
    const { payload } = action;
    try {
        const { result, error } = yield call(
            PresetsService.callPresets,
            payload
        );
        if (error)
            yield put(actions.getPresets.error(error));
        else yield put(actions.getPresets.success(result));
    } catch (error) {
        yield put(actions.getPresets.error(error));
    }
}

export default function* _watchPresetModalActions() {
    yield all([
        watchPresets()
    ]);
}