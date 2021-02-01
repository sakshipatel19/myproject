const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpack = require("./webpack.config.base");

module.exports = merge(baseWebpack, {
	mode: "development",
	devtool: "inline-source-map",
	devServer: {
		port: 3000,
		open: true,
		proxy: {
			"/api": "http://localhost:8080"
		},
		historyApiFallback: true
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env.APP_ENV": JSON.stringify("development"),
			"process.env.AUTH0_DOMAIN": JSON.stringify("gskcomint.auth0.com"),
			"process.env.AUTH0_AUDIENCE": JSON.stringify(
				"https://gskcomint.auth0.com/api/v2/"
			),
			"process.env.AUTH0_CLIENT_ID": JSON.stringify(
				"NJkqJZAjM8F4pEQl8PAyyn8qn0LKHRTm"
			),
			"process.env.AUTH0_REDIRECT_URI": JSON.stringify(
				"http://localhost:3000/callback"
			),
			"process.env.AUTH0_LOGOUT_URI": JSON.stringify("http://localhost:3000"),
			"process.env.AUTH0_RESPONSE_TYPE": JSON.stringify("token id_token"),
			"process.env.AUTH0_SCOPE": JSON.stringify("openid profile"),
			"process.env.MICROSERVICE_URL": JSON.stringify("http://localhost:3000"),
			"process.env.CLIENT_ID": JSON.stringify("gsk"),
			"process.env.CLIENT_LOGO": JSON.stringify(
				"https://images.commerceintelligence.ai/gsk/company-logo/logo.svg"
			),
			"process.env.SCRAPING_START_DATE": JSON.stringify("2020-03-19")
		})
	]
});
