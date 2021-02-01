import Axios from "../utils/Axios";
import service_endpoints from "../../common/endpoints";

class NotificationService {
	pageSize = 10;

	getNotificationList = async payload => {
		const commonPayload = {
			clientOrg: payload.clientOrg,
			pageNo: payload.pageNo,
			pageSize: this.pageSize,
			notificationTypeIdList: payload.notificationTypeIdList || [],
			marketCode: payload.marketCode,
			countryCode: payload.countryCode
		};
		return await Axios.post(
			service_endpoints.fetchNotificationsListUrl,
			commonPayload
		);
	};

	updateNotificationStatus = async payload => {
		const commonPayload = { notificationIdList: payload.newNotifications };
		return await Axios.post(
			service_endpoints.updateNotificationStatusUrl,
			commonPayload
		);
	};

	getNotificationFilters = async payload => {
		const commonPayload = {
			clientOrg: payload.clientOrg,
			countryCode: payload.countryCode,
			marketCode: payload.marketCode
		};
		return await Axios.post(
			service_endpoints.fetchNotificationFilterUrl,
			commonPayload
		);
	};
}

export default new NotificationService();
