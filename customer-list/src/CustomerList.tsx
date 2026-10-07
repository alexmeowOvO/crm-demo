import { useState, useEffect } from "react"

type Props = {
  onSelect?: (id: number) => void
  selectedId?: number
}

export default function CustomerList({ onSelect, selectedId }: Props) {
  const [query, setQuery] = useState("")

  const API_BASE = "http://localhost:9090"

  type Customer = { id: number; name: string; stage: string }

  // ↓ 放进组件函数体内
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch(`${API_BASE}/api/customers`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((data: Customer[]) => {
        if (!cancelled) {
          setCustomers(data)
          setLoading(false)
        }
      })
      .catch((e: Error) => {
        if (!cancelled) {
          setError(e.message)
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  const visible = customers.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()),
  )

  if (loading) return <p>Loading customers…</p>
  if (error)
    return <p style={{ color: "crimson" }}>Could not load customers: {error}</p>

  return (
    <div>
      <h2 style={{ color: "crimson" }}>Customers — v2</h2>
      <input
        placeholder="Filter…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul style={{ listStyle: "none", padding: 0, marginTop: 12 }}>
        {visible.map((c) => (
          <li key={c.id}>
            <button
              onClick={() => onSelect?.(c.id)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "8px 10px",
                marginBottom: 4,
                cursor: "pointer",
                border: "1px solid #ddd",
                background: c.id === selectedId ? "#e8f0fe" : "transparent",
              }}
            >
              {c.name} — {c.stage}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
