import * as filterBarActions from "../filters-bar-actions";
import * as filterBarConstants from "../filters-constants";
import * as types from "../../../../constants/actions";

describe("Testing Filter Bar Actions", () => {
	test("Request Preset Action", () => {
		const payload = "Presets";
		const expectedActionObj = {
			type: filterBarConstants.FETCH_PRESETS_LIST[types.REQUEST],
			payload
		};
		expect(filterBarActions.fetchPresetsList(payload)).toEqual(
			expectedActionObj
		);
	});
	test("Request Brand Action", () => {
		const payload = "Brands";
		const expectedActionObj = {
			type: filterBarConstants.FETCH_BRANDS_LIST[types.REQUEST],
			payload
		};
		expect(filterBarActions.fetchBrandsList(payload)).toEqual(
			expectedActionObj
		);
	});
	test("Request Category Action", () => {
		const payload = "Category";
		const expectedActionObj = {
			type: filterBarConstants.FETCH_CATEGORIES_LIST[types.REQUEST],
			payload
		};
		expect(filterBarActions.fetchCategoriesList(payload)).toEqual(
			expectedActionObj
		);
	});
	test("Request Item Id Action", () => {
		const payload = "Item Id";
		const expectedActionObj = {
			type: filterBarConstants.FETCH_PRODUCTS_LIST[types.REQUEST],
			payload
		};
		expect(filterBarActions.fetchProductsList(payload)).toEqual(
			expectedActionObj
		);
	});
});
