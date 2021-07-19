import { ButtonBase } from "@material-ui/core"
import { ArrowLeft } from "@material-ui/icons"
import { FC } from "react"

const Side: FC<{
	open: boolean,
	placement: "left" | "right" | "top",
	setOpen: (open: boolean) => void
}> = ({ children, open, placement, setOpen }) => {
	const layout = placement === "left"
		? {
			left: 0,
			transform: `translateX(${open ? "0" : '-100%'})`,
		}
		: placement === "right"
			? {
				right: 0,
				transform: `translateX(${open ? "0" : "100%"})`
			} : {
				top: 0,
				transform: `translateY(${open ? "0" : "-100%"})`
			}

	return (
		<div
			className="absolute"
			style={ {
				...layout,
				top: 0,
				boxSizing: "border-box",
				transition: "0.2s",
			} }>
			{ children }

			<ButtonBase
				onClick={ setOpen.bind(null, !open) }
				style={ {
					...placement === 'left'
						? {
							left: "100%",
							top: "50%"
						}
						: placement === "right"
							? {
								left: "0",
								top: "50%"
							}
							: {
								left: "50%",
								top: "100%"
							},
					position: "absolute",
					transform: "translate(-50%, -50%)",
					borderRadius: "50%",
					background: "#fff",
					boxShadow: "0 0 2px grey"
				} }>
				<ArrowLeft
					style={ {
						transition: ".2s",
						fontSize: "5rem",
						transform: `rotate(${placement === "left"
							? open
								? "0"
								: "180deg"
							: placement === "right"
								? open
									? "180deg"
									: "0"
								: open
									? "90deg"
									: "270deg"
							})`
					} } />
			</ButtonBase>
		</div>
	)
}

export default Side
