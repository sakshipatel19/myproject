import React from "react";
import store from "../../../../../testUtils/mockStore";
import { shallow } from "enzyme";
import FilterDropdown from "../FilterDropdown";
import PresetsDropdown from "../PresetsDropdown";

const props = {
	fetchPresetsList: jest.fn(),
	closeFilterMenu: jest.fn(),
	onApplyFilters: jest.fn(),
	setPresetNameInConfig: jest.fn()
};
const allPresets = [
	{ presetId: "1", brands: [], categories: [], itemids: [] },
	{ presetId: "2", brands: [], categories: [], itemids: [] }
];
const selectedPreset = {
	presetId: "1",
	brands: [],
	categories: [],
	itemids: []
};
describe("<PresetsDropdown />", () => {
	let wrapper;
	beforeAll(() => {
		wrapper = shallow(
			<PresetsDropdown.WrappedComponent {...props} store={store} />
		);
	});
	afterAll(() => {
		wrapper.unmount();
	});
	test("PresetsDropdown component did render", () => {
		expect(wrapper.find(FilterDropdown).length).toEqual(1);
	});
	test("PresetsDropdown onViewAllPreset method call", () => {
		const spy = jest.spyOn(wrapper.instance(), "onViewAllPreset");
		wrapper.instance().onViewAllPreset();
		expect(spy).toHaveBeenCalled();
	});
	test("PresetsDropdown onPresetSelect method call", () => {
		const spy = jest.spyOn(wrapper.instance(), "onPresetSelect");
		wrapper.instance().onPresetSelect(allPresets, selectedPreset);
		expect(spy).toHaveBeenCalled();
	});
});
