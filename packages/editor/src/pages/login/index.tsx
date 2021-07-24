import { FC, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { Button, Grid, TextField } from "@material-ui/core"

const Login: FC<{
	dispatch: Dispatch
}> = () => {
	const [uid, setUid] = useState("")
	const [pwd, setPwd] = useState("")

	return (
		<div>
			<Grid
				container
				justifyContent="center"
				alignItems="center">
				<Grid item xs={ 12 }>
					<TextField
						fullWidth
						label="账号"
						onChange={ e => {
							setUid(e.target.value)
						} }>
						{ uid }
					</TextField>
				</Grid>
				<Grid item xs={ 12 }>
					<TextField
						fullWidth
						label="密码"
						onChange={ e => {
							setPwd(e.target.value)
						} }>
						{ pwd }
					</TextField>
				</Grid>
				<Grid container justifyContent="center">
					<Button variant="contained" color="primary">
						登录
					</Button>
				</Grid>
			</Grid>
		</div>
	)
}

export default connect()(Login)
