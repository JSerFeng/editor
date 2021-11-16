import WidgetsCenter from "../render/WidgetsCenter"
import Text from "../widgets/text"
import Rectangle from "./rectangle"
import Svg from "./svg"
import Img from "./img"

export const widgetsCenter = new WidgetsCenter()

widgetsCenter.use(Text)
widgetsCenter.use(Rectangle)
widgetsCenter.use(Svg)
widgetsCenter.use(Img)
