import { FC } from "react";
import './index.scss';
import "antd/dist/antd.css";
import { WidgetsCenter } from "@v-editor/widgets-center";
export * from "@v-editor/widgets-center";
export declare const widgetsCenter: WidgetsCenter;
export declare const Editor: FC<{
    widgetsCenter?: WidgetsCenter;
}>;
