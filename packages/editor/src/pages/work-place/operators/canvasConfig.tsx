import { FC, memo } from "react";
import { Dispatch } from "redux";
import { EditorActions } from "../../../store/editorReducer";

import { Button, Input, Switch, Slider, Grid } from "@material-ui/core"
import { connect } from "react-redux";
import { BaseState } from "../../../store";
import produce from "immer";
import { StickFlags } from "../../../utils";

const {
	actResetDraw,
	actMoveCanvasToCenter,
	actChangeCanvasWH,
	actStickFlags,
	actChangeWorkingPos,
	actStickPx,
	actShowPx
} = EditorActions

const GeneralConfig: FC<{
	dispatch: Dispatch,
	workplace: BaseState["editorReducer"]["workplace"]
}> = ({ dispatch, workplace }) => {

	return (
		<Grid container spacing={ 2 }>
			<Grid item xs={ 6 }>
				网页宽度
			</Grid>
			<Grid item xs={ 6 }>
				<Input value={ workplace.renderConfig.pos.w } onChange={ (e) => {
					dispatch(actChangeCanvasWH(produce(workplace.renderConfig.pos, it => {
						let val: number
						if ((val = Number(e.target.value))) {
							it.w = Number(val)
						}
					})))
				} } />
			</Grid>
			<Grid item xs={ 6 }>
				网页高度
			</Grid>
			<Grid item xs={ 6 }>
				<Input value={ workplace.renderConfig.pos.h } onChange={ (e) => {
					dispatch(actChangeCanvasWH(produce(workplace.renderConfig.pos, it => {
						let val: number
						if ((val = Number(e.target.value))) {
							it.h = val
						}
					})))
				} } />
			</Grid>
			<Grid item xs={ 6 }>
				竖直吸附
			</Grid>
			<Grid item xs={ 6 }>
				<Switch
					size="small"
					checked={ !!(workplace.refLine.stickFlag & StickFlags.STICK_ROW) }
					onChange={ e => {
						dispatch(actStickFlags(
							e.target.checked
								? workplace.refLine.stickFlag | StickFlags.STICK_ROW
								: workplace.refLine.stickFlag & (~StickFlags.STICK_ROW)
						))
					} }
				></Switch>
			</Grid>
			<Grid item xs={ 6 }>
				水平吸附
			</Grid>
			<Grid item xs={ 6 }>
				<Switch
					size="small"
					checked={ !!(workplace.refLine.stickFlag & StickFlags.STICK_COL) }
					onChange={ e => {
						dispatch(actStickFlags(
							e.target.checked
								? workplace.refLine.stickFlag | StickFlags.STICK_COL
								: workplace.refLine.stickFlag & (~StickFlags.STICK_COL)
						))
					} }
				></Switch>
			</Grid>
			<Grid item xs={ 6 }>
				最大吸附距离
			</Grid>
			<Grid item xs={ 6 }>
				{ workplace.refLine.stickPx }
			</Grid>
			<Grid item xs={ 10 }>
				<Slider
					value={ workplace.refLine.stickPx }
					step={ 1 }
					min={ 0 }
					max={ 10 }
					onChange={ (_, v) => {
						dispatch(actStickPx(v as number))
					} }
				/>
			</Grid>
			<Grid item xs={ 6 }>
				参考线最大显示距离
			</Grid>
			<Grid item xs={ 6 }>
				{ workplace.refLine.showPx }
			</Grid>
			<Grid item xs={ 10 }>
				<Slider
					value={ workplace.refLine.showPx }
					step={ 1 }
					min={ 0 }
					max={ 15 }
					onChange={ (_, v) => {
						dispatch(actShowPx(v as number))
					} }
				/>
			</Grid>
			<Grid item xs={ 6 }>
				缩放 { (workplace.canvas.scale * 100).toFixed(0) }%
			</Grid>
			<Grid item xs={ 6 }>
				<Slider
					value={ workplace.canvas.scale }
					step={ .1 }
					min={ .1 }
					max={ 5 }
					onChange={ (_, v) => {
						dispatch(actChangeWorkingPos(produce(workplace.canvas, it => {
							it.scale = v as number
						})))
					} }
				/>
			</Grid>
			<Grid item xs={ 6 }>
				<Button color="primary" variant="contained" onClick={ () => {
					dispatch(actMoveCanvasToCenter())
				} }>
					重置画布位置
				</Button>
			</Grid>
			<Grid item xs={ 6 }>
				<Button color="secondary" variant="contained" onClick={ () => {
					dispatch(actResetDraw())
				} }>重置画布</Button>
			</Grid>
		</Grid>
	)
}

export default connect(
	(state: BaseState) => ({
		workplace: state.editorReducer.workplace
	}),
	dispatch => ({ dispatch })
)(memo(GeneralConfig))
