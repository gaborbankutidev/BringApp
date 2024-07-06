// @ts-check

import {safeReadFileSync} from "../lib/safe-read-file-sync.mjs";
import {writeFileSync} from "fs";
import _ from "lodash";

/**
 * @param {string} componentName
 * @param {import("../types.mjs").Config} config
 * @returns {boolean}
 */
export function updateIndexFiles(componentName, config) {
	const componentIndexFile = safeReadFileSync(config.componentsIndexPath);
	if (!componentIndexFile.success) {
		return false;
	}
	const clientFile = safeReadFileSync(config.clientPath);
	if (!clientFile.success) {
		return false;
	}
	const indexFile = safeReadFileSync(config.indexPath);
	if (!indexFile.success) {
		return false;
	}

	writeFileSync(
		config.componentsIndexPath,
		`${componentIndexFile.fileContent}export * from "./${_.kebabCase(
			componentName,
		)}";\n`,
	);

	writeFileSync(
		config.clientPath,
		clientFile.fileContent
			.split("// import-marker")
			.join(`${_.camelCase(componentName)},\n\t// import-marker`)
			.split("// list-marker")
			.join(`${_.camelCase(componentName)},\n\t// list-marker`),
	);

	writeFileSync(
		config.indexPath,
		indexFile.fileContent
			.split("// import-marker")
			.join(`${_.camelCase(componentName)}Config,\n\t// import-marker`)
			.split("// list-marker")
			.join(`${_.camelCase(componentName)}Config,\n\t// list-marker`),
	);
	return true;
}
