import ReactDOM from "react-dom"
import { Editor } from "."
import * as E from "."

//@ts-ignore
window.Editor = E

ReactDOM.render(
	<Editor />,
	document.getElementById("root")
)