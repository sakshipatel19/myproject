import * as constants from "./notifications-constants";

export const getNotificationsList = payload =>
	constants.getNotificationList.request(payload);

export const loadMoreNotificationsList = payload =>
	constants.appendNotificationList.request(payload);

export const updateNotificationStatus = payload =>
	constants.updateNotificationStatus.request(payload);

export const getNotificationFilter = payload =>
	constants.getNotificationFilter.request(payload);
