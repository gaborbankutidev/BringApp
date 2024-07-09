// @ts-check

import {safeReadFileSync} from "../lib/safe-read-file-sync.mjs";

/**
 * @param {string} templatesRootFolder
 * @param {string} templateName
 * @returns {{fileContentWithName: import("../types.mjs").FileContentWithName, success:true}|{success:false}}
 */
function readTemplate(templatesRootFolder, templateName) {
	const safeReadResult = safeReadFileSync(
		`${templatesRootFolder}/templates/${templateName}`,
	);
	if (!safeReadResult.success) return {success: false};
	return {
		fileContentWithName: {
			content: safeReadResult.fileContent,
			name: templateName,
		},
		success: true,
	};
}

/**
 * @param {string} templatesRootFolder
 * @param {string[]} templateNames
 * @returns {{rawFileContentsWithNames: import("../types.mjs").FileContentWithName[];success: true}|{success: false}}
 */
export function readTemplates(templatesRootFolder, templateNames) {
	/** @type {import("../types.mjs").FileContentWithName[]} */
	const rawFileContentsWithNames = [];

	for (const templateName of templateNames) {
		const readTemplateResult = readTemplate(templatesRootFolder, templateName);
		if (!readTemplateResult.success) {
			return {
				success: false,
			};
		}
		rawFileContentsWithNames.push(readTemplateResult.fileContentWithName);
	}

	return {
		rawFileContentsWithNames,
		success: true,
	};
}
