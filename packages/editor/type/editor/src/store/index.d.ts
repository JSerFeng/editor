import { Types } from './editorReducer';
import { ServiceTypes } from "./serviceReducer";
export declare const AC: <T extends Types | ServiceTypes, P = null>(type: T, payload: P) => {
    type: T;
    payload: P;
};
export declare type GetActionTypes<A extends {
    [k: string]: (...args: any[]) => {
        type: Types | ServiceTypes;
        payload: any;
    };
}> = {
    [K in keyof A]: ReturnType<A[K]>;
}[keyof A];
declare type GetBaseState<T extends {
    [k: string]: (...args: any) => any;
}> = {
    [K in keyof T]: ReturnType<T[K]>;
};
declare const reducersMap: {
    serviceReducer: import("redux").Reducer<import("./serviceReducer").ServiceState, import("./serviceReducer").SActions>;
    editorReducer: import("redux").Reducer<import("./editorReducer").BaseState, GetActionTypes<{
        newMessage(type: import("./editorReducer").MessageType, text: string): {
            type: Types.NewMessage;
            payload: import("./editorReducer").Message;
        };
        removeMessage(type: import("./editorReducer").MessageType, idx: number): {
            type: Types.RemoveMessage;
            payload: {
                type: import("./editorReducer").MessageType;
                idx: number;
            };
        };
        actNewProject: (projectName: string, pos: {
            w: number;
            h: number;
        }) => {
            type: Types.NewProject;
            payload: import("@v-editor/widgets-center").RenderConfig;
        };
        actAddWidgetDep: (wid: string) => {
            type: Types.AddWidgetDep;
            payload: string;
        };
        actRemoveWidget: (wid: string) => {
            type: Types.RemoveWidget;
            payload: string;
        };
        actWid: (wid: string) => {
            type: Types.SetWid;
            payload: string;
        };
        actPid: (pid: string) => {
            type: Types.SetProjectId;
            payload: string;
        };
        actProjectName: (name: string) => {
            type: Types.ProjectName;
            payload: string;
        };
        actSelect: (indexes: number[] | null) => {
            type: Types.SelectMultiple;
            payload: number[] | null;
        };
        actSelectOne: (idx: number | null) => {
            type: Types.SelectOne;
            payload: number | null;
        };
        actChangeCanvasWH: (pos: {
            w: number;
            h: number;
        }) => {
            type: Types.ChangeCanvasWH;
            payload: {
                w: number;
                h: number;
            };
        };
        actAddItem: (config: import("@v-editor/widgets-center").WidgetConfig<any>) => {
            type: Types.AddItem;
            payload: import("@v-editor/widgets-center").WidgetConfig<any>;
        };
        actWidgetConfig: (config: import("@v-editor/widgets-center").WidgetConfig<any>) => {
            type: Types.WidgetConfig;
            payload: import("@v-editor/widgets-center").WidgetConfig<any>;
        };
        actChangeWidgetShowInPage: (idx: number, show: boolean) => {
            type: Types.ChangeWidgetShowInPage;
            payload: {
                idx: number;
                show: boolean;
            };
        };
        actStartWidgetPos: (initPos: import("./editorReducer").Pos) => {
            type: Types.StartWidgetChange;
            payload: import("./editorReducer").Pos;
        };
        actChangeWidgetPos: (deltaX: number, deltaY: number) => {
            type: Types.ChangeWidgetPos;
            payload: {
                deltaX: number;
                deltaY: number;
            };
        };
        actCommitChangeWidgetPos: (pos: import("./editorReducer").Pos) => {
            type: Types.CommitWidgetPosChange;
            payload: import("./editorReducer").Pos;
        };
        actDeleteItems: () => {
            type: Types.DeleteItem;
            payload: null;
        };
        actCopySelectedItems: () => {
            type: Types.CopySelected;
            payload: null;
        };
        actResetDraw: () => {
            type: Types.ResetDraw;
            payload: null;
        };
        actChangeWorkingPos: (pos: {
            x: number;
            y: number;
            scale: number;
        }) => {
            type: Types.ChangeWorkingPos;
            payload: {
                x: number;
                y: number;
                scale: number;
            };
        };
        actUndo: () => {
            type: Types.Undo;
            payload: null;
        };
        actRedo: () => {
            type: Types.Redo;
            payload: null;
        };
        actMoveCanvasToCenter: () => {
            type: Types.MoveCanvasToCenter;
            payload: null;
        };
        actSetInitCanvasPos: (pos: {
            x: number;
            y: number;
            scale: number;
        }) => {
            type: Types.SetInitCanvasPos;
            payload: {
                x: number;
                y: number;
                scale: number;
            };
        };
        actSelectTool: (tool: import("./editorReducer").Tools | null) => {
            type: Types.SelectTools;
            payload: import("./editorReducer").Tools | null;
        };
        actStickFlags: (stickFlags: import("../utils").StickFlags) => {
            type: Types.StickFlags;
            payload: import("../utils").StickFlags;
        };
        actStickPx: (px: number) => {
            type: Types.StickPx;
            payload: number;
        };
        actShowPx: (px: number) => {
            type: Types.ShowPx;
            payload: number;
        };
        actImportJson: (renderConfig: import("@v-editor/widgets-center").RenderConfig) => {
            type: Types.ImportJson;
            payload: import("@v-editor/widgets-center").RenderConfig;
        };
        actChangeHistory: (historyIdx: number) => {
            type: Types.ChangeHistory;
            payload: number;
        };
        actAddPage: (path: string) => {
            type: Types.AddPath;
            payload: string;
        };
        actChangeWidgetPath: (path: string[]) => {
            type: Types.ChangeWidgetPath;
            payload: string[];
        };
        actRouterMode: (mode: "history" | "hash") => {
            type: Types.ChangeRouterMode;
            payload: "history" | "hash";
        };
        actChangeWidgetExact: (exact: boolean) => {
            type: Types.ChangeWidgetExact;
            payload: boolean;
        };
        actDeleteHistory: (idx: number) => {
            type: Types.DeleteHistory;
            payload: number;
        };
    }>>;
};
export declare type BaseState = GetBaseState<typeof reducersMap>;
declare const store: import("redux").Store<import("redux").EmptyObject & {
    serviceReducer: import("./serviceReducer").ServiceState;
    editorReducer: import("./editorReducer").BaseState;
}, import("./serviceReducer").SActions | GetActionTypes<{
    newMessage(type: import("./editorReducer").MessageType, text: string): {
        type: Types.NewMessage;
        payload: import("./editorReducer").Message;
    };
    removeMessage(type: import("./editorReducer").MessageType, idx: number): {
        type: Types.RemoveMessage;
        payload: {
            type: import("./editorReducer").MessageType;
            idx: number;
        };
    };
    actNewProject: (projectName: string, pos: {
        w: number;
        h: number;
    }) => {
        type: Types.NewProject;
        payload: import("@v-editor/widgets-center").RenderConfig;
    };
    actAddWidgetDep: (wid: string) => {
        type: Types.AddWidgetDep;
        payload: string;
    };
    actRemoveWidget: (wid: string) => {
        type: Types.RemoveWidget;
        payload: string;
    };
    actWid: (wid: string) => {
        type: Types.SetWid;
        payload: string;
    };
    actPid: (pid: string) => {
        type: Types.SetProjectId;
        payload: string;
    };
    actProjectName: (name: string) => {
        type: Types.ProjectName;
        payload: string;
    };
    actSelect: (indexes: number[] | null) => {
        type: Types.SelectMultiple;
        payload: number[] | null;
    };
    actSelectOne: (idx: number | null) => {
        type: Types.SelectOne;
        payload: number | null;
    };
    actChangeCanvasWH: (pos: {
        w: number;
        h: number;
    }) => {
        type: Types.ChangeCanvasWH;
        payload: {
            w: number;
            h: number;
        };
    };
    actAddItem: (config: import("@v-editor/widgets-center").WidgetConfig<any>) => {
        type: Types.AddItem;
        payload: import("@v-editor/widgets-center").WidgetConfig<any>;
    };
    actWidgetConfig: (config: import("@v-editor/widgets-center").WidgetConfig<any>) => {
        type: Types.WidgetConfig;
        payload: import("@v-editor/widgets-center").WidgetConfig<any>;
    };
    actChangeWidgetShowInPage: (idx: number, show: boolean) => {
        type: Types.ChangeWidgetShowInPage;
        payload: {
            idx: number;
            show: boolean;
        };
    };
    actStartWidgetPos: (initPos: import("./editorReducer").Pos) => {
        type: Types.StartWidgetChange;
        payload: import("./editorReducer").Pos;
    };
    actChangeWidgetPos: (deltaX: number, deltaY: number) => {
        type: Types.ChangeWidgetPos;
        payload: {
            deltaX: number;
            deltaY: number;
        };
    };
    actCommitChangeWidgetPos: (pos: import("./editorReducer").Pos) => {
        type: Types.CommitWidgetPosChange;
        payload: import("./editorReducer").Pos;
    };
    actDeleteItems: () => {
        type: Types.DeleteItem;
        payload: null;
    };
    actCopySelectedItems: () => {
        type: Types.CopySelected;
        payload: null;
    };
    actResetDraw: () => {
        type: Types.ResetDraw;
        payload: null;
    };
    actChangeWorkingPos: (pos: {
        x: number;
        y: number;
        scale: number;
    }) => {
        type: Types.ChangeWorkingPos;
        payload: {
            x: number;
            y: number;
            scale: number;
        };
    };
    actUndo: () => {
        type: Types.Undo;
        payload: null;
    };
    actRedo: () => {
        type: Types.Redo;
        payload: null;
    };
    actMoveCanvasToCenter: () => {
        type: Types.MoveCanvasToCenter;
        payload: null;
    };
    actSetInitCanvasPos: (pos: {
        x: number;
        y: number;
        scale: number;
    }) => {
        type: Types.SetInitCanvasPos;
        payload: {
            x: number;
            y: number;
            scale: number;
        };
    };
    actSelectTool: (tool: import("./editorReducer").Tools | null) => {
        type: Types.SelectTools;
        payload: import("./editorReducer").Tools | null;
    };
    actStickFlags: (stickFlags: import("../utils").StickFlags) => {
        type: Types.StickFlags;
        payload: import("../utils").StickFlags;
    };
    actStickPx: (px: number) => {
        type: Types.StickPx;
        payload: number;
    };
    actShowPx: (px: number) => {
        type: Types.ShowPx;
        payload: number;
    };
    actImportJson: (renderConfig: import("@v-editor/widgets-center").RenderConfig) => {
        type: Types.ImportJson;
        payload: import("@v-editor/widgets-center").RenderConfig;
    };
    actChangeHistory: (historyIdx: number) => {
        type: Types.ChangeHistory;
        payload: number;
    };
    actAddPage: (path: string) => {
        type: Types.AddPath;
        payload: string;
    };
    actChangeWidgetPath: (path: string[]) => {
        type: Types.ChangeWidgetPath;
        payload: string[];
    };
    actRouterMode: (mode: "history" | "hash") => {
        type: Types.ChangeRouterMode;
        payload: "history" | "hash";
    };
    actChangeWidgetExact: (exact: boolean) => {
        type: Types.ChangeWidgetExact;
        payload: boolean;
    };
    actDeleteHistory: (idx: number) => {
        type: Types.DeleteHistory;
        payload: number;
    };
}>>;
export { store };
