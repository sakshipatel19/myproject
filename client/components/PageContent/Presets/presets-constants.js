import {
    createActions,
    createActionConstants
} from "../../../constants/actions";

export const GET_PRESETS = createActionConstants(
    "GET_PRESETS"
);
export const getPresets = createActions(
    GET_PRESETS
);
