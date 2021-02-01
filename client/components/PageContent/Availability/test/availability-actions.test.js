import * as availabilityActions from "../availability-actions";
import * as availabilityConstants from "../availability-constants";
import * as types from "../../../../constants/actions";

describe("Testing Lost Buy Box Availability Actions", () => {
	test("Request Action", () => {
		const payload = "Lost Buy Box";
		const expectedActionObj = {
			type:
				availabilityConstants.GET_AVAILABILITY_LOST_BUY_BOX_DETAILS[
					types.REQUEST
				],
			payload
		};
		expect(
			availabilityActions.fetchAvailabilityLostBuyBoxDetails(payload)
		).toEqual(expectedActionObj);
	});
});
