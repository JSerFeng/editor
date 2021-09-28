const path = require("path")
const fse = require("fs-extra")

const STORE_PATH = path.resolve(__dirname, "..", "store")

const tkFilePath = path.resolve(STORE_PATH, ".editor")

exports.getToken = () => {
  const exist = fse.pathExistsSync(tkFilePath)
  if (!exist) {
    return ""
  }
  const tk = fse.readFileSync(tkFilePath)
  return tk.toString()
}

exports.saveToken = async (tk) => {
  await fse.writeFile(tkFilePath, tk)
}
