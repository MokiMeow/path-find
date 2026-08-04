import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        chunkSizeWarningLimit: 1000,
        rolldownOptions: {
            output: {
                codeSplitting: {
                    groups: [
                        { name: "maplibre", test: /node_modules[\\/]maplibre-gl[\\/]/ },
                        { name: "deck", test: /node_modules[\\/]@(deck|luma|loaders|math)\.gl[\\/]/ },
                        { name: "ui", test: /node_modules[\\/](@mui|@emotion)[\\/]/ },
                        { name: "react", test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
                    ],
                },
            },
        },
    },
});
