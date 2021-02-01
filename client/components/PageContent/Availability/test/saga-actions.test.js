import { runSaga } from "redux-saga";
import { takeEvery, take, call, put, all } from "redux-saga/effects";
import * as availabilitySagas from "../saga-actions";
import * as actions from "../availability-constants";
import services from "../../../../services/AvailabilityService";
import { REQUEST } from "../../../../constants/actions";

const recordSaga = async (saga, intialAction) => {
	const dispatched = [];
	await runSaga(
		{
			dispatch: action => dispatched.push(action)
		},
		saga,
		intialAction
	);
	return dispatched;
};
const mockApi = (api, mockData, promiseMethod) => {
	return jest
		.spyOn(services, api)
		.mockImplementation(() => Promise[promiseMethod](mockData));
};

describe("Testing Lost Buy Box Saga Actions", () => {
	test("Watch Action", () => {
		const yeildEffect = availabilitySagas.watchAvailabilityLostBuyBoxDetails();
		expect(yeildEffect.next().value).toEqual(
			takeEvery(
				actions.GET_AVAILABILITY_LOST_BUY_BOX_DETAILS[REQUEST],
				availabilitySagas.fetchAvailabilityLostBuyBoxDetails
			)
		);
	});
	test("Fetch success action", async () => {
		const mockApiData = { result: { payload: "Test" }, error: false };
		const callAvailabilityLostBuyBoxDetails = mockApi(
			"callAvailabilityLostBuyBoxDetails",
			mockApiData,
			"resolve"
		);

		const dispatched = await recordSaga(
			availabilitySagas.fetchAvailabilityLostBuyBoxDetails,
			mockApiData
		);
		expect(callAvailabilityLostBuyBoxDetails).toHaveBeenCalledTimes(1);
		expect(dispatched[0]).toEqual(
			actions.getAvailabilityLostBuyBoxDetails.success(mockApiData.result)
		);
		callAvailabilityLostBuyBoxDetails.mockClear();
	});
	test("Fetch error action", async () => {
		const mockApiData = { result: { payload: "Test" }, error: true };
		const callAvailabilityLostBuyBoxDetails = mockApi(
			"callAvailabilityLostBuyBoxDetails",
			mockApiData,
			"resolve"
		);

		const dispatched = await recordSaga(
			availabilitySagas.fetchAvailabilityLostBuyBoxDetails,
			mockApiData
		);
		expect(callAvailabilityLostBuyBoxDetails).toHaveBeenCalledTimes(1);
		expect(dispatched[0]).toEqual(
			actions.getAvailabilityLostBuyBoxDetails.error(mockApiData.error)
		);
		callAvailabilityLostBuyBoxDetails.mockClear();
	});
	test("Fetch try block error action", async () => {
		const mockApiData = { result: { payload: "Test" }, error: true };
		const callAvailabilityLostBuyBoxDetails = mockApi(
			"callAvailabilityLostBuyBoxDetails",
			mockApiData.error,
			"reject"
		);

		const dispatched = await recordSaga(
			availabilitySagas.fetchAvailabilityLostBuyBoxDetails,
			mockApiData
		);
		expect(callAvailabilityLostBuyBoxDetails).toHaveBeenCalledTimes(1);
		expect(dispatched[0]).toEqual(
			actions.getAvailabilityLostBuyBoxDetails.error(mockApiData.error)
		);
		callAvailabilityLostBuyBoxDetails.mockClear();
	});
});
