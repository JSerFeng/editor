import { FC, useEffect, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { WidgetConfig } from "../../../.."
import { apiGetFonts, ErrorCode } from "../../../../api"
import { FontsApiData } from "../../../../api/stores"
import { Pos } from "../../../../render/interfaces"
import { BaseState } from "../../../../store"
import { EditorActions } from "../../../../store/editorReducer"

const { actAddItem } = EditorActions

interface Props {
	dispatch: Dispatch;
	createWidgetConfig: (name: string, pos?: Pos) => WidgetConfig
}

const TextContent: FC<Props> = ({
	dispatch,
	createWidgetConfig
}) => {
	const [fonts, setFonts] = useState<FontsApiData["fontsData"]>([])

	const addWidget = (fontFace: string, woffUrl?: string) => {
		const config = createWidgetConfig("text-wrapper");
		config.config.fontFace = fontFace
		if (woffUrl) {
			config.config.woffUrl = woffUrl
		}
		dispatch(actAddItem(config))
	}

	useEffect(() => {
		apiGetFonts().then(res => {
			if (res.code === ErrorCode.Success) {
				const fontsData = res.data.fontsData
				fontsData.forEach(({ woffUrl, fontFace }) => {
					const font = new FontFace(fontFace, `url(${woffUrl})`)
					font
						.load()
						.then(loaded => {
							document.fonts.add(loaded)
						}).catch(err => {
							console.log(fontFace + "字体加载失败")
							console.error(err)
						})
				})
				setFonts(fontsData)
			}
		})
	}, [])

	return (
		<div className="w-full text-2xl text-white">
			{
				fonts.map(({ fontFace, woffUrl, fontName }) => (
					<div
						key={ woffUrl }
						className="p-10px cursor-pointer hover:(bg-black)"
						onClick={ addWidget.bind(null, fontFace, woffUrl) }>
						<div className="text-xl mb-5px">
							{ fontName }
						</div>
						<div
							style={ {
								fontFamily: fontFace
							} }
							className="p-10px bg-white text-black text-3xl hover:(text-white bg-blue-400)">
							这是一段文字Lorem ipsum dolor sit amet consectetur adipisicing elit.
						</div>
					</div>
				))
			}
		</div>
	)
}

export default connect(
	(state: BaseState) => ({

	}),
	(dispatch) => ({ dispatch })
)(TextContent)
