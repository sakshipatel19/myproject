import FilterService from "./FilterService";
import store from "../store";
import {
	setCountryCodeInConfig,
	setMarketCodeInConfig,
	getCountryMarketListSuccess,
	getCountryMarketListError
} from "../components/global-actions";

class ConfigurationService {
	fetchCountryMarketList = async () => {
		const { result, error } = await FilterService.fetchCountryMarketList();
		let status = "error";

		if (error) store.dispatch(getCountryMarketListError(error));
		else {
			store.dispatch(getCountryMarketListSuccess(result));

			//To set default Country code, MarketPlace from Service
			if (result?.countries)
				store.dispatch(
					setCountryCodeInConfig(result?.countries[0]?.countryCode)
				);
			if (result?.countries && result?.countries[0]?.marketPlaces)
				store.dispatch(
					setMarketCodeInConfig(
						result?.countries[0]?.marketPlaces[0]?.marketCode
					)
				);
			status = "success";
		}

		return status;
	};
}

export default new ConfigurationService();
