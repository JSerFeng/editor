import { WidgetProps } from "visible-editor";

export interface TextProps extends WidgetProps {
  config: {
    fontSize: number,
    color: string,
    padding: number,
    content: string,
    justifyContent: "center" | "right" | "left",
    alignItems: "center" | "flex-start" | "flex-end"
    backgroundColor: "#fff"
  },
}


