import { Modal } from "antd"

export enum StickFlags {
	NO_STICK = /**   */ 0 << 0,
	STICK_ROW = /**  */ 1 << 0,
	STICK_COL = /**  */ 1 << 1,
}

interface RefLinesOptions {
	stickTo: StickFlags,
	showSelf: boolean,
	onlyNearest: boolean,
	stickPx: number,
	showPx: number
}
/*@__PURE__*/
const defaultRefLinesOptions: RefLinesOptions = {
	stickTo: StickFlags.STICK_COL | StickFlags.STICK_ROW,
	showSelf: false,
	onlyNearest: true,
	stickPx: 5,
	showPx: 20
}

/**返回值数组含义 [水平还是竖直, 参考线坐标, 是否是自己的坐标, 相距, 吸附后的left或top] */
export class RefLine {
	type: number // 0是水平, 1是竖直
	loc: number // 参考线的坐标，水平参考线对应纵坐标，竖直参考线对应横坐标
	isSelf: number // 是否是自己的参考线
	margin: number // 参考线到本体的距离,
	stickLoc: number // 吸附后的left或top
	constructor(type: number, loc: number, isSelf: number, margin: number, stickLoc: number) {
		this.type = type
		this.loc = loc
		this.isSelf = isSelf
		this.margin = margin
		this.stickLoc = stickLoc
	}
}

