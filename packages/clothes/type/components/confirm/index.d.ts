import { FC, ReactElement } from "react";
import "./style.scss";
declare const Confirm: FC<{
    render: ReactElement | string;
    onConfirm: () => void;
    onCancel: () => void;
    open: boolean;
    onClose?: () => void;
}>;
export default Confirm;
