import { execSync } from "child_process"

import { generateComposerAuthJson } from "./generate-composer-auth-json.mjs"

generateComposerAuthJson()

if (!process.env.SKIP_COMPOSER_INSTALL) {
	execSync("composer install", { stdio: "inherit" })
}
