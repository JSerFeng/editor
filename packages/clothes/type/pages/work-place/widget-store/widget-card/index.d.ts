import { FC } from "react";
import { Dispatch } from "redux";
import { WidgetPO } from "../../../../api";
import "./card.scss";
declare const _default: import("react-redux").ConnectedComponent<FC<{
    widget: WidgetPO;
    pid: string;
    dispatch: Dispatch<import("redux").AnyAction>;
}>, import("react-redux").Omit<{
    widget: WidgetPO;
    pid: string;
    dispatch: Dispatch<import("redux").AnyAction>;
}, "pid" | "dispatch">>;
export default _default;
