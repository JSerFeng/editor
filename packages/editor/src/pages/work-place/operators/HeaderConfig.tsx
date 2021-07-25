import { FC, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { EditorActions, Tools } from "../../../store/editorReducer";
import {
	Undo,
	Redo,
	PanTool,
	NearMe,
	Add,
	SaveOutlined,
	Build,
	Settings,
	Visibility
} from '@material-ui/icons';
import { BaseState } from "../../../store";
import {
	Button,
	Modal,
	Select,
	MenuItem,
	IconButton,
	Input,
} from "@material-ui/core";
import { Tooltip } from "antd"
import { RenderConfig } from "../../../render/interfaces";
import {
	useHistory
} from "react-router-dom"
import { apiSave, ErrorCode } from "../../../api";
import { notification } from "antd";

const {
	actUndo,
	actRedo,
	actSelectTool,
	actChangeHistory,
	actAddPage
} = EditorActions

const tools = [
	{ Icon: NearMe, type: Tools.Select, title: "选择" },
	{ Icon: PanTool, type: Tools.Drag, title: "移动画布" },
]

enum WorkState {
	Normal,
	ImportJSON,
	ExportJSON,
	CreatingNewPage,
}

const HeaderConfig: FC<{
	dispatch: Dispatch,
	workPlace: BaseState["editorReducer"]["workplace"],
	renderConfig: RenderConfig,
	histories: { path: string }[],
	currHistoryIdx: number,
	openDrawer: () => void,
	pid: string
}> = ({ dispatch, workPlace, renderConfig, histories, currHistoryIdx, openDrawer, pid }) => {
	const router = useHistory()
	const [path, setPath] = useState(histories[currHistoryIdx].path)
	const [workState, setWorkState] = useState(WorkState.Normal)


	const handleSave = async () => {
		const { code, msg } = await apiSave(
			renderConfig.projectName,
			JSON.stringify(renderConfig),
			pid
		)
		if (code !== ErrorCode.Success) {
			notification.warn({
				message: "保存失败 " + msg
			})
		} else {
			notification.success({
				message: "保存成功 "
			})
		}
	}

	const handleNewPage = () => {
		dispatch(actAddPage(path))
		dispatch(actChangeHistory(-1))
		setWorkState(WorkState.Normal)
		router.push("/editor" + path)
	}

	return (
		<header className="header-config pointer flex ac jb">
			<div className="tools flex ac">
				{
					tools.map(({ Icon, type, title }) => {
						return <Tooltip key={ type } placement="bottom" title={ title } color="blue">
							<div
								className={
									"tool-item flex jc ac " + (workPlace.selectedTool === type
										? "active" : "")
								}
								onClick={ () => {
									dispatch(actSelectTool(
										workPlace.selectedTool === type ? null : type
									))
								} }	>
								<Icon />
							</div>
						</Tooltip>
					})
				}
				<Tooltip placement="bottom" title="撤销(ctrl+z)">
					<div className="tool-item flex jc ac "><Undo onClick={ dispatch.bind(null, actUndo()) } /></div>
				</Tooltip>
				<Tooltip placement="bottom" title="取消撤销(ctrl+shift+z)">
					<div className="tool-item flex jc ac "><Redo onClick={ dispatch.bind(null, actRedo()) } /></div>
				</Tooltip>
			</div>

			<div style={ {
				maxWidth: "50%"
			} }>
				<div>
					{
						`http://${workPlace.renderConfig.projectName + (workPlace.renderConfig.routerMode === "hash"
							? "/#"
							: "")
						}`
					}
					<Select
						autoWidth
						native={ false }
						value={ currHistoryIdx }
						onChange={ e => {
							const idx = e.target.value as number
							dispatch(actChangeHistory(idx))
							router.push("/editor" + histories[idx].path)
						} }>
						{
							histories.map(({ path }, i) => (
								<MenuItem value={ i } key={ i }>
									<div className="flex jb ac">
										<div style={ {
											marginRight: "50px"
										} }>{ path }</div>
									</div>
								</MenuItem>
							))
						}
					</Select>
					<IconButton onClick={ setWorkState.bind(null, WorkState.CreatingNewPage) }>
						<Add
							color="primary"
							style={ {
								fontSize: "2em"
							} } />
					</IconButton>
				</div>
			</div>

			<div>
				<Tooltip
					placement="bottom"
					title="生成代码">
					<IconButton
						color="primary"
						onClick={ () => {
							router.push("/generator")
						} }>
						<Build style={ { fontSize: "2rem" } } />
					</IconButton>
				</Tooltip>
				<Tooltip
					placement="bottom"
					title="保存">
					<IconButton
						color="primary"
						onClick={ handleSave.bind(null, renderConfig) }
					>
						<SaveOutlined style={ { fontSize: "2rem" } } />
					</IconButton>
				</Tooltip>
				<Tooltip
					placement="bottom"
					title="预览"
				>
					<IconButton
						onClick={ () => {
							router.push("/preset")
						} }
					>
						<Visibility
							color="primary"
							style={ {
								fontSize: "1.5em"
							} } />
					</IconButton>
				</Tooltip>
				<Tooltip
					placement="bottom"
					title="项目设置">
					<IconButton
						onClick={ openDrawer }>
						<Settings style={ { fontSize: "1.5em" } } />
					</IconButton>
				</Tooltip>
			</div>

			<Modal
				open={ workState === WorkState.CreatingNewPage }
				onClose={ setWorkState.bind(null, WorkState.Normal) }
			>
				<div className="modal" style={ {
					width: "fit-content",
					height: "fit-content"
				} }>
					<div>
						页面路径: &nbsp;
						<Input value={ path } onChange={ e => {
							setPath(e.target.value)
						} } />
					</div>
					<Button variant="contained" color="primary" onClick={ handleNewPage }>创建</Button>
				</div>
			</Modal>
		</header>
	)
}

export default connect(
	(state: BaseState) => {
		const { workplace, pid } = state.editorReducer
		const { renderConfig } = workplace
		const { histories, currHistoryIdx } = renderConfig

		return {
			workPlace: workplace,
			renderConfig: renderConfig,
			histories,
			currHistoryIdx,
			pid
		}
	}
)(HeaderConfig)
