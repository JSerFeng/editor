import { FC } from "react";
import { Dispatch } from "redux";
import { WidgetConfig } from "@v-editor/widgets-center";
interface StyleConfigProps {
    widgetConfig: WidgetConfig | WidgetConfig[] | null;
    dispatch: Dispatch;
}
declare const StyleConfig: FC<StyleConfigProps>;
export default StyleConfig;
