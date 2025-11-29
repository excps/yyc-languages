import { Component, ErrorInfo, ReactNode } from "react";
import { Link } from "react-router-dom";
import * as Sentry from "@sentry/react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Always log to console for debugging
    console.error("Uncaught error:", error, errorInfo);

    // Send error to Sentry in production
    if (import.meta.env.PROD) {
      Sentry.captureException(error, {
        contexts: {
          react: {
            componentStack: errorInfo.componentStack,
          },
        },
        tags: {
          errorBoundary: "true",
        },
      });
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-gray-50">
          <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-lg">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Oops!</h1>
            <p className="text-xl text-gray-600 mb-6">
              Something went wrong. Please try refreshing the page or return home.
            </p>
            {this.state.error && (
              <>
                <p className="text-sm text-gray-500 mb-6 font-mono bg-gray-50 p-4 rounded">
                  {this.state.error.message}
                </p>

                {/* Show full stack trace only in development */}
                {import.meta.env.DEV && (
                  <details className="text-left mb-6">
                    <summary className="cursor-pointer text-sm text-blue-600 hover:text-blue-700 font-medium mb-2">
                      Show Stack Trace (Development Mode)
                    </summary>
                    <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded overflow-auto mt-2 max-h-64">
                      {this.state.error.stack}
                    </pre>
                  </details>
                )}
              </>
            )}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Refresh Page
              </button>
              <Link
                to="/"
                className="inline-block px-6 py-3 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300 transition-colors"
                onClick={() => this.setState({ hasError: false })}
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
