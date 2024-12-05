import { execSync } from "child_process"
import fsExtra from "fs-extra"
import type { CLIConfig } from "./config"
import { GIT_URL } from "./constants"
import { removeComposerRepositories } from "./remove-composer-repositories"
import { updatePackageVersions } from "./update-package-versions"
import { updateProjectName } from "./update-project-name"

function copyTemplateFiles(path: string) {
	const tempFolder = `./${path}/.temp`

	fsExtra.mkdirSync(tempFolder, {
		recursive: true,
	})

	execSync("git init", {
		stdio: "ignore",
		cwd: tempFolder,
	})

	execSync(`git remote add origin ${GIT_URL}`, {
		stdio: "ignore",
		cwd: tempFolder,
	})

	execSync(`git remote set-url origin ${GIT_URL}`, {
		stdio: "ignore",
		cwd: tempFolder,
	})

	execSync("git sparse-checkout init --cone", {
		stdio: "ignore",
		cwd: tempFolder,
	})

	execSync("git sparse-checkout set apps/bring-app", {
		stdio: "ignore",
		cwd: tempFolder,
	})

	execSync("git pull origin main", {
		stdio: "inherit",
		cwd: tempFolder,
	})

	fsExtra.copySync(`${tempFolder}/apps/bring-app`, `./${path}`)
	fsExtra.removeSync(tempFolder)
}

function removeComposerLockFile(path: string) {
	fsExtra.removeSync(`${path}/composer.lock`)
}

export async function runCLI(config: CLIConfig) {
	console.log()
	console.log(`Creating ${config.projectName} in ${config.projectSlug}`)

	if (config.overwrite) {
		fsExtra.removeSync(config.projectSlug)
		console.log()
		console.log(`Removing folder ${config.projectSlug}...`)
	}

	copyTemplateFiles(config.projectSlug)

	updatePackageVersions(config.projectSlug)

	updateProjectName(config.projectSlug, config.projectName)

	removeComposerRepositories(config.projectSlug)

	removeComposerLockFile(config.projectSlug)

	if (config.runInstall) {
		console.log()
		console.log(`Running yarn install...`)

		execSync(`yarn install`, {
			cwd: config.projectSlug,
			stdio: "inherit",
		})
	}

	if (config.initGit) {
		console.log()
		console.log("Initializing git repository...")

		execSync("git init", {
			cwd: config.projectSlug,
			stdio: "ignore",
		})
		execSync("git add .", {
			cwd: config.projectSlug,
			stdio: "ignore",
		})
		execSync('git commit -m "Initial commit"', {
			cwd: config.projectSlug,
			stdio: "ignore",
		})
		execSync("yarn prepare", {
			cwd: config.projectSlug,
			stdio: "ignore",
		})
	}

	console.log()
	console.log("Done!")
	console.log()

	console.log("Follow these steps to get started:")

	console.log()
	console.log(`1. Navigate to your project folder:`)
	console.log(`   cd ${config.projectSlug}`)

	console.log()
	console.log(`2. Set up the .env files in the following folders:`)
	console.log(`   - root`)
	console.log(`   - next-app`)
	console.log(`   - plugins/bring-app`)

	console.log()
	console.log("3. Run the following commands to set up and start your project:")

	if (!config.runInstall) {
		console.log(`   - Install dependencies:`)
		console.log(`     yarn install`)
	}

	console.log(`   - Start the backend services:`)
	console.log(`     yarn services:up`)

	console.log(`   - Launch the development server:`)
	console.log(`     yarn dev`)

	console.log()
	console.log("You're all set. Happy coding!")
}
