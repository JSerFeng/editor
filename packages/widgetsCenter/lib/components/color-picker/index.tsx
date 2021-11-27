import { FC, useEffect, useState } from "react";
import { ChromePicker } from "react-color";

import "./style.scss"

const ColorPicker: FC<{
	color: string,
	onChangeComplete: (color: string) => void
}> = ({ color: _color, onChangeComplete }) => {
	const [color, setColor] = useState(_color)
	const [showPicker, setShowPicker] = useState(false)

	useEffect(() => {
		setColor(_color)
	}, [_color])

	useEffect(() => {
		const handler = () => {
			setShowPicker(false)
		}
		window.addEventListener("click", handler)

		return () => {
			window.removeEventListener("click", handler)
		}
	}, [])

	return (
		<div
			style={ { position: "relative" } }>
			<div
				style={ {
					padding: "5px",
					backgroundColor: "#fff",
					width: "50%",
					height: "30px"
				} }
				onClick={ e => {
					e.preventDefault()
					e.stopPropagation()
					setShowPicker(!showPicker)
				} }>
				<div style={ { backgroundColor: color, width: "100%", height: "100%" } }></div>
			</div>
			<div className={ showPicker ? "picker" : "hidden" }>
				<ChromePicker
					color={ color }
					onChange={ ({ rgb: { r, g, b, a } }) => {
						setColor(`rgba(${r}, ${g}, ${b}, ${a})`)
					} }
					onChangeComplete={ ({ rgb: { r, g, b, a } }) => {
						onChangeComplete(`rgba(${r}, ${g}, ${b}, ${a})`)
					} }
				/>
			</div>
		</div>
	)
}

export default ColorPicker
