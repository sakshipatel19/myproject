import React from "react";
import { shallow } from "enzyme";

import Icon from "./index";

it("Icon should render correctly", () => {
	const wrapper = shallow(<Icon name="someName" />);
	expect(wrapper).toMatchSnapshot();
});
