import {execSync} from "child_process";
import fsExtra from "fs-extra";
import path from "path";

const CWD = process.cwd();
const GIT_URL = "https://github.com/gaborbankutidev/BringApp.git";

function updateTheme() {
	const themeFolder = path.join(CWD, "themes/bring-theme");
	const tempSrcFolder = path.join(CWD, ".temp");
	const tempThemeFolder = path.join(
		tempSrcFolder,
		"apps/bring-app/themes/bring-theme",
	);

	if (fsExtra.existsSync(tempSrcFolder)) {
		fsExtra.removeSync(tempSrcFolder);
	}

	fsExtra.mkdirSync(tempSrcFolder, {
		recursive: true,
	});

	execSync("git init", {
		stdio: "ignore",
		cwd: tempSrcFolder,
	});

	execSync(`git remote add origin ${GIT_URL}`, {
		stdio: "inherit",
		cwd: tempSrcFolder,
	});

	execSync(`git remote set-url origin ${GIT_URL}`, {
		stdio: "inherit",
		cwd: tempSrcFolder,
	});

	execSync("git sparse-checkout init --cone", {
		stdio: "inherit",
		cwd: tempSrcFolder,
	});

	execSync("git sparse-checkout set apps/bring-app/themes/bring-theme", {
		stdio: "inherit",
		cwd: tempSrcFolder,
	});

	execSync("git pull origin master", {
		stdio: "inherit",
		cwd: tempSrcFolder,
	});

	const envFilePath = path.join(themeFolder, ".env");
	const tempEnvFilePath = path.join(tempThemeFolder, ".env");

	if (fsExtra.existsSync(envFilePath)) {
		fsExtra.moveSync(envFilePath, tempEnvFilePath, {overwrite: true});
	}

	fsExtra.removeSync(themeFolder);

	fsExtra.copySync(tempThemeFolder, themeFolder, {
		overwrite: true,
	});

	fsExtra.removeSync(tempSrcFolder);
}

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

function main() {
	updateTheme();
	updateComposer();
	updateNext();
}

main();
