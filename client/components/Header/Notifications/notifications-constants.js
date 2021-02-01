import {
	createActions,
	createActionConstants
} from "../../../constants/actions";

export const GET_NOTIFICATION_LIST = createActionConstants(
	"GET_NOTIFICATION_LIST"
);
export const getNotificationList = createActions(GET_NOTIFICATION_LIST);

export const UPDATE_NOTIFICATION_STATUS = createActionConstants(
	"UPDATE_NOTIFICATION_STATUS"
);
export const updateNotificationStatus = createActions(
	UPDATE_NOTIFICATION_STATUS
);

export const APPEND_NOTIFICATION_LIST = createActionConstants(
	"APPEND_NOTIFICATION_LIST"
);
export const appendNotificationList = createActions(APPEND_NOTIFICATION_LIST);

export const GET_NOTIFICATION_FILTER = createActionConstants(
	"GET_NOTIFICATION_FILTER"
);
export const getNotificationFilter = createActions(GET_NOTIFICATION_FILTER);