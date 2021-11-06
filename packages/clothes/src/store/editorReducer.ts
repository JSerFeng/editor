import produce from 'immer'
import { Reducer } from 'redux'
import { RenderConfig, WidgetConfig } from '../render/interfaces'
import { WritableDraft } from 'immer/dist/internal'
import { deepCopy, StickFlags } from '../utils'
import { apiSave } from '../api'
import type { GetActionTypes } from "."
import { ServiceTypes } from './serviceReducer'

//不要将这个AC从index引入，会引起循环依赖问题导致报错
export const AC = <T extends Types | ServiceTypes, P = null>(type: T, payload: P): { type: T, payload: P } => ({ type, payload })

/**最大撤销步数 */
const UNDO_LIMIT = 20
export interface Pos { //画布位置坐标信息
	w: number,
	h: number,
	x: number,
	y: number
}

type MemoState = Pick<BaseState["workplace"], "renderConfig" | "selectedIndex" | "selectArea" | "selectedTool">

export enum MessageType {
	WARN = "warnCount",
	ERROR = "errorCount",
	TIP = "tipCount",
}

export type Message = {
	type: MessageType,
	text: string,
}
export interface BaseState {
	workplace: {
		renderConfig: RenderConfig, //全局最终配置
		currPageWidgets: WidgetConfig[],
		selectedIndex: number[] | null
		canvas: { // 页面在画布中的位置坐标信息
			x: number,
			y: number,
			scale: number //缩放
			centerPosition: { x: number, y: number, scale: number }
		},
		selectArea: Pos,
		undoStack: MemoState[],
		redoStack: MemoState[],
		selectedTool: Tools | null,
		tmpPos: Pos[] /**暂存一些位置信息，用与多选在整体移动时，记住开始移动的位置 */,
		refLine: {
			stickFlag: StickFlags,
			stickPx: number,
			showPx: number,
		}
	},
	pid: string,
	wid: string,
	messages: {
		total: number,
		warnCount: number,
		errorCount: number,
		tipCount: number,
		list: Message[]
	}
}

export enum Types {
	//消息和通知
	NewMessage = "NewMessage",
	RemoveMessage = "RemoveMessage",

	//编辑器相关
	NewProject = "NewProject",
	ProjectName = "ProjectName",
	RenderConfig = "RenderConfig",
	SelectMultiple = "SelectMultiple",
	SelectOne = "SelectOne",
	AddItem = "AddItem",
	WidgetConfig = "WidgetConfig",
	ChangeWidgetShowInPage = "ChangeWidgetShowInPage",
	SetProjectId = "SetProjectId",
	SetWid = "SetWid",

	//添加移除依赖
	AddWidgetDep = "AddWidgetDep",
	RemoveWidget = "RemoveWidget",

	ChangeCanvasWH = "ChangeCanvasWH",

	StartWidgetChange = "StartWidgetChange",
	ChangeWidgetPos = "ChangeWidgetPos",
	CommitWidgetPosChange = "CommitWidgetPosChange",

	DeleteItem = "DeleteItem",
	CopySelected = "CopySelected",
	ResetDraw = "ResetDraw",
	ChangeWorkingPos = "ChangeWorkingPos",
	Undo = "Undo",
	Redo = "Redo",
	MoveCanvasToCenter = "MoveCanvasToCenter",
	SetInitCanvasPos = "SetInitCanvasPos",
	SelectTools = "SelectTools",

	StickFlags = "StickFlags",
	StickPx = "StickPx",
	ShowPx = "ShowPx",

	ExportJson = "ExportJson",
	ImportJson = "ImportJson",

	/**路由 */
	ChangeHistory = "ChangeHistory",
	AddPath = "AddPath",
	DeleteHistory = "DeleteHistory",
	ChangeRouterMode = "ChangeRouterMode",

	ChangeWidgetPath = "ChangeWidgetPath",
	ChangeWidgetExact = "ChangeWidgetExact",
}

/**编辑器可选择工具 */
export enum Tools {
	Drag = "Drag",
	Select = "Select"
}

