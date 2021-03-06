import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { createWriteStream, ensureDir } from "fs-extra";
import { Model } from "mongoose";
import { DEFAULT_PAGE_NUM, STORE_PATH } from "src/constant";
import {
	FileDTO,
	InstallWidgetDTO,
} from "src/controllers/widgets-store.controller";
import {
	SingleWidgetDTO,
	Widgets,
	WidgetsDoc,
} from "src/schemas/widgets-store.schema";
import { addWidget, ErrorCode, pipe, res } from "src/utils";
import { ProjectsService } from "./projects.service";
import { UserService } from "./user.service";
import * as path from "path";

const enum SearchTag {
	User = 0 << 1,
	Name = 0 << 2,
	ShowName = 0 << 3,
	Description = 0 << 4,
}

@Injectable()
export class WidgetsStoreService {
	constructor(
		@InjectModel(Widgets.name) private widgetsModel: Model<WidgetsDoc>,
		private userService: UserService,
		private projectService: ProjectsService,
	) {}

	async createWidget(body: SingleWidgetDTO): Promise<WidgetsDoc> {
		const newWidget = new this.widgetsModel(body);
		await newWidget.save();
		return newWidget;
	}

	async findWidget(id: string) {
		return await this.widgetsModel.findById(id).exec();
	}

	async findAllWidgets(page: number, num = DEFAULT_PAGE_NUM, kwd: string) {
		const RE = new RegExp(kwd || "(?:)");
		const widgets = await this.widgetsModel
			.find({
				privacy: false,
				$or: [
					{ name: { $regex: RE } },
					{ showName: { $regex: RE } },
					{ description: { $regex: RE } },
				],
			})
			.skip((page - 1) * num)
			.limit(num)
			.exec();
		const all = await this.widgetsModel.countDocuments().exec();

		return res(ErrorCode.Success, {
			totalPages: Math.ceil(all / num),
			totalNum: all,
			page,
			widgets,
		});
	}

	async publish(
		uid: string,
		{ umd, esm, style, libDirectoryZip }: FileDTO,
		body: SingleWidgetDTO,
	) {
		const author = await this.userService.findUser(uid);
		if (!author) {
			return res(ErrorCode.Fail, "没有找到该用户");
		}
		const newWidget = await this.createWidget(body);
		const wid = newWidget._id.toString();

		//写入开发时会用script导入的单文件，其中的esm模块目前没有用到
		const filePath = await addWidget(wid, umd[0], esm[0], style[0]);
		//写入lib文件夹压缩包(为了之后生成代码直接用该文件夹)
		const productPath = path.resolve(STORE_PATH, "widgets", wid, "prod");
		await ensureDir(productPath);
		await pipe(
			createWriteStream(path.resolve(productPath, "lib.zip")),
			libDirectoryZip[0].buffer,
		);

		newWidget.author = author;
		newWidget.umdPath = filePath.umdPath;
		newWidget.esmPath = filePath.esmPath;
		newWidget.stylePath = filePath.stylePath;
		await newWidget.save();

		author.widgets.push(newWidget);
		await author.save();

		return res(ErrorCode.Success, "发布组件成功");
	}

	/*
  安装组件
  -告诉前端该组件文件路径
  -为该project的dependencies增加这个新组件
  */
	async installWidget(body: InstallWidgetDTO) {
		const widget = await this.widgetsModel.findById(body.wid).exec();
		if (widget == null) {
			return res(ErrorCode.Fail, "没有找到该组件，可能已被删除");
		}

		//增加项目的依赖
		const project = await this.projectService.findProject(body.pid);
		if (!project) {
			return res(ErrorCode.Fail, "没有找到此项目");
		}
		if (project.dependencies.indexOf(widget) == -1) {
			project.dependencies.push(widget);
			await project.save();
		}

		return res(ErrorCode.Success, {
			umdPath: widget.umdPath,
			stylePath: widget.stylePath,
			esmPath: widget.esmPath, //esm文件路径目前没什么用，不过多返回一个也不伤性能，方便后续更改吧
		});
	}

	/*
  移除项目中的组件
  -删除项目依赖中该组件
  */
	async dropWidget(body: InstallWidgetDTO) {
		const project = await this.projectService.findProject(body.pid);
		const idx = project.dependencies.findIndex(
			(it) => it.toString() == project._id.toString(),
		);
		if (idx == -1) return res(ErrorCode.Fail, "已经删除过该组件");
		project.dependencies.splice(idx, 1);
		await project.save();
		return res(ErrorCode.Success, "卸载组件成功");
	}

	//删除注册号的组件
	async deleteWidget(uid: string, wid: string) {
		const user = await this.userService.findUser(uid);
		if (!user) {
			return res(ErrorCode.Fail, "没有找到该作者");
		}
		if (user._id.toString() !== uid) {
			return res(ErrorCode.Fail, "只能组件作者才有权删除组件");
		}
		const widget = await this.widgetsModel.findById(wid);
		let idx = -1;
		if (
			!widget ||
			(idx = user.widgets.findIndex((it) => it.toString() === wid)) !== -1
		) {
			return res(ErrorCode.Fail, "没有找到该组件");
		}
		user.widgets.splice(idx, 1);
		await user.save();
		await this.widgetsModel.remove(wid);
	}
}
