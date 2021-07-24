import * as _Editor from "@editor/editor"
import './App.scss'

const { Editor, widgetsCenter } = _Editor


/**
 * 比较hack的写法，为了让window上有Editor，以后可以考虑用cdn的方式引入umd模块的Editor
 */
//@ts-ignore
window.Editor = _Editor

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
