import axios from 'axios'
import { notification } from "antd"

const baseURL = "http://localhost:61520"

export const request = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
})


export enum ErrorCode {
	Success = 200,
	InternalError = 500,
	ParamsError = 420,
	UnknownError = 400
}

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
			code: ErrorCode.UnknownError,
			msg: "error",
			data: err
		}
	}
)
