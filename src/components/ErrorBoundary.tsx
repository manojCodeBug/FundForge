import { Component, type ErrorInfo, type ReactNode } from 'react';
import { ObservabilityLogger } from '../services/logger';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    ObservabilityLogger.error('Unhandled React runtime rendering error', error, {
      componentStack: errorInfo.componentStack,
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="pt-24 pb-stack-xl max-w-container-max mx-auto px-gutter min-h-screen flex items-center justify-center text-left">
          <div className="glass-panel p-stack-xl rounded border border-outline-variant max-w-md bg-surface-container/20">
            <span className="material-symbols-outlined text-4xl text-red-500 mb-4">error</span>
            <h2 className="font-headline-md text-headline-md text-primary font-bold mb-2">Something went wrong</h2>
            <p className="text-body-sm text-on-surface-variant mb-6">
              The application encountered an unexpected visual error. Please try reloading the page, or connect with support if the issue persists.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary text-on-primary-fixed px-stack-lg py-2 font-body-sm font-semibold hover:opacity-90 transition-opacity rounded"
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
