import {
	ComponentClass,
	FC,
	useEffect,
	useRef,
	useState,
	MouseEvent as ReactMouseEvent
} from 'react';
import RenderWidget from './RenderWidget';
import { connect } from 'react-redux';
import { BaseState } from '../store';
import { Dispatch } from "redux"
import { fromEvent } from 'rxjs';
import {
	tap,
	filter,
	switchMapTo,
	switchMap,
	takeUntil,
	map,
} from 'rxjs/operators';
import { EditorActions, Tools } from '../store/editorReducer';
import { normalizePos, Pos, WidgetConfig, WidgetProps } from './interfaces';
import produce from 'immer';
import EventEmitter from '../utils/eventEmitter';
import { createRefLine, getOffsetLeft, getOffsetTop, RefLine } from '../utils';

import "./style.scss"


const MENU_WIDTH = 100
const MENU_HEIGHT = 140

const {
	actSelect,
	actDeleteItems,
	actChangeWorkingPos,
	actCopySelectedItems,
	actSetInitCanvasPos,
	actUndo,
	actRedo,
	actChangeWidgetPos,
	actStartWidgetPos,
	actCommitChangeWidgetPos,
	actAddItem
} = EditorActions

const mouseMove$ = fromEvent(document, "mousemove")
const mouseClick$ = fromEvent(document, "click")
const mouseUp$ = fromEvent(document, "mouseup")
const keyDown$ = fromEvent(window, "keydown")
const keyUp$ = fromEvent(window, "keyup")
const keyZ$ = keyDown$.pipe(filter(e => (e as KeyboardEvent).key.toUpperCase() === "Z"))
let shiftOn = false
const shift$ = keyDown$.pipe(
	filter(e => (e as KeyboardEvent).key === "Shift"),
)
const shiftUp$ = keyUp$.pipe(
	filter(e => (e as KeyboardEvent).key === "Shift"),
)
const mouseWheel$ = fromEvent(window, "mousewheel")
const cmd$ = keyDown$.pipe(filter(e => (e as KeyboardEvent).key === "Control"))
const cmdUp$ = keyUp$.pipe(filter(e => (e as KeyboardEvent).key === "Control"))
const alt$ = keyDown$.pipe(filter(e => (e as KeyboardEvent).key === "Alt"))

const initStyle = {
	left: "50%",
	top: "50%",
	width: "100%",
	height: "100%",
	transform: "translate(-50%, -50%)"
}

