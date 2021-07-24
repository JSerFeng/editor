import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DropProjectDTO } from "src/controllers/projects.controller";
import {
	Projects,
	ProjectsDoc,
	ProjectsDTO,
} from "src/schemas/projects.schema";
import { res, ErrorCode } from "src/utils";
import { UserService } from "./user.service";

@Injectable()
export class ProjectsService {
	constructor(
		@InjectModel(Projects.name) private projectModel: Model<ProjectsDoc>,
		private userService: UserService,
	) {}

	async addNewProject(body: ProjectsDTO) {
		const newProject = new this.projectModel({
			name: body.name,
			renderConfigStr: body.renderConfigStr,
			createTime: new Date(),
			lastModified: new Date(),
		});
		await newProject.save();
		return newProject;
	}

	async dropProject(_id: string, body: DropProjectDTO) {
		const project = await this.projectModel.findById(body.pid).exec();
		if (!project) return res(ErrorCode.Fail, "没有该项目");
		if (project.author.toString() !== _id) {
			return res(ErrorCode.Fail, "只能由作者删除");
		}
		const author = await this.userService.findUser(project.author.toString());

		//找出当前项目下标
		const idx = author.projects.findIndex((it) => it.toString() == body.pid);
		if (idx === -1) return res(ErrorCode.Fail, "该项目已被删除");

		author.projects.splice(idx, 1);
		await author.save();
		await this.projectModel.deleteOne({ _id: body.pid }).exec();
		return res(ErrorCode.Success, "删除成功");
	}

	async findProject(pid: string) {
		return await this.projectModel.findById(pid).exec();
	}

	async findUserProjects(uid: string) {
		const project = await this.projectModel.find({ userId: uid }).exec();
		return project;
	}
}
