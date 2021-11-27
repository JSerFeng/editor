import { RenderConfig } from "@v-editor/widgets-center";
import { ErrorCode, QueryBody } from "./request";
export { ErrorCode } from "./request";
export interface UserInfo {
    id: string;
    uid: string;
    userName: string;
    projects: string[];
}
export interface PaginationInfo {
    page: number;
    num: number;
    totalNum: number;
    totalPages: number;
}
export interface WidgetPO extends PO {
    name: string;
    showName: string;
    description: string;
    author: string;
    umdPath: string;
    esmPath: string;
    stylePath: string;
    privacy: boolean;
    snapShot: string;
}
export interface Res<T = any> {
    data: T;
    code: ErrorCode;
    msg: string;
}
export interface PO {
    _id: string;
}
export interface ProjectPO extends PO {
    name: string;
    createTime: Date;
    lastModified: Date;
    renderConfigStr: string;
    author: string;
    workmates: string[];
    dependencies: string[];
    private: boolean;
}
export declare const apiLogin: (uid: string, pwd: string) => Promise<Res<{
    access_token: string;
    userInfo: UserInfo;
}>>;
export declare const apiSave: (name: string, renderConfigStr: string, pid: string) => Promise<Res<any>>;
export declare const apiAddProject: (name: string, renderConfigStr: string) => Promise<Res<{
    pid: string;
}>>;
export declare const apiDropProject: (pid: string) => Promise<Res<any>>;
export declare const apiRegister: (uid: string, userName: string, pwd: string) => Promise<Res<any>>;
export declare const apiGetUserProjects: (query: QueryBody) => Promise<Res<{
    projects: ProjectPO[];
    pagination: PaginationInfo;
}>>;
export declare const apiInstallWidget: (wid: string, pid: string) => Promise<Res<{
    umdPath: string;
    esmPath: string;
    stylePath: string;
}>>;
export declare const apiGetAllWidgets: (page: number, kwd?: string | undefined) => Promise<Res<{
    totalPages: number;
    totalNum: number;
    page: number;
    widgets: WidgetPO[];
}>>;
export declare const apiRemoveWidget: (pid: string, wid: string) => Promise<Res<any>>;
export declare const apiDeleteWidget: (wid: string) => Promise<Res<any>>;
export declare const apiGenerate: (pid: string) => void;
/**
 * DEPRECATED API!!!!!!!!!
 */
export declare const apiFetchCode: () => Promise<Res<string>>;
export declare const apiDirList: (dir: string) => Promise<Res<{
    dirList: {
        isDir: boolean;
        name: string;
    }[];
    sep: string;
}>>;
export declare const apiDirBack: (dir: string) => Promise<Res<{
    dir: string;
    sep: string;
}>>;
export declare const apiDirCwd: () => Promise<Res<{
    dir: string;
    sep: string;
}>>;
export declare const apiDirCreate: (dir: string, dirname: string) => Promise<Res<any>>;
export declare const apiDirEnter: (dir: string, dirname: string) => Promise<Res<{
    dir: string;
    sep: string;
}>>;
export declare const apiDirRemove: (dir: string, dirname: string) => Promise<Res<any>>;
export declare const apiDeleteProject: (projectName: string) => Promise<Res<any>>;
export declare const apiExportJSON: (dir: string, renderConfig: RenderConfig) => Promise<Res<any>>;
