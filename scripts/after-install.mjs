import { execSync } from "child_process"
import dotenv from "dotenv"
import path from "path"

import { generateComposerAuthJson } from "../apps/bring-app/scripts/generate-composer-auth-json.mjs"

execSync("yarn prepare")

dotenv.config({ path: path.resolve(process.cwd(), "apps/bring-app/.env") })

generateComposerAuthJson("apps/bring-app/auth.json")

if (!process.env.SKIP_COMPOSER_INSTALL) {
	execSync("yarn install:composer:pkg", { stdio: "inherit" })
	execSync("yarn install:composer:app", { stdio: "inherit" })
}
