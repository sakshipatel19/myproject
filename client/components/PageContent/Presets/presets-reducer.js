import * as constants from "./presets-constants";
import { REQUEST, SUCCESS, ERROR } from "../../../constants/actions";

const defaultState = {
    presets: {
        fetching: true,
        error: null,
        data: null
    }
};
const presetsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case constants.GET_PRESETS[REQUEST]:
            return {
                ...state,
                presets: { fetching: true, error: null, data: null }
            };
        case constants.GET_PRESETS[SUCCESS]:
            return {
                ...state,
                presets: { fetching: false, error: null, data: action.response }
            };

        case constants.GET_PRESETS[ERROR]:
            return {
                ...state,
                presets: { fetching: false, error: action.response, data: null }
            };
        default:
            return state;
    }
}
export default presetsReducer;
