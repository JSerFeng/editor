import { Document, Schema as MSchema } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Projects } from "./projects.schema";
import { Widgets } from "./widgets-store.schema";

export type ProductionDoc = Document & Production;

@Schema()
export class Production {
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

export const ProductionSchema = SchemaFactory.createForClass(Production);
