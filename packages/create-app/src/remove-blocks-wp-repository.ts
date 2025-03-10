import fsExtra from "fs-extra"
import path from "path"

export function removeBlocksWpRepository(folder: string) {
	const composerJsonPath = path.join(folder, "composer.json")
	const composerJson = fsExtra.readJsonSync(composerJsonPath)

	const filteredRepositories = composerJson.repositories.filter((repo: any) => {
		return !repo.url.includes("packages/blocks-wp")
	})

	composerJson.repositories = filteredRepositories

	fsExtra.writeJsonSync(composerJsonPath, composerJson, { spaces: 2 })
}
