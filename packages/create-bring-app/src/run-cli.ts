import {execSync} from "child_process";
import fsExtra from "fs-extra";
import {CLIConfig} from "./config";
import {sshUrl} from "./constants";
import {removeComposerRepositories} from "./remove-composer-repositories";
import {updatePackageVersions} from "./update-package-versions";
import {updateProjectName} from "./update-project-name";

function copyTemplateFiles(path: string) {
	execSync(`git clone ${sshUrl} ./${path}/.temp`, {
		stdio: "inherit",
	});
	fsExtra.copySync(`./${path}/.temp/apps/bring-app`, `./${path}`);
	fsExtra.removeSync(`./${path}/.temp`);
}

function removeComposerLockFile(path: string) {
	fsExtra.removeSync(`${path}/composer.lock`);
}

export async function runCLI(config: CLIConfig) {
	console.log();
	console.log(`Creating a new Bring app in ${config.directory}`);
	console.log();

	if (config.overwrite) {
		fsExtra.removeSync(config.directory);
		console.log(`Removing the directory ${config.directory}...`);
	}

	copyTemplateFiles(config.directory);

	updatePackageVersions(config.directory);

	updateProjectName(config.directory, config.projectName);

	removeComposerRepositories(config.directory);

	removeComposerLockFile(config.directory);

	if (config.runInstall) {
		console.log(`Running yarn install...`);

		execSync(`yarn install`, {
			cwd: config.directory,
			stdio: "inherit",
		});
	}

	if (config.initGit) {
		console.log("Initializing git repository...");

		execSync("git init", {
			cwd: config.directory,
			stdio: "ignore",
		});
		execSync("git add .", {
			cwd: config.directory,
			stdio: "ignore",
		});
		execSync('git commit -m "Initial commit"', {
			cwd: config.directory,
			stdio: "ignore",
		});
	}

	console.log();
	console.log("Done!");
	console.log();

	console.log("To get started, run the following commands:");
	console.log(`  cd ${config.directory}`);
	!config.runInstall && console.log(`  yarn install`);
	console.log(`  yarn dev`);
}
