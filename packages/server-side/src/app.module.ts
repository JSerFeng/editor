import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { AppService } from "./app.service";
import { ProjectsController } from "./controllers/projects.controller";
import { UserController } from "./controllers/user.controller";
import { WidgetsStoreController } from "./controllers/widgets-store.controller";
import { ProjectsService } from "./services/projects.service";
import { UserService } from "./services/user.service";
import { WidgetsStoreService } from "./services/widgets-store.service";
import { User, UserSchema } from "./schemas/user.schema";
import { Projects, ProjectsSchema } from "./schemas/projects.schema";
import { Widgets, WidgetsSchema } from "./schemas/widgets-store.schema";
import { AuthService } from "./auth/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constant";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./auth/auth.strategy";
import { ProductionService } from "./services/production.service";
import { Productiontroller } from "./controllers/production.controller";

@Module({
	imports: [
		MongooseModule.forRoot("mongodb://127.0.0.1:27017/editor", {
			auth: {
				user: "fy",
				password: "fyvery261",
			},
		}),
		PassportModule.register({
			defaultStrategy: "jwt",
		}),
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema },
			{ name: Projects.name, schema: ProjectsSchema },
			{ name: Widgets.name, schema: WidgetsSchema },
		]),
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: "14d" },
		}),
	],
	controllers: [
		AppController,
		ProjectsController,
		WidgetsStoreController,
		UserController,
		Productiontroller,
	],
	providers: [
		AppService,
		ProjectsService,
		WidgetsStoreService,
		UserService,
		AuthService,
		JwtStrategy,
		ProductionService,
	],
})
export class AppModule {}
