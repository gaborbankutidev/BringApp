// @ts-check
import {readFileSync, existsSync} from "fs";

/**
 * @param {string} path
 * @returns {{fileContent: string, success:true}|{success:false}}
 */
export function safeReadFileSync(path) {
	const fileExists = existsSync(path);
	if (!fileExists) {
		return {success: false};
	}
	try {
		const fileContent = readFileSync(path, {encoding: "utf-8"});
		return {fileContent, success: true};
	} catch (error) {
		return {success: false};
	}
}
