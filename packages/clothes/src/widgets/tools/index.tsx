import { createPkg } from "../../render/WidgetsCenter";
import { FC } from "react"
import { WidgetProps } from "../../render/interfaces";

interface ImageWidgetConfig {
	width: string,
	height: string,
	src: string,
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

export function createWidgetFromImage(imageName: string, src: string) {
	return createPkg(ImageWidget, {
		name: imageName,
		showName: imageName,
		description: "基础图片",
		editorConfig: [
			{
				name: "图片宽度",
				key: "width",
				type: "Text",
			},
			{
				name: "图片高度",
				key: "height",
				type: "Text",
			},
		],
		config: {
			src,
			width: "200px",
			height: "200px",
		},
	})
}