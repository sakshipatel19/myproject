const express = require("express");
const path = require("path");
const axios = require("axios");
const http = require("http");
const bodyParser = require("body-parser");
const compression = require("compression");
const registerRoutes = require("./server/registerRoutes");
const { endpoints: actual_endpoints } = require("./server/endpoints");
const { requestHeaders, SVC_ENDPOINT } = require("./server/common");

const app = express();

// compress all responses
app.use(compression());

app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "build")));

app.get(
	"/api/contentanalysis/analysis/navigation/countryMarkets",
	(req, res) => {
		axios
			.get(
				`${SVC_ENDPOINT}${actual_endpoints.fetchCountryMarketsListUrl}`,
				requestHeaders(req.headers.authorization)
			)
			.then(response => {
				res.json(response.data);
			})
			.catch(err => {
				console.log(JSON.stringify(err));
				console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
				res.status(err.response.status).json(err.response.data);
			})
			.catch(err => {
				console.log(JSON.stringify(err));
				console.log("===================================");
				res.status(500).json(err);
			});
	}
);

app.get("/api/list/marketPlaces/:countryCode", (req, res) => {
	axios
		.get(`${actual_endpoints.marketPlacesListUrl}/${req.params.countryCode}`)
		.then(response => {
			res.json(response.data);
		});
});

// Register all the routes
registerRoutes(app);

app.get("/*", function(req, res) {
	console.log(req);
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

http
	.createServer(
		// {
		// 	key: fs.readFileSync("server.key"),
		// 	cert: fs.readFileSync("server.cert")
		// },
		app
	)
	.listen(8080, function() {
		console.log(`Listening on port ${process.env.PORT || 8080}!`);
	});
