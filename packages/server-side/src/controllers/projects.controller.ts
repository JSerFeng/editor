import { Controller, Post, Body, UseGuards, Request } from "@nestjs/common";
import { res, ErrorCode, ReqBody } from "src/utils";
import { ApiBearerAuth, ApiProperty, ApiTags } from "@nestjs/swagger";
import { ProjectsDTO } from "src/schemas/projects.schema";
import { ProjectsService } from "src/services/projects.service";
import { UserService } from "src/services/user.service";
import { JwtAuthGuard } from "src/auth/auth.guard";

export class DropProjectDTO {
	@ApiProperty()
	pid: string;
}

export class ModifyProjDTO {
	@ApiProperty()
	name: string;

	@ApiProperty()
	renderConfigStr: string;

	@ApiProperty()
	pid: string;
}

@ApiTags("项目")
@Controller("projects")
export class ProjectsController {
	constructor(
		private service: ProjectsService,
		private userService: UserService,
	) {}

	@Post("add")
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	async addNewProject(
		@Body() body: ProjectsDTO,
		@Request() { user: { _id } }: ReqBody,
	) {
		try {
			const proj = await this.service.addNewProject(body);
			const user = await this.userService.findUser(_id);
			proj.author = user;
			await proj.save();
			user.projects.push(proj);
			await user.save();
			return res(ErrorCode.Success, "新建项目成功");
		} catch (e) {
			console.log(e);
			return res(ErrorCode.InternalError, e);
		}
	}

	@Post("drop")
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	async dropProject(@Body() body: DropProjectDTO, @Request() req: ReqBody) {
		return this.service.dropProject(req.user._id, body);
	}

	@Post("modify")
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	async modifyProject(_id: string, @Body() body: ModifyProjDTO) {
		const project = await this.service.findProject(body.pid);
		if (!project) {
			return res(ErrorCode.Fail, "没有找到此项目");
		}
		if (
			project.author.toString() !== _id &&
			project.workmates.every((it) => it.uid.toString() !== _id)
		) {
			return res(ErrorCode.Fail, "没有权限更改该项目");
		}
		project.lastModified = new Date();
		project.name = body.name;
		project.renderConfigStr = body.renderConfigStr;
		project.save();
		return res(ErrorCode.Success, "更新项目成功");
	}
}
