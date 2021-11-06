import { ComponentClass, FC } from 'react';
import { Dispatch } from "redux";
import { Tools } from '../store/editorReducer';
import { Pos, WidgetConfig, WidgetProps } from './interfaces';
import EventEmitter from '../utils/eventEmitter';
import "./style.scss";
declare const _default: import("react-redux").ConnectedComponent<FC<{
    workplace: {
        renderConfig: import("./interfaces").RenderConfig;
        currPageWidgets: WidgetConfig<any>[];
        selectedIndex: number[] | null;
        canvas: {
            x: number;
            y: number;
            scale: number;
            centerPosition: {
                x: number;
                y: number;
                scale: number;
            };
        };
        selectArea: import("../store/editorReducer").Pos;
        undoStack: {
            renderConfig: import("./interfaces").RenderConfig;
            selectedIndex: number[] | null;
            selectArea: import("../store/editorReducer").Pos;
            selectedTool: Tools | null;
        }[];
        redoStack: {
            renderConfig: import("./interfaces").RenderConfig;
            selectedIndex: number[] | null;
            selectArea: import("../store/editorReducer").Pos;
            selectedTool: Tools | null;
        }[];
        selectedTool: Tools | null;
        tmpPos: import("../store/editorReducer").Pos[];
        refLine: {
            stickFlag: import("../utils").StickFlags;
            stickPx: number;
            showPx: number;
        };
    };
    dispatch: Dispatch<import("redux").AnyAction>;
    createWidgets: (config: string | WidgetConfig<any>) => FC<WidgetProps<any>> | ComponentClass<WidgetProps<any>, any> | null;
    createWidgetConfig: (name: string, pos?: Pos | undefined) => WidgetConfig<any>;
    eventPool: EventEmitter;
}>, import("react-redux").Omit<{
    workplace: {
        renderConfig: import("./interfaces").RenderConfig;
        currPageWidgets: WidgetConfig<any>[];
        selectedIndex: number[] | null;
        canvas: {
            x: number;
            y: number;
            scale: number;
            centerPosition: {
                x: number;
                y: number;
                scale: number;
            };
        };
        selectArea: import("../store/editorReducer").Pos;
        undoStack: {
            renderConfig: import("./interfaces").RenderConfig;
            selectedIndex: number[] | null;
            selectArea: import("../store/editorReducer").Pos;
            selectedTool: Tools | null;
        }[];
        redoStack: {
            renderConfig: import("./interfaces").RenderConfig;
            selectedIndex: number[] | null;
            selectArea: import("../store/editorReducer").Pos;
            selectedTool: Tools | null;
        }[];
        selectedTool: Tools | null;
        tmpPos: import("../store/editorReducer").Pos[];
        refLine: {
            stickFlag: import("../utils").StickFlags;
            stickPx: number;
            showPx: number;
        };
    };
    dispatch: Dispatch<import("redux").AnyAction>;
    createWidgets: (config: string | WidgetConfig<any>) => FC<WidgetProps<any>> | ComponentClass<WidgetProps<any>, any> | null;
    createWidgetConfig: (name: string, pos?: Pos | undefined) => WidgetConfig<any>;
    eventPool: EventEmitter;
}, "workplace" | "dispatch">>;
export default _default;
