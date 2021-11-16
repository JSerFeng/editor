import { FC, useEffect, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { WidgetConfig } from "../../../.."
import { apiGetImages, ErrorCode } from "../../../../api"
import { ImageApiData } from "../../../../api/stores"
import { BaseState } from "../../../../store"
import { EditorActions, Pos } from "../../../../store/editorReducer"

const {
	actAddItem
} = EditorActions

interface Props {
	dispatch: Dispatch;
	createWidgetConfig: (name: string, pos?: Pos) => WidgetConfig
}

const ImagesContent: FC<Props> = ({
	dispatch,
	createWidgetConfig
}) => {
	const [imgData, setImageData] = useState<ImageApiData["imgData"]>([])

	useEffect(() => {
		apiGetImages().then(res => {
			if (res.code === ErrorCode.Success) {
				setImageData(res.data.imgData)
			}
		})
	}, [])

	const addImageWidget = (src: string, alt: string) => {
		const widget = createWidgetConfig("image-wrapper")
		widget.config.src = src;
		widget.config.alt = alt;
		dispatch(actAddItem(widget))
	}

	return (
		<div className="w-full">
			{
				imgData.map(({ category, list }, i) => {
					return (
						<div key={ i } className="text-white">
							<div className="text-2xl  p-10px">{ category }</div>
							<ul className="flex flex-wrap w-full">
								{
									list.map(({ name, src }, k) => (
										<li
											key={ k }
											className="m-10px flex-shrink-0 cursor-pointer"
											onClick={ addImageWidget.bind(null, src, name) }>
											<img className="block h-100px" src={ src } alt={ name } />
										</li>
									))
								}
							</ul>
						</div>
					)
				})
			}
		</div>
	)
}

export default connect(
	(state: BaseState) => ({

	}),
	(dispatch) => ({ dispatch })
)(ImagesContent)
