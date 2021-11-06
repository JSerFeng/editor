import { Grid, Button, makeStyles, Input, Typography } from "@material-ui/core"
import { Lock, Person } from "@material-ui/icons"
import { forwardRef, useState, Ref } from "react"
import { apiLogin, ErrorCode } from "../../api"
import { useFullHeight } from "../../constants/theme"
import { useHistory } from "react-router-dom"
import { Dispatch } from "redux"
import { serviceActions } from "../../store/serviceReducer"

const useBigBtnStyle = makeStyles({
	root: {
		fontSize: "18px",
	}
})

const useInputStyle = makeStyles({
	root: {
		fontSize: "18px",
	}
})

const { actDoneLogin } = serviceActions

const Login = forwardRef<
	HTMLDivElement, {
		dispatch: Dispatch
	}
>(({ dispatch }, ref) => {
	const [uid, setUid] = useState("")
	const [pwd, setPwd] = useState("")
	const inputStyle = useInputStyle()
	const btnStyle = useBigBtnStyle()
	const fullHeight = useFullHeight()

	const router = useHistory()

	const login = async () => {
		const res = await apiLogin(uid, pwd)
		if (res.code !== ErrorCode.Success) {
			return
		}
		dispatch(actDoneLogin(res.data))
		router.push("/")
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
							<Typography classes={ inputStyle }>
								账号
							</Typography>
						</Grid>
						<Grid item xs={ 10 }>
							<Input
								startAdornment={ <Person fontSize="inherit" /> }
								classes={ inputStyle }
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
								classes={ inputStyle }>
								密码
							</Typography>
						</Grid>
						<Grid item xs={ 10 }>
							<Input
								startAdornment={ <Lock fontSize="inherit" /> }
								classes={ inputStyle }
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
						variant="contained"
						color="primary"
						classes={ btnStyle }
						onClick={ login }>
						登录
					</Button>
				</Grid>
			</Grid>
		</div>
	)
})

export default Login
