import { FC } from "react";
import { Dispatch } from "redux";
import { WidgetConfig } from "../../../render/interfaces";
import WidgetsCenter from "../../../render/WidgetsCenter";
declare const _default: import("react-redux").ConnectedComponent<FC<{
    widgetsCenter: WidgetsCenter;
    currWidget: WidgetConfig<any> | WidgetConfig<any>[] | null;
    dispatch: Dispatch<import("redux").AnyAction>;
}>, import("react-redux").Omit<{
    widgetsCenter: WidgetsCenter;
    currWidget: WidgetConfig<any> | WidgetConfig<any>[] | null;
    dispatch: Dispatch<import("redux").AnyAction>;
}, "dispatch" | "currWidget">>;
export default _default;
