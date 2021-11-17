import { FC } from "react";
import { Editor, widgetsCenter } from "@v-editor/editor";
import MyWidgets from "../lib"
import "@v-editor/editor/dist/style.css"

widgetsCenter.use(MyWidgets)

const App: FC = () => {
  return (
    <Editor widgetsCenter={ widgetsCenter } />
  )
}

export default App
