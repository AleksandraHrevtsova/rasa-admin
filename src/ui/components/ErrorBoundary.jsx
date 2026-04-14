import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);

    this.setState({
      error,
      errorInfo
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback({
          error: this.state.error,
          reset: this.handleReset
        });
      }

      return (
        <div className='h-screen flex items-center justify-center bg-gray-50 p-4'>
          <div className='bg-white shadow-lg rounded-2xl p-6 max-w-md w-full text-center'>
            <h2 className='text-xl font-semibold text-red-600 mb-2'>
              Something went wrong
            </h2>
            <p className='text-gray-600 mb-4'>
              An unexpected error occurred.
            </p>

            {process.env.NODE_ENV === 'development' && (
              <pre className='text-xs text-left bg-gray-100 p-2 rounded mb-4 overflow-auto max-h-40'>
                {this.state.error?.toString()}
              </pre>
            )}

            <div className='flex gap-2 justify-center'>
              <button
                onClick={this.handleReset}
                className='px-4 py-2 bg-gray-200 rounded'
              >
                Try again
              </button>
              <button
                onClick={this.handleReload}
                className='px-4 py-2 bg-blue-600 text-white rounded'
              >
                Reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}