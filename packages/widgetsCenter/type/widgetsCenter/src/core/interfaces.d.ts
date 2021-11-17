import { ComponentClass, CSSProperties, FC } from "react";
import { EventEmitter } from "./eventEmitter";
export declare const EditorTypes: {
    Color: "Color";
    Upload: "Upload";
    Text: "Text";
    Number: "Number";
    Select: "Select";
};
declare type E<T extends Record<string, any>> = {
    [K in keyof T]: K;
}[keyof T];
export declare type EditorConfig<T = any, U extends string = any> = U extends typeof EditorTypes.Select ? {
    key: E<T>;
    name: string;
    type: U;
    options: U extends typeof EditorTypes.Select ? {
        label: string;
        value: string;
    }[] : Record<string, any>;
} : {
    key: E<T>;
    name: string;
    type: U;
};
export declare type ReactComp<T> = FC<T> | ComponentClass<T>;
export interface Pos {
    x: number;
    y: number;
    w: number;
    h: number;
}
export declare function normalizePos(pos: any): Pos;
export declare type PathMeta = {
    path: string;
};
export interface WidgetConfig<T extends Record<string, any> = any> extends WidgetDescription<T> {
    pos: Pos;
    routeInfo: {
        exact: boolean;
        path: string[];
    };
    dependencies?: Record<string, string>;
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
    dependencies: string[];
}
export interface WidgetDescription<T = any> {
    name: string;
    showName: string;
    editorConfig: EditorConfig<T>[];
    config: T;
    initPos?: {
        w: number;
        h: number;
    };
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
export interface WidgetPackage<T = any> {
    FC: ReactComp<WidgetProps<T>>;
    getDescription: (...args: any) => WidgetDescription<T>;
    Configuration?: ReactComp<WidgetConfigProp> | undefined;
}
export declare type TransformConfig<T> = T extends Array<infer Item> ? Item extends {
    key: infer Key;
} ? Key extends string ? {
    [P in Key]: any;
} : {} : {} : T;
export declare function checkIfValidRenderConfig(renderConfig: any): RenderConfig | null;
export declare const sureStrToRenderConfig: (str: string) => RenderConfig;
export {};
