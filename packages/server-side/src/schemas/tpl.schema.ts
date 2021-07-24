import { Document, Schema as MSchema } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Projects } from "./projects.schema";
import { Widgets } from "./widgets-store.schema";

export type TplDoc = Document & Tpl;

@Schema()
export class Tpl {
	@Prop()
	userName: string;

	@Prop()
	uid: string;

	@Prop()
	pwd: string;

	@Prop({ type: [{ type: MSchema.Types.ObjectId, ref: "Projects" }] })
	projects: Projects[];

	@Prop({ type: [{ type: MSchema.Types.ObjectId, ref: "Widgets" }] })
	widgets: Widgets[];
}

export const TplSchema = SchemaFactory.createForClass(Tpl);
