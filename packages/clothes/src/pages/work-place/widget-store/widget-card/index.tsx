import {
	Card,
	CardContent,
	CardMedia,
	makeStyles,
	CardActions,
	IconButton,
	CircularProgress
} from "@material-ui/core"
import { Add } from "@material-ui/icons"
import { FC, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { WidgetPO } from "../../../../api"
import { BaseState } from "../../../../store"
import { EditorActions } from "../../../../store/editorReducer"
import { installWidget } from "../../../../utils/dep"
import "./card.scss"

const {
	actWid,
	actAddWidgetDep
} = EditorActions

const useCardImageStyle = makeStyles({
	root: {
		width: "20em",
		height: "20em",
		borderRadius: "15px",
		transform: "translateX(-20px)",
		boxShadow: `0 0 10px rgb(214, 214, 214)`,
		backgroundColor: "#fff",
	}
})

const useColorBtnStyle = makeStyles({
	root: {
		boxShadow: "0 4px 15px rgb(89 35 196 / 49%)",
		backgroundImage: "linear-gradient(147deg,#765dff 0,#af66ff 74%)",
		color: "#fff",
		borderRadius: "50px",
		fontSize: "14px",
	}
})

const useCardContainerStyle = makeStyles({
	root: {
		overflow: "visible",
		display: "flex",
		justifyContent: "space-between",
		borderRadius: "15px",
		padding: "20px 0",
		margin: "20px",
		boxShadow: `0 0 30px rgb(235, 217, 255)`,
	}
})

const useCardContentStyle = makeStyles({
	root: {
		width: "20em",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
	}
})

const WidgetCard: FC<{
	widget: WidgetPO,
	pid: string,
	dispatch: Dispatch
}> = ({ widget, pid, dispatch }) => {
	const cardImg = useCardImageStyle()
	const cardContainerStyle = useCardContainerStyle()
	const btnStyle = useColorBtnStyle()
	const containerStyle = useCardContentStyle()
	const [loading, setLoading] = useState(false)

	const handleInstall = async () => {
		setLoading(true)
		dispatch(actWid(widget._id))
		await installWidget(widget._id, pid)
		dispatch(actAddWidgetDep(widget._id))
		setLoading(false)
	}

	return (
		<Card classes={ cardContainerStyle }>
			<CardMedia
				classes={ cardImg }
				image={ widget.snapShot || "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Git_icon.svg/2000px-Git_icon.svg.png" }>
			</CardMedia>
			<CardContent classes={ containerStyle }>
				<div>
					<div className="widget-name">
						{ widget.showName || widget.name }
					</div>
					<div className="widget-description">
						{ widget.description }
					</div>
				</div>
				<CardActions>
					<IconButton
						classes={ btnStyle }
						onClick={ handleInstall }>
						{
							loading
								? <CircularProgress style={ {
									fontSize: "14px",
									color: "#fff"
								} } />
								: <Add style={ {
									color: "#fff"
								} } />
						}
					</IconButton>
				</CardActions>
			</CardContent>
		</Card>
	)
}

export default connect(
	(state: BaseState) => {
		return {
			pid: state.editorReducer.pid
		}
	}
)(WidgetCard)
