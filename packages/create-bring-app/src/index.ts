#!/usr/bin/env node

import {input} from "@inquirer/prompts";
import {copySync} from "fs-extra";

const templateDir = __dirname + "/../template";

function copyTemplateFiles(path: string) {
	copySync(templateDir, path);
}

async function main() {
	const directory = await input({
		message: "What is the name of your app?",
		default: "my-bring-app",
		required: true,
	});

	copyTemplateFiles(directory);

	console.log(`Creating a new Bring app in ${directory}`);
}

main();
