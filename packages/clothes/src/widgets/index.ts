import { presetsWidgets, WidgetsCenter } from "@v-editor/widgets-center"

const {
	text,
	rectangle,
	svg,
	img,
} = presetsWidgets

export const widgetsCenter = new WidgetsCenter()

widgetsCenter.use(text)
widgetsCenter.use(rectangle)
widgetsCenter.use(svg)
widgetsCenter.use(img)
