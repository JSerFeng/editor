import { EditorTypes } from "../../render/interfaces"
import { createPkg } from "../../render/WidgetsCenter"
import { TextProps } from "./schema"
import Text from "./Text"

export default createPkg<TextProps>(Text, {
	name: "text",
	showName: "文本",
	version: "0.0.1",
	description: "基础文本控件",
	editorConfig: [
		{
			key: "fontSize",
			name: "字体大小",
			type: EditorTypes.Number,
		}, {
			key: "color",
			name: "字体颜色",
			type: EditorTypes.Color
		}, {
			key: "padding",
			name: "内边距",
			type: EditorTypes.Number
		}, {
			key: "content",
			name: "内容",
			type: EditorTypes.Text
		}, {
			key: "backgroundColor",
			name: "背景颜色",
			type: EditorTypes.Color
		}, {
			key: "justifyContent",
			name: "水平布局",
			type: EditorTypes.Select,
			options: [
				{ label: "靠左", value: "flex-start" },
				{ label: "居中", value: "center" },
				{ label: "靠右", value: "flex-end" },
			]
		}, {
			key: "alignItems",
			name: "垂直布局",
			type: EditorTypes.Select,
			options: [
				{ label: "靠上", value: "flex-start" },
				{ label: "居中", value: "center" },
				{ label: "靠下", value: "flex-end" },
			]
		}
	],
	config: {
		fontSize: 16,
		color: "black",
		padding: 15,
		content: "文本框",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff"
	},
	from: "presets"
})