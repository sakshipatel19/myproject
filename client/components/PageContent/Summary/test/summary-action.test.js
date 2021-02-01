import * as summaryActions from "../summary-actions";
import * as summaryConstants from "../summary-constants";
import * as types from "../../../../constants/actions";

describe("Testing Summary Actions", () => {
    test("Request Action", () => {
        const payload = {
            brandCompareView: false,
            value: "OverallScore"
        };
        const expectedActionObj = {
            type:
                summaryConstants.GET_SUMMARY_OVERALL_SCORE[
                types.REQUEST
                ],
            payload
        };
        expect(
            summaryActions.fetchSummaryOverallScore(payload)
        ).toEqual(expectedActionObj);
        payload.brandCompareView = true;
        expectedActionObj.type = summaryConstants.GET_SUMMARY_BRAND_COMPARE_OVERALL_SCORE[
            types.REQUEST
        ]
        expect(
            summaryActions.fetchSummaryOverallScore(payload)
        ).toEqual(expectedActionObj);
    });
});
