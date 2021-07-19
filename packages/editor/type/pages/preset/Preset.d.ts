import { FC } from "react";
import { RenderConfig } from "../../render/interfaces";
import "./style.scss";
import WidgetsCenter from "../../render/WidgetsCenter";
declare const _default: import("react-redux").ConnectedComponent<FC<{
    renderConfig: RenderConfig;
    widgetsCenter: WidgetsCenter;
}>, import("react-redux").Omit<{
    renderConfig: RenderConfig;
    widgetsCenter: WidgetsCenter;
}, "renderConfig">>;
export default _default;
