import { Injectable, Body } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SetCategoryDTO } from "src/controllers/shop.controller";
import { ClothesShopDoc, ClothesShopCategory } from "src/schemas/shop.schema";
import { PageQueryDTO } from "src/utils";

@Injectable()
export class ShopService {
	constructor(
		@InjectModel(ClothesShopCategory.name)
		private shopModel: Model<ClothesShopDoc>,
	) {}

	async getList(query: PageQueryDTO) {
		return await this.shopModel
			.find()
			.skip(query.num * (query.page - 1))
			.limit(query.num)
			.exec();
	}

	async setCategory(@Body() setCategoryDTO: SetCategoryDTO) {
		const category = new this.shopModel(setCategoryDTO);
		category.lastModified = new Date();
		await category.save();
	}
}
