import { Button, Modal, Tooltip } from "@material-ui/core"
import { notification } from "../../components/msg"
import { FC, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import ErrorCatch from "../../components/error-widget"
import { WidgetConfig, WidgetPackage, WidgetsCenter } from "@v-editor/widgets-center"
import { BaseState } from "../../store"
import { EditorActions } from "../../store/editorReducer"
import WidgetStore from "./widget-store"

const { actAddItem } = EditorActions

const WidgetsList: FC<{
	widgetsCenter: WidgetsCenter,
	dispatch: Dispatch,
	currHistory: { path: string },
	createWidgetConfig: (name: string) => WidgetConfig,
	allWidgets: WidgetPackage[]
}> = ({ createWidgetConfig, dispatch, allWidgets, currHistory }) => {
	const [open, setOpen] = useState(false)

	const addWidget = (name: string) => {
		const widgetConfig = createWidgetConfig(name)
		if (widgetConfig) {
			widgetConfig.routeInfo.path = [currHistory.path]
			dispatch(actAddItem(widgetConfig))
		} else {
			notification.info({
				message: "未知错误，没有找到组件"
			})
		}
	}

	return (
		<div className="widgets">
			<div>
				组件列表
				<Button variant="contained" onClick={ setOpen.bind(null, true) }>获取组件</Button>
			</div>
			<div className="widgets-list flex jb">
				{
					allWidgets.map(({ getDescription, FC }, i) => {
						const description = getDescription();
						return <Tooltip key={ i } title={ description.description || description.showName } color="blue" placement="right">
							<div
								className="widgets-list-item" onClick={ addWidget.bind(null, description.name) }
								onDragStart={ e => {
									e.dataTransfer.setData("name", description.name)
								} }
								draggable
							>
								{
									description.snapShot && <img className="sm-pic" src={ description.snapShot } alt={ description.name } />
								}
								<div>{ description.showName }</div>
								<ErrorCatch name={ description.showName }>
									<FC
										isDev={ true }
										{ ...description } pos={ { x: 0, y: 0, w: 80, h: 80 } } />
								</ErrorCatch>
							</div>
						</Tooltip>
					})
				}
			</div>

			<Modal
				open={ open }
				onClose={ setOpen.bind(null, false) }>
				<div className="modal">
					<WidgetStore />
				</div>
			</Modal>
		</div>
	)
}

export default connect(
	(state: BaseState) => {
		const { histories, currHistoryIdx } = state.editorReducer.workplace.renderConfig
		return {
			currHistory: histories[currHistoryIdx]
		}
	},
	dispatch => ({ dispatch })
)(WidgetsList)
