import fsExtra from "fs-extra";
import path from "path";

export function updatePackageVersions(folder: string) {
	const packageJsonPath = path.join(folder, "next/package.json");
	const composerJsonPath = path.join(folder, "composer.json");
	const packageJson = fsExtra.readJsonSync(packageJsonPath);
	const composerJson = fsExtra.readJsonSync(composerJsonPath);

	packageJson.dependencies["@bring/blocks-client"] = "latest";
	packageJson.dependencies["@bring/blocks-editor"] = "latest";
	composerJson.require["bring/blocks-wp"] = "latest";

	fsExtra.writeJsonSync(packageJsonPath, packageJson, {spaces: 2});
	fsExtra.writeJsonSync(composerJsonPath, composerJson, {spaces: 2});
}
