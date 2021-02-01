const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const outputDirectory = "build";

module.exports = {
	entry: ["babel-polyfill", "./client/index.js"],
	output: {
		path: path.join(__dirname, outputDirectory),
		filename: "bundle.js",
		publicPath: "/"
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					"style-loader",
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader"
				]
			},
			{
				test: /\.(jpe?g|png|gif)$/,
				use: [
					{
						/* inline if smaller than 10 KB, otherwise load as a file */
						loader: "url-loader",
						options: {
							limit: 10000
						}
					}
				]
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2?|otf)$/,
				use: "file-loader"
			}
		]
	},
	resolve: {
		extensions: ["*", ".js", ".jsx", ".json"]
	},
	plugins: [
		new CleanWebpackPlugin([outputDirectory]),
		new HtmlWebpackPlugin({
			template: "./public/index.html",
			favicon: "./public/Commerce-Intelligence.ico"
		})
	]
};
