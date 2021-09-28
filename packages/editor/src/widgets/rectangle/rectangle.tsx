import { Grid, Input } from "@material-ui/core";
import produce from "immer";
import { FC, useRef, useState } from "react";
import { WidgetConfigProp, WidgetProps } from "../../render/interfaces";
import { RectangleProps } from "./schema";

export const Rectangle: FC<WidgetProps<RectangleProps>> = (props) => {
	const { style, config, pos } = props
	const { backgroundColor, borders, bgImage, bgSize } = config

	return (
		<div
			style={ {
				...style,
				backgroundColor,
				width: pos.w,
				height: pos.h,
				...borders?.reduce((prev, item) => ({
					...prev,
					[item.border]: item.value
				}), {
					[borders[0].border]: borders?.[0].value
				}),
				backgroundImage: `url(${bgImage})`,
				backgroundSize: bgSize
			} }
		>

    </div>
	)
}


export const RectangleConfig: FC<WidgetConfigProp<RectangleProps>> = ({
	widgetConfig,
	dispatchConfig
}) => {
	const [borderList, setBorderList] = useState(widgetConfig.config.borders)
	const timer = useRef<number | null>(null)
	return (
		<Grid container>
			圆角(单位填写 px 或 %)
			{
				borderList?.map(({ name, value }, i) => (
					<Grid container key={ i }>
						<Grid item xs={ 4 }>
							{ name }
						</Grid>
						<Grid item xs={ 8 }>
							<Input
								fullWidth
								value={ value }
								onChange={ e => {
									setBorderList(list => {
										const newConfig = produce(list, it => {
											it[i].value = e.target.value
										})
										if (timer.current !== null) {
											clearTimeout(timer.current)
										}
										timer.current = setTimeout(() => {
											dispatchConfig(produce(widgetConfig, config => {
												config.config.borders = newConfig
											}))
										}, 500) as unknown as number
										return newConfig
									})
								} }
							/>
						</Grid>
					</Grid>
				))
			}
		</Grid>
	)
}
