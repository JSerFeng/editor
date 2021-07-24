import WidgetsCenter from "./render/WidgetsCenter";

declare global {
	interface Window {
		widgetsCenter: WidgetsCenter
	}
}