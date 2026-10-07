import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { federation } from "@module-federation/vite"

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "shell",
      filename: "remoteEntry.js",
      remotes: {},
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
      },
    }),
  ],
  server: {
    port: 5000,
    strictPort: true,
    origin: "http://localhost:5000",
  },
  preview: { port: 5000, strictPort: true },
  build: { target: "esnext" },
})
