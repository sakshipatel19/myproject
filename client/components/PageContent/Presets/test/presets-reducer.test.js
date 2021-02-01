
import * as presetsConstants from "../presets-constants";
import presetsReducer from "../presets-reducer";
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
describe("Testing Presets Reducer", () => {
    test("Request Action", () => {
        const payload = {};
        const requestAction = {
            type:
                presetsConstants.GET_PRESETS[
                types.REQUEST
                ],
            response: null
        };
        expect(
            presetsReducer(payload, requestAction).presets
        ).toEqual(requestState);
    });
    test("Error Action", () => {
        const payload = {};
        const requestAction = {
            type:
                presetsConstants.GET_PRESETS[
                types.ERROR
                ],
            response: "Error"
        };
        expect(
            presetsReducer(payload, requestAction).presets
        ).toEqual(errorState);
    });
    test("Success Action", () => {
        const payload = {};
        const requestAction = {
            type:
                presetsConstants.GET_PRESETS[
                types.SUCCESS
                ],
            response: "Success"
        };
        expect(
            presetsReducer(payload, requestAction).presets
        ).toEqual(successState);
    });
});
