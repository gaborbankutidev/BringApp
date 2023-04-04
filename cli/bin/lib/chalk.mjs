// @ts-check
import chalk from "chalk";

const startStyle = chalk.bgHex("#FFA500").black.bold;
const warningStyle = chalk.bgHex("#FDCA40").black.bold;
const errorStyle = chalk.bgHex("#DD4C32").bold;
const infoStyle = chalk.bgHex("#4381C1").black.bold;
const successStyle = chalk.bgHex("#62C370").bold;

/**
 * @param {string} text
 */
function startmsg(text) {
	console.log(startStyle("   START ") + " " + text + "\n");
}

/**
 * @param {string} text
 */
function endmsg(text) {
	console.log("\n" + startStyle("     END ") + " " + text + "\n");
}

/**
 * @param {string} text
 */
export function warnmsg(text) {
	console.log(warningStyle("    WARN ") + " " + text);
}

/**
 * @param {string} text
 */
export function errmsg(text) {
	console.log(errorStyle("     ERR ") + " " + text);
}

/**
 * @param {string} text
 */
export function infomsg(text) {
	console.log(infoStyle("    INFO ") + " " + text);
}

/**
 * @param {string} text
 */
export function successmsg(text) {
	console.log(successStyle(" SUCCESS ") + " " + text);
}
