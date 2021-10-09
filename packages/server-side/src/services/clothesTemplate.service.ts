import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
	ClothesTemplateDTO,
	ClothesTemplateDoc,
	ClothesTemplate,
} from "src/schemas/clothes-template";
import { UserService } from "./user.service";
import { writeFile } from "fs-extra";
import * as path from "path";
import {
	findAssetsDir,
	genAssetsUrl,
	pageQuery,
	PageQueryDTO,
} from "src/utils";

@Injectable()
export class ClothesTemplateService {
	constructor(
		@InjectModel(ClothesTemplate.name) private model: Model<ClothesTemplateDoc>,
		private userService: UserService,
	) {}

	async addOneTemplate(dto: ClothesTemplateDTO) {
		const newTemplate = new this.model(dto);
		newTemplate.author = await this.userService.findUser(dto.authorId);
		const snapShotUrl = genAssetsUrl(newTemplate.id.toString());
		newTemplate.snapshot = snapShotUrl;
		await writeFile(
			path.join(findAssetsDir(), newTemplate.id.toString()),
			dto.snapshot,
		);
		await newTemplate.save();
	}

	async findTemplates(query: PageQueryDTO, category: string) {
		const res = await pageQuery(this.model.find({ category }), query).exec();
		return res || [];
	}
}
