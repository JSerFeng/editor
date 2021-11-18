import { FC } from "react";
import { WidgetProps } from "../../core/interfaces";
interface SvgRendererProp {
    svgStr: string;
}
declare const SvgRenderer: FC<WidgetProps<SvgRendererProp>>;
export default SvgRenderer;
