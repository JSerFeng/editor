import { FC } from "react";
import { Dispatch } from "redux";
import { WidgetConfig, WidgetPackage } from "../../render/interfaces";
import WidgetsCenter from "../../render/WidgetsCenter";
declare const _default: import("react-redux").ConnectedComponent<FC<{
    widgetsCenter: WidgetsCenter;
    dispatch: Dispatch<import("redux").AnyAction>;
    currHistory: {
        path: string;
    };
    createWidgetConfig: (name: string) => WidgetConfig<any>;
    allWidgets: WidgetPackage[];
}>, import("react-redux").Omit<{
    widgetsCenter: WidgetsCenter;
    dispatch: Dispatch<import("redux").AnyAction>;
    currHistory: {
        path: string;
    };
    createWidgetConfig: (name: string) => WidgetConfig<any>;
    allWidgets: WidgetPackage[];
}, "dispatch" | "currHistory">>;
export default _default;
