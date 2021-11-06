import { PureComponent } from "react";
import { Warning } from "@material-ui/icons"

interface P {
	name?: string
}

interface S {
	error: any
}

class ErrorCatch extends PureComponent<P, S> {
	constructor(props: {
		name: string
	}) {
		super(props)
		this.state = {
			error: null
		}
	}

	componentDidCatch(e: any) {
		this.setState(prev => ({
			...prev,
			error: e
		}))
	}

	render() {

		return this.state.error === null
			? this.props.children
			: (
				<div>
					{ this.props.name }
					组件出错
					<Warning />
				</div>
			)
	}
}

export default ErrorCatch
