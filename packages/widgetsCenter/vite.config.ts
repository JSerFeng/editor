import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		// @ts-ignore
		react(),
	],
	build: {
		lib: {
			entry: resolve(__dirname, "src/main.ts"),
			name: "widgetsCenter",
			fileName: (format) => `widgetsCenter.${format}.js`
		},
		rollupOptions: {
			external: ["react", "react-dom", "react-router-dom"],
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDom",
					"react-router-dom": "ReactRouterDom"
				}
			}
		}
	}
})
