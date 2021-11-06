import { Switch, Grid } from "@material-ui/core";
import { FC } from "react";
import { connect } from "react-redux";
import { WidgetConfig } from "../../../render/interfaces";
import { Dispatch } from "redux"
import { EditorActions } from "../../../store/editorReducer";
import ListConfig from "../../../components/list-config/ListConfig";

const {
	actChangeWidgetPath,
	actChangeWidgetExact,
} = EditorActions

const RouteConfig: FC<{
	widgetConfig: WidgetConfig[] | WidgetConfig | null,
	dispatch: Dispatch
}> = ({ widgetConfig, dispatch }) => {

	if (!widgetConfig) return (
		<div>未选择任何组件</div>
	)


	return (
		<Grid container>
			<Grid container justify="center">路由设置</Grid>
			<Grid item xs={ 6 }>
				精确匹配
			</Grid>
			<Grid item xs={ 6 }>
				<Switch
					checked={ Array.isArray(widgetConfig) ? true : widgetConfig.routeInfo.exact }
					onChange={
						e => {
							dispatch(actChangeWidgetExact(e.target.checked))
						}
					} />
			</Grid>
			<Grid item xs={ 6 }>
				需要显示的路径
			</Grid>
			<Grid item xs={ 12 }>
				<ListConfig 
				data={ Array.isArray(widgetConfig) ? ["/"] : widgetConfig.routeInfo.path }
				 onChange={
					newRoutes => {
						dispatch(actChangeWidgetPath(newRoutes))
					}
				} />
			</Grid>
		</Grid>
	)
}

export default connect()(RouteConfig)
