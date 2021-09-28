import { EditorTypes, WidgetPackage } from "visible-editor";
import Rectangle from "./rectangle";

const pkg: WidgetPackage = {
  FC: Rectangle,
  description: {
    name: "rectangle",
    showName: "矩形",
    version: "0.0.1",
    description: "基础的矩形，调整圆角可以呈现其他形状",
    editorConfig: [
      {
        key: "backgroundColor",
        name: "颜色",
        type: EditorTypes.Color
      }, {
        key: "borderRadius",
        name: "圆角",
        type: EditorTypes.Number
      }
    ],
    config: {
      backgroundColor: "lightblue"
    },
    from: "presets"
  }
}

export default pkg
