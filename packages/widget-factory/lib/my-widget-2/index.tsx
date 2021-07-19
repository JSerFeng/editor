import Widget from "./Widget"
import { createPkg, EditorTypes } from "visible-editor"

export default createPkg(
	Widget,
	{
		name: "custom-widget-2",
		showName: "自定义组件-2",
		description: "还未输入你的组件介绍",
		initPos: { //初始的位置信息
			x: 0,
			y: 0,
			w: 200,
			h: 200
		},
		editorConfig: [
			{
				type: EditorTypes.Color,
				name: "颜色",
				key: "titleColor"
			}, {
				type: EditorTypes.Text,
				name: "标题内容",
				key: "title"
			}, {
				type: EditorTypes.Text,
				name: "文章内容",
				key: "content"
			}
		],
		config: {
			"titleColor": "blue",
			"title": "我是标题",
			"content": "我是内容"
		}
	}
)
