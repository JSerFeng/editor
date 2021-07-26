import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { Dispatch } from "redux"
import { useHistory } from "react-router-dom"
import { checkIfValidRenderConfig, RenderConfig, sureStrToRenderConfig } from "../../render/interfaces";
import {
	CircularProgress,
	Modal,
	Button,
	Grid,
	ButtonBase,
	Zoom,
} from "@material-ui/core"
import { Pagination } from "@material-ui/lab"
import { Add, Delete } from "@material-ui/icons"
import { apiAddProject, apiDropProject, apiGetUserProjects, ErrorCode, ProjectPO } from "../../api";
import { connect } from "react-redux";
import { EditorActions } from "../../store/editorReducer";
import { Hover, HoverItem } from "../../components/hover";
import { notification } from "antd";
import InitProject from "./InitProject";
import { QUERY_PAGE_NUM } from "../../constants/common";

import "./style.scss"

const {
	actImportJson,
	actPid,
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
	const [query, setQuery] = useState({
		page: 1,
		num: QUERY_PAGE_NUM,
		totalNum: 0,
		totalPages: 0
	})
	const [workState, setWorkState] = useState(WorkState.Normal)
	const [projectList, setProjectList] = useState<ProjectPO[] | null>(null)
	const fileRef = useRef<HTMLInputElement>(null)

	const reqProjectList = async () => {
		const res = await apiGetUserProjects(query)
		if (res.code !== ErrorCode.Success) {
			return
		}
		setProjectList(res.data.projects)
		setQuery(res.data.pagination)
	}

	const openProject = (renderConfig: RenderConfig, pid: string) => {
		dispatch(actImportJson(renderConfig))
		console.log(renderConfig.dependencies)
		dispatch(actPid(pid))
		history.push("/editor" + renderConfig.histories[renderConfig.currHistoryIdx].path)
	}

	const handleDelete = async (pid: string) => {
		const res = await apiDropProject(pid)
		if (res.code !== ErrorCode.Success) {
			return
		}
		await reqProjectList()
	}

	const handleImportLocal = async (e: ChangeEvent) => {
		const file = (e.target as HTMLInputElement).files?.[0]
		if (!file) { return }
		const rawStr = await file.text()
		let renderConfig: RenderConfig | null = sureStrToRenderConfig(rawStr)
		if ((renderConfig = checkIfValidRenderConfig(renderConfig))) {
			const res = await apiAddProject(renderConfig.projectName, rawStr)
			if (res.code !== ErrorCode.Success) {
				return
			}
			openProject(renderConfig, res.data.pid)
		} else {
			notification.warn({
				message: "该文件不满足条件"
			})
		}
	}

	useEffect(() => {
		reqProjectList()
	}, [])

	return projectList
		? (
			<div className="home-page">
				<div className="home-main">
					<Grid container justifyContent="center">
						<Button
							color="primary"
							className="new-project flex ac jc"
							onClick={ setWorkState.bind(null, WorkState.Creating) }>
							<Add style={ {
								fontSize: "1.5em"
							} } />
							<span className="ali-font">新项目</span>
						</Button>
					</Grid>
					<Grid container justifyContent="center">
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
								onChange={ handleImportLocal } />
						</Button>
					</Grid>

					<div style={ { fontSize: "14px" } }>本地保存的项目</div>
					<div className="project-list">
						{
							projectList.map((item, i) => {
								const projConfig = sureStrToRenderConfig(item.renderConfigStr)
								return (
									<Hover key={ i }>
										<ButtonBase
											className="item flex jb ac"
											onClick={ openProject.bind(null, projConfig, item._id) }>
											<div className="item-info">
												<div className="project-name">
													{ projConfig.projectName }
												</div>
												<div className="project-time">最后保存时间: { item.lastModified }</div>
											</div>
											<HoverItem>
												<div
													className="delete flex jc ac"
													onClick={ e => {
														e.stopPropagation()
														handleDelete(item._id)
													} }>
													<Delete
														style={ {
															fontSize: "1.5em"
														} } />
												</div>
											</HoverItem>
										</ButtonBase>
									</Hover>
								)
							})
						}
					</div>
					{
						query.totalPages > 0
							? <Pagination count={ query.totalPages } color="primary" />
							: (
								<div>
									无项目
								</div>
							)
					}
				</div>

				<Modal
					open={ workState === WorkState.Creating }
					onClose={ setWorkState.bind(null, WorkState.Normal) }>
					<div className="modal">
						<Zoom
							in={ workState === WorkState.Creating }>
							<div>
								<InitProject />
							</div>
						</Zoom>
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
