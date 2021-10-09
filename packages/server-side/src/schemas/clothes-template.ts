import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./user.schema";

export type ClothesTemplateDoc = Document & ClothesTemplate;

@Schema()
export class ClothesTemplate {
	@Prop()
	author: User;

	@Prop()
	description: string;

	@Prop()
	name: string;

	@Prop()
	snapshot: string;

	@Prop()
	lastModified: Date;

	@Prop()
	renderConfig: string;

	@Prop()
	category: string;
}

export const ClothesTemplateSchema =
	SchemaFactory.createForClass(ClothesTemplate);

export class ClothesTemplateDTO {
	description: string;

	name: string;

	snapshot: File;

	authorId: string;

	renderConfig: string;

	category: string;
}
