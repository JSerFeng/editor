import { RenderConfig } from "../render/interfaces";
export declare const scriptsMap: Map<string, HTMLScriptElement>;
export declare function preInstall(renderConfig: RenderConfig, pid: string): Promise<void>;
export declare function installWidget(wid: string, pid: string): Promise<void>;
