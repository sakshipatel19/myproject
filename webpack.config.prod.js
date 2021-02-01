const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpack = require("./webpack.config.base");

module.exports = merge(baseWebpack, {
	mode: "production",
	devtool: "source-map",
	plugins: [
		new webpack.DefinePlugin({
			"process.env.APP_ENV": JSON.stringify(process.env.APP_ENV),
			"process.env.AUTH0_DOMAIN": JSON.stringify(process.env.AUTH0_DOMAIN),
			"process.env.AUTH0_AUDIENCE": JSON.stringify(process.env.AUTH0_AUDIENCE),
			"process.env.AUTH0_CLIENT_ID": JSON.stringify(
				process.env.AUTH0_CLIENT_ID
			),
			"process.env.AUTH0_REDIRECT_URI": JSON.stringify(
				process.env.AUTH0_REDIRECT_URI
			),
			"process.env.AUTH0_LOGOUT_URI": JSON.stringify(
				process.env.AUTH0_LOGOUT_URI
			),
			"process.env.AUTH0_RESPONSE_TYPE": JSON.stringify(
				process.env.AUTH0_RESPONSE_TYPE
			),
			"process.env.AUTH0_SCOPE": JSON.stringify(process.env.AUTH0_SCOPE),
			"process.env.MICROSERVICE_URL": JSON.stringify(
				process.env.MICROSERVICE_URL
			),
			"process.env.CLIENT_ID": JSON.stringify(process.env.CLIENT_ID),
			"process.env.CLIENT_LOGO": JSON.stringify(process.env.CLIENT_LOGO),
			"process.env.SCRAPING_START_DATE": JSON.stringify(
				process.env.SCRAPING_START_DATE
			)
		})
	]
});
