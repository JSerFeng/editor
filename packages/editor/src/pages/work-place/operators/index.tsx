import { Button } from "@material-ui/core";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { WidgetConfig } from "../../../render/interfaces";
import WidgetsCenter from "../../../render/WidgetsCenter";
import { BaseState } from "../../../store";
import CanvasConfig from "./canvasConfig";
import RouteConfig from "./RouteConfig";
import SingleConfig from "./SingleConfig";
import StyleConfig from "./StyleConfig"

const Operators: FC<{
	widgetsCenter: WidgetsCenter,
	currWidget: WidgetConfig[] | WidgetConfig | null,
	dispatch: Dispatch
}> = ({ dispatch, currWidget, widgetsCenter }) => {
	const [value, setValue] = useState("配置")
	return (
		<div className="operators-list">
			<div className="flex jb ac">
				<Button
					color={ value === "配置" ? "primary" : "default"}
					onClick={ setValue.bind(null, "配置") }
				>配置</Button>
				<Button
					color={ value === "样式" ? "primary" : "default" }
					onClick={ setValue.bind(null, "样式") }
				>样式</Button>
				<Button
					color={ value === "路由" ? "primary" : "default" }
					onClick={ setValue.bind(null, "路由") }
				>路由</Button>
			</div>
			<div className="operators">
				{
					value === "配置"
						? currWidget === null || currWidget === undefined
							? <CanvasConfig />
							: Array.isArray(currWidget)
								? null
								: currWidget.editorConfig === null
									? null
									: <SingleConfig
										dispatch={ dispatch }
										CustomConfig={ widgetsCenter.get(currWidget)!.Configuration || null }
										widgetConfig={ currWidget as WidgetConfig }
									/>
						: value === "样式"
							? <StyleConfig
								widgetConfig={ currWidget }
								dispatch={ dispatch }
							/>
							: <RouteConfig widgetConfig={ currWidget } />
				}
			</div>
		</div>
	)
}

export default connect(
	(state: BaseState) => {
		let currWidget: WidgetConfig | WidgetConfig[] | null = null
		const idxes = state.editorReducer.workplace.selectedIndex
		const widgets = state.editorReducer.workplace.renderConfig.widgets

		if (!idxes) {
			currWidget = null
		} else if (idxes.length > 1) {
			currWidget = idxes.map(i => widgets[i])
		} else if (idxes.length === 1) {
			currWidget = widgets[idxes[0]]
		} else {
			currWidget = null
		}
		return {
			currWidget
		}
	},
	dispatch => ({ dispatch })
)(Operators)
