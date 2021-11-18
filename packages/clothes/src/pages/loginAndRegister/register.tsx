import { Grid, Button, makeStyles, Typography, Input } from "@material-ui/core"
import { Lock, Person, PersonAdd } from "@material-ui/icons"
import { notification } from "../../components/msg"
import { forwardRef, useState } from "react"
import { Dispatch } from "redux"
import { apiRegister, ErrorCode } from "../../api"
import { useFullHeight } from "../../constants/theme"

const useBigFontStyle = makeStyles({
	root: {
		fontSize: "18px"
	}
})

const Register = forwardRef<HTMLDivElement, { dispatch: Dispatch }>((props, ref) => {
	const [userName, setUserName] = useState("")
	const [uid, setUid] = useState("")
	const [pwd, setPwd] = useState("")
	const fontStyle = useBigFontStyle()
	const fullHeight = useFullHeight()

	const register = async () => {
		const res = await apiRegister(uid, userName, pwd)
		if (res.code !== ErrorCode.Success) {
			return
		}
		notification.success({
			message: "注册成功，请前往登录"
		})
	}

	return (
		<div ref={ ref } className="wrap">
			<Grid
				container
				alignContent="space-between"
				justifyContent="center"
				classes={ fullHeight }>
				<Grid item xs={ 12 }>
					<Grid container alignItems="center" spacing={ 5 }>
						<Grid item xs={ 2 }>
							<Typography classes={ fontStyle }>
								用户名
							</Typography>
						</Grid>
						<Grid item xs={ 10 }>
							<Input
								startAdornment={ <Person fontSize="inherit" /> }
								classes={ fontStyle }
								fullWidth
								placeholder="用户名"
								onChange={ e => {
									setUserName(e.target.value)
								} }
								value={ userName } />
						</Grid>
					</Grid>
					<Grid container alignItems="center" spacing={ 5 }>
						<Grid item xs={ 2 }>
							<Typography classes={ fontStyle }>
								账号
							</Typography>
						</Grid>
						<Grid item xs={ 10 }>
							<Input
								startAdornment={ <Person fontSize="inherit" /> }
								classes={ fontStyle }
								fullWidth
								placeholder="账号"
								onChange={ e => {
									setUid(e.target.value)
								} }
								value={ uid } />
						</Grid>
					</Grid>
					<Grid container alignItems="center" spacing={ 5 }>
						<Grid item xs={ 2 }>
							<Typography
								classes={ fontStyle }>
								密码
							</Typography>
						</Grid>
						<Grid item xs={ 10 }>
							<Input
								startAdornment={ <Lock fontSize="inherit" /> }
								classes={ fontStyle }
								fullWidth
								placeholder="密码"
								value={ pwd }
								type="password"
								onChange={ e => {
									setPwd(e.target.value)
								} } />
						</Grid>
					</Grid>
				</Grid>
				<Grid container justifyContent="center">
					<Button
						onClick={ register }
						variant="contained"
						color="primary"
						classes={ fontStyle }
						startIcon={ <PersonAdd fontSize="inherit" /> }>
						注册
					</Button>
				</Grid>
			</Grid>
		</div>
	)
})

export default Register
