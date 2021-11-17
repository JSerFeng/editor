import { Grid, Input, Select, MenuItem, Button, Modal } from "@material-ui/core"
import { notification } from "antd"
import { FC, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { checkIfValidRenderConfig, RenderConfig } from "@v-editor/widgets-center"
import { BaseState } from "../../../store"
import { EditorActions } from "../../../store/editorReducer"
import FileExplorer from "../../../components/file-explorer"

import "./style.scss"
import { apiExportJSON, ErrorCode } from "../../../api"


const {
	actImportJson
} = EditorActions

const {
	actProjectName,
	actRouterMode
} = EditorActions

enum WorkState {
	Normal,
	ExportJSON
}

const ProjectConfig: FC<{
	dispatch: Dispatch
	workplace: BaseState["editorReducer"]["workplace"]
}> = ({ dispatch, workplace }) => {
	const [workState, setWorkState] = useState(WorkState.Normal)
	const { renderConfig } = workplace
	const handleImportJson = async (renderConfig: RenderConfig) => {
		dispatch(actImportJson(renderConfig))
	}

	const handleExportJSON = async (dir: string) => {
		const { code } = await apiExportJSON(dir, renderConfig)
		if (code !== ErrorCode.Success) {
			notification.warn({
				message: "导出JSON失败"
			})
			return
		}
		notification.success({
			message: "导出JSON成功"
		})
	}

	return (
		<>
			<div className="project-config">
				<Grid container spacing={ 2 }>
					<Grid item xs={ 6 }>
						项目名
					</Grid>
					<Grid item xs={ 6 }>
						<Input
							fullWidth
							value={ workplace.renderConfig.projectName }
							placeholder="项目名"
							onChange={
								(e) => {
									dispatch(actProjectName(e.target.value))
								}
							}
						/>
					</Grid>
					<Grid item xs={ 6 }>路由模式</Grid>
					<Grid item xs={ 6 }>
						<Select
							fullWidth
							value={ workplace.renderConfig.routerMode }
							onChange={ e => {
								dispatch(actRouterMode(e.target.value as "history" | "hash"))
							} }
						>
							<MenuItem value="history">history模式</MenuItem>
							<MenuItem value="hash">hash模式</MenuItem>
						</Select>
					</Grid>
					<Grid container>
						<Button
							variant="outlined" color="primary"
							onClick={ handleImportJson.bind(null, renderConfig) }
						>
							<label>
								导入
								<input
									className="hidden"
									type="file"
									onChange={ async (e) => {
										const file = e.target.files?.[0]
										if (!file) { return }
										let renderConfig = JSON.parse(await file.text())
										if ((renderConfig = checkIfValidRenderConfig(renderConfig))) {
											handleImportJson(renderConfig)
										} else {
											notification.warn({
												message: "该文件不满足条件"
											})
										}
									} } />
							</label>
						</Button>
						<Button
							variant="outlined"
							color="primary"
							onClick={ setWorkState.bind(null, WorkState.ExportJSON) }
						>
							导出
						</Button>
					</Grid>
				</Grid>
			</div>
			<Modal
				open={ WorkState.ExportJSON === workState }
				onClose={ () => {
					setWorkState(WorkState.Normal)
				} }
			>
				<div className="modal">
					<FileExplorer
						onConfirm={ (dir) => {
							setWorkState(WorkState.Normal)
							handleExportJSON(dir)
						} } />
				</div>
			</Modal>
		</>
	)
}

export default connect(
	(state: BaseState) => {
		return {
			workplace: state.editorReducer.workplace
		}
	}
)(ProjectConfig)
