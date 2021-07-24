import { FC } from "react"
import { TextProps } from "./schema"

const Text: FC<TextProps> = (props) => {
  const { style, config, pos } = props
  const { fontSize, color, padding, content, justifyContent, alignItems, backgroundColor } = config
  const { w, h } = pos

  return (
    <div style={ {
      ...style,
      fontSize, color, backgroundColor,
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
