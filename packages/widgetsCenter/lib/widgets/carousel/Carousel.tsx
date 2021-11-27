import { FC } from "react"
import { WidgetConfigProp, WidgetProps } from "../../core"
import AwesomeSlider from "react-awesome-slider"
import { IconButton, Grid, Input } from "@material-ui/core"
//@ts-ignore
import withAutoplay from 'react-awesome-slider/dist/autoplay'
import 'react-awesome-slider/dist/styles.css'
import { produce } from "immer"
import ColorPicker from "../../components/color-picker"
//@ts-ignore
import DelIcon from "~icons/mdi/delete"
//@ts-ignore
import AddIcon from "~icons/mdi/add"

import "./style.scss"

export interface CarouselProps {
	showButton: boolean,
	showDot: boolean,
	iterationTime: number,
	resources: {
		text?: string,
		bgColor?: string,
		color?: string,
		img?: string
		href?: string,
		fontSize?: string,
	}[]
}

const Slider = withAutoplay(AwesomeSlider)

export const Carousel: FC<WidgetProps<CarouselProps>> = ({ config, pos }) => {
	const { resources, showButton, showDot, iterationTime } = config;

	return (
		<div style={ {
			width: pos.w + "px",
			height: pos.h + "px",
		} }>
			<Slider
				play={ true }
				interval={ iterationTime }
				fillParent={ true }
				transitionDelay={ 0 }
				mobileTouch={ true }
				buttons={ showButton }
				bullets={ showDot }>
				{
					resources.map(({ href, text, bgColor, color, img, fontSize }, i) =>
						<div key={ i } style={ {
							width: "100%",
							height: "100%",
						} }>
							<a
								key={ i }
								target="_blank"
								href={ href }
								style={ {
									width: pos.w + "px",
									height: pos.h + "px",
									textDecoration: "none",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									fontSize,
									backgroundColor: bgColor,
									color: color,
									backgroundImage: `url(${img})`,
									backgroundSize: "cover",
									backgroundPosition: "center",
								} }>
								<div>
									{ text }
								</div>
							</a>
						</div>
					)
				}
			</Slider>
		</div>
	)
}

export const Configure: FC<WidgetConfigProp<CarouselProps>> = ({ widgetConfig, dispatchConfig }) => {
	const { config } = widgetConfig
	const { resources } = config
	return (
		<div>
			{
				resources.map(({ color, bgColor, text, href, fontSize, img }, i) => {
					color = color || "#000"
					bgColor = bgColor || "#fff"
					return (
						<div key={ i } className="v-carousel-item">
							<div className="v-carousel-title" style={ { display: "flex", alignItems: "center" } }>
								第{ i + 1 }页
								<span className="v-carousel-del-btn">
									<DelIcon
										style={ { fontSize: "1.3em", cursor: "pointer" } }
										onClick={ () => {
											dispatchConfig(produce(widgetConfig, it => {
												it.config.resources.splice(i, 1)
											}))
										} }
									/>
								</span>
							</div>
							<div className="v-carousel-content">
								<Grid container>
									<Grid item xs={ 6 }>链接</Grid>
									<Grid item xs={ 6 }>
										<Input value={ href } onChange={ e => {
											dispatchConfig(produce(widgetConfig, it => {
												it.config.resources[i].href = e.target.value
											}))
										} } />
									</Grid>

									<Grid item xs={ 6 }>文字内容</Grid>
									<Grid item xs={ 6 }>
										<Input value={ text } onChange={ e => {
											dispatchConfig(produce(widgetConfig, it => {
												it.config.resources[i].text = e.target.value
											}))
										} } />
									</Grid>

									<Grid item xs={ 6 }>字体大小</Grid>
									<Grid item xs={ 6 }>
										<Input value={ fontSize } onChange={ e => {
											dispatchConfig(produce(widgetConfig, it => {
												it.config.resources[i].fontSize = e.target.value
											}))
										} } />
									</Grid>

									<Grid item xs={ 6 }>背景图片</Grid>
									<Grid item xs={ 6 }>
										<Input value={ img } onChange={ e => {
											dispatchConfig(produce(widgetConfig, it => {
												it.config.resources[i].img = e.target.value
											}))
										} } />
									</Grid>

									<Grid item xs={ 6 }>文本颜色</Grid>
									<Grid item xs={ 6 }>
										<ColorPicker color={ color } onChangeComplete={ color => {
											dispatchConfig(produce(widgetConfig, it => {
												it.config.resources[i].color = color;
											}))
										} } />
									</Grid>

									<Grid item xs={ 6 }>背景色</Grid>
									<Grid item xs={ 6 }>
										<ColorPicker color={ bgColor } onChangeComplete={ color => {
											dispatchConfig(produce(widgetConfig, it => {
												it.config.resources[i].bgColor = color;
											}))
										} } />
									</Grid>
								</Grid>
							</div>
						</div>
					)
				})
			}
			<IconButton onClick={ () => {
				dispatchConfig(produce(widgetConfig, it => {
					it.config.resources.push({
						text: `page ${it.config.resources.length + 1}`
					})
				}))
			} }>
				<AddIcon />
			</IconButton>
		</div>
	)
}
