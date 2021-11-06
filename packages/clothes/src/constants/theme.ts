import { makeStyles } from "@material-ui/core"

export const MAIN_THEME = "#ab47bc"

export const SECOND_THEME = "#6a1b9a"

export const useColor = makeStyles({
	root: {
		color: "#ab47bc"
	}
})

export const useBgColor = makeStyles({
	root: {
		backgroundColor: "#ab47bc"
	}
})

export const useFontSize = makeStyles({
	root: {
		fontSize: "20px"
	}
})

export const useFullHeight = makeStyles({
	root: {
		height: "100%"
	}
})
