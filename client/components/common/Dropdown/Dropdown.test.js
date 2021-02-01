import React from "react";
import { shallow } from "enzyme";

import Dropdown from ".";

const properties = {
	selectedOption: null,
	options: [
		{ value: 1, label: "test1" },
		{ value: 2, label: "test2" },
		{ value: 3, label: "test3" }
	],
	onSelect: () => {}
};

const setup = (props = {}, state = null) => {
	const wrapper = shallow(<Dropdown {...props} />);
	if (state) wrapper.setState(state);
	return wrapper;
};

const findByTestAttr = (wrapper, val) => {
	return wrapper.find(`[data-test="${val}"]`);
};

describe("Dropdown Load testing", () => {
	it("Dropdown Render correctly", () => {
		const wrapper = setup(properties);

		expect(wrapper).toMatchSnapshot();
	});

	it("dropdown renders without error", () => {
		const wrapper = setup({ ...properties });
		const dropdownComponent = findByTestAttr(wrapper, "dropdown-component");
		expect(dropdownComponent.length).toBe(1);
	});

	// it("click on dropdown to open menu list", () => {
	// 	const wrapper = setup({ ...properties });
	// 	const dropdownComponent = findByTestAttr(wrapper, "dropdown-component");
	// 	dropdownComponent.simulate("click");
	// 	const menuComponent = findByTestAttr(wrapper, "dropdown-menu-list");
	// 	expect(menuComponent.length).toBe(1);
	// });
});
