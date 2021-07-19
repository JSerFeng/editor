import { combineReducers, createStore } from "redux";
import editorReducer from './editorReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducersMap = {
  editorReducer
}

type GetBaseState<T extends { [k: string]: (...args: any) => any }> = {
  [K in keyof T]: ReturnType<T[K]>
}


export type BaseState = GetBaseState<typeof reducersMap>

const store = createStore(
  combineReducers(reducersMap),
  composeWithDevTools()
)

export { store }
