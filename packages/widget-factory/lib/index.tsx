/**
 * 注意！！
 * lib文件夹下的文件即是所有最终打包的文件，请勿将组件相关逻辑写在lib之外的目录
 * 你可以这样规划你的组件
 * lib
 * --src
 * --utils
 */

import widget_1 from "./my-widget-1"
import widget_2 from "./my-widget-2"
import "./style.css"

// 如果只需要导出一个组件
// eg:
// export default widget_1

const widgets = [
	widget_2,
	widget_1,
]

export default widgets
