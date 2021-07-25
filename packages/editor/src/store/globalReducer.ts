/*
该文件没有使用！！！！！！！
原因:
本来准备做全局通知组件的，但是发现不好实现命令式的展示多条消息，
先用antd的 notification api凑合下
*/
import { produce } from "immer"
import { Reducer } from "redux"
import { ServiceTypes } from "./serviceReducer"

export const AC = <T extends Types | ServiceTypes, P = null>(type: T, payload: P): { type: T, payload: P } => ({ type, payload })

export type GetActionTypes<A extends { [k: string]: (...args: any[]) => { type: Types | ServiceTypes, payload: any } }> = { [K in keyof A]: ReturnType<A[K]> }[keyof A]


export interface GlobalState {
	msgs: { severity: string, msg: string }[]
}

const defaultGlobalState = {
	msgs: []
}

enum Types {
	AddMsg = "AddMsg",
}

export { Types as GlobalTypes }

export const globalActions = {
	addMsg: (severity: string, msg: string) => AC(Types.AddMsg, { severity, msg })
}

export const globalReducer: Reducer<
	GlobalState,
	GetActionTypes<typeof globalActions>
> = produce((state = defaultGlobalState, action) => {
	switch (action.type) {
		case Types.AddMsg:
			const { severity, msg } = action.payload
			state.msgs.push({ severity, msg })
			break;
	}
}, defaultGlobalState)
