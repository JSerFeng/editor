import { ComponentClass, CSSProperties, FC } from "react";
import EventEmitter from "../utils/eventEmitter";
export declare enum EditorTypes {
    Color = "Color",
    Upload = "Upload",
    Text = "Text",
    Number = "Number",
    Select = "Select"
}
export declare type EditorConfig<T extends EditorTypes = EditorTypes> = T extends EditorTypes.Number | EditorTypes.Text | EditorTypes.Color ? {
    key: string;
    name: string;
    type: T;
} : {
    key: string;
    name: string;
    type: T;
    options: T extends EditorTypes.Select ? {
        label: string;
        value: string;
    }[] : T extends EditorTypes.Upload ? Record<string, any> : never;
};
export declare type ReactComp<T> = FC<T> | ComponentClass<T>;
export interface Pos {
    x: number;
    y: number;
    w: number;
    h: number;
}
export interface WidgetConfig<T extends Record<string, any> = any> {
    name: string;
    editorConfig: EditorConfig[];
    config: T;
    pos: Pos;
    routeInfo: {
        exact: boolean;
        path: string[];
    };
    style?: Partial<CSSProperties>;
    from?: string;
    showInPage?: boolean;
}
export interface RenderConfig {
    projectName: string;
    widgets: WidgetConfig[];
    pos: {
        w: number;
        h: number;
    };
    routerMode: "history" | "hash";
    histories: {
        path: string;
    }[];
    currHistoryIdx: number;
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
export declare type TransformConfig<T> = T extends Array<infer Item> ? Item extends {
    key: infer Key;
} ? Key extends string ? {
    [P in Key]: any;
} : {} : {} : T;
export declare function checkIfValidRenderConfig(renderConfig: any): RenderConfig | null;
