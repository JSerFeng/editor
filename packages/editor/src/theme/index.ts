import { createTheme } from "@material-ui/core"
import { MAIN_THEME, SECOND_THEME } from "../constants/theme"

export const mainTheme = createTheme({
	palette: {
		primary: {
			main: MAIN_THEME,
		},
		secondary: {
			main: SECOND_THEME
		},
	}
})
