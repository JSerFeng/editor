import { FC } from "react"
import { WidgetProps } from "../../render/interfaces"
import { TextProps } from "./schema"

const Text: FC<WidgetProps<TextProps>> = (props) => {
  const { style, config, pos } = props
  const { fontSize, color, padding, content, justifyContent, alignItems, backgroundColor } = config
  const { w, h } = pos

  return (
    <div style={ {
      ...style,
      fontSize, 
			color, 
			backgroundColor,
      padding: padding + "px",
      width: w,
      height: h,
      display: "flex",
      justifyContent,
      alignItems,
    } }>
      <div> { content }</div>
    </div>
  )
}

export default Text
