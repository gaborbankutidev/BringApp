import fsExtra from "fs-extra"
import path from "path"
import { kebabCase } from "./utils"

export function updateProjectName(directory: string, projectName: string) {
	const packageJsonPath = path.join(directory, "package.json")
	const composerJsonPath = path.join(directory, "composer.json")
	const packageJson = fsExtra.readJsonSync(packageJsonPath)
	const composerJson = fsExtra.readJsonSync(composerJsonPath)

	packageJson.name = kebabCase(projectName)
	composerJson.name = `${kebabCase(projectName)}/plugin`

	fsExtra.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 })
	fsExtra.writeJsonSync(composerJsonPath, composerJson, { spaces: 2 })

	// Update wordpress plugin name
	updatePluginName(directory, projectName)
}

function updatePluginName(directory: string, projectName: string) {
	// Define the initial and updated plugin names
	const initialPluginName = "Plugin Name:       Bring App"
	const updatedPluginName = `Plugin Name:       Bring App | ${projectName}`

	// Construct the plugin file path
	const pluginPath = path.join(directory, "plugins/bring-app/bring-app.php")

	try {
		// Read the plugin file content
		const pluginFileContent = fsExtra.readFileSync(pluginPath, { encoding: "utf-8" })

		// Replace the initial plugin name with the updated one
		const updatedContent = pluginFileContent.replace(initialPluginName, updatedPluginName)

		// Write the updated content back to the file
		fsExtra.writeFileSync(pluginPath, updatedContent)
	} catch (error) {
		// Handle any errors during file read/write operations
		console.error(`Failed to update plugin name in ${pluginPath}:`, error)
	}
}
