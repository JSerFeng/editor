import { FC, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { ButtonBase, Grid, makeStyles, Slide } from "@material-ui/core"

import "./style.scss"
import Login from "./login"
import Register from "./register"

//最外层的Grid样式
const useContainerStyle = makeStyles({
	container: {
		width: "80%",
		minHeight: "50vh",
		backgroundColor: "#fff",
		padding: "15px",
		position: "relative",
		overflow: "hidden",
		borderRadius: "20px"
	}
})

//表示登陆或注册
enum LR {
	Login = "登录",
	Register = "注册",
}

const LoginAndRegister: FC<{
	dispatch: Dispatch
}> = ({ dispatch }) => {
	const containerStyle = useContainerStyle()
	const [curState, setCurState] = useState(LR.Login)

	return (
		<div className="login-main flex jc ac">
			<Grid
				container
				justifyContent="center"
				alignItems="flex-start"
				alignContent="space-between"
				classes={ containerStyle }>
				<Grid item xs={ 12 }>
					<div className="login-title flex jc">
						<ButtonBase
							className={ curState === LR.Login ? "btn active" : "btn" }
							onClick={ setCurState.bind(null, LR.Login) }>
							登录
						</ButtonBase>
						<ButtonBase
							className={ curState === LR.Register ? "btn active" : "btn" }
							onClick={ setCurState.bind(null, LR.Register) }>
							注册
						</ButtonBase>
					</div>
				</Grid>
				<Grid item xs={ 12 }>
					<div className="login-body flex jc">
						<Slide
							direction="right"
							in={ curState === LR.Login }>
							<Login dispatch={ dispatch } />
						</Slide>
						<Slide
							direction="right"
							in={ curState === LR.Register }>
							<Register dispatch={ dispatch } />
						</Slide>
					</div>
				</Grid>
			</Grid>
		</div >
	)
}

export default connect()(LoginAndRegister)
