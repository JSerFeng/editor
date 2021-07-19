import WorkPlace from "./pages/work-place"
import { Provider } from "react-redux"
import { store } from "./store"
import { FC } from "react"
import WidgetsCenter from "./render/WidgetsCenter"
import { widgetsCenter as defaultWidgetsCenter } from "./widgets"
import {
	BrowserRouter,
	Route
} from "react-router-dom"

import './index.css';
import "antd/dist/antd.css"
import Generator from "./pages/generate"
import HomePage from "./pages/home-page"
import Preset from "./pages/preset/Preset"

export type {
	WidgetConfig,
	WidgetConfigProp,
	WidgetDescription,
	WidgetPackage,
	WidgetProps,
	EditorConfig,
	RenderConfig
} from "./render/interfaces"

export {
	EditorTypes
} from "./render/interfaces"

export {
	createPkg
} from "./render/WidgetsCenter"

export const widgetsCenter = defaultWidgetsCenter


export const Editor: FC<{
	widgetsCenter?: WidgetsCenter
}> = ({ widgetsCenter }) => {
	return (
		<BrowserRouter>
			<Provider store={ store }>
				<Route path="/" exact>
					<HomePage />
				</Route>
				<Route path="/editor">
					<WorkPlace
						widgetsCenter={ widgetsCenter || defaultWidgetsCenter }
					/>
				</Route>
				<Route path="/generator">
					<Generator />
				</Route>
				<Route path="/preset">
					<Preset widgetsCenter={ widgetsCenter || defaultWidgetsCenter } />
				</Route>
			</Provider>
		</BrowserRouter>
	)
}
