import "./App.css"
import RenderMain from "./components/RenderMain"
import {
	%%router%% as Router
} from "react-router-dom"

function App() {
	return (
		<Router>
			<div style={ {
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				width: "100vw",
				height: "100vh",
				position: "relative"
			} }>
				<RenderMain />
			</div>
		</Router>
	)
}

export default App
