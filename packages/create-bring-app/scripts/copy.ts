import fsExtra from "fs-extra";
import {cliTemplateDir, templateDir} from "./constants";
import {getPackageVersions} from "./utils/get-package-versions";
import {removeFiles} from "./utils/remove-files";
import {updatePackageVersions} from "./utils/update-package-versions";
import {updateProjectName} from "./utils/update-project-name";

function copyTemplateFiles() {
	fsExtra.copySync(templateDir, cliTemplateDir);
}

function main() {
	fsExtra.emptyDirSync(cliTemplateDir);
	console.log("Template directory cleared successfully!");

	copyTemplateFiles();
	console.log("Template copied successfully!");

	fsExtra.copySync(`${templateDir}/.config`, cliTemplateDir);

	removeFiles();
	console.log("Unnecessary files removed successfully!");

	const packageVersions = getPackageVersions();
	updatePackageVersions(packageVersions);
	console.log("Package versions updated successfully to:");
	console.log(`- @bring/blocks-client: ${packageVersions.bringBlocksClient}`);
	console.log(`- @bring/blocks-editor: ${packageVersions.bringBlocksEditor}`);
	console.log(`- bring/blocks-wp: ${packageVersions.bringBlocksWp}`);

	updateProjectName();
	console.log("Project name updated successfully!");

	console.log("Template copied successfully!");
}

main();
