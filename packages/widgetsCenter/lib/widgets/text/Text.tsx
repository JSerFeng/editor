import { FC } from "react"
import produce from "immer"
import { WidgetConfigProp, WidgetProps } from "../../core/interfaces"

export interface TextProps {
	fontSize: number,
	fontFace: string,
	woffUrl?: string,
	color: string,
	padding: number,
	content: string,
	justifyContent: "center" | "right" | "left",
	alignItems: "center" | "flex-start" | "flex-end"
	backgroundColor: "#fff"
}

export const Text: FC<WidgetProps<TextProps>> = (props) => {
	const { style, config, pos } = props
	const {
		fontSize,
		fontFace,
		color,
		padding,
		content,
		justifyContent,
		alignItems,
		backgroundColor,
		woffUrl
	} = config
	const { w, h } = pos;
	if (woffUrl) {
		const font = new FontFace(fontFace, `url(${woffUrl})`)
		font.load()
			.then((loaded) => {
				document.fonts.add(loaded)
			})
			.catch((err) => {
				console.log(fontFace + "字体加载失败.url " + woffUrl)
				console.error(err)
			})
	}

	return (
		<div style={ {
			...style,
			fontSize: fontSize + "px",
			color,
			fontFamily: fontFace,
			backgroundColor,
			padding: padding + "px",
			width: w,
			height: h,
			display: "flex",
			justifyContent,
			alignItems,
			boxSizing: "border-box",
		} }>
			<div>{ content }</div>
		</div>
	)
}

const fontsList = [
	"Arial",
	"楷体",
	"Brush Script MT",
	"Courier New",
	"Verdana",
	"宋体",
	"Garamond",
	"Helvetica",
	"Tahoma",
	"Trebuchet MS",
	"Times New Roman",
	"Georgia",
]

export const TextConfiguration: FC<WidgetConfigProp<TextProps>> = ({ dispatchConfig, widgetConfig }) => {
	return (
		<div>
			{
				fontsList.map(fontFace => {
					return <div
						key={ fontFace }
						className="text-config-item"
						style={ {
							fontFamily: fontFace
						} }
						onClick={ () => {
							dispatchConfig(produce(widgetConfig, it => {
								it.config.fontFace = fontFace
							}))
						} }>
						字体示例 Fonts Sample 0123456789 ,.:;''""
					</div>
				})
			}
		</div>
	)
}
