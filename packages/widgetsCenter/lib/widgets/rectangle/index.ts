import { createPkg } from "../../core/WidgetsCenter";
import { EditorTypes } from "../../core/interfaces";
import { Rectangle, RectangleConfig } from "./rectangle";

export default createPkg(
	Rectangle,
	() => ({
		name: "rectangle",
		showName: "矩形",
		version: "0.0.1",
		description: "基础的矩形，调整圆角可以呈现其他形状",
		editorConfig: [
			{
				key: "backgroundColor",
				name: "颜色",
				type: EditorTypes.Color
			}, {
				key: "opacity",
				name: "透明度",
				type: EditorTypes.Text
			}, {
				key: "bgImage",
				name: "背景图片url",
				type: EditorTypes.Text
			}, {
				key: "bgSize",
				name: "背景尺寸",
				type: EditorTypes.Select,
				options: [
					{
						label: "无",
						value: "auto"
					}, {
						label: "cover",
						value: "cover"
					}, {
						label: "contain",
						value: "contain"
					}
				]
			}
		],
		config: {
			backgroundColor: "rgb(164, 151, 230)",
			opacity: "1",
			bgImage: "",
			bgSize: "auto",
			borders: [
				{
					name: "左上",
					border: "borderTopLeftRadius",
					value: "0"
				}, {
					name: "右上",
					border: "borderTopRightRadius",
					value: "0"
				}, {
					name: "右下",
					border: "borderBottomRightRadius",
					value: "0"
				}, {
					name: "右下",
					border: "borderBottomLeftRadius",
					value: "0"
				}
			]
		},
		from: "presets"
	}),
	RectangleConfig
)
