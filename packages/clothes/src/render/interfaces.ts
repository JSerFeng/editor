import {ComponentClass, CSSProperties, FC} from "react";
import EventEmitter from "../utils/eventEmitter";

export const EditorTypes: {
  Color: "Color",
  Upload: "Upload",
  Text: "Text",
  Number: "Number",
  Select: "Select"
} = {
  Color: "Color",
  Upload: "Upload",
  Text: "Text",
  Number: "Number",
  Select: "Select"
}

type E<T extends Record<string, any>>
    = { [K in keyof T]: K }[keyof T]


export type EditorConfig<T = any, U extends string = any> =
    U extends typeof EditorTypes.Select
        ? {
          key: E<T>,
          name: string,
          type: U,
          options:
              U extends typeof EditorTypes.Select
                  ? { label: string, value: string }[]
                  : Record<string, any>
        }
        : {
          key: E<T>,
          name: string,
          type: U,
        }

export type ReactComp<T> = FC<T> | ComponentClass<T>

export interface Pos {
  x: number,
  y: number,
  w: number,
  h: number
}

export function normalizePos(pos: any): Pos {
	return {
		x: pos?.x || 0,
		y: pos?.y || 0,
		w: pos?.w || 100,
		h: pos?.h || 100,
	}
}

export type PathMeta = {
	path: string,
}

/*
WidgetPackage是基本的组件信息
WidgetConfig是在编辑器中的组件信息，多了一些如位置参数的字段
*/
export interface WidgetConfig<T extends Record<string, any> = any> extends WidgetDescription<T> {
  pos: Pos, //位置信息
  routeInfo: {
    exact: boolean,
    path: string[],
  },
  dependencies?: Record<string, string>

  /*
   dev only!!!
   与路由显示相关
   */
  showInPage?: boolean
}

export interface RenderConfig {
  projectName: string,
  widgets: WidgetConfig[],
  pos: { w: number, h: number }, //页面大小，在工作台中位置
  routerMode: "history" | "hash",
  histories: { path: string }[],
  currHistoryIdx: number,

  //安装过的其它组件的id集合
  dependencies: string[],
}

export interface WidgetDescription<T = any> {
  name: string,
  showName: string,
  editorConfig: EditorConfig<T>[],
  config: T,
  initPos?: { w: number, h: number },
  version?: string,
  from?: string,
  style?: Partial<CSSProperties>,
  snapShot?: string,
  description?: string,
  dependencies?: Record<string, string>
}

export interface WidgetProps<T = any> {
  config: T,
  pos: Pos,
  isDev: boolean
  style?: Partial<CSSProperties>,
  eventPool?: EventEmitter,
}

export interface WidgetConfigProp<T = any> {
  widgetConfig: WidgetConfig<T>,
  dispatchConfig: (widgetConfig: WidgetConfig<T>) => void
}

export interface WidgetPackage<T = any> {
  FC: ReactComp<WidgetProps<T>>,
  description: WidgetDescription<T>
  Configuration?: ReactComp<WidgetConfigProp> | undefined,
}

export type TransformConfig<T> = T extends Array<infer Item>
    /**/ ? Item extends { key: infer Key }
        /****/ ? Key extends string
            /******/ ? { [P in Key]: any }
            /******/ : {}
        /****/ : {}
    /**/ : T


export function checkIfValidRenderConfig(renderConfig: any): RenderConfig | null {
  if (renderConfig.renderConfig) {
    renderConfig = renderConfig.renderConfig
  }
  return renderConfig.projectName &&
  renderConfig.widgets &&
  Array.isArray(renderConfig.widgets)
      ? renderConfig
      : null
}

export const sureStrToRenderConfig = (str: string): RenderConfig => {
  try {
    return JSON.parse(str) as RenderConfig
  } catch (e) {
    return {
      projectName: "BROKEN_PROJECT",
      widgets: [],
      pos: {
        w: 0,
        h: 0
      },
      routerMode: "history",
      histories: [],
      currHistoryIdx: -1,
      dependencies: []
    }
  }
}
