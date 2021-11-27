import { memo, FC } from "react"
import {
	Route
} from "react-router-dom"

import rectangle from "./widgets/rectangle";
import text-wrapper from "./widgets/text-wrapper";
import @v-editor/carousel from "./widgets/@v-editor/carousel";

const { FC: Rectangle } = rectangle;
const { FC: Text-wrapper } = text-wrapper;
const { FC: @v-editor/carousel } = @v-editor/carousel;

const RenderMain: FC = () => {
  return (
    <div className="render-main" style={{
      position: "relative",
      width: "450px",
      height: "1000px",
    }}>
      <Route path="/" exact={ true }>
	<div
		style={{
			position: "absolute",
			width: "450px",
			height: "232px",
			left: "0px",
			top: "0px"
		}}
	>
		<Rectangle 
			config={{
  "backgroundColor": "rgba(205, 230, 255, 1)",
  "opacity": "1",
  "bgImage": "",
  "bgSize": "cover",
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
  "x": 0,
  "y": 0,
  "w": 450,
  "h": 232
}}
			style={{}}
			/>
	</div>
</Route>
<Route path="/" exact={ true }>
	<div
		style={{
			position: "absolute",
			width: "306px",
			height: "100px",
			left: "55px",
			top: "16px"
		}}
	>
		<Text-wrapper 
			config={{
  "fontSize": "100",
  "color": "rgba(3, 22, 110, 1)",
  "padding": 15,
  "content": "We are",
  "justifyContent": "flex-start",
  "alignItems": "center",
  "backgroundColor": "rgba(255, 255, 255, 0)",
  "fontFace": "Brush Script MT"
}}
			pos={{
  "x": 55,
  "y": 16,
  "w": 306,
  "h": 100
}}
			style={{
  "zIndex": 0
}}
			/>
	</div>
</Route>
<Route path="/" exact={ true }>
	<div
		style={{
			position: "absolute",
			width: "289px",
			height: "100px",
			left: "161px",
			top: "126px"
		}}
	>
		<Text-wrapper 
			config={{
  "fontSize": "70",
  "color": "rgba(238, 108, 108, 1)",
  "padding": 15,
  "content": "Blinders",
  "justifyContent": "flex-start",
  "alignItems": "center",
  "backgroundColor": "rgba(27, 139, 255, 0)",
  "fontFace": "Brush Script MT"
}}
			pos={{
  "x": 161,
  "y": 126,
  "w": 289,
  "h": 100
}}
			style={{
  "zIndex": 2
}}
			/>
	</div>
</Route>
<Route path="/" exact={ true }>
	<div
		style={{
			position: "absolute",
			width: "150px",
			height: "100px",
			left: "0px",
			top: "126px"
		}}
	>
		<Text-wrapper 
			config={{
  "fontSize": "70",
  "color": "rgba(0, 11, 92, 1)",
  "padding": 15,
  "content": "Peaky",
  "justifyContent": "flex-start",
  "alignItems": "center",
  "backgroundColor": "rgba(27, 139, 255, 0)",
  "fontFace": "Brush Script MT"
}}
			pos={{
  "x": 0,
  "y": 126,
  "w": 150,
  "h": 100
}}
			style={{
  "zIndex": 2
}}
			/>
	</div>
</Route>
<Route path="/" exact={ true }>
	<div
		style={{
			position: "absolute",
			width: "450px",
			height: "284px",
			left: "0px",
			top: "393px"
		}}
	>
		<@v-editor/carousel 
			config={{
  "showButton": false,
  "showDot": false,
  "iterationTime": "3000",
  "resources": [
    {
      "text": "",
      "color": "#fff",
      "bgColor": "#888",
      "img": "https://images.ladbible.com/thumbnail?type=jpeg&url=http://beta.ems.ladbiblegroup.com/s3/content/20cad1845d88c5f2c512ca9b4843a4c2.png&quality=70&width=808"
    },
    {
      "text": "",
      "color": "#888",
      "bgColor": "#fff",
      "img": "https://th.bing.com/th/id/OIP.9H9cKlL0YQn4OSb3efN3OQHaE8?pid=ImgDet&rs=1"
    },
    {
      "text": "",
      "color": "#fff",
      "bgColor": "#888",
      "img": "https://th.bing.com/th/id/OIP.2ZdMakK28KXfGoLnxdoFuAAAAA?pid=ImgDet&rs=1"
    }
  ]
}}
			pos={{
  "x": 0,
  "y": 393,
  "w": 450,
  "h": 284
}}
			style={{}}
			/>
	</div>
</Route>
<Route path="/" exact={ true }>
	<div
		style={{
			position: "absolute",
			width: "300px",
			height: "393px",
			left: "150px",
			top: "0px"
		}}
	>
		<Rectangle 
			config={{
  "backgroundColor": "rgba(164, 151, 230, 0)",
  "opacity": "1",
  "bgImage": "https://i.pinimg.com/originals/80/ea/df/80eadfd282bd65a161415f344f1c1bef.png",
  "bgSize": "cover",
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
  "x": 150,
  "y": 0,
  "w": 300,
  "h": 393
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
			width: "271px",
			height: "70px",
			left: "0px",
			top: "232px"
		}}
	>
		<Text-wrapper 
			config={{
  "fontSize": "40",
  "color": "rgba(242, 242, 241, 1)",
  "padding": 15,
  "content": "Season 6",
  "justifyContent": "flex-start",
  "alignItems": "center",
  "backgroundColor": "rgba(255, 255, 255, 0)",
  "fontFace": "Georgia"
}}
			pos={{
  "x": 0,
  "y": 232,
  "w": 271,
  "h": 70
}}
			style={{}}
			/>
	</div>
</Route>
<Route path="/" exact={ true }>
	<div
		style={{
			position: "absolute",
			width: "245.75px",
			height: "91px",
			left: "0px",
			top: "302px"
		}}
	>
		<Text-wrapper 
			config={{
  "fontSize": 16,
  "color": "rgba(250, 250, 250, 1)",
  "padding": 15,
  "content": "The final season is comming this year soon, hope you all like it",
  "justifyContent": "center",
  "alignItems": "center",
  "backgroundColor": "rgba(255, 255, 255, 0)",
  "fontFace": "Times New Roman"
}}
			pos={{
  "x": 0,
  "y": 302,
  "w": 245.75,
  "h": 91
}}
			style={{}}
			/>
	</div>
</Route>
<Route path="/" exact={ true }>
	<div
		style={{
			position: "absolute",
			width: "450px",
			height: "161px",
			left: "0px",
			top: "232px"
		}}
	>
		<Rectangle 
			config={{
  "backgroundColor": "rgba(11, 0, 67, 1)",
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
  "x": 0,
  "y": 232,
  "w": 450,
  "h": 161
}}
			style={{
  "zIndex": -11
}}
			/>
	</div>
</Route>
<Route path="/" exact={ true }>
	<div
		style={{
			position: "absolute",
			width: "450px",
			height: "249px",
			left: "0px",
			top: "751px"
		}}
	>
		<Rectangle 
			config={{
  "backgroundColor": "rgba(35, 32, 55, 1)",
  "opacity": "1",
  "bgImage": "https://fanart.tv/fanart/tv/270915/hdclearart/peaky-blinders-527aa1e98fa0e.png",
  "bgSize": "cover",
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
  "x": 0,
  "y": 751,
  "w": 450,
  "h": 249
}}
			style={{}}
			/>
	</div>
</Route>
<Route path="/" exact={ true }>
	<div
		style={{
			position: "absolute",
			width: "450px",
			height: "74px",
			left: "0px",
			top: "677px"
		}}
	>
		<Rectangle 
			config={{
  "backgroundColor": "rgba(35, 32, 55, 1)",
  "opacity": "1",
  "bgImage": "",
  "bgSize": "cover",
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
  "x": 0,
  "y": 677,
  "w": 450,
  "h": 74
}}
			style={{}}
			/>
	</div>
</Route>
<Route path="/" exact={ true }>
	<div
		style={{
			position: "absolute",
			width: "450px",
			height: "81px",
			left: "0px",
			top: "677px"
		}}
	>
		<Text-wrapper 
			config={{
  "fontSize": "40",
  "color": "rgba(254, 254, 254, 1)",
  "padding": 15,
  "content": "COMMING SOON",
  "justifyContent": "center",
  "alignItems": "center",
  "backgroundColor": "rgba(255, 255, 255, 0)",
  "fontFace": "Georgia"
}}
			pos={{
  "x": 0,
  "y": 677,
  "w": 450,
  "h": 81
}}
			style={{}}
			/>
	</div>
</Route>
    </div>
  )
}

export default memo(RenderMain)
