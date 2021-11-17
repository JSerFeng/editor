import { FC, useEffect, useState } from "react";
import Render from "../../render";
import Operators from "./operators";
import {
	normalizePos,
	Pos,
	RenderConfig,
	WidgetConfig,
	EventEmitter,
	WidgetsCenter,
	HooksCallback
} from "@v-editor/widgets-center";
import HeaderConfig from "./operators/HeaderConfig";
import Side from "../../components/Side";
import { connect } from "react-redux";
import { BaseState } from "../../store";
import { Drawer } from "@material-ui/core";
import ProjectConfig from "./projectConfig";

import "./style.scss"
import MenuNav from "./menu-nav";

const eventPool = new EventEmitter()

const WorkPlace: FC<{
	widgetsCenter: WidgetsCenter,
	currHistory: string,
	renderConfig: RenderConfig,
	wid: string
}> = ({ widgetsCenter, currHistory, renderConfig, wid }) => {
	const [allWidgetPkges, setAllWidgetPkges] = useState(widgetsCenter.getAll())
	const [openDrawer, setOpenDrawer] = useState(false)
	const [openWidgetList, setOpenWidgetList] = useState(true)
	const [openOperator, setOpenOperator] = useState(true)
	const [openHeader, setOpenHeader] = useState(true)

	//新建一个widget的函数组件
	const createWidgets = (config: WidgetConfig | string) => {
		const widgetDescription = widgetsCenter.get(config)
		return widgetDescription?.FC || null
	}

	//用于根据一个组件的name去生成一份新的组件的config
	const createWidgetConfig = (name: string, pos?: Pos): WidgetConfig => {
		const pkg = widgetsCenter.get(name)
		if (pkg) {
			const description = pkg.getDescription();
			pos = pos
				? pos
				: normalizePos(description.initPos)
			pos.x = renderConfig.pos.w / 2 - pos.w / 2
			pos.y = renderConfig.pos.h / 2 - pos.h / 2
			return {
				...description,
				routeInfo: {
					exact: true,
					path: [currHistory]
				},
				pos
			}
		} else {
			//永远不应该运行这里
			throw new Error("没有找到该组件，组件名: " + name)
		}
	}

	useEffect(() => {
		widgetsCenter.subscribe(allWidgets => {
			setAllWidgetPkges(allWidgets)
		})
	}, [widgetsCenter, setAllWidgetPkges])

	useEffect(() => {
		const cb: HooksCallback = (w) => {
			if (w.getDescription().from === "custom") {
				w.getDescription().from = wid
			}
			return w
		}
		widgetsCenter.pre(cb)

		return () => {
			widgetsCenter.unPre(cb)
		}
	}, [wid, widgetsCenter])

	return (
		<>
			<div className="flex jc" style={ {
				height: "100vh",
				width: "100vw",
				overflow: "hidden",
				position: "relative"
			} }>
				<Render
					createWidgetConfig={ createWidgetConfig }
					eventPool={ eventPool }
					createWidgets={ createWidgets } />
				<Side
					open={ openHeader }
					setOpen={ setOpenHeader }
					placement="top">
					<HeaderConfig openDrawer={ setOpenDrawer.bind(null, true) } />
				</Side>
				<Side
					open={ openWidgetList }
					setOpen={ setOpenWidgetList }
					placement="left">
					<MenuNav createWidgetConfig={ createWidgetConfig } />
				</Side>
				<Side
					open={ openOperator }
					setOpen={ setOpenOperator }
					placement="right">
					<Operators widgetsCenter={ widgetsCenter } />
				</Side>
			</div>
			<Drawer
				open={ openDrawer }
				anchor="right"
				onClose={ setOpenDrawer.bind(null, false) }>
				<ProjectConfig />
			</Drawer>
		</>
	)
}

export default connect(
	(state: BaseState) => {
		const { histories, currHistoryIdx } = state.editorReducer.workplace.renderConfig
		return {
			currHistory: histories[currHistoryIdx].path,
			renderConfig: state.editorReducer.workplace.renderConfig,
			wid: state.editorReducer.wid
		}
	}
)(WorkPlace)

