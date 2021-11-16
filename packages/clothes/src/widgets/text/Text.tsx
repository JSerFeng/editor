import { FC } from "react"
import { WidgetProps } from "../../render/interfaces"

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

const Text: FC<WidgetProps<TextProps>> = (props) => {
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
		} }>
			<div>{ content }</div>
		</div>
	)
}

export default Text
