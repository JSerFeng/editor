import { createContext, FC, useContext, useState } from "react"


const HoverCtx = createContext(false)

const Hover: FC = ({ children }) => {
	const [hover, setHover] = useState(false)

	return (
		<HoverCtx.Provider value={ hover }>
			<span
				onMouseEnter={ setHover.bind(null, true) }
				onMouseLeave={ setHover.bind(null, false) }
			>
				{ children }
			</span>
		</HoverCtx.Provider>
	)
}

const HoverItem: FC = ({ children }) => {
	const show = useContext(HoverCtx)

	return show ? <>{ children }</> : null
}

export { Hover, HoverItem }
