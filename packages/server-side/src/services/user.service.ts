import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
	User,
	UserDoc,
	LoginBody,
	RegisterBody,
} from "src/schemas/user.schema";
import { res, ErrorCode, Res, createUserDir } from "src/utils";

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDoc>) {}

	async login(body: LoginBody): Promise<
		Res<{
			userInfo: {
				id: string;
				uid: string;
				userName: string;
				projects: string[];
			};
		}>
	> {
		const user = await this.userModel.findOne({ uid: body.uid }).exec();
		if (!user || user.pwd != body.pwd) {
			return res(ErrorCode.PwdOrIdError, "用户名或密码错误");
		}
		return res(
			ErrorCode.Success,
			{
				userInfo: {
					id: user._id.toString(),
					uid: user.uid,
					userName: user.userName,
					projects: user.projects,
				},
			},
			"登陆成功",
		);
	}

	async registerOne(body: RegisterBody): Promise<Res> {
		//查询有无已注册
		const result = await this.userModel.findOne({ uid: body.uid }).exec();
		if (result) {
			return res(ErrorCode.HasBeenRegistered, "账号已被注册");
		}

		const newUser = new this.userModel(body);
		try {
			await newUser.save();

			//为用户添加用户文件夹
			await createUserDir(newUser._id.toString());
			return res(ErrorCode.Success, "注册成功");
		} catch (e) {
			console.log(e);
			return res(ErrorCode.InternalError);
		}
	}

	async findUser(id: string) {
		return await this.userModel.findById(id).exec();
	}
}
