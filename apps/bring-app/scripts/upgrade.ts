import {execSync} from "child_process";
import fsExtra from "fs-extra";
import path from "path";

const CWD = process.cwd();
const GIT_URL = "https://github.com/gaborbankutidev/BringApp.git";

export function updatePluginAndTheme() {
	const pluginFolder = path.join(CWD, "plugins/bring-app");
	const themeFolder = path.join(CWD, "themes/bring-app-theme");
	const tempSrcFolder = path.join(CWD, ".temp");
	const tempPluginFolder = path.join(
		tempSrcFolder,
		"apps/bring-app/plugins/bring-app",
	);
	const tempThemeFolder = path.join(
		tempSrcFolder,
		"apps/bring-app/themes/bring-app-theme",
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

	execSync(
		"git sparse-checkout set apps/bring-app/plugins/bring-app apps/themes/bring-app-theme",
		{
			stdio: "inherit",
			cwd: tempSrcFolder,
		},
	);

	execSync("git pull origin main", {
		stdio: "inherit",
		cwd: tempSrcFolder,
	});

	const envFilePath = path.join(pluginFolder, ".env");
	const tempEnvFilePath = path.join(tempPluginFolder, ".env");

	if (fsExtra.existsSync(envFilePath)) {
		fsExtra.moveSync(envFilePath, tempEnvFilePath, {overwrite: true});
	}

	fsExtra.removeSync(pluginFolder);
	fsExtra.removeSync(themeFolder);

	fsExtra.copySync(tempPluginFolder, pluginFolder, {
		overwrite: true,
	});
	fsExtra.copySync(tempThemeFolder, themeFolder, {
		overwrite: true,
	});

	fsExtra.removeSync(tempSrcFolder);
}

function updateComposer() {
	execSync("composer update", {
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
	updatePluginAndTheme();
	updateComposer();
	updateNext();
}

main();
