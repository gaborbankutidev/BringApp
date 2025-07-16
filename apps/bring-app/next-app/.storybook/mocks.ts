import { mockSiteProps } from "../src/utils/mock-site-props"

export const getDynamicEntityProps = async () => {
	console.log("🎭 Mock getDynamicEntityProps called")
	return null
}

// Export other functions that might be imported from the server module
export const getDynamicEntityList = async () => {
	console.log("🎭 Mock getDynamicEntityList called")
	return []
}

// Mock function to replace getSiteProps
export const getSiteProps = async () => {
	return mockSiteProps
}
