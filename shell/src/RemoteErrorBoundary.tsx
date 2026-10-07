import { Component, type ReactNode, type ErrorInfo } from "react"

type Props = { name: string; version?: string; children: ReactNode }
type State = { hasError: boolean }

export default class RemoteErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    const report = {
      remote: this.props.name,
      version: this.props.version ?? "unknown",
      message: error.message,
      componentStack: info.componentStack,
      url: window.location.href,
      timestamp: new Date().toISOString(),
    }
    // 生产上这里是 Sentry / Datadog RUM / CloudWatch RUM
    console.error("[shell] remote failed", report)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 12, border: "1px solid #ccc", color: "#666" }}>
          <div>{this.props.name} is unavailable right now.</div>
          <div style={{ fontSize: 11, marginTop: 4 }}>
            version {this.props.version ?? "unknown"}
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
