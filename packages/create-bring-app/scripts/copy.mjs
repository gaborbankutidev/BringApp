//@ts-check

import {copySync} from "fs-extra";

const templateDir = __dirname + "/../../apps/bring-app";
const cliTemplateDir = __dirname + "/../template";

/**
 * @param {string} path
 */
function copyTemplateFiles(path) {
	copySync(templateDir, path);
}

function main() {
	copyTemplateFiles("");

	console.log("Template copied successfully!");
}

main();
