import * as filterActions from "../filters-bar-actions";
import * as filterConstants from "../filters-constants";
import filterReducer from "../filters-bar-reducer";
import * as types from "../../../../constants/actions";

const requestState = {
	fetching: true,
	error: null,
	data: null
};
const errorState = {
	fetching: false,
	error: "Error",
	data: null
};
const successState = {
	fetching: false,
	error: null,
	data: "Success"
};
describe("Testing Brand Filter Reducer ", () => {
	test("Request Action", () => {
		const payload = {};
		const requestAction = {
			type: filterConstants.FETCH_BRANDS_LIST[types.REQUEST],
			response: null
		};
		expect(filterReducer(payload, requestAction).brandsList).toEqual(
			requestState
		);
	});
	test("Error Action", () => {
		const payload = {};
		const requestAction = {
			type: filterConstants.FETCH_BRANDS_LIST[types.ERROR],
			response: "Error"
		};
		expect(filterReducer(payload, requestAction).brandsList).toEqual(
			errorState
		);
	});
	test("Success Action", () => {
		const payload = {};
		const requestAction = {
			type: filterConstants.FETCH_BRANDS_LIST[types.SUCCESS],
			response: "Success"
		};
		expect(filterReducer(payload, requestAction).brandsList).toEqual(
			successState
		);
	});
});
describe("Testing Category Filter Reducer", () => {
	test("Request Action", () => {
		const payload = {};
		const requestAction = {
			type: filterConstants.FETCH_CATEGORIES_LIST[types.REQUEST],
			response: null
		};
		expect(filterReducer(payload, requestAction).categoriesList).toEqual(
			requestState
		);
	});
	test("Error Action", () => {
		const payload = {};
		const requestAction = {
			type: filterConstants.FETCH_CATEGORIES_LIST[types.ERROR],
			response: "Error"
		};
		expect(filterReducer(payload, requestAction).categoriesList).toEqual(
			errorState
		);
	});
	test("Success Action", () => {
		const payload = {};
		const requestAction = {
			type: filterConstants.FETCH_CATEGORIES_LIST[types.SUCCESS],
			response: "Success"
		};
		expect(filterReducer(payload, requestAction).categoriesList).toEqual(
			successState
		);
	});
});
describe("Testing ProductId List reducer", () => {
	test("Request Action", () => {
		const payload = {};
		const requestAction = {
			type: filterConstants.FETCH_PRODUCTS_LIST[types.REQUEST],
			response: null
		};
		expect(filterReducer(payload, requestAction).productsList).toEqual(
			requestState
		);
	});
	test("Error Action", () => {
		const payload = {};
		const requestAction = {
			type: filterConstants.FETCH_PRODUCTS_LIST[types.ERROR],
			response: "Error"
		};
		expect(filterReducer(payload, requestAction).productsList).toEqual(
			errorState
		);
	});
	test("Success Action", () => {
		const payload = {};
		const requestAction = {
			type: filterConstants.FETCH_PRODUCTS_LIST[types.SUCCESS],
			response: "Success"
		};
		expect(filterReducer(payload, requestAction).productsList).toEqual(
			successState
		);
	});
});
describe("Testing Presets Filter reducer", () => {
	test("Request Action", () => {
		const payload = {};
		const requestAction = {
			type: filterConstants.FETCH_PRESETS_LIST[types.REQUEST],
			response: null
		};
		expect(filterReducer(payload, requestAction).presetsList).toEqual(
			requestState
		);
	});
	test("Error Action", () => {
		const payload = {};
		const requestAction = {
			type: filterConstants.FETCH_PRESETS_LIST[types.ERROR],
			response: "Error"
		};
		expect(filterReducer(payload, requestAction).presetsList).toEqual(
			errorState
		);
	});
	test("Success Action", () => {
		const payload = {};
		const requestAction = {
			type: filterConstants.FETCH_PRESETS_LIST[types.SUCCESS],
			response: "Success"
		};
		expect(filterReducer(payload, requestAction).presetsList).toEqual(
			successState
		);
	});
});
