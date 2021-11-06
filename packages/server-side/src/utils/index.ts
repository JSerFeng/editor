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
import * as AdmZip from "adm-zip";
import { produce } from "immer";
import { Query } from "mongoose";

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

export function pageQuery<T, R>(
	query: Query<T, R>,
	pageQuery: PageQueryDTO,
): Query<T, R> {
	if (!pageQuery.num) {
		pageQuery.num = 8;
	}
	return query.skip(pageQuery.num * (pageQuery.page - 1)).limit(pageQuery.num);
}

export function genAssetsUrl(url: string): string {
	return "http://localhost:7001/assets/" + url;
}

export function findAssetsDir() {
	return path.resolve(STORE_PATH, "assets");
}

export function findUserDir(id: string) {
	return path.resolve(STORE_PATH, "users", id);
}

export async function createUserDir(uid: string) {
	const userPath = path.resolve(STORE_PATH, "users");
	await ensureDir(path.resolve(userPath, uid));
	await ensureDir(path.resolve(userPath, uid, "widgets"));
	await ensureDir(path.resolve(userPath, uid, "projects"));
	await ensureDir(path.resolve(userPath, uid, "tpl"));
}

export function updateStringObj<T>(str: string, cb: (it: T) => void): string {
	console.log(str);
	const target = JSON.parse(str) as T;
	return JSON.stringify(produce(target, cb));
}

export async function addWidget(
	wid: string,
	umd: Express.Multer.File,
	esm: Express.Multer.File,
	style: Express.Multer.File,
) {
	const targetPath = path.resolve(STORE_PATH, "widgets", wid, "dev");
	await ensureDir(targetPath);
	await Promise.all([
		pipe(
			createWriteStream(path.join(targetPath, umd.originalname)),
			umd.buffer,
		),
		pipe(
			createWriteStream(path.join(targetPath, esm.originalname)),
			esm.buffer,
		),
		pipe(
			createWriteStream(path.join(targetPath, style.originalname)),
			style.buffer,
		),
	]);

	return {
		umdPath: path.join("widgets", wid, "dev", umd.originalname),
		esmPath: path.join("widgets", wid, "dev", esm.originalname),
		stylePath: path.join("widgets", wid, "dev", style.originalname),
	};
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
	const zip = new AdmZip();
	zip.addLocalFolder(dir);
	zip.writeZip(targetFile);
	return targetFile;
}

export class PageQueryDTO {
	@IsNotEmpty()
	@ApiProperty()
	page: number;

	@ApiProperty({ type: Number })
	num = DEFAULT_PAGE_NUM;

	@ApiProperty()
	kwd?: string;
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

export function getExt(file: Express.Multer.File): string {
	switch (file.mimetype) {
		case "image/png":
			return "png";
		case "image/jpg":
			return "jpg";
		case "image/jpeg":
			return "jpeg";
	}
}
