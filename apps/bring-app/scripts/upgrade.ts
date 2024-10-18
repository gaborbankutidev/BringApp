import {execSync} from "child_process";
import fsExtra from "fs-extra";
import path from "path";

const CWD = process.cwd();
const GIT_URL = "https://github.com/gaborbankutidev/BringApp.git";

function updatePlugin() {
	const themeFolder = path.join(CWD, "plugins/bring-app");
	const tempSrcFolder = path.join(CWD, ".temp");
	const tempThemeFolder = path.join(
		tempSrcFolder,
		"apps/bring-app/plugins/bring-app",
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

	execSync("git sparse-checkout set apps/bring-app/plugins/bring-app", {
		stdio: "inherit",
		cwd: tempSrcFolder,
	});

	execSync("git pull origin main", {
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

	execSync(`yarn up "*"`, {
		stdio: "inherit",
		cwd: nextPath,
	});
}

function main() {
	updatePlugin();
	updateComposer();
	updateNext();
}

main();
