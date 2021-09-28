import {WidgetDescription} from "@editor/editor";
// @ts-ignore
import {name, description, snapShot} from "../../package.json";

const widgetInfo: WidgetDescription = {
  name, //在全局变量中的名字
  showName: "自定义组件", //显示在编辑器中的组件名字
  description,
  snapShot, //组件图片
  initPos: {
    w: 200,
    h: 200
  },
  editorConfig: [
    {
      type: "Color",
      name: "颜色",
      key: "customColor"
    }, {
      type: Text,
      name: "标题内容",
      key: "title"
    }, {
      type: Text,
      name: "文章内容",
      key: "content"
    }
  ],
  config: {
    customColor: "blue",
    title: "我是标题",
    content: "我是E内容"
  },
  from: "custom"
}

export default widgetInfo
