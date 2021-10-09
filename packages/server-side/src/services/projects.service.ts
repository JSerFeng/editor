import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DropProjectDTO } from "src/controllers/projects.controller";
import {
	Projects,
	ProjectsDoc,
	ProjectsDTO,
} from "src/schemas/projects.schema";
import { res, ErrorCode, PageQueryDTO, pageQuery } from "src/utils";
import { UserService } from "./user.service";

@Injectable()
export class ProjectsService {
	constructor(
		@InjectModel(Projects.name) private projectModel: Model<ProjectsDoc>,
		private userService: UserService,
	) {}

	async addNewProject(body: ProjectsDTO) {
		if (!body.dependencies) {
			body.dependencies = [];
		}
		const newProject = new this.projectModel(body);
		newProject.createTime = new Date();
		newProject.lastModified = new Date();
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

	async findUserProjects(uid: string, query: PageQueryDTO) {
		const author = await this.userService.findUser(uid);
		const projects = await pageQuery(
			this.projectModel.find({ author }),
			query,
		).exec();
		const totalNum = await this.projectModel.countDocuments();

		return {
			projects,
			pagination: {
				totalNum,
				totalPages: Math.ceil(totalNum / query.num),
			},
		};
	}
}
