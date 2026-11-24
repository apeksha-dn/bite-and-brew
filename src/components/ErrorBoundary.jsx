import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    console.error('Unhandled UI error:', error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="container empty-state" style={{ padding: '120px 0' }}>
          <h2>Something went wrong</h2>
          <p>Please refresh the page. If the problem continues, contact us.</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>Refresh</button>
        </div>
      );
    }
    return this.props.children;
  }
}
