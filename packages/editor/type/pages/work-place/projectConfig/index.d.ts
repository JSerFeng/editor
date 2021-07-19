import { FC } from "react";
import { Dispatch } from "redux";
import { RenderConfig } from "../../../render/interfaces";
import "./style.scss";
declare const _default: import("react-redux").ConnectedComponent<FC<{
    dispatch: Dispatch<import("redux").AnyAction>;
    workplace: {
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
            selectedTool: import("../../../store/editorReducer").Tools | null;
        }[];
        redoStack: {
            renderConfig: RenderConfig;
            selectedIndex: number[] | null;
            selectArea: import("../../../store/editorReducer").Pos;
            selectedTool: import("../../../store/editorReducer").Tools | null;
        }[];
        selectedTool: import("../../../store/editorReducer").Tools | null;
        tmpPos: import("../../../store/editorReducer").Pos[];
        refLine: {
            stickFlag: import("../../../utils").StickFlags;
            stickPx: number;
            showPx: number;
        };
    };
}>, import("react-redux").Omit<{
    dispatch: Dispatch<import("redux").AnyAction>;
    workplace: {
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
            selectedTool: import("../../../store/editorReducer").Tools | null;
        }[];
        redoStack: {
            renderConfig: RenderConfig;
            selectedIndex: number[] | null;
            selectArea: import("../../../store/editorReducer").Pos;
            selectedTool: import("../../../store/editorReducer").Tools | null;
        }[];
        selectedTool: import("../../../store/editorReducer").Tools | null;
        tmpPos: import("../../../store/editorReducer").Pos[];
        refLine: {
            stickFlag: import("../../../utils").StickFlags;
            stickPx: number;
            showPx: number;
        };
    };
}, "workplace" | "dispatch">>;
export default _default;
