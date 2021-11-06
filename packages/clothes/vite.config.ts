import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import reactJsx from 'vite-react-jsx'
import * as path from "path"

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
					"react-dom"
				],
				output: {
					globals: {
						"react": "React",
						"react-dom": "ReactDOM"
					},
				}
			}
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
		plugins: [reactRefresh(), reactJsx()],
		build: buildOption,
		server,
	}
})
