// Ignore pattern is set in the package.json file in the `lint:root` script to avoid eslint warnings of ignored files in `apps/` and `packages/` directories
const bringLibConfig = require("@bring/config/lib.js")

module.exports = [...bringLibConfig]
