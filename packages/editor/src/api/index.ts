import { RenderConfig } from "../render/interfaces";
import { request, ErrorCode } from "./request";
export { ErrorCode } from "./request"

export interface Res<T = any> {
	data: T,
	code: ErrorCode,
	msg: string
}

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

export const apiGenerate = (renderConfig: RenderConfig, dir: string) => request.post("/generate", {
	renderConfig,
	dir
}) as Promise<Res>

export const apiDirRemove = (dir: string, dirname: string) => request.post("/dir-remove", {
	dir,
	dirname
}) as Promise<Res>

export const apiGetAllProjects = () => request.post("/all-projects") as Promise<Res<{
	projectList: {
		lastModify: string,
		renderConfig: RenderConfig
	}[]
}>>

export const apiSave = (renderConfig: RenderConfig) => request.post("/save", {
	renderConfig
}) as Promise<Res>

export const apiDeleteProject = (projectName: string) => request.post("/delete", {
	projectName
}) as Promise<Res>


export const apiExportJSON = (dir: string, renderConfig: RenderConfig) => request.post("/export-json", {
	dir,
	renderConfig
}) as Promise<Res>