export const EditorActions = {
	newMessage(type: MessageType, text: string) {
		return AC<Types.NewMessage, Message>(Types.NewMessage, { type, text })
	},
	removeMessage(type: MessageType, idx: number) {
		return AC(Types.RemoveMessage, { type, idx })
	},

	actNewProject: (
		projectName: string,
		pos: { w: number, h: number }
	) => {
		const renderConfig = deepCopy(defaultConfig)
		renderConfig.projectName = projectName
		renderConfig.pos = pos
		return AC<Types.NewProject, RenderConfig>(Types.NewProject, renderConfig)
	},
	actAddWidgetDep: (wid: string) => AC(Types.AddWidgetDep, wid),
	actRemoveWidget: (wid: string) => AC(Types.RemoveWidget, wid),
	actWid: (wid: string) => AC(Types.SetWid, wid),
	actPid: (pid: string) => AC(Types.SetProjectId, pid),
	actProjectName: (name: string) => AC(Types.ProjectName, name),
	actSelect: (indexes: number[] | null) => AC(Types.SelectMultiple, indexes),
	actSelectOne: (idx: number | null) => AC(Types.SelectOne, idx),
	actChangeCanvasWH: (pos: { w: number, h: number }) => AC(Types.ChangeCanvasWH, pos),
	actAddItem: (config: WidgetConfig) => AC(Types.AddItem, config),
	actWidgetConfig: (config: WidgetConfig) => AC(Types.WidgetConfig, config),
	actChangeWidgetShowInPage: (idx: number, show: boolean) => AC(Types.ChangeWidgetShowInPage, {
		idx,
		show
	}),

	actStartWidgetPos: (initPos: Pos) => AC(Types.StartWidgetChange, initPos),
	actChangeWidgetPos: (deltaX: number, deltaY: number) => AC(Types.ChangeWidgetPos, { deltaX, deltaY }),
	actCommitChangeWidgetPos: (pos: Pos) => AC(Types.CommitWidgetPosChange, pos),

	actDeleteItems: () => AC(Types.DeleteItem, null),
	actCopySelectedItems: () => AC(Types.CopySelected, null),
	actResetDraw: () => AC(Types.ResetDraw, null),
	actChangeWorkingPos: (pos: { x: number, y: number, scale: number }) => AC(Types.ChangeWorkingPos, pos),
	actUndo: () => AC(Types.Undo, null),
	actRedo: () => AC(Types.Redo, null),
	actMoveCanvasToCenter: () => AC(Types.MoveCanvasToCenter, null),
	actSetInitCanvasPos: (pos: { x: number, y: number, scale: number }) => AC(Types.SetInitCanvasPos, pos),
	actSelectTool: (tool: Tools | null) => AC(Types.SelectTools, tool),

	actStickFlags: (stickFlags: StickFlags) => AC(Types.StickFlags, stickFlags),
	actStickPx: (px: number) => AC(Types.StickPx, px),
	actShowPx: (px: number) => AC(Types.ShowPx, px),

	actImportJson: (renderConfig: RenderConfig) => AC(Types.ImportJson, renderConfig),

	actChangeHistory: (historyIdx: number) => AC(Types.ChangeHistory, historyIdx),
	actAddPage: (path: string) => AC(Types.AddPath, path),
	actChangeWidgetPath: (path: string[]) => AC(Types.ChangeWidgetPath, path),
	actRouterMode: (mode: "history" | "hash") => AC(Types.ChangeRouterMode, mode),
	actChangeWidgetExact: (exact: boolean) => AC(Types.ChangeWidgetExact, exact),
	actDeleteHistory: (idx: number) => AC(Types.DeleteHistory, idx)
}

const defaultConfig: RenderConfig = {
	projectName: "my-app",
	widgets: [],
	pos: { w: 400, h: 600 },
	routerMode: "history",
	histories: [{ path: "/" }],
	currHistoryIdx: 0,
	dependencies: [],
}

const defaultBaseEditorState: BaseState = {
	workplace: {
		renderConfig: defaultConfig,
		currPageWidgets: [],
		selectedIndex: null,
		canvas: {
			x: 0,
			y: 0,
			scale: 1.0,
			centerPosition: { x: 0, y: 0, scale: 1.0 },
		},
		selectArea: { x: 0, y: 0, w: 0, h: 0 },
		undoStack: [],
		redoStack: [],
		selectedTool: null,
		tmpPos: [],
		refLine: {
			stickFlag: StickFlags.STICK_COL | StickFlags.STICK_ROW,
			stickPx: 5,
			showPx: 20,
		}
	},
	pid: "",
	wid: "",
	messages: {
		total: 3,
		warnCount: 1,
		errorCount: 1,
		tipCount: 1,
		list: [
			{
				type: MessageType.ERROR,
				text: "内部错误"
			}, {
				type: MessageType.WARN,
				text: "网络异常"
			}, {
				type: MessageType.TIP,
				text: "欢迎你欢迎你欢迎你欢迎你欢迎你欢迎你欢迎你欢迎你欢迎你欢迎你欢迎你欢迎你欢迎你欢迎你欢迎你欢迎你欢迎你欢迎你欢迎你欢迎你欢迎你欢迎你欢迎你欢迎你欢迎你欢迎你欢迎你欢迎你欢迎你欢迎你欢迎你欢迎你欢迎你欢迎你欢迎你欢迎你欢迎你"
			}
		]
	}
}

