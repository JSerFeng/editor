import { FC } from "react";
export interface IMsg {
    message: string;
    _id?: number;
    autoHideDuration?: number;
    severity?: "error" | "warning" | "success" | "info";
}
declare class Notification {
    msgList: IMsg[];
    sender: MessagePort;
    nextTick: Promise<void>;
    _id: number;
    _isSending: boolean;
    constructor(sender: MessagePort);
    success(msg: IMsg): void;
    info(msg: IMsg): void;
    warn(msg: IMsg): void;
    error(msg: IMsg): void;
    prepareSend(msg: IMsg): Promise<void>;
    send(): void;
}
export declare const notification: Notification;
declare const Msg: FC;
export default Msg;
