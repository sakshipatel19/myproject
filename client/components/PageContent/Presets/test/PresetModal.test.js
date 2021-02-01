import React from "react";
import { shallow } from 'enzyme';

import store from "../../../../../testUtils/mockStore";
import PresetModal from '../PresetModal';
import LoadingIndicator from "../../../common/LoadingIndicator";
import DataLoadError from "../../../PageContent/common/DataLoadError/DataLoadError";
import Icon from '../../../common/Icon';

const mocks = {
    setPresetNameInConfig: jest.fn(),
    setBrandNamesInConfig: jest.fn(),
    setCategoryNamesInConfig: jest.fn(),
    setProductsListInConfig: jest.fn(),
    hidePresetOverlay: jest.fn(),
    setScoreTypeSelectorToDefault: jest.fn(),
    presets: {
        fetching: null,
        error: null,
        data: {
            presets: [{ "presetId": 1000, "name": "system preset_a", "brands": ["brands_a0", "brands_a1", "brands_a2", "brands_a3", "brands_a4"], "categories": ["categories_a0", "categories_a1", "categories_a2", "categories_a3", "categories_a4"], "itemids": ["itemid_a0", "itemid_a1", "itemid_a2", "itemid_a3", "itemid_a4"], "presetType": "system" }]
        }
    }
};

describe("<Presets />", () => {
    let wrapper;
    const props = {
        ...mocks,
        ...store.getState().global.config
    }
    beforeAll(() => {
        wrapper = shallow(
            <PresetModal {...props} />
        );
    });
    afterAll(() => {
        wrapper.unmount();
    });
    test("PresetModal component did render", () => {
        expect(wrapper.find('.preset-modal-wrapper').length).toEqual(1);
        expect(wrapper.find('.preset-tile-container').length).toEqual(1);
    });
    test("PresetModal list collapse check ", () => {
        const spy = jest.spyOn(wrapper.instance(), "toggleList");
        wrapper.find('.list.brands0 .list-title').simulate('click');
        expect(wrapper.find('.list.brands0 .list-items').length).toEqual(0);
        expect(spy).toHaveBeenCalled();
    });
    test("PresetModal applypreset check ", () => {
        const spy = jest.spyOn(wrapper.instance(), "applyPreset");
        wrapper.find('.preset-footer').find(Icon).dive().find('.preset-view-arrow').simulate('click');
        expect(spy).toHaveBeenCalled();
    });
    test("PresetModal should show Loading indicator while fetching", () => {
        wrapper.setProps({
            presets: {
                fetching: true,
                error: null,
                data: null
            }
        });
        expect(wrapper.instance().props.presets.fetching).toBeTruthy();
        expect(wrapper.find(LoadingIndicator).length).toEqual(1);
    });
    test("PresetModal should show DataloadError on error while fetching", () => {
        wrapper.setProps({
            presets: {
                fetching: null,
                error: true,
                data: null
            }
        });
        expect(wrapper.instance().props.presets.error).toBeTruthy();
        expect(wrapper.find(DataLoadError).length).toEqual(1);
    });
});
