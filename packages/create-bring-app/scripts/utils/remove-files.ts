import fsExtra from "fs-extra";
import path from "path";
import {cliTemplateDir} from "../constants";

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

export function removeFiles() {
	dirsToRemove.forEach((dir) => {
		console.log("Removing: ", path.join(cliTemplateDir, dir));
		fsExtra.removeSync(path.join(cliTemplateDir, dir));
	});
}
