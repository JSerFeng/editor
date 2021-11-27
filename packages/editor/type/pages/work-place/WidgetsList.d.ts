import { FC } from "react";
import { Dispatch } from "redux";
import { WidgetConfig, WidgetPackage, WidgetsCenter } from "@v-editor/widgets-center";
declare const _default: import("react-redux").ConnectedComponent<FC<{
    widgetsCenter: WidgetsCenter;
    dispatch: Dispatch<import("redux").AnyAction>;
    currHistory: {
        path: string;
    };
    createWidgetConfig: (name: string) => WidgetConfig<any>;
    allWidgets: WidgetPackage<any>[];
}>, import("react-redux").Omit<{
    widgetsCenter: WidgetsCenter;
    dispatch: Dispatch<import("redux").AnyAction>;
    currHistory: {
        path: string;
    };
    createWidgetConfig: (name: string) => WidgetConfig<any>;
    allWidgets: WidgetPackage<any>[];
}, "dispatch" | "currHistory">>;
export default _default;
