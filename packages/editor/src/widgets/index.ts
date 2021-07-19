import WidgetsCenter from "../render/WidgetsCenter"
import Text from "../widgets/text"
import Rectangle from "./rectangle"
import RouterLinkPkg from "./router-link"
import Svg from "./svg"

export const widgetsCenter = new WidgetsCenter()

widgetsCenter.use(Text)
widgetsCenter.use(Rectangle)
widgetsCenter.use(Svg)
widgetsCenter.use(RouterLinkPkg)
