import { Editor, widgetsCenter } from "visible-editor" 
import "visible-editor/dist/style.css"
import './App.scss'

function App() {
	return (
		<div className="App">
			<Editor
				widgetsCenter={ widgetsCenter }
			/>
		</div >
	);
}

export default App;
