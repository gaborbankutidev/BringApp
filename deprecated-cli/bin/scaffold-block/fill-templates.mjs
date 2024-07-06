// @ts-check

/**
 * @param {import("../types.mjs").FileContentWithName} rawFileContentWithName
 * @param {[string, string][]} replacePatterns
 * @returns {import("../types.mjs").FileContentWithName}
 */
function fillTemplate(rawFileContentWithName, replacePatterns) {
	let filledName = rawFileContentWithName.name;
	let filledContent = rawFileContentWithName.content;

	for (const replacePattern of replacePatterns) {
		filledName = filledName.split(replacePattern[0]).join(replacePattern[1]);
		filledContent = filledContent
			.split(replacePattern[0])
			.join(replacePattern[1]);
	}

	return {
		name: filledName.toLowerCase(),
		content: filledContent,
	};
}

/**
 * @param {import("../types.mjs").FileContentWithName[]} rawFileContentsWithNames
 * @param {[string, string][]} replacePatterns
 * @returns {import("../types.mjs").FileContentWithName[]}
 */
export function fillTemplates(rawFileContentsWithNames, replacePatterns) {
	return rawFileContentsWithNames.map((rawFileContentWithName) =>
		fillTemplate(rawFileContentWithName, replacePatterns),
	);
}
