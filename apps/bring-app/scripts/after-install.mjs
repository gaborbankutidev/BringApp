import { execSync } from "child_process"

if (process.env.SKIP_COMPOSER_INSTALL) {
	process.exit(0)
}
execSync("composer install", { stdio: "inherit" })
