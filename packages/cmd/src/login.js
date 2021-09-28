const inquirer = require("inquirer")
const {
  apiLogin,
  ErrorCode
} = require("./request")

const {saveToken} = require("./util")

async function ask4login() {
  let tk = ""
  while (true) {
    const {code, data, msg} = await doLogin()
    if (code === ErrorCode.Success) {
      tk = data.access_token
      break
    } else if (code !== ErrorCode.Fail) {
      throw {code, data, msg}
    }
  }
  await saveToken(tk)
  console.log("登录成功😘")
}

exports.ask4login = ask4login

const doLogin = () => inquirer
  .prompt([
    {type: "input", message: "请输入账号", name: "userId"},
    {type: "input", message: "请输入密码", name: "pwd"},
  ])
  .then(({userId, pwd}) => apiLogin(userId, pwd))
