import Axios from "../utils/Axios";
import service_endpoints from "../../common/endpoints";
import { createCommonPayload, createComparePayload } from "./Payloads";


class PresetsService {
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

    callPresets = async payload => {
        const body = this.createPayload(payload);
        return await Axios.post(service_endpoints.fetchPresetsListUrl, body);
    };
}

export default new PresetsService();