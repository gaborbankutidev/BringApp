import fsExtra from "fs-extra";
import path from "path";
import {cliTemplateDir} from "../constants";

export function updateProjectName() {
	const packageJsonPath = path.join(cliTemplateDir, "package.json");
	const composerJsonPath = path.join(cliTemplateDir, "composer.json");
	const packageJson = fsExtra.readJsonSync(packageJsonPath);
	const composerJson = fsExtra.readJsonSync(composerJsonPath);

	packageJson.name = "$APP_NAME$";
	composerJson.name = "$APP_NAME$";

	fsExtra.writeJsonSync(packageJsonPath, packageJson, {spaces: 2});
	fsExtra.writeJsonSync(composerJsonPath, composerJson, {spaces: 2});
}
