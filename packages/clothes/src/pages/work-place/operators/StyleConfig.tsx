import { Button, TextField, Grid, MenuItem, Select } from "@material-ui/core"
import { Add, Delete } from "@material-ui/icons"
import produce from "immer";
import { FC, useState } from "react";
import { Dispatch } from "redux";
import { WidgetConfig } from "../../../render/interfaces";
import { EditorActions } from "../../../store/editorReducer";
import { isUndef } from "../../../utils";
import ColorPicker from "../../../components/color-picker";

const { actWidgetConfig } = EditorActions

interface StyleConfigProps {
	widgetConfig: WidgetConfig | WidgetConfig[] | null,
	dispatch: Dispatch,
}

const StyleConfig: FC<StyleConfigProps> = ({ widgetConfig, dispatch }) => {
	const [key, setKey] = useState("")
	const [val, setVal] = useState("")

	const configs = widgetConfig === null
		? []
		: Array.isArray(widgetConfig)
			? widgetConfig
			: [widgetConfig]

	return (
		<Grid container spacing={ 2 }>
			<Grid item xs={ 6 }>
				材质
			</Grid>
			<Grid item xs={ 6 }>
				<Select value="涤棉" fullWidth>
					<MenuItem value="涤棉">涤棉</MenuItem>
					<MenuItem value="涤棉">100%棉</MenuItem>
					<MenuItem value="涤棉">丝光棉</MenuItem>
					<MenuItem value="涤棉">莱卡棉</MenuItem>
					<MenuItem value="涤棉">纯棉</MenuItem>
					<MenuItem value="涤棉">尼龙</MenuItem>
					<MenuItem value="涤棉">徕卡</MenuItem>
				</Select>
			</Grid>

			<Grid item xs={ 6 }>印染工艺</Grid>
			<Grid item xs={ 6 }>
				<Select value="丝印工艺" fullWidth>
					<MenuItem value="丝印工艺">丝印工艺</MenuItem>
					<MenuItem value="涤棉">刺绣工艺</MenuItem>
					<MenuItem value="涤棉">烫画工艺</MenuItem>
					<MenuItem value="涤棉">数码直喷</MenuItem>
				</Select>
			</Grid>

			<Grid item xs={ 6 }>类型</Grid>
			<Grid item xs={ 6 }>
				<Select value="经典衬衫" fullWidth>
					<MenuItem value="经典衬衫">经典衬衫</MenuItem>
					<MenuItem value="卫衣">卫衣</MenuItem>
					<MenuItem value="冲锋衣">冲锋衣</MenuItem>
				</Select>
			</Grid>

			<Grid item xs={ 6 }>颜色</Grid>
			<Grid item xs={ 6 }>
				<ColorPicker onChangeComplete={ (color: string) => { } } color="#fff" />
			</Grid>

			<div className="flex" style={{
				justifyContent: "flex-end",
				width: "100%"
			}}>
				<Button variant="contained" color="primary">确认</Button>
			</div>
		</Grid>
	)
}

export default StyleConfig
