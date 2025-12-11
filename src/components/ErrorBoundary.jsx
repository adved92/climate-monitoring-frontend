import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-container">
            <h2>🚨 Something went wrong</h2>
            <p>The application encountered an unexpected error.</p>
            <details style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>
              <summary>Error Details</summary>
              <p><strong>Error:</strong> {this.state.error && this.state.error.toString()}</p>
              <p><strong>Stack:</strong> {this.state.errorInfo.componentStack}</p>
            </details>
            <button 
              onClick={() => window.location.reload()} 
              className="retry-button"
              style={{ marginTop: '1rem' }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;