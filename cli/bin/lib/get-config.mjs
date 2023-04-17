// @ts-check

import {safeReadFileSync} from "./safe-read-file-sync.mjs";

/**
 * @returns {{userConfig: any, success:true}|{success:false}}
 */
export function readUserConfig() {
	const readFileResult = safeReadFileSync("cli.config.json");
	if (readFileResult.success) {
		return {success: true, userConfig: JSON.parse(readFileResult.fileContent)};
	}
	return {success: false};
}

/**
 * @returns {import("../types.mjs").Config}
 */
export function getConfig() {
	const baseConfig = {
		componentsFolderPath: "./src/components/",
		clientPath: "./src/client.tsx",
		componentsIndexPath: "./src/components/index.ts",
		indexPath: "./src/index.ts",
	};
	const maybeUserConfig = readUserConfig();
	if (!maybeUserConfig.success) {
		return baseConfig;
	}
	const userConfig = maybeUserConfig.userConfig;
	return {
		componentsFolderPath:
			userConfig.componentsFolderPath ?? baseConfig.componentsFolderPath,
		clientPath: userConfig.clientPath ?? baseConfig.clientPath,
		componentsIndexPath:
			userConfig.componentsIndexPath ?? baseConfig.componentsIndexPath,
		indexPath: userConfig.indexPath ?? baseConfig.indexPath,
	};
}
