import { runSaga } from "redux-saga";
import { takeEvery, take, call, put, all } from "redux-saga/effects";
import * as summarySagas from "../saga-actions";
import * as actions from "../summary-constants";
import services from "../../../../services/SummaryService";
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

describe("Testing Overall Score Saga Actions", () => {
    test("Watch Action", () => {
        const yeildEffect = summarySagas.watchOverallScore();
        expect(yeildEffect.next().value).toEqual(
            takeEvery(
                actions.GET_SUMMARY_OVERALL_SCORE[REQUEST],
                summarySagas.fetchOverallScore
            )
        );
    });
    test("Fetch success action", async () => {
        const mockApiData = { result: { payload: "Test" }, error: false };
        const callOverallScoreApi = mockApi(
            "callOverallScoreApi",
            mockApiData,
            "resolve"
        );

        const dispatched = await recordSaga(
            summarySagas.fetchOverallScore,
            mockApiData
        );
        expect(callOverallScoreApi).toHaveBeenCalledTimes(1);
        expect(dispatched[0]).toEqual(
            actions.getSummaryOverallScore.success(mockApiData.result)
        );
        callOverallScoreApi.mockClear();
    });
    test("Fetch error action", async () => {
        const mockApiData = { result: { payload: "Test" }, error: true };
        const callOverallScoreApi = mockApi(
            "callOverallScoreApi",
            mockApiData,
            "resolve"
        );

        const dispatched = await recordSaga(
            summarySagas.fetchOverallScore,
            mockApiData
        );
        expect(callOverallScoreApi).toHaveBeenCalledTimes(1);
        expect(dispatched[0]).toEqual(
            actions.getSummaryOverallScore.error(mockApiData.error)
        );
        callOverallScoreApi.mockClear();
    });
    test("Fetch try block error action", async () => {
        const mockApiData = { result: { payload: "Test" }, error: true };
        const callOverallScoreApi = mockApi(
            "callOverallScoreApi",
            mockApiData.error,
            "reject"
        );

        const dispatched = await recordSaga(
            summarySagas.fetchOverallScore,
            mockApiData
        );
        expect(callOverallScoreApi).toHaveBeenCalledTimes(1);
        expect(dispatched[0]).toEqual(
            actions.getSummaryOverallScore.error(mockApiData.error)
        );
        callOverallScoreApi.mockClear();
    });
});
describe("Testing Compare Overall Score Saga Actions", () => {
    test("Watch Action", () => {
        const yeildEffect = summarySagas.watchOverallScoreBrandCompare();
        expect(yeildEffect.next().value).toEqual(
            takeEvery(
                actions.GET_SUMMARY_BRAND_COMPARE_OVERALL_SCORE[REQUEST],
                summarySagas.fetchOverallScoreBrandCompare
            )
        );
    });
    test("Fetch success action", async () => {
        const mockApiData = { result: { payload: "Test" }, error: false };
        const callOverallScoreBrandCompareApi = mockApi(
            "callOverallScoreBrandCompareApi",
            mockApiData,
            "resolve"
        );

        const dispatched = await recordSaga(
            summarySagas.fetchOverallScoreBrandCompare,
            mockApiData
        );
        expect(callOverallScoreBrandCompareApi).toHaveBeenCalledTimes(1);
        expect(dispatched[0]).toEqual(
            actions.getSummaryBrandCompareOverallScore.success(mockApiData.result)
        );
        callOverallScoreBrandCompareApi.mockClear();
    });
    test("Fetch error action", async () => {
        const mockApiData = { result: { payload: "Test" }, error: true };
        const callOverallScoreBrandCompareApi = mockApi(
            "callOverallScoreBrandCompareApi",
            mockApiData,
            "resolve"
        );

        const dispatched = await recordSaga(
            summarySagas.fetchOverallScoreBrandCompare,
            mockApiData
        );
        expect(callOverallScoreBrandCompareApi).toHaveBeenCalledTimes(1);
        expect(dispatched[0]).toEqual(
            actions.getSummaryBrandCompareOverallScore.error(mockApiData.error)
        );
        callOverallScoreBrandCompareApi.mockClear();
    });
    test("Fetch try block error action", async () => {
        const mockApiData = { result: { payload: "Test" }, error: true };
        const callOverallScoreBrandCompareApi = mockApi(
            "callOverallScoreBrandCompareApi",
            mockApiData.error,
            "reject"
        );

        const dispatched = await recordSaga(
            summarySagas.fetchOverallScoreBrandCompare,
            mockApiData
        );
        expect(callOverallScoreBrandCompareApi).toHaveBeenCalledTimes(1);
        expect(dispatched[0]).toEqual(
            actions.getSummaryBrandCompareOverallScore.error(mockApiData.error)
        );
        callOverallScoreBrandCompareApi.mockClear();
    });
});
describe("Testing Attribute Score Saga Actions", () => {
    test("Watch Action", () => {
        const yeildEffect = summarySagas.watchSummaryAttributeScore();
        expect(yeildEffect.next().value).toEqual(
            takeEvery(
                actions.GET_SUMMARY_ATTRIBUTE_SCORE[REQUEST],
                summarySagas.fetchSummaryAttributeScore
            )
        );
    });
    test("Fetch success action", async () => {
        const mockApiData = { result: { payload: "Test" }, error: false };
        const callAttributeScoreApi = mockApi(
            "callAttributeScoreApi",
            mockApiData,
            "resolve"
        );

        const dispatched = await recordSaga(
            summarySagas.fetchSummaryAttributeScore,
            mockApiData
        );
        expect(callAttributeScoreApi).toHaveBeenCalledTimes(1);
        expect(dispatched[0]).toEqual(
            actions.getSummaryAttributeScore.success(mockApiData.result)
        );
        callAttributeScoreApi.mockClear();
    });
    test("Fetch error action", async () => {
        const mockApiData = { result: { payload: "Test" }, error: true };
        const callAttributeScoreApi = mockApi(
            "callAttributeScoreApi",
            mockApiData,
            "resolve"
        );

        const dispatched = await recordSaga(
            summarySagas.fetchSummaryAttributeScore,
            mockApiData
        );
        expect(callAttributeScoreApi).toHaveBeenCalledTimes(1);
        expect(dispatched[0]).toEqual(
            actions.getSummaryAttributeScore.error(mockApiData.error)
        );
        callAttributeScoreApi.mockClear();
    });
    test("Fetch try block error action", async () => {
        const mockApiData = { result: { payload: "Test" }, error: true };
        const callAttributeScoreApi = mockApi(
            "callAttributeScoreApi",
            mockApiData.error,
            "reject"
        );

        const dispatched = await recordSaga(
            summarySagas.fetchSummaryAttributeScore,
            mockApiData
        );
        expect(callAttributeScoreApi).toHaveBeenCalledTimes(1);
        expect(dispatched[0]).toEqual(
            actions.getSummaryAttributeScore.error(mockApiData.error)
        );
        callAttributeScoreApi.mockClear();
    });
});