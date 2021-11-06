import { filter } from "rxjs/operators";
import { produce } from "immer";
import { Reducer } from "redux";
import { combineEpics } from "redux-observable";
import { UserInfo } from "../../api";
import { AC } from "../";
import { GetActionTypes } from "../";
import { loginEpic } from "./epics";
import { storage } from "../../utils";

export interface ServiceState {
	userInfo: UserInfo | null,
}

export enum ServiceTypes {
	DoneLogin = "DoneLogin",
	Login = "Login",
	Register = "Register",
}

export type SActions = GetActionTypes<typeof serviceActions>

export const serviceActions = {
	actLogin: (uid: string, pwd: string) =>
		AC(ServiceTypes.Login, { uid, pwd }),
	actDoneLogin: (data: { access_token: string, userInfo: UserInfo }) => {
		const { access_token, userInfo } = data
		return AC(ServiceTypes.DoneLogin, { access_token, userInfo })
	},
}

const defaultState: ServiceState = {
	userInfo: null
}

export const rootEpic = combineEpics(
	loginEpic
);

export const serviceReducer: Reducer<ServiceState, SActions> = produce((state = defaultState, action) => {
	switch (action.type) {
		case ServiceTypes.DoneLogin:
			state.userInfo = action.payload.userInfo
			storage.set("access_token", action.payload.access_token)
			break
	}
}, defaultState)
