import WorkPlace from "./pages/work-place"
import { Provider } from "react-redux"
import { store } from "./store"
import { FC } from "react"
import { widgetsCenter as defaultWidgetsCenter } from "./widgets"
import {
	BrowserRouter,
	Route
} from "react-router-dom"

import './index.scss';
import HomePage from "./pages/home-page"
import Preset from "./pages/preset/Preset"
import Login from "./pages/loginAndRegister"
import Shop from "./pages/shop/Shop"
import { WidgetsCenter } from "@v-editor/widgets-center"
import Msg from "./components/msg"

export type {
	WidgetConfig,
	WidgetConfigProp,
	WidgetDescription,
	WidgetPackage,
	WidgetProps,
	EditorConfig,
	RenderConfig,
} from "@v-editor/widgets-center"

export {
	EditorTypes,
	createPkg,
	WidgetsCenter
} from "@v-editor/widgets-center"

export const widgetsCenter = defaultWidgetsCenter

//这里把widgetsCenter实例挂载了window上方便后续添加远程组件
window.widgetsCenter = widgetsCenter

export const Editor: FC<{
	widgetsCenter?: WidgetsCenter
}> = ({ widgetsCenter }) => {

	return (
		<BrowserRouter>
			<Provider store={ store }>
				<Route path="/" exact>
					<HomePage />
				</Route>
				<Route path="/shop" exact>
					<Shop />
				</Route>
				<Route path="/editor">
					<WorkPlace
						widgetsCenter={ widgetsCenter || defaultWidgetsCenter } />
				</Route>
				{/*<Route path="/generator">*/ }
				{/*	<Generator />*/ }
				{/*</Route>*/ }
				<Route path="/preset">
					<Preset widgetsCenter={ widgetsCenter || defaultWidgetsCenter } />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
			</Provider>
			<Msg />
		</BrowserRouter>
	)
}
