import { Button, Grid, Input, TextField } from "@material-ui/core"
import { FC, useState } from "react"
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"
import { Dispatch } from "redux"
import { RenderConfig } from "../.."
import { apiAddProject, ErrorCode } from "../../api"
import { BaseState } from "../../store"
import { EditorActions } from "../../store/editorReducer"

const {
	actNewProject
} = EditorActions


const InitProject: FC<{
	dispatch: Dispatch,
	renderConfig: RenderConfig
}> = ({
	dispatch,
	renderConfig
}) => {
		const [projectName, setProjectName] = useState("hello-world")
		const [pageSize, setPageSize] = useState({
			w: 1024,
			h: 768
		})
		const history = useHistory()

		const handleNewProject = async () => {
			actNewProject(projectName, pageSize)
			const res = await apiAddProject(projectName, JSON.stringify(renderConfig))
			if (res.code !== ErrorCode.Success) {
				return
			}
			history.push("/editor")
		}

		return <div>
			<Grid
				container
				style={ {
					marginBottom: "10px"
				} }>
				<Grid item xs={ 6 }>
					项目名:
				</Grid>
				<Grid item xs={ 6 }>
					<Input
						value={ projectName }
						onChange={
							e => {
								setProjectName(e.target.value)
							}
						} />
				</Grid>
				<div className="space"></div>
				<Grid item xs={ 12 }>
					页面尺寸
				</Grid>
				<Grid item xs={ 6 }>
					宽度
				</Grid>
				<Grid item xs={ 6 }>
					<TextField onChange={
						e => {
							setPageSize(prev => ({
								...prev,
								w: +e.target.value
							}))
						}
					} value={ pageSize.w } />
				</Grid>
				<Grid item xs={ 6 }>
					高度
				</Grid>
				<Grid item xs={ 6 }>
					<TextField onChange={
						e => {
							setPageSize(prev => ({
								...prev,
								h: +e.target.value
							}))
						}
					} value={ pageSize.h } />
				</Grid>
				<Grid item xs={ 12 }>
					<div
						className="sm-page flex jc ac">
						<div
							style={ {
								backgroundColor: "#fff",
								width: pageSize.w * 0.1 + "px",
								height: pageSize.h * 0.1 + "px",
								fontSize: "12px"
							} }
							className="flex jc ac">
							{ pageSize.w } * { pageSize.h }
						</div>
					</div>
				</Grid>
			</Grid>
			<Grid container justifyContent="center">
				<Button
					onClick={ handleNewProject }
					color="primary"
					variant="contained"
				>开始</Button>
			</Grid>
		</div>
	}

export default connect(
	(state: BaseState) => ({ renderConfig: state.editorReducer.workplace.renderConfig }),
	dispatch => ({ dispatch })
)(InitProject)
