import { defineConfig } from 'vite'
import reactPlugin from '@vitejs/plugin-react'
import externalGlobals from "rollup-plugin-external-globals";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [reactPlugin()],
	build: {
		rollupOptions: {
			plugins: [externalGlobals({
				react: "React",
				"react-dom": "ReactDOM"	
			})]
		},
	}
})
