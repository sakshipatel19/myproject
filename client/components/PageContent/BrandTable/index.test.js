import React from "react";
import { shallow } from "enzyme";

import BrandTable from ".";

const brandsScore = {
    fetching:null,
    error:null,
    data:null
};
let baseProps = {
    fetchBrands:jest.fn(),
    brandsScore:brandsScore,
    compareSelected:false
};

describe("BrandTable tests", () => {
    it("BrandTable should render correctly", () => {
        const wrapper = shallow(<BrandTable {...baseProps} />);
        //calls componentWillReceiveProps
        wrapper.setProps({brandsData : brandsScore});
        expect(wrapper.state('brandsData')).toEqual(brandsScore);
        expect(wrapper).toMatchSnapshot();
    });
    it("BrandTable should render correctly when no props are received", () => {
        const wrapper = shallow(<BrandTable/>);
        expect(wrapper.state('brandsData')).toEqual([]);
    });
});
