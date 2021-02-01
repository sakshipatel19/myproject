import Axios from "../utils/Axios";
import service_endpoints from "../../common/endpoints";
import { createCommonPayload, createComparePayload } from "./Payloads";
import { defaultTableFilter } from "../components/global-reducers";

class AvailabilityService {
	createBestSellerPayload = payload => {
		const commonPayload = createCommonPayload(payload);
		const { selectedCategory } = payload;
		const bestSellerPayload = {
			...commonPayload,
			selectedCategory
		};
		return bestSellerPayload;
	};
	createCatalogHealthDetailPayload = payload => {
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
	createCatalogHealthDetailTablePayload = payload => {
		let commonPayload = this.createCatalogHealthDetailPayload(payload);

		let tableFilter = payload.tableFilter;
		if (tableFilter?.sortBy === "keyword") tableFilter = defaultTableFilter;

		const tablePayload = {
			...commonPayload,
			tableFilter
		};
		return tablePayload;
	};
	callOverallScoreApi = async payload => {
		const body = createCommonPayload(payload);
		return await Axios.post(
			service_endpoints.availabilityOverallScoreUrl,
			body
		);
	};

	callBrandsScoreApi = async payload => {
		const body = this.createBestSellerPayload(payload);
		return await Axios.post(service_endpoints.availabilityBrandScoreUrl, body);
	};

	callBestSellerApi = async payload => {
		const body = this.createBestSellerPayload(payload);
		return await Axios.post(service_endpoints.availabilityBestSellerUrl, body);
	};
	callBrandCompareOverallScoreApi = (
		payload,
		successCallback,
		errorCallback
	) => {
		const commonPayload = createCommonPayload(payload);
		const body = createComparePayload(commonPayload, payload);
		Axios.post(
			service_endpoints.availabilityCompareOverallScoreUrl,
			body,
			successCallback,
			errorCallback
		);
	};

	callCatalogHealthApi = async payload => {
		const body = createCommonPayload(payload);
		return await Axios.post(
			service_endpoints.availabilityCatalogHealthUrl,
			body
		);
	};

	callLostBuyBoxApi = (payload, successCallback, errorCallback) => {
		let body = createCommonPayload(payload);
		body = {
			...body,
			searchTerms: payload.tableFilter.searchTerms || []
		};
		Axios.post(
			service_endpoints.availabilityLostBuyBoxDetUrl,
			body,
			successCallback,
			errorCallback
		);
	};

	callLostBuyBoxApi = async payload => {
		let body = createCommonPayload(payload);
		body = {
			...body,
			searchTerms: payload.tableFilter.searchTerms || []
		};
		return await Axios.post(
			service_endpoints.availabilityLostBuyBoxDetUrl,
			body
		);
	};

	callLostBuyBoxTableApi = (payload, successCallback, errorCallback) => {
		let body = createCommonPayload(payload);
		const tableFilter = {
			pageNo: payload.tableFilter.pageNo,
			pageSize: payload.tableFilter.pageSize,
			sortBy:
				payload.tableFilter.sortBy === "keyword"
					? "productName"
					: payload.tableFilter.sortBy,
			sortType: payload.tableFilter.sortType
		};
		body = {
			...body,
			tableFilter,
			searchTerms: payload.tableFilter.searchTerms || []
		};
		Axios.post(
			service_endpoints.availabilityLostBuyBoxTablesUrl,
			body,
			successCallback,
			errorCallback
		);
	};
	callAvailabilityCatalogHealthApiforTab = async payload => {
		const body = this.createCatalogHealthDetailPayload(payload);
		return await Axios.post(
			service_endpoints.availabilityCatalogHealthTabsUrl,
			body
		);
	};

	callAvailabilityCatalogHealthApiforTable = async payload => {
		const body = this.createCatalogHealthDetailTablePayload(payload);
		return await Axios.post(
			service_endpoints.availabilityCatalogHealthTableUrl,
			body
		);
	};
	callAvailabilityLostBuyBoxDetails = async payload => {
		let body = createCommonPayload(payload);
		body = {
			...body,
			tableFilter: payload.tableFilter,
			searchTerms: payload.tableFilter.searchTerms
		};
		return await Axios.post(
			service_endpoints.availabilityLostBuyBoxTablesUrl,
			body
		);
	};
	callOverallScoreBrandCompareApi = async payload => {
		const commonPayload = createCommonPayload(payload);
		const body = createComparePayload(commonPayload, payload);
		return await Axios.post(
			service_endpoints.availabilityOverallScoreCompareUrl,
			body
		);
	};
}

export default new AvailabilityService();
