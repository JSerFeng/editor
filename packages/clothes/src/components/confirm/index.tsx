import { FC, ReactElement } from "react"
import { Button, Fade, Modal } from "@material-ui/core"

import "./style.scss"

const Confirm: FC<{
	render: ReactElement | string,
	onConfirm: () => void
	onCancel: () => void,
	open: boolean
	onClose?: () => void
}> = ({ open, onClose, render, onConfirm, onCancel }) => {
	if (typeof render === "string") {
		render = <h3 className="render">{ render }</h3>
	}
	return (
		<Modal
			open={ open }
			onClose={ onClose || (() => { }) }
		>
			<Fade in={ open } mountOnEnter unmountOnExit>
				<div className="confirm-modal">
					{ render }
					<div className="flex jb ac">
						<Button onClick={ onConfirm } variant="contained" color="primary" >确定</Button>
						<Button onClick={ onCancel } variant="outlined" color="secondary">返回</Button>
					</div>
				</div>
			</Fade>
		</Modal>
	)
}

export default Confirm
