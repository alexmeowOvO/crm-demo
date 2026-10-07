import { useState, useEffect } from "react"

type Props = {
  customerId?: number
}

type Interaction = { date: string; type: string; note: string }

type CustomerDetailData = {
  id: number
  name: string
  stage: string
  owner: string
  interactions: Interaction[]
}

const API_BASE = "http://localhost:9090"

export default function CustomerDetail({ customerId }: Props) {
  const [customer, setCustomer] = useState<CustomerDetailData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (customerId === undefined) {
      setCustomer(null)
      setError(null)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    fetch(`${API_BASE}/api/customers/${customerId}`)
      .then((r) => {
        if (r.status === 404) throw new Error("Customer not found")
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((data: CustomerDetailData) => {
        if (!cancelled) {
          setCustomer(data)
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
  }, [customerId])

  if (customerId === undefined) return <p>Select a customer to see details.</p>
  if (loading) return <p>Loading…</p>
  if (error) return <p style={{ color: "crimson" }}>{error}</p>
  if (!customer) return null

  return (
    <div>
      <h2>{customer.name}</h2>
      <p>Relationship manager: {customer.owner}</p>
      <h3>Interactions</h3>
      <ul>
        {customer.interactions.map((i, idx) => (
          <li key={idx}>
            {i.date} — {i.type}: {i.note}
          </li>
        ))}
      </ul>
    </div>
  )
}
