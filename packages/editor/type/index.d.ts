import { FC } from "react";
import WidgetsCenter from "./render/WidgetsCenter";
import './index.css';
import "antd/dist/antd.css";
export type { WidgetConfig, WidgetConfigProp, WidgetDescription, WidgetPackage, WidgetProps, EditorConfig, RenderConfig } from "./render/interfaces";
export { EditorTypes } from "./render/interfaces";
export { createPkg } from "./render/WidgetsCenter";
export declare const widgetsCenter: WidgetsCenter;
export declare const Editor: FC<{
    widgetsCenter?: WidgetsCenter;
}>;
