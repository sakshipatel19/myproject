import { runSaga } from "redux-saga";
import { takeEvery, take, call, put, all } from "redux-saga/effects";
import * as presetSaga from "../presets-saga-actions";
import * as actions from "../presets-constants";
import services from "../../../../services/PresetsService";
import { REQUEST } from "../../../../constants/actions";

const recordSaga = async (saga, intialAction) => {
    const dispatched = [];
    await runSaga(
        {
            dispatch: action => dispatched.push(action)
        },
        saga,
        intialAction
    );
    return dispatched;
};
const mockApi = (api, mockData, promiseMethod) => {
    return jest
        .spyOn(services, api)
        .mockImplementation(() => Promise[promiseMethod](mockData));
};
describe("Testing Presets Saga Actions", () => {
    test("Watch Action", () => {
        const yeildEffect = presetSaga.watchPresets();
        expect(yeildEffect.next().value).toEqual(
            takeEvery(
                actions.GET_PRESETS[REQUEST],
                presetSaga.fetchPresets
            )
        );
    });
    test("Fetch success action", async () => {
        const mockApiData = { result: { payload: "Test" }, error: false };
        const callPresets = mockApi(
            "callPresets",
            mockApiData,
            "resolve"
        );

        const dispatched = await recordSaga(
            presetSaga.fetchPresets,
            mockApiData
        );
        expect(callPresets).toHaveBeenCalledTimes(1);
        expect(dispatched[0]).toEqual(
            actions.getPresets.success(mockApiData.result)
        );
        callPresets.mockClear();
    });
    test("Fetch error action", async () => {
        const mockApiData = { result: { payload: "Test" }, error: true };
        const callPresets = mockApi(
            "callPresets",
            mockApiData,
            "resolve"
        );

        const dispatched = await recordSaga(
            presetSaga.fetchPresets,
            mockApiData
        );
        expect(callPresets).toHaveBeenCalledTimes(1);
        expect(dispatched[0]).toEqual(
            actions.getPresets.error(mockApiData.error)
        );
        callPresets.mockClear();
    });
    test("Fetch try block error action", async () => {
        const mockApiData = { result: { payload: "Test" }, error: true };
        const callPresets = mockApi(
            "callPresets",
            mockApiData.error,
            "reject"
        );

        const dispatched = await recordSaga(
            presetSaga.fetchPresets,
            mockApiData
        );
        expect(callPresets).toHaveBeenCalledTimes(1);
        expect(dispatched[0]).toEqual(
            actions.getPresets.error(mockApiData.error)
        );
        callPresets.mockClear();
    });
});