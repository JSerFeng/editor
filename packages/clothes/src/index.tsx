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

import './index.scss';
import "antd/dist/antd.css"
import HomePage from "./pages/home-page"
import Preset from "./pages/preset/Preset"
import Login from "./pages/loginAndRegister"
import Enter from "./pages/login"
import { Snackbar } from "@material-ui/core"
import Shop from "./pages/shop/Shop"

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
				<Route path="/enter">
			  		 <Enter />
				</Route>
			</Provider>
			<Snackbar></Snackbar>
		</BrowserRouter>
	)
}
