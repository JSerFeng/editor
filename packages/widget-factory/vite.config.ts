import { defineConfig } from "vite"
import * as path from "path"
import type { UserConfig } from "vite"
import reactRefresh from "@vitejs/plugin-react-refresh"
import reactJsx from 'vite-react-jsx'

const config = defineConfig(({ mode }) => {
	let buildOption: UserConfig["build"] = {}
	if (mode === "production") {
	  buildOption.minify = false
	  buildOption.cssCodeSplit = false
		buildOption.rollupOptions = {
			external: [
				"react",
				"react-dom",
				"@editor/editor"
			],
			output: {
				globals: {
					"react": "React",
					"react-dom": "ReactDom",
					"@editor/editor": "Editor"
				}
			}
		}
		buildOption.lib = {
			fileName: "bundle",
      name: "custom-widget",
			entry: path.join(__dirname, "./lib/entry.ts")
		}
	}

	return {
		build: buildOption,
		plugins: [
			reactJsx(),
			reactRefresh(),
		],
	}
})

export default config
