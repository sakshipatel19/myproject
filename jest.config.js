const path = require("path");

const IGNORED_COMPONENTS = [
	// "<rootDir>/client/components/PageContent/Availability/CatalogHealthDetail"
];

const TEST_FILES_REGEX = "client.*/components.*/test/.*.js$";

module.exports = {
	verbose: false,
	snapshotSerializers: ["enzyme-to-json/serializer"],
	setupFiles: ["<rootDir>/jest.setup.suites.js"],
	setupFilesAfterEnv: ["<rootDir>/jest.setup.tests.js"],
	moduleNameMapper: {
		"^.+\\.(css|less|scss|svg)$": "babel-jest"
	},
	collectCoverageFrom: ["client/components/**/*.js"],
	coverageDirectory: "coverage",
	coverageThreshold: {
		global: {
			branches: 0,
			functions: 0,
			lines: 0,
			statements: 0
		}
	},
	coverageReporters: ["lcov", "text"],
	coveragePathIgnorePatterns: [...IGNORED_COMPONENTS],
	testRegex: TEST_FILES_REGEX,
	testPathIgnorePatterns: [
		...IGNORED_COMPONENTS,
		"<rootDir>/build/",
		"<rootDir>/node_modules/"
	]
};
