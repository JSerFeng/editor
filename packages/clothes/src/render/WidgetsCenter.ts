import { deepCopy } from "../utils"
import {
	normalizePos,
	ReactComp,
	WidgetConfig,
	WidgetConfigProp,
	WidgetDescription,
	WidgetPackage, WidgetProps
} from "./interfaces"

type WidgetsMap = Map<string, WidgetPackage>

export type HooksCallback = (pkg: WidgetPackage) => (WidgetPackage)

class WidgetsCenter {
	widgetsMap: WidgetsMap
	subQueue: ((...args: any[]) => any)[]
	preHooks: Set<HooksCallback>

	constructor(
		initMap: WidgetsMap = new Map()
	) {
		this.widgetsMap = initMap
		this.subQueue = []
		this.preHooks = new Set()
	}

	createConfigFromDescription(info: WidgetDescription): WidgetConfig {
		return {
			...info,
			pos: info.initPos ? { ...info.initPos, x: 10, y: 10 } : { x: 10, y: 10, w: 60, h: 60 },
			routeInfo: {
				exact: true,
				path: ["/"]
			}
		}
	}

	use(widget: WidgetPackage) {
		for (const cb of this.preHooks) {
			widget = cb(widget)
		}
		const { getDescription, FC, Configuration } = widget
		const description = getDescription();
		this.widgetsMap.set(description.name, { FC, getDescription, Configuration })
		this.notify()
	}

	remove(name: string) {
		if (this.widgetsMap.has(name)) {
			this.widgetsMap.delete(name)
			this.notify()
		}
	}

	unPre(cb: HooksCallback) {
		if (this.preHooks.has(cb)) {
			this.preHooks.delete(cb)
		}
	}

	notify() {
		const all = this.getAll()
		this.subQueue.forEach(cb => cb(all))
	}

	subscribe(cb: (all: WidgetPackage[]) => any) {
		this.subQueue.push(cb)
	}

	get(widgetConfig: WidgetConfig | string): WidgetPackage | null {
		let name: string
		if (typeof widgetConfig === "string") {
			name = widgetConfig
		} else {
			name = widgetConfig.name
		}
		const pkg = this.widgetsMap.get(name)
		if (!pkg) return null
		return pkg
	}

	getAll() {
		const widgets: WidgetPackage[] = []
		this.widgetsMap.forEach((v) => widgets.push(v))
		return widgets
	}

	pre(cb: HooksCallback) {
		this.preHooks.add(cb)
	}

	createConfigFromName(widgetName: string): WidgetConfig | null {
		let widget = this.widgetsMap.get(widgetName)
		if (!widget) return null
		const description = widget.getDescription()
		return {
			...description,
			pos: normalizePos(description.initPos),
			routeInfo: {
				exact: true,
				path: ["/"],
			}
		}
	}
}

export default WidgetsCenter

const defaultDescription: Required<WidgetDescription> = {
	name: "no-name",
	showName: "未命名",
	snapShot: "",
	version: "*",
	editorConfig: [],
	config: {},
	initPos: { w: 100, h: 100 },
	style: {},
	description: "无描述",
	from: "presets",
	dependencies: {}
}

export const createPkg = <T = any>(
	Comp: ReactComp<WidgetProps<T>>,
	getDescription: (...args: any) => WidgetDescription<T>,
	Configuration?: ReactComp<WidgetConfigProp<T>>
): WidgetPackage => {
	if (Configuration) {
		return {
			FC: Comp as ReactComp<WidgetProps>,
			Configuration,
			getDescription
		}
	}
	return {
		FC: Comp as ReactComp<WidgetProps>,
		getDescription
	}
}
