const sonarqubeScanner = require("sonarqube-scanner");
const projectVersion = "v1.0";
const sonarHost = "http://localhost:9000";
var options = {
	"sonar.projectKey": "comint_ui_new",
	"sonar.projectName": "Comint UI New",
	"sonar.projectVersion": projectVersion,
	"sonar.source": "client/components",
	"sonar.inclusions": "client/components/**/*.js",
	"sonar.test.inclusions": "client/components/**/test/*.js",
	"sonar.javascript.lcov.reportPaths": "coverage/lcov.info"
};

sonarqubeScanner(
	{
		serverUrl: sonarHost,
		options: options
	},
	() => {}
);
