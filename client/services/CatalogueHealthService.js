import Axios from "../utils/Axios";
import service_endpoints from "../../common/endpoints";
import { formatDate } from "../utils/date";
import {
	defaultTableFilter
} from "../components/global-reducers";

import { createCommonPayload } from "./Payloads";

class CatalogueHealthService {
	createPayload = payload => {
		let commonPayload = createCommonPayload(payload);

		commonPayload = {
			...commonPayload,
			keywords: ["All"],
			productId: "",
			keyWordBrands: [],
			tabKey: payload.selectedTab
		};
		return commonPayload;
	};

	createTablePayload = payload => {
		let commonPayload = this.createPayload(payload);

		let tableFilter = payload.tableFilter;
		if (tableFilter?.sortBy === "keyword") tableFilter = defaultTableFilter;

		const tablePayload = {
			...commonPayload,
			tableFilter
		};
		return tablePayload;
	};

	callAvailabilityCatalogHealthApiforTable = (
		payload,
		successCallback,
		errorCallback
	) => {
		const body = this.createTablePayload(payload);
		Axios.post(
			service_endpoints.availabilityCatalogHealthTableUrl,
			body,
			successCallback,
			errorCallback
		);
	};

	callAvailabilityCatalogHealthApiforTab = (
		payload,
		successCallback,
		errorCallback
	) => {
		const body = this.createPayload(payload);
		Axios.post(
			service_endpoints.availabilityCatalogHealthTabsUrl,
			body,
			successCallback,
			errorCallback
		);
	};
}

export default new CatalogueHealthService();
