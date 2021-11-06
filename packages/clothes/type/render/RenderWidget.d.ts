import { FC, Dispatch, RefObject, ComponentClass } from "react";
import { Dispatch as ReduxDispatch } from "redux";
import type { Pos, WidgetConfig, WidgetProps } from "./interfaces";
import { RefLine } from "../utils";
import { BaseState } from "../store";
import EventEmitter from "../utils/eventEmitter";
interface WrapperProps {
    selected: boolean;
    widgetConfig: WidgetConfig;
    idx: number;
    container: RefObject<HTMLDivElement>;
    setRefLines: Dispatch<RefLine[]>;
    dispatch: ReduxDispatch;
    allWidgets: WidgetConfig[];
    createWidgets: (config: WidgetConfig) => FC<WidgetProps> | ComponentClass<WidgetProps> | null;
    eventPool: EventEmitter;
    refLine: BaseState["editorReducer"]["workplace"]["refLine"];
    setMenuPos: (cb: (pos: Pos) => Pos) => void;
    canvasH: number;
    canvasW: number;
}
export declare const RenderWidget: FC<WrapperProps>;
declare const _default: import("react-redux").ConnectedComponent<FC<WrapperProps>, import("react-redux").Omit<WrapperProps, "refLine" | "allWidgets" | "dispatch" | "canvasH" | "canvasW">>;
export default _default;
