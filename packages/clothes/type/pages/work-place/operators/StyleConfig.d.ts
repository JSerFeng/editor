import { FC } from "react";
import { Dispatch } from "redux";
import { WidgetConfig } from "../../../render/interfaces";
interface StyleConfigProps {
    widgetConfig: WidgetConfig | WidgetConfig[] | null;
    dispatch: Dispatch;
}
declare const StyleConfig: FC<StyleConfigProps>;
export default StyleConfig;
