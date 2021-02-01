import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import LandingPage from "./components/LandingPage";
import Callback from "./components/Callback";
import InternalServerError from "./components/PageContent/common/errorPages/InternalServerError-500";
import auth from "./services/Auth";
import history from "./utils/history";
import ConfigurationService from "./services/ConfigurationService";

const handleAuthentication = (nextState, replace) => {
	if (/access_token|id_token|error/.test(nextState.location.hash)) {
		auth.handleAuthentication((error) => {
			if (error) return;

			ConfigurationService.fetchCountryMarketList().then(status => {
				//if success redirecting to content by default
				if (status === "success")
					history.replace("/analysis/shelf/consideration/content");
			});
		});
	}
};

const App = () => {
	return (
		<Switch>
			<Route path="/analysis" component={LandingPage} />
			<Route exact path="/" component={HomePage} />
			<Route exact path="/500" component={InternalServerError} />
			<Route
				path="/callback"
				render={(props) => {
					handleAuthentication(props);
					return <Callback />;
				}}
			/>
		</Switch>
	);
};

export default App;
