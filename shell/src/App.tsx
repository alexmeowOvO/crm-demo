import RemoteErrorBoundary from "./RemoteErrorBoundary"
import { lazy, Suspense, useState, type ComponentType } from "react"
import { loadRemote } from "@module-federation/runtime"
import { remotesManifest } from "./remotesManifest"

function lazyRemote<P>(path: string) {
  return lazy(async () => {
    const mod = await loadRemote<{ default: ComponentType<P> }>(path)
    if (!mod) throw new Error(`Remote module not found: ${path}`)
    return mod
  })
}
const CustomerList = lazyRemote<{
  selectedId?: number
  onSelect?: (id: number) => void
}>("customer_list/CustomerList")

const CustomerDetail = lazyRemote<{
  customerId?: number
}>("customer_detail/CustomerDetail")

export default function App() {
  const [selectedId, setSelectedId] = useState<number | undefined>()

  return (
    <div style={{ fontFamily: "system-ui", padding: 24 }}>
      <h1>CRM Shell</h1>
      <nav style={{ marginBottom: 16 }}>Customers</nav>

      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <RemoteErrorBoundary
            name="customer-list"
            version={remotesManifest.customer_list?.version}
          >
            <Suspense fallback={<p>Loading customer list…</p>}>
              <CustomerList selectedId={selectedId} onSelect={setSelectedId} />
            </Suspense>
          </RemoteErrorBoundary>
        </div>

        <div style={{ flex: 1 }}>
          <RemoteErrorBoundary
            name="customer-detail"
            version={remotesManifest.customer_detail?.version}
          >
            <Suspense fallback={<p>Loading customer detail…</p>}>
              <CustomerDetail customerId={selectedId} />
            </Suspense>
          </RemoteErrorBoundary>
        </div>
      </div>
    </div>
  )
}
