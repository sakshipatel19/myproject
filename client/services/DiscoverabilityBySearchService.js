import Axios from "../utils/Axios";
import service_endpoints from "../../common/endpoints";
import { createCommonPayload, createComparePayload } from "./Payloads";

class BySearch {
	createBySearchCommonPayload = payload => {
		let commonPayload = createCommonPayload(payload);
		return commonPayload;
	};

	createBestSellerPayload = payload => {
		const commonPayload = this.createBySearchCommonPayload(payload);
		const { selectedCategory } = payload;
		const bestSellerPayload = {
			...commonPayload,
			selectedCategory
		};

		return bestSellerPayload;
	};

	callBestSellerShareShelfScoreApi = async payload => {
		const commonPayload = this.createBestSellerPayload(payload);

		return await Axios.post(
			service_endpoints.bySearchBestSellerBrandUrl,
			commonPayload
		);
	};

	callBestSellerKeywordShareShelfTableApi = async payload => {
		let commonPayload = this.createBestSellerPayload(payload);
		let tableFilter = { ...payload.tableFilter };
		const searchTerms = tableFilter?.searchTerms || [];
		const keywords = searchTerms?.length > 0 ? [] : ["All"];
		delete tableFilter["searchTerms"];
		commonPayload = {
			...commonPayload,
			tableFilter,
			searchTerms,
			keywords
		};
		return await Axios.post(
			service_endpoints.bySearchBestSellerKeywordUrl,
			commonPayload
		);
	};
	callBySearchKeywordTableApi = async payload => {
		const commonPayload = createCommonPayload(payload);
		const body = {
			...commonPayload,
			tableFilter: payload.tableFilter,
			searchTerms: payload?.tableFilter?.searchTerms || [],
			keyWordBrands: payload.bySearchSelectedKeywordsList || []
		};
		return await Axios.post(
			service_endpoints.bySearchShareOfShelfTableUrl,
			body
		);
	};
	callBySearchBrandCompareKeywordTableApi = async payload => {
		const commonPayload = createCommonPayload(payload);
		const body = {
			...commonPayload,
			tableFilter: payload.tableFilter,
			searchTerms: payload?.tableFilter?.searchTerms || [],
			keyWordBrands: payload.bySearchSelectedKeywordsList || []
		};
		const payload1 = createComparePayload(body, payload);
		return await Axios.post(
			service_endpoints.bySearchCompareShareOfShelfTableUrl,
			payload1
		);
	};
	callBySearchOverallScoreApi = async payload => {
		const commonPayload = createCommonPayload(payload);
		const body = {
			...commonPayload,
			keyWordBrands: payload.bySearchSelectedKeywordsList
		};
		return await Axios.post(service_endpoints.bySearchOverallScoreUrl, body);
	};

	callBySearchCompareOverallScoreApi = async payload => {
		const commonPayload = createCommonPayload(payload);
		commonPayload.keyWordBrands = payload.bySearchSelectedKeywordsList || []
		const body = createComparePayload(commonPayload, payload);
		return await Axios.post(
			service_endpoints.bySearchCompareOverallScoreUrl,
			body
		);
	};
}

export default new BySearch();
