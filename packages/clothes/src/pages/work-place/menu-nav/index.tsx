import Nav from "./nav"
import { FC, useState } from "react"
import Upload from "./content/Upload";
import { WidgetConfig } from "../../..";
import { Pos } from "../../../render/interfaces";

const MenuNav: FC<{
	createWidgetConfig: (name: string, pos?: Pos) => WidgetConfig
}> = ({
	createWidgetConfig
}) => {
	const [CurContent, setContent] = useState<{ FC: FC<any> }>({
		FC: Upload
	});

	return (
		<div className="
		w-30vw 
		h-screen 
		bg-gray-800
		flex">
			<Nav setContent={ setContent } />
			<CurContent.FC createWidgetConfig={ createWidgetConfig } />
		</div>
	)
}

export default MenuNav
