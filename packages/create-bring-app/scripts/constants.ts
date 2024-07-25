/**
 * DO NOT MOVE THIS FILE
 */
import path from "path";

export const ROOT = path.join(path.dirname(new URL(import.meta.url).pathname), "..");

export const templateDir = path.join(ROOT, "../../apps/bring-app");
export const cliTemplateDir = path.join(ROOT, "./template");
