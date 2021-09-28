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
	snapShot: string;
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

	@ApiProperty()
	snapShot: string;

	@ApiProperty()
	privacy: boolean;
}
