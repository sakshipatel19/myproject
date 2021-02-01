import React from "react";
import { shallow } from "enzyme";

import BestSeller from "./BestSeller";

const bestSellerBrandDataListEntry = {
	brandName: "Tylenol",
	productId: "ABCD",
	productName: "abcd efgh ijkl",
	productUrl: "www.amazon.com",
	rank: "#1",
	score: 75
};
const bestSeller = {
	fetching: null,
	error: null,
	data: {
		bestSellerBrandDataList: [bestSellerBrandDataListEntry],
		categoryNames: ["Calcium", "Antacids"]
	}
};
const tabData = [
	{
		key: "price",
		label: "PRICE"
	},
	{
		key: "promotion",
		label: "PROMOTION"
	}
];
const baseProps = {
	data: bestSeller,
	tabData: tabData,
	getBestSellersListOnTabChange: jest.fn(),
	onRetryClick: jest.fn(),
	getBestSellersList: jest.fn()
};
describe("BestSeller tests", () => {
	it("BestSeller should render correctly", () => {
		const wrapper = shallow(<BestSeller {...baseProps} />);
        expect(wrapper).toMatchSnapshot();
        //cover all the functions
		wrapper.instance().handleCategorySelection();
		wrapper.instance().onTabChange();
        wrapper.instance().DataRowComponent(bestSellerBrandDataListEntry);
		expect(baseProps.getBestSellersList).toHaveBeenCalledTimes(1);
        expect(baseProps.getBestSellersListOnTabChange).toHaveBeenCalledTimes(1);
        expect(baseProps.DataRowComponent).toHaveBeenCalledTimes(1);
	});
	it("BestSeller should render correctly when no props are received", () => {
		const wrapper = shallow(<BestSeller />);
		expect(wrapper).toMatchSnapshot();
	});
});
