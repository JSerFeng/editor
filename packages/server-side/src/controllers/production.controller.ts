import { Controller, Res, Query, Get } from "@nestjs/common";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { ProductionService } from "src/services/production.service";
import { ErrorCode, res } from "src/utils";
import { Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { STORE_PATH } from "src/constant";

class CreateSourceCodeDTO {
	@ApiProperty()
	@IsNotEmpty()
	pid: string;

	@ApiProperty()
	@IsNotEmpty()
	tk: string;
}
/**
 * need:
 * lib + package.json (directory when generate optimized production)
 *
 * umd.js (dev import by script tag)
 *
 */
@ApiTags("模板生成")
@Controller("production")
export class Productiontroller {
	constructor(
		private productionService: ProductionService,
		private jwtService: JwtService,
	) {}

	@Get("store-path")
	storePath() {
		console.log(STORE_PATH);
		return res(ErrorCode.Success, STORE_PATH);
	}

	@Get("make")
	async createSourceCode(
		@Query() params: CreateSourceCodeDTO,
		@Res() response: Response,
	) {
		try {
			const { _id } = this.jwtService.verify<{ _id: string }>(params.tk);
			const result = await this.productionService.createSourceCodeZip(
				_id,
				params.pid,
			);
			return new Promise((resolve) => {
				response.sendFile(result, (err) => {
					if (err) {
						console.log(err);
						return res(ErrorCode.InternalError, "生成代码出错");
					}
					resolve(res(ErrorCode.Success));
				});
			});
		} catch (e) {
			console.log(e);
			return res(ErrorCode.InternalError, "生成代码出错");
		}
	}
}
