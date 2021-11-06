import { Injectable, Body } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SetCategoryDTO } from "src/controllers/shop.controller";
import { ClothesShopDoc, ClothesShopCategory } from "src/schemas/shop.schema";
import { pageQuery, PageQueryDTO } from "src/utils";
import { ClothesTemplateService } from "./clothesTemplate.service";

@Injectable()
export class ShopService {
	constructor(
		@InjectModel(ClothesShopCategory.name)
		private shopModel: Model<ClothesShopDoc>,
		private clothesTemplateService: ClothesTemplateService,
	) {}

	async getList(query: PageQueryDTO): Promise<
		{
			category: string;
			lastModified: Date;
			bgColor: string;
			bgImage: string;
			pics: string[];
		}[]
	> {
		const categories = await pageQuery(this.shopModel.find(), query).exec();
		const picsList = await Promise.all(
			categories.map((category) =>
				this.clothesTemplateService
					.findTemplates({ page: 1, num: 8 }, category.category)
					.then((res) => res.map((item) => item.snapshot)),
			),
		);
		return categories.map((category, i) => ({
			category: category.category,
			lastModified: category.lastModified,
			bgColor: category.bgColor,
			bgImage: category.bgImage,
			pics: picsList[i],
		}));
	}

	async setCategory(@Body() setCategoryDTO: SetCategoryDTO) {
		const category = new this.shopModel(setCategoryDTO);
		category.lastModified = new Date();
		await category.save();
	}
}
