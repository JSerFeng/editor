import { FC, Dispatch } from "react"
import { ButtonBase } from "@material-ui/core"
import Upload from "../content/Upload"
import ImagesContent from "../content/ImagesContent"
import ResourceContent from "../content/Resource"
import TextContent from "../content/TextContent"
import UploadIcon from "~icons/ic/outline-cloud-upload"
import ImgIcon from "~icons/ic/baseline-image-search"
import ResourceIcon from "~icons/ic/sharp-gesture"
import TextIcon from "~icons/ic/sharp-text-fields"

interface INav {
	setContent: Dispatch<{ FC: FC }>
}

const Nav: FC<INav> = ({ setContent }) => {
	const changeContent = (FC: FC<any>) => {
		setContent({ FC })
	}
	return (
		<div className="
			w-50px
			h-full
			bg-gray-900
		">
			<ButtonBase
				onClick={ changeContent.bind(null, Upload) }
				style={ {
					width: "100%",
					margin: "20px 0"
				} }
				>
				<UploadIcon className="w-3rem h-full text-light-50"/>
			</ButtonBase>
			<ButtonBase
				style={ { width: "100%", marginBottom: "20px" } }
				onClick={ changeContent.bind(null, ImagesContent) }>
				<ImgIcon className="w-3rem h-full text-light-50" />
			</ButtonBase>
			<ButtonBase
				style={ { width: "100%", marginBottom: "20px" } }
				onClick={ changeContent.bind(null, ResourceContent) }>
				<ResourceIcon className="w-3rem h-full text-light-50" />
			</ButtonBase>
			<ButtonBase
				style={ { width: "100%", marginBottom: "20px" } }
				onClick={ changeContent.bind(null, TextContent) }>
				<TextIcon className="w-3rem h-full text-light-50" />
			</ButtonBase>
		</div>
	)
}

export default Nav
