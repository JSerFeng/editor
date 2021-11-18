import { IconButton, Snackbar } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { FC, useState, useEffect, SyntheticEvent as ReactEvent } from "react";

const { port1: sender, port2: receiver } = new MessageChannel()

export interface IMsg {
	message: string,
	_id?: number,
	autoHideDuration?: number,
	severity?: "error" | "warning" | "success" | "info",
}

const theme = {
	"success": ["#d9f99d", "#365314"],
	"info": ["#a5f3fc", "#164e63"],
	"warning": ["#fef3c7", "#9a3412"],
	"error": ["#f87171", "#7f1d1d"]
}

class Notification {
	msgList: IMsg[]
	sender: MessagePort
	nextTick = Promise.resolve()
	_id: number
	_isSending: boolean
	constructor(sender: MessagePort) {
		this.msgList = [];
		this.sender = sender;
		this._id = 0;
		this._isSending = false;
	}

	success(msg: IMsg) {
		msg.severity = "success"
		this.prepareSend(msg)
	}

	info(msg: IMsg) {
		msg.severity = "info"
		this.prepareSend(msg)
	}

	warn(msg: IMsg) {
		msg.severity = "warning"
		this.prepareSend(msg)
	}

	error(msg: IMsg) {
		msg.severity = "error"
		this.prepareSend(msg)
	}

	async prepareSend(msg: IMsg) {
		msg._id = ++this._id
		this.msgList.push(msg)
		if (!this._isSending) {
			this._isSending = true
			await this.nextTick
			this.send()
		}
	}

	send() {
		sender.postMessage(this.msgList)
		this.msgList.length = 0
		this._isSending = false
	}
}

export const notification = new Notification(sender)

const Msg: FC = () => {
	const [msgList, setMsgList] = useState<IMsg[]>([])

	useEffect(() => {
		receiver.onmessage = (e: MessageEvent) => {
			setMsgList(list => {
				console.log([...list, ...e.data])
				return [...list, ...e.data]
			})
		}
	}, [])

	return <>
		{
			msgList.map((msg) => {
				const [backgroundColor, color] = theme[msg.severity!]
				return <MsgBar
					key={ msg._id! }
					backgroundColor={ backgroundColor }
					color={ color }
					msg={ msg.message }
					onClose={ () => {
						setMsgList(list => {
							const idx = list.findIndex(item => item._id === msg._id)
							if (idx === -1) return list;
							return [...list.slice(0, idx), ...list.slice(idx + 1)]
						})
					} } />
			})
		}
	</>
}

const MsgBar: FC<{
	backgroundColor: string,
	color: string,
	msg: string,
	onClose: () => any
}> = ({ backgroundColor, color, msg, onClose }) => {
	const [show, setShow] = useState(true)
	const handleClose = (_: ReactEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		setShow(false)
		onClose()
	}
	return <Snackbar open={ show } onClose={ handleClose }>
		<div style={ { backgroundColor, color } } className="p-15px text-2xl">
			{ msg }
			<IconButton onClick={ handleClose }>
				<CloseIcon fontSize="large" style={ { color } } />
			</IconButton>
		</div>
	</Snackbar>
}

export default Msg
