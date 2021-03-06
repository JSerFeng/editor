import {
	FC,
	Dispatch, RefObject,
	useCallback,
	useEffect,
	useRef,
	useState,
	ComponentClass,
	MouseEvent as ReactMouseEvent
} from "react"
import { Dispatch as ReduxDispatch } from "redux"
import {
	Pos,
	WidgetConfig,
	WidgetProps,
	EventEmitter
} from "@v-editor/widgets-center"
import produce from "immer"
import { fromEvent, Subject } from "rxjs"
import { tap, map, switchMap, takeUntil, filter } from "rxjs/operators"
import { StickFlags, createRefLine, getOffsetLeft, getOffsetTop, getNearestLine, RefLine } from "../utils"
import { EditorActions } from "../store/editorReducer"
import { connect } from "react-redux"
import { BaseState } from "../store"
import { useRouteMatch } from "react-router-dom"
import ErrorCatch from "../components/error-widget"

const {
	actSelectOne,
	actChangeWidgetShowInPage,
	actWidgetConfig
} = EditorActions

interface WrapperProps {
	selected: boolean,
	widgetConfig: WidgetConfig,
	idx: number,
	container: RefObject<HTMLDivElement>,
	setRefLines: Dispatch<RefLine[]>,
	dispatch: ReduxDispatch,
	allWidgets: WidgetConfig[],
	createWidgets: (config: WidgetConfig) => FC<WidgetProps> | ComponentClass<WidgetProps> | null,
	eventPool: EventEmitter,
	refLine: BaseState["editorReducer"]["workplace"]["refLine"],
	setMenuPos: (cb: (pos: Pos) => Pos) => void,
	canvasH: number,
	canvasW: number
}

