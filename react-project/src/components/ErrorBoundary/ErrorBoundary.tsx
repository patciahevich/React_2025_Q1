import React, { ErrorInfo, ReactNode } from 'react';
import Fallback from '../Fallback/Fallback';

type ErrorState = {
  hasError: boolean;
  error: null | Error;
};

type ErrorProps = {
  children: ReactNode;
};

class ErrorBoundary extends React.Component<ErrorProps, ErrorState> {
  constructor(props: ErrorProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Caught an error:', error, errorInfo);
  }

  render() {
    return this.state.hasError ? <Fallback /> : this.props.children;
  }
}

export default ErrorBoundary;
