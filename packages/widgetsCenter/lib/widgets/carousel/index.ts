import { createPkg, EditorTypes } from "../../core";
import { Carousel, CarouselProps, Configure } from "./Carousel";

export default createPkg<CarouselProps>(Carousel, {
	name: "DefaultCarousel",
	showName: "轮播组件",
	description: "轮播图banner组件",
	editorConfig: [
		{
			type: EditorTypes.Switch,
			name: "显示下方控制圆点",
			key: "showDot",
		}, {
			type: EditorTypes.Switch,
			name: "显示左右控制箭头",
			key: "showButton",
		}, {
			type: EditorTypes.Number,
			name: "转到下一页所需时间",
			key: "iterationTime",
		},
	],
	config: {
		showButton: true,
		showDot: true,
		iterationTime: 2000,
		resources: [
			{
				text: "Page One",
				color: "#fff",
				bgColor: "#888"
			}, {
				text: "Page Two",
				color: "#888",
				bgColor: "#fff",
			}, {
				text: "Page Three",
				color: "#fff",
				bgColor: "#888"
			},
		]
	}
}, Configure)