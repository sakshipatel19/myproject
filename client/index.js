import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import "./index.scss";
import history from "./utils/history";

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<App />
		</Router>
	</Provider>,
	document.getElementById("root")
);
