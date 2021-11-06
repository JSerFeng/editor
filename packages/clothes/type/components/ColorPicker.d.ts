import { FC } from "react";
import { ColorResult } from "react-color";
declare const ColorPicker: FC<{
    color: string;
    onChangeComplete: (color: ColorResult) => void;
}>;
export default ColorPicker;
