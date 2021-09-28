const inquirer = require("inquirer")
const {ask4login} = require("./login")
const {mergeConfig, readConfig} = require("./configs")
const {publish: publishImpl} = require("./publish")

exports.login = async function login() {
  try {
    await ask4login()
  } catch (e) {
    console.log("登录失败😢")
    console.log(e)
  }
}

exports.publish = async function publish() {
  publishImpl(mergeConfig(await readConfig()))
}
