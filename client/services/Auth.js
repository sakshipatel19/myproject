import auth0 from "auth0-js";
import history from "../utils/history";

const authConfig = {
	domain: process.env.AUTH0_DOMAIN,
	audience: process.env.AUTH0_AUDIENCE,
	clientID: process.env.AUTH0_CLIENT_ID,
	redirectUri: process.env.AUTH0_REDIRECT_URI,
	returnAfterLogout: process.env.AUTH0_LOGOUT_URI,
	responseType: process.env.AUTH0_RESPONSE_TYPE,
	scope: process.env.AUTH0_SCOPE
};

class Auth {
	auth0 = new auth0.WebAuth(authConfig);

	login = () => {
		this.auth0.authorize();
	};

	// parses the result after authentication from URL hash
	handleAuthentication = callback => {
		this.auth0.parseHash((err, authResult) => {
			if (authResult && authResult.accessToken && authResult.idToken) {
				this.setSession(authResult);
			}
			callback(err);
		});
	};

	// Sets user details in localStorage
	setSession = authResult => {
		// Set the time that the access token will expire at
		let expiresAt = JSON.stringify(
			authResult.expiresIn * 1000 + new Date().getTime()
		);
		localStorage.setItem("access_token", authResult.accessToken);
		localStorage.setItem("id_token", authResult.idToken);
		localStorage.setItem("expires_at", expiresAt);
	};

	// removes user details from localStorage
	logout = () => {
		// Clear access token and ID token from local storage
		localStorage.removeItem("access_token");
		localStorage.removeItem("id_token");
		localStorage.removeItem("expires_at");
		sessionStorage.removeItem("appState");
		// navigate to the home route
		this.auth0.logout({
			returnTo: authConfig.returnAfterLogout,
			clientID: authConfig.clientID
		});
	};

	// checks if the user is authenticated
	isAuthenticated = () => {
		// Check whether the current time is past the
		// access token's expiry time
		let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
		return new Date().getTime() < expiresAt;
	};
}

const auth0Client = new Auth();

export default auth0Client;
