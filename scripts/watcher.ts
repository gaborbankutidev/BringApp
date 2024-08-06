import {execSync} from "child_process";
import fs from "fs";
import fsExtra from "fs-extra";
import path from "path";

const CWD = process.cwd();

// watch folder packages/blocks-wp for changes
function watchBlocksWp() {
	const blocksWpPath = path.join(CWD, "packages/blocks-wp/src");

	fs.watch(blocksWpPath, {recursive: true}, (eventType, filename) => {
		console.log(eventType);
		if (filename) {
			console.log(`${filename} file Changed`);

			fsExtra.removeSync(path.join(CWD, "apps/bring-app/themes/bring-theme/vendor/bring"));

			execSync("composer install", {
				stdio: "inherit",
				cwd: path.join(CWD, "apps/bring-app"),
			});
		}
	});
}

watchBlocksWp();
