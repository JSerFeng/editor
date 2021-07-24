import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "src/auth/auth.service";
import { LoginBody, RegisterBody } from "src/schemas/user.schema";
import { UserService } from "src/services/user.service";

@ApiTags("用户")
@Controller("user")
export class UserController {
	constructor(private service: UserService, private authService: AuthService) {}

	@Post("login")
	login(@Body() body: LoginBody) {
		return this.authService.login(body);
	}

	@Post("register")
	register(@Body() body: RegisterBody) {
		return this.service.registerOne(body);
	}
}
