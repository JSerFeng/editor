import { FC } from "react";
import { WidgetConfigProp, WidgetProps } from "../../core/interfaces";
export interface TextProps {
    fontSize: number;
    fontFace: string;
    woffUrl?: string;
    color: string;
    padding: number;
    content: string;
    justifyContent: "center" | "right" | "left";
    alignItems: "center" | "flex-start" | "flex-end";
    backgroundColor: "#fff";
}
export declare const Text: FC<WidgetProps<TextProps>>;
export declare const TextConfiguration: FC<WidgetConfigProp<TextProps>>;
