import { FC } from "react";
declare const Side: FC<{
    open: boolean;
    placement: "left" | "right" | "top";
    setOpen: (open: boolean) => void;
}>;
export default Side;
