import * as constants from "./presets-constants";


export const fetchPresets = payload =>
    constants.getPresets.request(payload);
