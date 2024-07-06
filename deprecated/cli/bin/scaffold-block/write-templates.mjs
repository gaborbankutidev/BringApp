// @ts-check
import {mkdirSync, writeFileSync} from "fs";
import _ from "lodash";
import path from "path";

/**
 * @param {import("../types.mjs").FileContentWithName[]} filledFileContentsWithNames
 * @param {string} componentName
 * @param {string} componentsFolderPath
 */
export function writeTemplates(
	componentName,
	filledFileContentsWithNames,
	componentsFolderPath,
) {
	for (const filledFileContentWithName of filledFileContentsWithNames) {
		mkdirSync(path.join(componentsFolderPath, _.kebabCase(componentName)), {
			recursive: true,
		});
		writeFileSync(
			path.join(
				componentsFolderPath,
				`${_.kebabCase(componentName)}/${filledFileContentWithName.name}`,
			),
			filledFileContentWithName.content,
		);
	}
}
