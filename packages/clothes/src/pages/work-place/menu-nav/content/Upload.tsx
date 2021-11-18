import { FC } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { BaseState } from "../../../../store"

interface Props {
	dispatch: Dispatch
}

const UploadContent: FC<Props> = () => {
	return (
		<div className="w-full bg-cyan-500">
			upload
		</div>
	)
}

export default connect(
	(state: BaseState) => ({

	}),
	(dispatch) => ({ dispatch })
)(UploadContent)
