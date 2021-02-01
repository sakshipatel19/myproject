import React from "react";
import store from "../../../../../testUtils/mockStore";
import shallowUntilTarget from "../../../../../testUtils/shallowUntilTarget";
import PageContainer from "../../PageContainer";
import SummaryChart from "../../common/SummaryChart";
import Card from "../../../common/Card";
import CatalogHealth from "../../CatalogHealth/CatalogHealthSummary";
import LostBuyBox from "../LostBuyBox/LostBuyBox";
import BestSeller from "../../BestSeller/BestSeller";
import BrandsTable from "../../BrandTable";
import AvailabilityParent from "../index";
import Availability from "../Availability";
const props = {
	isDateCompareSelected: false,
	setSelectedNavLinkInConfig: jest.fn(),
	setSelectedPageInConfig: jest.fn(),
	setSelectedPrimaryModuleInConfig: jest.fn(),
	fetchAvailabilityCatalogHealth: jest.fn(),
	fetchAvailabilityBestSellers: jest.fn(),
	fetchAvailabilityBrandScore: jest.fn(),
	fetchAvailibilityOverallScore: jest.fn(() => "default"),
	fetchAvailabilityLostBuyBox: jest.fn()
};

describe("<Availability />", () => {
	let wrapper;
	beforeAll(() => {
		wrapper = shallowUntilTarget(
			<AvailabilityParent {...props} store={store} />,
			Availability
		);
	});
	afterAll(() => {
		wrapper.unmount();
	});
	test("Availability component did render", () => {
		expect(wrapper.find(PageContainer).length).toEqual(1);
		expect(wrapper.find(SummaryChart).length).toEqual(1);
		expect(wrapper.find(Card).length).toEqual(1);
		expect(wrapper.find(CatalogHealth).length).toEqual(1);
		expect(wrapper.find(LostBuyBox).length).toEqual(1);
		expect(wrapper.find(BestSeller).length).toEqual(1);
		expect(wrapper.find(BrandsTable).length).toEqual(1);
	});
	test("Availability onSummaryChartSelectorChange method call", () => {
		const spy = jest.spyOn(wrapper.instance(), "onSummaryChartSelectorChange");
		wrapper.instance().onSummaryChartSelectorChange();
		expect(spy).toHaveBeenCalled();
	});
	test("Availability getAvailabilityCatalogHealthscores method call", () => {
		const spy = jest.spyOn(
			wrapper.instance(),
			"getAvailabilityCatalogHealthscores"
		);
		wrapper.instance().getAvailabilityCatalogHealthscores();
		expect(spy).toHaveBeenCalled();
	});
	test("Availability getBestSellersList method call", () => {
		const spy = jest.spyOn(wrapper.instance(), "getBestSellersList");
		wrapper.instance().getBestSellersList();
		expect(spy).toHaveBeenCalled();
	});
	test("Availability onBestSellerRetryClick method call", () => {
		const spy = jest.spyOn(wrapper.instance(), "onBestSellerRetryClick");
		wrapper.instance().onBestSellerRetryClick();
		expect(spy).toHaveBeenCalled();
	});
	test("Availability fetchBrands method call", () => {
		const spy = jest.spyOn(wrapper.instance(), "fetchBrands");
		wrapper.instance().fetchBrands();
		expect(spy).toHaveBeenCalled();
	});
	test("Availability onSummaryRetryClick method call", () => {
		const spy = jest.spyOn(wrapper.instance(), "onSummaryRetryClick");
		wrapper.instance().onSummaryRetryClick();
		expect(spy).toHaveBeenCalled();
	});
	test("Availability onSummaryChartSelectorChange method call", () => {
		const spy = jest.spyOn(wrapper.instance(), "onSummaryChartSelectorChange");
		wrapper.instance().onSummaryChartSelectorChange();
		expect(spy).toHaveBeenCalled();
	});
	test("Availability onLostBuyBoxRetryClick method call", () => {
		const spy = jest.spyOn(wrapper.instance(), "onLostBuyBoxRetryClick");
		wrapper.instance().onLostBuyBoxRetryClick();
		expect(spy).toHaveBeenCalled();
	});
});
