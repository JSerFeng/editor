import { notification } from "antd";
import { RenderConfig } from "../render/interfaces";
import { aTagDownload, storage } from "../utils";
import { request, ErrorCode, QueryBody, baseURL } from "./request";

export { ErrorCode } from "./request"

export interface UserInfo {
	id: string,
	uid: string,
	userName: string,
	projects: string[],
}

export interface PaginationInfo {
	page: number,
	num: number,
	totalNum: number,
	totalPages: number
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
	data: T,
	code: ErrorCode,
	msg: string
}

export interface PO {
	_id: string
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

export const apiLogin = (uid: string, pwd: string) => request.post("/user/login", {
	uid,
	pwd
}) as Promise<Res<{
	access_token: string,
	userInfo: UserInfo
}>>

export const apiSave = (
	name: string,
	renderConfigStr: string,
	pid: string,
) => request.post("/projects/modify", {
	name,
	renderConfigStr,
	pid
}) as Promise<Res>

export const apiAddProject = (name: string, renderConfigStr: string) => request.post("/projects/add", {
	name,
	renderConfigStr
}) as Promise<Res<{
	pid: string
}>>

export const apiDropProject = (pid: string) => request.post("/projects/drop", {
	pid
}) as Promise<Res>

export const apiRegister = (
	uid: string,
	userName: string,
	pwd: string
) => request.post("/user/register", {
	uid,
	userName,
	pwd
}) as Promise<Res>

export const apiGetUserProjects = (query: QueryBody) => request.post("/projects/all", query) as Promise<Res<{
	projects: ProjectPO[],
	pagination: PaginationInfo
}>>

export const apiInstallWidget = (
	wid: string,
	pid: string
) => request.post("/widgets-store/install", {
	wid,
	pid
}) as Promise<Res<{
	umdPath: string;
	esmPath: string;
	stylePath: string;
}>>

export const apiGetAllWidgets = (page: number, kwd?: string) => request.post("/widgets-store/all", {
	page,
	kwd
}) as Promise<Res<{
	totalPages: number,
	totalNum: number,
	page: number,
	widgets: WidgetPO[],
}>>

export const apiRemoveWidget = (pid: string, wid: string) => request.post("/widgets-store/remove", {
  pid,
  wid
}) as Promise<Res>

export const apiDeleteWidget = (wid: string) =>
    request.post("/widgets-store/delete") as Promise<Res>

export const apiGenerate = (pid: string) => {
	const tk = storage.get("access_token")
	if (!tk) {
		notification.error({
			message: "没有登录"
		})
	} else {
		aTagDownload(baseURL + `/production/make?pid=${pid}&tk=${tk}`)
	}
}



/**
 * DEPRECATED API!!!!!!!!!
 */
export const apiFetchCode = () => request.post("/custom-widget", {}) as Promise<Res<string>>

export const apiDirList = (dir: string) => request.post("/dir-list", {
	dir
}) as Promise<Res<{
	dirList: { isDir: boolean, name: string }[],
	sep: string
}>>

export const apiDirBack = (dir: string) => request.post("/dir-back", {
	dir
}) as Promise<Res<{
	dir: string,
	sep: string
}>>

export const apiDirCwd = () => request.post("/dir-cwd") as Promise<Res<{
	dir: string,
	sep: string
}>>

export const apiDirCreate = (dir: string, dirname: string) => request.post("/dir-create", { dir, dirname }) as Promise<Res>

export const apiDirEnter = (dir: string, dirname: string) => request.post("/dir-enter", { dir, dirname }) as Promise<Res<{ dir: string, sep: string }>>


export const apiDirRemove = (dir: string, dirname: string) => request.post("/dir-remove", {
	dir,
	dirname
}) as Promise<Res>

export const apiDeleteProject = (projectName: string) => request.post("/delete", {
	projectName
}) as Promise<Res>

export const apiExportJSON = (dir: string, renderConfig: RenderConfig) => request.post("/export-json", {
	dir,
	renderConfig
}) as Promise<Res>


/**以下为电商作业的部分 */
export interface ShopCategory {
	category: string,
	bgColor: string,
	bgImage: string,
	pics: string[],
	lastModified: string,
}

export const apiGetShopCategory = (query: QueryBody) => request.post("/clothes-shop/get-category", query) as Promise<Res<ShopCategory[] | {}>>

