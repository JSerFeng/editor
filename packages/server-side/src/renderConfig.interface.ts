import { ComponentClass, CSSProperties, FC } from "react";
import EventEmitter from "./eventEmitter";

export enum EditorTypes {
	Color = "Color",
	Upload = "Upload",
	Text = "Text",
	Number = "Number",
	Select = "Select",
}

export type EditorConfig<T extends EditorTypes = EditorTypes> = T extends
	| EditorTypes.Number
	| EditorTypes.Text
	| EditorTypes.Color
	? {
			key: string;
			name: string;
			type: T;
	  }
	: {
			key: string;
			name: string;
			type: T;
			options: T extends EditorTypes.Select
				? /* */ { label: string; value: string }[]
				: /* */ T extends EditorTypes.Upload
				? /*   */ Record<string, any>
				: /*   */ never;
	  };

export type ReactComp<T> = FC<T> | ComponentClass<T>;

export interface Pos {
	x: number;
	y: number;
	w: number;
	h: number;
}

export interface WidgetConfig<T extends Record<string, any> = any> {
	name: string,
	editorConfig: EditorConfig[],
	config: T,
	pos: Pos, //位置信息
	routeInfo: {
		exact: boolean,
		path: string[],
	},
	style?: Partial<CSSProperties>, //样式信息
	from?: string,

	showName: string,
	initPos?: Pos,
	version?: string,
	snapShot?: string,
	description?: string,
	dependencies?: Record<string, string>

	/* dev only!!! */
	showInPage?: boolean
}

export interface RenderConfig {
	projectName: string;
	widgets: WidgetConfig[];
	pos: { w: number; h: number }; //页面大小，在工作台中位置
	routerMode: "history" | "hash";
	histories: { path: string }[];
	currHistoryIdx: number;

	dependencies: string[];
}

export interface WidgetDescription<T = any> {
	name: string;
	showName: string;
	editorConfig: EditorConfig[];
	config: T;
	initPos?: Pos;
	version?: string;
	from?: string;
	style?: Partial<CSSProperties>;
	snapShot?: string;
	description?: string;
	dependencies?: Record<string, string>;
}

export interface WidgetProps<T = any> {
	config: T;
	pos: Pos;
	isDev: boolean;
	style?: Partial<CSSProperties>;
	eventPool?: EventEmitter;
}

export interface WidgetConfigProp<T = any> {
	widgetConfig: WidgetConfig<T>;
	dispatchConfig: (widgetConfig: WidgetConfig<T>) => void;
}

export interface WidgetPackage {
	FC: ReactComp<WidgetProps>;
	description: WidgetDescription;
	Configuration?: ReactComp<WidgetConfigProp> | undefined;
}

export type TransformConfig<T> = T extends Array<infer Item>
	? /**/ Item extends { key: infer Key }
		? /****/ Key extends string
			? /******/ { [P in Key]: any }
			: /******/ Record<string, any>
		: /****/ Record<string, any>
	: /**/ T;

export function checkIfValidRenderConfig(
	renderConfig: any,
): RenderConfig | null {
	if (renderConfig.renderConfig) {
		renderConfig = renderConfig.renderConfig;
	}
	return renderConfig.projectName &&
		renderConfig.widgets &&
		Array.isArray(renderConfig.widgets)
		? renderConfig
		: null;
}
