import { FC } from "react";
import { WidgetProps } from "../../core/interfaces";
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
declare const Text: FC<WidgetProps<TextProps>>;
export default Text;
