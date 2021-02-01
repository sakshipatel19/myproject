import React from "react";
import store from "../../../../../../testUtils/mockStore";
import shallowUntilTarget from "../../../../../../testUtils/shallowUntilTarget";
import CatalogHealthDetailParent from "../index";
import AvailabilityCatalogHealthDetail from "../AvailabilityCatalogHealthDetail";
import CatalogHealthDetail from "../../../CatalogHealth/CatalogHealthDetail";
import renderer from "react-test-renderer";

const props = {
	fetchAvailabilityCatalogueHealthTable: jest.fn().mockReturnValue("default"),
	setSearchTermsFilter: jest.fn(),
	setTableFilter: jest.fn(),
	fetchCategoriesList: jest.fn(),
	productIdList: [],
	location: {
		state: {
			catlogKey: "good"
		}
	}
};

describe("<CatalogHealthDetail />", () => {
	let parrentWrapper, wrapper;
	const initialState = store.getState();
	beforeAll(() => {
		wrapper = shallowUntilTarget(
			<CatalogHealthDetailParent {...props} store={store} />,
			AvailabilityCatalogHealthDetail
		);
	});
	afterAll(() => {
		// parrentWrapper.unmount();
		wrapper.unmount();
	});
	test("CatalogHealthDetail component did render", () => {
		expect(wrapper.find(CatalogHealthDetail).length).toEqual(1);
	});
	test("CatalogHealthDetail invoke fetchCatalogueHealthTable", () => {
		const spy = jest.spyOn(wrapper.instance(), "fetchCatalogueHealthTable");
		wrapper.instance().fetchCatalogueHealthTable();
		expect(spy).toHaveBeenCalled();
	});
	test("CatalogHealthDetail invoke fetchCatalogueHealthTabs", () => {
		const spy = jest.spyOn(wrapper.instance(), "fetchCatalogueHealthTabs");
		wrapper.instance().fetchCatalogueHealthTabs();
		expect(spy).toHaveBeenCalled();
	});
	test("CatalogHealthDetail invoke setSearchTermsFilter", () => {
		const spy = jest.spyOn(wrapper.instance(), "setSearchTermsFilter");
		wrapper.instance().setSearchTermsFilter();
		expect(spy).toHaveBeenCalled();
	});
	test("CatalogHealthDetail invoke setTableFilter", () => {
		const spy = jest.spyOn(wrapper.instance(), "setTableFilter");
		wrapper.instance().setTableFilter();
		expect(spy).toHaveBeenCalled();
	});
	test("CatalogHealthDetail invoke setSelectedTab", () => {
		const spy = jest.spyOn(wrapper.instance(), "setSelectedTab");
		wrapper.instance().setSelectedTab();
		expect(spy).toHaveBeenCalled();
	});
	test("CatalogHealthDetail invoke onCatalogDetailRetryClick", () => {
		const spy = jest.spyOn(wrapper.instance(), "onCatalogDetailRetryClick");
		wrapper.instance().onCatalogDetailRetryClick();
		expect(spy).toHaveBeenCalled();
	});
	test("CatalogHealthDetail invoke fetchCatalogueHealthTable", () => {
		const spy = jest.spyOn(wrapper.instance(), "fetchCatalogueHealthTable");
		wrapper.instance().fetchCatalogueHealthTable();
		expect(spy).toHaveBeenCalled();
	});
	test("CatalogHealthDetail invoke DataRowComponent", () => {
		const spy = jest.spyOn(wrapper.instance(), "DataRowComponent");
		wrapper.instance().DataRowComponent({
			productName: "Advil",
			productId: "B000GGO2QG",
			subCategory: "Medications",
			score: 17,
			assortmentIndex: { scoreStatus: "good", score: 93 },
			instockRate: { scoreStatus: "needsAttention", score: 23 },
			buyBoxWin: { scoreStatus: "needsAttention", score: 1 }
		});
		expect(spy).toHaveBeenCalled();
	});
	test("CatalogHealthDetail invoke DataRowComponent negative case", () => {
		const rowData = {
			productName: "Advil",
			productId: "B000GGO2QG",
			subCategory: "Medications",
			score: 17,
			assortmentIndex: { scoreStatus: "good", score: 93 },
			instockRate: { scoreStatus: "needsAttention", score: 23 },
			buyBoxWin: { scoreStatus: "needsAttention", score: 1 }
		};
		let row = wrapper.instance().DataRowComponent(rowData);
		let rowComp = renderer.create(row).toJSON();
		expect(rowComp).toMatchSnapshot();
		rowData.assortmentIndex = {
			scoreStatus: null,
			score: null
		};
		row = wrapper.instance().DataRowComponent(rowData);
		rowComp = renderer.create(row).toJSON();
		expect(rowComp).toMatchSnapshot();
	});
});
