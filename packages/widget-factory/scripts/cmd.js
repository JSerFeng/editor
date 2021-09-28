const {publish, login} = require("@editor/cmd")

const cmd = process.argv[2]

switch (cmd) {
  case "publish":
    publish()
    break
  case "login":
    login()
    break
  default:
    console.log("未识别的命令 " + cmd)
}
