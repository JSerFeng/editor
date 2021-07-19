import { FC, useEffect, useRef, useState } from "react";
import { Dispatch } from "redux"
import {
	useHistory
} from "react-router-dom"
import { checkIfValidRenderConfig, RenderConfig } from "../../render/interfaces";
import { CircularProgress, Modal, Button, Grid } from "@material-ui/core"
import { Add, Delete } from "@material-ui/icons"
import { apiDeleteProject, apiGetAllProjects, ErrorCode } from "../../api";
import { connect } from "react-redux";
import { EditorActions } from "../../store/editorReducer";
import { Hover, HoverItem } from "../../components/hover";

import "./style.scss"
import { notification } from "antd";
import InitProject from "./InitProject";

const {
	actImportJson,
} = EditorActions

enum WorkState {
	Normal,
	Creating,
	Importing,
}

const HomePage: FC<{
	dispatch: Dispatch
}> = ({ dispatch }) => {
	const history = useHistory()
	const [workState, setWorkState] = useState(WorkState.Normal)
	const [projectList, setProjectList] = useState<{
		lastModify: string,
		renderConfig: RenderConfig
	}[] | null>(null)
	const fileRef = useRef<HTMLInputElement>(null)


	const reqProjectList = async () => {
		const res = await apiGetAllProjects()
		if (res.code !== ErrorCode.Success) {
			return
		}
		setProjectList(res.data.projectList)
	}

	useEffect(() => {
		reqProjectList()
	}, [])

	const openProject = (renderConfig: RenderConfig) => {
		dispatch(actImportJson(renderConfig))
		history.push("/editor" + renderConfig.histories[renderConfig.currHistoryIdx].path)
	}


	const handleDelete = async (projectName: string) => {
		await apiDeleteProject(projectName)
		await reqProjectList()
	}

	return projectList
		? (
			<div className="home-page">
				<div className="home-main">
					<Grid container justify="center">
						<Button
							color="primary"
							className="new-project flex ac jc"
							onClick={ setWorkState.bind(null, WorkState.Creating) }
						>
							<Add style={ {
								fontSize: "2em"
							} } />
							<span className="ali-font">新项目</span>
						</Button>
					</Grid>
					<Grid container justify="center">
						<Button
							variant="contained"
							color="primary"
							onClick={ () => {
								fileRef.current!.click()
							} }
						>
							从本地导入
							<input
								ref={ fileRef }
								className="hidden"
								type="file"
								onChange={ async (e) => {
									const file = e.target.files?.[0]
									if (!file) { return }
									let renderConfig = JSON.parse(await file.text())
									if ((renderConfig = checkIfValidRenderConfig(renderConfig))) {
										openProject(renderConfig)
									} else {
										notification.warn({
											message: "该文件不满足条件"
										})
									}
								} } />
						</Button>
					</Grid>

					<div style={ { fontSize: "14px" } }>本地保存的项目</div>
					<div className="project-list">
						{
							projectList.map((item, i) => (
								<Hover key={ i }>
									<div
										className="item flex jb ac"
										key={ i }
										onClick={ openProject.bind(null, item.renderConfig) }
									>
										<div className="item-info">
											<div className="project-name">{ item.renderConfig.projectName }</div>
											<div className="project-time">最后保存时间: { item.lastModify }</div>
										</div>
										<HoverItem>
											<div
												className="delete flex jc ac"
												onClick={ e => {
													e.stopPropagation()
													handleDelete(item.renderConfig.projectName)
												} }
											>
												<Delete
													style={ {
														fontSize: "1.5em"
													} } />
											</div>
										</HoverItem>
									</div>
								</Hover>
							))
						}
					</div>
				</div>

				<Modal
					open={ workState === WorkState.Creating }
					onClose={ setWorkState.bind(null, WorkState.Normal) }
				>
					<div
						className="modal"
						style={ {
							width: "30%",
							height: "fit-content"
						} }
					>
						<InitProject />
					</div>
				</Modal>
			</div>
		)
		: (
			<div className="flex jc ac">
				<CircularProgress />
			</div>
		)
}

export default connect()(HomePage)
