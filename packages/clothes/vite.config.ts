import { defineConfig } from 'vite'
import reactPlugin from '@vitejs/plugin-react'
import windiCss from "vite-plugin-windicss"
import unpluginIcons from "unplugin-icons/vite"
import type { UserConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
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
			windiCss(),
			unpluginIcons({
				jsx: "react",
				compiler: "jsx"
			}),
		],
		server,
	}
})
