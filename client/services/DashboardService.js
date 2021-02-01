import Axios from "../utils/Axios";
import service_endpoints from "../../common/endpoints";
import { createCommonPayload, createComparePayload } from "./Payloads";

class DashboardService {
	fetchDiscoverabilityOverallScores = (
		payload,
		successCallback,
		errorCallback
	) => {
		const body = createCommonPayload(payload);
		Axios.post(
			service_endpoints.dashboardDiscoverabilityUrl,
			body,
			successCallback,
			errorCallback
		);
	};

	fetchConsiderationOverallScores = (
		payload,
		successCallback,
		errorCallback
	) => {
		const body = createCommonPayload(payload);
		Axios.post(
			service_endpoints.dashboardConsiderationUrl,
			body,
			successCallback,
			errorCallback
		);
	};

	fetchConversionOverallScores = (payload, successCallback, errorCallback) => {
		const body = createCommonPayload(payload);
		Axios.post(
			service_endpoints.dashboardConversionUrl,
			body,
			successCallback,
			errorCallback
		);
	};

	fetchDiscoverabilityBrandCompareOverallScores = (
		payload,
		successCallback,
		errorCallback
	) => {
		const commonPayload = createCommonPayload(payload);
		const body = createComparePayload(commonPayload, payload);
		Axios.post(
			service_endpoints.dashboardCompareDiscoverabilityUrl,
			body,
			successCallback,
			errorCallback
		);
	};

	fetchConsiderationBrandCompareOverallScores = (
		payload,
		successCallback,
		errorCallback
	) => {
		const commonPayload = createCommonPayload(payload);
		const body = createComparePayload(commonPayload, payload);
		Axios.post(
			service_endpoints.dashboardCompareConsiderationUrl,
			body,
			successCallback,
			errorCallback
		);
	};

	fetchConversionBrandCompareOverallScores = (
		payload,
		successCallback,
		errorCallback
	) => {
		const commonPayload = createCommonPayload(payload);
		const body = createComparePayload(commonPayload, payload);
		Axios.post(
			service_endpoints.dashboardCompareConversionUrl,
			body,
			successCallback,
			errorCallback
		);
	};
}

export default new DashboardService();
