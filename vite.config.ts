import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@components": path.resolve(__dirname, "./src/components"),
			"@utils": path.resolve(__dirname, "./src/utils"),
			"@features": path.resolve(__dirname, "./src/features"),
			"@app": path.resolve(__dirname, "./src/app"),
			"@src": path.resolve(__dirname, "./src"),
		},
	},
});
