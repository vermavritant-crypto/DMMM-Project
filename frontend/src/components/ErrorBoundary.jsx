import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("ErrorBoundary caught an error:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div className="absolute inset-0 bg-gradient-to-tr from-[var(--bg-card)] to-[var(--bg-elevated)] opacity-40 animate-pulse rounded-2xl" />;
    }
    return this.props.children;
  }
}
