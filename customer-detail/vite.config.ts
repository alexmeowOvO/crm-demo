import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { federation } from "@module-federation/vite"

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "customer_detail", // ← 不同
      filename: "remoteEntry.js",
      exposes: {
        "./CustomerDetail": "./src/CustomerDetail.tsx", // ← 不同
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
      },
    }),
  ],
  server: {
    port: 5002, // ← 不同
    strictPort: true,
    origin: "http://localhost:5002", // ← 不同
  },
  preview: { port: 5002, strictPort: true },
  build: { target: "esnext" },
})
