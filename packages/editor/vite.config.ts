import { defineConfig } from 'vite'
import reactPlugin from '@vitejs/plugin-react'
import * as path from "path"
import icon from "unplugin-icons/vite"

import type { UserConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const buildOption: UserConfig["build"] = mode === "development"
		? {}
		: {
			lib: {
				entry: path.resolve(__dirname, "src/index.tsx"),
				name: "Editor",
			},
			rollupOptions: {
				external: [
					"react",
					"react-dom",
					"@v-editor/widgets-center"
				],
				output: {
					globals: {
						"react": "React",
						"react-dom": "ReactDOM",
						"@v-editor/widgets-center": "WidgetsCenter"
					},
				}
			},
			cssCodeSplit: false
		}
	const server: UserConfig["server"] = {}
	if (mode === "development") {
		server.proxy = {
			"/api": {
				target: "http://localhost:7001",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, "")
			}
		}
	}
	return {
		plugins: [
			reactPlugin(),
			icon()
		],
		build: buildOption,
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "src"),
			}
		},
		server,
	}
})
