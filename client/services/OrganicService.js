import Axios from "../utils/Axios";
import service_endpoints from "../../common/endpoints";
import { createCommonPayload, createComparePayload } from "./Payloads";

class OrganicService {
	createOrganicCommonPayload = payload => {
		let commonPayload = createCommonPayload(payload);
		commonPayload = {
			...commonPayload,
			keyWordBrands: payload.organicKeywordBrands
		};
		return commonPayload;
	};

	createTablePayload = payload => {
		let commonPayload = this.createOrganicCommonPayload(payload);
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
		const commonPayload = this.createOrganicCommonPayload(payload);
		const { selectedCategory } = payload;
		const bestSellerPayload = {
			...commonPayload,
			selectedCategory
		};
		return bestSellerPayload;
	};

	callOverallScoreApi = (payload, successCallback, errorCallback) => {
		const body = this.createOrganicCommonPayload(payload);
		Axios.post(
			service_endpoints.organicShareOfShelfScoreUrl,
			body,
			successCallback,
			errorCallback
		);
	};

	callShareShelfTableApi = (payload, successCallback, errorCallback) => {
		const tablePayload = this.createTablePayload(payload);
		Axios.post(
			service_endpoints.organicShareOfShelfTableUrl,
			tablePayload,
			successCallback,
			errorCallback
		);
	};
	callBrandCompareOverallScoreApi(payload, successCallback, errorCallback) {
		const commonPayload = this.createOrganicCommonPayload(payload);
		const body = createComparePayload(commonPayload, payload);
		Axios.post(
			service_endpoints.organicCompareShareOfShelfScoreUrl,
			body,
			successCallback,
			errorCallback
		);
	}
	callBrandCompareShareShelfTableApi(payload, successCallback, errorCallback) {
		const commonPayload = this.createTablePayload(payload);
		const tablePayload = createComparePayload(commonPayload, payload);
		Axios.post(
			service_endpoints.organicCompareShareOfShelfTableUrl,
			tablePayload,
			successCallback,
			errorCallback
		);
	}

	callBestSellerShareShelfScoreApi(
		payload,
		successCallback,
		errorCallback = () => {}
	) {
		const commonPayload = this.createBestSellerPayload(payload);

		Axios.post(
			service_endpoints.bestSellerOrganicShareOfShelfScoreUrl,
			commonPayload,
			successCallback,
			errorCallback
		);
	}

	callBestSellerShareShelfTableApi(
		payload,
		successCallback,
		errorCallback = () => {}
	) {
		let commonPayload = this.createBestSellerPayload(payload);
		const tableFilter = {
			pageNo: payload.tableFilter.pageNo,
			pageSize: payload.tableFilter.pageSize,
			sortBy: payload.tableFilter.sortBy,
			sortType: payload.tableFilter.sortType
		};
		commonPayload = {
			...commonPayload,
			tableFilter,
			searchTerms: payload.tableFilter.searchTerms || []
		};
		Axios.post(
			service_endpoints.bestSellerOrganicShareOfShelfTableUrl,
			commonPayload,
			successCallback,
			errorCallback
		);
	}
}

export default new OrganicService();
