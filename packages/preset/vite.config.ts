import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import reactJsx from 'vite-react-jsx'
import externalGlobals from "rollup-plugin-external-globals";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [reactRefresh(), reactJsx()],
	build: {
		rollupOptions: {
			plugins: [externalGlobals({
				react: "React",
				"react-dom": "ReactDOM"	
			})]
		},
	}
})
