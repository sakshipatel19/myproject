import Axios from "../utils/Axios";
import service_endpoints from "../../common/endpoints";
import { createCommonPayload, createComparePayload } from "./Payloads";

class SalesService {
	fetchOverallSalesScore = async payload => {
		const body = createCommonPayload(payload);
		return await Axios.post(service_endpoints.salesOverallScoreUrl, body);
	};

	fetchCompareOverallSalesScore = async payload => {
		const commonPayload = createCommonPayload(payload);
		const body = createComparePayload(commonPayload, payload);
		return await Axios.post(
			service_endpoints.salesCompareOverallScoreUrl,
			body
		);
	};

	fetchSalesBrandsTable = async payload => {
		const body = createCommonPayload(payload);
		return await Axios.post(service_endpoints.salesBrandsTableUrl, body);
	};

	fetchSalesCompareBrandsTable = async payload => {
		const commonPayload = createCommonPayload(payload);
		const body = createComparePayload(commonPayload, payload);
		return await Axios.post(service_endpoints.salesCompareBrandsTableUrl, body);
	};

	callSalesOverallScoreExport = async payload => {
		let body = createCommonPayload(payload);
		body = {
			...body,
			exportRequest: {
				exportType: payload.exportType
			}
		};
		
		return await Axios.postDownload(
			service_endpoints.salesOverallScoreExportUrl,
			body
		);
	};
}

export default new SalesService();
