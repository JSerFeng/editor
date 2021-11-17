import { memo, FC } from "react"
import {
	Route
} from "react-router-dom"

import text-wrapper from "./widgets/text-wrapper";
import rectangle from "./widgets/rectangle";

const { FC: Text-wrapper } = text-wrapper;
const { FC: Rectangle } = rectangle;

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
			width: "292px",
			height: "239.5px",
			left: "154px",
			top: "67px"
		}}
	>
		<Text-wrapper 
			config={{
  "fontSize": "70",
  "color": "black",
  "padding": "0",
  "content": "I ❤️ U",
  "justifyContent": "center",
  "alignItems": "center",
  "backgroundColor": "rgba(255, 255, 255, 0.45)",
  "fontFace": "ANDRY",
  "woffUrl": "http://localhost:3000/api/assets/fonts/andry/ANDRY.woff"
}}
			pos={{
  "x": 154,
  "y": 67,
  "w": 292,
  "h": 239.5
}}
			style={{
  "zIndex": 1
}}
			/>
	</div>
</Route>
<Route path="/" exact={ true }>
	<div
		style={{
			position: "absolute",
			width: "168.875px",
			height: "116px",
			left: "311.5625px",
			top: "416px"
		}}
	>
		<Text-wrapper 
			config={{
  "fontSize": "30",
  "color": "black",
  "padding": 15,
  "content": "lOST IN PARIS",
  "justifyContent": "center",
  "alignItems": "center",
  "backgroundColor": "rgba(255, 255, 255, 0)",
  "fontFace": "ANDRY",
  "woffUrl": "http://localhost:3000/api/assets/fonts/andry/ANDRY.woff"
}}
			pos={{
  "x": 311.5625,
  "y": 416,
  "w": 168.875,
  "h": 116
}}
			style={{}}
			/>
	</div>
</Route>
<Route path="/" exact={ true }>
	<div
		style={{
			position: "absolute",
			width: "100px",
			height: "100px",
			left: "396px",
			top: "522px"
		}}
	>
		<Rectangle 
			config={{
  "backgroundColor": "rgb(164, 151, 230)",
  "opacity": "1",
  "bgImage": "",
  "bgSize": "auto",
  "borders": [
    {
      "name": "左上",
      "border": "borderTopLeftRadius",
      "value": "0"
    },
    {
      "name": "右上",
      "border": "borderTopRightRadius",
      "value": "0"
    },
    {
      "name": "右下",
      "border": "borderBottomRightRadius",
      "value": "0"
    },
    {
      "name": "右下",
      "border": "borderBottomLeftRadius",
      "value": "0"
    }
  ]
}}
			pos={{
  "x": 396,
  "y": 522,
  "w": 100,
  "h": 100
}}
			style={{}}
			/>
	</div>
</Route>
<Route path="/" exact={ true }>
	<div
		style={{
			position: "absolute",
			width: "100px",
			height: "100px",
			left: "638px",
			top: "206.5px"
		}}
	>
		<Rectangle 
			config={{
  "backgroundColor": "rgb(164, 151, 230)",
  "opacity": "1",
  "bgImage": "",
  "bgSize": "auto",
  "borders": [
    {
      "name": "左上",
      "border": "borderTopLeftRadius",
      "value": "0"
    },
    {
      "name": "右上",
      "border": "borderTopRightRadius",
      "value": "0"
    },
    {
      "name": "右下",
      "border": "borderBottomRightRadius",
      "value": "0"
    },
    {
      "name": "右下",
      "border": "borderBottomLeftRadius",
      "value": "0"
    }
  ]
}}
			pos={{
  "x": 638,
  "y": 206.5,
  "w": 100,
  "h": 100
}}
			style={{}}
			/>
	</div>
</Route>
<Route path="/" exact={ true }>
	<div
		style={{
			position: "absolute",
			width: "100px",
			height: "100px",
			left: "706px",
			top: "443px"
		}}
	>
		<Rectangle 
			config={{
  "backgroundColor": "rgb(164, 151, 230)",
  "opacity": "1",
  "bgImage": "",
  "bgSize": "auto",
  "borders": [
    {
      "name": "左上",
      "border": "borderTopLeftRadius",
      "value": "0"
    },
    {
      "name": "右上",
      "border": "borderTopRightRadius",
      "value": "0"
    },
    {
      "name": "右下",
      "border": "borderBottomRightRadius",
      "value": "0"
    },
    {
      "name": "右下",
      "border": "borderBottomLeftRadius",
      "value": "0"
    }
  ]
}}
			pos={{
  "x": 706,
  "y": 443,
  "w": 100,
  "h": 100
}}
			style={{}}
			/>
	</div>
</Route>
<Route path="/" exact={ true }>
	<div
		style={{
			position: "absolute",
			width: "100px",
			height: "100px",
			left: "512px",
			top: "296px"
		}}
	>
		<Rectangle 
			config={{
  "backgroundColor": "rgb(164, 151, 230)",
  "opacity": "1",
  "bgImage": "",
  "bgSize": "auto",
  "borders": [
    {
      "name": "左上",
      "border": "borderTopLeftRadius",
      "value": "0"
    },
    {
      "name": "右上",
      "border": "borderTopRightRadius",
      "value": "0"
    },
    {
      "name": "右下",
      "border": "borderBottomRightRadius",
      "value": "0"
    },
    {
      "name": "右下",
      "border": "borderBottomLeftRadius",
      "value": "0"
    }
  ]
}}
			pos={{
  "x": 512,
  "y": 296,
  "w": 100,
  "h": 100
}}
			style={{}}
			/>
	</div>
</Route>
<Route path="/" exact={ true }>
	<div
		style={{
			position: "absolute",
			width: "100px",
			height: "100px",
			left: "346px",
			top: "225.75px"
		}}
	>
		<Text-wrapper 
			config={{
  "fontSize": 16,
  "color": "black",
  "padding": 15,
  "content": "文本框 Hello",
  "justifyContent": "center",
  "alignItems": "center",
  "backgroundColor": "#fff",
  "fontFace": "serif"
}}
			pos={{
  "x": 346,
  "y": 225.75,
  "w": 100,
  "h": 100
}}
			style={{}}
			/>
	</div>
</Route>
<Route path="/" exact={ true }>
	<div
		style={{
			position: "absolute",
			width: "100px",
			height: "100px",
			left: "235px",
			top: "334px"
		}}
	>
		<Text-wrapper 
			config={{
  "fontSize": 16,
  "color": "black",
  "padding": 15,
  "content": "文本框 Hello",
  "justifyContent": "center",
  "alignItems": "center",
  "backgroundColor": "#fff",
  "fontFace": "serif"
}}
			pos={{
  "x": 235,
  "y": 334,
  "w": 100,
  "h": 100
}}
			style={{}}
			/>
	</div>
</Route>
    </div>
  )
}

export default memo(RenderMain)
