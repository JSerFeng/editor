import { RenderConfig } from "../render/interfaces";
import { ErrorCode } from "./request";
export { ErrorCode } from "./request";
export interface Res<T = any> {
    data: T;
    code: ErrorCode;
    msg: string;
}
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
export declare const apiGenerate: (renderConfig: RenderConfig, dir: string) => Promise<Res<any>>;
export declare const apiDirRemove: (dir: string, dirname: string) => Promise<Res<any>>;
export declare const apiGetAllProjects: () => Promise<Res<{
    projectList: {
        lastModify: string;
        renderConfig: RenderConfig;
    }[];
}>>;
export declare const apiSave: (renderConfig: RenderConfig) => Promise<Res<any>>;
export declare const apiDeleteProject: (projectName: string) => Promise<Res<any>>;
export declare const apiExportJSON: (dir: string, renderConfig: RenderConfig) => Promise<Res<any>>;
