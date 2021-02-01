import Axios from "../utils/Axios";
import service_endpoints from "../../common/endpoints";

class FilterService {
	createFilterPayload = payload => {
		const {
			brandNames = [],
			categoryNames = [],
			productIdList = [],
			clientOrg,
			countryCode,
			fromDate,
			marketCode,
			toDate
		} = payload;

		return {
			brandNames,
			categoryNames,
			productIdList,
			clientOrg,
			countryCode,
			marketCode,
			fromDate,
			toDate
		};
	};

	fetchBrandsList = async payload => {
		const body = this.createFilterPayload(payload);
		return await Axios.post(service_endpoints.fetchBrandsListUrl, body);
	};

	fetchCategoriesList = async payload => {
		const body = this.createFilterPayload(payload);
		return await Axios.post(service_endpoints.fetchCategoriesListUrl, body);
	};

	fetchProductsList = async payload => {
		const body = this.createFilterPayload(payload);
		return await Axios.post(service_endpoints.fetchProductsListUrl, body);
	};

	fetchPresetsList = async payload => {
		const body = this.createFilterPayload(payload);
		return await Axios.post(service_endpoints.fetchPresetsListUrl, body);
	};

	fetchCountryMarketList = async () => {
		return await Axios.get(service_endpoints.fetchCountryMarketsListUrl);
	};

	fetchClientBrandsList = async payload => {
		const body = this.createFilterPayload(payload);
		return await Axios.post(service_endpoints.fetchClientBrandsListUrl, body);
	};

	fetchCompetitorBrandsList = async payload => {
		const body = this.createFilterPayload(payload);
		return await Axios.post(
			service_endpoints.fetchCompetitorBrandsListUrl,
			body
		);
	};

	fetchTopSellerBrandsList = async payload => {
		const body = this.createFilterPayload(payload);
		return await Axios.post(
			service_endpoints.fetchTopSellerBrandsListUrl,
			body
		);
	};
}

export default new FilterService();
