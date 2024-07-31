import fsExtra from "fs-extra";
import path from "path";

export function removeComposerRepositories(folder: string) {
	const composerJsonPath = path.join(folder, "composer.json");
	const composerJson = fsExtra.readJsonSync(composerJsonPath);

	composerJson.repositories = undefined;

	fsExtra.writeJsonSync(composerJsonPath, composerJson, {spaces: 2});
}
