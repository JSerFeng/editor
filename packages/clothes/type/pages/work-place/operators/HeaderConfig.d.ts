import { FC } from "react";
import { Dispatch } from "redux";
import { Tools } from "../../../store/editorReducer";
import { RenderConfig } from "../../../render/interfaces";
declare const _default: import("react-redux").ConnectedComponent<FC<{
    dispatch: Dispatch<import("redux").AnyAction>;
    workPlace: {
        renderConfig: RenderConfig;
        currPageWidgets: import("../../../render/interfaces").WidgetConfig<any>[];
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
        selectArea: import("../../../store/editorReducer").Pos;
        undoStack: {
            renderConfig: RenderConfig;
            selectedIndex: number[] | null;
            selectArea: import("../../../store/editorReducer").Pos;
            selectedTool: Tools | null;
        }[];
        redoStack: {
            renderConfig: RenderConfig;
            selectedIndex: number[] | null;
            selectArea: import("../../../store/editorReducer").Pos;
            selectedTool: Tools | null;
        }[];
        selectedTool: Tools | null;
        tmpPos: import("../../../store/editorReducer").Pos[];
        refLine: {
            stickFlag: import("../../../utils").StickFlags;
            stickPx: number;
            showPx: number;
        };
    };
    renderConfig: RenderConfig;
    histories: {
        path: string;
    }[];
    currHistoryIdx: number;
    openDrawer: () => void;
    pid: string;
}>, import("react-redux").Omit<{
    dispatch: Dispatch<import("redux").AnyAction>;
    workPlace: {
        renderConfig: RenderConfig;
        currPageWidgets: import("../../../render/interfaces").WidgetConfig<any>[];
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
        selectArea: import("../../../store/editorReducer").Pos;
        undoStack: {
            renderConfig: RenderConfig;
            selectedIndex: number[] | null;
            selectArea: import("../../../store/editorReducer").Pos;
            selectedTool: Tools | null;
        }[];
        redoStack: {
            renderConfig: RenderConfig;
            selectedIndex: number[] | null;
            selectArea: import("../../../store/editorReducer").Pos;
            selectedTool: Tools | null;
        }[];
        selectedTool: Tools | null;
        tmpPos: import("../../../store/editorReducer").Pos[];
        refLine: {
            stickFlag: import("../../../utils").StickFlags;
            stickPx: number;
            showPx: number;
        };
    };
    renderConfig: RenderConfig;
    histories: {
        path: string;
    }[];
    currHistoryIdx: number;
    openDrawer: () => void;
    pid: string;
}, "renderConfig" | "pid" | "histories" | "currHistoryIdx" | "dispatch" | "workPlace">>;
export default _default;
