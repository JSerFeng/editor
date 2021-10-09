import {
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Req,
} from "@nestjs/common";
import { findAssetsDir } from "src/utils";
import { readFile } from "fs-extra";
import * as path from "path";

@Controller("assets")
export class AssetsController {
	@Get("*")
	async getAssets(@Req() req: { path: string }) {
		const reqPath = req.path.slice("/assets".length);
		const assetsDir = findAssetsDir();
		try {
			const file = await readFile(path.join(assetsDir, reqPath));
			return file;
		} catch (e) {
			throw new HttpException("Not found", HttpStatus.NOT_FOUND);
		}
	}
}
