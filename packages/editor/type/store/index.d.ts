declare const reducersMap: {
    editorReducer: import("redux").Reducer<import("./editorReducer").BaseState, import("./editorReducer").GetActionTypes<{
        actProjectName: (name: string) => {
            type: import("./editorReducer").Types.ProjectName;
            payload: string;
        };
        actSelect: (indexes: number[] | null) => {
            type: import("./editorReducer").Types.SelectMultiple;
            payload: number[] | null;
        };
        actSelectOne: (idx: number | null) => {
            type: import("./editorReducer").Types.SelectOne;
            payload: number | null;
        };
        actChangeCanvasWH: (pos: {
            w: number;
            h: number;
        }) => {
            type: import("./editorReducer").Types.ChangeCanvasWH;
            payload: {
                w: number;
                h: number;
            };
        };
        actAddItem: (config: import("..").WidgetConfig<any>) => {
            type: import("./editorReducer").Types.AddItem;
            payload: import("..").WidgetConfig<any>;
        };
        actWidgetConfig: (config: import("..").WidgetConfig<any>) => {
            type: import("./editorReducer").Types.WidgetConfig;
            payload: import("..").WidgetConfig<any>;
        };
        actChangeWidgetShowInPage: (idx: number, show: boolean) => {
            type: import("./editorReducer").Types.ChangeWidgetShowInPage;
            payload: {
                idx: number;
                show: boolean;
            };
        };
        actStartWidgetPos: (initPos: import("./editorReducer").Pos) => {
            type: import("./editorReducer").Types.StartWidgetChange;
            payload: import("./editorReducer").Pos;
        };
        actChangeWidgetPos: (deltaX: number, deltaY: number) => {
            type: import("./editorReducer").Types.ChangeWidgetPos;
            payload: {
                deltaX: number;
                deltaY: number;
            };
        };
        actCommitChangeWidgetPos: (pos: import("./editorReducer").Pos) => {
            type: import("./editorReducer").Types.CommitWidgetPosChange;
            payload: import("./editorReducer").Pos;
        };
        actDeleteItems: () => {
            type: import("./editorReducer").Types.DeleteItem;
            payload: null;
        };
        actCopySelectedItems: () => {
            type: import("./editorReducer").Types.CopySelected;
            payload: null;
        };
        actResetDraw: () => {
            type: import("./editorReducer").Types.ResetDraw;
            payload: null;
        };
        actChangeWorkingPos: (pos: {
            x: number;
            y: number;
            scale: number;
        }) => {
            type: import("./editorReducer").Types.ChangeWorkingPos;
            payload: {
                x: number;
                y: number;
                scale: number;
            };
        };
        actUndo: () => {
            type: import("./editorReducer").Types.Undo;
            payload: null;
        };
        actRedo: () => {
            type: import("./editorReducer").Types.Redo;
            payload: null;
        };
        actMoveCanvasToCenter: () => {
            type: import("./editorReducer").Types.MoveCanvasToCenter;
            payload: null;
        };
        actSetInitCanvasPos: (pos: {
            x: number;
            y: number;
            scale: number;
        }) => {
            type: import("./editorReducer").Types.SetInitCanvasPos;
            payload: {
                x: number;
                y: number;
                scale: number;
            };
        };
        actSelectTool: (tool: import("./editorReducer").Tools | null) => {
            type: import("./editorReducer").Types.SelectTools;
            payload: import("./editorReducer").Tools | null;
        };
        actStickFlags: (stickFlags: import("../utils").StickFlags) => {
            type: import("./editorReducer").Types.StickFlags;
            payload: import("../utils").StickFlags;
        };
        actStickPx: (px: number) => {
            type: import("./editorReducer").Types.StickPx;
            payload: number;
        };
        actShowPx: (px: number) => {
            type: import("./editorReducer").Types.ShowPx;
            payload: number;
        };
        actImportJson: (renderConfig: import("..").RenderConfig) => {
            type: import("./editorReducer").Types.ImportJson;
            payload: import("..").RenderConfig;
        };
        actChangeHistory: (historyIdx: number) => {
            type: import("./editorReducer").Types.ChangeHistory;
            payload: number;
        };
        actAddPage: (path: string) => {
            type: import("./editorReducer").Types.AddPath;
            payload: string;
        };
        actChangeWidgetPath: (path: string[]) => {
            type: import("./editorReducer").Types.ChangeWidgetPath;
            payload: string[];
        };
        actRouterMode: (mode: "history" | "hash") => {
            type: import("./editorReducer").Types.ChangeRouterMode;
            payload: "history" | "hash";
        };
        actChangeWidgetExact: (exact: boolean) => {
            type: import("./editorReducer").Types.ChangeWidgetExact;
            payload: boolean;
        };
        actDeleteHistory: (idx: number) => {
            type: import("./editorReducer").Types.DeleteHistory;
            payload: number;
        };
    }>>;
};
declare type GetBaseState<T extends {
    [k: string]: (...args: any) => any;
}> = {
    [K in keyof T]: ReturnType<T[K]>;
};
export declare type BaseState = GetBaseState<typeof reducersMap>;
declare const store: import("redux").Store<import("redux").EmptyObject & {
    editorReducer: import("./editorReducer").BaseState;
}, import("./editorReducer").GetActionTypes<{
    actProjectName: (name: string) => {
        type: import("./editorReducer").Types.ProjectName;
        payload: string;
    };
    actSelect: (indexes: number[] | null) => {
        type: import("./editorReducer").Types.SelectMultiple;
        payload: number[] | null;
    };
    actSelectOne: (idx: number | null) => {
        type: import("./editorReducer").Types.SelectOne;
        payload: number | null;
    };
    actChangeCanvasWH: (pos: {
        w: number;
        h: number;
    }) => {
        type: import("./editorReducer").Types.ChangeCanvasWH;
        payload: {
            w: number;
            h: number;
        };
    };
    actAddItem: (config: import("..").WidgetConfig<any>) => {
        type: import("./editorReducer").Types.AddItem;
        payload: import("..").WidgetConfig<any>;
    };
    actWidgetConfig: (config: import("..").WidgetConfig<any>) => {
        type: import("./editorReducer").Types.WidgetConfig;
        payload: import("..").WidgetConfig<any>;
    };
    actChangeWidgetShowInPage: (idx: number, show: boolean) => {
        type: import("./editorReducer").Types.ChangeWidgetShowInPage;
        payload: {
            idx: number;
            show: boolean;
        };
    };
    actStartWidgetPos: (initPos: import("./editorReducer").Pos) => {
        type: import("./editorReducer").Types.StartWidgetChange;
        payload: import("./editorReducer").Pos;
    };
    actChangeWidgetPos: (deltaX: number, deltaY: number) => {
        type: import("./editorReducer").Types.ChangeWidgetPos;
        payload: {
            deltaX: number;
            deltaY: number;
        };
    };
    actCommitChangeWidgetPos: (pos: import("./editorReducer").Pos) => {
        type: import("./editorReducer").Types.CommitWidgetPosChange;
        payload: import("./editorReducer").Pos;
    };
    actDeleteItems: () => {
        type: import("./editorReducer").Types.DeleteItem;
        payload: null;
    };
    actCopySelectedItems: () => {
        type: import("./editorReducer").Types.CopySelected;
        payload: null;
    };
    actResetDraw: () => {
        type: import("./editorReducer").Types.ResetDraw;
        payload: null;
    };
    actChangeWorkingPos: (pos: {
        x: number;
        y: number;
        scale: number;
    }) => {
        type: import("./editorReducer").Types.ChangeWorkingPos;
        payload: {
            x: number;
            y: number;
            scale: number;
        };
    };
    actUndo: () => {
        type: import("./editorReducer").Types.Undo;
        payload: null;
    };
    actRedo: () => {
        type: import("./editorReducer").Types.Redo;
        payload: null;
    };
    actMoveCanvasToCenter: () => {
        type: import("./editorReducer").Types.MoveCanvasToCenter;
        payload: null;
    };
    actSetInitCanvasPos: (pos: {
        x: number;
        y: number;
        scale: number;
    }) => {
        type: import("./editorReducer").Types.SetInitCanvasPos;
        payload: {
            x: number;
            y: number;
            scale: number;
        };
    };
    actSelectTool: (tool: import("./editorReducer").Tools | null) => {
        type: import("./editorReducer").Types.SelectTools;
        payload: import("./editorReducer").Tools | null;
    };
    actStickFlags: (stickFlags: import("../utils").StickFlags) => {
        type: import("./editorReducer").Types.StickFlags;
        payload: import("../utils").StickFlags;
    };
    actStickPx: (px: number) => {
        type: import("./editorReducer").Types.StickPx;
        payload: number;
    };
    actShowPx: (px: number) => {
        type: import("./editorReducer").Types.ShowPx;
        payload: number;
    };
    actImportJson: (renderConfig: import("..").RenderConfig) => {
        type: import("./editorReducer").Types.ImportJson;
        payload: import("..").RenderConfig;
    };
    actChangeHistory: (historyIdx: number) => {
        type: import("./editorReducer").Types.ChangeHistory;
        payload: number;
    };
    actAddPage: (path: string) => {
        type: import("./editorReducer").Types.AddPath;
        payload: string;
    };
    actChangeWidgetPath: (path: string[]) => {
        type: import("./editorReducer").Types.ChangeWidgetPath;
        payload: string[];
    };
    actRouterMode: (mode: "history" | "hash") => {
        type: import("./editorReducer").Types.ChangeRouterMode;
        payload: "history" | "hash";
    };
    actChangeWidgetExact: (exact: boolean) => {
        type: import("./editorReducer").Types.ChangeWidgetExact;
        payload: boolean;
    };
    actDeleteHistory: (idx: number) => {
        type: import("./editorReducer").Types.DeleteHistory;
        payload: number;
    };
}>>;
export { store };
