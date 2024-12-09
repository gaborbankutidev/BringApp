import fs from "fs"
import path from "path"

export function generateComposerAuthJson(filePath = "") {
	if (!process.env.SKIP_GENERATE_COMPOSER_AUTH) {
		const composerAuth = process.env.COMPOSER_AUTH

		if (composerAuth) {
			try {
				const authData = JSON.parse(composerAuth)
				const authJsonPath = path.join(process.cwd(), filePath ?? "auth.json")

				fs.writeFileSync(authJsonPath, JSON.stringify(authData, null, 4))

				console.log(`auth.json generated successfully at ${authJsonPath}`)
			} catch (error) {
				console.error("Failed to generate auth.json:", error.message)
				process.exit(1)
			}
		}
	}
}
