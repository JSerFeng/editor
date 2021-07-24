import { Injectable } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { JwtService } from "@nestjs/jwt";
import { LoginBody } from "src/schemas/user.schema";
import { ErrorCode, res } from "src/utils";

@Injectable()
export class AuthService {
	constructor(
		private usersService: UserService,
		private jwtService: JwtService,
	) {}

	async validateUser(body: LoginBody): Promise<any> {
		return await this.usersService.login(body);
	}

	async login(body: LoginBody) {
		const loginRes = await this.usersService.login(body);
		if (loginRes.code !== ErrorCode.Success) {
			return loginRes;
		}
		const payload = { _id: loginRes.data.userInfo.id };
		return res(ErrorCode.Success, {
			access_token: this.jwtService.sign(payload),
			userInfo: loginRes.data.userInfo,
		});
	}
}
