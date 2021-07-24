import { Body, Controller, Post, UseGuards, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { JwtAuthGuard } from "src/auth/auth.guard";
import { TplService } from "src/services/tpl.service";
import { ReqBody } from "src/utils";

class CreateSourceCodeDTO {
	@ApiProperty()
	@IsNotEmpty()
	pid: string;
}

@ApiTags("模板生成")
@Controller("tpl")
export class TplController {
	constructor(private tplService: TplService) {}

	@Post("make")
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	async createSourceCode(
		@Body() body: CreateSourceCodeDTO,
		@Request() req: ReqBody,
	) {
		await this.tplService.createSourceCodeZip(req.user._id, body.pid);
	}
}
