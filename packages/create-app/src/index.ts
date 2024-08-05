#!/usr/bin/env node

import {confirm, input} from "@inquirer/prompts";
import fsExtra from "fs-extra";
import kebabCase from "lodash.kebabcase";
import {runCLI} from "./run-cli";

async function main() {
	console.log("Welcome to the Bring App Creator!");

	const projectName = await input({
		message: "What should be the name of your project?",
		default: "My Bring App",
		required: true,
	});

	const projectSlug = kebabCase(
		await input({
			message: "What should be the name of the project folder?",
			default: kebabCase(projectName),
			required: true,
		}),
	);

	let overwrite = false;

	if (fsExtra.existsSync(projectSlug)) {
		console.log(`The folder ${projectSlug} already exists`);

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
		message: "Do you want to run the install command?",
		default: true,
	});

	const initGit = await confirm({
		message: "Do you want to initialize git for the project?",
		default: true,
	});

	runCLI({
		projectName,
		projectSlug,
		overwrite,
		runInstall,
		initGit,
	});
}

main();
