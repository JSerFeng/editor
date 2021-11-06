import { makeStyles, InputLabel, Input } from "@material-ui/core"
import { Search as SearchIcon } from "@material-ui/icons"
import { Dispatch, FC, useState } from "react"

import "./search.scss"

const useSearchStyle = makeStyles({
	root: {
		fontSize: "18px",
		padding: "0"
	}
})

const WidgetSearch: FC<{
	setKwd: Dispatch<string>;
	kwd: string;
}> = ({ setKwd, kwd }) => {
	const searchStyle = useSearchStyle()

	return (
		<div className="widget-search">
			<Input
				placeholder="关键字"
				classes={ searchStyle }
				style={ {
					fontSize: "18px",
					padding: "0"
				} }
				fullWidth
				value={ kwd }
				onChange={ e => {
					setKwd(e.target.value)
				} } />
		</div>
	)
}

export default WidgetSearch
