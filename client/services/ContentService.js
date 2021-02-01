import Axios from "../utils/Axios";
import service_endpoints from "../../common/endpoints";
import { createCommonPayload, createComparePayload } from "./Payloads";
import { defaultTableFilter } from "../components/global-reducers";

class ContentService {
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
		return await Axios.post(service_endpoints.contentOverallScoreUrl, body);
	};

	callBestSellerApi = async payload => {
		const body = this.createBestSellerPayload(payload);
		return await Axios.post(service_endpoints.contentBestSellerUrl, body);
	};

	callAttributeScoreApi = async (payload, successCallback, errorCallback) => {
		const body = createCommonPayload(payload);
		return await Axios.post(service_endpoints.contentScoreByAttributeUrl, body);
	};

	callBrandsScoreApi = async payload => {
		const body = createCommonPayload(payload);
		return await Axios.post(service_endpoints.contentScoreByBrandUrl, body);
	};

	callContentCatalogHealthApi = async payload => {
		const body = createCommonPayload(payload);
		return await Axios.post(service_endpoints.contentcatalogHealthUrl, body);
	};

	callBrandCompareOverallScoreApi = async payload => {
		const commonPayload = createCommonPayload(payload);
		const body = createComparePayload(commonPayload, payload);
		return await Axios.post(
			service_endpoints.contentCompareOverallScoreUrl,
			body
		);
	};

	callBrandCompareAttributeScoreApi = async payload => {
		const commonPayload = createCommonPayload(payload);
		const body = createComparePayload(commonPayload, payload);
		return await Axios.post(
			service_endpoints.contentCompareScoreByAttributeUrl,
			body
		);
	};

	callContentCatalogHealthApiforTab = async payload => {
		const body = this.createCatalogHealthDetailPayload(payload);
		return await Axios.post(service_endpoints.catalogHealthTabsUrl, body);
	};

	callContentCatalogHealthApiforTable = async payload => {
		const body = this.createCatalogHealthDetailTablePayload(payload);
		return await Axios.post(service_endpoints.catalogHealthTableUrl, body);
	};

	callContentCatalogHealthApiforTableExport = async payload => {
		let body = this.createCatalogHealthDetailTablePayload(payload);

		body = {
			...body,
			tableFilter: { ...body.tableFilter, pageNo: 0, pageSize: 0 },
			exportRequest: {
				exportType: payload.exportType
			}
		};

		return await Axios.postDownload(
			service_endpoints.contentCatalogHealthTableExport,
			body
		);
	};

	callContentOverallScoreExport = async payload => {
		let body = createCommonPayload(payload);
		body = {
			...body,
			exportRequest: {
				exportType: payload.exportType
			}
		};

		return await Axios.postDownload(
			service_endpoints.contentOverallScoreExport,
			body
		);
	};
}

export default new ContentService();
