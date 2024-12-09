import { execSync } from "child_process"
import dotenv from "dotenv"
import fs from "fs"
import path from "path"

dotenv.config({ path: path.resolve(process.cwd(), "apps/bring-app/.env") })

if (!process.env.SKIP_GENERATE_COMPOSER_AUTH) {
	const composerAuth = process.env.COMPOSER_AUTH

	if (composerAuth) {
		try {
			const authData = JSON.parse(composerAuth)
			const authJsonPath = path.join(process.cwd(), "apps/bring-app/auth.json")

			fs.writeFileSync(authJsonPath, JSON.stringify(authData, null, 4))

			console.log(`auth.json generated successfully at ${authJsonPath}`)
		} catch (error) {
			console.error("Failed to generate auth.json:", error.message)
			process.exit(1)
		}
	}
}

if (!process.env.SKIP_COMPOSER_INSTALL) {
	execSync("yarn install:composer:pkg", { stdio: "inherit" })
	execSync("yarn install:composer:app", { stdio: "inherit" })
}
