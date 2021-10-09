import { Controller, Post, Body } from "@nestjs/common";
import { ClothesTemplateService } from "src/services/clothesTemplate.service";
import { ClothesTemplateDTO } from "src/schemas/clothes-template";
import { ErrorCode, PageQueryDTO, res } from "src/utils";

//商城里的衣服模板
@Controller("clothes-template")
export class ClothesTemplateController {
	constructor(private service: ClothesTemplateService) {}

	@Post("/find")
	async find(@Body() queryBody: FindTemplateDTO) {
		const data = await this.service.findTemplates(
			queryBody,
			queryBody.category,
		);
		return res(ErrorCode.Success, data);
	}

	@Post("/add")
	async add(@Body() add: ClothesTemplateDTO) {
		await this.service.addOneTemplate(add);
		return res(ErrorCode.Success);
	}
}

class FindTemplateDTO extends PageQueryDTO {
	category: string;
}
