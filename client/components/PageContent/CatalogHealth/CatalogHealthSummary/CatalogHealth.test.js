import React from "react";
import { shallow } from "enzyme";

import CatalogHealth from "./CatalogHealth";

describe("CatalogHealth tests", () => {
    let baseProps;
    beforeEach(() => {
        baseProps = {
            catalogHealthScore: {
                fetching: false,
                error: false,
                data: {
                    catalogHeading: "CATALOG HEALTH",
                    descriptions: [
                        {
                            descriptionType: "GOOD",
                            descriptionScore: "35",
                            descriptionComment: "xyz",
                            key: "good"
                        },
                        {
                            descriptionType: "ACCEPTABLE",
                            descriptionScore: "35",
                            descriptionComment: "xyz",
                            key: "acceptable"
                        },
                        {
                            descriptionType: "NEEDS IMPROVEMENT",
                            descriptionScore: "35",
                            descriptionComment: "xyz",
                            key: "needsAttention"
                        },
                    ]
                }
            },
            fetchCataloghealthScore: jest.fn(),
            location: {
                pathname: '/analysis/catalog-health'
            }
        };
    });
    it("CatalogHealth should render correctly", () => {
        const wrapper = shallow(<CatalogHealth.WrappedComponent {...baseProps} />);
        expect(wrapper).toMatchSnapshot();
    });
});
