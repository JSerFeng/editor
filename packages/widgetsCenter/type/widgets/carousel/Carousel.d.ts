import { FC } from "react";
import { WidgetConfigProp, WidgetProps } from "../../core";
import 'react-awesome-slider/dist/styles.css';
import "./style.scss";
export interface CarouselProps {
    showButton: boolean;
    showDot: boolean;
    iterationTime: number;
    resources: {
        text?: string;
        bgColor?: string;
        color?: string;
        img?: string;
        href?: string;
        fontSize?: string;
    }[];
}
export declare const Carousel: FC<WidgetProps<CarouselProps>>;
export declare const Configure: FC<WidgetConfigProp<CarouselProps>>;
