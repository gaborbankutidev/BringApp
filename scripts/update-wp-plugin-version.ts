import { execSync } from "child_process"
import fs from "fs"

export const updateWpPluginVersion = (rootPath = "./") => {
	console.log("Updating WP plugin version")
	execSync("yarn changeset status --verbose --output=temp-changeset.json", { stdio: "inherit" })
	const data = JSON.parse(fs.readFileSync("temp-changeset.json", "utf8"))
	fs.unlinkSync("temp-changeset.json")
	fs.rm("temp-changeset.json", { force: true }, (err) => {
		if (err) {
			console.error(err)
		}
	})
	const release = data.releases.find((release: any) => release.name === "bring-app-plugin")
	if (!release) {
		console.log("No release found for bring-app")
		return
	}
	const newVersion = release.newVersion

	const composerJson = JSON.parse(fs.readFileSync(`${rootPath}composer.json`, "utf8"))
	composerJson.version = newVersion
	fs.writeFileSync(`${rootPath}composer.json`, JSON.stringify(composerJson, null, 2))

	const bringAppPhp = fs.readFileSync(`${rootPath}plugins/bring-app/bring-app.php`, "utf8")
	const updatedBringAppPhp = bringAppPhp
		.replace(/^(\s*\* Version:\s*).+$/m, `$1${newVersion}`)
		.replace(/^(\s*define\("BRING_APP_VERSION",\s*").+("\);)$/m, `$1${newVersion}$2`)

	fs.writeFileSync(`${rootPath}plugins/bring-app/bring-app.php`, updatedBringAppPhp)

	console.log("WP plugin version updated")
}
