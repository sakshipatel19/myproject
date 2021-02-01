import Axios from "../utils/Axios";
import service_endpoints from "../../common/endpoints";
import { createCommonPayload, createComparePayload } from "./Payloads";

class PriceAndPromotionService {
	createBestSellerPayload = payload => {
		const commonPayload = createCommonPayload(payload);
		const { selectedCategory } = payload;
		const bestSellerPayload = {
			...commonPayload,
			selectedCategory
		};
		return bestSellerPayload;
	};

	callOverallScoreApi = async payload => {
		const body = createCommonPayload(payload);
		return await Axios.post(service_endpoints.priceAndPromotionScoreUrl, body);
	};

	fetchBrandCompareOverallScores = async payload => {
		const commonPayload = createCommonPayload(payload);
		const body = createComparePayload(commonPayload, payload);
		return await Axios.post(
			service_endpoints.priceAndPromotionCompareScoreUrl,
			body
		);
	};

	fetchPriceBestSeller = async payload => {
		const body = this.createBestSellerPayload(payload);
		return await Axios.post(service_endpoints.priceBestSellerUrl, body);
	};

	fetchPromotionBestSeller = async payload => {
		const body = this.createBestSellerPayload(payload);
		return await Axios.post(service_endpoints.promotionBestSellerUrl, body);
	};

	fetchBrandCompareOverallPromotionScores = (
		payload,
		successCallback,
		errorCallback
	) => {
		const commonPayload = createCommonPayload(payload);
		const body = createComparePayload(commonPayload, payload);
		Axios.post(
			service_endpoints.promotionCompareOverallScoreUrl,
			body,
			successCallback,
			errorCallback
		);
	};

	fetchBrandLevelScores = async payload => {
		const body = createCommonPayload(payload);
		return await Axios.post(
			service_endpoints.brandsPriceAndPromotionScoreUrl,
			body
		);
	};

	fetchPromotionCountAndTypes = async payload => {
		const body = createCommonPayload(payload);
		return await Axios.post(service_endpoints.promotionCountAndTypesUrl, body);
	};

	// fetchPromotionCompareCountAndTypes = async payload => {
	// 	const commonPayload = createCommonPayload(payload);
	// 	const body = createComparePayload(commonPayload, payload);
	// 	return await Axios.post(
	// 		service_endpoints.promotionCompareCountAndTypesUrl,
	// 		body
	// 	);
	// };
	fetchPromotionCountBrandCompareApi = async payload => {
		const commonPayload = createCommonPayload(payload);
		const body = createComparePayload(commonPayload, payload);
		return await Axios.post(
			service_endpoints.promotionCompareCountAndTypesUrlV2,
			body
		);
	};
}

export default new PriceAndPromotionService();
