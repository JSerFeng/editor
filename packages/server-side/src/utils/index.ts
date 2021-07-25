import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	UnauthorizedException,
} from "@nestjs/common";
import { Response } from "express";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { ensureDir, createWriteStream } from "fs-extra";
import * as path from "path";
import { DEFAULT_PAGE_NUM, STORE_PATH } from "src/constant";
import { Readable, Writable } from "stream";
import AdmZip from "adm-zip";

export enum ErrorCode {
	Success = 200,
	InternalError = 500,
	Fail = 415,
	TokenExpire = 420,
	ParamsError = 445,

	HasBeenRegistered = 450,
	PwdOrIdError = 455,
}

export interface Res<T = any> {
	code: ErrorCode;
	data: T;
	msg: string;
}

export function res(code: ErrorCode): Res<null>;
export function res(code: ErrorCode, msg: string): Res<null>;
export function res<T extends Record<string, any>>(
	code: ErrorCode,
	data: T,
): Res<T>;
export function res<T>(code: ErrorCode, data: T, msg: string): Res;
export function res(code: ErrorCode, data?: any, msg?: string): Res {
	switch (arguments.length) {
		case 1:
			return { code, data: null, msg: "" };
		case 2:
			if (typeof data === "string") {
				msg = data;
				data = null;
			} else {
				msg = "";
			}
			return { code, data, msg };
		default:
			return { code, data, msg };
	}
}

export function findUserDir(id: string) {
	return path.resolve(STORE_PATH, "users", id)
}

export async function createUserDir(uid: string) {
	const userPath = path.resolve(STORE_PATH, "users");
	await ensureDir(path.resolve(userPath, uid));
	await ensureDir(path.resolve(userPath, uid, "widgets"));
	await ensureDir(path.resolve(userPath, uid, "projects"));
	await ensureDir(path.resolve(userPath, uid, "tpl"));
}

export async function addWidget(
	wid: string,
	umd: Express.Multer.File,
	esm: Express.Multer.File,
	style: Express.Multer.File,
) {
	const targetPath = path.resolve(STORE_PATH, "widgets", wid, "dev");
	await ensureDir(targetPath);

	const umdPath = path.join(targetPath, umd.originalname);
	const esmPath = path.join(targetPath, esm.originalname);
	const stylePath = path.join(targetPath, style.originalname);
	await Promise.all([
		pipe(createWriteStream(umdPath), umd.buffer),
		pipe(createWriteStream(esmPath), esm.buffer),
		pipe(createWriteStream(stylePath), style.buffer),
	]);

	return { umdPath, esmPath, stylePath };
}

export async function pipe(ws: Writable, buf: Buffer): Promise<void>;
export async function pipe(ws: Writable, rs: Readable): Promise<void>;
export async function pipe(ws: Writable, rsOrBuf: Readable | Buffer) {
	if (Buffer.isBuffer(rsOrBuf)) {
		return new Promise((resolve, reject) => {
			try {
				ws.write(rsOrBuf);
				ws.end();
				resolve(null);
			} catch (e) {
				reject(e);
			}
		});
	}
	const rs = rsOrBuf;
	return new Promise((resolve, reject) => {
		rs.pipe(ws);
		rs.on("end", resolve);
		rs.on("error", reject);
	});
}

export async function comprese(dir: string, targetFile: string) {
	const zip = new AdmZip()
	zip.addLocalFolder(dir)
	await ensureDir(targetFile)
	zip.writeZip(targetFile)
	return targetFile
}

export class PageQueryDTO {
	@IsNotEmpty()
	@ApiProperty()
	page: number;

	@ApiProperty({ type: Number })
	num = DEFAULT_PAGE_NUM;
}

export class UnauthError extends UnauthorizedException {
	constructor() {
		super();
	}
}

@Catch(UnauthError)
export class UnauthErrorFilter implements ExceptionFilter {
	catch(exception: UnauthError, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const status = exception.getStatus();

		response.status(status).json({
			code: ErrorCode.TokenExpire,
			data: null,
			msg: "token验证错误",
		});
	}
}

export class ReqBody {
	user: {
		_id: string;
	};
}
