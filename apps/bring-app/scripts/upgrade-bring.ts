import {execSync} from "child_process";
import path from "path";
import {updatePluginAndTheme} from "./upgrade";

const CWD = process.cwd();

function updateBringComposer() {
	execSync("composer update bring/blocks-wp", {
		stdio: "inherit",
	});
}

function updateBringNext() {
	const nextPath = path.join(CWD, "next");

	execSync(`yarn up @bring/blocks-client @bring/blocks-editor`, {
		stdio: "inherit",
		cwd: nextPath,
	});
}

function main() {
	updatePluginAndTheme();
	updateBringComposer();
	updateBringNext();
}

main();
