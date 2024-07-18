//@ts-check

import fsExtra from "fs-extra";
import path from "path";
import {fileURLToPath} from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const templateDir = path.join(__dirname, "../../../apps/bring-app");
const cliTemplateDir = path.join(__dirname, "../template");

function copyTemplateFiles() {
	fsExtra.copySync(templateDir, cliTemplateDir);
}

const dirsToRemove = [
	".turbo",
	"bring-theme/vendor",
	"bring-theme/build",
	"next/.next",
	"next/node_modules",
	"next/.turbo",
	"next/buils",
	"node_modules",
	".vscode",
	"tsconfig.tsbuildinfo",
	".config",
];

function removeFiles() {
	dirsToRemove.forEach((dir) => {
		console.log("Removing: ", path.join(cliTemplateDir, dir));
		fsExtra.removeSync(path.join(cliTemplateDir, dir));
	});
}

function main() {
	fsExtra.emptyDirSync(cliTemplateDir);
	console.log("Template directory cleared successfully!");

	copyTemplateFiles();
	console.log("Template copied successfully!");

	fsExtra.copySync(`${templateDir}/.config`, cliTemplateDir);

	removeFiles();
	console.log("Unnecessary files removed successfully!");
}

main();
