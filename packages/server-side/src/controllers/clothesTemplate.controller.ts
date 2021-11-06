import {
	Controller,
	Post,
	Body,
	UseInterceptors,
	UploadedFiles,
} from "@nestjs/common";
import { ClothesTemplateService } from "src/services/clothesTemplate.service";
import { ClothesTemplateDTO } from "src/schemas/clothes-template";
import { ErrorCode, PageQueryDTO, res } from "src/utils";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ApiConsumes } from "@nestjs/swagger";
class FindTemplateDTO extends PageQueryDTO {
	category: string;
}

class AddTemplateFileDTO {
	snapshot: Express.Multer.File[];
}

//商城里的衣服模板
@Controller("clothes-template")
export class ClothesTemplateController {
	constructor(private service: ClothesTemplateService) {}

	@Post("find")
	async find(@Body() queryBody: FindTemplateDTO) {
		const data = await this.service.findTemplates(
			queryBody,
			queryBody.category,
		);
		return res(ErrorCode.Success, data);
	}

	@Post("add")
	@ApiConsumes("multipart/form-data")
	@UseInterceptors(FileFieldsInterceptor([{ name: "snapshot", maxCount: 1 }]))
	async add(
		@Body() add: ClothesTemplateDTO,
		@UploadedFiles() files: AddTemplateFileDTO,
	) {
		await this.service.addOneTemplate(add, files.snapshot[0]);
		return res(ErrorCode.Success);
	}
}
