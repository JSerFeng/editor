import { FC } from "react";
import { Dispatch } from "redux";
import { RenderConfig } from "../..";
declare const _default: import("react-redux").ConnectedComponent<FC<{
    dispatch: Dispatch<import("redux").AnyAction>;
    renderConfig: RenderConfig;
}>, import("react-redux").Omit<{
    dispatch: Dispatch<import("redux").AnyAction>;
    renderConfig: RenderConfig;
}, "renderConfig" | "dispatch">>;
export default _default;
