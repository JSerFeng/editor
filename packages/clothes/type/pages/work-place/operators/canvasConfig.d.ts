/// <reference types="react" />
import { Dispatch } from "redux";
import { StickFlags } from "../../../utils";
declare const _default: import("react-redux").ConnectedComponent<import("react").NamedExoticComponent<{
    dispatch: Dispatch<import("redux").AnyAction>;
    workplace: {
        renderConfig: import("../../..").RenderConfig;
        currPageWidgets: import("../../..").WidgetConfig<any>[];
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
            renderConfig: import("../../..").RenderConfig;
            selectedIndex: number[] | null;
            selectArea: import("../../../store/editorReducer").Pos;
            selectedTool: import("../../../store/editorReducer").Tools | null;
        }[];
        redoStack: {
            renderConfig: import("../../..").RenderConfig;
            selectedIndex: number[] | null;
            selectArea: import("../../../store/editorReducer").Pos;
            selectedTool: import("../../../store/editorReducer").Tools | null;
        }[];
        selectedTool: import("../../../store/editorReducer").Tools | null;
        tmpPos: import("../../../store/editorReducer").Pos[];
        refLine: {
            stickFlag: StickFlags;
            stickPx: number;
            showPx: number;
        };
    };
}>, import("react-redux").Omit<{
    dispatch: Dispatch<import("redux").AnyAction>;
    workplace: {
        renderConfig: import("../../..").RenderConfig;
        currPageWidgets: import("../../..").WidgetConfig<any>[];
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
            renderConfig: import("../../..").RenderConfig;
            selectedIndex: number[] | null;
            selectArea: import("../../../store/editorReducer").Pos;
            selectedTool: import("../../../store/editorReducer").Tools | null;
        }[];
        redoStack: {
            renderConfig: import("../../..").RenderConfig;
            selectedIndex: number[] | null;
            selectArea: import("../../../store/editorReducer").Pos;
            selectedTool: import("../../../store/editorReducer").Tools | null;
        }[];
        selectedTool: import("../../../store/editorReducer").Tools | null;
        tmpPos: import("../../../store/editorReducer").Pos[];
        refLine: {
            stickFlag: StickFlags;
            stickPx: number;
            showPx: number;
        };
    };
}, "workplace" | "dispatch">>;
export default _default;
