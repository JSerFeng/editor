import { FC } from "react";
import { Dispatch } from "redux";
import { BaseState } from "../../../../store";
import "./style.scss";
interface Props {
    dispatch: Dispatch;
    messages: BaseState["editorReducer"]["messages"];
}
declare const _default: import("react-redux").ConnectedComponent<FC<Props>, import("react-redux").Omit<Props, "messages" | "dispatch">>;
export default _default;
