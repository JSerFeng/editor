export declare const baseURL = "http://localhost:3000/api";
export interface QueryBody {
    page: number;
    num?: number;
}
export declare const request: import("axios").AxiosInstance;
export declare const fileRequest: import("axios").AxiosInstance;
export declare enum ErrorCode {
    Success = 200,
    InternalError = 500,
    Fail = 415,
    TokenExpire = 420,
    ParamsError = 445,
    HasBeenRegistered = 450,
    PwdOrIdError = 455
}
