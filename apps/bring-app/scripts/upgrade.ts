import {execSync} from "child_process";
import fsExtra from "fs-extra";
import path from "path";

const CWD = process.cwd();
const SSH_URL = "git@github.com:gaborbankutidev/BringApp.git";

function updateComposer() {
	execSync("composer update bring/blocks-wp", {
		stdio: "inherit",
	});
}

function updateNext() {
	const nextPath = path.join(CWD, "next");

	execSync(`yarn up @bring/blocks-client @bring/blocks-editor`, {
		stdio: "inherit",
		cwd: nextPath,
	});
}

function addNewTheme() {
	const themeFolder = path.join(CWD, "/themes/bring-theme");
	const tempFolder = path.join(CWD, "/.temp");

	fsExtra.mkdirSync(tempFolder, {
		recursive: true,
	});

	execSync("git init", {
		stdio: "ignore",
		cwd: tempFolder,
	});

	execSync(`git remote add origin ${SSH_URL}`, {
		stdio: "inherit",
		cwd: tempFolder,
	});

	execSync("git sparse-checkout init --cone", {
		stdio: "inherit",
		cwd: tempFolder,
	});

	execSync("git sparse-checkout set apps/bring-app/themes/bring-theme", {
		stdio: "inherit",
		cwd: tempFolder,
	});

	execSync("git pull origin master", {
		stdio: "inherit",
		cwd: tempFolder,
	});

	fsExtra.copySync(
		path.join(tempFolder, "/apps/bring-app/themes/bring-theme"),
		themeFolder,
		{
			overwrite: true,
		},
	);
	fsExtra.removeSync(tempFolder);
}

function removeOldTheme() {
	const themeFolder = path.join(CWD, "/themes/bring-theme");
	fsExtra.removeSync(themeFolder);
}

function main() {
	removeOldTheme();
	addNewTheme();
	updateComposer();
	updateNext();
}

main();
