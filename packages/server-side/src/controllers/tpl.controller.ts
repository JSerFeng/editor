import { Body, Controller, Post, UseGuards, Request, Res } from "@nestjs/common";
import { ApiBearerAuth, ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { JwtAuthGuard } from "src/auth/auth.guard";
import { TplService } from "src/services/tpl.service";
import { ErrorCode, ReqBody, res } from "src/utils";
import { Response } from "express"

class CreateSourceCodeDTO {
	@ApiProperty()
	@IsNotEmpty()
	pid: string;
}
/**
 * need:
 * lib + package.json (directory when generate optimized production)
 * 
 * umd.js (dev import by script tag)
 * 
 */
@ApiTags("模板生成")
@Controller("production")
export class TplController {
	constructor(private tplService: TplService) { }

	@Post("make")
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	async createSourceCode(
		@Body() body: CreateSourceCodeDTO,
		@Request() req: ReqBody,
		@Res() response: Response,
	) {
		try {
			const filePath = await this.tplService.createSourceCodeZip(req.user._id, body.pid);
			response.sendFile(filePath);
			return res(ErrorCode.Success, "代码生成完毕");
		} catch (e) {
			return res(ErrorCode.InternalError, "生成代码出错");
		}
	}
}
