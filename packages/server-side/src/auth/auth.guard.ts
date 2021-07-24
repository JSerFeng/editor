import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UnauthError } from "src/utils";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
	canActivate(context: ExecutionContext): any {
		return super.canActivate(context);
	}

	handleRequest(err, user) {
		if (err) {
			throw err;
		}
		if (!user) {
			throw new UnauthError();
		}
		return user;
	}
}
