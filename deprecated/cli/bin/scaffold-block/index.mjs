// @ts-check
import path from "path";
import {existsSync, writeFileSync} from "fs";
import _ from "lodash";

import {errmsg, infomsg, successmsg} from "../lib/chalk.mjs";
import {readTemplates} from "./read-templates.mjs";
import {fillTemplates} from "./fill-templates.mjs";
import {writeTemplates} from "./write-templates.mjs";
import {updateIndexFiles} from "./update-index-files.mjs";

/** @type {string[]} */
const templateNames = [
	"{{component-name-kebab}}-config.{{tsx}}",
	"{{component-name-kebab}}.{{tsx}}",
	"index.{{ts}}",
];

const templatesRootFolder = path.normalize(path.join(process.argv[1], "../.."));

/**
 * @param {string} componentName
 * @returns {[string, string][]}
 */
function createReplacePatterns(componentName) {
	return [
		["{{component-name}}", componentName],
		["{{component-name-lower}}", componentName.toLowerCase()],
		["{{component-name-kebab}}", _.kebabCase(componentName)],
		["{{component-name-camel}}", _.camelCase(componentName)],
		["{{tsx}}", "tsx"],
		["{{ts}}", "ts"],
	];
}

/**
 * @param {string[]} args
 * @param {import("../types.mjs").Config} config
 */
export function scaffoldBlock(args, config) {
	if (args.length < 1) {
		errmsg("`componentName` is not provided!");
		return;
	}
	const componentName = args[0];

	if (
		existsSync(
			path.join(config.componentsFolderPath, _.kebabCase(componentName)),
		)
	) {
		errmsg(`\`${componentName}\` already exists!`);
		return;
	}
	infomsg(`Generating \`${componentName}\`...`);

	const readTemplatesResult = readTemplates(templatesRootFolder, templateNames);
	if (!readTemplatesResult.success) {
		errmsg("Reading template files failed!");
		return;
	}
	const filledFileContentsWithNames = fillTemplates(
		readTemplatesResult.rawFileContentsWithNames,
		createReplacePatterns(componentName),
	);
	writeTemplates(
		componentName,
		filledFileContentsWithNames,
		config.componentsFolderPath,
	);
	updateIndexFiles(componentName, config);
	successmsg(`\`${componentName}\` successfully generated!`);
}
