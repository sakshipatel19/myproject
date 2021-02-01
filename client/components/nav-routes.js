import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ContentSummaryContainer from "./PageContent/Content";
import Availability from "./PageContent/Availability";
import AvailabilityCatalogHealthDetail from "./PageContent/Availability/CatalogHealthDetail";
import CatalogHealthDetail from "./PageContent/Content/CatalogHealthDetail";
import PriceAndPromotion from "./PageContent/PriceAndPromotion";
import LostBuyBoxDetails from "./PageContent/Availability/LostBuyBox/LostBuyBoxDetails";
import BySearch from "./PageContent/BySearch";
import BySearchBestSellerKeywordTable from "./PageContent/BySearch/BySearchBestSellerKeywordTable";
import Summary from "./PageContent/Summary";
import auth0Client from "../services/Auth";
import {
	showSessionTimeoutScreen,
	setSessionRedirectUrl
} from "./global-actions";
import store from "../store";
import Sales from "./PageContent/Sales";
import ProductDetails from "./PageContent/ProductDetails";

const SecretRoute = ({ component: Component, ...rest }) => {
	if (auth0Client.isAuthenticated()) {
		window.scrollTo({ top: 0, behavior: "smooth" });
		return <Route {...rest} render={props => <Component {...props} />} />;
	} else {
		store.dispatch(showSessionTimeoutScreen(true));
		store.dispatch(setSessionRedirectUrl(location.pathname));
		return null;
	}
};

const SummaryRoutes = props => {
	return (
		<Switch>
			<SecretRoute
				exact
				path="/analysis/shelf/summary"
				component={Summary}
				key={"summary"}
			/>
			<SecretRoute
				exact
				path="/analysis/:primaryModule/consideration/content"
				component={ContentSummaryContainer}
				key={"content"}
			/>
			<SecretRoute
				exact
				path="/analysis/:primaryModule/consideration/availability"
				component={Availability}
				key={"availability"}
			/>
			<SecretRoute
				exact
				path="/analysis/shelf/consideration/content/catalog-health"
				component={CatalogHealthDetail}
				key={"content-catalog-health-detail"}
			/>
			<SecretRoute
				exact
				path="/analysis/shelf/consideration/availability/catalog-health"
				component={AvailabilityCatalogHealthDetail}
				key={"availability-catalog-health-detail"}
			/>
			<SecretRoute
				exact
				path="/analysis/:primaryModule/consideration/price-and-promotion"
				component={PriceAndPromotion}
				key={"price-and-promotion"}
			/>
			<SecretRoute
				exact
				path="/analysis/shelf/consideration/availability/lost-buy-box-details"
				component={LostBuyBoxDetails}
				key={"lost-buy-box-details"}
			/>
			<SecretRoute
				exact
				path="/analysis/:primaryModule/discoverability/bysearch"
				component={BySearch}
				key={"bysearch"}
			/>
			<SecretRoute
				exact
				path="/analysis/:primaryModule/discoverability/bysearch/bestseller-details"
				component={BySearchBestSellerKeywordTable}
				key={"bysearch"}
			/>
			<SecretRoute
				exact
				path="/analysis/:primaryModule/conversion/sales"
				component={Sales}
				key={"sales"}
			/>
			<SecretRoute
				exact
				path="/analysis/shelf/product-details/:id"
				component={ProductDetails}
				key={"productDetails"}
			/>
			{/* <SecretRoute component={RouteNotFound} /> */}
		</Switch>
	);
};

export default SummaryRoutes;
