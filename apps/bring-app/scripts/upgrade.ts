import {execSync} from "child_process";
import fsExtra from "fs-extra";
import path from "path";

const CWD = process.cwd();
const SSH_URL = "git@github.com:gaborbankutidev/BringBlocks.git";

function updateComposer() {
	execSync("composer update bring/blocks-wp", {
		stdio: "inherit",
	});
}

function updateNext() {
	const nextPath = path.join(CWD, "next");

	execSync(
		`cd ${nextPath} && yarn upgrade --latest @bring/blocks-client && yarn upgrade --latest @bring/blocks-editor`,
		{
			stdio: "inherit",
		},
	);
}

function updateTheme() {
	const themePath = path.join(CWD, "/themes/bring-theme");
	const tempPath = path.join(CWD, "/.temp");

	execSync(`git clone ${SSH_URL} ${tempPath}`, {
		stdio: "inherit",
	});
	fsExtra.copySync(
		path.join(tempPath, "/apps/bring-app/themes/bring-theme"),
		themePath,
		{
			overwrite: true,
		},
	);
	fsExtra.removeSync(tempPath);
}

function main() {
	updateComposer();
	updateNext();
	updateTheme();
}

main();
