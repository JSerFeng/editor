import { FC } from "react";
import { connect } from "react-redux";
import { RenderConfig } from "../../render/interfaces";
import {
	Route,
	useHistory,
	BrowserRouter
} from "react-router-dom"
import "./style.scss"
import WidgetsCenter from "../../render/WidgetsCenter";
import { BaseState } from "../../store";
import { ButtonBase } from "@material-ui/core";
import {
	ArrowBack
} from "@material-ui/icons"

const Preset: FC<{
	renderConfig: RenderConfig,
	widgetsCenter: WidgetsCenter
}> = ({ renderConfig, widgetsCenter }) => {
	const { w: width, h: height } = renderConfig.pos
	const router = useHistory()

	return (
		<BrowserRouter
			basename="/preset"
		>
			<div className="preset flex jc ac">
				<ButtonBase
					className="back-button flex jc ac"
					onClick={ router.goBack }
				>
					<ArrowBack />
					返回
				</ButtonBase>
				<div
					style={ {
						position: "relative",
						width,
						height,
					} }
				>
					{
						renderConfig.widgets.map(widgetConfig => {
							const { FC } = widgetsCenter.get(widgetConfig.name)!

							return (
								<Route
									path={ widgetConfig.routeInfo.path }
									exact={ widgetConfig.routeInfo.exact }
								>
									<div
										style={ {
											position: "absolute",
											left: widgetConfig.pos.x,
											top: widgetConfig.pos.y,
											zIndex: widgetConfig.style?.zIndex || 0
										} }
									>
										<FC
											isDev={ false }
											config={ widgetConfig.config }
											pos={ widgetConfig.pos }
											style={ widgetConfig.style || {} }
										/>
									</div>
								</Route>
							)
						})
					}
				</div>
			</div>
		</BrowserRouter>
	)
}

export default connect(
	(state: BaseState) => ({
		renderConfig: state.editorReducer.workplace.renderConfig
	})
)(Preset)
