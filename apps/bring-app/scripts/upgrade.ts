import { confirm } from "@inquirer/prompts"
import { execSync } from "child_process"
import fsExtra from "fs-extra"
import path from "path"

const CWD = process.cwd()
const GIT_URL = "https://github.com/gaborbankutidev/BringApp.git"

class PluginThemeUpdater {
	async userConfirmation() {
		return await confirm({
			message:
				"This will remove the current plugin & theme folders and download the latest available versions. All customizations will be lost. Are you sure you want to continue?",
			default: false,
		})
	}

	getPluginName() {
		const pluginFile = path.join(CWD, "plugins/bring-app/bring-app.php")

		if (!fsExtra.existsSync(pluginFile)) {
			console.error("Plugin main file not found! Defaulting to the original name.")
			return null
		}

		const content = fsExtra.readFileSync(pluginFile, "utf8")
		const match = content.match(/^(\s*\* Plugin Name:\s*)(.+)$/m)
		return match ? match[2].trim() : null
	}

	setPluginName(pluginName) {
		const pluginFile = path.join(CWD, "plugins/bring-app/bring-app.php")

		if (!fsExtra.existsSync(pluginFile)) {
			console.error("Plugin main file not found! Skipping plugin name update.")
			return
		}

		let content = fsExtra.readFileSync(pluginFile, "utf8")
		const updatedContent = content.replace(/^(\s*\* Plugin Name:\s*).+$/m, `$1${pluginName}`)
		fsExtra.writeFileSync(pluginFile, updatedContent, "utf8")
	}

	updatePluginAndTheme() {
		const pluginFolder = path.join(CWD, "plugins/bring-app")
		const themeFolder = path.join(CWD, "themes/bring-app-theme")
		const tempSrcFolder = path.join(CWD, ".temp")
		const tempPluginFolder = path.join(tempSrcFolder, "apps/bring-app/plugins/bring-app")
		const tempThemeFolder = path.join(tempSrcFolder, "apps/bring-app/themes/bring-app-theme")

		if (fsExtra.existsSync(tempSrcFolder)) {
			fsExtra.removeSync(tempSrcFolder)
		}

		fsExtra.mkdirSync(tempSrcFolder, {
			recursive: true,
		})

		execSync("git init", {
			stdio: "ignore",
			cwd: tempSrcFolder,
		})

		execSync(`git remote add origin ${GIT_URL}`, {
			stdio: "inherit",
			cwd: tempSrcFolder,
		})

		execSync(`git remote set-url origin ${GIT_URL}`, {
			stdio: "inherit",
			cwd: tempSrcFolder,
		})

		execSync("git sparse-checkout init --cone", {
			stdio: "inherit",
			cwd: tempSrcFolder,
		})

		execSync(
			"git sparse-checkout set apps/bring-app/plugins/bring-app apps/bring-app/themes/bring-app-theme",
			{
				stdio: "inherit",
				cwd: tempSrcFolder,
			}
		)

		execSync("git pull origin main", {
			stdio: "inherit",
			cwd: tempSrcFolder,
		})

		const envFilePath = path.join(pluginFolder, ".env")
		const tempEnvFilePath = path.join(tempPluginFolder, ".env")

		if (fsExtra.existsSync(envFilePath)) {
			fsExtra.moveSync(envFilePath, tempEnvFilePath, { overwrite: true })
		}

		fsExtra.removeSync(pluginFolder)
		fsExtra.removeSync(themeFolder)

		fsExtra.copySync(tempPluginFolder, pluginFolder, {
			overwrite: true,
		})
		fsExtra.copySync(tempThemeFolder, themeFolder, {
			overwrite: true,
		})

		fsExtra.removeSync(tempSrcFolder)
	}

	updateComposer() {
		execSync("composer update", {
			stdio: "inherit",
		})
	}

	updateNext() {
		const nextPath = path.join(CWD, "next-app")

		execSync(`yarn up "*"`, {
			stdio: "inherit",
			cwd: nextPath,
		})
	}

	updateBringComposer() {
		execSync("composer update bring/blocks-wp", {
			stdio: "inherit",
		})
	}

	updateBringNext() {
		const nextPath = path.join(CWD, "next-app")

		execSync(`yarn up @bring/blocks-client @bring/blocks-editor`, {
			stdio: "inherit",
			cwd: nextPath,
		})
	}

	async run() {
		if (!(await this.userConfirmation())) return

		const pluginName = this.getPluginName()

		this.updatePluginAndTheme()
		this.updateComposer()
		this.updateNext()

		if (pluginName) {
			this.setPluginName(pluginName)
		}
	}

	async runBring() {
		if (!(await this.userConfirmation())) return

		const pluginName = this.getPluginName()

		this.updatePluginAndTheme()
		this.updateBringComposer()
		this.updateBringNext()

		if (pluginName) {
			this.setPluginName(pluginName)
		}
	}
}

const updater = new PluginThemeUpdater()
const task = process.argv[2]

if (task === "bring") {
	updater.runBring()
} else {
	updater.run()
}
