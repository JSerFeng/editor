import { ErrorCode, Res } from "../api";
import { useEffect, useState, useCallback } from "react";
import type { ChangeEvent } from "react";

type RequestFn<T extends any[], R> = (...args: T) => Promise<Res<R>>

export function useRequest<T extends any[], R>(
	fn: RequestFn<T, R>,
	...args: T
) {
	const [data, setData] = useState<R | null>(null);
	useEffect(() => {
		fn(...args)
			.then((res) => {
				if (res.code !== ErrorCode.Success) {
					setData(null)
				} else {
					setData(res.data);
				}
			})
	}, [...args, fn])

	return data
}

export function useInput(str: string):
	[string, { value: string, onChange: (e: ChangeEvent) => void }] {
	const [value, setValue] = useState(str)

	const onChange = useCallback((e: ChangeEvent) => {
		//@ts-ignore
		setValue(e.target.value)
	}, [setValue])

	return [
		value, {
			value,
			onChange
		}
	]
}
