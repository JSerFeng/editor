import { Epic, ofType } from "redux-observable";
import { switchMap, filter, map } from "rxjs";
import { SActions, serviceActions, ServiceState, ServiceTypes as T } from "..";
import { apiLogin, ErrorCode } from "../../../api";


export const loginEpic: Epic<SActions, SActions, T> = (
	action$,
) => action$.pipe(
	ofType<SActions, T.Login>(T.Login),
	switchMap(async ({ payload }) => apiLogin(payload.uid, payload.pwd)),
	filter(({ code }) => code === ErrorCode.Success),
	map(({ data }) => serviceActions.doneLogin(data.userInfo)),
)
