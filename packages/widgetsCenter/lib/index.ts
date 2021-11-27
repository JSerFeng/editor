import img from "./widgets/img";
import rectangle from "./widgets/rectangle";
import svg from "./widgets/svg";
import text from "./widgets/text";
import routerLink from "./widgets/router-link";
import carousel from "./widgets/carousel"

export * from "./core/WidgetsCenter";

export const presetsWidgets = {
	img,
	rectangle,
	svg,
	text,
	routerLink,
	carousel
}

export * from "./core/interfaces"
export * from "./core/eventEmitter"

import "./widgets/style.scss"
