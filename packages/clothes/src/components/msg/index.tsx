import { Snackbar } from "@material-ui/core";
import { FC } from "react";
import { connect } from "react-redux"
import { Dispatch } from "redux"

const Msg: FC<{
	dispatch: Dispatch,
	msg: string,
	open: boolean,
	close: () => void
}> = ({ msg, close }) => {

	return (
		<Snackbar
			message={ msg }
			onClose={ close }
		></Snackbar>
	)
}

export default connect(

)(Msg)