export const createRefLine = (
	{ x: l, w: width, h: height, y: t }: { x: number, w: number, h: number, y: number },
	others: ({ x: number, y: number, w: number, h: number } | null)[],
	options?: Partial<RefLinesOptions>
): {
	refLines: RefLine[],
	left: number,
	top: number,
	sticks: {
		left: RefLine[],
		top: RefLine[],
		bottom: RefLine[],
		right: RefLine[],
	}
} => {
	const {
		showSelf,
		stickTo,
		stickPx,
		showPx,
		onlyNearest
	} = { ...defaultRefLinesOptions, ...(options || {}) }
	const midX = l + width / 2
	const midY = t + height / 2
	const b = t + height
	const r = l + width

	/**数组含义 [水平还是竖直, 原始坐标, 是否是自己的坐标, 相距, 吸附后横或者纵坐标] */
	let rawLines: RefLine[] = []

	/**能吸附方向 */
	let sticks: {
		left: RefLine[],
		top: RefLine[],
		bottom: RefLine[],
		right: RefLine[],
	} = {
		left: [],
		top: [],
		bottom: [],
		right: []
	}

	for (const item of others) {
		if (!item) continue
		const { x, y, w, h } = item
		/**判断一下长或者宽是否相等 */
		let equalWidth = false
		if (w === width) {
			equalWidth = true
		}
		let equalHeight = false
		if (h === height) {
			equalHeight = true
		}

		/**中线 */
		const mX = w / 2 + x
		const mY = h / 2 + y
		let space: number

		/**水平中线和中线对齐 */
		if ((space = Math.abs(mX - midX)) < showPx) {
			/**能吸附 */
			if (space <= stickPx && stickTo & StickFlags.STICK_COL) {
				l = equalWidth ? x : mX - width / 2
			} else if (showSelf) {
				rawLines.push(new RefLine(1, midX, 1, space, l))
			}
			rawLines.push(new RefLine(1, mX, 0, space, l))
		}
		/**垂直方向中线和中线对齐 */
		if ((space = Math.abs(mY - midY)) < showPx) {
			/**能吸附 */
			if (space <= stickPx && stickTo & StickFlags.STICK_ROW) {
				t = equalHeight ? y : mY - height / 2
			} else if (showSelf) {
				rawLines.push(new RefLine(0, midY, 1, space, t))
			}
			rawLines.push(new RefLine(0, mY, 0, space, t))
		}
		/**左边和其它竖直中线对齐 */
		if ((space = Math.abs(mX - l)) < showPx) {
			/**能吸附 */
			if (space <= stickPx && stickTo & StickFlags.STICK_COL) {
				l = mX
				sticks.left.push(new RefLine(1, mX, 0, space, l))
			} else if (showSelf) {
				rawLines.push(new RefLine(1, l, 1, space, l))
			}
			rawLines.push(new RefLine(1, mX, 0, space, l))
		}
		/**右边和其它竖直中线对齐 */
		if ((space = Math.abs(l + width - mX)) < showPx) {
			/**能吸附 */
			if (space <= stickPx && stickTo & StickFlags.STICK_COL) {
				l = mX - width
				sticks.right.push(new RefLine(1, mX, 0, space, l))
			} else if (showSelf) {
				rawLines.push(new RefLine(1, l + width, 1, space, l))
			}
			rawLines.push(new RefLine(1, mX, 0, space, l))
		}
		/**顶部和其它水平中线对齐 */
		if ((space = Math.abs(t - mY)) < showPx) {
			/**能吸附 */
			if (space <= stickPx && stickTo & StickFlags.STICK_ROW) {
				t = mY
				sticks.top.push(new RefLine(0, mY, 0, space, t))
			} else if (showSelf) {
				rawLines.push(new RefLine(0, t, 1, space, t))
			}
			rawLines.push(new RefLine(0, mY, 0, space, t))
		}
		/**底部和其它水平中线对齐 */
		if ((space = Math.abs(t + height - mY)) < showPx) {
			/**能吸附 */
			if (space <= stickPx && stickTo & StickFlags.STICK_ROW) {
				t = mY - height
				sticks.bottom.push(new RefLine(0, mY, 0, space, t))
			} else if (showSelf) {
				rawLines.push(new RefLine(0, t + height, 1, space, t))
			}
			rawLines.push(new RefLine(0, mY, 0, space, t))
		}
		/**当前选择顶部，和其它顶部吸附 */
		if ((space = Math.abs(t - y)) < showPx) {
			if (space <= stickPx && stickTo & StickFlags.STICK_ROW) {
				t = y
				sticks.top.push(new RefLine(0, y, 0, space, t))
			} else if (showSelf) {
				rawLines.push(new RefLine(0, t, 1, space, t))
			}
			rawLines.push(new RefLine(0, y, 0, space, t))
		}
		/**当前选择顶部，和其它底部吸附 */
		if ((space = Math.abs(t - (y + h))) < showPx) {
			if (space <= stickPx && stickTo & StickFlags.STICK_ROW) {
				t = y + h
				sticks.top.push(new RefLine(0, y + h, 0, space, t))
			} else if (showSelf) {
				rawLines.push(new RefLine(0, t, 1, space, t))
			}
			rawLines.push(new RefLine(0, y + h, 0, space, t))
		}
		/**当前选择底部，和其它顶部吸附 */
		if ((space = Math.abs(b - y)) < showPx) {
			if (space <= stickPx && stickTo & StickFlags.STICK_ROW) {
				t = y - height
				sticks.bottom.push(new RefLine(0, y, 0, space, t))
			} else if (showSelf) {
				rawLines.push(new RefLine(0, b, 1, space, t))
			}
			rawLines.push(new RefLine(0, y, 0, space, t))
		}
		/**当前选择底部，和其它底部吸附 */
		if ((space = Math.abs(b - (y + h))) < showPx) {
			if (space <= stickPx && stickTo & StickFlags.STICK_ROW) {
				t = y + h - height
				sticks.bottom.push(new RefLine(0, y + h, 0, space, t))
			} else if (showSelf) {
				rawLines.push(new RefLine(0, b, 1, space, t))
			}
			rawLines.push(new RefLine(0, y + h, 0, space, t))
		}
		/**当前选择左边，和其它左边吸附 */
		if ((space = Math.abs(l - x)) < showPx) {
			if (space <= stickPx && stickTo & StickFlags.STICK_COL) {
				l = x
				sticks.left.push(new RefLine(1, x, 0, space, l))
			} else if (showSelf) {
				rawLines.push(new RefLine(1, l, 1, space, l))
			}
			rawLines.push(new RefLine(1, x, 0, space, l))
		}
		/**当前选择左边，和其它右边吸附 */
		if ((space = Math.abs(l - (x + w))) < showPx) {
			if (space <= stickPx && stickTo & StickFlags.STICK_COL) {
				l = x + w
				sticks.left.push(new RefLine(1, x + w, 0, space, l))
			} else if (showSelf) {
				rawLines.push(new RefLine(1, l, 1, space, l))
			}
			rawLines.push(new RefLine(1, x + w, 0, space, l))
		}
		/**当前选择右边，和其它左边吸附 */
		if ((space = Math.abs(r - x)) < showPx) {
			if (space <= stickPx && stickTo & StickFlags.STICK_COL) {
				l = x - width
				sticks.right.push(new RefLine(1, x, 0, space, l))
			} else if (showSelf) {
				rawLines.push(new RefLine(1, r, 1, space, l))
			}
			rawLines.push(new RefLine(1, x, 0, space, l))
		}
		/**当前选择右边，和其它右边吸附 */
		if ((space = Math.abs(r - (x + w))) < showPx) {
			if (space <= stickPx && stickTo & StickFlags.STICK_COL) {
				l = x + w - width
				sticks.right.push(new RefLine(1, x + w, 0, space, l))
			} else if (showSelf) {
				rawLines.push(new RefLine(1, r, 1, space, l))
			}
			rawLines.push(new RefLine(1, x + w, 0, space, l))
		}
	}

	/**控制好参考线的数量，要求保留最近的几根 */
	let result = {
		refLines: rawLines,
		left: l,
		top: t,
		sticks
	}
	if (onlyNearest && rawLines.length) {
		let minRow = showPx
		let minRowIdx = 0
		let minCol = showPx
		let minColIdx = 0
		rawLines.forEach((it, i) => {
			const space = it.margin
			const type = it.type
			if (type === 1) {
				if (space < minCol) {
					minCol = space
					minColIdx = i
				}
			} else {
				if (space < minRow) {
					minRow = space
					minRowIdx = i
				}
			}
		})


		result = {
			refLines: [
				rawLines[minColIdx],
				rawLines[minRowIdx]
			],
			left: stickTo & StickFlags.STICK_COL && minCol < stickTo ? rawLines[minColIdx].stickLoc : l,
			top: stickTo & StickFlags.STICK_ROW && minRow < stickTo ? rawLines[minRowIdx].stickLoc : t,
			sticks
		}
	}
	return result
}
/*@__PURE__*/
export const isUndef = (target: unknown): target is undefined | null => {
	return target === undefined || target === null
}

const { confirm } = Modal;
/*@__PURE__*/
export function withConfirm(message: string, cb: () => void) {
	confirm({
		title: message,
		onOk: cb,
		okText: "确认",
		cancelText: "取消"
	})
}

/*@__PURE__*/
export function deepCopy<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj))
}

/**获取到屏幕左边的距离 */
/*@__PURE__*/
export function getOffsetLeft(node: HTMLElement | null) {
	let offsetLeft = 0

	while (node && node.offsetLeft) {
		offsetLeft += node.offsetLeft
		node = node.offsetParent as HTMLElement
	}

	return offsetLeft
}

/**获取到屏幕上边的距离 */
/*@__PURE__*/
export function getOffsetTop(node: HTMLElement | null) {
	let offsetTop = 0

	while (node && node.offsetTop) {
		offsetTop += node.offsetTop
		node = node.offsetParent as HTMLElement
	}

	return offsetTop
}


/*@__PURE__*/
export function getNearestLine(
	arr: RefLine[],
	initValue?: RefLine
) {
	if (arr.length === 1) return arr[0]
	return arr.reduce((prev, calc) => calc.margin < prev.margin
		? calc
		: prev,
		initValue || arr[0]
	)
}
