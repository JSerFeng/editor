import { FC } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import {
	BaseState,
} from "../../../../store"
import {
	EditorActions,
	MessageType
} from "../../../../store/editorReducer"

import "./style.scss"

interface Props {
	dispatch: Dispatch,
	messages: BaseState["editorReducer"]["messages"]
}

const {
	removeMessage
} = EditorActions

const type2className = {
	[MessageType.WARN]: "message-warn",
	[MessageType.ERROR]: "message-error",
	[MessageType.TIP]: "message-tip",
}

const MessageCenter: FC<Props> = ({
	dispatch,
	messages: {
		total,
		warnCount,
		errorCount,
		tipCount,
		list
	}
}) => {

	if (total === 0) {
		return <div>无任何消息</div>
	}
	return (
		<div>
			共<b>{ total }</b>条消息
			{
				list.map((item, i) => {

					return (
						<div className="flex message-item" key={i}>
							<div className={ type2className[item.type] + " message-dot" }></div>
							<div className="message-text">{ item.text }</div>
						</div>
					)
				})
			}
		</div>
	)
}

export default connect(
	(state: BaseState) => ({
		messages: state.editorReducer.messages
	})
)(MessageCenter)
