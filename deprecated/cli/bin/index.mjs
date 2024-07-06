#!/usr/bin/env node
// @ts-check

import _ from "lodash";

import * as process from "process";
import {infomsg, errmsg, successmsg} from "./lib/chalk.mjs";
import {getConfig} from "./lib/get-config.mjs";
import {scaffoldBlock} from "./scaffold-block/index.mjs";

function main() {
	const config = getConfig();
	if (process.argv.length < 3) {
		errmsg("Subcommand not provided!");
		return;
	}
	const subcommand = process.argv[2];
	switch (subcommand) {
		case "sb":
		case "scaffold-block":
			infomsg("Executing `scaffoldBlock` subcommand...");
			scaffoldBlock(process.argv.slice(3), config);
			break;
		default:
			errmsg("Unknown subcommand!");
			break;
	}
}

main();
