import { FC } from "react";
import "./style.scss";
declare const ColorPicker: FC<{
    color: string;
    onChangeComplete: (color: string) => void;
}>;
export default ColorPicker;
