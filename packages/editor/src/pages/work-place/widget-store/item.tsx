import { ButtonBase, Grid, makeStyles } from "@material-ui/core"
import { Extension } from "@material-ui/icons"
import { FC } from "react"
import { WidgetPO } from "../../../api"
import { MAIN_THEME } from "../../../constants/theme"

const useBtnStyle = makeStyles({
	root: {
		backgroundColor: MAIN_THEME
	}
})

const WidgetItem: FC<{
	widget: WidgetPO
}> = ({ widget }) => {

	const btnStyle = useBtnStyle()

	return (
		<div>
			<Grid container>
				<div>
					{ widget.showName }
				</div>
				<div>
					{ widget.description }
				</div>
			</Grid>
			<Grid container justifyContent="center" alignItems="center">
				<ButtonBase classes={ btnStyle }>
					<Extension style={ {
						color: "#fff"
					} } />
				</ButtonBase>
			</Grid>
		</div>
	)
}

export default WidgetItem
