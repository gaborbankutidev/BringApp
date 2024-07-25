import fsExtra from "fs-extra";
import path from "path";

export function updateProjectName(directory: string, projectName: string) {
	const packageJsonPath = path.join(directory, "package.json");
	const composerJsonPath = path.join(directory, "composer.json");
	const packageJson = fsExtra.readJsonSync(packageJsonPath);
	const composerJson = fsExtra.readJsonSync(composerJsonPath);

	packageJson.name = projectName;
	composerJson.name = projectName;

	fsExtra.writeJsonSync(packageJsonPath, packageJson, {spaces: 2});
	fsExtra.writeJsonSync(composerJsonPath, composerJson, {spaces: 2});
}
