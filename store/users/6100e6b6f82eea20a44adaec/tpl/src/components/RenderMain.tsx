import { memo, FC } from "react"
import {
	Route
} from "react-router-dom"

import my-widget from "./widgets/my-widget";

const { FC: My-widget } = my-widget;

const RenderMain: FC = () => {
  return (
    <div className="render-main" style={{
      position: "relative",
      width: "1024px",
      height: "768px",
    }}>
      <Route path="/" exact={ true }>
	<div
		style={{
			position: "absolute",
			width: "200px",
			height: "200px",
			left: "412px",
			top: "240px"
		}}
	>
		<My-widget 
			config={{
  "customColor": "blue",
  "title": "我是标题",
  "content": "我是E内容"
}}
			pos={{
  "w": 200,
  "h": 200,
  "x": 412,
  "y": 240
}}
			style={{}}
			/>
	</div>
</Route>
    </div>
  )
}

export default memo(RenderMain)
