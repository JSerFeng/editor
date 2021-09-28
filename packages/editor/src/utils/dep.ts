import { apiInstallWidget, ErrorCode } from "../api";
import { HOST_PREFIX } from "../constants/common";
import { RenderConfig } from "../render/interfaces";


export const scriptsMap = new Map<string, HTMLScriptElement>()

//预装依赖
export async function preInstall(renderConfig: RenderConfig, pid: string) {
	for (const wid of renderConfig.dependencies) {
		const res = await apiInstallWidget(wid, pid)
		if (res.code !== ErrorCode.Success) {
			return
		}
	}
	await Promise.all(renderConfig.dependencies.map((wid) => installWidget(wid, pid)))
}

export async function installWidget(wid: string, pid: string) {
	const res = await apiInstallWidget(wid, pid)
	if (res.code !== ErrorCode.Success) {
		return
	}
	const { umdPath, stylePath } = res.data
	const prefix = HOST_PREFIX
	const scriptTag = document.createElement("script")
	const linkTag = document.createElement("link")
	scriptTag.src = prefix + umdPath
	linkTag.href = prefix + stylePath
	document.body.appendChild(scriptTag)
	document.body.appendChild(linkTag)
}