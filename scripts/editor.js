const { runScriptServer } = require("./server")
const shell = require("shelljs")
const { getPkgPath } = require("./path")

const cmd = process.argv[2]

runScriptServer()

shell.cd(getPkgPath("editor"))
shell.exec("pnpm run " + cmd)