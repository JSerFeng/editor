import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

export type ClothesShopDoc = Document & ClothesShopCategory;

@Schema()
export class ClothesShopCategory {
	@Prop()
	category: string;

	@Prop()
	lastModified: Date;

	@Prop()
	bgColor: string;

	@Prop()
	bgImage: string;

	@Prop()
	pics: string[];
}

export const ClothesShopCategorySchema =
	SchemaFactory.createForClass(ClothesShopCategory);

export class ClothesShopCategoryBody {
	@ApiProperty()
	uid: string;

	@ApiProperty()
	userName: string;

	@ApiProperty()
	pwd: string;
}
