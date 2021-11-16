import ReactDOM from "react-dom"
import { Editor } from "."
import * as E from "."
import { ThemeProvider } from "@material-ui/core"
import { mainTheme } from "./theme"
import 'virtual:windi.css'

//@ts-ignore
window.Editor = E

ReactDOM.render(
	<ThemeProvider theme={ mainTheme }>
		<Editor />
	</ThemeProvider>,
	document.getElementById("root")
)