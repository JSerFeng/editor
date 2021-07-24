import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document, Schema as MSchema } from "mongoose";
import { User } from "./user.schema";
import { Widgets } from "./widgets-store.schema";

export type ProjectsDoc = Document & Projects;

@Schema()
export class Projects {
	@Prop()
	name: string;

	@Prop({ default: () => new Date() })
	createTime: Date;

	@Prop({ default: () => new Date() })
	lastModified: Date;

	@Prop()
	renderConfigStr: string;

	@Prop({ type: MSchema.Types.ObjectId, ref: "User" })
	author: User;

	@Prop([{ type: MSchema.Types.ObjectId, ref: "User" }])
	workmates: User[];

	@Prop({ type: MSchema.Types.ObjectId, ref: "Widgets" })
	dependencies: Widgets[];

	@Prop({ default: false })
	private: boolean;
}

export const ProjectsSchema = SchemaFactory.createForClass(Projects);

export class ProjectsDTO {
	@ApiProperty()
	name: string;

	@ApiProperty()
	renderConfigStr: string;
}
