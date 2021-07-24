import { widgetsCenter } from "@editor/editor"

declare global {
	interface Window {
		widgetsCenter: typeof widgetsCenter
	}
}