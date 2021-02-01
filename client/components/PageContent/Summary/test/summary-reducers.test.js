import * as summaryActions from "../summary-actions";
import * as summaryConstants from "../summary-constants";
import summaryReducer from "../summary-reducers";
import * as types from "../../../../constants/actions";

const requestState = {
    fetching: true,
    error: null,
    data: null
};
const errorState = {
    fetching: false,
    error: "Error",
    data: null
};
const successState = {
    fetching: false,
    error: null,
    data: "Success"
};
describe("Testing Summary Reducer Overall Score", () => {
    test("Request Action", () => {
        const payload = {};
        const requestAction = {
            type:
                summaryConstants.GET_SUMMARY_OVERALL_SCORE[
                types.REQUEST
                ],
            response: null
        };
        expect(
            summaryReducer(payload, requestAction).overallScore
        ).toEqual(requestState);
    });
    test("Error Action", () => {
        const payload = {};
        const requestAction = {
            type:
                summaryConstants.GET_SUMMARY_OVERALL_SCORE[
                types.ERROR
                ],
            response: "Error"
        };
        expect(
            summaryReducer(payload, requestAction).overallScore
        ).toEqual(errorState);
    });
    test("Success Action", () => {
        const payload = {};
        const requestAction = {
            type:
                summaryConstants.GET_SUMMARY_OVERALL_SCORE[
                types.SUCCESS
                ],
            response: "Success"
        };
        expect(
            summaryReducer(payload, requestAction).overallScore
        ).toEqual(successState);
    });
});
describe("Testing Summary Reducer Brand Compare Overall Score", () => {
    test("Request Action", () => {
        const payload = {};
        const requestAction = {
            type:
                summaryConstants.GET_SUMMARY_BRAND_COMPARE_OVERALL_SCORE[
                types.REQUEST
                ],
            response: null
        };
        expect(
            summaryReducer(payload, requestAction).overallScore
        ).toEqual(requestState);
    });
    test("Error Action", () => {
        const payload = {};
        const requestAction = {
            type:
                summaryConstants.GET_SUMMARY_BRAND_COMPARE_OVERALL_SCORE[
                types.ERROR
                ],
            response: "Error"
        };
        expect(
            summaryReducer(payload, requestAction).overallScore
        ).toEqual(errorState);
    });
    test("Success Action", () => {
        const payload = {};
        const requestAction = {
            type:
                summaryConstants.GET_SUMMARY_BRAND_COMPARE_OVERALL_SCORE[
                types.SUCCESS
                ],
            response: "Success"
        };
        expect(
            summaryReducer(payload, requestAction).overallScore
        ).toEqual(successState);
    });
});
describe("Testing Summary Reducer Attribute Score", () => {
    test("Request Action", () => {
        const payload = {};
        const requestAction = {
            type:
                summaryConstants.GET_SUMMARY_ATTRIBUTE_SCORE[
                types.REQUEST
                ],
            response: null
        };
        expect(
            summaryReducer(payload, requestAction).attributeScore
        ).toEqual(requestState);
    });
    test("Error Action", () => {
        const payload = {};
        const requestAction = {
            type:
                summaryConstants.GET_SUMMARY_ATTRIBUTE_SCORE[
                types.ERROR
                ],
            response: "Error"
        };
        expect(
            summaryReducer(payload, requestAction).attributeScore
        ).toEqual(errorState);
    });
    test("Success Action", () => {
        const payload = {};
        const requestAction = {
            type:
                summaryConstants.GET_SUMMARY_ATTRIBUTE_SCORE[
                types.SUCCESS
                ],
            response: "Success"
        };
        expect(
            summaryReducer(payload, requestAction).attributeScore
        ).toEqual(successState);
    });
});