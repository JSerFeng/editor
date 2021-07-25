import axios from 'axios'
import { notification } from "antd"
import { storage } from '../utils'
import { Res } from '.'

export const baseURL = "http://localhost:3000/api"

export interface QueryBody {
	page: number,
	num?: number,
}

export const request = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json;charset=utf-8"
	}
})

export const fileRequest = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json;charset=utf-8"
	}
})

fileRequest.interceptors.request.use((config) => {
	const tk = storage.get("access_token")
	config.headers["Authorization"] = "bearer " + tk
	return config
})

export enum ErrorCode {
	Success = 200,
	InternalError = 500,
	Fail = 415,
	TokenExpire = 420,
	ParamsError = 445,

	HasBeenRegistered = 450,
	PwdOrIdError = 455,
}

request.interceptors.request.use(
	(req) => {
		const tk = storage.get("access_token")
		if (tk) {
			req.headers["Authorization"] = "bearer " + tk
		}
		return req
	}
)

request.interceptors.response.use(
	(res) => {
		return res.data
	},
	err => {
		notification.error({
			message: "连接服务失败 "
		})
		console.log(err);
		return {
			code: ErrorCode.InternalError,
			msg: "error",
			data: err
		}
	}
)

request.interceptors.response.use(
	(_res) => {
		const res = _res as unknown as Res
		switch (res.code) {
			case ErrorCode.Success:
				break
			case ErrorCode.Fail:
			case ErrorCode.HasBeenRegistered:
				notification.warn({ message: res.msg })
				break
			case ErrorCode.TokenExpire:
				notification.warn({ message: "验证用户失败，请重新登录" })
				break
			case ErrorCode.InternalError:
				notification.warn({ message: "系统内部出错，请稍后尝试" })
				break
			default:
				notification.warn({ message: res.msg })
		}
		return res as any
	},
	(err) => {
		console.log("---不应该出现的情况---")
		console.error(err)
		console.log("--------------------")
		notification.warn({ message: "页面异常，请稍后尝试" })
		return { code: ErrorCode.InternalError, data: null, msg: "页面异常，请稍后尝试" }
	}
)
