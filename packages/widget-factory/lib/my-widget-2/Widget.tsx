import { FC } from "react"
import { WidgetProps } from "@editor/editor"

interface Props {
	customColor: string,
	content: string,
	title: string
}

const Widget: FC<WidgetProps<Props>> = ({ config }) => {
	const { customColor, content, title } = config

	return <div
		className="widget-2"
		style={ {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			width: "100%",
			height: "100%"
		} }>
		<h1 color={ customColor }>{ title }</h1>
		<p>{ content }</p>
	</div>
}

export default Widget
