// Mock process.env for WordPress editor
const process = {
	env: {
		NODE_ENV: "development",
		DATA_TOKEN: "very-secret-data-token",
		NEXT_PUBLIC_WP_BASE_URL: "http://localhost:8080",
	},
};

module.exports = process;
