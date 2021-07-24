import axios from 'axios'
import { notification } from "antd"
import { storage } from '../utils'

const baseURL = "http://localhost:7001/api"

export const request = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
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
		if (res.data.code !== ErrorCode.Success) {
			notification.error({
				message: res.data.msg
			})
		}
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
