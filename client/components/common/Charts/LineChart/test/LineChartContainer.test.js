import React from 'react';
import { mount, shallow } from 'enzyme';
import LineChartContainer from "../LineChartContainer";
import LineChart from "../LineChart";
import ChartWrapper from "../ChartWrapper";
import graphData from "./data";
const attributes = {
    data: graphData,
    lineColors: "#4CA0FA",
    onRemovePill: jest.fn(),
    isCompareSelected: false,
    isBrandCompare: false,
    labelTextFormat: undefined
}
const defaultWidth = 940,
    defaultHeight = 240,
    margin = { left: 30, right: 10, top: 10, bottom: 50 },
    height = defaultHeight - margin.top - margin.bottom,
    width = defaultWidth - margin.left - margin.right,
    properties = {
        height,
        width,
        margin,
        defaultWidth,
        defaultHeight,
        lineWidth: 3,
        lineColors: attributes.lineColors,
        hideYaxis: false,
        hideXaxis: false,
        hideGradients: false,
        hideMouseHover: false,
        yAxisDomain: attributes.isCompareSelected ? [-100, 100] : [0, 100],
        isCompareSelected: attributes.isCompareSelected
    };
describe('<LineChartContainer />', () => {
    let wrapper;
    beforeAll(() => {
        wrapper = mount(<LineChartContainer {...attributes} />);
    });
    afterAll(() => {
        wrapper.unmount();
    });
    test('LineChartContainer component did render', () => {
        expect(wrapper.find('.line-chart-container').length).toEqual(1);
    });
});
describe('<ChartWrapper />', () => {
    let wrapper;
    const charwrapperAttr = {
        data: attributes.data,
        properties,
        isCompareSelected: attributes.isCompareSelected,
        onHover: jest.fn()
    }
    beforeAll(() => {
        wrapper = mount(<ChartWrapper {...charwrapperAttr} />);
    });
    afterAll(() => {
        wrapper.unmount();
    });
    test('ChartWrapper component did render', () => {
        expect(wrapper.find('.d3-outer-div-container').length).toEqual(1);
    });
    test('ChartWrapper component did update', () => {
        const spy = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
        wrapper.setProps({
            data: [{
                "type": "overallScore",
                "score": 68,
                "latestScore": 72,
                "difference": -6,
                "compareScore": null,
                "graphData": [{
                    "label": "19/03/20",
                    "value": 67,
                    "compareLabel": null,
                    "compareValue": null,
                    "initialValue": null
                }]
            }]
        });
        expect(spy).toHaveBeenCalled();
    });
});
describe('<LineChart />', () => {
    let wrapper;

    beforeAll(() => {
        wrapper = mount(<LineChart {...attributes} properties={properties} />);
    });
    afterAll(() => {
        wrapper.unmount();
    });
    test('LineChart component did render', () => {
        expect(wrapper.find('.line-chart-container').length).toEqual(1);
    });
    test('LineChart onmouseover pill update', () => {
        wrapper.instance().onMouseHover(1);
        expect(wrapper.instance().state.pillIndex).toEqual(1);
    });
    test('LineChart onmouseover pillindex max value', () => {

        wrapper.instance().onMouseHover(attributes.data[0].graphData.length);
        expect(wrapper.instance().state.pillIndex).toEqual(attributes.data[0].graphData.length);
    });
    test('LineChart component did render without data', () => {
        attributes.data = null;
        wrapper = mount(<LineChart {...attributes} properties={properties} />);
        expect(wrapper.find('.line-chart-container').length).toEqual(1);
    });
});