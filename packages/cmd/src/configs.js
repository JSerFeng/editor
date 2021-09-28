const fse = require("fs-extra")
const path = require("path")

const cwd = process.cwd()

const defaultConfig = {
  outputDir: "dist",
  esmFileName: "bundle.es.js",
  umdFileName: "bundle.umd.js",
  styleFileName: "style.css",
  libDir: "lib",
}

exports.defaultConfig = defaultConfig

function getConfigPath () {
  return path.resolve(cwd, "editor.json")
}

exports.mergeConfig = (config) => {
  return {
    ...defaultConfig,
    config
  }
}

exports.readConfig = async () => {
  const configPath = getConfigPath()
  if (await fse.exists(configPath)) {
    try {
      return require(configPath)
    }catch (e) {
      console.log("项目配置文件有错误:")
      console.log(e)
      return defaultConfig
    }
  } else {
    console.log("使用默认配置")
    return defaultConfig
  }
}
