import {execSync} from "child_process";
import fsExtra from "fs-extra";
import {CLIConfig} from "./config";
import {templateDir} from "./constants";
import {updateProjectName} from "./update-project-name";

function copyTemplateFiles(path: string) {
	fsExtra.copySync(templateDir, path);
}

function removeDir(path: string) {
	fsExtra.removeSync(path);
}

export async function runCLI(config: CLIConfig) {
	console.log();
	console.log(`Creating a new Bring app in ${config.directory}`);
	console.log();

	if (config.overwrite) {
		removeDir(config.directory);
		console.log(`Removing the directory ${config.directory}...`);
	}

	copyTemplateFiles(config.directory);

	updateProjectName(config.directory, config.directory); // TODO: Add project name as a config option

	if (config.runInstall) {
		console.log(`Running ${config.packageManager} install...`);

		execSync(`${config.packageManager} install`, {
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
	}

	console.log();
	console.log("Done!");
	console.log();

	console.log("To get started, run the following commands:");
	console.log(`  cd ${config.directory}`);
	!config.runInstall && console.log(`  ${config.packageManager} install`);
	console.log(`  ${config.packageManager} dev`);
}
