import Axios from "../utils/Axios";
import service_endpoints from "../../common/endpoints";
import { createCommonPayload, createComparePayload } from "./Payloads";

class PaidService {
	createPaidServiceCommonPayload = payload => {
		let commonPayload = createCommonPayload(payload);
		commonPayload = {
			...commonPayload,
			keyWordBrands: payload.paidKeywordBrands
		};
		return commonPayload;
	};

	createTablePayload = payload => {
		let commonPayload = this.createPaidServiceCommonPayload(payload);
		let tableFilter = { ...payload.tableFilter };
		let searchTerms = tableFilter?.searchTerms || [];
		let keywords = searchTerms?.length > 0 ? [""] : ["All"];
		delete tableFilter["searchTerms"];

		const tablePayload = {
			...commonPayload,
			keywords,
			tableFilter,
			searchTerms
		};
		return tablePayload;
	};

	createBestSellerPayload = payload => {
		const commonPayload = this.createPaidServiceCommonPayload(payload);
		const { selectedCategory } = payload;
		const bestSellerPayload = {
			...commonPayload,
			selectedCategory
		};
		return bestSellerPayload;
	};

	createBrandComaprePayload = payload => {
		const filters = this.createPaidServiceCommonPayload(payload);
		const commonPayload = createComparePayload(filters, payload);
		return commonPayload;
	};

	createBrandComapreTablePayload = payload => {
		const filters = this.createTablePayload(payload);
		let commonPayload = createComparePayload(filters, payload);
		return commonPayload;
	};

	callOverallScoreApi = (payload, successCallback, errorCallback) => {
		const body = this.createPaidServiceCommonPayload(payload);
		Axios.post(
			service_endpoints.paidShareOfShelfUrl,
			body,
			successCallback,
			errorCallback
		);
	};

	callShareShelfTableApi = (payload, successCallback, errorCallback) => {
		const tablePayload = this.createTablePayload(payload);
		Axios.post(
			service_endpoints.paidShareOfShelfTableUrl,
			tablePayload,
			successCallback,
			errorCallback
		);
	};

	callBrandCompareOverallScoreApi = (
		payload,
		successCallback,
		errorCallback
	) => {
		const commonPayload = this.createPaidServiceCommonPayload(payload);
		const body = createComparePayload(commonPayload, payload);
		Axios.post(
			service_endpoints.paidCompareShareOfShelfUrl,
			body,
			successCallback,
			errorCallback
		);
	};

	callBrandCompareShareShelfTableApi = (
		payload,
		successCallback,
		errorCallback
	) => {
		const commonPayload = this.createTablePayload(payload);
		const tablePayload = createComparePayload(commonPayload, payload);
		Axios.post(
			service_endpoints.paidCompareShareOfShelfTableUrl,
			tablePayload,
			successCallback,
			errorCallback
		);
	};

	callBestSellerShareShelfScoreApi(payload, successCallback, errorCallback) {
		const commonPayload = this.createBestSellerPayload(payload);
		Axios.post(
			service_endpoints.bestSellerPaidShareOfShelfScoreUrl,
			commonPayload,
			successCallback,
			errorCallback
		);
	}

	callBestSellerShareShelfTableApi(payload, successCallback, errorCallback) {
		let commonPayload = this.createBestSellerPayload(payload);
		let keywords = ["All"];
		if (payload.tableFilter?.searchTerms?.length > 0) keywords = [""];
		const tableFilter = {
			pageNo: payload.tableFilter.pageNo,
			pageSize: payload.tableFilter.pageSize,
			sortBy: payload.tableFilter.sortBy,
			sortType: payload.tableFilter.sortType
		};
		commonPayload = {
			...commonPayload,
			tableFilter,
			keywords,
			searchTerms: payload.tableFilter.searchTerms || []
		};
		Axios.post(
			service_endpoints.bestSellerPaidShareOfShelfTableUrl,
			commonPayload,
			successCallback,
			errorCallback
		);
	}
}

export default new PaidService();
