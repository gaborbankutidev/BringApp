// Mock process.env for WordPress editor
const process = {
	env: {
		NODE_ENV: "development",
		NEXT_PUBLIC_WP_BASE_URL: "http://localhost:8080",
	},
}

module.exports = process
