import React from "react";
import store from "../../../../../testUtils/mockStore";
import shallowUntilTarget from "../../../../../testUtils/shallowUntilTarget";
import PageContainer from "../../PageContainer";
import SummaryChart from "../../common/SummaryChart";
import SummaryParent from "../index";
import Summary from "../Summary";
import AttributeScore from '../AttributeScore';

const props = {
    isDateCompareSelected: false,
    fetchSummaryAttributeScore: jest.fn(),
    fetchSummaryPromotionCount: jest.fn(),
    fetchSummaryOverallScore: jest.fn()
};

describe("<Summary />", () => {
    let wrapper;
    beforeAll(() => {
        wrapper = shallowUntilTarget(
            <SummaryParent {...props} store={store} />,
            Summary
        );
    });
    afterAll(() => {
        wrapper.unmount();
    });
    test("Summary component did render", () => {
        expect(wrapper.find(PageContainer).length).toEqual(1);
        expect(wrapper.find(SummaryChart).length).toEqual(1);
        expect(wrapper.find(AttributeScore).length).toEqual(1);
    });
    test("Summary onAttributeRetryClick method call", () => {
        const spy = jest.spyOn(wrapper.instance(), "onAttributeRetryClick");
        wrapper.instance().onAttributeRetryClick();
        expect(spy).toHaveBeenCalled();
    });
    test("Summary onPromotionRetryClick method call", () => {
        const spy = jest.spyOn(wrapper.instance(), "onPromotionRetryClick");
        wrapper.instance().onPromotionRetryClick();
        expect(spy).toHaveBeenCalled();
    });
    test("Summary onSummaryRetryClick method call", () => {
        const spy = jest.spyOn(wrapper.instance(), "onSummaryRetryClick");
        wrapper.instance().onSummaryRetryClick();
        expect(spy).toHaveBeenCalled();
    });
    test("Summary onSummaryChartSelectorChange method call", () => {
        const spy = jest.spyOn(wrapper.instance(), "onSummaryChartSelectorChange");
        wrapper.instance().onSummaryChartSelectorChange();
        expect(spy).toHaveBeenCalled();
    });
});
