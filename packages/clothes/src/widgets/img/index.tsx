import { createPkg } from "../../render/WidgetsCenter";
import { FC } from "react"
import { WidgetProps } from "../../render/interfaces";

interface ImageWidgetConfig {
	width: string,
	height: string,
	src: string,
	alt: string,
}

const ImageWidget: FC<WidgetProps<ImageWidgetConfig>> = ({ config, pos }) => {
	return <img
		style={ {
			width: pos.w,
			height: pos.h
		} }
		alt={ config.src }
		src={ config.src } />
}

export default createPkg(ImageWidget, () => ({
	name: "image-wrapper",
	showName: "基础图片组件",
	description: "图片组件",
	editorConfig: [
		{
			name: "图片描述",
			key: "alt",
			type: "Text"
		}
	],
	config: {
		src: "/no-img.png",
		alt: "无图片",
		width: "200px",
		height: "200px",
	},
}))