import { WidgetsCenter, presetsWidgets } from "@v-editor/widgets-center"

export const widgetsCenter = new WidgetsCenter()

const {
	text,
	rectangle,
	svg,
	routerLink,
	carousel
} = presetsWidgets

widgetsCenter.use(text)
widgetsCenter.use(rectangle)
widgetsCenter.use(svg)
widgetsCenter.use(routerLink)
widgetsCenter.use(carousel)