const Renderer: FC<{
	workplace: BaseState["editorReducer"]["workplace"],
	dispatch: Dispatch,
	createWidgets: (config: WidgetConfig | string) => FC<WidgetProps> | ComponentClass<WidgetProps> | null,
	createWidgetConfig: (name: string, pos?: Pos) => WidgetConfig,
	eventPool: EventEmitter
}> = (props) => {
	const [menuVisible, setMenuVisible] = useState(false)
	const [menuPos, setMenuPos] = useState<Pos>({ x: 0, y: 0, w: MENU_WIDTH, h: MENU_HEIGHT })
	const container = useRef<HTMLDivElement>(null)
	const bgRef = useRef<HTMLDivElement>(null)
	const {
		workplace,
		dispatch,
		createWidgets,
		eventPool,
		createWidgetConfig
	} = props
	const { canvas, renderConfig } = workplace
	const { pos, widgets } = renderConfig
	const { w, h } = pos

	/**refLines: [水平还是竖直, 相距, 是否是自己的坐标, 吸附后的横或纵坐标]  */
	const [refLines, setRefLines] = useState<RefLine[]>([])
	const [canvasPos, setCanvasPos] = useState(canvas)
	const [selectArea, setSelectArea] = useState({ x: 0, y: 0, w: 0, h: 0 })

	/**
	 * 这里必须用一个mutable的变量存，如果直接setState改状态，
	 * 一改useEffect就重新执行，拖动就会失效
	 */
	const initPos = useRef({ ...selectArea })
	const multiSelectRef = useRef<HTMLDivElement>(null)
	const selectedRef = useRef<HTMLDivElement>(null)

	const handleCopy = (e: ReactMouseEvent) => {
		e.stopPropagation()
		dispatch(actCopySelectedItems())
		setMenuVisible(false)
	}

	const handleDelete = (e: ReactMouseEvent) => {
		e.stopPropagation()
		dispatch(actDeleteItems())
		setMenuVisible(false)
	}

	/**控制右键菜单的消失 */
	useEffect(() => {
		const sub = mouseClick$.subscribe(() => {
			setMenuVisible(false)
		})

		return () => {
			sub.unsubscribe()
		}
	}, [])

	/**处理撤销和回退 */
	useEffect(() => {
		const subShiftUp = shiftUp$.subscribe(() => {
			shiftOn = false
		})
		const subShiftDown = shift$.subscribe(() => {
			shiftOn = true
		})
		const subUndo = cmd$.pipe(
			switchMapTo(keyZ$.pipe(
				takeUntil(cmdUp$),
			)),
			filter(() => !shiftOn)
		).subscribe(() => {
			dispatch(actUndo())
		})

		const subRedo = cmd$.pipe(
			switchMapTo(shift$),
			switchMapTo(keyZ$.pipe(
				takeUntil(cmdUp$)
			)),
			filter(() => shiftOn),
		).subscribe(() => {
			dispatch(actRedo())
		})

		return () => {
			subShiftDown.unsubscribe()
			subShiftUp.unsubscribe()
			subUndo.unsubscribe()
			subRedo.unsubscribe()
		}
	}, [dispatch])

	/**初始化让画布处于正中间位置 */
	useEffect(() => {
		const { offsetWidth, offsetHeight } = container.current!.offsetParent as HTMLDivElement
		const x = offsetWidth / 2 - w / 2
		const y = offsetHeight / 2 - h / 2
		const initPos = {
			x,
			y,
			scale: 1,
			centerPosition: { x, y, scale: 1 }
		}
		dispatch(actSetInitCanvasPos(initPos))
		dispatch(actChangeWorkingPos(initPos))
		setCanvasPos(initPos)
	}, [dispatch, h, w])

	/**处理背景缩放，移动，删除，拷贝，多选 */
	useEffect(() => {
		const currCanvasPos = { ...canvas }

		const _container = container.current!
		const bgMouseDown$ = fromEvent(bgRef.current!, "mousedown")
		const multiSelectStart$ = fromEvent(multiSelectRef.current!, "mousedown").pipe(
			tap(e => {
				e.stopPropagation()
			})
		)

		const mouseDown$ = fromEvent(_container, "mousedown").pipe(
			tap(e => e.stopPropagation())
		)
		const mouseUp$ = fromEvent(document, "mouseup").pipe(
			tap(() => {
				dispatch(actChangeWorkingPos(currCanvasPos))
			})
		)

		const subDeleteItem = keyDown$.pipe(
			filter(e => (e as KeyboardEvent).key === "Delete")
		).subscribe(() => {
			dispatch(actDeleteItems())
		})

		const subBgResize = alt$.pipe(
			switchMapTo(mouseWheel$.pipe(
				map(e => (e as WheelEvent).deltaY > 0),
				takeUntil(keyUp$)
			))
		).subscribe(isSmaller => {
			setCanvasPos(pos => produce(pos, it => {
				it.scale = Math.max(0.1, isSmaller ? it.scale - 0.1 : it.scale + 0.1)
			}))
			currCanvasPos.scale = Math.max(
				0.1,
				isSmaller ? currCanvasPos.scale - 0.1 : currCanvasPos.scale + 0.1
			)

			dispatch(actChangeWorkingPos(currCanvasPos))
		})

		const subCopy = cmd$.pipe(
			switchMapTo(keyDown$.pipe(
				filter(e => (e as KeyboardEvent).key.toLowerCase() === "c"),
			))
		).subscribe(() => {
			dispatch(actCopySelectedItems())
		})

		const selectMain = mouseDown$
			.subscribe(() => {
				dispatch(actSelect(null))
			})

		const subBgMove = bgMouseDown$.pipe(
			switchMap(e => {
				const initX = (e as MouseEvent).pageX
				const initY = (e as MouseEvent).pageY

				return mouseMove$.pipe(
					map((e) => {
						const x = (e as MouseEvent).pageX - initX
						const y = (e as MouseEvent).pageY - initY
						return { x, y, initX, initY }
					}),
					takeUntil(mouseUp$)
				)
			})
		).subscribe((pos) => {
			const nextX = canvas.x + pos.x
			const nextY = canvas.y + pos.y
			currCanvasPos.x = nextX
			currCanvasPos.y = nextY
			setCanvasPos((prev) => ({
				...prev, x: nextX, y: nextY
			}))
		})

		const subMultiSelect = multiSelectStart$.pipe(
			switchMap(e => {
				const initX = (e as MouseEvent).pageX
				const initY = (e as MouseEvent).pageY
				const containerOffsetLeft = getOffsetLeft(container.current!)
				const containerOffsetTop = getOffsetTop(container.current!)

				return mouseMove$.pipe(
					map(e => {
						const x = (e as MouseEvent).pageX
						const y = (e as MouseEvent).pageY
						const left = (x < initX ? x : initX) - containerOffsetLeft
						const top = (y < initY ? y : initY) - containerOffsetTop
						const w = Math.abs(x - initX)
						const h = Math.abs(y - initY)
						return { x: left, y: top, w, h }
					}),
					takeUntil(mouseUp$.pipe(
						tap(() => {
							const selectedIdxes = getSelectedIdxes(
								initPos.current,
								widgets
									.map(it => it.showInPage ? it.pos : null)
							)
							if (!selectedIdxes.length) {
								setSelectArea(initPos.current = { x: 0, y: 0, w: 0, h: 0 })
							} else {
								let minL = Infinity
								let maxR = 0
								let minT = Infinity
								let maxB = 0
								selectedIdxes.forEach(idx => {
									const { x, y, w, h } = widgets[idx].pos
									if (x < minL) {
										minL = x
									}
									if (x + w > maxR) {
										maxR = x + w
									}
									if (y < minT) {
										minT = y
									}
									if (y + h > maxB) {
										maxB = y + h
									}
								})
								setSelectArea(initPos.current = {
									x: minL,
									y: minT,
									w: maxR - minL,
									h: maxB - minT
								})
							}
						})
					))
				)
			})
		).subscribe(areaPos => {
			/**多选当前页面能显示的组件 */
			const selectedIdxes = getSelectedIdxes(
				areaPos,
				widgets
					.map(it => it.showInPage ? it.pos : null)
			)

			dispatch(actSelect(selectedIdxes.length ? selectedIdxes : null))
			initPos.current = areaPos
			setSelectArea(areaPos)
		})

		return () => {
			selectMain.unsubscribe()
			subCopy.unsubscribe()
			subDeleteItem.unsubscribe()
			subBgMove.unsubscribe()
			subBgResize.unsubscribe()
			subMultiSelect.unsubscribe()
		}
	}, [canvas, dispatch, widgets])

	/**让画布随着redux改变 */
	useEffect(() => {
		setCanvasPos(prev => ({ ...prev, ...canvas }))
	}, [canvas])

	/**选中区域和redux保持一致 */
	useEffect(() => {
		const pos = workplace.selectArea
		setSelectArea(pos)
		initPos.current = { ...pos }
	}, [workplace.selectArea])

	/**处理多选整体移动 */
	useEffect(() => {
		const selectedAreaMouseDown$ = fromEvent(selectedRef.current!, "mousedown").pipe(
			tap(e => e.stopPropagation())
		)
		let deltaX = 0
		let deltaY = 0
		const subSelectedAreaMove = selectedAreaMouseDown$.pipe(
			switchMap(e => {
				deltaX = deltaY = 0
				const startX = (e as MouseEvent).pageX
				const startY = (e as MouseEvent).pageY
				dispatch(actStartWidgetPos({ ...initPos.current }))
				return mouseMove$.pipe(
					map(e => {
						deltaX = (e as MouseEvent).pageX - startX
						deltaY = (e as MouseEvent).pageY - startY
						const { refLines, left, top } = createRefLine(
							{
								...initPos.current,
								x: initPos.current.x + deltaX,
								y: initPos.current.y + deltaY
							},
							[{
								x: 0,
								y: 0,
								w: pos.w,
								h: pos.h
							},
							...widgets.map((it, i) => it.showInPage && !workplace.selectedIndex!.includes(i)
								? it.pos
								: null
							)],
							{
								...workplace.refLine,
								onlyNearest: true
							}
						)
						setRefLines(refLines)

						deltaX = left - initPos.current.x
						deltaY = top - initPos.current.y
						return { deltaX, deltaY }
					}),
					takeUntil(mouseUp$.pipe(
						tap(() => {
							setSelectArea(initPos.current = {
								...initPos.current,
								x: initPos.current.x + deltaX,
								y: initPos.current.y + deltaY
							})
							dispatch(actCommitChangeWidgetPos({ ...initPos.current }))
						})
					))
				)
			}),
		).subscribe(({ deltaX, deltaY }) => {
			dispatch(actChangeWidgetPos(deltaX, deltaY))
			setSelectArea(pos => produce(pos, it => {
				it.x = initPos.current.x + deltaX
				it.y = initPos.current.y + deltaY
			}))
		})

		return () => {
			subSelectedAreaMove.unsubscribe()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, workplace.refLine, workplace.selectedIndex])

	/**松开按下工具键要让选中区域消失 */
	useEffect(() => {
		setSelectArea(initPos.current = { x: 0, y: 0, w: 0, h: 0 })
		dispatch(actSelect(null))
	}, [dispatch, workplace.selectedTool])

	return (
		<div className="work-bg relative" ref={ bgRef }>
			<div
				ref={ container }
				onDragOver={ e => {
					e.preventDefault()
				} }
				onDrop={ e => {
					const name = e.dataTransfer.getData("name")
					if (name) {
						const config = createWidgetConfig(name)
						if (config) {
							config.pos = normalizePos(config.pos)
							config.pos.x = e.pageX - getOffsetLeft(container.current) - config.pos.w / 2
							config.pos.y = e.pageY - getOffsetTop(container.current) - config.pos.h / 2
							dispatch(actAddItem(config))
						}
					}
				} }
				className="display-view absolute"
				style={ canvasPos.centerPosition.x ? {
					width: w + "px",
					height: h + "px",
					transform: `scale(${canvasPos.scale})`,
					left: canvasPos.x + "px",
					top: canvasPos.y + "px"
				} : initStyle }>
				{
					widgets.map((item, i) => (
						<RenderWidget
							key={ i }
							selected={
								(workplace.selectedIndex && workplace.selectedIndex.indexOf(i) !== -1) ||
								false
							}
							widgetConfig={ item }
							idx={ i }
							container={ container }
							setRefLines={ setRefLines }
							createWidgets={ createWidgets }
							eventPool={ eventPool }
							setMenuPos={ (cb) => {
								setMenuPos(pos => {
									const newPos = cb(pos)

									return {
										...newPos,
										x: Math.max(
											newPos.x - getOffsetLeft(bgRef.current) - MENU_WIDTH, 0
										),
										y: Math.max(newPos.y - getOffsetTop(bgRef.current) - MENU_HEIGHT, 0),
									}
								})
								setMenuVisible(true)
							} }
						/>
					))
				}
				{
					refLines.map(({ type: isCol, loc: pos, isSelf: isSelectOne }, i) => (
						<div
							key={ i }
							{
							...(isCol ?
								{
									className: "ref-line-col",
									style: {
										left: pos + "px",
										background: isSelectOne ? "red" : "blue"
									}
								} : {
									className: "ref-line-row",
									style: {
										top: pos + "px",
										background: isSelectOne ? "red" : "blue"
									}
								})
							}
						></div>
					))
				}
				<svg style={ { width: "100%", height: "100%" } } className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3701" width="200" height="200"><path d="M298.666667 366.506667l-85.333334 85.333333a20.48 20.48 0 0 1-29.866666 0l-91.733334-89.6a20.48 20.48 0 0 1 0-29.866667l158.293334-158.72a85.333333 85.333333 0 0 1 38.4-22.186666L375.893333 128a10.666667 10.666667 0 0 1 12.373334 6.4A161.706667 161.706667 0 0 0 512 213.333333a161.706667 161.706667 0 0 0 123.733333-78.506666 10.666667 10.666667 0 0 1 12.373334-6.826667l85.333333 23.04a85.333333 85.333333 0 0 1 38.4 22.186667l158.293333 158.72a20.48 20.48 0 0 1 0 29.866666l-90.453333 90.453334a20.48 20.48 0 0 1-29.866667 0l-85.333333-85.333334V853.333333a42.666667 42.666667 0 0 1-42.666667 42.666667H341.333333a42.666667 42.666667 0 0 1-42.666666-42.666667z" p-id="3702" fill="#ffffff"></path></svg>
				<div
					className={
						workplace.selectedTool === Tools.Select ? "absolute select-mask cursor" : "hidden"
					}
					ref={ multiSelectRef }>
				</div>
				<div
					ref={ selectedRef }
					className={ workplace.selectedTool === Tools.Select ? "selected-area absolute" : "hidden" }
					style={ {
						left: selectArea.x,
						top: selectArea.y,
						width: selectArea.w,
						height: selectArea.h
					} }>
				</div>
			</div>
			<ul
				className="select_menu"
				style={ {
					visibility: menuVisible ? "visible" : "hidden",
					width: menuPos.w,
					height: menuPos.h,
					left: menuPos.x + "px",
					top: menuPos.y + "px"
				} }
			>
				<li className="flex ac" onClick={ handleCopy }>复制</li>
				<li className="flex ac" onClick={ handleDelete }>删除</li>
			</ul>
			<div
				className={
					workplace.selectedTool === Tools.Drag ? "absolute drag-mask" : "hidden"
				}
				style={ {
					cursor: "move"
				} }
			>
			</div>
		</div>
	)
}

/**得到选中区域内选中的组件的下标 */
function getSelectedIdxes(areaPos: Pos, widgetsPoses: (Pos | null)[]) {
	return widgetsPoses
		.map((item, i) => {
			if (!item) return -1
			const { x, y, w, h } = item
			/**判断有重叠情况太多 就判断没有重叠的情况取反 */
			if (
				(areaPos.y > y + h) ||
				(areaPos.x > x + w) ||
				(areaPos.x + areaPos.w < x) ||
				(areaPos.y + areaPos.h < y)
			) {
				return -1
			}
			return i
		})
		.filter(idx => idx !== -1)
}

export default connect(
	(state: BaseState) => ({
		workplace: state.editorReducer.workplace
	}),
	dispatch => ({ dispatch })
)(Renderer)
