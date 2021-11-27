import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path"
import icon from "unplugin-icons/vite"

// https://vitejs.dev/config/
export default defineConfig(() => {
	return {
		plugins: [
			react(),
			icon({
				compiler: "jsx"
			}),
		],
		build: {
			lib: {
				entry: resolve(__dirname, "lib/index.ts"),
				name: "widgetsCenter",
				fileName: (format) => `widgetsCenter.${format}.js`
			},
			rollupOptions: {
				external: ["react", "react-dom", "react-router-dom", "@v-editor/editor"],
				output: {
					globals: {
						"react": "React",
						"react-dom": "ReactDom",
						"react-router-dom": "ReactRouterDom",
						"@v-editor/editor": "Editor"
					}
				}
			}
		}
	}
})
