import * as path from "path";

export const DEFAULT_PAGE_NUM = 20;

export const jwtConstants = {
	secret: "fy",
};

export const STORE_PATH = path.resolve(
	__dirname,
	"..",
	"..",
	"..",
	"..",
	"store",
);
console.log("---------");
console.log(__dirname);
console.log(STORE_PATH);
console.log("---------");
