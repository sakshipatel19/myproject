export const appEnv = process.env.APP_ENV;

export const authConfig = {
	domain: process.env.AUTH0_DOMAIN,
	audience: process.env.AUTH0_AUDIENCE,
	clientID: process.env.AUTH0_CLIENT_ID,
	redirectUri: process.env.AUTH0_REDIRECT_URI,
	returnAfterLogout: process.env.AUTH0_LOGOUT_URI,
	responseType: process.env.AUTH0_RESPONSE_TYPE,
	scope: process.env.AUTH0_SCOPE
};

export const microserviceUrl = process.env.MICROSERVICE_URL;

export const clientInfo = {
	clientID: process.env.CLIENT_ID,
	clientLogo: process.env.CLIENT_LOGO
};
