import produce from "immer";
import { FC, memo, useRef } from "react";
import { Dispatch as ReduxDispatch } from "redux"
import {
	EditorConfig,
	EditorTypes,
	ReactComp,
	WidgetConfig,
	WidgetConfigProp
} from "../../../render/interfaces";
import { EditorActions } from "../../../store/editorReducer";
import {
	Button,
	TextField,
	RadioGroup,
	FormControlLabel,
	Radio,
	Grid
} from "@material-ui/core";
import NumberText from "../../../components/NumberText";
import ColorPicker from "../../../components/color-picker";
import ErrorCatch from "../../../components/error-widget";

const { actWidgetConfig } = EditorActions

const SingleConfig: FC<{
	widgetConfig: WidgetConfig,
	dispatch: ReduxDispatch,
	CustomConfig?: ReactComp<WidgetConfigProp> | null
}> = ({ widgetConfig, dispatch, CustomConfig }) => {
	const defaultConfig = useRef(widgetConfig.config)


	if (widgetConfig.editorConfig === null ||
		widgetConfig.config === null
	) {
		return <Grid>无可配置选项</Grid>
	}

	const dispatchProperty = (key: string, value: any) => {
		dispatch(actWidgetConfig(produce(widgetConfig, it => {
			it.config[key] = value
		})))
	}

	return (
		<Grid>
			{
				widgetConfig.editorConfig.length === 0
					? <Grid container justify="center">组件没有可配置项</Grid>
					: (
						<div>
							<Grid container>
								<Grid item xs={ 6 }>层级</Grid>
								<Grid item xs={ 6 }>
									<NumberText
										placeholder="层级"
										value={ Number(widgetConfig.style?.zIndex || 0) }
										onChange={ zIdx => {
											dispatch(actWidgetConfig(produce(widgetConfig, it => {
												if (!it.style) {
													it.style = { zIndex: 0 }
												}
												it.style.zIndex = zIdx
											})))
										} }
									/>
								</Grid>
							</Grid>
							{
								widgetConfig.editorConfig.map((editorConfig, i) => {
									const { name, key } = editorConfig
									return <Grid container key={ key }>
										<Grid item xs={ 6 }>
											{ name }
										</Grid>
										<Grid item xs={ 6 }>
											<Config
												editorConfig={ editorConfig }
												value={ widgetConfig.config[key] }
												setProperty={ dispatchProperty.bind(null, key) }
											/>
										</Grid>
									</Grid>
								})
							}
							{
								CustomConfig && <ErrorCatch name="配置">
									<CustomConfig
										widgetConfig={ widgetConfig }
										dispatchConfig={ newWidgetConfig => {
											dispatch(actWidgetConfig(newWidgetConfig))
										} }
									/>
								</ErrorCatch>
							}
							<Button
								onClick={
									() => {
										dispatch(actWidgetConfig(produce(widgetConfig, it => {
											it.config = defaultConfig.current
										})))
									}
								}
								color="secondary"
								variant="contained"
							>恢复默认</Button>
						</div>
					)
			}
		</Grid>
	)
}

const Config: FC<{
	editorConfig: EditorConfig,
	value: any,
	setProperty: (val: any) => void
}> = ({ editorConfig: config, value, setProperty }) => {

	switch (config.type) {
		case EditorTypes.Color:
			return <ColorPicker
				color={ value }
				onChangeComplete={ color => {
					setProperty(color)
				} } />
		case EditorTypes.Text:
			return <TextField multiline value={ value } onChange={ e => {
				setProperty(e.target.value)
			} } />
		case EditorTypes.Number:
			return <TextField value={ value } onChange={ e => {
				setProperty(e.target.value)
			} } />
		case EditorTypes.Select:
			return <Grid>
				<RadioGroup
					value={ value }
					onChange={ e => { setProperty(e.target.value) } }
				>
					{
						(config as EditorConfig<EditorTypes.Select>).options.map(({ label, value }) => (
							<FormControlLabel
								key={ value }
								control={ <Radio /> }
								label={ label }
								value={ value }
							/>
						))
					}
				</RadioGroup>
			</Grid>
		default: return null
	}
}

export default memo(SingleConfig)
