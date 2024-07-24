import fsExtra from "fs-extra";
import path from "path";

const bringBlocksEditorPackageJsonPath = path.join(
	__dirname,
	"../../../blocks-editor/package.json",
);
const bringBlocksClientPackageJsonPath = path.join(
	__dirname,
	"../../../blocks-client/package.json",
);
const bringBlocksWpComposerJsonPath = path.join(__dirname, "../../../blocks-wp/composer.json");

export type PackageVersions = {
	bringBlocksClient: string;
	bringBlocksEditor: string;
	bringBlocksWp: string;
};

export function getPackageVersions(): PackageVersions {
	const bringBlocksClientPackageJson = fsExtra.readJsonSync(bringBlocksEditorPackageJsonPath);
	const bringBlocksEditorPackageJson = fsExtra.readJsonSync(bringBlocksClientPackageJsonPath);
	const bringBlocksWpComposerJson = fsExtra.readJsonSync(bringBlocksWpComposerJsonPath);

	return {
		bringBlocksClient: bringBlocksClientPackageJson.version as string,
		bringBlocksEditor: bringBlocksEditorPackageJson.version as string,
		bringBlocksWp: bringBlocksWpComposerJson.version as string,
	};
}
