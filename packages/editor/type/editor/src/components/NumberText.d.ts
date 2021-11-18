import { FC } from "react";
declare const NumberText: FC<{
    value: number | string;
    onChange(val: number): void;
    placeholder?: string;
}>;
export default NumberText;
