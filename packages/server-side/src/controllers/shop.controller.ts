import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { mockImgData, mockFontsData } from "src/mock";
import { ShopService } from "src/services/shop.service";
import { ErrorCode, PageQueryDTO, res } from "src/utils";
export class SetCategoryDTO {
	category: string;
	bgColor: string;
	pics: string[];
}

@ApiTags("服装模板商店")
@Controller("clothes-shop")
export class ClothesShopController {
	constructor(private service: ShopService) {}

	@Post("/get-category")
	async getAll(@Body() query: PageQueryDTO) {
		const list = await this.service.getList(query);
		return res(ErrorCode.Success, list);
	}

	@Post("/set-category")
	async setCategory(@Body() setCategoryDTO: SetCategoryDTO) {
		if (!Array.isArray(setCategoryDTO.pics) || setCategoryDTO.pics.length < 8) {
			return res(ErrorCode.Fail, "提供的图片数目不够");
		}
		await this.service.setCategory(setCategoryDTO);
		return res(ErrorCode.Success);
	}

	@Get("/images")
	async getImages() {
		return res(ErrorCode.Success, mockImgData);
	}

	@Get("/fonts")
	async getFonts() {
		return res(ErrorCode.Success, mockFontsData);
	}
}
