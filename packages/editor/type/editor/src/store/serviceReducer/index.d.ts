import { Reducer } from "redux";
import { UserInfo } from "../../api";
import { GetActionTypes } from "../";
export interface ServiceState {
    userInfo: UserInfo | null;
}
export declare enum ServiceTypes {
    DoneLogin = "DoneLogin",
    Login = "Login",
    Register = "Register"
}
export declare type SActions = GetActionTypes<typeof serviceActions>;
export declare const serviceActions: {
    actLogin: (uid: string, pwd: string) => {
        type: ServiceTypes.Login;
        payload: {
            uid: string;
            pwd: string;
        };
    };
    actDoneLogin: (data: {
        access_token: string;
        userInfo: UserInfo;
    }) => {
        type: ServiceTypes.DoneLogin;
        payload: {
            access_token: string;
            userInfo: UserInfo;
        };
    };
};
export declare const rootEpic: import("redux-observable").Epic<SActions, SActions, ServiceTypes, any>;
export declare const serviceReducer: Reducer<ServiceState, SActions>;
