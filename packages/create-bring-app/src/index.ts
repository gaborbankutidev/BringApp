#!/usr/bin/env node

import {confirm, input} from "@inquirer/prompts";
import fsExtra from "fs-extra";
import {getPkgManager} from "./get-package-manager";
import {runCLI} from "./run-cli";

async function main() {
	console.log("Welcome to the Bring app generator!");

	const packageManager = getPkgManager();
	console.log(`Detected package manager: ${packageManager}`);

	const directory = await input({
		message: "What is the name of your app?",
		default: "my-bring-app",
		required: true,
	});

	let overwrite = false;

	if (fsExtra.existsSync(directory)) {
		console.log(`The directory ${directory} already exists`);

		overwrite = await confirm({
			message: "Do you want to overwrite it?",
			default: false,
		});

		if (!overwrite) {
			console.log("Exiting...");
			return;
		}
	}

	const runInstall = await confirm({
		message: "Do you want to run the package manager install command?",
		default: true,
	});

	const initGit = await confirm({
		message: "Do you want to initialize a git repository?",
		default: true,
	});

	runCLI({
		directory,
		overwrite,
		runInstall,
		initGit,
		packageManager,
	});
}

main();
