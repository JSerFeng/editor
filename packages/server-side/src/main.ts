import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { UnauthErrorFilter } from "./utils";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle("Editor Api")
		.setDescription("The editor API description")
		.setVersion("1.0")
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);

	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalFilters(new UnauthErrorFilter());

	await app.listen(7001);
}
bootstrap();
