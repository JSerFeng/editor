const path = require("path")
const pkgsPath = path.resolve(__dirname, "..", "packages")

function getPkgPath(pkg) {
	return path.join(pkgsPath, pkg)
}

exports.getPkgPath = getPkgPath
