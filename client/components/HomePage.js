import React, { Component } from "react";
import auth0Client from "../services/Auth";
import brandLogo from "../assets/images/CI-Black-logo.svg";
import Button from "./common/Button";
import "./main.scss";

class Home extends Component {
	signIn = () => {
		// if (!auth0Client.isAuthenticated()) {
		auth0Client.login();
		// }
	};

	render() {
		return (
			<div className="home-page-container">
				<div className="home-page-content">
					<img src={brandLogo} className="product-logo" />
					<div className="product-desc">
						An Ecommerce Retail Intelligence Product to provide insights to
						brands to help them win on online marketplaces
					</div>
					<Button primary buttonText="SIGN IN" onClick={this.signIn} />
				</div>
			</div>
		);
	}
}

export default Home;
