import crypto from "crypto"
import fsExtra from "fs-extra"
import path from "path"

// Folders (relative to the project root) that ship a .env.example
const ENV_FOLDERS = ["", "next-app", "plugins/bring-app"]

/**
 * Creates a .env file next to each .env.example in the scaffolded project,
 * replacing the JWT_SECRET_KEY placeholder with a freshly generated secret
 * so no project ever runs on the template's default value.
 */
export function generateEnvFiles(directory: string) {
	for (const folder of ENV_FOLDERS) {
		const examplePath = path.join(directory, folder, ".env.example")
		const envPath = path.join(directory, folder, ".env")

		if (!fsExtra.existsSync(examplePath) || fsExtra.existsSync(envPath)) {
			continue
		}

		try {
			let content = fsExtra.readFileSync(examplePath, { encoding: "utf-8" })

			content = content.replace(
				/^JWT_SECRET_KEY=.*$/m,
				`JWT_SECRET_KEY="${crypto.randomBytes(32).toString("base64")}"`
			)

			fsExtra.writeFileSync(envPath, content)
		} catch (error) {
			console.error(`Failed to generate .env in ${path.join(directory, folder)}:`, error)
		}
	}
}
