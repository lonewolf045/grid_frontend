import React, { Component } from 'react';
import { Button, Card } from './index';
import './ErrorBoundary.css';

/**
 * ErrorBoundary component for catching and handling React errors
 * Provides fallback UI and error reporting capabilities
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      eventId: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Report error to monitoring service
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // You can also log the error to an error reporting service here
    // Example: Sentry.captureException(error);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      eventId: null
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.handleRetry);
      }

      // Default fallback UI
      return (
        <div className="error-boundary">
          <div className="error-boundary-container">
            <Card className="error-boundary-card" padding="large">
              <div className="error-boundary-content">
                <div className="error-boundary-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </div>
                
                <div className="error-boundary-text">
                  <h2 className="error-boundary-title">
                    {this.props.title || 'Something went wrong'}
                  </h2>
                  <p className="error-boundary-message">
                    {this.props.message || 
                     'We encountered an unexpected error. Please try again or refresh the page.'}
                  </p>
                  
                  {this.props.showDetails && this.state.error && (
                    <details className="error-boundary-details">
                      <summary>Error Details</summary>
                      <div className="error-boundary-error-info">
                        <p><strong>Error:</strong> {this.state.error.toString()}</p>
                        {this.state.errorInfo && (
                          <pre className="error-boundary-stack">
                            {this.state.errorInfo.componentStack}
                          </pre>
                        )}
                      </div>
                    </details>
                  )}
                </div>
                
                <div className="error-boundary-actions">
                  <Button 
                    variant="primary" 
                    onClick={this.handleRetry}
                    className="error-boundary-retry"
                  >
                    Try Again
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={this.handleReload}
                    className="error-boundary-reload"
                  >
                    Refresh Page
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Async Error Boundary for handling async errors
 */
class AsyncErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('AsyncErrorBoundary caught an error:', error, errorInfo);
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  componentDidMount() {
    // Listen for unhandled promise rejections
    window.addEventListener('unhandledrejection', this.handleUnhandledRejection);
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.handleUnhandledRejection);
  }

  handleUnhandledRejection = (event) => {
    this.setState({
      hasError: true,
      error: new Error(event.reason)
    });
    
    if (this.props.onError) {
      this.props.onError(new Error(event.reason), { type: 'unhandledrejection' });
    }
  };

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorBoundary
          {...this.props}
          fallback={(error, retry) => (
            <div className="error-boundary">
              <div className="error-boundary-container">
                <Card className="error-boundary-card" padding="large">
                  <div className="error-boundary-content">
                    <div className="error-boundary-icon error-boundary-icon--async">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                    </div>
                    
                    <div className="error-boundary-text">
                      <h2 className="error-boundary-title">
                        Network Error
                      </h2>
                      <p className="error-boundary-message">
                        We're having trouble connecting to our servers. Please check your internet connection and try again.
                      </p>
                    </div>
                    
                    <div className="error-boundary-actions">
                      <Button 
                        variant="primary" 
                        onClick={this.handleRetry}
                      >
                        Try Again
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * Route Error Boundary for handling routing errors
 */
const RouteErrorBoundary = ({ children, ...props }) => {
  return (
    <ErrorBoundary
      title="Page Not Found"
      message="The page you're looking for doesn't exist or has been moved."
      {...props}
      fallback={(error, retry) => (
        <div className="error-boundary error-boundary--route">
          <div className="error-boundary-container">
            <Card className="error-boundary-card" padding="large">
              <div className="error-boundary-content">
                <div className="error-boundary-icon error-boundary-icon--route">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"/>
                    <polyline points="3,9 12,15 21,9"/>
                  </svg>
                </div>
                
                <div className="error-boundary-text">
                  <h2 className="error-boundary-title">404 - Page Not Found</h2>
                  <p className="error-boundary-message">
                    The page you're looking for doesn't exist or has been moved.
                  </p>
                </div>
                
                <div className="error-boundary-actions">
                  <Button 
                    variant="primary" 
                    onClick={() => window.history.back()}
                  >
                    Go Back
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => window.location.href = '/'}
                  >
                    Go Home
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

// Attach sub-components to main component
ErrorBoundary.Async = AsyncErrorBoundary;
ErrorBoundary.Route = RouteErrorBoundary;

export default ErrorBoundary;