import React from "react";
import { shallow } from "enzyme";

import Dot from "./Dot";

describe("Dot tests", () => {
	it("Dot should render correctly", () => {
		const wrapper = shallow(<Dot color="#fff" />);
		expect(wrapper).toMatchSnapshot();
	});
});
