import { FC } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { BaseState } from "../../../../store"

interface Props {
	dispatch: Dispatch
}

const ResourceContent: FC<Props> = () => {
	return (
		<div className="w-full bg-cyan-800">
			素材
		</div>
	)
}

export default connect(
	(state: BaseState) => ({

	}),
	(dispatch) => ({ dispatch })
)(ResourceContent)
