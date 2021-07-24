import { Injectable } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { copy, readFile, writeFile } from "fs-extra";
import * as path from "path";
import { STORE_PATH } from "src/constant";
import { RenderConfig } from "src/renderConfig.interface";

@Injectable()
export class TplService {
	constructor(private projectsService: ProjectsService) {}

	async createSourceCodeZip(uid: string, pid: string) {
		const proj = await this.projectsService.findProject(pid);
		await generateImpl(
			uid,
			proj.name,
			JSON.parse(proj.renderConfigStr) as RenderConfig,
		);
	}
}

async function generateImpl(
	uid: string,
	projName: string,
	renderConfig: RenderConfig,
) {
	/**用户文件夹路径 */
	const targetPath = path.resolve(STORE_PATH, "users", uid, "tpl");

	/**模板文件路径 */
	const tplPath = path.resolve(STORE_PATH, "tpl", "commonTpl");
	try {
		await copy(tplPath, path.resolve(targetPath, "tpl"));
	} catch (e) {
		console.log("模板拷贝失败，请检查网络");
		throw "请求github模板失败\n" + e;
	}

	/**改package.json字段的name和deps */
	const pkgJsonDir = path.join(targetPath, "./package.json");
	const pkgJson = JSON.parse((await readFile(pkgJsonDir)).toString());
	pkgJson.name = projName;
	pkgJson.dependencies["@editor/editor"] = "latest";
	await writeFile(pkgJsonDir, JSON.stringify(pkgJson, null, 2));

	/**记住已经引入过的，避免重复引入多次 */
	const imported = new Set();

	/**记录内部引用的组件 */
	const presets: string[] = [];
	/**需要引入的组件模块 */
	const imports = renderConfig.widgets
		.map(({ name }) => {
			if (imported.has(name)) return null;
			imported.add(name);
			presets.push(name);
			return `import ${name} from "./widgets/${name}";`;
		})
		.filter((item) => item !== null)
		.join("\n");

	/**需要获取组件信息中的react类组件或者函数组件 */
	imported.clear();
	const FCs = renderConfig.widgets
		.map(({ name }) => {
			if (imported.has(name)) return null;
			imported.add(name);
			return `const { FC: ${
				name[0].toUpperCase() + name.slice(1)
			} } = ${name};`;
		})
		.filter((item) => item !== null)
		.join("\n");

	/**生成的组件代码 */
	const widgets = renderConfig.widgets
		.map(
			({ name, config, pos, style, routeInfo }) =>
				`
<Route path="${routeInfo.path}" exact={ ${routeInfo.exact} }>
	<div
		style={{
			position: "absolute",
			width: "${pos.w}px",
			height: "${pos.h}px",
			left: "${pos.x}px",
			top: "${pos.y}px"
		}}
	>
		<${name[0].toUpperCase() + name.slice(1)} 
			config={${config ? JSON.stringify(config, null, 2) : null}}
			pos={${JSON.stringify(pos, null, 2)}}
			style={${(style && JSON.stringify(style, null, 2)) || "{}"}}
			/>
	</div>
</Route>`,
		)
		.join("\n");

	const componentPath = path.join(targetPath, "/src/components");

	try {
		const fileDir = path.join(componentPath, "/RenderMain.tsx");
		await writeFile(
			fileDir,
			compileTemplate((await readFile(fileDir)).toString(), {
				imports,
				FCs,
				widgets,
				canvasWidth: renderConfig.pos.w + "px",
				canvasHeight: renderConfig.pos.h + "px",
			}),
		);

		const AppTsxDir = path.join(targetPath, "/src/App.tsx");
		await writeFile(
			AppTsxDir,
			compileTemplate((await readFile(AppTsxDir)).toString(), {
				router:
					renderConfig.routerMode === "hash" ? "HashRouter" : "BrowserRouter",
			}),
		);
		return targetPath;
	} catch (e) {
		console.log("写入出错", e);
		throw "编译文件出错";
	}
}

function compileTemplate(tpl: string, data: Record<string, string>): string {
	let result = tpl;
	Reflect.ownKeys(data).forEach((key: string) => {
		const reg = new RegExp(`%%${key}%%`, "g");
		result = result.replace(reg, data[key]);
	});
	return result;
}
