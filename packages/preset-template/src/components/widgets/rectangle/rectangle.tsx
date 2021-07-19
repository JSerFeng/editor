import { FC } from "react";
import { RectangleProps } from "./schema";

const Rectangle: FC<RectangleProps> = (props) => {
  const { style, config, pos } = props
  const { backgroundColor } = config
  return (
    <div
      style={ {
        ...style,
        backgroundColor,
        width: pos.w,
        height: pos.h
      } }
    >
    </div>
  )
}

export default Rectangle
