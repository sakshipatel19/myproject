import React from "react";
import store from "../../../../../testUtils/mockStore";
import shallowUntilTarget from "../../../../../testUtils/shallowUntilTarget";
import PresetsParent from "../index";
import Presets from "../Presets";
import PresetModal from '../PresetModal';
import Overlay from "../../../common/Overlay";

const props = {
    setBrandNamesInConfig: jest.fn(),
    setCategoryNamesInConfig: jest.fn(),
    setProductsListInConfig: jest.fn(),
    hidePresetOverlay: jest.fn(),
    setScoreTypeSelectorToDefault: jest.fn()
};

describe("<Presets />", () => {
    let wrapper;
    beforeAll(() => {
        wrapper = shallowUntilTarget(
            <PresetsParent {...props} store={store} />,
            Presets
        );
    });
    afterAll(() => {
        wrapper.unmount();
    });
    test("Preset component did render", () => {
        expect(wrapper.find(PresetModal).length).toEqual(1);
        expect(wrapper.find(Overlay).length).toEqual(1);
    });
    test("Preset onRetryClick method call", () => {
        const spy = jest.spyOn(wrapper.instance(), "onRetryClick");
        wrapper.instance().onRetryClick();
        expect(spy).toHaveBeenCalled();
    });
});
