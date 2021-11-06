import WidgetsCenter from "../render/WidgetsCenter"
import Text from "../widgets/text"
import Rectangle from "./rectangle"
import Svg from "./svg"
import { createWidgetFromImage } from "./tools"

export const widgetsCenter = new WidgetsCenter()

widgetsCenter.use(Text)
widgetsCenter.use(Rectangle)
widgetsCenter.use(Svg)

//图片
widgetsCenter.use(createWidgetFromImage("sun", "/pexels-bruno-scramgnon-585759.jpg"))
widgetsCenter.use(createWidgetFromImage("car", "/pic.jpg"))
