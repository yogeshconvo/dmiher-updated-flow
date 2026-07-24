import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Allow callers to supply a silent fallback (e.g. a spinner) instead of
      // the default "something went wrong" message.
      if (this.props.fallback !== undefined) return this.props.fallback;
      return (
        <div className="error-boundary-fallback">
          <p className="error-boundary-text">Something went wrong loading this section.</p>
          <button
            className="error-boundary-btn"
            onClick={() => this.setState({ hasError: false })}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