const editorReducer: Reducer<BaseState, GetActionTypes<typeof EditorActions>> = produce((state = defaultBaseEditorState, action) => {
	let needSave = false
	/**检查是否需要存入撤销栈 */
	switch (action.type) {
		case Types.NewProject: {
			//新建项目需要清空撤销栈
			state.workplace.undoStack = []
			state.workplace.redoStack = []
			break
		}
		case Types.Undo: {
			const { renderConfig, selectArea, selectedIndex, selectedTool } = state.workplace
			const memoState = state.workplace.undoStack.pop()
			if (memoState) {
				state.workplace.renderConfig = memoState.renderConfig
				state.workplace.selectedIndex = memoState.selectedIndex
				state.workplace.selectedTool = memoState.selectedTool
				state.workplace.selectArea = memoState.selectArea
				state.workplace.redoStack.push(deepCopy({
					renderConfig, selectArea, selectedIndex, selectedTool
				}))
				if (state.workplace.undoStack.length > UNDO_LIMIT) {
					state.workplace.undoStack.shift()
				}
			}
			return
		}
		case Types.Redo: {
			const { renderConfig, selectArea, selectedIndex, selectedTool } = state.workplace
			const memoState = state.workplace.redoStack.pop()
			if (memoState) {
				state.workplace.renderConfig = memoState.renderConfig
				state.workplace.selectedIndex = memoState.selectedIndex
				state.workplace.selectedTool = memoState.selectedTool
				state.workplace.selectArea = memoState.selectArea

				state.workplace.undoStack.push(deepCopy({
					renderConfig, selectArea, selectedIndex, selectedTool
				}))
			}
			return
		}
		/**需要存状态的情况 */
		case Types.CopySelected:
		case Types.AddItem:
		case Types.DeleteItem:
		case Types.ResetDraw:
		case Types.WidgetConfig:
		case Types.StartWidgetChange:
		case Types.CommitWidgetPosChange:
			const { renderConfig, selectArea, selectedIndex, selectedTool } = state.workplace
			state.workplace.undoStack.push(deepCopy({
				renderConfig, selectArea, selectedIndex, selectedTool
			}))
			if (state.workplace.redoStack.length) {
				state.workplace.redoStack.length = 0
				state.workplace.redoStack = []
			}
			needSave = true
	}

	switch (action.type) {
		case Types.NewMessage: {
			const msg = action.payload
			state.messages.list.push(msg)
			state.messages.total++
			state.messages[msg.type]++
			break
		}
		case Types.RemoveMessage: {
			const { type, idx } = action.payload
			state.messages.list.splice(idx, 1)
			state.messages.total--
			state.messages[type]--
			break
		}
		case Types.AddWidgetDep: {
			state.workplace.renderConfig.dependencies.push(action.payload)
			break
		}
		case Types.RemoveWidget: {
			const idx = state.workplace.renderConfig.dependencies.indexOf(action.payload)
			if (idx !== -1) {
				state.workplace.renderConfig.dependencies.splice(idx, 1)
			}
			break
		}
		case Types.NewProject: {
			state.workplace.renderConfig = action.payload
			break
		}
		case Types.SetProjectId: {
			state.pid = action.payload
			break
		}
		case Types.SetWid: {
			state.wid = action.payload
			break
		}
		case Types.ProjectName: {
			state.workplace.renderConfig.projectName = action.payload
			break
		}
		case Types.SelectOne: {
			const idx = action.payload
			if (idx !== null) {
				if (
					state.workplace.selectedIndex?.length === 1 &&
					state.workplace.selectedIndex[0] === idx
				) {
					return
				}
				state.workplace.selectedIndex = [idx]
			} else {
				state.workplace.selectedIndex = null
			}
			break
		}
		case Types.SelectMultiple: {
			const idxes = action.payload
			if (idxes) {
				state.workplace.selectedIndex = idxes
			} else {
				state.workplace.selectedIndex = null
			}
			break
		}
		case Types.WidgetConfig: {
			const indexes = state.workplace.selectedIndex
			if (!indexes || indexes.length !== 1) return
			const idx = indexes[0]
			state.workplace.renderConfig.widgets[idx] = action.payload as WritableDraft<WidgetConfig>
			break
		}
		case Types.ChangeCanvasWH: {
			const renderConfig = state.workplace.renderConfig
			const { pos: prev } = renderConfig
			const deltaX = (action.payload.w - prev.w) / 2
			const deltaY = (action.payload.h - prev.h) / 2

			renderConfig.pos = action.payload
			renderConfig.widgets.forEach(({ pos }) => {
				pos.x += deltaX
				pos.y += deltaY
			})
			break
		}
		case Types.StartWidgetChange: {
			state.workplace.selectArea = action.payload
			state.workplace.tmpPos = state.workplace.renderConfig.widgets.map(
				item => item.pos
			)
			break
		}
		case Types.ChangeWidgetPos: {
			const { deltaX, deltaY } = action.payload
			const { tmpPos, renderConfig: { widgets }, selectedIndex } = state.workplace
			if (selectedIndex) {
				for (const index of selectedIndex) {
					widgets[index].pos.x = tmpPos[index].x + deltaX
					widgets[index].pos.y = tmpPos[index].y + deltaY
				}
			}
			break
		}
		case Types.ChangeWidgetShowInPage: {
			const { idx, show } = action.payload
			state.workplace.renderConfig.widgets[idx].showInPage = show
			break
		}
		case Types.CommitWidgetPosChange: {
			state.workplace.selectArea = action.payload
			break
		}
		case Types.AddItem: {
			state.workplace.renderConfig.widgets.push(action.payload as WritableDraft<WidgetConfig>)
			break
		}
		case Types.DeleteItem: {
			let indexes: number[] | null
			if ((indexes = state.workplace.selectedIndex)) {
				indexes.sort((a, b) => b - a)
				indexes.forEach(idx => {
					state.workplace.renderConfig.widgets.splice(idx, 1)
				});
			}
			break
		}
		case Types.CopySelected: {
			let indexes: number[] | null
			if ((indexes = state.workplace.selectedIndex)) {
				indexes.forEach((idx) => {
					const widgets = state.workplace.renderConfig.widgets
					const widget = widgets[idx]
					if (widget) {
						widgets.push(widget)
					}
				})
			}
			break
		}
		case Types.ResetDraw: {
			state.workplace.selectedIndex = null
			state.workplace.renderConfig.widgets.length = 0
			state.workplace.renderConfig.widgets = []
			break
		}
		case Types.ChangeWorkingPos: {
			const { x, y, scale } = action.payload
			state.workplace.canvas.x = x
			state.workplace.canvas.y = y
			state.workplace.canvas.scale = scale
			break
		}
		case Types.SetInitCanvasPos: {
			state.workplace.canvas.centerPosition = action.payload
			break
		}
		case Types.MoveCanvasToCenter: {
			const { w, h } = state.workplace.renderConfig.pos
			const { offsetWidth, offsetHeight } = document.documentElement
			state.workplace.canvas.x = offsetWidth / 2 - w / 2
			state.workplace.canvas.y = offsetHeight / 2 - h / 2
			state.workplace.canvas.scale = 1
			break
		}
		case Types.SelectTools: {
			state.workplace.selectedTool = action.payload
			break
		}
		case Types.StickFlags: {
			state.workplace.refLine.stickFlag = action.payload
			break
		}
		case Types.StickPx: {
			state.workplace.refLine.stickPx = action.payload
			break
		}
		case Types.ShowPx: {
			state.workplace.refLine.showPx = action.payload
			break
		}
		case Types.ImportJson: {
			state.workplace.renderConfig = action.payload
			break
		}
		case Types.ChangeHistory: {
			state.workplace.renderConfig.currHistoryIdx = action.payload === -1
				? state.workplace.renderConfig.histories.length - 1
				: action.payload
			state.workplace.selectArea = { x: 0, y: 0, w: 0, h: 0 }
			state.workplace.selectedIndex = null
			break
		}
		case Types.AddPath: {
			state.workplace.renderConfig.histories.push({
				path: action.payload,
			})
			break
		}
		case Types.ChangeWidgetExact: {
			const { selectedIndex, renderConfig } = state.workplace
			if (selectedIndex) {
				for (const idx of selectedIndex) {
					renderConfig.widgets[idx].routeInfo.exact = action.payload
				}
			}
			break
		}
		case Types.ChangeWidgetPath: {
			const { selectedIndex, renderConfig } = state.workplace
			if (selectedIndex) {
				for (const idx of selectedIndex) {
					renderConfig.widgets[idx].routeInfo.path = action.payload
				}
			}
			break
		}
		case Types.ChangeRouterMode: {
			state.workplace.renderConfig.routerMode = action.payload
			break
		}
		case Types.DeleteHistory: {
			state.workplace.renderConfig.histories.splice(action.payload, 1)
		}
	}

	const renderConfig = state.workplace.renderConfig
	if (needSave) {
		apiSave(renderConfig.projectName, JSON.stringify(renderConfig), state.pid)
	}
}, defaultBaseEditorState)

export default editorReducer
