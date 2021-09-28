const AdmZip = require("adm-zip")
const path = require("path")
const fse = require("fs-extra")
const inquirer = require("inquirer")
const shell = require("shelljs")
const {
  apiPublish,
  ErrorCode
} = require("./request")
const {defaultConfig} = require("./configs")

const cwd = process.cwd()

//实际执行组件上传的函数
exports.publish = async function publish(config) {
  if (!config) {
    config = defaultConfig
  }
  try {
    const jsonPath = path.resolve(cwd, "package.json")
    const widgetInfo = require(jsonPath)
    const newWidgetInfo = await confirmConfig(widgetInfo)
    const finalWidgetInfo = {
      ...widgetInfo,
      ...newWidgetInfo,
    }
    await fse.writeFile(jsonPath, JSON.stringify(finalWidgetInfo, null, 2))

    //运行打包
    shell.cd(cwd)
    shell.exec("npm run build")

    const {esm, umd, style} = findFiles(config)
    const zip = await createZipBuffer(path.resolve(cwd, config.libDir))
    const res = await apiPublish(
      finalWidgetInfo.name,
      finalWidgetInfo.showName,
      finalWidgetInfo.description,
      finalWidgetInfo.snapShot,
      false,
      umd,
      esm,
      style,
      zip
    )
    if (res.code !== ErrorCode.Success) {
      throw res
    }
    console.log("上传成功!")
  } catch (e) {
    console.log("上传过程中遇到错误")
    console.error(e)
  }
}

function findFiles(config) {
  const {outputDir, esmFileName, umdFileName, styleFileName} = config
  try {
    const esm = fse.createReadStream(path.resolve(cwd, outputDir, esmFileName))
    const umd = fse.createReadStream(path.resolve(cwd, outputDir, umdFileName))
    const style = fse.createReadStream(path.resolve(cwd, outputDir, styleFileName))
    return {
      esm,
      umd,
      style
    }
  } catch (e) {
    console.log(`在${path.resolve(cwd, outputDir || "")}文件夹下找不该文件`)
    throw e
  }
}

async function createZipBuffer(zipDir) {
  const zip = new AdmZip()
  zip.addLocalFolder(zipDir)
  return await toBuffer(zip)
}

async function toBuffer(zip) {
  return new Promise((resolve, reject) => {
    zip.toBuffer(resolve, reject)
  })
}

async function getWidgetInfo(config) {
  const widgetInfoPath = path.resolve(cwd, config.widgetInfoPath)
  const file = await fse.readFile(widgetInfoPath)

}

function confirmConfig(config) {
  return inquirer
    .prompt([
      {type: "input", message: "组件名称", default: config.showName, name: "showName"},
      {type: "input", message: "组件变量名(模块名称)", default: config.name, name: "name"},
      {type: "input", message: "组件的描述", default: config.description, name: "description"},
      {type: "input", message: "组件的展示图片网址或base64字符串(可选)", default: config.snapShot, name: "snapShot"},
    ])
}
