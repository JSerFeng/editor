const shell = require("shelljs")
const { getPkgPath } = require("./path")

shell.cd(getPkgPath("preset"))
shell.exec("yarn start")
