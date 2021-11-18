const { runScriptServer } = require("./server")
const shell = require("shelljs")
const { getPkgPath } = require("./path")

const pkg = process.argv[2]
const cmd = process.argv[3]

// if (cmd == "dev") {
// 	runScriptServer()
// }

shell.cd(getPkgPath(pkg))
shell.exec("pnpm run " + cmd)
