const { getPkgPath } = require("./path")
const shell = require("shelljs")
const cp = require("child_process")

const serverPath = getPkgPath("server")

function runScriptServer() {
	shell.cd(serverPath)
	const cp_instance = cp.exec("pnpm run start:server")
	cp_instance.stdout.on("data", console.log)
}

exports.runScriptServer = runScriptServer
