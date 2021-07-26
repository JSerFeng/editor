import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./user.schema";
import { Document, Schema as MSchema } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export type WidgetsDoc = Document & Widgets;

@Schema()
export class Widgets {
	@Prop()
	name: string;

	@Prop()
	showName: string;

	@Prop()
	description: string;

	@Prop()
	widgetsInfoStr: string;

	@Prop({ type: MSchema.Types.ObjectId, ref: "User" })
	author: User;

	@Prop()
	umdPath: string;

	@Prop()
	esmPath: string;

	@Prop()
	stylePath: string;

	@Prop({ default: false })
	privacy: boolean;

	@Prop()
	img: string;
}

export const WidgetsSchema = SchemaFactory.createForClass(Widgets);

export class SingleWidgetDTO {
	@IsNotEmpty()
	@ApiProperty()
	name: string;

	@IsNotEmpty()
	@ApiProperty()
	showName: string;

	@IsNotEmpty()
	@ApiProperty()
	description: string;

	@IsNotEmpty()
	@ApiProperty()
	widgetsInfoStr: string;

	@IsNotEmpty()
	@ApiProperty()
	uid: string;

	@ApiProperty()
	img: string;

	@ApiProperty()
	privacy: boolean;
}
