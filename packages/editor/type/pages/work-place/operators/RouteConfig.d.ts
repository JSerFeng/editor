import { FC } from "react";
import { WidgetConfig } from "@v-editor/widgets-center";
import { Dispatch } from "redux";
declare const _default: import("react-redux").ConnectedComponent<FC<{
    widgetConfig: WidgetConfig<any> | WidgetConfig<any>[] | null;
    dispatch: Dispatch<import("redux").AnyAction>;
}>, import("react-redux").Omit<{
    widgetConfig: WidgetConfig<any> | WidgetConfig<any>[] | null;
    dispatch: Dispatch<import("redux").AnyAction>;
}, "dispatch">>;
export default _default;
