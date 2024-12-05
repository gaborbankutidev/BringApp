import { execSync } from "child_process"

execSync("yarn prepare")

if (process.env.SKIP_COMPOSER_INSTALL) {
	process.exit(0)
}

execSync("yarn install:composer:pkg", { stdio: "inherit" })
execSync("yarn install:composer:app", { stdio: "inherit" })
