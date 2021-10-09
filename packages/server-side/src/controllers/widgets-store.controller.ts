import {
	Body,
	Controller,
	Post,
	UploadedFiles,
	UseInterceptors,
	Request,
	UseGuards,
} from "@nestjs/common";
import {
	FileFieldsInterceptor,
	FilesInterceptor,
} from "@nestjs/platform-express";
import {
	ApiBearerAuth,
	ApiConsumes,
	ApiProperty,
	ApiTags,
} from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { JwtAuthGuard } from "src/auth/auth.guard";
import { SingleWidgetDTO } from "src/schemas/widgets-store.schema";
import { WidgetsStoreService } from "src/services/widgets-store.service";
import { res, ErrorCode, PageQueryDTO, ReqBody } from "src/utils";

export class InstallWidgetDTO {
	@ApiProperty({ description: "组件_id" })
	@IsNotEmpty()
	wid: string;

	@ApiProperty({ description: "组件_id" })
	@IsNotEmpty()
	pid: string;
}

export class DeleteWidgetDTO {
	@ApiProperty({ description: "组件_id" })
	@IsNotEmpty()
	wid: string;
}

export class FileDTO {
	@ApiProperty()
	umd: Express.Multer.File[];

	@ApiProperty()
	esm: Express.Multer.File[];

	@ApiProperty()
	style: Express.Multer.File[];

	@ApiProperty({ description: "lib文件夹的压缩包，格式是zip" })
	libDirectoryZip: Express.Multer.File[];
}

@ApiTags("物料")
@Controller("widgets-store")
export class WidgetsStoreController {
	constructor(private service: WidgetsStoreService) {}

	@Post("all")
	findAll(@Body() body: PageQueryDTO) {
		try {
			return this.service.findAllWidgets(body.page, body.num, body.kwd);
		} catch (e) {
			console.log("err");
			console.log(e);
			return res(ErrorCode.Fail, e);
		}
	}

	@Post("publish")
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiConsumes("multipart/form-data")
	@UseInterceptors(
		FileFieldsInterceptor([
			{ name: "umd", maxCount: 1 },
			{ name: "esm", maxCount: 1 },
			{ name: "style", maxCount: 1 },
			{ name: "libDirectoryZip", maxCount: 1 },
		]),
	)
	async publish(
		@Body() body: SingleWidgetDTO,
		@UploadedFiles() files: FileDTO,
		@Request() req: ReqBody,
	) {
		return this.service.publish(req.user._id, files, body);
	}

	//返回前端umd文件的路径
	@Post("install")
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async installWidget(@Body() body: InstallWidgetDTO) {
		try {
			return this.service.installWidget(body);
		} catch (e) {
			console.log(e);
			return res(ErrorCode.InternalError);
		}
	}

	@Post("remove")
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async removeWidget(@Body() body: InstallWidgetDTO) {
		try {
			return this.service.dropWidget(body);
		} catch (e) {
			console.log(e);
			return res(ErrorCode.InternalError);
		}
	}

	@Post("delete")
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async deleteWidget(@Body() body: DeleteWidgetDTO, @Request() req: ReqBody) {
		try {
			return this.service.deleteWidget(req.user._id, body.wid);
		} catch (e) {
			console.log(e);
			return res(ErrorCode.InternalError);
		}
	}
}
