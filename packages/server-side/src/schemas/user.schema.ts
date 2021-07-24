import { Document, Schema as MSchema } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Projects } from "./projects.schema";
import { Widgets } from "./widgets-store.schema";
import { ApiProperty } from "@nestjs/swagger";

export type UserDoc = Document & User;

@Schema()
export class User {
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

export const UserSchema = SchemaFactory.createForClass(User);

export class RegisterBody {
	@ApiProperty()
	uid: string;

	@ApiProperty()
	userName: string;

	@ApiProperty()
	pwd: string;
}

export class LoginBody {
	@ApiProperty()
	uid: string;

	@ApiProperty()
	pwd: string;
}
