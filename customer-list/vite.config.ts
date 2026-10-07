import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { federation } from "@module-federation/vite"

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "customer_list",
      filename: "remoteEntry.js",
      exposes: {
        "./CustomerList": "./src/CustomerList.tsx",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
      },
    }),
  ],
  server: {
    port: 5001,
    strictPort: true,
    origin: "http://localhost:5001",
  },
  preview: { port: 5001, strictPort: true },
  build: { target: "esnext" },
})
