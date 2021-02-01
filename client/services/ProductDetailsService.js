import Axios from "../utils/Axios";
import service_endpoints from "../../common/endpoints";
import { createCommonPayload, createComparePayload } from "./Payloads";

const overallApiUrl = {
	content: "contentOverallScoreUrl",
	availability: "availabilityOverallScoreUrl",
	priceAndPromotion: "priceAndPromotionScoreUrl",
	sales: "salesOverallScoreUrl"
};
const compareOverallApiUrl = {
	content: "contentCompareOverallScoreUrl",
	availability: "availabilityOverallScoreCompareUrl",
	priceAndPromotion: "priceAndPromotionCompareScoreUrl",
	sales: "salesCompareOverallScoreUrl"
};

class ProductDetailsService {
	createPayload = payload => {
		let commonPayload = createCommonPayload(payload);

		return {
			...commonPayload,
			keywords: ["All"],
			brandNames: ["All"],
			categoryNames: ["All"],
			selectedBrand: "",
			selectedCategory: "",
			searchTerms: [],
			tabKey: "",
			keyWordBrands: [],
			productIdList: [payload.productId]
		};
	};

	callProductDetailScoreApi = async payload => {
		const body = this.createPayload(payload);
		return await Axios.post(service_endpoints.productDetailsUrl, body);
	};
	callAsinOverallScoreApi = async payload => {
		const commonPayload = createCommonPayload(payload);
		const body = {
			...commonPayload,
			productIdList: [payload.productId]
		};
		const selectedTab = payload.selectedTab || "content";
		const urlKey = overallApiUrl[selectedTab];
		return await Axios.post(service_endpoints[urlKey], body);
	};
	callAsinBrandCompareOverallScoreApi = async payload => {
		const initialPayload = this.createPayload(payload);
		const commonPayload = {
			...initialPayload,
			comparePage: "compareProduct"
		};
		const body = createComparePayload(commonPayload, payload, true);
		const selectedTab = payload.selectedTab || "content";
		const urlKey = compareOverallApiUrl[selectedTab];
		return await Axios.post(service_endpoints[urlKey], body);
	};

	callProductOverallScoreApi = async payload => {
		const body = this.createPayload(payload);
		return Axios.post(service_endpoints.summaryOverallScoreURL, body);
	};
	callProductCompareOverallScoreApi = async payload => {
		const initialPayload = this.createPayload(payload);
		const commonPayload = {
			...initialPayload,
			comparePage: "compareProduct"
		};
		const body = createComparePayload(commonPayload, payload, true);
		return Axios.post(service_endpoints.summaryCompareOverallScoreURL, body);
	};
}

export default new ProductDetailsService();
