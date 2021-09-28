const {getToken} = require("./util")
const FormData = require("form-data")

const BASE_URL = "http://localhost:7001"

const request = require("axios").create({
  baseURL: BASE_URL,
})

const ErrorCode = {
  Success: 200,
  InternalError: 500,
  Fail: 415,
  TokenExpire: 420,
  ParamsError: 445,
  HasBeenRegistered: 450,
  PwdOrIdError: 455,
}

exports.ErrorCode = ErrorCode

request.interceptors.request.use((config) => {
  let tk = ""
  if ((tk = getToken())) {
    config.headers["Authorization"] = "bearer " + tk
  }
  return config
}, err => {
  console.log("发送请求时遇到错误")
  console.log(err)
})

request.interceptors.response.use(
  res => {
    return res.data
  },
  err => {
    console.log(err)
    let data
    return (data = err.response?.data)
      ? {code: data.statusCode, data: data.error, msg: data.message}
      : {code: ErrorCode.InternalError, data: err.response?.status, msg: "服务器连接失败"}
  }
)

request.interceptors.response.use((res) => {
  if (res.code === ErrorCode.TokenExpire) {
    console.log("token验证失败，请尝试使用下面的命令重新登录")
    console.log("pnpm run login \n或如果你全局安装过@editor/cmd可以执行：\n editor run login")
  }
  return res
})

exports.request = request

exports.apiLogin = (uid, pwd) => request.post("/user/login", {
  uid,
  pwd
}, {
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
})

exports.apiPublish = (
  name,
  showName,
  description,
  snapShot,
  privacy,
  umd,
  esm,
  style,
  libDirectoryZip
) => {
  const fd = new FormData()
  fd.append("name", name || "")
  fd.append("showName", showName || "")
  fd.append("description", description || "")
  fd.append("snapShot", snapShot || "")
  fd.append("privacy", privacy || "false")

  fd.append("umd", umd, "bundle.umd.js")
  fd.append("esm", esm, "bundle.es.js")
  fd.append("style", style, "style.css")
  fd.append("libDirectoryZip", libDirectoryZip, "lib.zip")
  return request.post("/widgets-store/publish", fd, {
    headers: {
      ...fd.getHeaders()
    }
  })
}
