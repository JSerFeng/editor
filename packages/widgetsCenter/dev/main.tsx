import ReactDOM from "react-dom"
import { Editor } from "@v-editor/editor"
import { WidgetsCenter } from "../lib"
import carousel from "../lib/widgets/carousel"
import "./style.css"
import Text from "../lib/widgets/text"

const widgetsCenter = new WidgetsCenter()
widgetsCenter.use(carousel)
widgetsCenter.use(Text)

ReactDOM.render(
	<Editor widgetsCenter={ widgetsCenter } />,
	document.getElementById("root")
)
