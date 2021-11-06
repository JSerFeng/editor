import { FC, useEffect, useRef } from "react"
import { WidgetProps } from "../../render/interfaces"

interface SvgRendererProp {
  svgStr: string
}

const SvgRenderer: FC<WidgetProps<SvgRendererProp>> = ({ config, pos }) => {
  const { svgStr } = config
  const svgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (svgStr) {
      svgRef.current!.innerHTML = svgStr
    }
  }, [svgStr])
  return (
    <div ref={ svgRef } className="svg-render" style={ {
      width: pos.w,
      height: pos.h
    } }>
    </div>
  )
}

export default SvgRenderer
