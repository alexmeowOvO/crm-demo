import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { registerRemotes } from "@module-federation/runtime"
import { setRemotesManifest, type RemoteConfig } from "./remotesManifest"
import "./index.css"
import App from "./App.tsx"

const manifest: Record<string, RemoteConfig> = await fetch(
  "/remotes.json",
).then((r) => r.json())
setRemotesManifest(manifest)

registerRemotes(
  Object.entries(manifest).map(([name, cfg]) => ({
    name,
    entry: cfg.entry,
    type: "module" as const,
  })),
)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
