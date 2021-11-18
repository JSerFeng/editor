import { FC } from "react";
import { Dispatch } from "redux";
declare const _default: import("react-redux").ConnectedComponent<FC<{
    dispatch: Dispatch<import("redux").AnyAction>;
    msg: string;
    open: boolean;
    close: () => void;
}>, import("react-redux").Omit<{
    dispatch: Dispatch<import("redux").AnyAction>;
    msg: string;
    open: boolean;
    close: () => void;
}, "dispatch">>;
export default _default;
