import { Reducer } from "redux";
import { ServiceTypes } from "./serviceReducer";
export declare const AC: <T extends ServiceTypes | Types, P = null>(type: T, payload: P) => {
    type: T;
    payload: P;
};
export declare type GetActionTypes<A extends {
    [k: string]: (...args: any[]) => {
        type: Types | ServiceTypes;
        payload: any;
    };
}> = {
    [K in keyof A]: ReturnType<A[K]>;
}[keyof A];
export interface GlobalState {
    msgs: {
        severity: string;
        msg: string;
    }[];
}
declare enum Types {
    AddMsg = "AddMsg"
}
export { Types as GlobalTypes };
export declare const globalActions: {
    addMsg: (severity: string, msg: string) => {
        type: Types;
        payload: {
            severity: string;
            msg: string;
        };
    };
};
export declare const globalReducer: Reducer<GlobalState, GetActionTypes<typeof globalActions>>;
