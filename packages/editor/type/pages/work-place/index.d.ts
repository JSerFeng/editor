import { FC } from "react";
import { RenderConfig } from "../../render/interfaces";
import WidgetsCenter from "../../render/WidgetsCenter";
import "./style.scss";
declare const _default: import("react-redux").ConnectedComponent<FC<{
    widgetsCenter: WidgetsCenter;
    currHistory: string;
    renderConfig: RenderConfig;
    wid: string;
}>, import("react-redux").Omit<{
    widgetsCenter: WidgetsCenter;
    currHistory: string;
    renderConfig: RenderConfig;
    wid: string;
}, "renderConfig" | "wid" | "currHistory">>;
export default _default;
