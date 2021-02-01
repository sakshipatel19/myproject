import React from "react";
import { shallow } from "enzyme";

import BrandTableDetailPage from "./BrandTableDetailPage";

const data = {
    heading:"Brands",
    scorehelp:"Content scores for your selected brands",
    brandScoreInitial:[
        {
            label:"Advil",
            score:68,
            compareScore:null
        },
        {
            label:"alli",
            score:70,
            compareScore:70
        },
        {
            label:"Centrum",
            score:null,
            compareScore:60
        },
        {
            label:"Aquafresh",
            score:null,
            compareScore:null
        }
    ]
};
const fetchBrands = {
    type:"GET_CONTENT_BRANDS_SCORE_REQUEST",
    value:{}
}
let baseProps = {
    data:data,
    fetchBrands:jest.fn(),
    compareSelected:false,
};
describe("BrandTableDetailPage tests", () => {
    it("BrandTableDetailPage should render correctly", () => {
        const wrapper = shallow(<BrandTableDetailPage {...baseProps} />);
        expect(wrapper).toMatchSnapshot();
    });
    it("BrandTableDetailPage should render correctly when data received is null", () => {
        const wrapper = shallow(<BrandTableDetailPage data={null} fetchBrands={fetchBrands}/>);
        expect(wrapper).toMatchSnapshot();
    });
    it("button click", () => {
        const wrapper = shallow(<BrandTableDetailPage {...baseProps}/>);
        wrapper.find('.brand-type-col-1.sortSelected').simulate('click');
        expect(wrapper.state('sortType')).toBe("DESC");
        wrapper.find('.brand-type-col-1.sortSelected').simulate('click');
        expect(wrapper.state('sortType')).toBe("ASC");
        
        //to check negative scenario for condition (currentSort === sortBy) in onSortChange function
        wrapper.setState({sortBy:'score'});
        wrapper.find('.brand-type-row.header>.brand-type-col-1').simulate('click');
        expect(wrapper.state('sortType')).toBe("ASC");
    });
    it("BrandTableDetailPage should render correctly when compare date is applied", () => {
        baseProps = {
            data:data,
            fetchBrands:jest.fn(),
            compareSelected:true,
        };
        const wrapper = shallow(<BrandTableDetailPage {...baseProps} />);
        expect(wrapper).toMatchSnapshot();
    });
});
