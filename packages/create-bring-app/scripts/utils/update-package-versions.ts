import fsExtra from "fs-extra";
import path from "path";
import {cliTemplateDir} from "../constants";
import type {PackageVersions} from "./get-package-versions";

export function updatePackageVersions(packageVersions: PackageVersions) {
	const packageJsonPath = path.join(cliTemplateDir, "next/package.json");
	const composerJsonPath = path.join(cliTemplateDir, "composer.json");
	const packageJson = fsExtra.readJsonSync(packageJsonPath);
	const composerJson = fsExtra.readJsonSync(composerJsonPath);

	packageJson.dependencies["@bring/blocks-client"] = packageVersions.bringBlocksClient;
	packageJson.dependencies["@bring/blocks-editor"] = packageVersions.bringBlocksEditor;
	composerJson.require["bring/blocks-wp"] = packageVersions.bringBlocksWp;

	fsExtra.writeJsonSync(packageJsonPath, packageJson, {spaces: 2});
	fsExtra.writeJsonSync(composerJsonPath, composerJson, {spaces: 2});
}
