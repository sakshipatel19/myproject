import React from "react";
import { shallow } from 'enzyme';
import AttributeScore from "../AttributeScore";
import Card from "../../../common/Card";
import BarChart from "../../../common/Charts/BarChart";

const props = {
    isDateCompareSelected: false,
    labelTextFormat: jest.fn(),
    attributeScore: {}
};
describe("<AttributeScore />", () => {
    let wrapper;
    beforeAll(() => {
        wrapper = shallow(
            <AttributeScore {...props} />
        );
    });
    afterAll(() => {
        wrapper.unmount();
    });
    test("AttributeScore component did render", () => {
        expect(wrapper.find(Card).length).toEqual(1);
        expect(wrapper.find(BarChart).length).toEqual(1);
        expect(wrapper.find(".attributes-container").length).toEqual(1);
    });
});