import Axios from "../utils/Axios";
import service_endpoints from "../../common/endpoints";
import { createCommonPayload, createComparePayload } from "./Payloads";
import { defaultTableFilter } from "../components/global-reducers";

class SummaryService {
	callOverallScoreApi = async payload => {
		const body = createCommonPayload(payload);
		return await Axios.post(service_endpoints.summaryOverallScoreURL, body);
	};
	callOverallScoreBrandCompareApi = async payload => {
		const commonPayload = createCommonPayload(payload);
		const body = createComparePayload(commonPayload, payload);
		return await Axios.post(service_endpoints.summaryCompareOverallScoreURL, body);
	};
	callAttributeScoreApi = async payload => {
		const commonPayload = createCommonPayload(payload);
		return await Axios.post(
			service_endpoints.summaryAttributeScoreURL,
			commonPayload
		);
	};

	callCompareAttributeScoreApi = async payload => {
		const commonPayload = createCommonPayload(payload);
		const body = createComparePayload(commonPayload, payload);
		return await Axios.post(service_endpoints.summaryCompareAttributeURL, body);
	};
}
export default new SummaryService();
