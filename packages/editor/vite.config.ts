import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const buildOption = mode === "development"
		? {}
		: {
			lib: {
				entry: path.resolve(__dirname, "src/index.tsx"),
				name: "visible-editor"
			},
			rollupOptions: {
				external: [
					"react",
					"react-dom"
				],
				output: {
					globals: {
						"react": "React",
						"react-dom": "ReactDom"
					}
				}
			}
		}
	console.log(mode);

	return {
		plugins: [reactRefresh()],
		esbuild: {
			jsxInject: `import React from 'react'`
		},
		build: buildOption
	}
})
