
import * as availabilityConstants from "../availability-constants";
import availabilityReducer from "../availability-reducer";
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
describe("Testing Lost Buy Box Availability Reducer", () => {
	test("Request Action", () => {
		const payload = {};
		const requestAction = {
			type:
				availabilityConstants.GET_AVAILABILITY_LOST_BUY_BOX_DETAILS[
				types.REQUEST
				],
			response: null
		};
		expect(
			availabilityReducer(payload, requestAction).lostBuyBoxDetails
		).toEqual(requestState);
	});
	test("Error Action", () => {
		const payload = {};
		const requestAction = {
			type:
				availabilityConstants.GET_AVAILABILITY_LOST_BUY_BOX_DETAILS[
				types.ERROR
				],
			response: "Error"
		};
		expect(
			availabilityReducer(payload, requestAction).lostBuyBoxDetails
		).toEqual(errorState);
	});
	test("Success Action", () => {
		const payload = {};
		const requestAction = {
			type:
				availabilityConstants.GET_AVAILABILITY_LOST_BUY_BOX_DETAILS[
				types.SUCCESS
				],
			response: "Success"
		};
		expect(
			availabilityReducer(payload, requestAction).lostBuyBoxDetails
		).toEqual(successState);
	});
});
