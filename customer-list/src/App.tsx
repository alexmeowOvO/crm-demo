import CustomerList from "./CustomerList"
import "./App.css"

export default function App() {
  return (
    <div style={{ padding: 24 }}>
      <p style={{ color: "#888", fontSize: 12 }}>
        customer-list — running standalone
      </p>
      <CustomerList selectedId={undefined} onSelect={() => {}} />
    </div>
  )
}
