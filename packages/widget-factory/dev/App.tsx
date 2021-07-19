import { FC } from "react";
import { Editor, widgetsCenter } from "visible-editor";

import MyWidgets from "../lib"

import "./style.css"

widgetsCenter.use(MyWidgets)

const App: FC = () => {
  return (
    <Editor widgetsCenter={ widgetsCenter } />
  )
}

export default App
