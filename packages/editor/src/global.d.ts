import WidgetsCenter from "./render/WidgetsCenter";

declare global {
	interface Window {
		widgetsCenter: WidgetsCenter
	}

	const __DEV__: boolean
}