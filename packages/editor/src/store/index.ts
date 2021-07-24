import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import editorReducer, { Types } from './editorReducer'
import { rootEpic, serviceReducer, ServiceTypes } from "./serviceReducer";
import { createEpicMiddleware, Epic } from "redux-observable";

export const AC = <T extends Types | ServiceTypes, P = null>(type: T, payload: P): { type: T, payload: P } => ({ type, payload })

export type GetActionTypes<A extends { [k: string]: (...args: any[]) => { type: Types | ServiceTypes, payload: any } }> = { [K in keyof A]: ReturnType<A[K]> }[keyof A]

type GetBaseState<T extends { [k: string]: (...args: any) => any }> = {
	[K in keyof T]: ReturnType<T[K]>
}

const reducersMap = {
	serviceReducer,
	editorReducer,
}

export type BaseState = GetBaseState<typeof reducersMap>

const epicMiddleware = createEpicMiddleware()

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	combineReducers(reducersMap),
	composeEnhancers(applyMiddleware(epicMiddleware))
)

epicMiddleware.run(rootEpic as Epic<any, any>)

export { store }