export const RenderWidget: FC<WrapperProps> = ({
	selected,
	idx,
	container,
	setRefLines,
	allWidgets,
	widgetConfig,
	dispatch,
	createWidgets,
	eventPool,
	refLine,
	setMenuPos,
	canvasH,
	canvasW
}) => {
	const [layout, setLayout] = useState({ ...widgetConfig.pos })
	const match = useRouteMatch({
		exact: widgetConfig.routeInfo.exact,
		path: widgetConfig.routeInfo.path.map(it => "/editor" + it)
	})

	const setPos = useCallback(({ x, y }: { x: number, y: number }) => {
		setLayout(lay => ({ ...lay, x, y }))
	}, [setLayout])

	const containerLeft = useRef<number | null>(null)
	const containerTop = useRef<number | null>(null)

	const thisDiv = useRef<HTMLDivElement>(null)

	const setReferenceLine = useCallback((
		pos: {
			x: number,
			y: number,
			w: number,
			h: number
		},
		stickFlags: StickFlags,
		onlyNearest = true
	) => {
		/**
		 * ?????????????????????, ???????????????0???????????????????????? | 1???????????????????????????
		 * [0, 45, 0] --- ?????????x???, ?????? 0 45??? ??????100%
		 * [1, 45, 0] --- ?????????y???, ?????? 45 0??? ??????100%
		 */
		const otherPositions = allWidgets
			.filter((_, i) => (i !== idx)) //????????????????????????
			.map((widget) => {
				const { x, y, w, h } = widget.pos
				return ({ x, y, w, h })
			})

		otherPositions.push({
			x: 0,
			y: 0,
			w: canvasW,
			h: canvasH
		})

		const { refLines, left, top, sticks } = createRefLine(pos, otherPositions, {
			onlyNearest: onlyNearest,
			stickTo: stickFlags,
			stickPx: refLine.stickPx,
			showPx: refLine.showPx
		})
		setRefLines(refLines)

		return { refLines, left, top, sticks }
	}, [allWidgets, canvasW, canvasH, refLine.stickPx, refLine.showPx, setRefLines, idx])

	const handleContextMenu = (e: ReactMouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		setMenuPos(pos => ({
			...pos,
			x: e.pageX,
			y: e.pageY
		}))
	}

	useEffect(() => {
		const ele = thisDiv.current!

		let currLayout: { x: number, y: number, w: number, h: number } = { ...widgetConfig.pos }
		/**
		 * TIP: ?????????????????????????????????????????????????????????????????????
		 * ????????????????????????layout???????????????react???eslint????????????layout??????
		 * useEffect??????????????????????????????????????????layout?????????????????????useEffect
		 * ??????????????????????????????useEffect?????????????????????????????????????????????????????????
		 * ??????????????????????????????????????????????????????????????????????????????setLayout?????????
		 * ???????????????????????????layout???????????????useEffect????????????????????????????????????
		 * ????????????useEffect??????????????????
		 */

		/** */
		const mouseDown$ = fromEvent<MouseEvent>(ele, "mousedown").pipe(
			tap(e => {
				e.stopPropagation()
				dispatch(actSelectOne(idx))
			})
		)
		const mouseMove$ = fromEvent<MouseEvent>(document, "mousemove")

		/**??????????????????????????????mainConfig??????layout */
		const mouseUp$ = fromEvent(document, "mouseup")
		const mouseUp2PosChange$ = mouseUp$.pipe(
			tap(() => {
				dispatchPosChange(currLayout)
			})
		)

		const subClearRefLines = mouseUp$.subscribe(() => {
			setRefLines([])
		})

		const subMove = mouseDown$.pipe(
			map((e) => ({
				offsetLeft: (e as MouseEvent).pageX - getOffsetLeft(container.current) - ele.offsetLeft,
				offsetTop: (e as MouseEvent).pageY - getOffsetTop(container.current) - ele.offsetTop
			})),
			switchMap(({ offsetLeft, offsetTop }) => mouseMove$.pipe(
				map(e => ({
					x: (e as MouseEvent).pageX - getOffsetLeft(container.current) - offsetLeft || 0,
					y: (e as MouseEvent).pageY - getOffsetTop(container.current) - offsetTop || 0,
				})),
				map((res) => {
					const { left: x, top: y } = setReferenceLine({
						x: res.x,
						y: res.y,
						w: currLayout.w,
						h: currLayout.h
					}, refLine.stickFlag)
					return { x, y }
				}),
				tap(({ x, y }) => {
					currLayout.x = x
					currLayout.y = y
				}),
				takeUntil(mouseUp2PosChange$),
			)),
		).subscribe(setPos)

		/**????????????????????????????????????div, L:left T:Top R:right B:bottom */
		const dotLT = dLT.current!
		const dotLB = dLB.current!
		const dotRT = dRT.current!
		const dotRB = dRB.current!
		const dotLM = dLM.current!
		const dotRM = dRM.current!
		const dotMT = dMT.current!
		const dotMB = dMB.current!

		const resizeMouseDown$ = new Subject<
			"lt" | "mt" | "rt" |
			"lm" | /****/ "rm" |
			"lb" | "rb" | "mb">()

		const subResize = resizeMouseDown$.pipe(
			map((dir:
				"lt" | "mt" | "rt" |
				"lm" | /****/ "rm" |
				"lb" | "rb" | "mb"
			) => ({
				dir,
				_layout: widgetConfig.pos
			})),
			switchMap(({ dir, _layout }) => mouseMove$.pipe(
				map((e) => {
					let newX = (e as MouseEvent).pageX - getOffsetLeft(container.current)
					let newY = (e as MouseEvent).pageY - getOffsetTop(container.current)

					const pos = widgetConfig.pos
					let newHeight = pos.h
					let newWidth = pos.w

					switch (dir) {
						case "lt": {
							/**??????????????????????????????????????????????????? */
							const rbX = pos.x + pos.w
							const rbY = pos.y + pos.h

							newWidth = rbX - newX
							newHeight = rbY - newY
							break
						}
						case "lb": {
							/**??????????????????????????????????????????????????? */
							const rtX = pos.x + pos.w
							const rtY = pos.y

							newWidth = rtX - newX
							newHeight = newY - rtY

							newY = newY - newHeight
							break
						}
						case "rb": {
							/**?????????????????????????????????????????? */
							const ltX = pos.x
							const ltY = pos.y

							newWidth = newX - ltX
							newHeight = newY - ltY

							newX = newX - newWidth
							newY = newY - newHeight
							break
						}
						case "rt": {
							/**?????????????????????????????????????????? */
							const lbX = pos.x
							const lbY = pos.y + pos.h

							newWidth = newX - lbX
							newHeight = lbY - newY

							newX = newX - newWidth
							break
						}
						case "lm": {
							/**???????????????????????????????????????????????? */
							newWidth = pos.x + pos.w - newX

							newY = pos.y
							break
						}
						case "rm": {
							/**???????????????????????????????????????????????? */
							newWidth = newX - pos.x

							newX = pos.x
							newY = pos.y
							break
						}
						case "mt": {
							/**???????????????????????? */
							newHeight = pos.h + pos.y - newY

							newX = pos.x
							break
						}
						case "mb": {
							/**???????????????????????? */
							newHeight = newY - pos.y

							newX = pos.x
							newY = pos.y
							break
						}
						default: return _layout
					}

					/**
					* Tips:
					* ??????newX,newY,newWidth,newHeight???????????????????????????
					* ??????????????????????????????????????????????????????????????????????????????
					* ?????????x???y???????????????????????????????????????????????????????????????
					* ????????????????????????
					* ??????????????????????????????????????????????????????????????????????????????
					* ??????????????????????????????????????????????????????????????????????????????
					* ?????????????????????????????????????????????????????????????????????????????????
					* ???????????????????????????????????????????????????
					**/
					const currX = newX
					const currY = newY
					const currW = newWidth
					const currH = newHeight

					const { refLines: lines, sticks } = setReferenceLine({
						x: newX,
						y: newY,
						w: newWidth,
						h: newHeight,
					},
						dir === "lm" || dir === "rm"
							? refLine.stickFlag & StickFlags.STICK_COL
								? StickFlags.STICK_COL
								: StickFlags.NO_STICK
							: dir === "mt" || dir === "mb"
								? refLine.stickFlag & StickFlags.STICK_ROW
									? StickFlags.STICK_ROW
									: StickFlags.NO_STICK
								: refLine.stickFlag
						,
						false // ????????????????????????????????????????????????????????????
					)

					if (!lines.length || refLine.stickFlag & StickFlags.NO_STICK) {
						return {
							x: newX,
							y: newY,
							w: newWidth,
							h: newHeight
						}
					}

					if (sticks.left.length) {
						switch (dir) {
							case "lt":
							case "lm":
							case "lb":
								newX = getNearestLine(sticks.left).stickLoc
								newWidth = currX + currW - newX
						}
					}
					if (sticks.top.length) {
						switch (dir) {
							case "lt":
							case "mt":
							case "rt":
								newY = getNearestLine(sticks.top).stickLoc
								newHeight = currY - newY + currH
						}
					}
					if (sticks.bottom.length) {
						switch (dir) {
							case "lb":
							case "mb":
							case "rb":
								newHeight = getNearestLine(sticks.bottom).stickLoc - newY + currH
						}
					}
					if (sticks.right.length) {
						switch (dir) {
							case "rt":
							case "rm":
							case "rb":
								newWidth = getNearestLine(sticks.right).stickLoc - newX + currW
						}
					}

					return {
						x: newX,
						y: newY,
						w: newWidth,
						h: newHeight
					}
				}),
				filter(l => l.h >= 10 && l.w >= 10), /**??????????????????10???????????????10 */
				tap(l => currLayout = l), /**????????????????????????????????????????????????????????????????????? */
				takeUntil(mouseUp2PosChange$)
			))
		).subscribe(({ x, y, w, h }) => {
			setLayout(l => ({
				...l, x, y, w, h,
			}))
		})

		const dispatchPosChange = (pos: {
			x?: number, y?: number, w?: number, h?: number
		}) => {
			dispatch(actWidgetConfig(produce(widgetConfig, it => {
				Reflect.ownKeys(pos).forEach(k => {
					/**@ts-ignore */
					it.pos[k] = pos[k]
				})
			})))
		}


		const resizeLT = (e: Event) => {
			e.stopPropagation()
			resizeMouseDown$.next("lt")
		}
		const resizeRT = (e: Event) => {
			e.stopPropagation()
			resizeMouseDown$.next("rt")
		}
		const resizeLB = (e: Event) => {
			e.stopPropagation()
			resizeMouseDown$.next("lb")
		}
		const resizeRB = (e: Event) => {
			e.stopPropagation()
			resizeMouseDown$.next("rb")
		}
		const resizeLM = (e: Event) => {
			e.stopPropagation()
			resizeMouseDown$.next("lm")
		}
		const resizeRM = (e: Event) => {
			e.stopPropagation()
			resizeMouseDown$.next("rm")
		}
		const resizeMT = (e: Event) => {
			e.stopPropagation()
			resizeMouseDown$.next("mt")
		}
		const resizeMB = (e: Event) => {
			e.stopPropagation()
			resizeMouseDown$.next("mb")
		}

		dotLT.addEventListener("mousedown", resizeLT)
		dotRT.addEventListener("mousedown", resizeRT)
		dotLB.addEventListener("mousedown", resizeLB)
		dotRB.addEventListener("mousedown", resizeRB)
		dotLM.addEventListener("mousedown", resizeLM)
		dotRM.addEventListener("mousedown", resizeRM)
		dotMT.addEventListener("mousedown", resizeMT)
		dotMB.addEventListener("mousedown", resizeMB)

		return () => {
			subMove.unsubscribe()
			subClearRefLines.unsubscribe()
			subResize.unsubscribe()
			dotLT.removeEventListener("mousedown", resizeLT)
			dotRT.removeEventListener("mousedown", resizeRT)
			dotLB.removeEventListener("mousedown", resizeLB)
			dotRB.removeEventListener("mousedown", resizeRB)
			dotLM.removeEventListener("mousedown", resizeLM)
			dotRM.removeEventListener("mousedown", resizeRM)
			dotMT.removeEventListener("mousedown", resizeMT)
			dotMB.removeEventListener("mousedown", resizeMB)
		}
	}, [container, containerLeft, containerTop, dispatch, idx, refLine.stickFlag, setPos, setRefLines, setReferenceLine, widgetConfig, setLayout, refLine])

	/**LT??????left top???????????????div??????????????? */
	const dLT = useRef<HTMLDivElement>(null)
	const dMT = useRef<HTMLDivElement>(null)
	const dRT = useRef<HTMLDivElement>(null)
	const dLM = useRef<HTMLDivElement>(null)
	const dRM = useRef<HTMLDivElement>(null)
	const dLB = useRef<HTMLDivElement>(null)
	const dMB = useRef<HTMLDivElement>(null)
	const dRB = useRef<HTMLDivElement>(null)

	/**??????config???????????????????????????layout */
	useEffect(() => {
		setLayout(widgetConfig.pos)
	}, [widgetConfig.pos, setLayout])

	const WidgetComponent = createWidgets(widgetConfig) || (() => null)

	useEffect(() => {
		dispatch(actChangeWidgetShowInPage(idx, !!match))
	}, [dispatch, idx, match])

	return (
		<div
			className={ `absolute wrap-widget ${selected ? "select" : ""} ${match === null && "hidden"}` }
			ref={ thisDiv }
			style={ {
				left: layout.x + "px",
				top: layout.y + "px",
				width: layout.w + "px",
				height: layout.h + "px",
				//@ts-ignore
				zIndex: widgetConfig.style?.zIndex || 0,
			} }
			title={ `x:${layout.x} y:${layout.y} w:${layout.w} h:${layout.h}` }
			onContextMenu={ handleContextMenu }	>
			<div className="move-dot lt" ref={ dLT }></div>
			<div className="move-dot mt" ref={ dMT }></div>
			<div className="move-dot rt" ref={ dRT }></div>
			<div className="move-dot lm" ref={ dLM }></div>
			<div className="move-dot rm" ref={ dRM }></div>
			<div className="move-dot lb" ref={ dLB }></div>
			<div className="move-dot mb" ref={ dMB }></div>
			<div className="move-dot rb" ref={ dRB }></div>
			<ErrorCatch name={ widgetConfig.name }>
				<WidgetComponent
					config={ widgetConfig.config }
					pos={ layout }
					style={ widgetConfig.style || {} }
					eventPool={ eventPool }
					isDev={ true }
				/>
			</ErrorCatch>
		</div>
	)
}

export default connect(
	(state: BaseState) => {
		const workplace = state.editorReducer.workplace
		return {
			allWidgets: workplace.renderConfig.widgets,
			refLine: workplace.refLine,
			canvasW: workplace.renderConfig.pos.w,
			canvasH: workplace.renderConfig.pos.h
		}
	},
	dispatch => ({ dispatch })
)(RenderWidget)
