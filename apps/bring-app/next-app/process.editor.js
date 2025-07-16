// Mock process.env for WordPress editor
export const process = {
	env: {
		NODE_ENV: "development",
		NEXT_PUBLIC_WP_BASE_URL: "http://localhost:8080",
	},
}
