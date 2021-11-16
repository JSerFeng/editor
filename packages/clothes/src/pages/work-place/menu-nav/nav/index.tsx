import { FC, Dispatch } from "react"
import { Button } from "@material-ui/core"
import Upload from "../content/Upload"
import ImagesContent from "../content/ImagesContent"
import ResourceContent from "../content/Resource"
import TextContent from "../content/TextContent"

interface INav {
	setContent: Dispatch<{ FC: FC }>
}

const Nav: FC<INav> = ({ setContent }) => {
	const changeContent = (FC: FC<any>) => {
		setContent({ FC })
	}
	return (
		<div className="
			w-80px
			h-full
			bg-gray-900
		">
			<Button
				variant="contained"
				color="primary"
				onClick={ changeContent.bind(null, Upload) }>上传</Button>
			<Button
				variant="contained"
				color="primary"
				onClick={ changeContent.bind(null, ImagesContent) }>
				图片</Button>
			<Button
				variant="contained"
				color="primary"
				onClick={ changeContent.bind(null, ResourceContent) }>
					素材</Button>
			<Button
				variant="contained"
				color="primary"
				onClick={ changeContent.bind(null, TextContent) }>
				文字</Button>
		</div>
	)
}

export default Nav
