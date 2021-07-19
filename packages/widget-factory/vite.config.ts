import { defineConfig } from "vite"
import path from "path"
import type { UserConfig } from "vite"
import reactRefresh from "@vitejs/plugin-react-refresh"
import reactJsx from 'vite-react-jsx'

const config = defineConfig(({ mode }) => {
	let buildOption: UserConfig["build"] = {}
	if (mode === "production") {
		buildOption.rollupOptions = {
			external: [
				"react",
				"react-dom",
				"visible-editor"
			]
		}
		buildOption.lib = {
			name: "custom-widget",
			entry: path.join(__dirname, "./lib/index.tsx")
		}
	}

	return {
		build: buildOption,
		plugins: [
			reactJsx(),
			reactRefresh(),
		]
	}
})

export default config
